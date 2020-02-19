import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';

@Controller('user')
export class UserController {
    

    @Post()
    createUser(@Body() user: User) {
        return ;
    }

    @Get(':id')
    getUserById(@Param('id') id): User {
        return;
    }


    @Post('login')
    login(@Body() user: User) {
        return;
    }
}
