import FlexSearch from "npm:flexsearch";
import { computed, effect, signal } from "@preact/signals";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import CấuHìnhNơiĐăng, { NơiĐăngĐãXácĐịnhVịTrí } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { BàiĐăng } from "../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { ElementDùngTab, VậtThểTiếpThị } from "../utils/Kiểu cho web.ts";
import { tìmVậtThểTiếpThịĐãCó } from "../utils/Hàm và kiểu cho API server.ts";

export const cấuHìnhNơiĐăngSignal = signal<CấuHìnhNơiĐăng>({});
export const flexSearchBàiĐăngSignal = signal<FlexSearch.Document<BàiĐăng>>([]);
export const flexSearchNơiĐăngSignal = signal<FlexSearch.Document<NơiĐăngChưaXácĐịnhVịTrí>>([]);

export const bàiĐăngĐượcChọn = signal<BàiĐăng | undefined>(undefined);
export const nơiĐăngChưaXácĐịnhVịTríĐượcChọn = signal<NơiĐăngChưaXácĐịnhVịTrí | undefined>(undefined);
export const nơiĐăngĐãXácĐịnhVịTríĐượcChọn = signal<NơiĐăngĐãXácĐịnhVịTrí | undefined>(undefined);
export const bốiCảnh = signal<string | undefined>(undefined);
export const element = signal<ElementDùngTab>("bài đăng");
export const cóRútGọn = signal<boolean>(true);

export const vịTríString = signal<string | undefined>(undefined);
export const vậtThểTiếpThịĐượcTạo = signal<VậtThểTiếpThị | undefined>(undefined);
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
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const nơiĐăng = nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value;

  if (!bàiĐăng || !nơiĐăng) return;
  tìmVậtThểTiếpThịĐãCó(bàiĐăng, nơiĐăng).catch(console.error);
});
