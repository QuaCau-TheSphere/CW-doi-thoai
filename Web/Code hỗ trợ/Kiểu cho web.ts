import { FuseResult } from "https://deno.land/x/fuse/dist/fuse.d.ts";
import { StateUpdater } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { BàiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăng,
} from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

export interface KhungKiếmBênTráiProps {
  danhSáchNơiĐăng: NơiĐăng[];
  danhSáchBàiĐăng: BàiĐăng[];
  chọnBàiĐăng: StateUpdater<BàiĐăng | undefined>;
  chọnNơiĐăng: StateUpdater<NơiĐăng | undefined>;
}
export interface KhungKếtQuảBênPhảiProps {
  kếtQuả: KếtQuả;
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
export type SearchList = FuseResult<NơiĐăng> | FuseResult<BàiĐăng> | undefined;
export type SelectedItem = BàiĐăng | NơiĐăng | undefined;
/** Cursor is the current highlighted item in the search list. It's undefined when the mouse leaves */
export type Cursor = number;

export type TênDanhSách = "nơi đăng" | "bài đăng";
/** Active list is used to determine whether the search list should be popup or not */
export type ActiveList = TênDanhSách | undefined;
