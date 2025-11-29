import { styleText } from 'node:util';

export const style = (mod: Parameters<typeof styleText>[0], ...args: unknown[]): string => {
  return styleText(mod, args.join(' '));
};
export const cyan = (...args: unknown[]): string => style('cyan', ...args);
export const red = (...args: unknown[]): string => style('red', ...args);
export const yellow = (...args: unknown[]): string => style('yellow', ...args);
export const green = (...args: unknown[]): string => style('green', ...args);
export const gray = (...args: unknown[]): string => style('gray', ...args);
export const magenta = (...args: unknown[]): string => style('magenta', ...args);

export const stylizeHttpStatus = (result: number): string => {
  if (result < 200) {
    return cyan(result);
  } else if (result < 300) {
    return green(result);
  } else if (result < 400) {
    return yellow(result);
  }
  return red(result);
};
