import { parse } from "$std/yaml/mod.ts";
import { join } from "$std/path/join.ts";
import { tạoKeyKV } from "../../utils/Hàm và kiểu cho API server.ts";
import { tạoDanhSáchBàiĐăng } from "../B. Tạo kết quả/1. Tạo danh sách tất cả bài đăng/mod.ts";
import tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "./Hàm và kiểu cho vị trí.tsx";
import CấuHìnhNơiĐăng from "./Kiểu cho nơi đăng.ts";
import { THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV } from "./env.ts";

const kv = await Deno.openKv();

const danhSáchBàiĐăng = await tạoDanhSáchBàiĐăng(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV);
await Deno.writeTextFile("core/A. Cấu hình/Danh sách tất cả bài đăng.json", JSON.stringify(danhSáchBàiĐăng));
for (const bàiĐăngLấyTừVault of danhSáchBàiĐăng) {
  console.log(bàiĐăngLấyTừVault["Tiêu đề"]);
  const key = tạoKeyKV("bài đăng", bàiĐăngLấyTừVault);
  await kv.set(key, bàiĐăngLấyTừVault);
}

// for await (const dirEntry of Deno.readDir(THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG)) {
//   const đườngDẫnTớiThưMụcCon = join(THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG, dirEntry.name);
//   if (dirEntry.isFile) {
//     const cấuHìnhNơiĐăng = parse(await Deno.readTextFile("core/A. Cấu hình/Nơi đăng/Quả Cầu.yaml")) as CấuHìnhNơiĐăng;
//   } else if (dirEntry.isDirectory) {
//   }
// }
const cấuHìnhNơiĐăng = parse(await Deno.readTextFile("core/A. Cấu hình/Nơi đăng/Tổ chức/Quả Cầu.yaml")) as CấuHìnhNơiĐăng;
const danhSáchNơiĐăngTừCấuHình = await tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí(cấuHìnhNơiĐăng) as NơiĐăngChưaXácĐịnhVịTrí[];
for (const nơiĐăng of danhSáchNơiĐăngTừCấuHình) {
  console.log(nơiĐăng["Tên nơi đăng"]);
  const key = tạoKeyKV("nơi đăng", nơiĐăng);
  await kv.set(key, nơiĐăng);
}

console.log("done");
