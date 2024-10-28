import { getSubdomain } from "npm:tldts";
import { MetaTagUrlVàDocument } from "../Hàm cho việc tạo bài đăng hoặc nơi đăng từ URL.ts";

export interface ThôngTinWebsiteCơBản {
  tên?: string;
  slug?: string;
  môTả?: string;
  ảnh?: string;
}
interface Website {
  "Trang chủ"?: ThôngTinWebsiteCơBản;
  "Bài đăng"?: ThôngTinWebsiteCơBản;
}
/**
 * Nếu pathname === "/" thì là trang chủ, còn không thì là bài đăng. Điều này có nghĩa là tên miền con (VD: menbership.ciovn.org) sẽ được tính là trang chủ
 */
export function thôngTinWebsite(metaTagUrlVàDocument: MetaTagUrlVàDocument): Website {
  const { meta, document, url } = metaTagUrlVàDocument;
  const { href, pathname } = url;
  const htmlTitle = document.querySelector("title")?.textContent;
  const htmlTitleSplit = htmlTitle?.split(" - ");
  const metaTitle = meta.og?.title;

  const tênWebsite = meta.og?.site_name || htmlTitleSplit?.[1]?.trim() || metaTitle || htmlTitle;
  const subdomain = getSubdomain(href) || "";
  const làTrangChủ = pathname === "/" && !["membership"].includes(subdomain);

  if (làTrangChủ) {
    return {
      "Trang chủ": {
        tên: tênWebsite,
        môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
        ảnh: meta.og?.image as string,
        slug: tênWebsite?.replace(/\s/g, ""),
      },
    };
  }
  const tênBàiĐăng = metaTitle || htmlTitleSplit?.[0].trim() || htmlTitle;
  return {
    "Bài đăng": {
      tên: tênBàiĐăng,
      môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
      ảnh: meta.og?.image as string,
      slug: tạoSlugTừUrlWebsite(url),
    },
  };
  /** Nếu  */
  function tạoSlugTừUrlWebsite(url: URL) {
    const { pathname } = url;
    const pathnameWithoutTrailingSlash = pathname.slice(-1) === "/" ? pathname.slice(0, -1) : pathname;
    const pathnameLastSection = pathnameWithoutTrailingSlash.split("/").slice(-1)[0];
    const đuôiHTML = /\.(htm|html|php)$/;
    const đuôiTậpTin = /\.(jpg|png|gif|pdf|doc|docx)$/;

    let slug = pathnameLastSection;
    if (đuôiHTML.test(pathnameLastSection)) slug = pathnameLastSection.replace(đuôiHTML, "");
    if (đuôiTậpTin.test(pathnameLastSection)) slug = pathnameLastSection.replace(".", "");
    return decodeURIComponent(slug);
  }
}
