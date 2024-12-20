import { BàiĐăngChưaCóId, BàiĐăngChưaCóIdVàPhươngThứcTạo } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import CấuHìnhNơiĐăng, { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "../Hàm và kiểu cho cấu hình.ts";
import { lấyURLTrongJSON } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { lấySlugTrongTừĐiểnSlug, tạoTừĐiểnSlugNơiĐăng } from "../Nơi đăng/Tạo slug.ts";
import { tạoTênNơiĐăng } from "../../Code chạy trên client/URL, HTML/Hàm cho việc tạo bài đăng hoặc nơi đăng từ URL.ts";
import { lấyMetaTagVàTạoDocumentTrênLocal } from "../Hàm cho cache.ts";
import { tạoBàiĐăngTừURL } from "../../Code chạy trên client/URL, HTML/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import { lấyThôngTinTừUrl } from "../../Code chạy trên client/URL, HTML/Lấy thông tin từ URL/mod.ts";

async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: BàiĐăngChưaCóId[] = [];
  const { Slug: cấuHìnhSlug, ...cấuHìnhĐãBỏSlug } = cấuHìnhNơiĐăng;
  const từĐiểnSlugNơiĐăng = await tạoTừĐiểnSlugNơiĐăng(cấuHìnhSlug);
  const danhSáchUrl = lấyURLTrongJSON(cấuHìnhĐãBỏSlug);
  for (const urlTrongDanhSáchUrl of danhSáchUrl) {
    //hotfix
    if (urlTrongDanhSáchUrl.href === "https://doi-thoai.deno.dev/blog") {
      danhSáchBàiĐăng.push({
        "Tiêu đề": "Giới thiệu đối ⊷ thoại",
        "Phương thức tạo": "Hotfix",
        URL: "https://doi-thoai.deno.dev/blog",
        Slug: "webđốithoạiblog",
        "Dự án": {
          "Tên dự án": "đối ⊷ thoại",
        },
        "Tác giả": "Lý Minh Nhật",
      });
      continue;
    }
    if (urlTrongDanhSáchUrl.href === "https://doi-thoai.deno.dev/blog/ChiaSẻKhoThôngTin") {
      danhSáchBàiĐăng.push({
        "Tiêu đề": "Chia sẻ kho kiến thức, tài nguyên đến với mọi người",
        "Phương thức tạo": "Hotfix",
        URL: "https://doi-thoai.deno.dev/blog/ChiaSẻKhoThôngTin",
        Slug: "ChiaSẻKhoThôngTin",
        "Dự án": {
          "Tên dự án": "đối ⊷ thoại",
        },
        "Tác giả": "Lý Minh Nhật",
      });
      continue;
    }
    if (urlTrongDanhSáchUrl.href === "https://doi-thoai.deno.dev/blog/ChiaSẻKhoThôngTin") {
      danhSáchBàiĐăng.push({
        "Tiêu đề": "Chia sẻ kho kiến thức, tài nguyên đến với mọi người",
        "Phương thức tạo": "Hotfix",
        URL: "https://doi-thoai.deno.dev/blog/ChiaSẻKhoThôngTin",
        Slug: "ChiaSẻKhoThôngTin",
        "Dự án": {
          "Tên dự án": "đối ⊷ thoại",
        },
        "Tác giả": "Lý Minh Nhật",
      });
      continue;
    }
    if (urlTrongDanhSáchUrl.href === "https://doi-thoai.deno.dev/blog/NhiềuNềnTảng") {
      danhSáchBàiĐăng.push({
        "Tiêu đề": "Hiện diện trên nhiều nền tảng",
        "Phương thức tạo": "Hotfix",
        URL: "https://doi-thoai.deno.dev/blog/NhiềuNềnTảng",
        Slug: "NhiềuNềnTảng",
        "Dự án": {
          "Tên dự án": "đối ⊷ thoại",
        },
        "Tác giả": "Lý Minh Nhật",
      });
      continue;
    }
    const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocumentTrênLocal(urlTrongDanhSáchUrl.href);
    const { url, html } = metaTagUrlVàDocument;
    const bàiĐăng = await tạoBàiĐăngTừURL(url, html);
    const thôngTinUrl = lấyThôngTinTừUrl(metaTagUrlVàDocument);
    const tênNơiĐăng = tạoTênNơiĐăng(thôngTinUrl);
    const slug = lấySlugTrongTừĐiểnSlug(tênNơiĐăng, url, từĐiểnSlugNơiĐăng);

    danhSáchBàiĐăng.push({
      ...bàiĐăng,
      Slug: slug,
      "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
    });
  }
  return danhSáchBàiĐăng;
}

export default async function tạoDanhSáchBàiĐăngTừTấtCảCấuHìnhNơiĐăng(): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng = [];
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình === "test") continue;
    // if (thôngTinCấuHình.tênCấuHình !== "test") continue;
    danhSáchBàiĐăng.push(...await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(thôngTinCấuHình.cấuHình));
  }
  return danhSáchBàiĐăng;
}

// const newLocal = await tạoDanhSáchBàiĐăngTừTấtCảCấuHìnhNơiĐăng();
// console.log(newLocal);
// debugger;
