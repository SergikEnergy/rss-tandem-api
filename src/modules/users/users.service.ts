import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorMessage } from '../../common/error-message';
import { hashString } from '../../utils/validate-password';

import { TokenService } from '../shared/token.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private tokenService: TokenService,
    ) {}

    private async hashPassword(password: string): Promise<string> {
        try {
            return await hashString(password);
        } catch {
            throw new InternalServerErrorException(ErrorMessage.HASH_PASSWORD_ERROR);
        }
    }

    async checkUserExist(login: string, email?: string): Promise<void> {
        const userWithLogin = await this.usersRepository.findOne({
            where: { login },
        });
        if (userWithLogin) {
            throw new BadRequestException(ErrorMessage.USER_EXIST_LOGIN);
        }
        if (!email) return;

        const userWithEmail = await this.usersRepository.findOne({ where: { email } });
        if (userWithEmail) {
            throw new BadRequestException(ErrorMessage.USER_EXIST_EMAIL);
        }
    }

    async findByLogin(login: string): Promise<User> {
        const existedUser = await this.usersRepository.findOne({
            where: { login },
        });
        if (!existedUser) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

        return existedUser;
    }

    async findByToken(token: string): Promise<Partial<User>> {
        const id = await this.tokenService.getUserIdFromToken(token);

        const { email, login, firstName, lastName, createdAt, updatedAt } = await this.findById(id);

        return { email, login, firstName, lastName, createdAt, updatedAt };
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...restUserData } = createUserDto;
        const hashPassword = await this.hashPassword(password);

        await this.checkUserExist(restUserData.login, restUserData.email);

        const userInfo: Omit<User, 'id'> = { ...restUserData, password: hashPassword };

        const newUser = this.usersRepository.create(userInfo);
        return await this.usersRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findById(id: string): Promise<User> {
        const existedUser = await this.usersRepository.findOne({ where: { id } });
        if (!existedUser) throw new NotFoundException(ErrorMessage.USER_NOT_FOUND);

        return existedUser;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        // update password not implemented
        const { password, ...restUserInfo } = updateUserDto;

        const user = await this.findByLogin(restUserInfo.login ?? '');

        const userInfo: User = { ...user, ...restUserInfo };

        await this.usersRepository.update({ id }, userInfo);

        return userInfo;
    }

    async removeById(id: string) {
        await this.findById(id);
        this.usersRepository.delete({ id });
    }
}
