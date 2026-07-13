import { Controller, Get } from '@nestjs/common';
import { VertexService } from './vertex.service';

@Controller('ai')
export class AiController {

    constructor(
        private readonly vertexService: VertexService,
    ) {}

    @Get("recommendations")
    async recommendations() {
        return {
            recommendation:
                await this.vertexService.generateRecommendation(),
        };
    }

}