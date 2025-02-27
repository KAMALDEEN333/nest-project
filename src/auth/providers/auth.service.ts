import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignInDto } from 'src/DTO/signin-dto';
import { UserService } from 'src/users/providers/user.services';
import { SignInProviders } from './sign-in.providers';
import { RefreshTokenDto } from '../dto/refresh-token-dto';
import { RefreshTokenProvider } from './refreshToken.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) 
        private readonly userService: UserService,

        //intra dependency injection of sigin Providers
        private readonly signInProviders:SignInProviders,

        private readonly refreshTokenProvider:RefreshTokenProvider
    ) {}

    public async SignIn(signInDto:SignInDto) {
        // find user in database by email
       return await this.signInProviders.SignIn(signInDto)

        // throw an error if user is not found
        // compare password to the hashed password
        // send confirmation message 

    }

    public async RefreshToken (refreshTokendto:RefreshTokenDto) {
        return await this.refreshTokenProvider.refreshToken
    }
}