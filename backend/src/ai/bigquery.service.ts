import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class BigQueryService {
  private bigquery = new BigQuery({
    projectId: 'cloudcost-ai-prod',
  });

  async getForecast() {
    const query = `
      SELECT
        forecast_timestamp,
        forecast_value
      FROM ML.FORECAST(
        MODEL \`cloudcost-ai-prod.cloudcost.cost_forecast\`,
        STRUCT(30 AS horizon)
      )
    `;

    const [rows] = await this.bigquery.query({ query });

    return rows;
  }
}