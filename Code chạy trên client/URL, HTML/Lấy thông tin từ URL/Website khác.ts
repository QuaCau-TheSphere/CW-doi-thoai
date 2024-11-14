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

function táchTênTrongHtmlTitle(htmlTitle: string | undefined): string[] | [undefined, undefined] {
  if (htmlTitle?.includes(" - ")) return htmlTitle.split(" - ");
  if (htmlTitle?.includes(" | ")) return htmlTitle.split(" | ");
  return [undefined, undefined];
}

/**
 * Nếu là trang chủ thì slug là tên website bỏ hết dấu cách.
 * Nếu không phải là trang chủ thì slug sẽ là phần cuối cùng trong pathname. Nếu phần cuối cùng đó có extension, và nó là `htm`, `html`, `php` thì bỏ đi, còn lại thì để lại
 */
function tạoSlugTừUrlWebsite(nguồn: URL | string | undefined, làTrangChủ = false) {
  if (làTrangChủ && typeof nguồn === "string") return nguồn?.replace(/\s/g, "");
  if (!nguồn) return "TOFIX";
  const { pathname } = new URL(nguồn);
  const pathnameWithoutTrailingSlash = pathname.slice(-1) === "/" ? pathname.slice(0, -1) : pathname;
  const pathnameLastSection = pathnameWithoutTrailingSlash.split("/").slice(-1)[0];
  const đuôiHTML = /\.(htm|html|php)$/;
  const đuôiTậpTin = /\.(jpg|png|gif|pdf|doc|docx)$/;

  let slug = pathnameLastSection;
  if (đuôiHTML.test(pathnameLastSection)) slug = pathnameLastSection.replace(đuôiHTML, "");
  if (đuôiTậpTin.test(pathnameLastSection)) slug = pathnameLastSection.replace(".", "");
  return decodeURIComponent(slug);
}

/**
 * Nếu pathname === "/" thì là trang chủ, còn không thì là bài đăng. Điều này có nghĩa là tên miền con (VD: menbership.ciovn.org) sẽ được tính là trang chủ
 */
export function thôngTinWebsite(metaTagUrlVàDocument: MetaTagUrlVàDocument): Website {
  const { meta, document, url } = metaTagUrlVàDocument;
  const { href, pathname, hostname } = url;
  const htmlTitle = document.querySelector("title")?.textContent;
  const [phầnTênBàiTrongHtmlTitle, phầnTênWebsiteTrongHtmlTitle] = táchTênTrongHtmlTitle(htmlTitle);
  const metaTitle = meta.og?.title;

  const subdomain = getSubdomain(href) || "";
  const làTrangChủ = pathname === "/" && !["membership"].includes(subdomain); //tofix

  if (làTrangChủ) {
    const tênWebsite = meta.og?.site_name || phầnTênWebsiteTrongHtmlTitle?.trim() || metaTitle || htmlTitle;
    console.log("🚀 ~ file: Website khác.ts:54 ~ làTrangChủ:", làTrangChủ);
    return {
      "Trang chủ": {
        tên: tênWebsite || hostname,
        môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
        ảnh: meta.og?.image as string,
        slug: tạoSlugTừUrlWebsite(tênWebsite, làTrangChủ),
      },
    };
  } else {
    const tênBàiĐăng = metaTitle || phầnTênBàiTrongHtmlTitle?.trim() || htmlTitle;
    return {
      "Bài đăng": {
        tên: tênBàiĐăng || hostname,
        môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
        ảnh: meta.og?.image as string,
        slug: tạoSlugTừUrlWebsite(url),
      },
    };
  }
}
