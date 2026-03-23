import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { APP_PATHS, SWAGGER_TAGS } from '../../common/constants';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { IsPublic } from '../auth/guards/is-public';
import {
    SUCCESS_CREATE_QUESTION,
    SUCCESS_GET_QUESTIONS,
    SUCCESS_GET_QUESTION,
    SUCCESS_UPDATE_QUESTION,
    SUCCESS_DELETE_QUESTION,
} from './constants/api-responses';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST_ERROR } from '../../common/api-responses';

@ApiTags(SWAGGER_TAGS.QUIZZES)
@Controller(APP_PATHS.QUIZZES)
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) {}

    @IsPublic()
    @Post()
    @ApiOperation({ summary: 'Создание нового вопроса' })
    @ApiBody({ type: CreateQuestionDto })
    @ApiResponse(SUCCESS_CREATE_QUESTION)
    @ApiResponse(BAD_REQUEST_ERROR)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        return await this.quizzesService.createQuestion(createQuestionDto);
    }

    @IsPublic()
    @Get(':topic/:subtopic')
    @ApiOperation({ summary: 'Получение вопроса по известным topic and subtopic' })
    @ApiParam({ name: 'topic', description: 'Тема вопроса', example: 'javascript' })
    @ApiParam({ name: 'subtopic', description: 'Подтема вопроса', example: 'closures' })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Лимит вопросов для отправки от сервера',
        example: 10,
        default: 10,
    })
    @ApiQuery({
        name: 'questionType',
        required: false,
        description: 'Выбранный тип вопроса',
        enum: ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SINGLE_CHOICE'],
    })
    @ApiResponse(SUCCESS_GET_QUESTIONS)
    @ApiResponse(BAD_REQUEST_ERROR)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    async findAll(
        @Param('topic') topic: string,
        @Param('subtopic') subtopic: string,
        @Query() filterDto: FilterQuestionDto,
    ) {
        return await this.quizzesService.findAllQuestions(topic, subtopic, filterDto);
    }

    @IsPublic()
    @Get(':id')
    @ApiOperation({ summary: 'Получение информации о вопросе по его id' })
    @ApiParam({ name: 'id', description: 'Question id', example: '550e8400-e29b-41d4-a716-446655440000' })
    @ApiResponse(SUCCESS_GET_QUESTION)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    async findOne(@Param('id') id: string) {
        return await this.quizzesService.findQuestion(id);
    }

    @IsPublic()
    @Patch(':id')
    @ApiOperation({ summary: 'Обновление вопроса по id' })
    @ApiParam({ name: 'id', description: 'Question id', example: '550e8400-e29b-41d4-a716-446655440000' })
    @ApiBody({ type: UpdateQuestionDto })
    @ApiResponse(SUCCESS_UPDATE_QUESTION)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
        return await this.quizzesService.updateQuestion(id, updateQuestionDto);
    }

    @IsPublic()
    @Delete(':id')
    @ApiOperation({ summary: 'Удаление вопроса по ИД' })
    @ApiParam({ name: 'id', description: 'Question id', example: '550e8400-e29b-41d4-a716-446655440000' })
    @ApiResponse(SUCCESS_DELETE_QUESTION)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    async remove(@Param('id') id: string) {
        return await this.quizzesService.removeQuestion(id);
    }
}
