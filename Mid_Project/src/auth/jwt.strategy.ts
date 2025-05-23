import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        if (!req?.headers?.authentication) return null;
        return req.headers.authentication;
      },
      ignoreExpiration: false,
      secretOrKey: 'supersecretkey',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, name: payload.name };
  }
}

