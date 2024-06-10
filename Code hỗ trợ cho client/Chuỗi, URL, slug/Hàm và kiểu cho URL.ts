import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
import { parse } from "npm:tldts";
import punycode from "npm:punycode";
import * as linkify from "npm:linkifyjs";

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

export type UrlString = string | URL;

export async function lấyMetaTagVàTạoDocument(urlString: UrlString, HTML: string | undefined = undefined): Promise<MetaTagUrlVàDocument> {
  const url = new URL(urlString);
  const html = HTML ? HTML : await (await fetch(url)).text();
  const meta = await getMetaTags(html) as MetaTags;
  if (!meta?.og) console.warn(`Không lấy được các thẻ Open Graph cho ${url.href}`);
  const document = new DOMParser().parseFromString(html, "text/html");

  return { meta, url, document };
}

export function lấyTênMiền(hostname: string) {
  const { domainWithoutSuffix, subdomain } = parse(punycode.toUnicode(hostname));
  const platforms = ["deno", "wordpress", "medium", "tumplr", "wix", "blogger", "substack"];
  if (platforms.includes(domainWithoutSuffix)) return subdomain;
  return domainWithoutSuffix;
}

export function lấyTitle({ meta, document }: MetaTagUrlVàDocument): string {
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
export function xửLýPunycode(encodedUrl: UrlString | undefined, đểDấuCáchTrongLiênKết: boolean = false): string | undefined {
  if (!encodedUrl) return undefined;
  const decodedUri = decodeURI(encodedUrl.toString());
  const hostname = (new URL(encodedUrl)).hostname;
  const decodedHostname = punycode.toUnicode(hostname);
  const decodedString = decodedUri.toString().replace(hostname, decodedHostname);

  if (đểDấuCáchTrongLiênKết) return decodedString;
  return decodedString.replaceAll(" ", "%20");
}

export function lấyURL(metaTagUrlVàDocument: MetaTagUrlVàDocument): UrlString {
  const { meta, url, document } = metaTagUrlVàDocument;
  const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  return canonical?.getAttribute("href") || url.href;
}

export function tạoUrlCorsProxy(urlNgườiDùngNhập: URL["href"], origin: URL["origin"] = globalThis.location.origin) {
  const urlCorsProxy = new URL(`${origin}/api/cors-proxy/`);
  urlCorsProxy.search = new URLSearchParams({ url: urlNgườiDùngNhập });
  return urlCorsProxy;
}

/**
 * Nếu chuỗi chỉ hoàn toàn có URL thì trả về [url, url]. Còn nếu có thì phần tử đầu là những chữ còn lại sau khi loc url. Việc này là để khi người dùng chỉ nhập đúng url mà không nhập gì khác thì dùng url này làm tên nơi đăng luôn cho tiện
 */
export function táchUrlHoặcEmailTrongChuỗi(chuỗiCóThểCóUrl: string): [string, string | undefined] {
  if (!chuỗiCóThểCóUrl) return ["", ""];
  let chuỗiKhôngCóUrl = chuỗiCóThểCóUrl;
  let urlCóSlash = undefined;
  const urls = linkify.find(chuỗiCóThểCóUrl);
  if (urls.length > 0) {
    const urlGốc = urls[0].href;
    chuỗiKhôngCóUrl = chuỗiCóThểCóUrl.replace(urlGốc, "").trim();
    urlCóSlash = appendSlashToUrlIfIsPossible(urlGốc);
    if (chuỗiKhôngCóUrl === "") chuỗiKhôngCóUrl = urlCóSlash;
  }
  return [chuỗiKhôngCóUrl, urlCóSlash];
}

/**
 * Slash is possible to add to the end of url in following cases:
 * - There is no slash standing as last symbol of URL.
 * - There is no file extension (or there is no dot inside the last section of the path).
 * - There is no parameter (even empty one — a single ? at the end of URL).
 * - There is no link to a fragment (even empty one — a single # mark at the end of URL).
 */
export function appendSlashToUrlIfIsPossible(url: string) {
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
