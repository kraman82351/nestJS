import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users =[
        {
          "id": 1,
          "name": "Alice",
          "email": "alice@example.com",
          "role": "INTERN"
        },
        {
          "id": 2,
          "name": "Bob",
          "email": "bob@example.com",
          "role": "ADMIN"
        },
        {
          "id": 3,
          "name": "Charlie",
          "email": "charlie@example.com",
          "role": "ENGINEER"
        },
        {
          "id": 4,
          "name": "David",
          "email": "david@example.com",
          "role": "ENGINEER"
        }
      ]
    
      findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){

        if(role){

            const rolesArray =  this.users.filter(user => user.role === role)
            if(!rolesArray.length)  
              throw new NotFoundException('User Role id not Found')
            return rolesArray
        }
        return this.users
      }

      findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if(!user)
          throw new NotFoundException('User Not Found')

        return user
      }

      create(createUserDto : CreateUserDto) {

        // const hightesId = [...this.users].sort((a,b) => b.id - a.id)
        // const newId = hightesId[0].id + 1

        const newUser = {
            id: this.users.length,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
      }

      update(id : number, updatedUserDto: UpdatedUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...updatedUserDto} //this will spread all the properties of the user and the updateduser will overwrite the properties it contain
            }
            return user
        })

        return this.findOne(id)
      }

      delete(id : number){
        const deletedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return deletedUser
      }


}
