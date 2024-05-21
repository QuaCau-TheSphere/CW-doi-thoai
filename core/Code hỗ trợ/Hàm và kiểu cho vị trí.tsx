import { LoạiNơiĐăng, LoạiNềnTảng, NơiĐăngĐãXácĐịnhVịTrí, ThôngTinNơiĐăng, TênNơiĐăng, TênNềnTảng } from "./Kiểu cho nơi đăng.ts";

type VịTríThànhPhần = string;
export type CấuHìnhViếtTắt = Record<string, string>[] | undefined | null;
/** CẤU HÌNH Chung */
/** Tránh dùng khái niệm "vị trí có thể đăng" trong cấu hình chung, vì nó đã được dùng trong NơiĐăngChưaXácĐịnhVịTrí */
export interface CấuHìnhChung {
  "Vị trí đặt liên kết ở nơi đăng": VậtThểCấuHìnhVịTrí[];
  "Vị trí thành phần": Record<string, VịTríThànhPhần[]>;
  "Viết tắt"?: CấuHìnhViếtTắt;
}
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
export function cóThôngTinNơiĐăngTrongVậtThểVịTrí(thôngTinNơiĐăng: ThôngTinNơiĐăng, vậtThểCấuHìnhVịTrí: VậtThểCấuHìnhVịTrí): boolean {
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
export interface NơiĐăngChưaXácĐịnhVịTrí extends ThôngTinNơiĐăng {
  "Vị trí có thể đăng"?: DanhSáchVịTríCóThểĐăng;
  id: string;
}

export function tạoNơiĐăngChưaXácĐịnhVịTrí(
  thôngTinNơiĐăng: ThôngTinNơiĐăng & { id: string },
  cấuHìnhVịTrí: CấuHìnhChung,
): NơiĐăngChưaXácĐịnhVịTrí {
  let danhSáchVịTríCóThểĐăng: DanhSáchVịTríCóThểĐăng = [];
  const {
    "Vị trí đặt liên kết ở nơi đăng": danhSáchVTCHVT,
    "Vị trí thành phần": cấuHìnhVịTríNhỏHơn,
  } = cấuHìnhVịTrí;
  for (const VTCHVT of danhSáchVTCHVT) {
    const danhSáchVịTríThànhPhần = VTCHVT["Danh sách vị trí"];
    if (cóThôngTinNơiĐăngTrongVậtThểVịTrí(thôngTinNơiĐăng, VTCHVT)) {
      danhSáchVịTríCóThểĐăng = tạoDanhSáchVịTríCóThểĐăng(danhSáchVịTríThànhPhần, cấuHìnhVịTríNhỏHơn);
    }
  }

  return { ...thôngTinNơiĐăng, "Vị trí có thể đăng": danhSáchVịTríCóThểĐăng };
}

export function tạoNơiĐăngĐãXácĐịnhVịTrí(vịTríĐượcChọn: VịTrí | string, nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí): NơiĐăngĐãXácĐịnhVịTrí {
  let vịTrí = vịTríĐượcChọn;
  if (typeof vịTríĐượcChọn === "string") {
    try {
      /** Trường hợp lấy từ API hay gì đó */
      vịTrí = JSON.parse(vịTríĐượcChọn) as VịTrí;
    } catch {
      vịTrí = [JSON.parse(JSON.stringify(vịTríĐượcChọn))] as VịTrí;
    }
  } else {
    vịTrí = vịTríĐượcChọn;
  }
  const { "Vị trí có thể đăng": bỏ, ...thôngTinNơiĐăng } = nơiĐăng;

  return { ...thôngTinNơiĐăng, "Vị trí": vịTrí };
}
