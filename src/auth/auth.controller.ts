import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-guard';
import { CurrentUser } from './current-user-decorator';
import type { PayloadType } from './types';
import type { ValidateTokenDTO } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body()
    userDTO: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(userDTO);
  }

  @Post('signin')
  async signin(
    @Body()
    loginDTO: LoginDTO,
  ) {
    const { accessToken, message, validate2FA } =
      await this.authService.login(loginDTO);
    return {
      accessToken: accessToken,
      message,
      validate2FA,
    };
  }

  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  async enable2FA(@CurrentUser() user: PayloadType) {
    return this.authService.enable2FA(user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @CurrentUser() user: PayloadType,
    @Body() validateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      user.userId,
      validateTokenDTO.token,
    );
  }

  @Post('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@CurrentUser() user: PayloadType) {
    return this.authService.disable2FA(user.userId);
  }
}
