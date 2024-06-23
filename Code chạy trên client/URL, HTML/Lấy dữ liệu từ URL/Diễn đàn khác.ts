import { MetaTagUrlVàDocument } from "../Hàm và kiểu cho dữ liệu meta.ts";

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
