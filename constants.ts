import type { Operation } from "./types.ts";

/**
 * breaks numbers apart from other strings. Keeps numbers together until
 * there is another character. numbers may start with -
 * I am not very good with regexp yet: https://xkcd.com/1171/
 */
export const BREAK_NUMBERS_REGEX = new RegExp(/((?:^-)?[0-9\.]+)/g);

export enum Messages {
  INVALID_INPUT = "The arithmetic operation is malformed.",
}

export const OPS_ARR: Operation[] = ["*", "*-", "-", "+", "+-"];
