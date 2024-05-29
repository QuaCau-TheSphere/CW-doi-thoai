import { ReqBàiĐăngHoặcNơiĐăngTạoMới } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { tạoTênNơiĐăngString, viếtHoa, đổiTừCơSố10SangCơSố64 } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { tạoDanhSáchBàiĐăng } from "../B. Tạo kết quả/1. Tạo danh sách tất cả bài đăng/mod.ts";
import { tạoDanhSáchNơiĐăngTừTấtCảCấuHình } from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "./Hàm và kiểu cho vị trí.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Kiểu cho nơi đăng.ts";
import { wipeKvStore } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import { increaseReadUnit, increaseWriteUnit, kvSignal } from "./Signal.ts";

export type TableName = "Nơi đăng" | "Bài đăng" | "Vật thể tiếp thị";
type SốLượngDữLiệu = Map<TableName, number>;

export async function kvGet(key: Deno.KvKey) {
  const kv = kvSignal.value;
  const result = await kv.get(key);
  increaseReadUnit(result);
  return result;
}
export async function kvSet(key: Deno.KvKey, value: any) {
  const kv = kvSignal.value;
  await kv.set(key, value);
  increaseWriteUnit(value);
}
export async function kvDelete(key: Deno.KvKey) {
  const kv = kvSignal.value;
  await kv.delete(key);
}

export async function kvGetCount(tableName: TableName) {
  const sốLượngDữLiệu = (await kvGet(["Số lượng dữ liệu"])).value as SốLượngDữLiệu | null;
  if (sốLượngDữLiệu) {
    return sốLượngDữLiệu.get(tableName);
  }
}

export async function kvSetValueAndCount(
  key: Deno.KvKey,
  value: BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí,
  tableName: TableName,
) {
  await kvSet(key, value);
  const sốLượngDữLiệu = (await kvGet(["Số lượng dữ liệu"])).value as SốLượngDữLiệu | null;
  if (sốLượngDữLiệu) {
    const currentCount = sốLượngDữLiệu.get(tableName) || 0;
    sốLượngDữLiệu.set(tableName, currentCount + 1);
    console.log(sốLượngDữLiệu.get(tableName));
    await kvSet(["Số lượng dữ liệu"], sốLượngDữLiệu);
  } else {
    const newMap = new Map();
    newMap.set(tableName, 1);
    await kvSet(["Số lượng dữ liệu"], newMap);
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

export async function thêmBàiĐăngHoặcNơiĐăngMớiVàoKV(bàiĐăngHoặcNơiĐăngTạoMới: ReqBàiĐăngHoặcNơiĐăngTạoMới) {
  const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = bàiĐăngHoặcNơiĐăngTạoMới;
  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = { ...dữLiệu, "Thời điểm nhập vào KV": new Date() };
  await kvSet(key, value);
  return key;
}

export async function đẩyBàiĐăngLênKV() {
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  const danhSáchBàiĐăng = await tạoDanhSáchBàiĐăng(danhSáchThôngTinCấuHìnhNơiĐăng);
  await Deno.writeTextFile("Tạo bài đăng và nơi đăng/A. Cấu hình/Danh sách tất cả bài đăng.json", JSON.stringify(danhSáchBàiĐăng, null, 2));

  for (const bàiĐăng of danhSáchBàiĐăng) {
    console.log(bàiĐăng["Tiêu đề"]);
    console.log("→", bàiĐăng.id);
    const key = tạoKeyKV("bài đăng", bàiĐăng);
    await kvSetValueAndCount(key, bàiĐăng, "Bài đăng");
  }
  console.log("✅Đã đẩy xong bài đăng lên KV");
}

export async function đẩyNơiĐăngLênKV() {
  const danhSáchNơiĐăng = await tạoDanhSáchNơiĐăngTừTấtCảCấuHình();
  await Deno.writeTextFile("Tạo bài đăng và nơi đăng/A. Cấu hình/Danh sách nơi đăng.json", JSON.stringify(danhSáchNơiĐăng, null, 2));

  for (const nơiĐăng of danhSáchNơiĐăng) {
    console.log(tạoTênNơiĐăngString(nơiĐăng["Tên nơi đăng"]));
    console.log("→", nơiĐăng["Mã nơi đăng"], nơiĐăng.id);
    const key = tạoKeyKV("nơi đăng", nơiĐăng);
    await kvSetValueAndCount(key, nơiĐăng, "Nơi đăng");
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

/**
 * Việc tạo Id chỉ vào lúc trước khi dữ liệu được đẩy lên KV từ local, hoặc khi người dùng tạo mới trên client. Không tạo id khi mới lấy URL, để tránh tình trạng tạo og xong thì người dùng không làm nữa
 */
export async function kiểmTraIdĐangCó(
  tênDanhSách: TênDanhSách,
  dữLiệu: BàiĐăngChưaCóId | BàiĐăng | ThôngTinNơiĐăngChưaCóId | ThôngTinNơiĐăng,
): Promise<string | undefined> {
  /** Nếu dữ liệu đã có sẵn id thì lấy id đó */
  if ("id" in dữLiệu) return (dữLiệu as BàiĐăng | ThôngTinNơiĐăng).id;

  /** Nếu dữ liệu không có sẵn id thì kiểm tra id trên KV */
  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = (await kvGet(key)).value as BàiĐăng | ThôngTinNơiĐăng | undefined | null;
  if (value && value.id) return value.id;

  /** Nếu trên KV không có dữ liệu thì dùng tổng số entry hiện tại rồi cộng thêm 1 */
  const tổngSốEntryHiệnTại = await kvGetCount(viếtHoa(tênDanhSách) as TableName);
  console.log("🚀 ~ tổngSốEntryHiệnTại:", tổngSốEntryHiệnTại);
  if (tổngSốEntryHiệnTại) return đổiTừCơSố10SangCơSố64(tổngSốEntryHiệnTại + 1);
}
