import { StateUpdater } from "preact/hooks";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăng,
} from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../core/Code hỗ trợ/Kiểu cho tham số UTM.ts";

export interface KhungKiếmBênTráiProps {
  danhSáchNơiĐăng: NơiĐăng[];
  danhSáchBàiĐăng: BàiĐăng[];
  chọnBàiĐăng: StateUpdater<BàiĐăng | undefined>;
  chọnNơiĐăng: StateUpdater<NơiĐăng | undefined>;
}
export interface KhungKếtQuảBênPhảiProps {
  bàiĐăngĐượcChọn: BàiĐăng;
  nơiĐăngĐượcChọn: NơiĐăng;
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng;
}
export interface MainProps {
  danhSáchNơiĐăng: NơiĐăng[];
  danhSáchBàiĐăng: BàiĐăng[];
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng;
}

export type KếtQuả = {
  bàiĐăng: BàiĐăng | undefined;
  nơiĐăng: NơiĐăng | undefined;
} | undefined;

export type TạoKếtQuả = StateUpdater<KếtQuả>;
export type DanhSáchKếtQuảTìmKiếm =
  | FuseResult<NơiĐăng>
  | FuseResult<BàiĐăng>
  | undefined;
export type MụcĐượcChọn = BàiĐăng | NơiĐăng | undefined;
/** Cursor is the current highlighted item in the search list. It's undefined when the mouse leaves */
export type Cursor = number;

export type TênDanhSách = "nơi đăng" | "bài đăng";
/** Active list is used to determine whether the search list should be popup or not */
export type DanhSáchĐangActive = TênDanhSách | undefined;

export interface VậtThểTiếpThị extends ThamSốUTMVàLiênKếtRútGọn {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăng;
  "Thời điểm tạo": Date;
}
