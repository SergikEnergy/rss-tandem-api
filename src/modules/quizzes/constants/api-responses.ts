import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { DUPLICATE_QUESTION_RESPONSE, GET_QUESTIONS_RESPONSE } from './response-examples';

export const SUCCESS_CREATE_QUESTION: ApiResponseOptions = {
    status: HttpStatus.CREATED,
    description: 'Вопрос добавлен успешно',
    example: GET_QUESTIONS_RESPONSE[0],
};

export const DUPLICATE_QUESTION_ERROR: ApiResponseOptions = {
    status: HttpStatus.BAD_REQUEST,
    description: 'Вопрос с таким описанием уже существует',
    example: DUPLICATE_QUESTION_RESPONSE,
};

export const SUCCESS_GET_QUESTIONS: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Получение вопросов по теме и подтеме',
    example: GET_QUESTIONS_RESPONSE,
};

export const SUCCESS_GET_QUESTION: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Получение вопроса по id',
    example: GET_QUESTIONS_RESPONSE[0],
};

export const SUCCESS_UPDATE_QUESTION: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Обновление вопроса по id',
    example: GET_QUESTIONS_RESPONSE[0],
};

export const SUCCESS_DELETE_QUESTION: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Удаление вопроса из БД',
};
