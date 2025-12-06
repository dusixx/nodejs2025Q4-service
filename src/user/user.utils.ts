import { User, UserDbEntity } from './types';

export const transformUser = ({ createdAt, updatedAt, ...rest }: UserDbEntity): User => {
  return {
    createdAt: new Date(createdAt).getTime(),
    updatedAt: new Date(updatedAt).getTime(),
    ...rest,
  };
};
