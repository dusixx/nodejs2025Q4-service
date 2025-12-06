import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessage } from '../common/constants';
import { db } from '../common/db';
import { PrismaService } from '../common/services/prisma.service';
import { omit } from '../common/utils/misc';
import { Prisma } from '../prisma/generated/client/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './types';
import { transformUser } from './user.utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public create(createDto: CreateUserDto): UserResponseDto {
    const newUser: Prisma.UserCreateInput = this.prisma.user.create({ data: createDto });
    return transformUser(newUser);
  }

  public async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(transformUser);
  }

  public async findOne(id: string): Promise<UserResponseDto> {
    return omit(await this.findById(id), 'password');
  }

  public async updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user = await this.findById(id);
    if (user.password !== oldPassword) {
      throw new ForbiddenException('old password is invalid');
    }
    const updated: User = {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
    this.users.set(id, updated);
    return omit(updated, 'password');
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    this.users.delete(user.id);
  }

  private async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(ErrorMessage.NotFound`user`);
    }
    return transformUser(user);
  }
}
