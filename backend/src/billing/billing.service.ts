import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Readable } from 'stream';
import csvParser from 'csv-parser';

type CsvRow = {
  service: string;
  cost: string;
  currency: string;
  usageDate: string;
};

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async uploadCsv(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('CSV file is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    if (!user?.organizationId) {
      throw new BadRequestException('User has no organization');
    }

    const rows = await this.parseCsv(file.buffer);

    const records = await this.prisma.billingRecord.createMany({
      data: rows.map((row) => ({
        service: row.service,
        cost: Number(row.cost),
        currency: row.currency,
        usageDate: new Date(row.usageDate),
        organizationId: user.organizationId!,
      })),
    });

    return {
      message: 'Billing records uploaded successfully',
      inserted: records.count,
    };
  }

  private parseCsv(buffer: Buffer): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
      const results: CsvRow[] = [];

      Readable.from(buffer)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  async getRecords(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.organizationId) {
    throw new BadRequestException('User has no organization');
  }

  return this.prisma.billingRecord.findMany({
    where: {
      organizationId: user.organizationId,
    },
    orderBy: {
      usageDate: 'asc',
      },
    });
  }

  async getSummary(userId: string) {
    const records = await this.getRecords(userId);

    const totalSpend = records.reduce((sum, record) => sum + record.cost, 0);

    const costByService = records.reduce(
      (acc, record) => {
        acc[record.service] = (acc[record.service] || 0) + record.cost;
        return acc;
      },
      {} as Record<string, number>,
    );

    const services = Object.entries(costByService).map(([service, cost]) => ({
      service,
      cost,
    }));

    return {
      totalSpend,
      recordCount: records.length,
      currency: records[0]?.currency || 'USD',
      services,
    };
  }
}