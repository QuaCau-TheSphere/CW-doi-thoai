import { assertEquals, assert } from "https://deno.land/std@0.219.0/assert/mod.ts";
import tạoDanhSáchNơiĐăng from "./C.%20T%E1%BA%A1o%20v%C3%A0%20r%C3%BAt%20g%E1%BB%8Dn%20li%C3%AAn%20k%E1%BA%BFt%20UTM/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.219.0/assert/assert_array_includes.ts";

Deno.test("tạoDanhSáchNơiĐăng", () => {
    const check = {
        "Tên nơi đăng": "Một đám mây chim sáo",
        "Loại nơi đăng": "Nhóm",
        "Tên nền tảng": "Facebook",
        "Loại nền tảng": "Mạng xã hội"
      }
    assertArrayIncludes(check, tạoDanhSáchNơiĐăng()) 
} )