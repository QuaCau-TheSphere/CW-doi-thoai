import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTrênWordPress from "./b. Lấy từ WordPress.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "../../Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { kiểmTraIdĐangCó, đổiTừCơSố10SangCơSố64 } from "../../Code hỗ trợ cho server/Code hỗ trợ.ts";
import * as linkify from "npm:linkifyjs";
import { ThôngTinCấuHìnhNơiĐăng } from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { tạoBàiĐăngTừURL } from "../../../Code hỗ trợ cho client/Tạo bài đăng hoặc nơi đăng từ URL.ts";

async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(vậtThểCấuHình: ThôngTinCấuHìnhNơiĐăng): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: BàiĐăngChưaCóId[] = [];
  const urls = linkify.find(JSON.stringify(vậtThểCấuHình, null, 2));
  for (const url of urls) {
    if (url.type !== "url") continue;
    try {
      danhSáchBàiĐăng.push({
        ...await tạoBàiĐăngTừURL(url.href),
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
    ...await tạoDanhSáchBàiĐăngTrênWordPress(),
  ];
  for (const vậtThểCấuHình of danhSáchVậtThểCấuHìnhNơiĐăng) {
    danhSáchBàiĐăngChưaCóId.push(...await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(vậtThểCấuHình));
  }
  let sốBàiĐăngChưaCóId = 0;
  for (const bàiĐăngChưaCóId of danhSáchBàiĐăngChưaCóId) {
    let id: string;
    const idHiệnTại = await kiểmTraIdĐangCó("bài đăng", bàiĐăngChưaCóId);
    if (idHiệnTại) {
      id = idHiệnTại;
    } else {
      sốBàiĐăngChưaCóId += 1;
      id = đổiTừCơSố10SangCơSố64(sốBàiĐăngChưaCóId);
    }
    danhSáchBàiĐăngĐãCóId.push({ ...bàiĐăngChưaCóId, id: id });
  }
  console.log(sốBàiĐăngChưaCóId);
  return danhSáchBàiĐăngĐãCóId;
}
