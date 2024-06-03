import { tạoTênNơiĐăngString } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { tạoDanhSáchBàiĐăng } from "../B. Tạo kết quả/1. Tạo danh sách tất cả bài đăng/mod.ts";
import { tạoDanhSáchNơiĐăngTừTấtCảCấuHình } from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "./Hàm và kiểu cho vị trí.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Kiểu cho nơi đăng.ts";
import { wipeKvStore } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import { kvSignal, readUnitSignal, writeUnitSignal } from "./Signal KV.ts";
import sizeof from "npm:object-sizeof";
import { VậtThểTiếpThị } from "../../Code hỗ trợ cho client/Kiểu cho vật thể tiếp thị.ts";
import { TênBảng } from "./Hàm và kiểu cho id và số lượng dữ liệu.ts";

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

export async function kvGetCount(tableName: TênBảng) {
  const sốLượngDữLiệu = (await kvGet(["Số lượng dữ liệu"], "kvGetCount trong Hàm cho id.ts")).value as SốLượngDữLiệu | null;
  if (sốLượngDữLiệu) {
    return sốLượngDữLiệu.get(tableName);
  }
}

export async function kvSetValueAndUpdateCount(
  key: Deno.KvKey,
  value: BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí | VậtThểTiếpThị,
  tableName: TênBảng,
  caller: string | undefined = undefined,
) {
  await kvSet(key, value, caller);
  /** Nếu thấy trên KV đã có dữ liệu giống như value và có sẵn id rồi thì không cộng thêm số lượng dữ liệu nữa */
  if ("vậtThểId" in value && value.vậtThểId?.cáchXácĐịnh === 1) return;
  await cậpNhậtSốLượngDữLiệu(tableName, caller);
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

export async function đẩyBàiĐăngLênKV() {
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  const danhSáchBàiĐăng = await tạoDanhSáchBàiĐăng(danhSáchThôngTinCấuHìnhNơiĐăng);
  await Deno.writeTextFile("Tạo bài đăng và nơi đăng/A. Cấu hình/Bài đăng/Danh sách bài đăng.json", JSON.stringify(danhSáchBàiĐăng, null, 2));

  for (const bàiĐăng of danhSáchBàiĐăng) {
    console.log(bàiĐăng["Tiêu đề"]);
    console.log("→", bàiĐăng.id);
    const key = tạoKeyKV("bài đăng", bàiĐăng);
    await kvSetValueAndUpdateCount(key, bàiĐăng, "Bài đăng", "Đẩy bài đăng hàng loạt");
  }
  console.log("✅Đã đẩy xong bài đăng lên KV");
}

export async function đẩyNơiĐăngLênKV() {
  const danhSáchNơiĐăng = await tạoDanhSáchNơiĐăngTừTấtCảCấuHình();
  await Deno.writeTextFile("Tạo bài đăng và nơi đăng/A. Cấu hình/Nơi đăng/Danh sách nơi đăng.json", JSON.stringify(danhSáchNơiĐăng, null, 2));

  for (const nơiĐăng of danhSáchNơiĐăng) {
    console.log(tạoTênNơiĐăngString(nơiĐăng["Tên nơi đăng"]));
    console.log("→", nơiĐăng["Slug"], nơiĐăng.id);
    const key = tạoKeyKV("nơi đăng", nơiĐăng);
    await kvSetValueAndUpdateCount(key, nơiĐăng, "Nơi đăng", "Đẩy nơi đăng hàng loạt");
  }

  console.log("✅Đã đẩy xong nơi đăng lên KV");
}
export async function xoáDữLiệuTrênKv() {
  const result = await wipeKvStore();

  if (!result.ok) {
    const keysWhichWereNotDeleted = result.failedKeys;
    console.log(keysWhichWereNotDeleted);
  }
  console.log("Đã xoá sạch dữ liệu hiện có trên KV");
}
