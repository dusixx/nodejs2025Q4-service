import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import uuid from 'uuid';
import { omit } from '../common/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './types';

@Injectable()
export class UserService {
  private users = new Map<string /*id*/, User>();

  public create({ login, password }: CreateUserDto): UserResponseDto {
    if (this.isUserExists(login)) {
      throw new ConflictException();
    }
    const now = Date.now();
    const newUser: User = {
      id: crypto.randomUUID(),
      login,
      password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(newUser.id, newUser);
    return omit(newUser, 'password');
  }

  public findAll(): UserResponseDto[] {
    return [...this.users.values()].map(user => omit(user, 'password'));
  }

  public findOne(id: string): UserResponseDto {
    return omit(this.findById(id), 'password');
  }

  public updatePassword(
    id: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ): UserResponseDto {
    const user = this.findById(id);
    if (user.password !== oldPassword) {
      throw new ForbiddenException();
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

  public remove(id: string): void {
    const user = this.findById(id);
    this.users.delete(user.id);
  }

  private isUserExists(login: string): User {
    return [...this.users.values()].find(user => login === user.login);
  }

  private findById(id: string): User {
    if (!uuid.validate(id)) {
      throw new BadRequestException();
    }
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
