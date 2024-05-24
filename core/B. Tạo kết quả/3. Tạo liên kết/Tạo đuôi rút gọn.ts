import { BàiĐăng } from "../../Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { ĐuôiRútGọn } from "../../Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { lấyKýHiệuViếtTắt, tạoChuỗiNgẫuNhiên } from "../../Code hỗ trợ/Code hỗ trợ.ts";
import { CấuHìnhViếtTắt, NơiĐăngCóMộtVịTríCụThể } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";

/**
 * Đuôi rút gọn theo cấu trúc sau: `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 * @param bàiĐăng Thứ tự tìm: mã bài đăng, mã dự án, viết tắt của tên dự án, ngẫu nhiên ký tự
 * @param nơiĐăng
 * @param lầnĐăng
 * @param cấuHìnhViếtTắt dùng để tìm chuỗi viết tắt
 * @returns `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 */

export function tạoĐuôiRútGọn(
  bàiĐăng: BàiĐăng,
  nơiĐăng: NơiĐăngCóMộtVịTríCụThể,
  lầnĐăng: number,
  cấuHìnhViếtTắt: CấuHìnhViếtTắt,
): ĐuôiRútGọn {
  let phầnChoBàiĐăng: string | undefined;

  const { "Mã bài đăng": mãBàiĐăng, "Dự án": dựÁn, id: idBàiĐăng } = bàiĐăng;
  if (mãBàiĐăng) {
    phầnChoBàiĐăng = mãBàiĐăng;
  } else if (dựÁn) {
    const { "Mã dự án": mãDựÁn, "Tên dự án": tênDựÁn } = dựÁn;
    phầnChoBàiĐăng = mãDựÁn || lấyKýHiệuViếtTắt(tênDựÁn, cấuHìnhViếtTắt);
  }
  if (phầnChoBàiĐăng === undefined) {
    phầnChoBàiĐăng = idBàiĐăng || tạoChuỗiNgẫuNhiên(4);
  }

  const { "Mã nơi đăng": mãNơiĐăng, "Tên nơi đăng": tênNơiĐăng, id: idNơiĐăng } = nơiĐăng;
  const phầnChoNơiĐăng = mãNơiĐăng ||
    lấyKýHiệuViếtTắt(tênNơiĐăng[0], cấuHìnhViếtTắt) ||
    idNơiĐăng ||
    tạoChuỗiNgẫuNhiên(4);

  return `${phầnChoBàiĐăng}.${phầnChoNơiĐăng}.${lầnĐăng}`;
}
