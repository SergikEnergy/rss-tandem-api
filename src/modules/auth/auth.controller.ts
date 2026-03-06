import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { APP_PATHS, SWAGGER_TAGS } from '../../common/constants';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from './guards/is-public';
import {
    EMAIL_REQUIRED,
    INVALID_CREDENTIALS,
    LOG_IN_SUCCESS,
    SIGN_UP_SUCCESS,
    USER_EMAIL_EXIST_ERROR,
    USER_LOGIN_EXIST_ERROR,
} from './constants/api-responses';
import { INTERNAL_SERVER_ERROR } from '../../common/api-responses';
import { SignUpDto } from './dto/sign-up.dto';
import { SUCCESS_LOGIN } from '../../common/messages';
import { User } from '../users/entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { LocalAuthGuard } from './guards/local-auth-guard';

@ApiTags(SWAGGER_TAGS.AUTH)
@Controller(APP_PATHS.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post(APP_PATHS.SIGN_UP)
    @IsPublic()
    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiResponse(SIGN_UP_SUCCESS)
    @ApiResponse(USER_EMAIL_EXIST_ERROR)
    @ApiResponse(USER_LOGIN_EXIST_ERROR)
    @ApiResponse(EMAIL_REQUIRED)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    @HttpCode(HttpStatus.OK)
    register(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post(APP_PATHS.LOGIN)
    @UseGuards(LocalAuthGuard)
    @IsPublic()
    @ApiOperation({ summary: 'Вход в приложение' })
    @ApiResponse(LOG_IN_SUCCESS)
    @ApiResponse(INVALID_CREDENTIALS)
    @ApiBody({
        description: 'login body',
        required: true,
        examples: {
            testUser: {
                description: 'user login',
                value: { login: 'testUser', password: 'testPass123' },
            },
        },
    })
    @HttpCode(HttpStatus.OK)
    async login(@GetUser() user: User) {
        const accessToken = await this.authService.signIn(user);

        return { accessToken, ...SUCCESS_LOGIN };
    }
}
