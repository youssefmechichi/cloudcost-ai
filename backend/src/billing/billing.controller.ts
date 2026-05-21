import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { BillingService } from './billing.service';

type AuthenticatedRequest = {
  user: {
    userId: string;
    email: string;
  };
};

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCsv(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.billingService.uploadCsv(req.user.userId, file);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('records')
  getRecords(@Req() req: AuthenticatedRequest) {
    return this.billingService.getRecords(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('summary')
  getSummary(@Req() req: AuthenticatedRequest) {
    return this.billingService.getSummary(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('monthly-trends')
  getMonthlyTrends(@Req() req: AuthenticatedRequest) {
    return this.billingService.getMonthlyTrends(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('anomalies')
  getAnomalies(@Req() req: AuthenticatedRequest) {
    return this.billingService.getAnomalies(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('recommendations')
  getRecommendations(@Req() req: AuthenticatedRequest) {
    return this.billingService.getRecommendations(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('forecast')
  getForecast(@Req() req: AuthenticatedRequest) {
    return this.billingService.getForecast(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('insights')
  getInsights(@Req() req: AuthenticatedRequest) {
    return this.billingService.getInsights(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('ai-chat')
  async aiChat(
    @Req() req: AuthenticatedRequest,
    @Body('message') message: string,
  ) {
    return this.billingService.generateAiResponse(req.user.userId, message);
  }
}
