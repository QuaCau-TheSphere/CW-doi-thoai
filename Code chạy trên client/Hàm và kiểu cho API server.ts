import { BàiĐăng, BàiĐăngChưaCóId } from "../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import {
  NơiĐăngCóCácLựaChọnVịTrí,
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  NơiĐăngCóMộtVịTríCụThể,
} from "../Code chạy trên local, server, KV/Nơi đăng/Hàm và kiểu cho vị trí.ts";
import { VậtThểTiếpThị } from "./Hàm và kiểu cho vật thể tiếp thị.ts";
import { lầnĐăngGầnNhất } from "../islands/Signals tổng.ts";
import { TênDanhSách } from "./URL, HTML/Hàm và kiểu cho khung nhập.ts";
import { đổiTừCơSố10SangCơSố64 } from "./Chuỗi, slug/Hàm xử lý chuỗi.ts";
export interface ReqBàiĐăngHoặcNơiĐăng {
  "Tên danh sách": TênDanhSách;
  "Dữ liệu": BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId;
}

async function kiểmTraBàiĐăngHoặcNơiĐăngĐãCó(
  dữLiệuMới: ReqBàiĐăngHoặcNơiĐăng,
): Promise<
  | { "Dữ liệu có id": BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí; "Loại dữ liệu": TênDanhSách }
  | { "Tổng số dữ liệu đang có": number; "Loại dữ liệu": TênDanhSách }
  | string
> {
  const url = `${origin}/api/kiểm-tra-bài-đăng-hoặc-nơi-đăng-đã-có`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dữLiệuMới),
  });
  return await res.json();
}

async function xácĐịnhId(
  tênDanhSách: TênDanhSách,
  dữLiệuChưaCóId: BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId,
) {
  const res = await kiểmTraBàiĐăngHoặcNơiĐăngĐãCó({
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": dữLiệuChưaCóId,
  });
  console.log(res);
  if (typeof res === "string") return đổiTừCơSố10SangCơSố64(Date.now());
  if ("Dữ liệu có id" in res) return res["Dữ liệu có id"].id;
  if ("Tổng số dữ liệu đang có" in res) return đổiTừCơSố10SangCơSố64(res["Tổng số dữ liệu đang có"] + 1);
  return đổiTừCơSố10SangCơSố64(Date.now());
}

export async function ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv(dữLiệuChưaCóId: BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId, tênDanhSách: TênDanhSách) {
  const body = JSON.stringify({
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": {
      ...dữLiệuChưaCóId,
      id: đổiTừCơSố10SangCơSố64(Date.now()),
      // id: await xácĐịnhId(tênDanhSách, dữLiệuChưaCóId),
    },
  });
  const url = `${origin}/api/thêm-bài-đăng-hoặc-nơi-đăng-mới`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  return await res.json();
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
