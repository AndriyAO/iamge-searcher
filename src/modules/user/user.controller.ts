import { Controller, Post, Body, Get, Param, Query, HttpException } from '@nestjs/common';
import { User } from 'src/interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Get(':id')
    getUserById(@Param('id') id): User {
        return this.userService.getUserById(id);
    }

    @Post('login')
    login(@Body() user: User) {
        if (!user.email && !user.password) {
            throw new HttpException('Email or password is missing', 400);
        }
        return this.userService.login(user);
    }
}
