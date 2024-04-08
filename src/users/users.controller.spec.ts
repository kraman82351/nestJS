import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';

/*
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
*/

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () =>{

    it('should return list of all users with ADMIN role', () => {
      const role = 'ADMIN';
      const result = [
        {
          "id": 2,
          "name": "Bob",
          "email": "bob@example.com",
          "role": "ADMIN"
        }    
      ];

      expect(controller.findAll(role)).toEqual(result);
    });


    it('should return an array of users with ENGINEER role', () => {
      const role = 'ENGINEER';
      const users = [
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
      ];
  
      expect(controller.findAll(role)).toEqual(users);
    });

    //Jest can only capture exceptions thrown from within a function thats y we nned to invoke the controller using a function call
    it('should throw NotFoundException if an invalid role is provided', () => {
      const invalidRole = 'INVALID_ROLE';
    
      expect(() => controller.findAll(invalidRole as any)).toThrow(NotFoundException);

    });

    it('should throw NotFoundException if an invalid role is provided', () => {
      const invalidRole = 1;
    
      expect(() => controller.findAll(invalidRole as any)).toThrow(NotFoundException);
      
    });   
    

  }); 

  describe('findOne', () => {

    it('should return a particular user', () =>{
      const id = 1;
      const result = {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "role": "INTERN"
      }

      expect(controller.findOne(id)).toEqual(result)
    })
    
    it('should throw a NotFoundException if passed id is not present', () => {
      const id = 999;

      expect(() => controller.findOne(id)).toThrow(NotFoundException)
    })

    it('it should throw a NotFoundException if the passed id not of number type', () => {
      const id = 'INVALID_ID';

      expect(() => controller.findOne(id as any)).toThrow(NotFoundException)
    })
    
  })

  describe("create", () => {

    it('should create a new user', () => {

      const createUserDto : CreateUserDto = {
        name: "Alice",
        email: "alice@example.com",
        role: "INTERN"
      }

      const newUser = controller.create(createUserDto);

      expect(newUser).toHaveProperty('id');
      expect(newUser.name).toEqual(createUserDto.name);
      expect(newUser.email).toEqual(createUserDto.email);
      expect(newUser.role).toEqual(createUserDto.role);

      expect(service['users']).toContain(newUser)

    })

    it('should fail validation as name is empty', async () => {

      const createUserDto : CreateUserDto = {
        name: "",
        email: "john@gmail.com",
        role: "INTERN"
      }

      const errors = await validate(createUserDto);
      console.log(errors)
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isEnum');

    })
    


  })

});
