export * from './start-server';
export * from './style';

export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
};

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj != null && typeof obj === 'object';
};

export const hasOwnKeys = <T extends object>(obj: unknown, ...keys: (keyof T)[]): obj is T => {
  return isObject(obj) && keys.every(key => Object.prototype.hasOwnProperty.call(obj, key));
};

export const sleep = async (delay: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, delay));
};
