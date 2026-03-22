import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { APP_PATHS, SWAGGER_TAGS } from '../../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/guards/is-public';

@ApiTags(SWAGGER_TAGS.QUIZZES)
@Controller(APP_PATHS.QUIZZES)
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) {}

    // remove public after database full
    @IsPublic()
    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        return await this.quizzesService.createQuestion(createQuestionDto);
    }

    @IsPublic()
    @Get(':topic/:subtopic')
    async findAll(
        @Param('topic') topic: string,
        @Param('subtopic') subtopic: string,
        @Query() filterDto: FilterQuestionDto,
    ) {
        return await this.quizzesService.findAllQuestions(topic, subtopic, filterDto);
    }

    @IsPublic()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.quizzesService.findQuestion(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
        return await this.quizzesService.updateQuestion(id, updateQuestionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.quizzesService.removeQuestion(id);
    }
}
