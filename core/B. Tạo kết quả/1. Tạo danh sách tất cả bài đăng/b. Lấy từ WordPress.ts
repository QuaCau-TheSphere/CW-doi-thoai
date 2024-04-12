import { parse } from "$std/csv/mod.ts";
import {
  BàiĐăng,
  TênDựÁn,
} from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";

type TậpTinCSV = {
  post_title: string;
  guid: string;
  categories: string;
}[];

export default async function tạoDanhSáchBàiĐăngTrênWordPress(
  đườngDẫnCSV: string,
) {
  const tậpTinCSV = parse(await Deno.readTextFile(đườngDẫnCSV), {
    skipFirstRow: true,
    strip: true,
  }) as TậpTinCSV;
  const danhSáchBàiĐăng: BàiĐăng[] = [];
  for (const dòng of tậpTinCSV) {
    const tiêuĐề = dòng.post_title;
    const url = dòng.guid;
    const tênDựÁn: TênDựÁn = dòng.categories;

    danhSáchBàiĐăng.push({
      "Tiêu đề": tiêuĐề,
      URL: url,
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
