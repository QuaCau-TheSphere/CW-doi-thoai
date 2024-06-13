import { CấuHìnhChung, lấyCấuHìnhChung } from "../Hàm và kiểu cho cấu hình.ts";
import {
  LoạiNơiĐăng,
  LoạiNềnTảng,
  ThôngTinNơiĐăng,
  ThôngTinNơiĐăngChưaCóId,
  ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
  TênNềnTảng,
} from "./Kiểu cho nơi đăng.ts";

export type VịTríThànhPhần = string;

/** DanhSáchVịTríThànhPhần là danh sách các vị trí có thể đăng của một **loại nơi đăng**. Nó nằm trong cấu hình chung, không nằm trong một cấu hình nơi đăng cụ thể nào.
 * @example
 * Ví dụ danh sách vị trí thành phần của nhóm Facebook
 * ```json
 * [Bài đăng, About, Câu hỏi xét thành viên, Ảnh bìa, Bài ghim, Album ảnh]
 * ```
 *
 * @see VịTrí cũng có dạng VịTríThànhPhần[] giống như DanhSáchVịTríThànhPhần, nhưng nó dành cho **một nơi đăng cụ thể**
 */
export type DanhSáchVịTríThànhPhần = VịTríThànhPhần[];
/** Hay được viết tắt là VTCHVT */
export type VậtThểCấuHìnhVịTrí = {
  "Loại nền tảng": LoạiNềnTảng;
  "Tên nền tảng": TênNềnTảng;
  "Loại nơi đăng": LoạiNơiĐăng;
  "Danh sách vị trí": DanhSáchVịTríThànhPhần;
};

/** TẠO NƠI ĐĂNG */
/**
 * Thuộc tính "Loại nơi đăng" đều có trong ThôngTinNơiĐăng và VậtThểCấuHìnhVịTrí. Hàm này kiểm tra xem nó có trùng nhau không. Nếu có nghĩa là loại nơi đăng này có được khai báo trong VậtThểCấuHìnhVịTrí
 */
export function cóThôngTinNơiĐăngTrongVậtThểVịTrí(
  thôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
  vậtThểCấuHìnhVịTrí: VậtThểCấuHìnhVịTrí,
): boolean {
  const {
    "Loại nền tảng": loạiNềnTảngND,
    "Tên nền tảng": tênNềnTảngND,
    "Loại nơi đăng": loạiNơiĐăngND,
  } = thôngTinNơiĐăng;
  const {
    "Loại nền tảng": loạiNềnTảngVTCHVT,
    "Tên nền tảng": tênNềnTảngVTCHVT,
    "Loại nơi đăng": loạiNơiĐăngVTCHVT,
  } = vậtThểCấuHìnhVịTrí;

  if (loạiNềnTảngND !== loạiNềnTảngVTCHVT || tênNềnTảngND !== tênNềnTảngVTCHVT) return false;
  /** Cần dùng loạiNơiĐăngND để tạo vòng lặp chứ không phải loạiNơiĐăngVTVT, để tránh trường hợp loạiNơiĐăngVTVT dù thiếu phần tử ở cuối vẫn trả kết quả là true */
  for (const i in loạiNơiĐăngND) {
    if (loạiNơiĐăngVTCHVT[i] !== loạiNơiĐăngND[i]) return false;
  }
  return true;
}

export function tạoDanhSáchVịTríCóThểĐăng(
  danhSáchVịTríThànhPhần: DanhSáchVịTríThànhPhần,
  cấuHìnhVịTríNhỏHơn: CấuHìnhChung["Vị trí thành phần"],
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
 * VịTrí là vị trí đăng cụ thể của **một nơi đăng cụ thể**, bao gồm các vị trí thành phần.
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
 * VịTrí và DanhSáchVịTríThànhPhần tuy có cùng kiểu là VịTríThànhPhần[], nhưng mục đích dùng khác nhau.
 * @see DanhSáchVịTríThànhPhần
 */
export type VịTrí = VịTríThànhPhần[];

/**
 * Danh sách vị trí có thể đăng nằm trong nơi đăng chưa xác định vị trí, không phải VậtThểCấuHìnhVịTrí
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

/** Tên cũ: NơiĐăngChưaXácĐịnhVịTrí */
export interface NơiĐăngCóCácLựaChọnVịTrí extends ThôngTinNơiĐăng {
  "Vị trí có thể đăng": DanhSáchVịTríCóThểĐăng;
}
export interface NơiĐăngCóCácLựaChọnVịTríChưaCóId extends ThôngTinNơiĐăngChưaCóId {
  "Vị trí có thể đăng": DanhSáchVịTríCóThểĐăng;
}
export type NơiĐăngCóCácLựaChọnVịTríChưaCóIdVàPhươngThứcTạo = Omit<NơiĐăngCóCácLựaChọnVịTríChưaCóId, "Phương thức tạo">;
/** Tên cũ: NơiĐăngĐãXácĐịnhVịTrí */
export interface NơiĐăngCóMộtVịTríCụThể extends ThôngTinNơiĐăng {
  "Vị trí": VịTrí;
}

export function tạoNơiĐăngCóCácLựaChọnVịTrí(
  thôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
): NơiĐăngCóCácLựaChọnVịTríChưaCóIdVàPhươngThứcTạo {
  let danhSáchVịTríCóThểĐăng: DanhSáchVịTríCóThểĐăng = [];
  const {
    "Vị trí đặt liên kết ở nơi đăng": danhSáchVậtThểCấuHìnhVịTrí,
    "Vị trí thành phần": cấuHìnhVịTríThànhPhần,
  } = lấyCấuHìnhChung();
  for (const VTCHVT of danhSáchVậtThểCấuHìnhVịTrí) {
    const danhSáchVịTríThànhPhần = VTCHVT["Danh sách vị trí"];
    if (cóThôngTinNơiĐăngTrongVậtThểVịTrí(thôngTinNơiĐăng, VTCHVT)) {
      danhSáchVịTríCóThểĐăng = tạoDanhSáchVịTríCóThểĐăng(danhSáchVịTríThànhPhần, cấuHìnhVịTríThànhPhần);
    }
  }

  return { ...thôngTinNơiĐăng, "Vị trí có thể đăng": danhSáchVịTríCóThểĐăng };
}
