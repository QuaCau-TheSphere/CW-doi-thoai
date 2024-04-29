// deno-fmt-ignore-file
import { StateUpdater } from "preact/hooks";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import CấuHìnhNơiĐăng, { NơiĐăng } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../core/Code hỗ trợ/Kiểu cho tham số UTM.ts";

/** Kiểu cho khung nhập */
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
export type DanhSáchKếtQuảTìmKiếm = FuseResult<NơiĐăng> | FuseResult<BàiĐăng> | undefined;
export type MụcĐượcChọn = BàiĐăng | NơiĐăng | undefined;
/** Cursor is the current highlighted item in the search list. It's undefined when the mouse leaves */
export type Cursor = number;

export type TênDanhSách = "nơi đăng" | "bài đăng";
export type ElementDùngTab = TênDanhSách | "bối cảnh" | "nút tạo liên kết";


/** Kiểu cho biểu đồ */
type PartialRecord<K extends keyof any, T> =  Partial<Record<K, T>>

export type Giờ = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23"
export type Ngày = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31";
export type Tháng = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
export type Năm = "2024" | "2025" | "2026" | "2027" | "2028" | "2029" | "2030" | "2031" | "2032" | "2033" | "2034" | "2035" | "2036" | "2037" | "2038" | "2039" | "2040" | "2041" | "2042" | "2043" | "2044" | "2045" | "2046" | "2047" | "2048" | "2049" | "2050" 
export const DANH_SÁCH_ĐƠN_VỊ_THỜI_GIAN = ["giờ", "ngày", "tuần", "tháng", "năm"] as const 
export type ĐơnVị = typeof DANH_SÁCH_ĐƠN_VỊ_THỜI_GIAN[number] 
export type DữLiệuBiểuĐồ = Record<ĐơnVị, {datetime: Date, hit: number}[]> 

type DữLiệuTruyCập = {'Thời điểm': Date, header?: Headers} 
export type DữLiệuTruyCậpCácGiờ = PartialRecord<`${Giờ} giờ`, DữLiệuTruyCập[]>;
export type DữLiệuTruyCậpCácNgày = PartialRecord<`Ngày ${Ngày}`, DữLiệuTruyCậpCácGiờ>;
export type DữLiệuTruyCậpCácTháng = PartialRecord<`Tháng ${Tháng}`, DữLiệuTruyCậpCácNgày>;
export type DữLiệuTruyCậpCácNăm = PartialRecord<Năm, DữLiệuTruyCậpCácTháng>;

export type DanhSáchThờiĐiểm = Date[]
export interface VậtThểTiếpThị extends ThamSốUTMVàLiênKếtRútGọn {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăng;
  "Thời điểm tạo": Date;
  "Các lần truy cập": DữLiệuTruyCậpCácNăm;
}
export type CorsProxyRes = {
  "Nếu là bài đăng": BàiĐăng;
  "Nếu là nơi đăng": NơiĐăng;
  lỗi?:
    | "Không lấy được dữ liệu thẻ og:title, og:description hoặc og:site_name Open Graph"
    | `${string} không phải là URL hợp lệ`;
  html?: string | null;
};
