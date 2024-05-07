import {
  CấuHìnhVịTríCTĐ,
  DanhSáchVịTríCóThểĐăng,
  VậtThểVịTríCóThểĐăng,
} from "../../../utils/Hàm cho vị trí.ts";
import { NơiĐăng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
/**
 * Thuộc tính "Loại nơi đăng" đều có trong nơi đăng và vật thể vị trí. Hàm này kiểm tra xem nó có trùng nhau không
 */
export function cóLoạiNơiĐăngNDTrongVậtThểVịTrí(
  nơiĐăng: NơiĐăng,
  vậtThểVịTrí: VậtThểVịTríCóThểĐăng,
): boolean {
  const {
    "Loại nền tảng": loạiNềnTảngND,
    "Tên nền tảng": tênNềnTảngND,
    "Loại nơi đăng": loạiNơiĐăngND,
  } = nơiĐăng;
  const {
    "Loại nền tảng": loạiNềnTảngVTVT,
    "Tên nền tảng": tênNềnTảngVTVT,
    "Loại nơi đăng": loạiNơiĐăngVTVT,
  } = vậtThểVịTrí;

  if (loạiNềnTảngND !== loạiNềnTảngVTVT || tênNềnTảngND !== tênNềnTảngVTVT) {
    return false;
  }
  /** Cần dùng loạiNơiĐăngND để tạo vòng lặp chứ không phải loạiNơiĐăngVTVT, để tránh trường hợp loạiNơiĐăngVTVT dù thiếu phần tử ở cuối vẫn trả kết quả là true */
  for (const i in loạiNơiĐăngND) {
    if (loạiNơiĐăngVTVT[i] !== loạiNơiĐăngND[i]) return false;
  }
  return true;
}

export function tạoCácPhiênBảnCủaNơiĐăngTheoVịTrí(
  nơiĐăngĐangXét: NơiĐăng,
  danhSáchVịTríCóThểCó: DanhSáchVịTríCóThểĐăng,
  cấuHìnhVịTríNhỏHơn: CấuHìnhVịTríCTĐ["Vị trí nhỏ hơn"],
) {
  const kếtQuả: NơiĐăng[] = [];
  for (const vịTríCóThểCó of danhSáchVịTríCóThểCó) {
    const danhSáchVịTríNhỏHơn = cấuHìnhVịTríNhỏHơn[vịTríCóThểCó];
    if (danhSáchVịTríNhỏHơn) {
      for (const vịTríNhỏHơn of danhSáchVịTríNhỏHơn) {
        kếtQuả.push({
          ...nơiĐăngĐangXét,
          "Vị trí": [vịTríCóThểCó, vịTríNhỏHơn],
        });
      }
    } else {
      kếtQuả.push({ ...nơiĐăngĐangXét, "Vị trí": [vịTríCóThểCó] });
    }
  }
  return kếtQuả;
}
export default function tạoCácPhiênBảnVịTrí(
  danhSáchNơiĐăngTổng: NơiĐăng[],
  cấuHìnhVịTrí: CấuHìnhVịTríCTĐ,
) {
  const {
    "Danh sách vật thể vị trí": danhSáchVậtThểVịTrí,
    "Vị trí nhỏ hơn": cấuHìnhVịTríNhỏHơn,
  } = cấuHìnhVịTrí;
  const danhSáchNơiĐăngSauXửLý = danhSáchNơiĐăngTổng.map((i) => i);
  for (const nơiĐăng of danhSáchNơiĐăngTổng) {
    for (const vậtThểVịTrí of danhSáchVậtThểVịTrí) {
      const { "Danh sách vị trí": danhSáchVịTríCóThểCó } = vậtThểVịTrí;
      if (cóLoạiNơiĐăngNDTrongVậtThểVịTrí(nơiĐăng, vậtThểVịTrí)) {
        const i = danhSáchNơiĐăngSauXửLý.indexOf(nơiĐăng);
        const danhSáchVịTríCủaNơiĐăng = tạoCácPhiênBảnCủaNơiĐăngTheoVịTrí(
          nơiĐăng,
          danhSáchVịTríCóThểCó,
          cấuHìnhVịTríNhỏHơn,
        );
        danhSáchNơiĐăngSauXửLý.splice(i, 1, ...danhSáchVịTríCủaNơiĐăng);
      }
    }
  }
  return danhSáchNơiĐăngSauXửLý;
}
