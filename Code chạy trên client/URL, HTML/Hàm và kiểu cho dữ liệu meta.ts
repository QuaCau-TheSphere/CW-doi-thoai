import { parse } from "npm:tldts";
import punycode from "npm:punycode";
import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { lấyHTML, lấyURLChínhTắc, Url, UrlChínhTắc } from "./Hàm và kiểu cho URL và fetch.ts";
import { LoạiNềnTảng } from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import { remark } from "https://esm.sh/remark";
import stripMarkdown from "https://esm.sh/strip-markdown@6";
import { lấyThôngTinLoạiUrl, ThôngTinUrl } from "./Lấy dữ liệu từ URL/mod.ts";
import { TênNơiĐăng } from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";

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
  al: Record<string, string>;
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
  url: UrlChínhTắc;
  document: HTMLDocument;
  html: string;
}

/**
 * @param HTML không bỏ tham số này dù thấy là đã có lấy HTML rồi. Vì hàm lấyHTML này chỉ chạy trên client được, trong khi có thể cần lấyMetaTagVàTạoDocument trên local (VD trong test).
 * @returns
 */
export async function lấyMetaTagVàTạoDocument(urlString: Url, HTML: string | undefined = undefined): Promise<MetaTagUrlVàDocument> {
  const html = HTML ? HTML : await lấyHTML(urlString);
  const url = await lấyURLChínhTắc(urlString, html);
  const meta = await getMetaTags(html) as MetaTags;
  if (!meta?.og) console.warn(`Không lấy được các thẻ Open Graph cho ${url}`);
  const document = new DOMParser().parseFromString(html, "text/html");

  return { meta, url: new URL(url), document, html };
}

export function lấyTênMiềnCấpNhỏ(hostname: string) {
  const { domainWithoutSuffix, subdomain } = parse(punycode.toUnicode(hostname));
  const platforms = ["deno", "wordpress", "medium", "tumplr", "wix", "blogger", "substack", "notion"];
  if (platforms.includes(domainWithoutSuffix)) return subdomain;
  return domainWithoutSuffix;
}

export function lấyLĩnhVực(meta: MetaTags): string[] | undefined {
  if (meta?.keywords) return meta.keywords.split(",");
  if (meta?.article?.tag) return [meta.article?.tag];
  return undefined; //todo: dùng gpt dán nhãn
}

export function lấyĐơnVịQuảnLý({ meta, url, document }: MetaTagUrlVàDocument, thôngTinUrl: ThôngTinUrl): string | undefined {
  const { loạiNềnTảng, tênNềnTảng } = thôngTinUrl;

  switch (loạiNềnTảng) {
    case "Website": {
      const title = document.querySelector("title")?.textContent || meta.og?.title;
      if (!title) return url.hostname;
      const titleSplit = title.split(" | ");
      return titleSplit[titleSplit.length - 1];
    }
    default: {
      const { username, tàiKhoảnĐăng } = lấyThôngTinLoạiUrl(thôngTinUrl)[1];
      return username || tàiKhoảnĐăng;
    }
  }
}

export function lấyNgàyCậpNhật(meta: MetaTags): Date | undefined {
  return meta?.article?.modified_time ? new Date(meta.article.modified_time) : undefined;
}

export function lấyNgàyTạo(meta: MetaTags): Date | undefined {
  return meta?.article?.publish_time ? new Date(meta.article.publish_time) : undefined;
}

export function lấyTácGiả(meta: MetaTags, thôngTinUrl: ThôngTinUrl): string | undefined {
  const username = lấyThôngTinLoạiUrl(thôngTinUrl)[1].username;
  const tàiKhoảnĐăng = lấyThôngTinLoạiUrl(thôngTinUrl)[1].tàiKhoảnĐăng;
  return meta?.author || meta.article?.author || meta.creator || username || tàiKhoảnĐăng;
}

export function tạoTiêuĐềBàiĐăng(thôngTinUrl: ThôngTinUrl): string {
  const [loạiUrl, thôngTinLoạiUrl] = lấyThôngTinLoạiUrl(thôngTinUrl);
  const { tên, tiêuĐề, username } = thôngTinLoạiUrl;
  if (loạiUrl === "Trang chủ") {
    return `Trang chủ ${tên}`;
  }
  switch (thôngTinUrl.tênNềnTảng) {
    case "Discord":
      return `Liên kết mời tham gia Discord ${tên}`;

    default:
      return tên || tiêuĐề || username || "";
  }
}

export function lấyMôTả(thôngTinUrl: ThôngTinUrl): string | null | undefined {
  const [_, thôngTinLoạiUrl] = lấyThôngTinLoạiUrl(thôngTinUrl);
  return thôngTinLoạiUrl.môTả || thôngTinLoạiUrl.nộiDung;
}

/** Không dùng tiêu đề làm slug */
export function tạoSlugBàiĐăng({ hostname, pathname }: URL, thôngTinUrl: ThôngTinUrl) {
  const [_, thôngTinLoạiUrl] = lấyThôngTinLoạiUrl(thôngTinUrl);
  switch (thôngTinUrl.loạiNềnTảng) {
    case "Diễn đàn":
    case "Chat":
    case "SaaS": {
      const { tên, slug, username } = thôngTinLoạiUrl;
      return slug || username || tên;
    }

    default: {
      let slugWebsiteCóSẵn = pathname.substring(1);
      slugWebsiteCóSẵn = slugWebsiteCóSẵn.slice(-1) === "/" ? slugWebsiteCóSẵn.slice(0, -1) : slugWebsiteCóSẵn;
      if (slugWebsiteCóSẵn.startsWith("blog/")) slugWebsiteCóSẵn = slugWebsiteCóSẵn.replace("blog/", "");
      if (slugWebsiteCóSẵn.includes("/")) return undefined;
      return slugWebsiteCóSẵn ? slugWebsiteCóSẵn : lấyTênMiềnCấpNhỏ(hostname);
    }
  }
}

export function lấyTitle({ meta, document }: MetaTagUrlVàDocument): string | undefined {
  const htmlTitle = document.querySelector("title")?.textContent;
  const metaTitle = meta.og?.title;
  return metaTitle || htmlTitle;
}

export function tạoTênNơiĐăng(thôngTinUrl: ThôngTinUrl): TênNơiĐăng {
  const [_, thôngTinLoạiUrl] = lấyThôngTinLoạiUrl(thôngTinUrl);
  const { tên, tiêuĐề, môTả, nộiDung } = thôngTinLoạiUrl;
  return [tên || tiêuĐề || môTả || nộiDung];
}
