import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { shouldRequired } from '../../../common/generate-mesages';
import { QuestionType } from '../types/question-type';

import { CreateAnswerDto } from './create-answer.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
    @ApiProperty({
        example: 'Topic for questions',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty({
        message: shouldRequired('topic'),
    })
    topic: string;

    @ApiProperty({
        example: 'Subtopic for questions',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty({
        message: shouldRequired('subtopic'),
    })
    subtopic: string;

    @ApiProperty({
        example: 'THis is the some question to involve the guests, Guess smth?',
        required: true,
        type: String,
    })
    questionDescription: string;

    @ApiProperty({
        example: 'Question description',
        required: true,
        type: String,
    })
    @IsOptional()
    @IsEnum(QuestionType)
    type: QuestionType;

    @ApiProperty({
        example: [
            { answerText: 'Answer 1', isCorrect: true },
            { answerText: 'Answer 2', isCorrect: false },
        ],
        required: false,
        type: [CreateAnswerDto],
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    answers?: CreateAnswerDto[];
}
