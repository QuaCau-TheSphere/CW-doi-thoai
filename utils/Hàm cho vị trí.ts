import {
  LoạiNơiĐăng,
  LoạiNềnTảng,
  TênNềnTảng,
} from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { viếtThường } from "./Hàm cho khung nhập.ts";

export interface CấuHìnhVịTríCTĐ {
  "Danh sách vật thể vị trí": VậtThểVịTríCóThểĐăng[];
  "Vị trí nhỏ hơn": Record<string, string[]>;
}
export type VậtThểVịTríCóThểĐăng = {
  "Loại nền tảng": LoạiNềnTảng;
  "Tên nền tảng": TênNềnTảng;
  "Loại nơi đăng": LoạiNơiĐăng;
  "Danh sách vị trí": DanhSáchVịTríCóThểĐăng;
};

/** Danh sách vị trí có thể đăng của một loại nơi đăng. Nó nằm trong cấu hình vị trí, không nằm trong nơi đăng */
export type DanhSáchVịTríCóThểĐăng = string[];

/** Vị trí mà người dùng chọn để đăng, không phải vị trí có thể đăng. Nó nằm trong nơi đăng, không nằm trong cấu hình vị trí */
export type VịTrí = string[];

/** Tạo chuỗi vị trí thân thiện với người dùng */
export function tạoVịTríString(vịTrí: VịTrí) {
  if (vịTrí[1]) {
    return `${viếtThường(vịTrí[1])} trong ${viếtThường(vịTrí[0])}`;
  } else {
    return vịTrí[0];
  }
}
