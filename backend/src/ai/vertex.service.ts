import { Injectable } from '@nestjs/common';
import { VertexAI } from '@google-cloud/vertexai';
import { BigQueryService } from './bigquery.service';

@Injectable()
export class VertexService {
  private readonly vertexAI = new VertexAI({
    project: 'cloudcost-ai-prod',
    location: 'europe-west1',
  });

  constructor(
    private readonly bigQueryService: BigQueryService,
  ) {}

  async generateRecommendation(): Promise<string> {
    const forecast = await this.bigQueryService.getForecast();

    const summary = forecast
      .map(
        (row: any) =>
          `Date: ${row.forecast_timestamp}, Forecasted Cost: $${Number(
            row.forecast_value,
          ).toFixed(2)}`,
      )
      .join('\n');

    const model = this.vertexAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
You are a Senior FinOps consultant.

The following data comes from a BigQuery ML cost forecast.

${summary}

Analyze these predicted cloud costs and provide:

1. Executive summary
2. Overall cost trend
3. Services likely to generate the highest costs
4. Rightsizing recommendations
5. Storage optimization suggestions
6. Database optimization suggestions
7. Networking optimization suggestions
8. Estimated savings opportunities

Return the answer in clean Markdown.
`,
            },
          ],
        },
      ],
    });

    return (
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ??
      'No recommendation generated.'
    );
  }
}