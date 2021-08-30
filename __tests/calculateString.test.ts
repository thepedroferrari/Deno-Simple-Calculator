import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { calculateString } from "../utils.ts";
import { Messages } from "../constants.ts";

Deno.test("Response for 5 - 2", () => {
  const calc = calculateString("5-2");
  assertEquals(calc, "3");
});

Deno.test("Response for 5 - 2 * 2", () => {
  const calc = calculateString("5-2*2");
  assertEquals(calc, "1");
});

Deno.test("Response for 5 - 2 * -2", () => {
  const calc = calculateString("5-2*-2");
  assertEquals(calc, "9");
});

Deno.test("Response for 2x + 3", () => {
  const calc = calculateString("2x+3");
  assertEquals(calc, Messages.INVALID_INPUT);
});

Deno.test("Response for 2 - -3", () => {
  const calc = calculateString("2--4");
  assertEquals(calc, Messages.INVALID_INPUT);
});

Deno.test("Response for 2 + 3", () => {
  const calc = calculateString("2+3");
  assertEquals(calc, "5");
});

Deno.test("Response for Missing Parameter", () => {
  const calc = calculateString("http://anything.com");
  assertEquals(calc, Messages.INVALID_INPUT);
});
