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

export function isUrl(string: string | undefined) {
  try {
    if (!string) return false;
    return Boolean(new URL(string));
  } catch {
    return false;
  }
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

export function táchUrlHoặcEmailTrongChuỗi(chuỗiCóThểCóUrl: string): [string, string | undefined] {
  if (!chuỗiCóThểCóUrl) return ["", ""];
  let chuỗiKhôngCóUrl = chuỗiCóThểCóUrl;
  let url = undefined;
  const urls = linkify.find(chuỗiCóThểCóUrl);
  if (urls.length > 0) {
    url = urls[0].href as string;
    chuỗiKhôngCóUrl = chuỗiCóThểCóUrl.replace(url, "").trim();
    if (chuỗiKhôngCóUrl === "") chuỗiKhôngCóUrl = url;
  }
  return [chuỗiKhôngCóUrl, url];
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
