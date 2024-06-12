import { UrlChưaChínhTắc } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL.ts";
import { ĐườngDẫnTuyệtĐối } from "../ĐƯỜNG_DẪN.ts";

/** Vault */
export type TênVault = string;
export type MãVault = string;
export interface Vault {
  "Tên vault": TênVault;
  "Mã vault": MãVault;
  URL: UrlChưaChínhTắc;
  "Nơi lưu vault": ĐườngDẫnTuyệtĐối;
  "Mô tả vault"?: string;
}

/** Dự án */
export type TênDựÁn = string | undefined;
export type MãDựÁn = string | undefined;
export interface DựÁn {
  "Tên dự án"?: TênDựÁn;
  "Mã dự án"?: MãDựÁn;
}

/** Bài đăng */
export interface YAMLCủaGhiChú {
  title?: string;
  description?: string;
  alias?: string | string[];
  created?: string;
  updated?: string;
  share?: boolean;
  slug?: string;
}
export interface NộiDungBàiĐăng {
  "Mô tả bài đăng"?: string | null;
  "Toàn bộ nội dung"?: string;
  "Định dạng nội dung"?: "md" | "html";
}
export type BàiĐăngChưaCóId = Omit<BàiĐăng, "id">;
export type BàiĐăngChưaCóIdVàPhươngThứcTạo = Omit<BàiĐăng, "id" | "Phương thức tạo">;
export type PhươngThứcTạoBàiĐăng = "Cào vault" | "Cào web" | "Nhập từ CSV" | "Lấy trong cấu hình nơi đăng" | "Nhập tay trên web";

export interface BàiĐăng {
  "Tiêu đề": string;
  URL: UrlChưaChínhTắc;
  "Dự án"?: DựÁn;
  "Kho thông tin"?: string;
  "Slug"?: string;
  "Nội dung bài đăng"?: NộiDungBàiĐăng;
  "Tác giả"?: string;
  "Ngày tạo"?: Date;
  "Ngày cập nhật"?: Date;
  id: string;
  "Phương thức tạo": PhươngThứcTạoBàiĐăng;
}

/**
 * Mô tả vấn đề: có nhiều loại thông tin không phải lúc nào cũng được ghi, và không phải cứ thay đổi là khác nhau. VD: cùng một bài đăng, nhưng URL có thể đã thay đổi khi đổi đường dẫn, tiêu đề có thể đã được viết lại, nội dung có thể đã được cập nhật, vault và dự án có thể đã được cấu trúc lại. Tất cả mọi thứ đều có thể đã khác, nhưng ta vẫn xem chúng là giống nhau. Đây là nghịch lý con tàu Theseus điển hình.
 *
 * Hàm này sẽ xác định sự giống nhau dựa vào các tiêu chí chính và các tiêu chí phụ.
 *
 * Các tiêu chí chính: tiêu đề, URL, mô tả bài đăng, và toàn bộ nội dung bài đăng. Đây là các thành phần bắt buộc phải có khi viết bài. Chỉ cần trùng một trong 4 tiêu chí này thì mặc định là bài đăng giống nhau. Nhưng nếu không trùng hết tất cả thì cũng chưa chắc là khác nhau.
 *
 * Nếu khác định dạng bài đăng (VD một cái là markdown, một cái là HTML) thì mặc định là bài đăng khác nhau.
 *
 * Nếu các tiêu chí chính đều khác nhau và cùng định dạng bài đăng thì bắt đầu xét tới các tiêu chí phụ: Vault, id, Slug, tên dự án, mã dự án. Chúng là những thông tin thường hay bị bỏ qua khi viết. Tuy nhiên, chúng lại có đặc điểm là ít bị thay đổi hơn là các tiêu chí chính. Nếu có quá nửa số tiêu chí phụ khác nhau thì xét là bài đăng khác nhau. Còn không thì xét là giống nhau.
 *
 * Nên xét thế nào về id? Liệu có nên xác định là giống nhau nếu cùng id, khác nhau nếu khác id? Vì id cũng có thể thay đổi như tiêu đề?
 */
export function làCùngBàiĐăng(bàiĐăng1: BàiĐăng, bàiĐăng2: BàiĐăng): boolean {
  if (!bàiĐăng1 || !bàiĐăng2) return false;
  const {
    "Tiêu đề": tiêuĐề1,
    "Nội dung bài đăng": nộiDungBàiĐăng1,
    URL: url1,
    "Dự án": dựÁn1,
  } = bàiĐăng1;
  const {
    "Tiêu đề": tiêuĐề2,
    "Nội dung bài đăng": nộiDungBàiĐăng2,
    URL: url2,
    "Dự án": dựÁn2,
  } = bàiĐăng2;
  if (tiêuĐề1 === tiêuĐề2 || url1.toString() === url2.toString()) return true;

  if (nộiDungBàiĐăng1 && nộiDungBàiĐăng2) {
    const {
      "Mô tả bài đăng": môTảBàiĐăng1,
      "Toàn bộ nội dung": toànBộNộiDung1,
      "Định dạng nội dung": địnhDạngNộiDung1,
    } = nộiDungBàiĐăng1;
    const {
      "Mô tả bài đăng": môTảBàiĐăng2,
      "Toàn bộ nội dung": toànBộNộiDung2,
      "Định dạng nội dung": địnhDạngNộiDung2,
    } = nộiDungBàiĐăng2;
    if (môTảBàiĐăng1 === môTảBàiĐăng2 || toànBộNộiDung1 === toànBộNộiDung2) return true;
    if (địnhDạngNộiDung1 !== địnhDạngNộiDung2) return false;
  }

  let sốTiêuChíPhụKhácNhau = 0;
  const tiêuChíPhụ = ["Kho thông tin", "id", "Slug"] as const;
  for (const key of tiêuChíPhụ) {
    if (bàiĐăng1[key] !== bàiĐăng2[key]) sốTiêuChíPhụKhácNhau += 1;
  }
  if (dựÁn1 && dựÁn2) {
    const tiêuChíPhụ2 = ["Tên dự án", "Mã dự án"] as const;
    for (const key of tiêuChíPhụ2) {
      if (dựÁn1[key] !== dựÁn2[key]) sốTiêuChíPhụKhácNhau += 1;
    }
    if (sốTiêuChíPhụKhácNhau > 5 / 2) return false;
  } else if (!dựÁn1 && !dựÁn2) {
    if (sốTiêuChíPhụKhácNhau > 3 / 2) return false;
  }
  return true;
}
