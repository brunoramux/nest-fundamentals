import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { CurrentUser } from './auth/current-user-decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: { userId: string; email: string }) {
    return user;
  }
}
