import { BàiĐăngChưaCóId } from "../../Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import CấuHìnhNơiĐăng from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import {
  lấyNgàyCậpNhật,
  lấyNgàyTạo,
  lấyTácGiả,
  lấyĐơnVịQuảnLý,
  tạoNơiĐăngTừURL,
  tạoTiêuĐề,
} from "../../../Code hỗ trợ cho client/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import { lấyHTML, lấyMetaTagVàTạoDocument, lấyMôTả, lấyURLTrongJSON } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm và kiểu cho URL.ts";
import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Tạo slug.ts";

export async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: BàiĐăngChưaCóId[] = [];
  const { Slug: cấuHìnhSlug, ...cấuHìnhĐãBỏSlug } = cấuHìnhNơiĐăng;
  const từĐiểnSlugNơiĐăng = await tạoTừĐiểnSlugNơiĐăng(cấuHìnhSlug);
  const urls = lấyURLTrongJSON(cấuHìnhĐãBỏSlug);
  for (const url of urls) {
    const html = await lấyHTML(url.href);
    const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(url.href, html);
    const { meta, url: URL } = metaTagUrlVàDocument;
    const thôngTinNơiĐăng = await tạoNơiĐăngTừURL(URL.href, undefined, html);
    const slug = tạoSlugNơiĐăng(thôngTinNơiĐăng, từĐiểnSlugNơiĐăng);

    danhSáchBàiĐăng.push({
      "Tiêu đề": await tạoTiêuĐề(url.href, html),
      URL: thôngTinNơiĐăng.URL || URL.href,
      Slug: slug,
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
