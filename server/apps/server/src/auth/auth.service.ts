import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload, Token, RefreshTokenPayload } from '@en/common/user';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(payload: TokenPayload): Token {
    return {
      accessToken: this.jwtService.sign<RefreshTokenPayload>(
        {
          ...payload,
          tokenType: 'access',
        },
        { expiresIn: '1h' },
      ),
      refreshToken: this.jwtService.sign<RefreshTokenPayload>(
        {
          ...payload,
          tokenType: 'refresh',
        },
        { expiresIn: '7d' },
      ),
    };
  }
}
