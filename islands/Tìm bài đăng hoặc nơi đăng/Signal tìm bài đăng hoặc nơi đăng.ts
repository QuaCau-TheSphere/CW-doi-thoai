import { signal } from "@preact/signals";
import { Cursor, DanhSáchKếtQuảTìmKiếmType } from "../../utils/Kiểu cho web.ts";

export const danhSáchGợiÝSignal = signal<DanhSáchKếtQuảTìmKiếmType>(undefined);
export const queryBàiĐăng = signal<string>("");
export const queryNơiĐăng = signal<string>("");
export const cursor = signal<Cursor>(0);
