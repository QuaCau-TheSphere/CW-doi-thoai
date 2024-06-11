import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
import { parse } from "npm:tldts";
import punycode from "npm:punycode";
import * as linkify from "npm:linkifyjs";
import isURL from "npm:validator/lib/isURL.js";
import isEmail from "npm:validator/lib/isEmail.js";

export type MetaTags = {
  /**
   * Defined from HTML specification
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name
   */
  "application-name"?: string;
  author?: string;
  description?: string;
  generator?: string;
  keywords?: string;
  referrer?: string;
  "theme-color"?: string;
  "color-scheme"?: string;
  viewport?: string;

  // Defined from other specifications
  creator?: string;
  googlebot?: string;
  robots?: string;
  publisher?: string;

  /**
   * Defined from Open Graph
   * @see https://ogp.me/
   */
  og?: OpenGraphTags;
  article: {
    publish_time: string;
    modified_time: string;
    expiration_time: string;
    author: string;
    section: string;
    tag: string;
  };
  book: {
    author: string;
    isbn: string;
    release_date: string;
    tag: string;
  };
  profile: {
    first_name: string;
    last_name: string;
    username: string;
    gender: string;
  };

  [extraKeys: string]: unknown;
};
export type OpenGraphTags = {
  title?: string;
  type?: string;
  description?: string;
  site_name?: string;
  locale?: string | { alternate?: string; content: string };
  image?:
    | string
    | {
      url?: string;
      secure_url?: string;
      type?: string;
      width?: string;
      height?: string;
      alt?: string;
      content: string;
    };
  url?: string;
  determiner?: string;
  [extraKeys: string]: unknown;
};

export interface MetaTagUrlVàDocument {
  meta: MetaTags;
  url: URL;
  document: HTMLDocument;
}

export type UrlStringChưaChínhTắc = string | URL;
export type UrlStringChínhTắc = URL;

export async function lấyMetaTagVàTạoDocument(
  urlString: UrlStringChưaChínhTắc | UrlStringChínhTắc,
  HTML: string | undefined = undefined,
): Promise<MetaTagUrlVàDocument> {
  const url = await lấyURLChínhTắc(urlString, HTML);
  const html = HTML ? HTML : await lấyHTML(url);
  const meta = await getMetaTags(html) as MetaTags;
  if (!meta?.og) console.warn(`Không lấy được các thẻ Open Graph cho ${url.href}`);
  const document = new DOMParser().parseFromString(html, "text/html");

  return { meta, url, document };
}

export function lấyUsername(hostname: string) {
  const { domainWithoutSuffix, subdomain } = parse(punycode.toUnicode(hostname));
  const platforms = ["deno", "wordpress", "medium", "tumplr", "wix", "blogger", "substack"];
  if (platforms.includes(domainWithoutSuffix)) return subdomain;
  return domainWithoutSuffix;
}

export function lấyTitle({ meta, url, document }: MetaTagUrlVàDocument): string {
  const title = document.querySelector("title")?.textContent || meta.og?.title;
  if (!title) return "";
  const titleSplit = title.split(" | ");
  titleSplit.pop();
  return titleSplit.join(" | ") || title;
}

export function lấyMôTả({ meta, document }: MetaTagUrlVàDocument): string | null | undefined {
  return meta?.description || document.querySelector("p")?.textContent || meta.og?.description;
}

/**
 * @param đểDấuCáchTrongLiênKết mặc định là false để tạo markdown cho dễ
 */
export function xửLýPunycode(
  encodedUrl: UrlStringChưaChínhTắc | undefined,
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

export async function lấyURLChínhTắc(urlString: UrlStringChưaChínhTắc | UrlStringChínhTắc, HTML: string | undefined = undefined): Promise<URL> {
  const html = HTML ? HTML : await lấyHTML(urlString);
  const document = new DOMParser().parseFromString(html, "text/html");
  const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  return new URL(canonical?.getAttribute("href") || urlString);
}

export function tạoUrlCorsProxy(urlNgườiDùngNhập: URL["href"], origin: URL["origin"] = globalThis.location.origin) {
  const urlCorsProxy = new URL(`${origin}/api/cors-proxy/`);
  urlCorsProxy.search = new URLSearchParams({ url: urlNgườiDùngNhập });
  return urlCorsProxy;
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
    urlHoặcEmail = type === "email" ? href : (await lấyURLChínhTắc(href)).href;
    if (chuỗiĐượcLọc === "") chuỗiĐượcLọc = urlHoặcEmail;
  }
  return [chuỗiĐượcLọc, urlHoặcEmail];
}

/**
 * Slash is possible to add to the end of url in following cases:
 * - There is no slash standing as last symbol of URL.
 * - There is no file extension (or there is no dot inside the last section of the path).
 * - There is no parameter (even empty one — a single ? at the end of URL).
 * - There is no link to a fragment (even empty one — a single # mark at the end of URL).
 */
function appendSlashToUrlIfIsPossible(url: UrlStringChưaChínhTắc) {
  /** Removing empty parameter or fragment so the URL will always have slash if possible */
  const urlWithNoEmptyParameterOrFragment = url.toString().replace(/#$/g, "").replace(/\?$/g, "");

  const parsedUrl = new URL(urlWithNoEmptyParameterOrFragment);

  /** There are directories with dots in the last section of the path, so we can only hope that the file extension being in used (if any) is a common one */
  const noFileExtension = !/\.(htm|html|jpg|png|gif|pdf|php|doc|docx)$/.test(parsedUrl.pathname);

  const noParameter = !parsedUrl.search;
  const noLinkToFragment = !parsedUrl.hash;

  /** All checks above cannot guarantee that there is no '?' or '#' symbol at the end of URL. It is required to be checked manually */
  const noTrailingSlashAlready = !/\/$/.test(parsedUrl.href);

  const slashAppendingIsPossible = noFileExtension && noParameter && noLinkToFragment && noTrailingSlashAlready;
  return slashAppendingIsPossible ? `${parsedUrl.href}/` : parsedUrl.href;
}

export async function lấyHTML(urlString: UrlStringChưaChínhTắc | UrlStringChínhTắc) {
  return await (await fetch(urlString)).text();
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
type UrlStringĐãXửLýSlashVàChưaCanonical = string;
export function xửLýSlash(urlString: UrlStringChưaChínhTắc, debug = ""): UrlStringĐãXửLýSlashVàChưaCanonical {
  const url = new URL(urlString);
  const danhSáchHostnameKhôngThêmSlashĐược = ["discord.gg"];
  if (url.href === "https://discord.gg/jWTk4EHFK2") {
    console.log(
      // "🚀 xửLýSlash",
      debug,
      url.href,
      danhSáchHostnameKhôngThêmSlashĐược.includes(url.hostname),
    );
  }
  return danhSáchHostnameKhôngThêmSlashĐược.includes(url.hostname) ? url.href : new URL(appendSlashToUrlIfIsPossible(url.href)).href;
}
