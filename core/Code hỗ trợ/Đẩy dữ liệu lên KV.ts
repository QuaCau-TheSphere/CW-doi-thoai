import { walk } from "$std/fs/walk.ts";
import { basename, extname, SEPARATOR } from "$std/path/mod.ts";
import { parse } from "$std/yaml/mod.ts";
import { tạoKeyKV } from "../../utils/Hàm và kiểu cho API server.ts";
import { tạoDanhSáchBàiĐăng, tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng } from "../B. Tạo kết quả/1. Tạo danh sách tất cả bài đăng/mod.ts";
import tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { CấuHìnhVịTrí, NơiĐăngChưaXácĐịnhVịTrí } from "./Hàm và kiểu cho vị trí.tsx";
import CấuHìnhNơiĐăng, { VậtThểCấuHình } from "./Kiểu cho nơi đăng.ts";
import { THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG, ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV } from "./env.ts";

const danhSáchCấuHình: VậtThểCấuHình[] = [];

for await (const walkEntry of walk(THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG)) {
  if (extname(walkEntry.path) === ".yaml") {
    const { name, path } = walkEntry;
    const tênCấuHình = basename(name);
    if (tênCấuHình.includes("Thiết lập chung")) continue;

    const pathSplit = path.split(SEPARATOR);
    const tênThưMục = pathSplit[pathSplit.length - 2];
    const cấuHình = parse(await Deno.readTextFile(path)) as CấuHìnhNơiĐăng;
    danhSáchCấuHình.push({
      cấuHình: cấuHình,
      loạiCấuHình: tênThưMục,
      tênCấuHình: tênCấuHình,
    });
  }
}

const kv = await Deno.openKv();
const cấuHìnhVịTrí = parse(Deno.readTextFileSync(ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG)) as CấuHìnhVịTrí;
let danhSáchBàiĐăng = await tạoDanhSáchBàiĐăng(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV);

for (const vậtThểCấuHình of danhSáchCấuHình) {
  const cấuHìnhWebsite = vậtThểCấuHình.cấuHình.Website;
  danhSáchBàiĐăng = danhSáchBàiĐăng.concat(await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhWebsite));
  await Deno.writeTextFile("core/A. Cấu hình/Danh sách tất cả bài đăng.json", JSON.stringify(danhSáchBàiĐăng));
  for (const bàiĐăngLấyTừVault of danhSáchBàiĐăng) {
    console.log(bàiĐăngLấyTừVault["Tiêu đề"]);
    const key = tạoKeyKV("bài đăng", bàiĐăngLấyTừVault);
    await kv.set(key, bàiĐăngLấyTừVault);
  }
  const danhSáchNơiĐăngTừCấuHình = await tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí(vậtThểCấuHình, cấuHìnhVịTrí) as NơiĐăngChưaXácĐịnhVịTrí[];
  for (const nơiĐăng of danhSáchNơiĐăngTừCấuHình) {
    console.log(nơiĐăng["Tên nơi đăng"]);
    const key = tạoKeyKV("nơi đăng", nơiĐăng);
    await kv.set(key, nơiĐăng);
  }
}

console.log("✅Đã đẩy xong lên KV");
