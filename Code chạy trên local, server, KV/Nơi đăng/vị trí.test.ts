import { parse } from "$std/yaml/mod.ts";
import { CấuHìnhChung } from "../H%C3%A0m%20v%C3%A0%20ki%E1%BB%83u%20cho%20c%E1%BA%A5u%20h%C3%ACnh.ts";
import { tạoDanhSáchVịTríCóThểĐăng } from "../../Code chạy trên client/Hàm và kiểu cho vị trí.ts";

const cấuHìnhVịTrí = parse(Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml")) as CấuHìnhChung;
const { "Vị trí thành phần": cấuHìnhVịTríNhỏHơn } = cấuHìnhVịTrí;

Deno.test("tạoDanhSáchVịTríCóThểĐăng", () => {
  const danhSáchVịTríThànhPhần = ["Bài đăng", "Bio", "About", "Website", "Ảnh đại diện", "Ảnh bìa", "Bài đăng được ghim", "Album ảnh"];
  const danhSáchVịTríCóThểĐăng = tạoDanhSáchVịTríCóThểĐăng(danhSáchVịTríThànhPhần, cấuHìnhVịTríNhỏHơn);
  console.log(JSON.stringify(danhSáchVịTríCóThểĐăng));
});
