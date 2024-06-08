import { parse } from "$std/csv/mod.ts";
import { basename } from "$std/path/basename.ts";
import { TẬP_TIN_CSV } from "../../../ĐƯỜNG_DẪN.ts";
import { BàiĐăng, TênDựÁn } from "../../Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";

// "post_title","categories","post_name","post_author","post_excerpt","post_date","post_modified"
type TậpTinCSV = {
  post_title: string;
  categories?: string;
  post_name?: string;
  post_author: string;
  post_excerpt?: string;
  post_date: string;
  post_modified: string;
}[];

export default async function tạoDanhSáchBàiĐăngTừCSV() {
  const tậpTinCSV = parse(await Deno.readTextFile(TẬP_TIN_CSV), { skipFirstRow: true, strip: true }) as TậpTinCSV;
  const danhSáchBàiĐăng: Omit<BàiĐăng, "id">[] = [];
  const tênTậpTin = basename(TẬP_TIN_CSV, ".csv");
  const domain = tênTậpTin;
  for (const dòng of tậpTinCSV) {
    const slug = dòng.post_name;
    const url = `https://${domain}/${slug}`;

    danhSáchBàiĐăng.push({
      "Tiêu đề": dòng.post_title,
      "URL": url,
      "Dự án": {
        "Tên dự án": dòng.categories,
        "Mã dự án": "", //todo
      },
      "Phương thức tạo": "Nhập từ CSV",
      Slug: slug,
      // "Tác giả": dòng.post_author,
      "Ngày tạo": new Date(dòng.post_date),
      "Ngày cập nhật": new Date(dòng.post_modified),
    });
  }
  return danhSáchBàiĐăng;
}
console.log(await tạoDanhSáchBàiĐăngTừCSV());
