import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Get()  //GET /users or users/role= any value(Query param)
    findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER' ) {
        return this.UsersService.findAll(role)
    }

    @Get(':id')  //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id:number){  //middleware parseIntPipe is changes the string type id to number type
        return this.UsersService.findOne(id) //unary + is an easy way to convert strong to number
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) createUserdto : CreateUserDto){
        return this.UsersService.create(createUserdto)
    }

    @Patch(':id')  //PATCH /users/:id
    update(@Param('id' , ParseIntPipe) id:number, @Body(ValidationPipe) updatedUserDto: UpdatedUserDto){
        return this.UsersService.update(id, updatedUserDto)
    }

    @Delete(':id')  //DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id:number){
        return this.UsersService.delete(id)
    }
}
