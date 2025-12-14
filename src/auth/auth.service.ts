import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { envVar } from '../common/config/env';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { UserService } from '../user/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokensResponseDto } from './dto/tokens-response.dto';
import { TokenPayload } from './types';

const ERR_INVALID_CREDS = 'invalid login or password';
const ERR_INVALID_REFRESH_TOKEN = 'invalid refresh token';
const ERR_LOGIN_EXISTS = 'login already exists';

const {
  CRYPT_SALT,
  JWT_SECRET_REFRESH_KEY,
  JWT_SECRET_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} = envVar;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signup({ login, password }: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.findOneByLogin(login);
    if (user) {
      throw new ConflictException(ERR_LOGIN_EXISTS);
    }
    const salt = CRYPT_SALT;
    const pass = await bcrypt.hash(password, salt);
    return await this.userService.create({ login, password: pass });
  }

  public async login({ login, password }: CreateUserDto): Promise<TokensResponseDto> {
    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new ForbiddenException(ERR_INVALID_CREDS);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ForbiddenException(ERR_INVALID_CREDS);
    }
    return await this.getTokens({
      userId: user.id,
      login: user.login,
    });
  }

  public async refresh({ refreshToken }: RefreshTokenDto): Promise<TokensResponseDto> {
    if (!refreshToken.trim()) {
      throw new UnauthorizedException(ERR_INVALID_REFRESH_TOKEN);
    }
    try {
      const { userId } = await this.jwtService.verifyAsync<TokenPayload>(refreshToken, {
        secret: JWT_SECRET_REFRESH_KEY,
      });
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new ForbiddenException(ERR_INVALID_REFRESH_TOKEN);
      }
      return await this.getTokens({
        userId: user.id,
        login: user.login,
      });
    } catch {
      throw new ForbiddenException(ERR_INVALID_REFRESH_TOKEN);
    }
  }

  private async getTokens(payload: TokenPayload): Promise<TokensResponseDto> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: TOKEN_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET_REFRESH_KEY,
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
