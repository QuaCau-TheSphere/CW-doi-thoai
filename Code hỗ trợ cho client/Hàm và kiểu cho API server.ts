import { BàiĐăng, BàiĐăngChưaCóId } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  NơiĐăngCóCácLựaChọnVịTrí,
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  NơiĐăngCóMộtVịTríCụThể,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { VậtThểTiếpThị } from "./Kiểu cho vật thể tiếp thị.ts";
import { lầnĐăngGầnNhất } from "../islands/Signals tổng.ts";
import { TênDanhSách } from "./Hàm và kiểu cho khung nhập.ts";
import { SốLượngDữLiệu } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";

export interface ReqBàiĐăngHoặcNơiĐăng {
  "Tên danh sách": TênDanhSách;
  "Dữ liệu": BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId;
}

export async function ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv(dữLiệuMới: ReqBàiĐăngHoặcNơiĐăng) {
  const url = `${origin}/api/thêm-bài-đăng-hoặc-nơi-đăng-mới`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dữLiệuMới),
  });
  return await res.json();
}

declare class Stringified<T> extends String {
  private ___stringified: T;
}

interface JSON {
  stringify<T>(
    value: T,
    replacer?: (key: string, value: any) => any,
    space?: string | number,
  ): string & Stringified<T>;
  parse<T>(text: Stringified<T>, reviver?: (key: any, value: any) => any): T;
  parse(text: string, reviver?: (key: any, value: any) => any): any;
}

/** Không phải là để dùng cho `await Response`, mà dùng cho `await (await Response).json()` */
export interface PhảnHồiTừCORSProxy {
  "Nếu là bài đăng": BàiĐăngChưaCóId;
  "Nếu là nơi đăng": NơiĐăngCóCácLựaChọnVịTríChưaCóId;
  lỗi?: string | "URL không hợp lệ";
  html?: string | null;
}

export type PhảnHồiTừAPITìmVậtThểTiếpThịĐãCó = Deno.KvEntry<VậtThểTiếpThị>;

export async function tìmVậtThểTiếpThịĐãCó(bàiĐăng: BàiĐăng, nơiĐăng: NơiĐăngCóMộtVịTríCụThể) {
  const apiTìmVậtThểTiếpThịĐãCó = `${origin}/api/tìm-vật-thể-tiếp-thị-đã-có`;
  const res = await fetch(apiTìmVậtThểTiếpThịĐãCó, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "Bài đăng": bàiĐăng, "Nơi đăng": nơiĐăng }),
  });
  try {
    const resJson = await res.json() as PhảnHồiTừAPITìmVậtThểTiếpThịĐãCó;
    lầnĐăngGầnNhất.value = resJson.value["Lần đăng"];
  } catch {
    lầnĐăngGầnNhất.value = 0;
  }
}

export async function ghiVậtThểTiếpThịLênKV(vậtThểTiếpThị: VậtThểTiếpThị) {
  const đuôiRútGọn = vậtThểTiếpThị["Đuôi rút gọn"];
  const liênKếtRútGọn = `${origin}/${đuôiRútGọn}`;
  const res = await fetch(liênKếtRútGọn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vậtThểTiếpThị),
  });
  console.log("Đã thêm thành công vật thể tiếp thị vào cơ sở dữ liệu:", await res.json());
}

export async function kiểmTraBàiĐăngHoặcNơiĐăngĐãCó(
  dữLiệuMới: ReqBàiĐăngHoặcNơiĐăng,
): Promise<BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí | SốLượngDữLiệu> {
  const url = `${origin}/api/kiểm-tra-bài-đăng-hoặc-nơi-đăng-đã-có`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dữLiệuMới),
  });
  return await res.json();
}
