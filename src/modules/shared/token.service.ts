import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { TokenPayload } from './interfaces/token-payload.interface';
import { ErrorMessage } from '../../common/error-message';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async generateAccessToken(payload: TokenPayload) {
        try {
            const expiresMin = Number(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_MIN') ?? 60);
            const secret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');

            return await this.jwtService.signAsync(payload, {
                expiresIn: expiresMin * 60 * 1000, //min to ms
                secret,
            });
        } catch {
            throw new InternalServerErrorException(ErrorMessage.ERROR_CREATE_JWT_TOKEN);
        }
    }

    async getUserIdFromToken(token: string): Promise<string> {
        return await this.decodeToken(token);
    }

    private async decodeToken(token: string): Promise<string> {
        try {
            const payload = await this.jwtService.verifyAsync<Partial<TokenPayload>>(token, {
                secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
            });

            return payload.userId ?? '';
        } catch {
            throw new InternalServerErrorException(ErrorMessage.ERROR_CREATE_JWT_TOKEN);
        }
    }
}
