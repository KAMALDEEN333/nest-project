import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from 'src/DTO/signin-dto';
import { UserService } from 'src/users/providers/user.services';
import { HashingProvider } from './hashing';
import { access, truncate } from 'fs';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokenProvider } from './token.provider';

@Injectable()
export class SignInProviders {
    constructor (
        //circular dependency injection
        @Inject(forwardRef(() => UserService))
        private readonly userService:UserService,

        //intra dependcy injection of hash provider
        private readonly hashingProvider:HashingProvider,

        // injecting generatetokenprovider
        private readonly generateTokenProvider:GenerateTokenProvider


    ) {}

    public async SignIn (signInDto:SignInDto) {
        // find user by email
        // throw an error
        let user =  await this.userService.GetOneByEmail(signInDto.email)
        
        //compare the password to the hashed password
        let isEqual:boolean = false;
        try {
            isEqual = await this.hashingProvider.comparePassword(signInDto.password, user.password)

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description:'error connecting to database'
            })

        }

        //send a confirmation
        if(!isEqual) {
            throw new UnauthorizedException('password/email is wrong')
        }
        
       
        const token = await this.generateTokenProvider.generateTokens(user)
        return [token ,user]
    //accesstoken store into local storage,
    //refreshtoken stored in DB

    }    

}
