import sizeof from "npm:object-sizeof";
import { load } from "$std/dotenv/mod.ts";
import { replaceLocalDataWithRemote, wipeKvStore } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import { kvSignal, readUnitSignal, writeUnitSignal } from "./Signal KV.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Nơi đăng/Kiểu cho nơi đăng.ts";
import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "./Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { TẬP_TIN_DANH_SÁCH_BÀI_ĐĂNG, TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG } from "./ĐƯỜNG_DẪN.ts";
import { cậpNhậtSốLượngBàiĐăng, cậpNhậtSốLượngNơiĐăng } from "./Hàm và kiểu cho id và số lượng dữ liệu.ts";
import { tạoDanhSáchBàiĐăng } from "./Bài đăng/mod.ts";
import { tạoDanhSáchNơiĐăngTừTấtCảCấuHình } from "./Nơi đăng/mod.ts";
import { tạoTênNơiĐăngString } from "../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho khung nhập.ts";
import { lấyHTML } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho HTML và dữ liệu meta.ts";
import { lấyURLTrongJSON } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL.ts";

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
    console.log("• URL:", nơiĐăng.URL);

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

export async function chạyTrênDeployChứKhôngChạyTrênLocal() {
  const env = await load();
  Deno.env.set("DENO_KV_ACCESS_TOKEN", env["DENO_KV_ACCESS_TOKEN"]);
  const api = `https://api.deno.com/databases/${env["KV_UUID"]}/connect`;
  kvSignal.value = await Deno.openKv(api);
}

export async function copyDữLiệuTrênDeployXuốngLocal() {
  console.log("thayDữLiệuTrênLocalBằngDữLiệuTrênDeploy");
  const remoteKvUrl = `https://api.deno.com/databases/${env["KV_UUID"]}/connect`;
  const result = await replaceLocalDataWithRemote(remoteKvUrl);

  if (!result.ok) {
    const failedKeys = result.failedKeys;
    // ...
  }
}

export async function tạoCacheHTML() {
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  const danhSáchHTML = [];
  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình !== "test") continue;
    const urls = lấyURLTrongJSON(thôngTinCấuHình.cấuHình);
    const uniqueUrls = [...new Set(urls)];
    for (const url of uniqueUrls) {
      console.log(url.href);
      danhSáchHTML.push({
        url: url.href,
        html: await lấyHTML(url.href),
      });
    }
  }
  await Deno.writeTextFile("Cache HTML.json", JSON.stringify(danhSáchHTML, null, 2));
}
