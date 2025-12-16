import { ParseUUIDPipe } from '@nestjs/common';
import { UUID_VER } from '../constants';
import { Prisma } from '../prisma/generated/client/client';
import { red } from './style';

export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
};

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj != null && typeof obj === 'object';
};

export const isStr = (obj: unknown): obj is string => {
  return typeof obj === 'string';
};

export const hasOwnKeys = <T extends object>(obj: unknown, ...keys: (keyof T)[]): obj is T => {
  return isObject(obj) && keys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
};

export const sleep = async (delay: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, delay));
};

export const getErrorMessage = (err: unknown, defaultMessage = 'something went wrong'): string => {
  return err instanceof Error ? err.message : isStr(err) ? err : defaultMessage;
};

export const showError = (err: unknown): void => {
  console.log(red('Error: '), getErrorMessage(err));
};

export const validateUUID = (): ParseUUIDPipe => {
  return new ParseUUIDPipe({ version: UUID_VER });
};

export const isPrismaNotFoundError = (
  err: unknown,
): err is Prisma.PrismaClientKnownRequestError => {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025';
};
