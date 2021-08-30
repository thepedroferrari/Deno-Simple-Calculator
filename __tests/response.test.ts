import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { response } from "../utils.ts";
import { Messages } from "../constants.ts";

Deno.test("Response for 5 - 2", () => {
  const calc = response("http://anything.com?blablabla&calc=5-2");
  assertEquals(calc, "3");
});

Deno.test("Response for 5 - 2 * 2", () => {
  const calc = response("http://anything.com?blablabla&calc=5-2*2");
  assertEquals(calc, "1");
});

Deno.test("Response for 5 - 2 * -2", () => {
  const calc = response("http://anything.com?blablabla&calc=5-2*-2");
  assertEquals(calc, "9");
});

Deno.test("Response for 2x + 3", () => {
  const calc = response("http://anything.com?blablabla&calc=2x+3");
  assertEquals(calc, "The arithmetic operation is malformed.");
});

Deno.test("Response for 2 - -3", () => {
  const calc = response("http://anything.com?blablabla&calc=2--4");
  assertEquals(calc, "The arithmetic operation is malformed.");
});

Deno.test("Response for 2 + 3", () => {
  const calc = response("http://anything.com?blablabla&calc=2%2B3");
  assertEquals(calc, "5");
});

Deno.test("Response for Missing Parameter", () => {
  const calc = response("http://anything.com");
  assertEquals(
    calc,
    `${Messages.MISSING_PARAM_MSG}: The URI must contain a parameter named calc`
  );
});
