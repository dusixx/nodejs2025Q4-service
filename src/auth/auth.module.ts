import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { envVar } from '../common/config/env';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: envVar.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: envVar.TOKEN_EXPIRE_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtService],
  exports: [JwtModule],
})
export class AuthModule {}
