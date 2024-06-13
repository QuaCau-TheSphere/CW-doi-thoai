/**
 * @fileoverview Bài đăng và nơi đăng được tạo ở đây ko có id. Id chỉ thêm vào ngay trước lúc nhập vào KV
 */
import { BàiĐăngChưaCóIdVàPhươngThứcTạo } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  LoạiNơiĐăng,
  LoạiNềnTảng,
  ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
  TênNềnTảng,
} from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import {
  NơiĐăngCóCácLựaChọnVịTríChưaCóIdVàPhươngThứcTạo,
  tạoNơiĐăngCóCácLựaChọnVịTrí,
} from "../../Code chạy trên local, server, KV/Nơi đăng/Hàm và kiểu cho vị trí.ts";
import { tạoSlugBàiĐăng } from "../Chuỗi, slug/Tạo slug.ts";
import { lấyURLChínhTắc, UrlChưaChínhTắc } from "./Hàm và kiểu cho URL và fetch.ts";
import {
  cóTênNềnTảngTrongHostname,
  lấyLĩnhVực,
  lấyMetaTagVàTạoDocument,
  lấyMôTả,
  lấyNgàyCậpNhật,
  lấyNgàyTạo,
  lấyTitle,
  lấyTácGiả,
  lấyĐơnVịQuảnLý,
  tạoTiêuĐề,
} from "./Hàm và kiểu cho dữ liệu meta.ts";

export function tạoThôngTinNơiĐăngTừURL(url: URL) {
  let loạiNềnTảng: LoạiNềnTảng | undefined = undefined;
  let tênNềnTảng: TênNềnTảng | undefined = undefined;
  let loạiNơiĐăng: LoạiNơiĐăng | undefined = undefined;

  const { hostname, pathname } = url;
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
  return { loạiNềnTảng, tênNềnTảng, loạiNơiĐăng };
}

/**
 * @param [slug=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có slug
 */
export async function tạoNơiĐăngTừURL(
  urlString: UrlChưaChínhTắc,
  slug: string | undefined,
  HTML: string | undefined = undefined,
): Promise<NơiĐăngCóCácLựaChọnVịTríChưaCóIdVàPhươngThứcTạo> {
  console.trace("Tạo nơi đăng mới từ URL:", urlString.toString());
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(urlString, HTML);
  const { meta, url } = metaTagUrlVàDocument;
  const { loạiNềnTảng, tênNềnTảng, loạiNơiĐăng } = tạoThôngTinNơiĐăngTừURL(url);

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
  urlString: UrlChưaChínhTắc,
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
