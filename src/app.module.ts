import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { MetaoptionModule } from './metaoption/metaoption.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
// import { AuthGuardGuard } from './auth/decorators/auth-guard/auth-guard.guard';
import { DataResponseInterceptor } from './commom/interceptor/data-response/data-response.interceptor';
import { MailModule } from './mail/mail.module';
import { MailProvider } from './mail/providers/mail.provider';
import { PaginationModule } from './commom/pagination.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database:configService.get('POSTGRES_DB') ,
        synchronize:configService.get('POSTGRES_SYNC'), // Used during development; ensure you do not lose your data
        autoLoadEntities: configService.get('POSTGRES_LOAD'), // Automatically load entities instead of specifying them
      }),
    }),
     ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    PostModule,
    TagModule,
    MetaoptionModule,
    AuthModule,
    MailModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide:APP_GUARD,
    //   useClass: AuthGuardGuard,
    // },
    {
      provide:APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard,
    MailProvider
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}