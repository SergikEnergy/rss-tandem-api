import { HttpStatus } from '@nestjs/common';

export const INTERNAL_SERVER_ERROR = {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server is unreachable',
    schema: {
        example: {
            statusCode: 500,
            message: 'Что-то пошло не так',
        },
    },
};

export const BAD_REQUEST_ERROR = {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request - validation error or database error',
    schema: {
        example: {
            statusCode: 400,
            message: 'Error message',
        },
    },
};

export const UNAUTHORIZED = {
    status: HttpStatus.FORBIDDEN,
    description: 'Ошибка авторизации',
    schema: {
        example: {
            statusCode: 403,
            message: 'Unauthorized',
        },
    },
};

export const USER_NOT_FOUND = {
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
    schema: {
        example: {
            statusCode: 404,
            message: 'Not Found',
        },
    },
};
