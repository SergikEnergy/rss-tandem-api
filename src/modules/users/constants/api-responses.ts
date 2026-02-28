import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { getMeExample } from './examples';

export const SUCCESS_GET_USERS: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Get all users from database',
};

export const GET_ME_SUCCESS = {
    status: HttpStatus.OK,
    example: getMeExample,
};
