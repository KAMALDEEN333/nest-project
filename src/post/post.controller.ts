import { Body, Controller, DefaultValuePipe, Delete,Patch, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { PostsService } from './provider/post.service';
import { GetPostsParamDto } from 'src/DTO/postparamdto';
import { CreatePostDto } from 'src/DTO/create-post.dto';
import { ApiQuery } from '@nestjs/swagger';
import { PatchPostDto } from 'src/DTO/patch-post.dto';
import { GetPostsDto } from 'src/DTO/getPostdto';


@Controller('posts')
export class PostController {
    constructor (private readonly postService:PostsService) {}
    // performing dependencies injection on line 11


    // @Get('/:id?')
    // public getPosts  ( @Query() getPostdto:GetPostsDto,
    //     @Param()getpostsparamdto:GetPostsParamDto,
    //     @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit:number,
    //     @Query("page", new DefaultValuePipe(2), ParseIntPipe) page:number
    // ) {
    //     console.log(getPostdto)
      
    //     return this.postService.FindAllposts(getPostdto)
    // }

    @Get('/:id?')
  public getPosts(
    @Query() getPostDto: GetPostsDto
  ){
    return this.postService.FindAllposts(getPostDto)
    console.log(getPostDto);
    
  }

    @Post()
    public Createpost(@Body() createpostdto:CreatePostDto) {
        // console.log(createpostdto instanceof CreatePostDto)
            return this.postService.createPost(createpostdto)
            
    }


    @Delete()
    public deleteOne(@Query('id', ParseIntPipe) id:number)  {

        return this.postService.deleteOne(id)

    }

    @Patch()
      public updatePostTag(@Body() patchPostDto: PatchPostDto) {
        return this.postService.UpdatePost(patchPostDto)
      }
    
}


