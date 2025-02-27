// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
// import { AuthType } from "src/auth/enum/auth-type.enums";
// import { AccessTokenGuard } from "./access-token.guard";
// import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
// import { AUTH_TYPE_KEY } from "src/auth/constant/auth-constant";

// @Injectable()
// export class AuthGuardGuard implements CanActivate {
//   private static readonly defaultAuthType = AuthType.Bearer;

//   private readonly AuthTypeGuardMap: Record<AuthType, CanActivate | { canActivate: () => boolean }>;

//   constructor(
//     private readonly reflector: Reflector,
//     private readonly accessTokenGuard: AccessTokenGuard
//   ) {
//     // Initialize AuthTypeGuardMap inside the constructor to properly access `this.accessTokenGuard`.
//     this.AuthTypeGuardMap = {
//       [AuthType.Bearer]: this.accessTokenGuard,
//       [AuthType.None]: { canActivate: () => true },
//     };
//   }

//   canActivate(
//     context: ExecutionContext
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     console.log(this.AuthTypeGuardMap);
//     // get all type from reflector
//     //loop through guards and canActivate
//     const AuthType = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]) ?? AuthGuardGuard.defaultAuthType;
//     console.log(AuthType);
//     //arrays of guards
//     const guards = AuthType.map((type) => this.AuthTypeGuardMap[type].flat())
//     console.log(guards);
//     const error = new UnauthorizedException("User not authorized");

//     //loops guard
//     for (const instance of guards) {
//       const canactivate =  Promise.resolve(
//         instance.canActivate(context)
//       ).catch((err) => {
//         err: err;
//       });

//       if (canactivate) {
//         return true;
//       }
//     }
//     throw error;
//   }
// }
