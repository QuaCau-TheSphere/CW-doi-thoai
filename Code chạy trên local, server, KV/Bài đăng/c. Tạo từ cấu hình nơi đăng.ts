import { BàiĐăngChưaCóId } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import CấuHìnhNơiĐăng from "../Hàm và kiểu cho cấu hình.ts";
import { lấyURLTrongJSON } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "../Nơi đăng/Tạo slug.ts";
import {
  lấyMôTả,
  lấyNgàyCậpNhật,
  lấyNgàyTạo,
  lấyTitle,
  lấyTácGiả,
  lấyĐơnVịQuảnLý,
  tạoTiêuĐề,
} from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho dữ liệu meta.ts";
import { TênNơiĐăng } from "../Nơi đăng/Kiểu cho nơi đăng.ts";
import { lấyMetaTagVàTạoDocumentTrênLocal } from "../Hàm cho cache.ts";

export default async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: BàiĐăngChưaCóId[] = [];
  const { Slug: cấuHìnhSlug, ...cấuHìnhĐãBỏSlug } = cấuHìnhNơiĐăng;
  const từĐiểnSlugNơiĐăng = await tạoTừĐiểnSlugNơiĐăng(cấuHìnhSlug);
  const danhSáchUrl = lấyURLTrongJSON(cấuHìnhĐãBỏSlug);
  for (const urlTrongDanhSáchUrl of danhSáchUrl) {
    console.log("🚀:", urlTrongDanhSáchUrl.href);
    const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocumentTrênLocal(urlTrongDanhSáchUrl.href);
    const { meta, url } = metaTagUrlVàDocument;
    const tênNơiĐăng = [lấyTitle(metaTagUrlVàDocument) || ""] as TênNơiĐăng;

    danhSáchBàiĐăng.push({
      "Tiêu đề": tạoTiêuĐề(metaTagUrlVàDocument),
      URL: url,
      Slug: await tạoSlugNơiĐăng(tênNơiĐăng, url, từĐiểnSlugNơiĐăng),
      "Nội dung bài đăng": {
        "Mô tả bài đăng": lấyMôTả(metaTagUrlVàDocument),
      },
      "Tác giả": lấyTácGiả(meta) || lấyĐơnVịQuảnLý(metaTagUrlVàDocument, "Website"),
      "Ngày tạo": lấyNgàyTạo(meta),
      "Ngày cập nhật": lấyNgàyCậpNhật(meta),
      "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
    });
  }
  return danhSáchBàiĐăng;
}
