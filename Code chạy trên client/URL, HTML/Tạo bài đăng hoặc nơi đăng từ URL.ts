/**
 * @fileoverview Bài đăng và nơi đăng được tạo ở đây ko có id. Id chỉ thêm vào ngay trước lúc nhập vào KV
 */
import { LoạiNơiĐăng, ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo } from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import { UrlChưaChínhTắc } from "./Hàm và kiểu cho URL và fetch.ts";
import {
  lấyLĩnhVực,
  lấyMetaTagVàTạoDocument,
  lấyMôTả,
  lấyNgàyCậpNhật,
  lấyNgàyTạo,
  lấyTácGiả,
  lấyĐơnVịQuảnLý,
  tạoSlugBàiĐăng,
  tạoTiêuĐềBàiĐăng,
  tạoTênNơiĐăng,
} from "./Hàm và kiểu cho dữ liệu meta.ts";
import { NơiĐăngCóCácLựaChọnVịTríChưaCóIdVàPhươngThứcTạo, tạoNơiĐăngCóCácLựaChọnVịTrí } from "../Hàm và kiểu cho vị trí.ts";
import { BàiĐăngChưaCóIdVàPhươngThứcTạo } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { lấyThôngTinTừUrl } from "./Lấy dữ liệu từ URL/mod.ts";

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
  const thôngTinUrl = lấyThôngTinTừUrl(metaTagUrlVàDocument);
  const { loạiNềnTảng, tênNềnTảng, ...temp } = thôngTinUrl;
  const loạiNơiĐăng = Object.entries(temp)[0][0];

  const thôngTinNơiĐăngChưaCóId: ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo = {
    "Tên nơi đăng": tạoTênNơiĐăng(thôngTinUrl),
    URL: url.href,
    "Mô tả nơi đăng": lấyMôTả(thôngTinUrl),
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": [loạiNơiĐăng] as LoạiNơiĐăng,
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
  const thôngTinUrl = lấyThôngTinTừUrl(metaTagUrlVàDocument);
  return {
    "Tiêu đề": tạoTiêuĐềBàiĐăng(thôngTinUrl),
    URL: url.href,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": lấyMôTả(thôngTinUrl),
    },
    Slug: tạoSlugBàiĐăng(url, thôngTinUrl),
    "Tác giả": lấyTácGiả(meta),
    "Ngày tạo": lấyNgàyTạo(meta),
    "Ngày cập nhật": lấyNgàyCậpNhật(meta),
  };
}
