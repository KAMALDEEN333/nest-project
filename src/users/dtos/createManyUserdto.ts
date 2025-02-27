import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateUserDto } from "src/DTO/create-user.dto";

export class CreateManyUsersDto{


    @ApiProperty({
        type: 'array',
        required: true,
        items: {
            type: 'User',
        },
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=> CreateUserDto)
    users: CreateUserDto[];
}

// validatrenested means for all validation in creteuserdto should also work for manyuserdto