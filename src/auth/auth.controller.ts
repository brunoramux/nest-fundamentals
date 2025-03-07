import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import type { AuthService } from './auth.service';
import type { LoginDTO } from './dto/login.dto';

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
    const user = await this.authService.login(loginDTO);
    return { user };
  }
}
