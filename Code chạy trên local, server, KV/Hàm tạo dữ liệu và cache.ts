import { load } from "$std/dotenv/mod.ts";
import { replaceLocalDataWithRemote, wipeKvStore } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";
import { kvSignal } from "./Signal KV.ts";
import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { TẬP_TIN_CACHE_HTML, TẬP_TIN_DANH_SÁCH_BÀI_ĐĂNG, TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG } from "./ĐƯỜNG_DẪN.ts";
import { cậpNhậtSốLượngBàiĐăng, cậpNhậtSốLượngNơiĐăng } from "./Hàm và kiểu cho id và số lượng dữ liệu.ts";
import { tạoDanhSáchBàiĐăng } from "./Bài đăng/mod.ts";
import { tạoDanhSáchNơiĐăngTừTấtCảCấuHình } from "./Nơi đăng/mod.ts";
import { tạoTênNơiĐăngString } from "../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { lấyURLTrongJSON, Url, UrlChưaChínhTắc } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL.ts";
import { kvDelete, kvList, kvSet, tạoKeyKV } from "./H%C3%A0m%20cho%20KV.ts";
import { lấyHTML } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho HTML và dữ liệu meta.ts";

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
  if (kvSignal.value !== await Deno.openKv()) {
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

export type CacheHTML = Map<string, string>;
export async function tạoCacheHTML(): Promise<CacheHTML> {
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  const cacheHTML: CacheHTML = new Map();
  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình !== "test") continue;
    const urls = lấyURLTrongJSON(thôngTinCấuHình.cấuHình);
    const uniqueUrls = [...new Set(urls)];
    for (const url of uniqueUrls) {
      const html = await lấyHTML(url.href);
      cacheHTML.set(url.href, html);
    }
  }
  await Deno.writeTextFile(TẬP_TIN_CACHE_HTML, JSON.stringify(Object.fromEntries(cacheHTML.entries()), null, 2));
  return cacheHTML;
}
