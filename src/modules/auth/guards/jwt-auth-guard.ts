import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY_NAME, PUBLIC_KEY } from '../constants/auth';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../../../common/error-message';

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard(JWT_STRATEGY_NAME) {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [context.getHandler(), context.getClass()]);

        if (isPublic) return true;

        return super.canActivate(context);
    }

    handleRequest<User>(err: Error, user: User): User {
        if (err || !user) throw new UnauthorizedException(ErrorMessage.UNAUTH_MESSAGE);

        return user;
    }
}
