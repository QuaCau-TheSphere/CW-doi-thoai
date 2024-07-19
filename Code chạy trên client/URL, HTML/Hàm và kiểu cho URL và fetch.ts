import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
import punycode from "npm:punycode";
import * as linkify from "npm:linkifyjs";
import isURL from "npm:validator/lib/isURL.js";
import isEmail from "npm:validator/lib/isEmail.js";
import { IS_BROWSER } from "$fresh/src/runtime/utils.ts";
// import { lấyURLChínhTắcVàHTMLTừLocal } from "../../Code%20ch%E1%BA%A1y%20tr%C3%AAn%20local,%20server,%20KV/H%C3%A0m%20cho%20cache.ts";

export type UrlChưaChínhTắc = string | URL;
export type UrlChínhTắc = URL;
export type Url = UrlChưaChínhTắc | UrlChínhTắc;

/**
 * @param đểDấuCáchTrongLiênKết mặc định là false để tạo markdown cho dễ
 */
export function xửLýPunycode(
  encodedUrl: UrlChưaChínhTắc | undefined,
  đểDấuCáchTrongLiênKết: boolean = false,
): string | undefined {
  if (!encodedUrl) return undefined;
  console.log("🚀 ~ encodedUrl:", encodedUrl);
  const decodedUri = decodeURI(encodedUrl.toString());
  console.log("🚀 ~ decodedUri:", decodedUri);
  const hostname = (new URL(encodedUrl)).hostname;
  const decodedHostname = punycode.toUnicode(hostname);
  const decodedString = decodedUri.toString().replace(hostname, decodedHostname);

  if (đểDấuCáchTrongLiênKết) return decodedString;
  return decodedString.replaceAll(" ", "%20");
}

/**
 * Nếu chuỗi chỉ hoàn toàn có URL thì trả về [url, url]. Còn nếu có thì phần tử đầu là những chữ còn lại sau khi loc url. Việc này là để khi người dùng chỉ nhập đúng url mà không nhập gì khác thì dùng url này làm tên nơi đăng luôn cho tiện
 */
export async function táchUrlHoặcEmailĐầuTiênTrongChuỗi(chuỗi: string): Promise<[string, string | undefined]> {
  if (!chuỗi) return ["", ""];
  let chuỗiĐượcLọc = chuỗi;
  let urlHoặcEmail = undefined;
  const urls = linkify.find(chuỗi);
  if (urls.length > 0) {
    const { href, type } = urls[0];
    chuỗiĐượcLọc = chuỗi.replace(href, "").trim();
    urlHoặcEmail = type === "email" ? href : (await lấyURLChínhTắc(href));
    if (chuỗiĐượcLọc === "") chuỗiĐượcLọc = urlHoặcEmail;
  }
  return [chuỗiĐượcLọc, urlHoặcEmail];
}

export function lấyURLTrongJSON(vậtThể: Record<any, any>) {
  /**
   * Cần để `JSON.stringify(vậtThể, null, 2)` chứ không để `JSON.stringify(vậtThể)` được
   *  @see https://github.com/Hypercontext/linkifyjs/discussions/480
   */
  return linkify.find(JSON.stringify(vậtThể, null, 2)).filter((i) => isURL(i.href));
}

export function lấyEmailTrongJSON(vậtThể: Record<any, any>) {
  /**
   * Cần để `JSON.stringify(vậtThể, null, 2)` chứ không để `JSON.stringify(vậtThể)` được
   *  @see https://github.com/Hypercontext/linkifyjs/discussions/480
   */
  return linkify.find(JSON.stringify(vậtThể, null, 2)).filter((i) => isEmail(i.href));
}

/** Không gộp lại thành chung một biến được vì nếu không có URL chính tắc trong HTML thì còn lấy URL được nhập từ trước */
export async function lấyURLChínhTắc(url: UrlChưaChínhTắc, HTML: string | undefined = undefined): Promise<string> {
  let urlChínhTắc;
  if (!IS_BROWSER) {
    // urlChínhTắc = (await lấyURLChínhTắcVàHTMLTừLocal(url))[0];
  } else {
    const html = HTML ? HTML : await lấyHTML(url);
    const document = new DOMParser().parseFromString(html, "text/html");
    const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    urlChínhTắc = canonical?.getAttribute("href");
  }
  return urlChínhTắc || url.toString();
}

export async function lấyHTML(url: Url) {
  let urlĐểFetch;
  if (IS_BROWSER) {
    /**
     * Ở trên client thì không bao giờ fetch trực tiếp hết, mà đều phải fetch server. Chỉ có trên server thì mới có cơ hội được fetch trực tiếp
     * @see lấyHTMLTừCache
     */
    const origin = globalThis.location.origin;
    urlĐểFetch = tạoCorsURL(origin);
    urlĐểFetch.search = new URLSearchParams({ url: url.toString() }).toString();
  } else {
    urlĐểFetch = url;
  }
  return await (await fetch(urlĐểFetch)).text();
}

export function tạoCorsURL(origin: string) {
  return new URL(`${origin}/api/cors/`);
}

/**
 * Slash is possible to add to the end of url in following cases:
 * - There is no slash standing as last symbol of URL.
 * - There is no file extension (or there is no dot inside the last section of the path).
 * - There is no parameter (even empty one — a single ? at the end of URL).
 * - There is no link to a fragment (even empty one — a single # mark at the end of URL).
 */
function appendSlashToUrlIfIsPossible(url: string) {
  /** Removing empty parameter or fragment so the URL will always have slash if possible */
  const urlWithNoEmptyParameterOrFragment = url.replace(/#$/g, "").replace(/\?$/g, "");

  const parsedUrl = new URL(urlWithNoEmptyParameterOrFragment);

  /** There are directories with dots in the last section of the path, so we can only hope that the file extension being in used (if any) is a common one */
  const noFileExtension = !/\.(htm|html|jpg|png|gif|pdf|php|doc|docx)$/.test(parsedUrl.pathname);

  const noParameter = !parsedUrl.search;
  const noLinkToFragment = !parsedUrl.hash;

  /** All checks above cannot guarantee that there is no '?' or '#' symbol at the end of URL. It is required to be checked manually */
  const noTrailingSlashAlready = !/\/$/.test(parsedUrl.href);

  const slashAppendingIsPossible = noFileExtension && noParameter && noLinkToFragment && noTrailingSlashAlready;

  if (slashAppendingIsPossible) return `${parsedUrl.href}/`;
  return parsedUrl.href;
}

export function lấyURLKhôngSlashVàCóSlash(url: string) {
  let urlKhôngSlash;
  let urlCóSlash;
  if (url.endsWith("/")) {
    urlCóSlash = url;
    urlKhôngSlash = urlCóSlash.slice(0, -1);
  } else {
    urlKhôngSlash = url;
    urlCóSlash = appendSlashToUrlIfIsPossible(urlKhôngSlash);
  }
  return [urlKhôngSlash, urlCóSlash];
}
