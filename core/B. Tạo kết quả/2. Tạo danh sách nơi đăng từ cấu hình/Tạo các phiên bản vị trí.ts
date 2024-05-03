import { LoạiNơiĐăng, LoạiNềnTảng, NơiĐăng, TênNềnTảng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";

export interface CấuHìnhThiếtLậpChung {
  "Vị trí": CấuHìnhVịTrí;
  "Vị trí nhỏ hơn"?: Record<string, string[]>;
}
type DanhSáchVịTrí = string[];
type CấuHìnhVịTrí = {
  "Loại nơi đăng": [LoạiNềnTảng, TênNềnTảng, ...LoạiNơiĐăng];
  "Danh sách vị trí": DanhSáchVịTrí;
}[];
export function cóLoạiNơiĐăngTrongCấuHìnhVịTrí(
  nơiĐăng: NơiĐăng,
  loạiNơiĐăngDùngĐểXét: CấuHìnhVịTrí[number]["Loại nơi đăng"],
) {
  const {
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": loạiNơiĐăng,
  } = nơiĐăng;

  const loạiNơiĐăngĐầyĐủ = [loạiNềnTảng, tênNềnTảng, ...loạiNơiĐăng];
  /** Cần dùng loạiNơiĐăngĐầyĐủ để tạo vòng lặp chứ không phải loạiNơiĐăngDùngĐểXét, để tránh trường hợp loạiNơiĐăngDùngĐểXét dù thiếu phần tử ở cuối vẫn trả kết quả là true */
  for (const i in loạiNơiĐăngĐầyĐủ) {
    if (loạiNơiĐăngDùngĐểXét[i] !== loạiNơiĐăngĐầyĐủ[i]) return false;
  }
  return true;
}

export function tạoCácPhiênBảnCủaNơiĐăngTheoVịTrí(
  nơiĐăngĐangXét: NơiĐăng,
  danhSáchVịTrí: DanhSáchVịTrí,
  cấuHìnhVịTríNhỏHơn: CấuHìnhThiếtLậpChung["Vị trí nhỏ hơn"],
) {
  const kếtQuả: NơiĐăng[] = [];
  for (const vịTrí of danhSáchVịTrí) {
    //@ts-ignore: undefined đã được bắt ở dưới
    const danhSáchVịTríNhỏHơn = cấuHìnhVịTríNhỏHơn[vịTrí];
    if (danhSáchVịTríNhỏHơn) {
      for (const vịTríNhỏHơn of danhSáchVịTríNhỏHơn) {
        kếtQuả.push({ ...nơiĐăngĐangXét, "Vị trí": [vịTrí, vịTríNhỏHơn] });
      }
    } else {
      kếtQuả.push({ ...nơiĐăngĐangXét, "Vị trí": [vịTrí] });
    }
  }
  return kếtQuả;
}
export default function tạoCácPhiênBảnVịTrí(danhSáchNơiĐăngTổng: NơiĐăng[], cấuHìnhThiếtLậpChung: CấuHìnhThiếtLậpChung ) {
  const {"Vị trí": cấuHìnhVịTrí, "Vị trí nhỏ hơn": cấuHìnhVịTríNhỏHơn} = cấuHìnhThiếtLậpChung
  const danhSáchNơiĐăngSauXửLý = danhSáchNơiĐăngTổng.map((i) => i);
  for (const nơiĐăng of danhSáchNơiĐăngTổng) {
    for (const vịTrí of cấuHìnhVịTrí) {
      const {
        "Loại nơi đăng": loạiNơiĐăngTrongCấuHìnhVịTrí,
        "Danh sách vị trí": danhSáchVịTrí,
      } = vịTrí;
      if (cóLoạiNơiĐăngTrongCấuHìnhVịTrí(nơiĐăng, loạiNơiĐăngTrongCấuHìnhVịTrí)) {
        const i = danhSáchNơiĐăngSauXửLý.indexOf(nơiĐăng);
        const danhSáchVịTríCủaNơiĐăng = tạoCácPhiênBảnCủaNơiĐăngTheoVịTrí(nơiĐăng, danhSáchVịTrí, cấuHìnhVịTríNhỏHơn);
        danhSáchNơiĐăngSauXửLý.splice(i, 1, ...danhSáchVịTríCủaNơiĐăng);
      }
    }
  }
  return danhSáchNơiĐăngSauXửLý;
}

