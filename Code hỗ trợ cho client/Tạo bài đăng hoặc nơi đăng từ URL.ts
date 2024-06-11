/**
 * @fileoverview Bài đăng và nơi đăng được tạo ở đây ko có id. Id chỉ thêm vào ngay trước lúc nhập vào KV
 */
import { BàiĐăngChưaCóIdVàPhươngThứcTạo } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  LoạiNơiĐăng,
  LoạiNềnTảng,
  ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
  TênNềnTảng,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { viếtThường } from "./Chuỗi, URL, slug/Hàm xử lý chuỗi.ts";
import {
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  tạoNơiĐăngCóCácLựaChọnVịTrí,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { tạoSlugBàiĐăng } from "./Chuỗi, URL, slug/Tạo slug.ts";
import {
  lấyMetaTagVàTạoDocument,
  lấyMôTả,
  lấyTitle,
  lấyURLChínhTắc,
  MetaTags,
  MetaTagUrlVàDocument,
  UrlStringChưaChínhTắc,
} from "./Chuỗi, URL, slug/Hàm và kiểu cho URL.ts";

function cóTênNềnTảngTrongHostname(hostname: string, nềnTảng: TênNềnTảng) {
  if (hostname.includes("youtu.be") && nềnTảng === "YouTube") return true;

  const tênNềnTảngViếtThườngKhôngCách = viếtThường(nềnTảng).replaceAll(" ", "");
  return hostname.includes(tênNềnTảngViếtThườngKhôngCách);
}

export async function tạoTiêuĐề(
  urlString: UrlStringChưaChínhTắc,
  HTML: string | undefined = undefined,
): Promise<string> {
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(urlString, HTML);
  const { meta, url } = metaTagUrlVàDocument;
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

function lấyLĩnhVực(meta: MetaTags): string[] | undefined {
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

/**
 * @param [từĐiểnSlugNơiĐăng=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển Slug
 */
export async function tạoNơiĐăngTừURL(
  urlString: UrlStringChưaChínhTắc,
  slug: string | undefined,
  HTML: string | undefined = undefined,
): Promise<Omit<NơiĐăngCóCácLựaChọnVịTríChưaCóId, "Phương thức tạo">> {
  console.info("Tạo nơi đăng mới từ URL:", urlString.toString());
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(urlString, HTML);
  const { meta, url, document } = metaTagUrlVàDocument;
  const { hostname, pathname } = url;
  let loạiNềnTảng: LoạiNềnTảng | undefined = undefined;
  let tênNềnTảng: TênNềnTảng | undefined = undefined;
  let loạiNơiĐăng: LoạiNơiĐăng | undefined = undefined;

  const danhSáchNềnTảng = (danhSáchDiễnĐàn as unknown as TênNềnTảng[]).concat(danhSáchNềnTảngChat);
  for (const nềnTảng of danhSáchNềnTảng) {
    if (cóTênNềnTảngTrongHostname(hostname, nềnTảng)) {
      tênNềnTảng = nềnTảng;
      if ((danhSáchDiễnĐàn as unknown as TênNềnTảng[]).includes(nềnTảng)) {
        loạiNềnTảng = "Diễn đàn";
        if (hostname.includes("github")) {
          loạiNơiĐăng = ["Repo"];
        }
        if (hostname.includes("facebook") || hostname.includes("linkedin")) {
          pathname.includes("group") ? loạiNơiĐăng = ["Nhóm"] : loạiNơiĐăng = ["Trang"];
        }
        if (hostname.includes("youtube") || url.href.includes("youtu.be")) {
          if (pathname.includes("playlist")) {
            loạiNơiĐăng = ["Danh sách phát"];
          } else if (pathname.includes("/@")) {
            loạiNơiĐăng = ["Kênh"];
          } else {
            loạiNơiĐăng = ["Video"];
          }
        }
      } else {
        loạiNềnTảng = "Chat";
        if (hostname.includes("discord")) {
          loạiNơiĐăng = ["Máy chủ", "Kênh thường"];
        }
        if (hostname.includes("telegram")) {
          loạiNơiĐăng = ["Nhóm", "Chủ đề"];
        }
      }
    }
  }
  loạiNềnTảng = loạiNềnTảng ?? "Website";
  tênNềnTảng = tênNềnTảng ?? "Website";
  loạiNơiĐăng = loạiNơiĐăng ?? ["Website"];

  const thôngTinNơiĐăngChưaCóId: ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo = {
    "Tên nơi đăng": [lấyTitle(metaTagUrlVàDocument) || ""],
    URL: await lấyURLChínhTắc(urlString, HTML),
    "Mô tả nơi đăng": lấyMôTả(metaTagUrlVàDocument),
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Lĩnh vực": lấyLĩnhVực(meta),
    "Đơn vị quản lý": lấyĐơnVịQuảnLý(metaTagUrlVàDocument, loạiNềnTảng),
  };
  const thôngTinNơiĐăng = {
    ...thôngTinNơiĐăngChưaCóId,
    "Slug": slug,
  };
  return tạoNơiĐăngCóCácLựaChọnVịTrí(thôngTinNơiĐăng);
}

export async function tạoBàiĐăngTừURL(
  urlString: UrlStringChưaChínhTắc,
  HTML: string | undefined = undefined,
): Promise<BàiĐăngChưaCóIdVàPhươngThứcTạo> {
  console.info("Tạo bài đăng mới từ URL:", urlString.toString());
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(urlString, HTML);
  const { meta, url } = metaTagUrlVàDocument;
  return {
    "Tiêu đề": await tạoTiêuĐề(urlString, HTML),
    URL: await lấyURLChínhTắc(urlString, HTML),
    "Nội dung bài đăng": {
      "Mô tả bài đăng": lấyMôTả(metaTagUrlVàDocument),
    },
    Slug: tạoSlugBàiĐăng(url),
    "Tác giả": lấyTácGiả(meta),
    "Ngày tạo": lấyNgàyTạo(meta),
    "Ngày cập nhật": lấyNgàyCậpNhật(meta),
  };
}
