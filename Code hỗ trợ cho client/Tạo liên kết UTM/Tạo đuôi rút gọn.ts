import { BàiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { ĐuôiRútGọn } from "./Kiểu cho tham số UTM.ts";
import { CấuHìnhViếtTắt } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { tạoSlugNơiĐăng } from "../../Tạo bài đăng và nơi đăng/B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/Tạo slug nơi đăng.ts";
import { MãNơiĐăng, ThôngTinNơiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { kiểuKebab, lấyKýHiệuViếtTắt } from "../Hàm xử lý chuỗi.ts";

function tạoPhầnBàiĐăng(bàiĐăng: BàiĐăng, cấuHìnhViếtTắt: CấuHìnhViếtTắt) {
  const { Vault: vault, "Dự án": dựÁn, id: id } = bàiĐăng;
  let mãDựÁnHoặcVault: string | undefined;
  if (dựÁn) {
    const { "Mã dự án": mãDựÁn, "Tên dự án": tênDựÁn } = dựÁn;
    mãDựÁnHoặcVault = mãDựÁn || lấyKýHiệuViếtTắt(tênDựÁn, cấuHìnhViếtTắt);
  } else if (vault) {
    mãDựÁnHoặcVault = kiểuKebab(vault);
  }
  const mãBàiĐăng = bàiĐăng["Slug"] || id;
  return `${mãDựÁnHoặcVault}:${mãBàiĐăng}`;
}

function tạoPhầnNơiĐăng(nơiĐăng: ThôngTinNơiĐăng, cấuHìnhViếtTắt: CấuHìnhViếtTắt) {
  const {
    "Tên nền tảng": tênNềnTảng,
    id,
  } = nơiĐăng;
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhViếtTắt) || tênNềnTảng;
  const mãNơiĐăng: MãNơiĐăng = tạoSlugNơiĐăng(nơiĐăng) || id;

  return `${kýHiệuNềnTảng}:${mãNơiĐăng}`;
}

/**
 * Đuôi rút gọn theo cấu trúc sau: `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 * @param bàiĐăng Thứ tự tìm: Slug, mã dự án, viết tắt của tên dự án, ngẫu nhiên ký tự
 * @param nơiĐăng
 * @param lầnĐăng
 * @param từĐiểnMãNơiĐăng
 * @param cấuHìnhViếtTắt dùng để tìm chuỗi viết tắt
 * @returns `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 */

export function tạoĐuôiRútGọn(
  bàiĐăng: BàiĐăng,
  nơiĐăng: ThôngTinNơiĐăng,
  lầnĐăng: number,
  cấuHìnhViếtTắt: CấuHìnhViếtTắt,
): ĐuôiRútGọn {
  const phầnChoBàiĐăng = tạoPhầnBàiĐăng(bàiĐăng, cấuHìnhViếtTắt);
  const phầnChoNơiĐăng = tạoPhầnNơiĐăng(nơiĐăng, cấuHìnhViếtTắt);
  return `${phầnChoBàiĐăng}.${phầnChoNơiĐăng}.${lầnĐăng}`;
}
