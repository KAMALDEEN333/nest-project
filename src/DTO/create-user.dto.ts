import { 
    IsString,
    IsOptional,
    IsEmail,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Matches, 
    IsEnum
} from "class-validator";
import { Column } from "typeorm";







export class CreateUserDto {

    @Column()
    @IsString()
    firstName: string;

    @Column()
    @IsString()
    lastName: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    // @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/, {
    //     message: 'Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    // })
    password: string;


    
}




