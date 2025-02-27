import { IntersectionType } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDto } from "src/commom/pagination/pagination-query.dto";


class GetPostsBaseDto {

    @IsDate()
    @IsOptional()
    startDate?: Date


    
    @IsDate()
    @IsOptional()
    endDate?: Date

}

export class GetPostsDto extends IntersectionType (
    GetPostsBaseDto,
    PaginationQueryDto
) {}

// actual dto we want to sent on line 21 and 22
// intersection used to add both of their contents together