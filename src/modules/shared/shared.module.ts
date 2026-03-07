import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [],
    providers: [TokenService],
    exports: [TokenService],
    imports: [JwtModule],
})
export class SharedModule {}
