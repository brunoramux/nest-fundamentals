import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { CurrentUser } from './auth/current-user-decorator';
import type { PayloadType } from './auth/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: PayloadType) {
    return user;
  }

  @Get('is-artist')
  @UseGuards(JwtAuthGuard)
  isArtist(@CurrentUser() user: PayloadType) {
    return user.artistId ? 'Usuário é artista' : 'Usuário não é artista';
  }
}
