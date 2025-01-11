import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "./Hàm và kiểu cho cấu hình.ts";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { TẬP_TIN_CACHE_HTML, TẬP_TIN_CACHE_URL_CHÍNH_TẮC } from "./ĐƯỜNG_DẪN.ts";
import {
  lấyHTML,
  lấyURLKhôngSlashVàCóSlash,
  lấyURLTrongJSON,
  tạoCorsURL,
  Url,
  UrlChínhTắc,
  UrlChưaChínhTắc,
} from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { load } from "$std/dotenv/mod.ts";
import { MetaTags, MetaTagUrlVàDocument } from "../Code chạy trên client/URL, HTML/Hàm cho việc tạo bài đăng hoặc nơi đăng từ URL.ts";

export type CacheUrlChínhTắc = Map<string, string>;
export type CacheHTML = Map<UrlChínhTắc["href"], string>;

/** Không dùng hàm này trên server, vì nó sẽ tạo URL cho CORS proxy trên server. Nếu dùng nó thì URL nào gửi đến CORS proxy sẽ bị circular */
export async function lấyHTMLTừLocal(urL: Url, originCủaCorsProxy: URL["origin"] | undefined = undefined) {
  console.log("🚀 ~ lấyHTMLTừLocal ~ originCủaCorsProxy:", originCủaCorsProxy);
  const url = urL.toString();
  let html;
  if (!originCủaCorsProxy) {
    const cacheHTML = new Map(Object.entries(JSON.parse(await Deno.readTextFile(TẬP_TIN_CACHE_HTML)))) as CacheHTML;
    html = cacheHTML.get(url);
  }

  if (!html || originCủaCorsProxy) {
    const urlCorsProxy = tạoCorsURL(originCủaCorsProxy!);
    urlCorsProxy.search = new URLSearchParams({ url: url.toString() }).toString();
    html = await (await fetch(urlCorsProxy)).text();
  }
  return html;
}

export function lấyURLChínhTắc(urL: UrlChưaChínhTắc, html: string): string {
  const url = urL.toString();
  const document = new DOMParser().parseFromString(html, "text/html");
  const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  return canonical?.getAttribute("href") || url.toString();
}

export async function lấyURLChínhTắcVàHTMLTừLocal(urL: Url, HTML: string | undefined = undefined): Promise<[string, string | ""]> {
  const env = await load();
  const url = urL.toString();
  const cacheUrlChínhTắc = new Map(Object.entries(JSON.parse(await Deno.readTextFile(TẬP_TIN_CACHE_URL_CHÍNH_TẮC)))) as CacheHTML;
  let html = HTML;
  let urlChínhTắc = cacheUrlChínhTắc.get(url);
  if (!urlChínhTắc) {
    /** Nếu không có cache cho URL chính tắc thì coi như cache HTML là không có */
    console.info("Không có sẵn cache URL chính tắc cho URL này");
    // html = await lấyHTMLTừLocal(url, env["ORIGIN"]);
    html = await lấyHTMLTừLocal(url, env["CORS_API"]);
    urlChínhTắc = lấyURLChínhTắc(url, html);
  }
  console.log("URL chính tắc lấy được:", urlChínhTắc);
  const urlChínhTắcThật = urlChínhTắc !== "https://www.facebook.com/login/web/";
  if (!urlChínhTắcThật) {
    console.info("Facebook chặn IP này. Lấy trên CORS proxy");
    html = await lấyHTMLTừLocal(url, env["CORS_API"]);
    urlChínhTắc = lấyURLChínhTắc(url, html);
  }
  if (!urlChínhTắc) {
    console.info("Không tìm thấy URL chính tắc. Dùng URL được nhập vào làm URL chính tắc");
    urlChínhTắc = url;
  }

  if (urlChínhTắc && !html) {
    html = await lấyHTML(urlChínhTắc);
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
      const [urlKhôngSlash, urlCóSlash] = lấyURLKhôngSlashVàCóSlash(url);
      const [urlChínhTắc, html] = await lấyURLChínhTắcVàHTMLTừLocal(url);

      cacheUrlChínhTắc.set(urlKhôngSlash, urlChínhTắc);
      cacheUrlChínhTắc.set(urlCóSlash, urlChínhTắc);
      cacheHTML.set(urlChínhTắc, html);
    }
  }
  await Deno.writeTextFile(TẬP_TIN_CACHE_HTML, JSON.stringify(Object.fromEntries(cacheHTML.entries()), null, 2));
  await Deno.writeTextFile(TẬP_TIN_CACHE_URL_CHÍNH_TẮC, JSON.stringify(Object.fromEntries(cacheUrlChínhTắc.entries()), null, 2));
  console.log();
  return cacheHTML;
}

//todo xử lý trường hợp url trả về undefined
export async function lấyMetaTagVàTạoDocumentTrênLocal(urlString: Url, HTML: string | undefined = undefined): Promise<MetaTagUrlVàDocument> {
  const [url, html] = await lấyURLChínhTắcVàHTMLTừLocal(urlString, HTML);
  const meta = await getMetaTags(html) as MetaTags;
  if (!meta?.og) console.warn(`Không lấy được các thẻ Open Graph cho ${url}`);
  const document = new DOMParser().parseFromString(html, "text/html");

  return { meta, url: new URL(url), document, html };
}
