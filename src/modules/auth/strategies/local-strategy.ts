import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LOCAL_STRATEGY_NAME } from '../constants/auth';

export
@Injectable()
class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY_NAME) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'login' });
    }

    async validate(login: string, password: string) {
        return await this.authService.verifyUser(login, password);
    }
}
