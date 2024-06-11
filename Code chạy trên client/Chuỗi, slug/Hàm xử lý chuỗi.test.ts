import { assertEquals } from "https://deno.land/std@0.216.0/assert/assert_equals.ts";
import { xửLýPunycode } from "../URL, HTML/Hàm và kiểu cho URL.ts";

Deno.test("https://xn--qucu-hr5aza.cc", () => {
  assertEquals(xửLýPunycode("https://xn--qucu-hr5aza.cc"), "https://quảcầu.cc");
  assertEquals(
    xửLýPunycode("https://phụ.tênmiền.org/%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn?x=query%20t%C3%ACm%20ki%E1%BA%BFm"),
    "https://phụ.tênmiền.org/đường%20dẫn?x=query%20tìm%20kiếm",
  );
});
