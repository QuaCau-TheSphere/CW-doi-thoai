import { parse } from "$std/csv/mod.ts";
import { BàiĐăng, TênDựÁn } from "../../Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";

type TậpTinCSV = {
  post_title: string;
  guid: string;
  categories: string;
}[];

export default async function tạoDanhSáchBàiĐăngTrênWordPress(đườngDẫnCSV: string) {
  const tậpTinCSV = parse(await Deno.readTextFile(đườngDẫnCSV), { skipFirstRow: true, strip: true }) as TậpTinCSV;
  const danhSáchBàiĐăng: Omit<BàiĐăng, "id">[] = [];
  for (const dòng of tậpTinCSV) {
    const tiêuĐề = dòng.post_title;
    const url = dòng.guid;
    const tênDựÁn: TênDựÁn = dòng.categories;

    danhSáchBàiĐăng.push({
      "Tiêu đề": tiêuĐề,
      "URL": url,
      "Dự án": {
        "Tên dự án": tênDựÁn,
        "Mã dự án": "", //todo
      },
      Vault: "WordPress",
    });
  }
  return danhSáchBàiĐăng;
}
// console.log("🚀 ~ tạoDanhSáchVậtThểBàiĐăngTrênWordPress(tậpTinCSV) :", tạoDanhSáchVậtThểBàiĐăngTrênWordPress(tậpTinCSV) )
