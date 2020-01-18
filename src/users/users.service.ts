import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(user: User): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ['fullName', 'birthday', 'isActive'],
            where: [{ id }],
        });
    }
    async createUser(user: User) {
        return await this.usersRepository.save(user);
    }

    async updateUser(user: User) {
        this.usersRepository.update(user.id, user);
    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }
}
