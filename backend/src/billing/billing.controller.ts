import {
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

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCsv(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.billingService.uploadCsv(req.user.userId, file);
  }
   @UseGuards(AuthGuard('jwt'))
   @Get('records')
   getRecords(@Req() req) {
     return this.billingService.getRecords(req.user.userId);
   }

   @UseGuards(AuthGuard('jwt'))
   @Get('summary')
   getSummary(@Req() req) {
     return this.billingService.getSummary(req.user.userId);
   }

   @UseGuards(AuthGuard('jwt'))
   @Get('monthly-trends')
   getMonthlyTrends(@Req() req) {
     return this.billingService.getMonthlyTrends(
       req.user.userId,
     );
   }

   @UseGuards(AuthGuard('jwt'))
   @Get('anomalies')
   getAnomalies(@Req() req) {
     return this.billingService.getAnomalies(req.user.userId);
   }
   
   @UseGuards(AuthGuard('jwt'))
   @Get('recommendations')
   getRecommendations(@Req() req) {
    return this.billingService.getRecommendations(req.user.userId);
  }
}