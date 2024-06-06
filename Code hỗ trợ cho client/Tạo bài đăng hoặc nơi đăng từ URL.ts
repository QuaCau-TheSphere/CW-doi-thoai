/**
 * @fileoverview Bài đăng và nơi đăng được tạo ở đây ko có id. Id chỉ thêm vào ngay trước lúc nhập vào KV
 */
import { BàiĐăngChưaCóIdVàPhươngThứTạo } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  LoạiNơiĐăng,
  LoạiNềnTảng,
  ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
  TênNềnTảng,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { viếtThường } from "./Hàm xử lý chuỗi.ts";
import {
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  tạoNơiĐăngCóCácLựaChọnVịTrí,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { tạoSlugNơiĐăng, TừĐiểnSlugNơiĐăng } from "./Tạo slug nơi đăng.ts";
import { lấyMetaTagVàTạoDocument, lấyMôTả, lấyTitle, lấyTênMiền, MetaTags, MetaTagUrlVàDocument, UrlString } from "./Hàm và kiểu cho URL.ts";

function cóTênNềnTảngTrongHostname(hostname: string, nềnTảng: TênNềnTảng) {
  if (hostname.includes("youtu.be") && nềnTảng === "YouTube") return true;

  const tênNềnTảngViếtThườngKhôngCách = viếtThường(nềnTảng).replaceAll(" ", "");
  return hostname.includes(tênNềnTảngViếtThườngKhôngCách);
}

function lấyLĩnhVực(meta: MetaTags): string[] | undefined {
  if (meta?.keywords) return meta.keywords.split(",");
  if (meta?.article?.tag) return [meta.article?.tag];
  return undefined;
}

function lấyĐơnVịQuảnLý(loạiNềnTảng: LoạiNềnTảng, { meta, url, document }: MetaTagUrlVàDocument): string | undefined {
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

function tạoSlugBàiĐăng({ hostname, pathname }: URL) {
  const làDiễnĐàn = (danhSáchDiễnĐàn as unknown as string[]).includes(hostname);
  const làNềnTảngChat = (danhSáchNềnTảngChat as unknown as string[]).includes(hostname);

  if (!làDiễnĐàn && !làNềnTảngChat) {
    const tênMiền = lấyTênMiền(hostname);
    let slugWebsiteCóSẵn = pathname.substring(1);
    slugWebsiteCóSẵn = slugWebsiteCóSẵn.slice(-1) === "/" ? slugWebsiteCóSẵn.slice(0, -1) : slugWebsiteCóSẵn;
    if (slugWebsiteCóSẵn.startsWith("blog/")) slugWebsiteCóSẵn = slugWebsiteCóSẵn.replace("blog/", "");
    if (slugWebsiteCóSẵn.includes("/")) return undefined;
    return slugWebsiteCóSẵn ? slugWebsiteCóSẵn : tênMiền;
    return slugWebsiteCóSẵn ? `${tênMiền}-${slugWebsiteCóSẵn}` : tênMiền;
  }
  return undefined;
}

/**
 * @param [từĐiểnMãNơiĐăng=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển Slug
 */
export async function tạoNơiĐăngTừURL(
  urlString: UrlString,
  từĐiểnMãNơiĐăng: TừĐiểnSlugNơiĐăng | undefined = undefined,
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
    "Tên nơi đăng": [lấyTitle(metaTagUrlVàDocument)],
    URL: meta.og?.url || url.href,
    "Mô tả nơi đăng": lấyMôTả(metaTagUrlVàDocument),
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Lĩnh vực": lấyLĩnhVực(meta),
    "Đơn vị quản lý": lấyĐơnVịQuảnLý(loạiNềnTảng, metaTagUrlVàDocument),
  };
  const thôngTinNơiĐăng = {
    ...thôngTinNơiĐăngChưaCóId,
    "Slug": tạoSlugNơiĐăng(thôngTinNơiĐăngChưaCóId, từĐiểnMãNơiĐăng),
  };
  return tạoNơiĐăngCóCácLựaChọnVịTrí(thôngTinNơiĐăng);
}

export async function tạoBàiĐăngTừURL(urlString: UrlString, HTML: string | undefined = undefined): Promise<BàiĐăngChưaCóIdVàPhươngThứTạo> {
  console.info("Tạo bài đăng mới từ URL:", urlString.toString());
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(urlString, HTML);
  console.log("🚀 ~ tạoBàiĐăngTừURL ~ metaTagUrlVàDocument:", metaTagUrlVàDocument);
  const { meta, url, document } = metaTagUrlVàDocument;
  return {
    "Tiêu đề": lấyTitle(metaTagUrlVàDocument),
    URL: meta.og?.url || url.href,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": lấyMôTả(metaTagUrlVàDocument),
    },
    Slug: tạoSlugBàiĐăng(url),
    "Tác giả": meta?.author || meta.article?.author || meta.creator,
    "Ngày tạo": meta?.article?.publish_time ? new Date(meta.article.publish_time) : undefined,
    "Ngày cập nhật": meta?.article?.modified_time ? new Date(meta.article.modified_time) : undefined,
  };
}
