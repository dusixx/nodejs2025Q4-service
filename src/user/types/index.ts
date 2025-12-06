export type User = {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
};

export type UserWithoutPassword = Omit<User, 'password'>;

export type UserDbEntity = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};
