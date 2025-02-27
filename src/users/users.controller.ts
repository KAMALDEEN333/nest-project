import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  Patch,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from 'src/DTO/create-user.dto';
import { GetuserParamDto } from 'src/DTO/userparamdto';
import { UserService } from './providers/user.services';
import { EditUserDto } from 'src/DTO/patch-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiQuery } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateManyUsersDto } from './dtos/createManyUserdto';

@Controller('users')
// line 14 is a method
// TO GEt users
@ApiTags('Users')
export class UsersController {
  // performing an dependencies injection online 17
  constructor(private readonly userService: UserService) {}

  // doing validation with pipes on line 33 to 34
  // http://localhost:3000/users/23333?search=John&role=admin
  // to search on url for params and query

  // performing api description for @Get which displays in our swagger in the browser
  @ApiResponse({
    status: 200,
    description: 'users fetched successfully based on the query',
  })
  @ApiOperation({
    summary: 'Fetch all the users',
  })

  //using a guard 
  // @UseGuards(AccessTokenGuard)
  @Get('/:id?')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'the number of entries returned per query',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'the page number of entries returned per query',
  })
  @Auth(AuthType.Bearer)
  public getUsers(
    @Param() getuserParamDto: GetuserParamDto,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    // we have tranform and validate our id,Query using pipe
    console.log(getuserParamDto);
    return this.userService.findAll(getuserParamDto, limit, page);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  // @SetMetadata('authType, 'None')
  @Auth(AuthType.None)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto instanceof CreateUserDto)
    return this.userService.createUsers(createUserDto);
  }

  @Post('/many-users')
  public createMany (@Body() createManyUserDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUserDto)

  }

  @Delete()
  public deleteUsers() {
    return this.userService.deleteUser;
  }

  @Patch()
  public editedPost(@Body() edituserDto: EditUserDto) {
    return this.userService.editUser(edituserDto);
  }











}












