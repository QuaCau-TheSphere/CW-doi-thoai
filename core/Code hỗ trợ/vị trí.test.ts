//deno-fmt-ignore-file
import { parse } from "$std/yaml/mod.ts";
import { CấuHìnhVịTrí, tạoDanhSáchVịTríCóThểĐăng } from "./Hàm và kiểu cho vị trí.tsx";

const cấuHìnhVịTrí = parse(Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml")) as CấuHìnhVịTrí;
const { "Vị trí nhỏ hơn": cấuHìnhVịTríNhỏHơn } = cấuHìnhVịTrí;

Deno.test("tạoDanhSáchVịTríCóThểĐăng", () => {
  const danhSáchVịTríThànhPhần = ["Bài đăng", "Bio", "About", "Website", "Ảnh đại diện", "Ảnh bìa", "Bài đăng được ghim","Album ảnh"];
  const danhSáchVịTríCóThểĐăng = tạoDanhSáchVịTríCóThểĐăng(danhSáchVịTríThànhPhần, cấuHìnhVịTríNhỏHơn);
  console.log(JSON.stringify(danhSáchVịTríCóThểĐăng));
});
