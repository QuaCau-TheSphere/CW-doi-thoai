import { assertEquals } from "https://deno.land/std@0.219.0/assert/mod.ts";
import tạoDanhSáchVậtThểBàiViết from "./A.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20v%E1%BA%ADt%20th%E1%BB%83%20b%C3%A0i%20vi%E1%BA%BFt/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import { KếtQuảPhânLoại } from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20vi%E1%BB%87c%20x%E1%BB%AD%20l%C3%BD.ts";

const vậtThểKếtQuảPhânLoại = {
  'Câu nhập': 'c31',
  'Bài viết': 'Trấn Kỳ — Phân loại câu nhập bằng tiếng Việt tự nhiên',
  'Loại bài viết': 'C Trấn Kỳ',
  'Nơi đăng': 'Vùng đất Quả Cầu',
  'Loại nơi đăng': 'Nhóm Facebook'
} satisfies KếtQuảPhânLoại

// Compact form: name and function
Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

// Compact form: named function.
Deno.test(async function helloWorld3() {
  const x = await tạoDanhSáchVậtThểBàiViết("D:\\QC supplements\\Vaults\\C Obsidian, quản lý dự án và công cụ nghĩ", 'https://obsidian.quảcầu.cc') 
  ;
  assertEquals(x, 3);
});

// Longer form: test definition.
Deno.test({
  name: "hello world #2",
  fn: () => {
    const x = 1 + 2;
    assertEquals(x, 3);
  },
});

// Similar to compact form, with additional configuration as a second argument.
Deno.test("hello world #4", { permissions: { read: true } }, () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

// Similar to longer form, with test function as a second argument.
Deno.test(
  { name: "hello world #5", permissions: { read: true } },
  () => {
    const x = 1 + 2;
    assertEquals(x, 3);
  },
);

// Similar to longer form, with a named test function as a second argument.
Deno.test({ permissions: { read: true } }, function helloWorld6() {
  const x = 1 + 2;
  assertEquals(x, 3);
});