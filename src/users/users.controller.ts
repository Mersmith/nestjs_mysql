import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Delete, Patch } from '@nestjs/common/decorators';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get('usuarios') //http://localhost:3000/users/usuarios
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get('usuario/:id') //http://localhost:3000/users/usuario/1
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.getUser(id);
    }

    @Post('crear') //http://localhost:3000/users/crear
    createUser(@Body() newUser: CreateUserDTO) {
        return this.usersService.createUser(newUser);
    }

    @Delete('eliminar/:id') //http://localhost:3000/users/eliminar/1
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    @Patch('actualizar/:id') //http://localhost:3000/users/actualizar/2
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDTO) {
        
        
        
        
        return this.usersService.updateUser(id, user);
    }
}
