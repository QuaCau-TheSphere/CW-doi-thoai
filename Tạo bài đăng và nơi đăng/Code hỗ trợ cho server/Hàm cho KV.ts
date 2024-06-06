import { tạoTênNơiĐăngString } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { tạoDanhSáchBàiĐăng } from "../B. Tạo kết quả/1. Tạo danh sách tất cả bài đăng/mod.ts";
import { tạoDanhSáchNơiĐăngTừTấtCảCấuHình } from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Kiểu cho nơi đăng.ts";
import { wipeKvStore } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import { kvSignal, readUnitSignal, writeUnitSignal } from "./Signal KV.ts";
import sizeof from "npm:object-sizeof";
import { cậpNhậtSốLượngBàiĐăng, cậpNhậtSốLượngNơiĐăng } from "./Hàm và kiểu cho id và số lượng dữ liệu.ts";
import { TẬP_TIN_DANH_SÁCH_BÀI_ĐĂNG, TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG } from "../../ĐƯỜNG_DẪN.ts";

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

export async function tạoBàiĐăng(cóĐẩyLênKv: boolean = false) {
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  const danhSáchBàiĐăng = await tạoDanhSáchBàiĐăng(danhSáchThôngTinCấuHìnhNơiĐăng);
  await Deno.writeTextFile(TẬP_TIN_DANH_SÁCH_BÀI_ĐĂNG, JSON.stringify(danhSáchBàiĐăng, null, 2));

  for (const bàiĐăng of danhSáchBàiĐăng) {
    console.log(bàiĐăng["Tiêu đề"]);
    console.log("• Slug:", bàiĐăng.Slug);
    console.log("• ID:", bàiĐăng.id);

    if (cóĐẩyLênKv) {
      const key = tạoKeyKV("bài đăng", bàiĐăng);
      await kvSet(key, bàiĐăng, "Đẩy bài đăng hàng loạt");
      await cậpNhậtSốLượngBàiĐăng(bàiĐăng["Phương thức tạo"]);
      console.log("✅Đã đẩy xong bài đăng lên KV");
    }
  }
}

export async function tạoNơiĐăng(cóĐẩyLênKv: boolean = false) {
  const danhSáchNơiĐăng = await tạoDanhSáchNơiĐăngTừTấtCảCấuHình();
  await Deno.writeTextFile(TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG, JSON.stringify(danhSáchNơiĐăng, null, 2));

  for (const nơiĐăng of danhSáchNơiĐăng) {
    console.log(tạoTênNơiĐăngString(nơiĐăng["Tên nơi đăng"]));
    console.log("• Slug:", nơiĐăng.Slug);
    console.log("• ID:", nơiĐăng.id);

    if (cóĐẩyLênKv) {
      const key = tạoKeyKV("nơi đăng", nơiĐăng);
      await kvSet(key, nơiĐăng, "Đẩy nơi đăng hàng loạt");
      await cậpNhậtSốLượngNơiĐăng(nơiĐăng["Phương thức tạo"]);
      console.log("✅Đã đẩy xong nơi đăng lên KV");
    }
  }
}
export async function xoáDữLiệuTrênKv() {
  if (
    kvSignal.value !== await Deno.openKv()
  ) {
    const entries = await kvList({ prefix: [] });
    for (const entry of entries) {
      kvDelete(entry.key);
    }
  }
  const result = await wipeKvStore();

  if (!result.ok) {
    const keysWhichWereNotDeleted = result.failedKeys;
    console.log(keysWhichWereNotDeleted);
  }
  console.log("Đã xoá sạch dữ liệu hiện có trên KV");
}
