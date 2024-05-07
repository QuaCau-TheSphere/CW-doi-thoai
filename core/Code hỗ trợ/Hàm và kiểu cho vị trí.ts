import {
  LoạiNơiĐăng,
  LoạiNềnTảng,
  ThôngTinNơiĐăng,
  TênNơiĐăng,
  TênNềnTảng,
} from "./Kiểu cho nơi đăng.ts";

type VịTríThànhPhần = string;

/** CẤU HÌNH VỊ TRÍ */
/** Tránh dùng khái niệm "vị trí có thể đăng" trong cấu hình vị trí, vì nó đã được dùng trong NơiĐăngChưaXácĐịnhVịTrí */
export interface CấuHìnhVịTrí {
  "Danh sách vật thể vị trí": VậtThểVịTríTrongCấuHìnhVịTrí[];
  "Vị trí nhỏ hơn": Record<string, VịTríThànhPhần[]>;
}
/** Danh sách vị trí có thể đăng của một loại nơi đăng. Nó nằm trong cấu hình vị trí, không nằm trong nơi đăng
 * @example
 * Ví dụ danh sách vị trí thành phần của nhóm Facebook
 * ```json
 * [Bài đăng, About, Câu hỏi xét thành viên, Ảnh bìa, Bài ghim, Album ảnh]
 * ```
 */
export type DanhSáchVịTríThànhPhần = VịTríThànhPhần[];
export type VậtThểVịTríTrongCấuHìnhVịTrí = {
  "Loại nền tảng": LoạiNềnTảng;
  "Tên nền tảng": TênNềnTảng;
  "Loại nơi đăng": LoạiNơiĐăng;
  "Danh sách vị trí": DanhSáchVịTríThànhPhần;
};

/** TẠO NƠI ĐĂNG */
/**
 * Thuộc tính "Loại nơi đăng" đều có trong nơi đăng và vật thể vị trí. Hàm này kiểm tra xem nó có trùng nhau không
 */
export function vậtThểVịTríCóThôngTinNơiĐăng(
  thôngTinNơiĐăng: ThôngTinNơiĐăng,
  vậtThểVịTrí: VậtThểVịTríTrongCấuHìnhVịTrí,
): boolean {
  const {
    "Loại nền tảng": loạiNềnTảngND,
    "Tên nền tảng": tênNềnTảngND,
    "Loại nơi đăng": loạiNơiĐăngND,
  } = thôngTinNơiĐăng;
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

export function tạoDanhSáchVịTríCóThểĐăng(
  danhSáchVịTríThànhPhần: DanhSáchVịTríThànhPhần,
  cấuHìnhVịTríNhỏHơn: CấuHìnhVịTrí["Vị trí nhỏ hơn"],
): DanhSáchVịTríCóThểĐăng {
  const danhSáchVịTríCóThểĐăng: DanhSáchVịTríCóThểĐăng = [];
  for (const vịTríThànhPhần of danhSáchVịTríThànhPhần) {
    const danhSáchVịTríNhỏHơn = cấuHìnhVịTríNhỏHơn[vịTríThànhPhần];
    if (danhSáchVịTríNhỏHơn) {
      for (const vịTríNhỏHơn of danhSáchVịTríNhỏHơn) {
        danhSáchVịTríCóThểĐăng.push([vịTríThànhPhần, vịTríNhỏHơn]);
      }
    } else {
      danhSáchVịTríCóThểĐăng.push([vịTríThànhPhần]);
    }
  }
  return danhSáchVịTríCóThểĐăng;
}

/** VỊ TRÍ TRONG NƠI ĐĂNG*/
/**
 * Vị trí hoàn chỉnh, bao gồm các vị trí thành phần
 *
 * @example
 * Ví dụ một vị trí của nhóm Facebook:
 * ```json
 * ["Bài đăng", "Nội dung chính"]
 * ```
 * hoặc
 * ```json
 * ["Bài đăng", "Bình luận"]
 * ```
 *
 * Vị trí và danh sách vị trí thành phần tuy có cùng kiểu là VịTríThànhPhần[], nhưng mục đích dùng khác nhau
 */
export type VịTrí = VịTríThànhPhần[];

/**
 * Danh sách vị trí có thể đăng nằm trong nơi đăng chưa xác định vị trí, không phải cấu hình vị trí
 *
 * @example
 * Ví dụ danh sách vị trí có thể đăng của nhóm Facebook:
 * ```json
 * [
 *   ["Bài đăng", "Nội dung chính"],
 *   ["Bài đăng", "Bình luận"],
 *   ["About"],
 *   ["Câu hỏi xét thành viên"]
 * ]
 * ```
 */
export type DanhSáchVịTríCóThểĐăng = VịTrí[];
export interface NơiĐăngChưaXácĐịnhVịTrí extends ThôngTinNơiĐăng {
  "Vị trí có thể đăng": DanhSáchVịTríCóThểĐăng;
}

export function tạoNơiĐăngChưaXácĐịnhVịTrí(
  thôngTinNơiĐăng: ThôngTinNơiĐăng,
  cấuHìnhVịTrí: CấuHìnhVịTrí,
): NơiĐăngChưaXácĐịnhVịTrí {
  let danhSáchVịTríCóThểĐăng: DanhSáchVịTríCóThểĐăng = [];
  const {
    "Danh sách vật thể vị trí": danhSáchVậtThểVịTrí,
    "Vị trí nhỏ hơn": cấuHìnhVịTríNhỏHơn,
  } = cấuHìnhVịTrí;
  for (const vậtThểVịTrí of danhSáchVậtThểVịTrí) {
    const danhSáchVịTríThànhPhần = vậtThểVịTrí["Danh sách vị trí"];
    if (vậtThểVịTríCóThôngTinNơiĐăng(thôngTinNơiĐăng, vậtThểVịTrí)) {
      danhSáchVịTríCóThểĐăng = tạoDanhSáchVịTríCóThểĐăng(
        danhSáchVịTríThànhPhần,
        cấuHìnhVịTríNhỏHơn,
      );
    }
  }

  return { ...thôngTinNơiĐăng, "Vị trí có thể đăng": danhSáchVịTríCóThểĐăng };
}
