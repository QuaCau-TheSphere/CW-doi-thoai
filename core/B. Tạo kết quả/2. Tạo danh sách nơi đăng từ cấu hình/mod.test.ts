import { parse } from "$std/yaml/mod.ts";
import { join } from "$std/path/join.ts";
import tạoDanhSáchNơiĐăng from "./mod.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.219.0/assert/assert_array_includes.ts";
import { assert } from "$std/assert/assert.ts";
import tạoCácPhiênBảnVịTrí, { CấuHìnhThiếtLậpChung, cóLoạiNơiĐăngTrongCấuHìnhVịTrí, tạoCácPhiênBảnCủaNơiĐăngTheoVịTrí } from "./Tạo các phiên bản vị trí.ts";
import CấuHìnhNơiĐăng, { NơiĐăng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng%20chat.ts";


const nơiĐăng1 = {
  "Tên nơi đăng": ["Lý Minh Nhật"],
  "Loại nơi đăng": ["Tài khoản"],
  "Tên nền tảng": "Facebook",
  "Loại nền tảng": "Diễn đàn",
} satisfies NơiĐăng;

const nơiĐăng2 = {
  "Tên nơi đăng": [
    "Quả Cầu",
    "#g-nghiên-cứu-liên-ngành",
    "Lý tính, khoa học, diễn ngôn",
  ],
  "Loại nơi đăng": ["Máy chủ", "Text channel", "Thread"],
  "Tên nền tảng": "Discord",
  "Loại nền tảng": "Chat",
} satisfies NơiĐăng;


Deno.test("Kiểm tra hàm loạiNơiĐăngCóTrongCấuHìnhVịTrí", () => {
  assert(
    cóLoạiNơiĐăngTrongCấuHìnhVịTrí(nơiĐăng1, [
      "Diễn đàn",
      "Facebook",
      "Tài khoản",
    ]),
  );
  //deno-fmt-ignore
  assert(cóLoạiNơiĐăngTrongCấuHìnhVịTrí(nơiĐăng2, ["Chat", "Discord", "Máy chủ", "Text channel", "Thread"]));
});

//deno-fmt-ignore
const cấuHìnhThiếtLậpChung = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml')) as CấuHìnhThiếtLậpChung
Deno.test("Thêm vị trí nhỏ hơn", () => {
  assertArrayIncludes(
    //deno-fmt-ignore
    tạoCácPhiênBảnCủaNơiĐăngTheoVịTrí(nơiĐăng1, ["Bài đăng", "Bio" , "About", "Website" , "Ảnh đại diện", "Ảnh bìa", "Bài đăng được ghim", "Album ảnh"], cấuHìnhThiếtLậpChung["Vị trí nhỏ hơn"]),
    [{
      "Tên nơi đăng": ["Lý Minh Nhật"],
      "Loại nơi đăng": ["Tài khoản"],
      "Tên nền tảng": "Facebook",
      "Loại nền tảng": "Diễn đàn",
      "Vị trí": ["Bài đăng được ghim", "Nội dung chính"],
    }],
  );
});

// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/UAN.yaml')) as CấuHìnhNơiĐăng;
// console.log(tạoDanhSáchChat(cấuHìnhNơiĐăng, []) )

// const fullPath = "./core/A. Cấu hình/Nơi đăng/Obsidian.yaml";
// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync(fullPath)) as CấuHìnhNơiĐăng;
// const danhSáchNơiĐăngTổng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng);

const danhSáchNơiĐăng: NơiĐăng[] = [];
const folder = "./core/A. Cấu hình/Nơi đăng";
for (const file of Deno.readDirSync(folder)) {
  if (!file.isFile) continue;
  const fullPath = join(folder, file.name);
  //deno-fmt-ignore
  const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync(fullPath)) as CấuHìnhNơiĐăng;
  danhSáchNơiĐăng.push(...tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng));
}
console.log("🚀 ~ danhSáchNơiĐăng:", danhSáchNơiĐăng)
// console.log("🚀 ~ danhSáchNơiĐăng:", danhSáchNơiĐăng);
// Deno.test("Kiểm tra danh sách tổng", () => {
//   assertArrayIncludes(danhSáchNơiĐăngTổng, [nơiĐăng1]);
//   assertArrayIncludes(danhSáchNơiĐăngTổng, [nơiĐăng2]);
// });

console.log("done");