import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ErrorMessage } from '../common/constants';
import { PrismaService } from '../common/prisma-service/prisma.service';
import { isPrismaNotFoundError } from '../common/utils/misc';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserEntity, UserEntityWithPassword } from './entities/user.entity';
import { UserDbEntity } from './types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this.prisma.user.create({ data: createDto });
    return plainToInstance(UserEntity, newUser);
  }

  public async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(u => plainToInstance(UserEntity, u));
  }

  public async findOne(id: string): Promise<UserResponseDto> {
    return plainToInstance(UserEntity, await this.findById(id));
  }

  public async findOneByLogin(login: string): Promise<UserEntityWithPassword> {
    const user = await this.prisma.user.findUnique({
      where: { login },
    });
    return plainToInstance(UserEntityWithPassword, user);
  }

  public async updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user = await this.findById(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('old password is invalid');
    }
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: {
          password: newPassword,
          version: user.version + 1,
        },
      });
      return plainToInstance(UserEntity, updated);
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`user`);
      }
      throw err;
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`user`);
      }
      throw err;
    }
  }

  private async findById(id: string): Promise<UserDbEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(ErrorMessage.NotFound`user`);
    }
    return user;
  }
}
