import { Module, Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

const authProviders: Provider[] = [AuthService, LocalStrategy, JwtStrategy];

const globalProviders: Provider[] = [
    {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    },
];

@Module({
    controllers: [AuthController],
    imports: [UsersModule, PassportModule, JwtModule],
    providers: [...authProviders, ...globalProviders],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
