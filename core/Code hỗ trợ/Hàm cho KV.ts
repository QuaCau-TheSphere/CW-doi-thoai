import { tạoTênNơiĐăngString } from "../../utils/Hàm cho khung nhập.ts";
import { ReqBàiĐăngHoặcNơiĐăngTạoMới } from "../../utils/Hàm và kiểu cho API server.ts";
import { TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { tạoDanhSáchBàiĐăng } from "../B. Tạo kết quả/1. Tạo danh sách tất cả bài đăng/mod.ts";
import tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { CấuHìnhChung, ThôngTinCấuHìnhNơiĐăng, tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "./Hàm và kiểu cho vị trí.ts";
import { BàiĐăng, BàiĐăngChưaCóId, ĐườngDẫnTuyệtĐối, ĐườngDẫnTươngĐối } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Kiểu cho nơi đăng.ts";

type KvName = "Cloud" | "Local";
type MapKV = Map<KvName, Deno.Kv>;
export type TableName = "Nơi đăng" | "Bài đăng" | "Vật thể tiếp thị";
type SốLượngDữLiệu = Map<TableName, number>;

export async function kvGet(key: Deno.KvKey, mapKV: MapKV) {
  const result = [];
  for (const [_kvName, kv] of mapKV) {
    result.push(await kv.get(key));
  }
  return result;
}
export async function kvSet(key: Deno.KvKey, value: any, mapKV: MapKV) {
  for (const [_kvName, kv] of mapKV) {
    await kv.set(key, value);
  }
}
export async function kvDelete(key: Deno.KvKey, mapKV: MapKV) {
  for (const [_kvName, kv] of mapKV) {
    await kv.delete(key);
  }
}
export async function kvGetCount(tableName: TableName, kv: Deno.Kv) {
  const sốLượngDữLiệu = (await kv.get(["Số lượng dữ liệu"])).value as SốLượngDữLiệu | null;
  if (sốLượngDữLiệu) {
    return sốLượngDữLiệu.get(tableName);
  }
}

export async function kvSetValueAndCount(key: Deno.KvKey, value: BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí, tableName: TableName, mapKV: MapKV) {
  for (const [_kvName, kv] of mapKV) {
    await kv.set(key, value);
    const sốLượngDữLiệu = (await kv.get(["Số lượng dữ liệu"])).value as SốLượngDữLiệu | null;
    if (sốLượngDữLiệu) {
      const currentCount = sốLượngDữLiệu.get(tableName) || 0;
      sốLượngDữLiệu.set(tableName, currentCount + 1);
      console.log(sốLượngDữLiệu.get(tableName));
      await kv.set(["Số lượng dữ liệu"], sốLượngDữLiệu);
    } else {
      const newMap = new Map();
      newMap.set(tableName, 1);
      await kv.set(["Số lượng dữ liệu"], newMap);
    }
  }
}

export function tạoKeyKV(tênDanhSách: TênDanhSách, dữLiệu: BàiĐăng | BàiĐăngChưaCóId | ThôngTinNơiĐăng | ThôngTinNơiĐăngChưaCóId): Deno.KvKey {
  switch (tênDanhSách) {
    case "bài đăng": {
      const {
        "Tiêu đề": tiêuĐề,
        "Dự án": dựÁn,
        Vault: vault,
        URL,
      } = dữLiệu as BàiĐăng;
      return [
        "Bài đăng",
        vault || "",
        dựÁn?.["Tên dự án"] || "",
        tiêuĐề || "",
        URL as string || "",
      ];
    }

    case "nơi đăng": {
      const {
        "Loại nền tảng": loạiNềnTảng,
        "Tên nền tảng": tênNềnTảng,
        "Loại nơi đăng": loạiNơiĐăng,
        "Tên nơi đăng": tênNơiĐăng,
      } = dữLiệu as ThôngTinNơiĐăng;
      return [
        "Nơi đăng",
        loạiNềnTảng,
        tênNềnTảng,
        JSON.stringify(loạiNơiĐăng),
        JSON.stringify(tênNơiĐăng),
      ];
    }
  }
}

export async function thêmBàiĐăngHoặcNơiĐăngMớiVàoKV(bàiĐăngHoặcNơiĐăngTạoMới: ReqBàiĐăngHoặcNơiĐăngTạoMới, kv: Deno.Kv) {
  const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = bàiĐăngHoặcNơiĐăngTạoMới;
  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = { ...dữLiệu, "Thời điểm nhập vào KV": new Date() };
  await kv.set(key, value);
  return key;
}

export async function đẩyBàiĐăngLênKV(
  danhSáchThôngTinCấuHìnhNơiĐăng: ThôngTinCấuHìnhNơiĐăng[],
  mapKV: MapKV,
) {
  const danhSáchBàiĐăng = await tạoDanhSáchBàiĐăng(danhSáchThôngTinCấuHìnhNơiĐăng);
  await Deno.writeTextFile("core/A. Cấu hình/Danh sách tất cả bài đăng.json", JSON.stringify(danhSáchBàiĐăng, null, 2));
  for (const bàiĐăngLấyTừVault of danhSáchBàiĐăng) {
    console.log(bàiĐăngLấyTừVault["Tiêu đề"], bàiĐăngLấyTừVault.id);
    const key = tạoKeyKV("bài đăng", bàiĐăngLấyTừVault);
    await kvSetValueAndCount(key, bàiĐăngLấyTừVault, "Bài đăng", mapKV);
  }
  console.log("✅Đã đẩy xong bài đăng lên KV");
}

export async function đẩyNơiĐăngLênKV(cấuHìnhChung: CấuHìnhChung, mapKV: MapKV) {
  const temp = [];
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();

  for (const vậtThểCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    const danhSáchNơiĐăngTừCấuHình = await tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí(vậtThểCấuHình, cấuHìnhChung);
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
