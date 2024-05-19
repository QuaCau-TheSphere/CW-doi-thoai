// deno-fmt-ignore-file
import { Document, EnrichedDocumentSearchResultSetUnitResultUnit} from "npm:flexsearch";
import { StateUpdater } from "preact/hooks";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngĐãXácĐịnhVịTrí } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import ThamSốUTM, { ĐuôiRútGọn } from "../core/Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";

/** KHUNG NHẬP */
export type BốiCảnh = string | undefined;

export type FlexSearchBàiĐăngHoặcNơiĐăng = Document<BàiĐăng> | Document<NơiĐăngChưaXácĐịnhVịTrí>;
export type DanhSáchKếtQuảTìmKiếmType = 
  | EnrichedDocumentSearchResultSetUnitResultUnit<BàiĐăng>[]
  | EnrichedDocumentSearchResultSetUnitResultUnit<NơiĐăngChưaXácĐịnhVịTrí>[] 
  | undefined;
export type MụcĐượcChọn = BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí | undefined;
/** Cursor is the current highlighted item in the search list. It's undefined when the mouse leaves */
export type Cursor = number;

export type TênDanhSách = "nơi đăng" | "bài đăng";
export type ElementDùngTab = TênDanhSách | "bối cảnh" | "nút tạo liên kết";

export type SetNơiĐăng = StateUpdater<NơiĐăngChưaXácĐịnhVịTrí | NơiĐăngĐãXácĐịnhVịTrí | undefined>
export type SetBàiĐăngHoặcNơiĐăng = StateUpdater<BàiĐăng | undefined> | SetNơiĐăng;



/** BIỂU ĐỒ */
// deno-lint-ignore no-explicit-any
/** [Define a list of optional keys for Typescript Record](https://stackoverflow.com/q/53276792/3416774) */
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
export interface VậtThểTiếpThị extends ThamSốUTM {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăngĐãXácĐịnhVịTrí;
  "Thời điểm tạo": Date;
  "Các lần truy cập": DữLiệuTruyCậpCácNăm;
  "Đuôi rút gọn": ĐuôiRútGọn;
  "Lần đăng": number;
}
