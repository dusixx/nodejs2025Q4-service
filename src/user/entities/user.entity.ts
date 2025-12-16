import { Exclude, Transform } from 'class-transformer';
import { User } from '../types';

export class UserEntity implements User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  createdAt: number;

  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  updatedAt: number;
}

export class UserEntityWithPassword implements User {
  id: string;
  login: string;
  password: string;
  version: number;

  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  createdAt: number;

  @Transform(({ value }: { value: Date }) => new Date(value).getTime())
  updatedAt: number;
}
