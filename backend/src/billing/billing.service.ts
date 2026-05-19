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

  async getMonthlyTrends(userId: string) {
  const records = await this.getRecords(userId);

  const monthlyTotals: Record<string, number> = {};

  for (const record of records) {
    const date = new Date(record.usageDate);

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + record.cost;
  }

  return Object.entries(monthlyTotals).map(
    ([month, cost]) => ({
        month,
        cost,
      }),
    );
  }

  async getAnomalies(userId: string) {
  const records = await this.getRecords(userId);

  if (records.length === 0) {
    return [];
  }

  const totalSpend = records.reduce((sum, record) => sum + record.cost, 0);
  const averageSpend = totalSpend / records.length;

  return records
    .filter((record) => record.cost > averageSpend * 1.5)
    .map((record) => ({
      id: record.id,
      service: record.service,
      cost: record.cost,
      currency: record.currency,
      usageDate: record.usageDate,
      reason: `${record.service} cost is more than 50% above the average billing record.`,
      severity: record.cost > averageSpend * 2 ? "HIGH" : "MEDIUM",
    }));
  }

  async getRecommendations(userId: string) {
  const summary = await this.getSummary(userId);
  const anomalies = await this.getAnomalies(userId);

  const recommendations: {
    title: string;
    description: string;
    impact: string;
    estimatedSavings: number;
  }[] = [];

  if (summary.totalSpend > 400) {
    recommendations.push({
    title: 'Review high monthly cloud spend',
    description: `Your total spend is ${summary.totalSpend.toFixed(2)} ${summary.currency}. Review high-cost services for optimization.`,
    impact: 'MEDIUM',
    estimatedSavings: Math.round(summary.totalSpend * 0.15),
  });


  for (const service of summary.services) {
    if (service.cost > summary.totalSpend * 0.4) {
      recommendations.push({
        title: `Optimize ${service.service}`,
        description: `${service.service} represents a large share of your cloud bill. Consider rightsizing, autoscaling, or usage review.`,
        impact: 'HIGH',
        estimatedSavings: Math.round(service.cost * 0.2),
      });
    }
  }

  if (anomalies.length > 0) {
    recommendations.push({
      title: 'Investigate billing anomalies',
      description: `${anomalies.length} unusual cost pattern(s) were detected. Investigate them before the next billing cycle.`,
      impact: 'HIGH',
      estimatedSavings: Math.round(summary.totalSpend * 0.1),
    });
  }

  return recommendations;
}

  }
}