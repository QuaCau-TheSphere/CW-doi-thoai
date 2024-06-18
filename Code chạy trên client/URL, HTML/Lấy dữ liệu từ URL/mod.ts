import { parse } from "npm:tldts";
import { MetaTagUrlVàDocument } from "../Hàm và kiểu cho dữ liệu meta.ts";
import { NhómFacebook, SựKiệnFacebook, thôngTinUrlFacebook, TrangFacebook, TàiKhoảnFacebook } from "./Facebook.ts";
import { LoạiNềnTảng, TênNềnTảng, xácĐịnhLoạiNềnTảngTừTênNềnTảng } from "../../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import { viếtHoa } from "../../Chuỗi, slug/Hàm xử lý chuỗi.ts";
export interface OrgHoặcRepoGitHub {
  tên?: string;
  slug?: string;
  avatar?: string;
  môTả?: string;
}
interface GitHub {
  Org?: OrgHoặcRepoGitHub;
  Repo?: OrgHoặcRepoGitHub;
}

export function thôngTinUrlGitHub({ meta, url, document }: MetaTagUrlVàDocument): GitHub {
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
export function thôngTinUrlYouTube({ meta, url }: MetaTagUrlVàDocument) {
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

export interface MáyChủDiscord {
  tên: string | undefined;
}

export function thôngTinUrlDiscord({ document }: MetaTagUrlVàDocument): { "Máy chủ"?: MáyChủDiscord } {
  return {
    "Máy chủ": {
      tên: document.querySelector("title")?.textContent,
    },
  };
}

export function thôngTinWebsite(metaTagUrlVàDocument: MetaTagUrlVàDocument) {
  const { meta, document, url } = metaTagUrlVàDocument;
  const { pathname } = url;
  console.log(meta);
  const htmlTitle = document.querySelector("title")?.textContent;
  const htmlTitleSplit = htmlTitle?.split(" - ");
  const metaTitle = meta.og?.title;

  if (pathname === "/") {
    return {
      "Trang chủ": {
        tên: meta.og?.site_name || htmlTitleSplit?.[1].trim() || metaTitle,
        môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
        ảnh: meta.og?.image,
      },
    };
  }
  return {
    "Bài đăng": {
      tên: metaTitle || htmlTitleSplit?.[0].trim(),
      môTả: meta.og?.description || meta?.description || document.querySelector("p")?.textContent,
      ảnh: meta.og?.image,
    },
  };
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
}

export function lấyThôngTinLoạiUrl(thôngTinUrl: ThôngTinUrl) {
  const { loạiNềnTảng: _, tênNềnTảng: __, ...temp } = thôngTinUrl;
  return Object.entries(temp)[0][1];
}

export function lấyThôngTinTừUrl(metaTagUrlVàDocument: MetaTagUrlVàDocument): ThôngTinUrl {
  const domainNameWithoutSuffix = parse(metaTagUrlVàDocument.url.href).domainWithoutSuffix;
  const tênNềnTảng = viếtHoa(domainNameWithoutSuffix) as TênNềnTảng;
  const loạiNềnTảng = xácĐịnhLoạiNềnTảngTừTênNềnTảng(tênNềnTảng);
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
      default:
        return thôngTinWebsite(metaTagUrlVàDocument);
    }
  }
}
