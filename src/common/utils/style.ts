import { styleText } from 'node:util';

type StyleFunc = (...args: unknown[]) => string;

export const style = (mod: Parameters<typeof styleText>[0], ...args: unknown[]): string => {
  return styleText(mod, args.join(' '));
};
export const cyan: StyleFunc = (...args) => style('cyan', ...args);
export const red: StyleFunc = (...args) => style('red', ...args);
export const yellow: StyleFunc = (...args) => style('yellow', ...args);
export const green: StyleFunc = (...args) => style('green', ...args);
export const gray: StyleFunc = (...args) => style('gray', ...args);
export const magenta: StyleFunc = (...args) => style('magenta', ...args);

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
