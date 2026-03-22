import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../types/question-type';
import { DEFAULT_QUESTION_LIMIT } from '../../../common/constants';

export class FilterQuestionDto {
    @ApiPropertyOptional({ name: 'limit', required: false, example: DEFAULT_QUESTION_LIMIT })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiPropertyOptional({ name: 'type', required: false, example: QuestionType.SINGLE_CHOICE })
    @IsOptional()
    @IsEnum(QuestionType)
    questionType?: QuestionType;
}
