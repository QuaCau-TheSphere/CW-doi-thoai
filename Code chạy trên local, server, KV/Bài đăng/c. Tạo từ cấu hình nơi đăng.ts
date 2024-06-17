import { BàiĐăngChưaCóId } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import CấuHìnhNơiĐăng from "../Hàm và kiểu cho cấu hình.ts";
import { lấyURLTrongJSON } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "../Nơi đăng/Tạo slug.ts";
import { tạoTênNơiĐăng } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho dữ liệu meta.ts";
import { lấyMetaTagVàTạoDocumentTrênLocal } from "../Hàm cho cache.ts";
import { tạoBàiĐăngTừURL } from "../../Code chạy trên client/URL, HTML/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import { lấyThôngTinTừUrl } from "../../Code chạy trên client/URL, HTML/Lấy dữ liệu từ URL/mod.ts";

export default async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: BàiĐăngChưaCóId[] = [];
  const { Slug: cấuHìnhSlug, ...cấuHìnhĐãBỏSlug } = cấuHìnhNơiĐăng;
  const từĐiểnSlugNơiĐăng = await tạoTừĐiểnSlugNơiĐăng(cấuHìnhSlug);
  const danhSáchUrl = lấyURLTrongJSON(cấuHìnhĐãBỏSlug);
  for (const urlTrongDanhSáchUrl of danhSáchUrl) {
    const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocumentTrênLocal(urlTrongDanhSáchUrl.href);
    const { url, html } = metaTagUrlVàDocument;
    const bàiĐăng = await tạoBàiĐăngTừURL(url, html);
    const thôngTinUrl = lấyThôngTinTừUrl(metaTagUrlVàDocument);
    const tênNơiĐăng = tạoTênNơiĐăng(thôngTinUrl);
    const slug = tạoSlugNơiĐăng(tênNơiĐăng, url, từĐiểnSlugNơiĐăng);

    danhSáchBàiĐăng.push({
      ...bàiĐăng,
      Slug: slug,
      "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
    });
  }
  return danhSáchBàiĐăng;
}
