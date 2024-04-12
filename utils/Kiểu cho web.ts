import { StateUpdater } from "preact/hooks";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăng,
} from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../core/Code hỗ trợ/Kiểu cho tham số UTM.ts";

export type BốiCảnh = string | undefined;
export interface MainProps {
  danhSáchNơiĐăng: NơiĐăng[];
  danhSáchBàiĐăng: BàiĐăng[];
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng;
}

export type KếtQuả = {
  bàiĐăng: BàiĐăng | undefined;
  nơiĐăng: NơiĐăng | undefined;
} | undefined;

export type đổiSốLầnBấmEnter = StateUpdater<KếtQuả>;
export type DanhSáchKếtQuảTìmKiếm =
  | FuseResult<NơiĐăng>
  | FuseResult<BàiĐăng>
  | undefined;
export type MụcĐượcChọn = BàiĐăng | NơiĐăng | undefined;
/** Cursor is the current highlighted item in the search list. It's undefined when the mouse leaves */
export type Cursor = number;

export type TênDanhSách = "nơi đăng" | "bài đăng";
export type ElementDùngTab = TênDanhSách | "bối cảnh" | "nút tạo liên kết";

export interface VậtThểTiếpThị extends ThamSốUTMVàLiênKếtRútGọn {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăng;
  "Thời điểm tạo": Date;
}

export type CorsProxyRes = {
  "Nếu là bài đăng": BàiĐăng;
  "Nếu là nơi đăng": NơiĐăng;
  lỗi?:
    | "Không lấy được dữ liệu thẻ og:title, og:description hoặc og:site_name Open Graph"
    | `${string} không phải là URL hợp lệ`;
  html?: string | null;
};
