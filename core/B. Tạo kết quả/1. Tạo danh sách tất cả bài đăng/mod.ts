import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTrênWordPress from "./b. Lấy từ WordPress.ts";
import { BàiĐăng, ĐườngDẫnTuyệtĐối, ĐườngDẫnTươngĐối } from "../../Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { xácĐịnhId } from "../../Code hỗ trợ/Code hỗ trợ.ts";
import { CấuHìnhWebsite } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { tạoBàiĐăngHoặcNơiĐăngMớiTừURL } from "../../Code hỗ trợ/Tạo bài đăng hoặc nơi đăng từ URL.ts";

async function tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhWebsite: CấuHìnhWebsite | null | undefined): Promise<BàiĐăng[]> {
  if (!cấuHìnhWebsite) return [];
  const danhSáchBàiĐăng: BàiĐăng[] = [];
  for (const website of cấuHìnhWebsite) {
    try {
      const bàiĐăng = (await tạoBàiĐăngHoặcNơiĐăngMớiTừURL(website)).bàiĐăng;

      danhSáchBàiĐăng.push({
        ...bàiĐăng,
        "Dự án": {
          "Tên dự án": undefined,
          "Mã dự án": undefined,
        },
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
  cấuHìnhWebsite: CấuHìnhWebsite | null | undefined = undefined,
): Promise<BàiĐăng[]> {
  const danhSáchBàiĐăng: BàiĐăng[] = [];
  const danhSáchBàiĐăngChưaCóId = [
    ...await tạoDanhSáchBàiĐăngTrênVault(thưMụcChứaTấtCảCácVault),
    ...await tạoDanhSáchBàiĐăngTrênWordPress(đườngDẫnĐếnTậpTinCsv),
    ...await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(cấuHìnhWebsite),
  ];
  for (const bàiĐăngChưaCóId of danhSáchBàiĐăngChưaCóId) {
    const id = await xácĐịnhId("bài đăng", bàiĐăngChưaCóId);
    danhSáchBàiĐăng.push({ ...bàiĐăngChưaCóId, id: id });
  }
  return danhSáchBàiĐăng;
}
