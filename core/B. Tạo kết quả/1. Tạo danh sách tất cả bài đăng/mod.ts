import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTrênWordPress from "./b. Lấy từ WordPress.ts";
import { BàiĐăng, ĐườngDẫnTuyệtĐối, ĐườngDẫnTươngĐối } from "../../Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { xácĐịnhId } from "../../Code hỗ trợ/Code hỗ trợ.ts";

/**
 * @param thưMụcChứaTấtCảCácVault Đường dẫn tuyệt đối
 * @param đườngDẫnĐếnTậpTinCsv Đường dẫn tương đối
 */
export async function tạoDanhSáchBàiĐăng(thưMụcChứaTấtCảCácVault: ĐườngDẫnTuyệtĐối, đườngDẫnĐếnTậpTinCsv: ĐườngDẫnTươngĐối): Promise<BàiĐăng[]> {
  const danhSáchBàiĐăng: BàiĐăng[] = [];
  const danhSáchBàiĐăngChưaCóId = [
    ...await tạoDanhSáchBàiĐăngTrênVault(thưMụcChứaTấtCảCácVault),
    ...await tạoDanhSáchBàiĐăngTrênWordPress(đườngDẫnĐếnTậpTinCsv),
  ];
  for (const bàiĐăngChưaCóId of danhSáchBàiĐăngChưaCóId) {
    const id = await xácĐịnhId("bài đăng", bàiĐăngChưaCóId);
    danhSáchBàiĐăng.push({ ...bàiĐăngChưaCóId, id: id });
  }
  return danhSáchBàiĐăng;
}
