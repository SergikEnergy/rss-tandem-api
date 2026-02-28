import { ApiProperty } from '@nestjs/swagger';
import { MAX_LOGIN_LENGTH, MAX_PASS_LENGTH, MIN_LOGIN_LENGTH, MIN_PASS_LENGTH } from '../../../common/constants';
import { notValidMessage, shouldBeString, shouldRequired } from '../../../common/generate-mesages';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { PASSWORD_REGEXP } from '../../../common/reg-ex';
import { ErrorMessage } from '../../../common/error-message';

export class CreateUserDto {
    @ApiProperty({
        example: 'testUser3434@gmail.com',
        required: true,
        type: String,
    })
    @IsString()
    @IsEmail({}, { message: notValidMessage('email') })
    @IsNotEmpty({
        message: shouldRequired('email'),
    })
    email: string;

    @ApiProperty({
        example: 'SuperUser',
        required: true,
        type: String,
    })
    @Length(MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH)
    @IsString()
    @IsNotEmpty({
        message: shouldRequired('login'),
    })
    login: string;

    @ApiProperty({
        example: 'SecretPassword24',
        required: true,
        type: String,
    })
    @Matches(PASSWORD_REGEXP, { message: ErrorMessage.PASSWORD_REGEXP })
    @Length(MIN_PASS_LENGTH, MAX_PASS_LENGTH)
    @IsString()
    @IsNotEmpty({
        message: shouldRequired('password'),
    })
    password: string;

    @ApiProperty({
        example: '',
        required: false,
        type: String,
    })
    @IsString({ message: shouldBeString('firstName') })
    @IsOptional()
    @ApiProperty({
        example: 'Ivan',
        required: false,
        type: String,
    })
    firstName?: string;

    @ApiProperty({
        example: 'Ivanov',
        required: false,
        type: String,
    })
    @IsString({ message: shouldBeString('firstName') })
    @IsOptional()
    lastName?: string;
}
