import sizeof from "npm:object-sizeof";
import { kvSignal, readUnitSignal, writeUnitSignal } from "./Signal KV.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Nơi đăng/Kiểu cho nơi đăng.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "./Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { TênDanhSách } from "../Code chạy trên client/Hàm và kiểu cho khung nhập.ts";

const cssIncrease = "color: blue; font-style: bold; border: solid blue";

export function increaseReadUnit(data: any) {
  const KiB = sizeof(data) / 1024;
  const readUnits = Math.ceil(KiB / 4);
  readUnitSignal.value += readUnits;
  console.log(`Read units: %c${readUnits}`, cssIncrease);
}

export function increaseWriteUnit(data: any) {
  const KiB = sizeof(data) / 1024;
  const writeUnit = Math.ceil(KiB);
  writeUnitSignal.value += writeUnit;
  console.log(`Write units: %c${writeUnit}`, cssIncrease);
}

export async function kvGet(key: Deno.KvKey, caller: string | undefined = undefined) {
  const kv = kvSignal.value;
  const result = await kv.get(key);
  if (caller) {
    console.log("READ: get");
    console.log("Hàm gọi:", caller);
    console.log("key:", key);
  }
  increaseReadUnit(result);
  return result;
}

export async function kvList(prefix: Deno.KvListSelector, caller: string | undefined = undefined) {
  const kv = kvSignal.value;
  const result = await Array.fromAsync(kv.list(prefix));
  if (caller) {
    console.log("READ: list");
    console.log("Hàm gọi:", caller);
    console.log("key:", prefix);
  }
  increaseReadUnit(result);
  return result;
}

export async function kvSet(key: Deno.KvKey, value: any, caller: string | undefined = undefined) {
  const kv = kvSignal.value;
  await kv.set(key, value);
  if (caller) {
    console.log("WRITE: set");
    console.log("Hàm gọi:", caller);
    console.log("key:", key);
    console.log("value:", value);
  }
  increaseWriteUnit(value);
}

export async function kvDelete(key: Deno.KvKey) {
  const kv = kvSignal.value;
  console.trace("WRITE: delete");
  console.log("key:", key);
  await kv.delete(key);
  // increaseWriteUnit(value);
}

export function tạoKeyKV(tênDanhSách: TênDanhSách, dữLiệu: BàiĐăng | BàiĐăngChưaCóId | ThôngTinNơiĐăng | ThôngTinNơiĐăngChưaCóId): Deno.KvKey {
  switch (tênDanhSách) {
    case "bài đăng": {
      const {
        "Tiêu đề": tiêuĐề,
        URL: url,
      } = dữLiệu as BàiĐăng;
      return [
        "Bài đăng",
        (new URL(url)).hostname,
        tiêuĐề || "",
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
