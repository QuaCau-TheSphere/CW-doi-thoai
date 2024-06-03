//deno-fmt-ignore-file
import { parse, ParsedPath } from "$std/path/mod.ts";

export type ĐườngDẫnTuyệtĐối = string;
export type ĐườngDẫnTươngĐối = string;

export type VậtThểĐườngDẫnTuyệtĐối = Readonly<ParsedPath> & { readonly isAbsolute: true };
export type VậtThểĐườngDẫnTươngĐối = Readonly<ParsedPath> & { readonly isAbsolute: false };

export function đọcĐườngDẫn(path: string): VậtThểĐườngDẫnTuyệtĐối | VậtThểĐườngDẫnTươngĐối {
  const parsed = parse(path);
  return Object.assign(parsed, { isAbsolute: parsed.root.length > 0 });
}

/** Ở trên vault */
export const THƯ_MỤC_DỰ_ÁN: ĐườngDẫnTươngĐối = "📐 Dự án";
export const THƯ_MỤC_THIẾT_LẬP: ĐườngDẫnTươngĐối = "Ξ Thiết lập";
export const TẬP_TIN_THIẾT_LẬP: ĐườngDẫnTươngĐối = "Ξ Thiết lập\\Ξ Thiết lập.md";
export const THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT: ĐườngDẫnTuyệtĐối = "D:\\QC supplements\\Vaults";

/** Trong thư mục dự án */
export const TẬP_TIN_CSV: ĐườngDẫnTươngĐối = "./Tạo bài đăng và nơi đăng/A. Cấu hình/Bài đăng/wpd9_posts.csv";
export const TẬP_TIN_CẤU_HÌNH_CHUNG: ĐườngDẫnTươngĐối = "./Tạo bài đăng và nơi đăng/A. Cấu hình/Nơi đăng/Cấu hình chung.yaml";
export const THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG: ĐườngDẫnTươngĐối = "./Tạo bài đăng và nơi đăng/A. Cấu hình/Nơi đăng";

/** Dữ liệu đã được xử lý trước */
export const TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG: ĐườngDẫnTươngĐối = "./Tạo bài đăng và nơi đăng/A. Cấu hình/Nơi đăng/Danh sách nơi đăng lấy từ cấu hình.json";
export const TẬP_TIN_DANH_SÁCH_BÀI_ĐĂNG: ĐườngDẫnTươngĐối = "./Tạo bài đăng và nơi đăng/A. Cấu hình/Bài đăng/Danh sách bài đăng lấy từ vault và cấu hình.json";


