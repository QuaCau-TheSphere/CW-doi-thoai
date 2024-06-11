/** @fileoverview Chứa những signal dùng cho cả section bên trái và section bên phải */
import FlexSearch from "npm:flexsearch";
import { computed, effect, signal } from "@preact/signals";
import { NơiĐăngCóCácLựaChọnVịTrí, NơiĐăngCóMộtVịTríCụThể } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { BàiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { VậtThểTiếpThị } from "../Code hỗ trợ cho client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { tìmVậtThểTiếpThịĐãCó } from "../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { CấuHìnhChung, ThôngTinCấuHìnhNơiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { ElementDùngTab } from "../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";

export const cấuHìnhChungSignal = signal<CấuHìnhChung>({ "Vị trí thành phần": { "": [""] }, "Vị trí đặt liên kết ở nơi đăng": [] });
export const danhSáchThôngTinCấuHìnhNơiĐăngSignal = signal<ThôngTinCấuHìnhNơiĐăng[]>([]);
export const flexSearchBàiĐăngSignal = signal<FlexSearch.Document<BàiĐăng>>([]);
export const flexSearchNơiĐăngSignal = signal<FlexSearch.Document<NơiĐăngCóCácLựaChọnVịTrí>>([]);

export const bàiĐăngSignal = signal<BàiĐăng | undefined>(undefined);
export const nơiĐăngCóCácLựaChọnVịTríSignal = signal<NơiĐăngCóCácLựaChọnVịTrí | undefined>(undefined);
export const nơiĐăngCóMộtVịTríCụThểSignal = signal<NơiĐăngCóMộtVịTríCụThể | undefined>(undefined);
export const bốiCảnhSignal = signal<string | undefined>(undefined);
export const element = signal<ElementDùngTab>("bài đăng");
export const cóRútGọn = signal<boolean>(true);

export const vịTríString = signal<string | undefined>(undefined);
export const vậtThểTiếpThịSignal = signal<VậtThểTiếpThị | undefined | void>(undefined);
export const lầnĐăngGầnNhất = signal<number | undefined>(undefined);
export const lầnĐăngHiệnTại = computed<number>(() => {
  const num = lầnĐăngGầnNhất.value;
  if (!num) return 1;
  return num + 1;
});
export const tênNút = computed<string>(() => {
  if (!lầnĐăngGầnNhất.value) {
    return "Tạo liên kết";
  } else {
    if (lầnĐăngHiệnTại.value === 1) {
      return "Tạo liên kết cho lần đăng đầu tiên";
    } else {
      return `Tạo liên kết cho lần đăng thứ ${lầnĐăngHiệnTại}`;
    }
  }
});

effect(() => {
  const bàiĐăng = bàiĐăngSignal.value;
  const nơiĐăng = nơiĐăngCóMộtVịTríCụThểSignal.value;

  if (!bàiĐăng || !nơiĐăng) return;
  tìmVậtThểTiếpThịĐãCó(bàiĐăng, nơiĐăng).catch(console.error);
});
