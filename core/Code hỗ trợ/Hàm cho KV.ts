import { ReqBàiĐăngHoặcNơiĐăngTạoMới } from "../../utils/Hàm và kiểu cho API server.ts";
import { TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "./Hàm và kiểu cho vị trí.tsx";
import { BàiĐăng } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";

type KvName = "Cloud" | "Local";
type MapKV = Map<KvName, Deno.Kv>;
export type TableName = "Nơi đăng" | "Bài đăng" | "Vật thể tiếp thị";
type CountMap = Map<TableName, number>;

export async function kvGet(key: Deno.KvKey, mapKV: MapKV) {
  for (const [_kvName, kv] of mapKV) {
    await kv.get(key);
  }
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
  const countMap = (await kv.get(["Số lượng dữ liệu"])).value as CountMap;
  return countMap.get(tableName) || 0;
}

export async function kvSetValueAndCount(key: Deno.KvKey, value: BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí, tableName: TableName, mapKV: MapKV) {
  for (const [_kvName, kv] of mapKV) {
    await kv.set(key, value);
    const countMap = (await kv.get(["Số lượng dữ liệu"])).value as CountMap;
    const currentCount = countMap.get(tableName) || 0;
    countMap.set(tableName, currentCount + 1);
    await kv.set(["Số lượng dữ liệu"], countMap);
  }
}

export function tạoKeyKV(tênDanhSách: TênDanhSách, dữLiệu: BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí): Deno.KvKey {
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
      } = dữLiệu as NơiĐăngCóCácLựaChọnVịTrí;
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
