import {
  LoạiNơiĐăng,
  LoạiNềnTảng,
  NơiĐăng,
  TênNềnTảng,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";

export interface CấuHìnhThiếtLậpChung {
  "Vị trí": VậtThểVịTrí[];
  "Vị trí nhỏ hơn"?: Record<string, string[]>;
}
type DanhSáchVịTrí = string[];
export type VậtThểVịTrí = {
  "Loại nền tảng": LoạiNềnTảng;
  "Tên nền tảng": TênNềnTảng;
  "Loại nơi đăng": LoạiNơiĐăng;
  "Danh sách vị trí": DanhSáchVịTrí;
};
/**
 * Thuộc tính "Loại nơi đăng" đều có trong nơi đăng và vật thể vị trí. Hàm này kiểm tra xem nó có trùng nhau không
 */
export function cóLoạiNơiĐăngNDTrongVậtThểVịTrí(
  nơiĐăng: NơiĐăng,
  vậtThểVịTrí: VậtThểVịTrí,
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
export default function tạoCácPhiênBảnVịTrí(
  danhSáchNơiĐăngTổng: NơiĐăng[],
  cấuHìnhThiếtLậpChung: CấuHìnhThiếtLậpChung,
) {
  const { "Vị trí": cấuHìnhVịTrí, "Vị trí nhỏ hơn": cấuHìnhVịTríNhỏHơn } =
    cấuHìnhThiếtLậpChung;
  const danhSáchNơiĐăngSauXửLý = danhSáchNơiĐăngTổng.map((i) => i);
  for (const nơiĐăng of danhSáchNơiĐăngTổng) {
    for (const vịTrí of cấuHìnhVịTrí) {
      const { "Danh sách vị trí": danhSáchVịTrí } = vịTrí;
      if (cóLoạiNơiĐăngNDTrongVậtThểVịTrí(nơiĐăng, vịTrí)) {
        const i = danhSáchNơiĐăngSauXửLý.indexOf(nơiĐăng);
        const danhSáchVịTríCủaNơiĐăng = tạoCácPhiênBảnCủaNơiĐăngTheoVịTrí(
          nơiĐăng,
          danhSáchVịTrí,
          cấuHìnhVịTríNhỏHơn,
        );
        danhSáchNơiĐăngSauXửLý.splice(i, 1, ...danhSáchVịTríCủaNơiĐăng);
      }
    }
  }
  return danhSáchNơiĐăngSauXửLý;
}
