import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import {
    emailRequired,
    invalidCredentials,
    signUpSuccessExample,
    userWithEmailExistError,
    userWithLoginExistError,
} from './response-examples';
import { ErrorMessage } from '../../../common/error-message';
import { SUCCESS_LOGIN } from '../../../common/messages';

export const SIGN_UP_SUCCESS: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Пользователь успешно создан',
    example: signUpSuccessExample,
};

export const USER_EMAIL_EXIST_ERROR: ApiResponseOptions = {
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage.USER_EXIST_EMAIL,
    example: userWithEmailExistError,
};

export const USER_LOGIN_EXIST_ERROR: ApiResponseOptions = {
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage.USER_EXIST_EMAIL,
    example: userWithLoginExistError,
};

export const EMAIL_REQUIRED: ApiResponseOptions = {
    status: HttpStatus.BAD_REQUEST,
    description: 'Email is Required',
    example: emailRequired,
};

export const LOG_IN_SUCCESS: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Пользователь успешно создан',
    example: SUCCESS_LOGIN,
};

export const INVALID_CREDENTIALS: ApiResponseOptions = {
    status: HttpStatus.FORBIDDEN,
    description: 'Invalid credentials',
    example: invalidCredentials,
};
