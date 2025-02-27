import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { RefreshTokenDto } from "../dto/refresh-token-dto";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { UserService } from "src/users/providers/user.services";
import { GenerateTokenProvider } from "./token.provider";


@Injectable()
export class RefreshTokenProvider {
    
    constructor (

         @Inject(forwardRef(() => UserService)) 
            private readonly userService: UserService,

        private readonly jwtService:JwtService,

         // jwt config injecion
          @Inject(jwtConfig.KEY)
         private readonly jwtconfiguration:ConfigType<typeof jwtConfig>,

          // injecting generatetokenprovider
          private readonly generateTokenProvider:GenerateTokenProvider
         
        
    ) {}
    
    public async refreshToken (refreshTokendto:RefreshTokenDto) {
    try {
            // validate refreshtoken using jwtService
           const {sub} = await this.jwtService.verifyAsync(refreshTokendto.refreshToken,{
                secret:this.jwtconfiguration.secret,
                audience:this.jwtconfiguration.audience,
                issuer:this.jwtconfiguration.issuer,
            })
    
            // grab(find) the user from the database
            const user = await this.userService.findOneId(sub)
    
            // generate the token
            return await this.generateTokenProvider.generateTokens(user)
    
        }

    catch (error) {
        throw new UnauthorizedException(error)
        
    }

}


}