import type { Operation } from "./types.ts";
export const URL_PARAM = "calc";

/**
 * breaks numbers apart from other strings. Keeps numbers together until
 * there is another character. numbers may start with -
 * I am not very good with regexp yet: https://xkcd.com/1171/
 */
export const BREAK_NUMBERS_REGEX = new RegExp(/((?:^-)?[0-9\.]+)/g);

export enum Messages {
  MISSING_PARAM_MSG = "missing calc param",
  INVALID_INPUT = "The arithmetic operation is malformed.",
}

export const OPS_ARR: Operation[] = ["*", "*-", "-", "+", "+-"];
