import { IsOptional,IsInt } from "class-validator";
import { Type } from 'class-transformer';


// this was created because of the undefined in Param controller file
// it is use to transfrom the id to number
export class GetPostsParamDto {
    @IsOptional()
    @IsInt()
    @Type (() => Number )
    id?:number;

}