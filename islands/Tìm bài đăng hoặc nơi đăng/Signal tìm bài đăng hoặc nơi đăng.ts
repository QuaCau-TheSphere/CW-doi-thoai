import { signal } from "@preact/signals";
import { Cursor } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho khung nhập.ts";

export const queryBàiĐăngSignal = signal<string | undefined>(undefined);
export const queryNơiĐăngSignal = signal<string | undefined>(undefined);
export const cursor = signal<Cursor>(0);
