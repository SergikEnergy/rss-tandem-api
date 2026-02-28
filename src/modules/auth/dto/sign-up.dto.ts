import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';

export class SignUpDto extends PickType(CreateUserDto, ['email', 'firstName', 'lastName', 'login', 'password']) {}
