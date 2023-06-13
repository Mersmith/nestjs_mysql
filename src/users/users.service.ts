import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(user: CreateUserDTO) {

        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException('Este usuario existe', HttpStatus.CONFLICT);
        }

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers() {
        return this.userRepository.find();
    }

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!userFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }

        return userFound;
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete({ id: id });

        if (result.affected === 0) {
            return new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateUser(id: number, user: UpdateUserDTO) {

        const userFound = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!userFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }

        const updateUser = Object.assign(userFound, user)
        return this.userRepository.update({ id: id }, user);
    }
}
