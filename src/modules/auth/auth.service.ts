import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { SignUpDto } from './dto/sign-up.dto';

import { ErrorMessage } from '../../common/error-message';

import { User } from '../users/entities/user.entity';

import { compareStrings } from '../../utils/validate-password';
import { TokenService } from '../shared/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
        await this.userService.checkUserExist(signUpDto.login, signUpDto.email);

        const { password, ...user } = await this.userService.create(signUpDto);

        return user;
    }

    async signIn(user: User): Promise<string> {
        return await this.tokenService.generateAccessToken({ login: user.login, userId: String(user.id) });
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
}
