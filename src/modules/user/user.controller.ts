import { Controller, Post, Body, Get, Param, BadRequestException, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { User } from 'src/interfaces';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserById(@Param('id') id): User {
        const user = this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException('User does not exist.');
        }
        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): User {
        return this.userService.login(req.user);
    }
}
