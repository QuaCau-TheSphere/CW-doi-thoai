import punycode from "npm:punycode";
import * as linkify from "npm:linkifyjs";
import isURL from "npm:validator/lib/isURL.js";
import isEmail from "npm:validator/lib/isEmail.js";

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
  const decodedUri = decodeURI(encodedUrl.toString());
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
export async function lấyURLChínhTắc(urL: UrlChưaChínhTắc, HTML: string | undefined = undefined): Promise<string> {
  const url = urL.toString();
  const html = HTML ? HTML : await lấyHTML(url);
  const document = new DOMParser().parseFromString(html, "text/html");
  const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  return canonical?.getAttribute("href") || url.toString();
}

/**
 * Ở trên client thì không bao giờ fetch trực tiếp hết, mà đều phải fetch qua CORS proxy. Chỉ có trên server thì mới có cơ hội được fetch trực tiếp
 * @see lấyHTMLTừCache
 */
export async function lấyHTML(url: Url, origin: URL["origin"] = globalThis.location.origin) {
  const urlCorsProxy = new URL(`${origin}/api/cors-proxy/`);
  urlCorsProxy.search = new URLSearchParams({ url: url.toString() });
  return await (await fetch(urlCorsProxy)).text();
}
