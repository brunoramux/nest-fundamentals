import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './auth.constants';
import type { PayloadType } from './types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: PayloadType): {
    userId: number;
    email: string;
    artistId?: number;
  } {
    return {
      userId: payload.userId,
      email: payload.email,
      artistId: payload?.artistId,
    };
  }
}
