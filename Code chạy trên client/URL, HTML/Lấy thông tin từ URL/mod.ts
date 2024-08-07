import { parse } from "npm:tldts";
import { MetaTagUrlVàDocument } from "../Hàm cho việc tạo bài đăng hoặc nơi đăng từ URL.ts";
import { NhómFacebook, SựKiệnFacebook, thôngTinUrlFacebook, TrangFacebook, TàiKhoảnFacebook } from "./Facebook.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  danhSáchSaaS,
  danhSáchTậpTin,
  LoạiNềnTảng,
  TênNềnTảng,
} from "../../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import { viếtHoa } from "../../Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { OrgHoặcRepoGitHub, thôngTinUrlGitHub, thôngTinUrlYouTube } from "./Diễn đàn khác.ts";
import { MáyChủDiscord, thôngTinUrlDiscord } from "./Chat khác.ts";
import { CơSởDữLiệuNotion, thôngTinUrlGoogle, thôngTinUrlNotion, WorkspaceNotion } from "./SaaS khác.ts";

interface ThôngTinWebsiteCơBản {
  tên?: string;
  slug?: string;
  môTả?: string;
  ảnh?: string;
}
interface Website {
  "Trang chủ"?: ThôngTinWebsiteCơBản;
  "Bài đăng"?: ThôngTinWebsiteCơBản;
}

function thôngTinWebsite(metaTagUrlVàDocument: MetaTagUrlVàDocument): Website {
  const { meta, document, url } = metaTagUrlVàDocument;
  const { pathname } = url;
  const htmlTitle = document.querySelector("title")?.textContent;
  const htmlTitleSplit = htmlTitle?.split(" - ");
  const metaTitle = meta.og?.title;

  const tênWebsite = meta.og?.site_name || htmlTitleSplit?.[1]?.trim() || metaTitle;

  if (pathname === "/") {
    return {
      "Trang chủ": {
        tên: tênWebsite,
        môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
        ảnh: meta.og?.image as string,
        slug: tênWebsite?.replace(/\s/g, ""),
      },
    };
  }
  const tênBàiĐăng = metaTitle || htmlTitleSplit?.[0].trim();
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

export interface ThôngTinUrl {
  tênNềnTảng: TênNềnTảng;
  loạiNềnTảng: LoạiNềnTảng;

  Nhóm?: NhómFacebook;
  Trang?: TrangFacebook;
  "Tài khoản"?: TàiKhoảnFacebook;
  "Sự kiện"?: SựKiệnFacebook;

  Org?: OrgHoặcRepoGitHub;
  Repo?: OrgHoặcRepoGitHub;

  "Máy chủ"?: MáyChủDiscord;

  "Cơ sở dữ liệu"?: CơSởDữLiệuNotion;
  "Workspace"?: WorkspaceNotion;

  "Trang chủ"?: ThôngTinWebsiteCơBản;
  "Bài đăng"?: ThôngTinWebsiteCơBản;
}

function xácĐịnhTênNềnTảngVàLoạiNềnTảngTừUrl(metaTagUrlVàDocument: MetaTagUrlVàDocument): [TênNềnTảng, LoạiNềnTảng] {
  const domainNameWithoutSuffix = parse(metaTagUrlVàDocument.url.href).domainWithoutSuffix;
  const tênMiềnViếtHoa = viếtHoa(domainNameWithoutSuffix) as TênNềnTảng;
  if ((danhSáchDiễnĐàn as unknown as string[]).includes(tênMiềnViếtHoa)) return [tênMiềnViếtHoa, "Diễn đàn"];
  if ((danhSáchNềnTảngChat as unknown as string[]).includes(tênMiềnViếtHoa)) return [tênMiềnViếtHoa, "Chat"];
  if ((danhSáchTậpTin as unknown as string[]).includes(tênMiềnViếtHoa)) return [tênMiềnViếtHoa, "Tập tin"];
  if ((danhSáchSaaS as unknown as string[]).includes(tênMiềnViếtHoa)) return [tênMiềnViếtHoa, "SaaS"];
  return ["Website", "Website"];
}

type LoạiUrl = "Sự kiện" | "Org" | "Repo" | "Máy chủ" | "Cơ sở dữ liệu" | "Workspace" | "Trang chủ" | "Bài đăng";
type ThôngTinLoạiUrl =
  | NhómFacebook
  | TrangFacebook
  | TàiKhoảnFacebook
  | SựKiệnFacebook
  | OrgHoặcRepoGitHub
  | OrgHoặcRepoGitHub
  | MáyChủDiscord
  | CơSởDữLiệuNotion
  | WorkspaceNotion
  | ThôngTinWebsiteCơBản
  | ThôngTinWebsiteCơBản;

export function lấyThôngTinLoạiUrl(thôngTinUrl: ThôngTinUrl): [LoạiUrl, any] {
  const { loạiNềnTảng: _, tênNềnTảng: __, ...temp } = thôngTinUrl;
  return Object.entries(temp)[0] as [LoạiUrl, any];
}

export function lấyThôngTinTừUrl(metaTagUrlVàDocument: MetaTagUrlVàDocument): ThôngTinUrl {
  const [tênNềnTảng, loạiNềnTảng] = xácĐịnhTênNềnTảngVàLoạiNềnTảngTừUrl(metaTagUrlVàDocument);
  const loạiUrl = lấyLoạiUrl();
  return {
    tênNềnTảng: tênNềnTảng,
    loạiNềnTảng: loạiNềnTảng,
    ...loạiUrl,
  };

  function lấyLoạiUrl() {
    switch (tênNềnTảng) {
      case "Facebook":
        return thôngTinUrlFacebook(metaTagUrlVàDocument);
      case "GitHub":
        return thôngTinUrlGitHub(metaTagUrlVàDocument);
      case "YouTube":
        return thôngTinUrlYouTube(metaTagUrlVàDocument);
      case "Discord":
        return thôngTinUrlDiscord(metaTagUrlVàDocument);
      case "Notion":
        return thôngTinUrlNotion(metaTagUrlVàDocument);
      case "Google":
        return thôngTinUrlGoogle(metaTagUrlVàDocument);
      default:
        return thôngTinWebsite(metaTagUrlVàDocument);
    }
  }
}
