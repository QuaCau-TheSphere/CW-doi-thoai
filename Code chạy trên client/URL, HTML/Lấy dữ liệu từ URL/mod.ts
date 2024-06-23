import { parse } from "npm:tldts";
import { lấyTênMiềnCấpNhỏ, MetaTagUrlVàDocument } from "../Hàm và kiểu cho dữ liệu meta.ts";
import { NhómFacebook, SựKiệnFacebook, thôngTinUrlFacebook, TrangFacebook, TàiKhoảnFacebook } from "./Facebook.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  danhSáchSaaS,
  danhSáchĐịnhDạngTậpTin,
  LoạiNềnTảng,
  TênNềnTảng,
} from "../../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import { viếtHoa } from "../../Chuỗi, slug/Hàm xử lý chuỗi.ts";
interface OrgHoặcRepoGitHub {
  tên?: string;
  slug?: string;
  avatar?: string;
  môTả?: string;
}
interface GitHub {
  Org?: OrgHoặcRepoGitHub;
  Repo?: OrgHoặcRepoGitHub;
}

function thôngTinUrlGitHub({ meta, url, document }: MetaTagUrlVàDocument): GitHub {
  const htmlTitle = document.querySelector("title")?.textContent;
  const htmlTitleSplit = htmlTitle?.split(/ - /g) || [];
  let tên;
  if (htmlTitleSplit[1] === "GitHub") {
    tên = meta.og?.title;
    return {
      Org: {
        tên: tên,
        môTả: meta.og?.description?.replace(` - ${tên}`, ""),
        slug: url.pathname.slice(1),
        avatar: meta.twitter?.image,
      },
    };
  }
  tên = htmlTitleSplit[1];
  return {
    Repo: {
      tên: tên,
      môTả: meta.og?.description?.replace(` - ${tên}`, ""),
      slug: url.pathname.slice(1),
      avatar: meta.twitter?.image,
    },
  };
}
function thôngTinUrlYouTube({ meta, url }: MetaTagUrlVàDocument) {
  const pathname = url.pathname;
  const làKênh = pathname.startsWith("/@") || pathname.startsWith("/channel");
  const làDanhSáchPhát = pathname.includes("playlist");

  if (làKênh) {
    return {
      Kênh: {
        tên: meta.og?.title,
        môTả: meta.og?.description,
        avatar: meta.twitter?.image,
      },
    };
  }
  if (làDanhSáchPhát) {
    return {
      "Danh sách video": {
        tên: meta.og?.title,
        môTả: meta.og?.description,
        avatar: meta.twitter?.image,
      },
    };
  }
  return {
    Video: {
      tên: meta.og?.title,
      môTả: meta.og?.description,
    },
  };
}

interface MáyChủDiscord {
  tên: string | undefined;
}

function thôngTinUrlDiscord({ document }: MetaTagUrlVàDocument): { "Máy chủ"?: MáyChủDiscord } {
  return {
    "Máy chủ": {
      tên: document.querySelector("title")?.textContent,
    },
  };
}

interface CơSởDữLiệuNotion {
  tên: string;
  username: string;
  slug: string;
}

interface WorkspaceNotion {
  username: string;
}

interface Notion {
  "Cơ sở dữ liệu"?: CơSởDữLiệuNotion;
  "Workspace"?: WorkspaceNotion;
}
function thôngTinUrlNotion({ url }: MetaTagUrlVàDocument): Notion {
  const { pathname, hostname } = url;
  const username = lấyTênMiềnCấpNhỏ(hostname);
  const temp = pathname.slice(1).split("-");
  temp.pop();
  const tênCơSởDữLiệu = temp.join(" ");
  if (tênCơSởDữLiệu) {
    return {
      "Cơ sở dữ liệu": {
        tên: tênCơSởDữLiệu,
        username: username,
        slug: temp.join("-"),
      },
    };
  }
  return {
    "Workspace": {
      username: username,
    },
  };
}

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
  return {
    "Bài đăng": {
      tên: metaTitle || htmlTitleSplit?.[0].trim(),
      môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
      ảnh: meta.og?.image as string,
      slug: tạoSlugWebsite(pathname.split("/").slice(-1)[0]),
    },
  };

  function tạoSlugWebsite(chuỗi: string) {
    const đuôiHTML = /\.(htm|html|php)$/;
    const đuôiTậpTin = /\.(jpg|png|gif|pdf|doc|docx)$/;
    if (đuôiHTML.test(chuỗi)) return chuỗi.replace(đuôiHTML, "");
    if (đuôiTậpTin.test(chuỗi)) return chuỗi.replace(".", "");
    return chuỗi;
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
  if ((danhSáchĐịnhDạngTậpTin as unknown as string[]).includes(tênMiềnViếtHoa)) return [tênMiềnViếtHoa, "Tập tin"];
  if ((danhSáchSaaS as unknown as string[]).includes(tênMiềnViếtHoa)) return [tênMiềnViếtHoa, "SaaS"];
  return ["Website", "Website"];
}

export function lấyThôngTinLoạiUrl(thôngTinUrl: ThôngTinUrl): Record<any, string> {
  const { loạiNềnTảng: _, tênNềnTảng: __, ...temp } = thôngTinUrl;
  return Object.entries(temp)[0][1];
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
      default:
        return thôngTinWebsite(metaTagUrlVàDocument);
    }
  }
}
