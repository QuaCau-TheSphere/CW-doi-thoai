import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { TẬP_TIN_CACHE_HTML, TẬP_TIN_CACHE_URL_CHÍNH_TẮC } from "./ĐƯỜNG_DẪN.ts";
import { lấyURLTrongJSON, Url, UrlChínhTắc } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { lấyURLChínhTắc } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { load } from "$std/dotenv/mod.ts";

export type CacheUrlChínhTắc = Map<string, string>;
export type CacheHTML = Map<UrlChínhTắc["href"], string>;

/** Không dùng hàm này trên server, vì nó sẽ tạo URL cho CORS proxy trên server. Nếu dùng nó thì URL nào gửi đến CORS proxy sẽ bị circular */
export async function lấyHTMLTừLocal(urL: Url, originCủaCorsProxy: URL["origin"] | undefined = undefined) {
  const url = urL.toString();
  let html;
  if (!originCủaCorsProxy) {
    const cacheHTML = new Map(Object.entries(JSON.parse(await Deno.readTextFile(TẬP_TIN_CACHE_HTML)))) as CacheHTML;
    html = cacheHTML.get(url);
  }

  if (!html || originCủaCorsProxy) {
    const urlCorsProxy = new URL(`${originCủaCorsProxy}/api/cors-proxy/`);
    urlCorsProxy.search = new URLSearchParams({ url: url.toString() });
    html = await (await fetch(urlCorsProxy)).text();
  }
  return html;
}

async function lấyURLChínhTắcVàHTMLTừCache(urL: Url): Promise<[string, string | ""]> {
  const url = urL.toString();
  const cacheUrlChínhTắc = new Map(Object.entries(JSON.parse(await Deno.readTextFile(TẬP_TIN_CACHE_URL_CHÍNH_TẮC)))) as CacheHTML;
  let html;
  let urlChínhTắc = cacheUrlChínhTắc.get(url);
  if (!urlChínhTắc) {
    /** Nếu không có cache cho URL chính tắc thì coi như cache HTML là không có */
    console.info("Không có sẵn cache URL chính tắc cho URL này");
    html = await lấyHTMLTừLocal(url);
    urlChínhTắc = await lấyURLChínhTắc(url, html);
  }
  console.log("urlChínhTắc lấy được:", urlChínhTắc);
  const urlChínhTắcThật = urlChínhTắc !== "https://www.facebook.com/login/web/";
  if (!urlChínhTắcThật) {
    console.info("Facebook chặn IP này. Lấy trên CORS proxy");
    const env = await load();
    html = await lấyHTMLTừLocal(url, env["ORIGIN"]);
    urlChínhTắc = await lấyURLChínhTắc(url, html);
  }
  if (!urlChínhTắc) {
    console.info("Không tìm thấy URL chính tắc. Dùng URL được nhập vào làm URL chính tắc");
    urlChínhTắc = url;
  }
  html = html ? html : "";
  return [urlChínhTắc, html];
}

export async function tạoCache(): Promise<CacheHTML> {
  const cacheUrlChínhTắc: CacheUrlChínhTắc = new Map();
  const cacheHTML: CacheHTML = new Map();

  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình === "test") continue;
    const urls = lấyURLTrongJSON(thôngTinCấuHình.cấuHình);
    const uniqueUrls = [...new Set(urls)];
    for (const urL of uniqueUrls) {
      const url = urL.href;
      console.log(url);
      const [urlChínhTắc, html] = await lấyURLChínhTắcVàHTMLTừCache(url);

      cacheUrlChínhTắc.set(url, urlChínhTắc);
      cacheHTML.set(urlChínhTắc, html);
    }
  }
  await Deno.writeTextFile(TẬP_TIN_CACHE_HTML, JSON.stringify(Object.fromEntries(cacheHTML.entries()), null, 2));
  await Deno.writeTextFile(TẬP_TIN_CACHE_URL_CHÍNH_TẮC, JSON.stringify(Object.fromEntries(cacheUrlChínhTắc.entries()), null, 2));
  console.log();
  return cacheHTML;
}
