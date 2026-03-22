import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { shouldRequired } from '../../../common/generate-mesages';

export class CreateAnswerDto {
    @ApiProperty({
        example: 'Answer text',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty({
        message: shouldRequired('answerText'),
    })
    answerText: string;

    @ApiProperty({
        example: false,
        required: false,
        type: Boolean,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    isCorrect?: boolean;
}
