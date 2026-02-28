import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
    SerializeOptions,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { APP_PATHS, SWAGGER_TAGS } from '../../common/constants';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { GET_ME_SUCCESS, SUCCESS_GET_USERS } from './constants/api-responses';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../../common/api-responses';

@ApiTags(SWAGGER_TAGS.USER)
@Controller(APP_PATHS.USER)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: User })
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'get users - only for Admin available' })
    @ApiResponse(SUCCESS_GET_USERS)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'get users - only for Admin available' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':login')
    @ApiOperation({ summary: 'Получение информации по профилю ' })
    @ApiBearerAuth()
    @ApiResponse(GET_ME_SUCCESS)
    @ApiResponse(UNAUTHORIZED)
    @ApiResponse(INTERNAL_SERVER_ERROR)
    findOne(@Param('login') login: string) {
        return this.usersService.findByLogin(login);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Пока недоступна' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Пока недоступна' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.removeById(id);
    }
}
