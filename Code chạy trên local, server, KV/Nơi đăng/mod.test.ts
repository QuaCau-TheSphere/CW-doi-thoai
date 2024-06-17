import { parse } from "$std/yaml/mod.ts";
import { join } from "$std/path/join.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.216.0/assert/assert_array_includes.ts";
import { CấuHìnhChung, tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "../H%C3%A0m%20v%C3%A0%20ki%E1%BB%83u%20cho%20c%E1%BA%A5u%20h%C3%ACnh.ts";
import {
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  NơiĐăngCóCácLựaChọnVịTríChưaCóIdVàPhươngThứcTạo,
  tạoDanhSáchVịTríCóThểĐăng,
  VậtThểCấuHìnhVịTrí,
} from "../../Code chạy trên client/Hàm và kiểu cho vị trí.ts";
import { ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo, TênNơiĐăng } from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí from "./mod.ts";
import { HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm-noinit.ts";
import { DOM } from "https://deno.land/x/deno_dom@v0.1.43/src/dom/selectors/nwsapi-types.ts";

const nơiĐăng1 = {
  "Tên nơi đăng": ["Lý Minh Nhật"],
  "Loại nơi đăng": ["Tài khoản"],
  "Tên nền tảng": "Facebook",
  "Loại nền tảng": "Diễn đàn",
} satisfies ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo;

const vậtThểVịTrí1 = {
  "Loại nền tảng": "Diễn đàn",
  "Tên nền tảng": "Facebook",
  "Loại nơi đăng": [
    "Tài khoản",
  ],
  "Danh sách vị trí": [
    "Bài đăng",
    "Bio",
    "About",
    "Website",
    "Ảnh đại diện",
    "Ảnh bìa",
    "Bài đăng được ghim",
    "Album ảnh",
  ],
} satisfies VậtThểCấuHìnhVịTrí;

const nơiĐăng2 = {
  "Tên nơi đăng": [
    "Quả Cầu",
    "#g-nghiên-cứu-liên-ngành",
    "Lý tính, khoa học, diễn ngôn",
  ],
  "Loại nơi đăng": ["Máy chủ", "Kênh thường", "Thread"],
  "Tên nền tảng": "Discord",
  "Loại nền tảng": "Chat",
} satisfies ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo;

const vậtThểVịTrí2 = {
  "Loại nền tảng": "Chat",
  "Tên nền tảng": "Discord",
  "Loại nơi đăng": [
    "Máy chủ",
    "Kênh thường",
    "Thread",
  ],
  "Danh sách vị trí": [
    "Tin nhắn",
    "Chủ đề kênh",
    "Tin nhắn được ghim",
  ],
} satisfies VậtThểCấuHìnhVịTrí;

//deno-fmt-ignore
const cấuHìnhThiếtLậpChung = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml')) as CấuHìnhChung
Deno.test("Thêm vị trí nhỏ hơn", () => {
  assertArrayIncludes(
    //deno-fmt-ignore
    tạoDanhSáchVịTríCóThểĐăng(["Bài đăng", "Bio" , "About", "Website" , "Ảnh đại diện", "Ảnh bìa", "Bài đăng được ghim", "Album ảnh"], cấuHìnhThiếtLậpChung["Vị trí thành phần"]),
  );
});

// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/UAN.yaml')) as CấuHìnhNơiĐăng;
// console.log(tạoDanhSáchChat(cấuHìnhNơiĐăng, []) )

// const fullPath = "./core/A. Cấu hình/Nơi đăng/Obsidian.yaml";
// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync(fullPath)) as CấuHìnhNơiĐăng;
// const danhSáchNơiĐăngTổng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng);

const danhSáchNơiĐăng: NơiĐăngCóCácLựaChọnVịTríChưaCóId[] = [];
const folder = "./core/A. Cấu hình/Nơi đăng";
for (const file of Deno.readDirSync(folder)) {
  if (!file.isFile) continue;
  const fullPath = join(folder, file.name);
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();

  for (const thôngTinCấuHìnhNơiĐăng of danhSáchThôngTinCấuHìnhNơiĐăng) {
    danhSáchNơiĐăng.push(...await tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí(thôngTinCấuHìnhNơiĐăng));
  }
}
console.log("🚀 ~ danhSáchNơiĐăng:", danhSáchNơiĐăng);
// console.log("🚀 ~ danhSáchNơiĐăng:", danhSáchNơiĐăng);
// Deno.test("Kiểm tra danh sách tổng", () => {
//   assertArrayIncludes(danhSáchNơiĐăngTổng, [nơiĐăng1]);
//   assertArrayIncludes(danhSáchNơiĐăngTổng, [nơiĐăng2]);
// });
