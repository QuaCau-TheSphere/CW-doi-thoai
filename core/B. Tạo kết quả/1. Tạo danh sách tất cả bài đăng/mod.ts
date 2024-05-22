import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTrênWordPress from "./b. Lấy từ WordPress.ts";
import { BàiĐăng, ĐườngDẫnTuyệtĐối, ĐườngDẫnTươngĐối } from "../../Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { xácĐịnhId } from "../../Code hỗ trợ/Code hỗ trợ.ts";
import { VậtThểCấuHìnhNơiĐăng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { tạoBàiĐăngHoặcNơiĐăngMớiTừURL } from "../../Code hỗ trợ/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import * as linkify from "npm:linkifyjs";

async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(vậtThểCấuHình: VậtThểCấuHìnhNơiĐăng): Promise<BàiĐăng[]> {
  const danhSáchBàiĐăng: BàiĐăng[] = [];
  const urls = linkify.find(JSON.stringify(vậtThểCấuHình, null, 2));
  for (const url of urls) {
    if (url.type !== "url") continue;
    try {
      const bàiĐăng = (await tạoBàiĐăngHoặcNơiĐăngMớiTừURL(url.href)).bàiĐăng;

      danhSáchBàiĐăng.push({
        ...bàiĐăng,
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

/**
 * @param thưMụcChứaTấtCảCácVault Đường dẫn tuyệt đối
 * @param đườngDẫnĐếnTậpTinCsv Đường dẫn tương đối
 */
export async function tạoDanhSáchBàiĐăng(
  thưMụcChứaTấtCảCácVault: ĐườngDẫnTuyệtĐối,
  đườngDẫnĐếnTậpTinCsv: ĐườngDẫnTươngĐối,
  danhSáchVậtThểCấuHìnhNơiĐăng: VậtThểCấuHìnhNơiĐăng[],
): Promise<BàiĐăng[]> {
  const danhSáchBàiĐăngĐãCóId: BàiĐăng[] = [];
  const danhSáchBàiĐăngChưaCóId = [
    ...await tạoDanhSáchBàiĐăngTrênVault(thưMụcChứaTấtCảCácVault),
    ...await tạoDanhSáchBàiĐăngTrênWordPress(đườngDẫnĐếnTậpTinCsv),
  ];
  for (const vậtThểCấuHình of danhSáchVậtThểCấuHìnhNơiĐăng) {
    danhSáchBàiĐăngChưaCóId.push(...await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(vậtThểCấuHình));
  }
  for (const bàiĐăngChưaCóId of danhSáchBàiĐăngChưaCóId) {
    const id = await xácĐịnhId("bài đăng", bàiĐăngChưaCóId);
    danhSáchBàiĐăngĐãCóId.push({ ...bàiĐăngChưaCóId, id: id });
  }
  return danhSáchBàiĐăngĐãCóId;
}
