//deno-fmt-ignore-file
import { signal } from "@preact/signals";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { NơiĐăngĐãXácĐịnhVịTrí } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { ElementDùngTab } from "../utils/Kiểu cho web.ts";

export const bàiĐăngĐượcChọn = signal<BàiĐăng | undefined>(undefined);
export const nơiĐăngChưaXácĐịnhVịTríĐượcChọn = signal<NơiĐăngChưaXácĐịnhVịTrí | undefined>(undefined);
export const nơiĐăngĐãXácĐịnhVịTríĐượcChọn = signal<NơiĐăngĐãXácĐịnhVịTrí | undefined>(undefined);
export const bốiCảnh = signal<string | undefined>(undefined);
export const lầnTạoLiênKết = signal(0);
export const element = signal<ElementDùngTab>("bài đăng");
export const vịTríString = signal<string | undefined>(undefined);
