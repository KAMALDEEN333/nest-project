
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

 
// using the patch to edit part of the data, the partialtype makes everything optional
export class EditUserDto extends PartialType(CreateUserDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}

