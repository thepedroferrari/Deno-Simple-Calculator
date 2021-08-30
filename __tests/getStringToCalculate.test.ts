import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { getStringToCalculate } from "../utils.ts";
import { Messages } from "../constants.ts";

Deno.test(
  "Get String to calculate from URL http://anything.com?blablabla&calc=5-2",
  () => {
    const str = getStringToCalculate("http://anything.com?blablabla&calc=5-2");
    assertEquals(str, "5-2");
  }
);

Deno.test("Get String to calculate from URL with Missing Param", () => {
  const str = getStringToCalculate("http://anything.com");
  assertEquals(str, Messages.MISSING_PARAM_MSG);
});
