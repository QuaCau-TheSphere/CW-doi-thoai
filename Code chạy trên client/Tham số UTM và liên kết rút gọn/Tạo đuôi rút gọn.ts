import { BàiĐăng } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { ĐuôiRútGọn } from "./Kiểu cho tham số UTM.ts";
import { CấuHìnhViếtTắt } from "../../Code chạy trên local, server, KV/Hàm và kiểu cho cấu hình.ts";
import { Slug, ThôngTinNơiĐăng } from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import { kiểuKebab, lấyKýHiệuViếtTắt } from "../Chuỗi, slug/Hàm xử lý chuỗi.ts";

function tạoPhầnBàiĐăng(bàiĐăng: BàiĐăng, cấuHìnhViếtTắt: CấuHìnhViếtTắt) {
  const {
    "Kho thông tin": vault,
    "Dự án": dựÁn,
    id,
    Slug: slug,
  } = bàiĐăng;
  let mãDựÁnHoặcVault: string | undefined;
  if (dựÁn) {
    const { "Mã dự án": mãDựÁn, "Tên dự án": tênDựÁn } = dựÁn;
    mãDựÁnHoặcVault = mãDựÁn || lấyKýHiệuViếtTắt(tênDựÁn, cấuHìnhViếtTắt);
  } else if (vault) {
    mãDựÁnHoặcVault = kiểuKebab(vault);
  }
  const slugHoặcId = slug || id;
  return slugHoặcId;
  // return mãDựÁnHoặcVault ? `${mãDựÁnHoặcVault}:${slugHoặcId}` : slugHoặcId;
}

function tạoPhầnNơiĐăng(nơiĐăng: ThôngTinNơiĐăng, cấuHìnhViếtTắt: CấuHìnhViếtTắt) {
  const {
    "Tên nền tảng": tênNềnTảng,
    id,
    Slug: slug,
  } = nơiĐăng;
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhViếtTắt);
  const slugHoặcId = slug || id;
  return slugHoặcId;
  // return kýHiệuNềnTảng ? `${kýHiệuNềnTảng}:${slugHoặcId}` : slugHoặcId;
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
