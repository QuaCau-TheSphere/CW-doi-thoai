import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTừCSV from "./b. Tạo từ CSV.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "../../Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import * as linkify from "npm:linkifyjs";
import CấuHìnhNơiĐăng, { ThôngTinCấuHìnhNơiĐăng } from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { tạoBàiĐăngTừURL } from "../../../Code hỗ trợ cho client/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import { đổiTừCơSố10SangCơSố64 } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm xử lý chuỗi.ts";

async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: BàiĐăngChưaCóId[] = [];
  const { Slug: _, ...cấuHìnhĐãBỏSlug } = cấuHìnhNơiĐăng;
  const urls = linkify.find(JSON.stringify(cấuHìnhĐãBỏSlug, null, 2));
  for (const url of urls) {
    if (url.type !== "url") continue;
    try {
      danhSáchBàiĐăng.push({
        ...await tạoBàiĐăngTừURL(url.href),
        "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
        // "Dự án": {
        //   "Tên dự án": undefined,
        //   "Mã dự án": undefined,
        // },
      });
    } catch (error) {
      console.error(error);
    }
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
