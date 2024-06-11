import { parse } from "npm:tldts";
import punycode from "npm:punycode";
import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { viếtThường } from "../Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { tạoNơiĐăngTừURL } from "./Tạo bài đăng hoặc nơi đăng từ URL.ts";
import { UrlStringChínhTắc, UrlStringChưaChínhTắc } from "./Hàm và kiểu cho URL.ts";
import { LoạiNềnTảng, TênNềnTảng } from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";

export async function lấyHTML(urlString: UrlStringChưaChínhTắc | UrlStringChínhTắc) {
  return await (await fetch(urlString.toString())).text();
}

/** Không gộp lại thành chung một biến được vì nếu không có URL chính tắc trong HTML thì còn lấy URL được nhập từ trước */
export async function lấyURLChínhTắc(urlString: UrlStringChưaChínhTắc | UrlStringChínhTắc, HTML: string | undefined = undefined): Promise<URL> {
  const html = HTML ? HTML : await lấyHTML(urlString);
  const document = new DOMParser().parseFromString(html, "text/html");
  const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  return new URL(canonical?.getAttribute("href") || urlString);
}

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
  html: string;
}

export async function lấyMetaTagVàTạoDocument(
  urlString: UrlStringChưaChínhTắc | UrlStringChínhTắc,
  HTML: string | undefined = undefined,
): Promise<MetaTagUrlVàDocument> {
  const url = await lấyURLChínhTắc(urlString, HTML);
  const html = HTML ? HTML : await lấyHTML(url);
  const meta = await getMetaTags(html) as MetaTags;
  if (!meta?.og) console.warn(`Không lấy được các thẻ Open Graph cho ${url.href}`);
  const document = new DOMParser().parseFromString(html, "text/html");

  return { meta, url, document, html };
}

export function lấyUsername(hostname: string) {
  const { domainWithoutSuffix, subdomain } = parse(punycode.toUnicode(hostname));
  const platforms = ["deno", "wordpress", "medium", "tumplr", "wix", "blogger", "substack"];
  if (platforms.includes(domainWithoutSuffix)) return subdomain;
  return domainWithoutSuffix;
}

export function lấyTitle({ meta, url, document }: MetaTagUrlVàDocument): string | undefined {
  const metaTitle = meta.og?.title;
  const htmlTitle = document.querySelector("title")?.textContent;

  if (!metaTitle && !htmlTitle) return "";
  if (metaTitle && !htmlTitle) return metaTitle;
  if (!metaTitle && htmlTitle) return htmlTitle;
  if (metaTitle && htmlTitle) {
    if (metaTitle.length <= htmlTitle.length) return htmlTitle;
    if (metaTitle.length > htmlTitle.length) return metaTitle;
  }
}

export function lấyMôTả({ meta, document }: MetaTagUrlVàDocument): string | null | undefined {
  return meta?.description || document.querySelector("p")?.textContent || meta.og?.description;
}

export function cóTênNềnTảngTrongHostname(hostname: string, nềnTảng: TênNềnTảng) {
  if (hostname.includes("youtu.be") && nềnTảng === "YouTube") return true;

  const tênNềnTảngViếtThườngKhôngCách = viếtThường(nềnTảng).replaceAll(" ", "");
  return hostname.includes(tênNềnTảngViếtThườngKhôngCách);
}

export async function tạoTiêuĐề(
  urlString: UrlStringChưaChínhTắc,
  HTML: string | undefined = undefined,
): Promise<string> {
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(urlString, HTML);
  const { meta, url, document } = metaTagUrlVàDocument;
  const metaTitle = meta.og?.title;
  const htmlTitle = document.querySelector("title")?.textContent;
  const htmlTitleSplit = htmlTitle?.split(/ [-–—|·] /g) || [];
  const siteName = meta.og?.site_name;

  const {
    "Loại nơi đăng": loạiNơiĐăng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nền tảng": loạiNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
  } = await tạoNơiĐăngTừURL(url.href, undefined, HTML);

  let tên;
  switch (loạiNềnTảng) {
    case "Diễn đàn":
    case "Chat":
      switch (tênNềnTảng) {
        case "Facebook":
          tên = metaTitle;
          break;
        case "Discord":
          tên = htmlTitle;
          break;
        case "GitHub":
          switch (htmlTitleSplit[1]) {
            case "GitHub":
              return `Org GitHub ${htmlTitleSplit[0]}`;
            default:
              /** Repo bình thường */
              tên = htmlTitleSplit[1];
          }
          break;
        default:
          tên = siteName;
          break;
      }
      return `${loạiNơiĐăng[0]} ${tênNềnTảng} ${tên}`;
    case "Website":
      if (url.pathname === "/") {
        const tênTrang = siteName ? siteName : htmlTitleSplit[htmlTitleSplit.length - 1];
        return `Trang chủ ${tênTrang}`;
      }
      return lấyTitle(metaTagUrlVàDocument) || "";
    default:
      return `${tênNềnTảng} ${tênNơiĐăng[0]}`;
  }
}
export function lấyLĩnhVực(meta: MetaTags): string[] | undefined {
  if (meta?.keywords) return meta.keywords.split(",");
  if (meta?.article?.tag) return [meta.article?.tag];
  return undefined;
}

export function lấyĐơnVịQuảnLý({ meta, url, document }: MetaTagUrlVàDocument, loạiNềnTảng: LoạiNềnTảng = "Website"): string | undefined {
  switch (loạiNềnTảng) {
    case "Website": {
      const title = document.querySelector("title")?.textContent || meta.og?.title;
      if (!title) return url.hostname;
      const titleSplit = title.split(" | ");
      return titleSplit[titleSplit.length - 1];
    }
    default:
      break;
  }
}

export function lấyNgàyCậpNhật(meta: MetaTags): Date | undefined {
  return meta?.article?.modified_time ? new Date(meta.article.modified_time) : undefined;
}

export function lấyNgàyTạo(meta: MetaTags): Date | undefined {
  return meta?.article?.publish_time ? new Date(meta.article.publish_time) : undefined;
}

export function lấyTácGiả(meta: MetaTags): string | undefined {
  return meta?.author || meta.article?.author || meta.creator;
}
