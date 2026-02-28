import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { ErrorMessage } from '../../common/error-message';

import { User } from '../users/entities/user.entity';
import { IAccessToken } from './interfaces/access-token.interface';

import { compareStrings } from '../../utils/validate-password';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
        await this.userService.checkUserExist(signUpDto.login, signUpDto.email);

        const { password, ...user } = await this.userService.create(signUpDto);

        return user;
    }

    async signIn(user: User): Promise<IAccessToken> {
        const accessToken = await this.generateAccessToken({ login: user.login, userId: String(user.id) });

        return { access: accessToken };
    }

    async verifyUser(login: string, password: string) {
        try {
            const user = await this.userService.findByLogin(login);
            await this.comparePasswords(password, user.password);
            return user;
        } catch {
            throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);
        }
    }

    async comparePasswords(newPassword: string, hashedOldPassword: string) {
        const isPasswordsValid = await compareStrings(newPassword, hashedOldPassword);
        if (!isPasswordsValid) {
            throw new UnauthorizedException(ErrorMessage.INCORRECT_PASSWORD);
        }

        return isPasswordsValid;
    }

    private async generateAccessToken(payload: TokenPayload) {
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
}
