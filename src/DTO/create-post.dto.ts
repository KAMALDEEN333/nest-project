import { IsArray, IsDate, IsEnum, IsIn, IsInt, IsISO8601, isNotEmpty, IsNotEmpty, IsNumber,IsOptional,IsString, MinLength, ValidateNested } from "class-validator";
import { PostStatus } from "src/post/Enums/post-status.enum";
import { postType } from "src/post/Enums/post-type.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreatePostMetaOptionsDto } from "./createPostMetadto";

export class CreatePostDto {
    
    @ApiProperty({
        description:"the tittle must be a string",
        example:"jane Doe"
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    @IsInt()
    authorId:number;

    @ApiProperty({
        enum:postType,
        description:"possible value are series,story,post,page"
    })
    @IsEnum(postType)
    postType: postType;


    @ApiProperty({
        enum:PostStatus,
        description:"possible value are review,schedule,draft,publish "
    })
    @IsEnum(PostStatus)
    PostStatus:PostStatus;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content: string;

    @IsString()
    @IsOptional()
    imageUrl:string;

    @IsDate()
    @IsISO8601()
    @IsOptional()
    publishedDate:Date;

    @ApiProperty({
        description:"possible value are strings"
    })
    @IsArray()
    @IsInt({each:true})
    @IsOptional()
    tags: number[];

    // @ApiPropertyOptional({
    //     type: 'object',
    //     required: false,
    //     items:{
    //         type:'object',
    //         properties:{
    //             metaValue:{
    //                 type:'json',
    //                 description:'the meta value json string',
    //                 example:'{sidebarEnabled: true}',
    //             }
    //         }
    //     }
    // })


    @IsOptional()
    @ValidateNested({each:true})
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto | null;
}
