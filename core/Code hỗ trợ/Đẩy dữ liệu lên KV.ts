import { walk } from "$std/fs/walk.ts";
import { parse } from "$std/yaml/mod.ts";
import { basename, extname, SEPARATOR } from "$std/path/mod.ts";
import { CấuHìnhChung, NơiĐăngCóCácLựaChọnVịTrí } from "./Hàm và kiểu cho vị trí.tsx";
import CấuHìnhNơiĐăng, { LoạiCấuHình, VậtThểCấuHìnhNơiĐăng } from "./Kiểu cho nơi đăng.ts";
import { tạoDanhSáchBàiĐăng } from "../B. Tạo kết quả/1. Tạo danh sách tất cả bài đăng/mod.ts";
import tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG, ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV } from "../../env.ts";
import { tạoTênNơiĐăngString } from "../../utils/Hàm cho khung nhập.ts";
import { load } from "$std/dotenv/mod.ts";
import { kvSetValueAndCount, tạoKeyKV } from "./Hàm cho KV.ts";

const env = await load();
Deno.env.set("DENO_KV_ACCESS_TOKEN", env["DENO_KV_ACCESS_TOKEN"]);
const mapKV = new Map();
mapKV.set("Cloud", await Deno.openKv(env["LOCATION"]));
mapKV.set("Local", await Deno.openKv());

const danhSáchVậtThểCấuHình: VậtThểCấuHìnhNơiĐăng[] = await tạoDanhSáchCấuHình();
const cấuHìnhVịTrí = parse(await Deno.readTextFile(ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG)) as CấuHìnhChung;

await đẩyNơiĐăngLênKV();
// await đẩyBàiĐăngLênKV();

async function tạoDanhSáchCấuHình() {
  const danhSáchCấuHình: VậtThểCấuHìnhNơiĐăng[] = [];

  for await (const walkEntry of walk(THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG)) {
    if (extname(walkEntry.path) === ".yaml") {
      const { name, path } = walkEntry;
      const tênCấuHình = basename(name).replace(".yaml", "");
      if (tênCấuHình.includes("Thiết lập chung")) continue;

      const pathSplit = path.split(SEPARATOR);
      const tênThưMục = pathSplit[pathSplit.length - 2] as LoạiCấuHình;
      const cấuHình = parse(await Deno.readTextFile(path)) as CấuHìnhNơiĐăng;
      danhSáchCấuHình.push({
        cấuHình: cấuHình,
        loạiCấuHình: tênThưMục,
        tênCấuHình: tênCấuHình,
      });
    }
  }
  return danhSáchCấuHình;
}

async function đẩyBàiĐăngLênKV() {
  const danhSáchBàiĐăng = await tạoDanhSáchBàiĐăng(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV, danhSáchVậtThểCấuHình);
  await Deno.writeTextFile("core/A. Cấu hình/Danh sách tất cả bài đăng.json", JSON.stringify(danhSáchBàiĐăng, null, 2));
  for (const bàiĐăngLấyTừVault of danhSáchBàiĐăng) {
    console.log(bàiĐăngLấyTừVault["Tiêu đề"]);
    const key = tạoKeyKV("bài đăng", bàiĐăngLấyTừVault);
    await kvSetValueAndCount(key, bàiĐăngLấyTừVault, "Bài đăng", mapKV);
  }
  console.log("✅Đã đẩy xong bài đăng lên KV");
}

async function đẩyNơiĐăngLênKV() {
  const temp = [];
  for (const vậtThểCấuHình of danhSáchVậtThểCấuHình) {
    if (vậtThểCấuHình.tênCấuHình !== "UAN") continue;
    const danhSáchNơiĐăngTừCấuHình = await tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí(vậtThểCấuHình, cấuHìnhVịTrí) as NơiĐăngCóCácLựaChọnVịTrí[];
    temp.push(...danhSáchNơiĐăngTừCấuHình);
    for (const nơiĐăng of danhSáchNơiĐăngTừCấuHình) {
      console.log(tạoTênNơiĐăngString(nơiĐăng["Tên nơi đăng"]));
      console.log("→", nơiĐăng["Mã nơi đăng"]);
      const key = tạoKeyKV("nơi đăng", nơiĐăng);
      await kvSetValueAndCount(key, nơiĐăng, "Nơi đăng", mapKV);
    }
  }
  await Deno.writeTextFile("core/A. Cấu hình/Danh sách nơi đăng.json", JSON.stringify(temp, null, 2));
  console.log("✅Đã đẩy xong nơi đăng lên KV");
}
