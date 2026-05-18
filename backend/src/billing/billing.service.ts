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
}