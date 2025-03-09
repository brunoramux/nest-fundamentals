import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';

export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super();
  }
  async validate(apiKey: string) {
    return (await this.authService.validateUserByApiKey(apiKey)) ?? '';
  }
}
