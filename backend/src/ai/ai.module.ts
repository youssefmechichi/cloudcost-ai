import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { VertexService } from './vertex.service';
import { BigQueryService } from './bigquery.service';

@Module({
  controllers: [AiController],
  providers: [
    VertexService,
    BigQueryService,
  ],
})
export class AiModule {}