import { UserWithoutPassword } from '../types';

export class UserResponseDto implements UserWithoutPassword {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
