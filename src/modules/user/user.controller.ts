import { Controller, Post, Body, Get, Param, BadRequestException, NotFoundException, HttpException } from '@nestjs/common';
import { User } from 'src/interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('register')
    createUser(@Body() user: User): User {
        if (!user.email && !user.password) {
            throw new BadRequestException('Email or password is missing');
        }
        return this.userService.createUser(user);            
    }

    @Get(':id')
    getUserById(@Param('id') id): User {
        const user = this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException('User does not exist.');
        }
        return user;
    }

    @Post('login')
    login(@Body() user: User): User {
        if (!user.email && !user.password) {
            throw new BadRequestException('Email or password is missing');
        }
        return this.userService.login(user);
    }
}
