import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTừCSV from "./b. Tạo từ CSV.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "../../Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import * as linkify from "npm:linkifyjs";
import CấuHìnhNơiĐăng, { ThôngTinCấuHìnhNơiĐăng } from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import {
  lấyNgàyCậpNhật,
  lấyNgàyTạo,
  lấyTácGiả,
  lấyĐơnVịQuảnLý,
  tạoNơiĐăngTừURL,
} from "../../../Code hỗ trợ cho client/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import { đổiTừCơSố10SangCơSố64 } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm xử lý chuỗi.ts";
import { tạoTênNơiĐăngString } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm xử lý chuỗi.ts";
import { lấyHTML, lấyMetaTagVàTạoDocument, lấyMôTả, lấyURLTrongJSON } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm và kiểu cho URL.ts";
import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Tạo slug.ts";

async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: BàiĐăngChưaCóId[] = [];
  const { Slug: cấuHìnhSlug, ...cấuHìnhĐãBỏSlug } = cấuHìnhNơiĐăng;
  const từĐiểnSlugNơiĐăng = await tạoTừĐiểnSlugNơiĐăng(cấuHìnhSlug);
  const urls = lấyURLTrongJSON(cấuHìnhĐãBỏSlug);
  for (const url of urls) {
    const html = await lấyHTML(url.href);
    const thôngTinNơiĐăng = await tạoNơiĐăngTừURL(url.href, undefined, html);
    const slug = tạoSlugNơiĐăng(thôngTinNơiĐăng, từĐiểnSlugNơiĐăng);
    const { "Tên nơi đăng": tênNơiĐăng, URL: urlNơiĐăng } = thôngTinNơiĐăng;
    const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(url.href);
    const meta = metaTagUrlVàDocument.meta;

    danhSáchBàiĐăng.push({
      "Tiêu đề": tạoTênNơiĐăngString(tênNơiĐăng),
      URL: urlNơiĐăng || url.href,
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

export async function tạoDanhSáchBàiĐăng(danhSáchVậtThểCấuHìnhNơiĐăng: ThôngTinCấuHìnhNơiĐăng[]): Promise<BàiĐăng[]> {
  const danhSáchBàiĐăngĐãCóId: BàiĐăng[] = [];
  const danhSáchBàiĐăngChưaCóId = [
    ...await tạoDanhSáchBàiĐăngTrênVault(),
    ...await tạoDanhSáchBàiĐăngTừCSV(),
  ];
  for (const vậtThểCấuHình of danhSáchVậtThểCấuHìnhNơiĐăng) {
    danhSáchBàiĐăngChưaCóId.push(...await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(vậtThểCấuHình.cấuHình));
  }
  let sốBàiĐăngChưaCóId = 0;
  for (const bàiĐăngChưaCóId of danhSáchBàiĐăngChưaCóId) {
    // let id: string;
    // const vậtThểId = await xácĐịnhIdTrênLocal("bài đăng", bàiĐăngChưaCóId);
    // if (vậtThểId.cáchXácĐịnh !== 3) {
    //   id = vậtThểId.idGợiÝ;
    // } else {
    //   sốBàiĐăngChưaCóId += 1;
    //   id = đổiTừCơSố10SangCơSố64(sốBàiĐăngChưaCóId);
    // }
    danhSáchBàiĐăngĐãCóId.push({
      ...bàiĐăngChưaCóId,
      id: đổiTừCơSố10SangCơSố64(sốBàiĐăngChưaCóId),
      // id: id,
      // vậtThểId: vậtThểId,
    });
    sốBàiĐăngChưaCóId += 1;
  }
  console.log(sốBàiĐăngChưaCóId);
  return danhSáchBàiĐăngĐãCóId;
}
