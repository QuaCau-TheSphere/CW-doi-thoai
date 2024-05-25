import { BàiĐăng } from "../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngCóCácLựaChọnVịTrí, NơiĐăngCóMộtVịTríCụThể } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { TênDanhSách, VậtThểTiếpThị } from "./Kiểu cho web.ts";
import { lầnĐăngGầnNhất } from "../islands/Signals tổng.ts";

export interface ReqBàiĐăngHoặcNơiĐăngTạoMới {
  "Tên danh sách": TênDanhSách;
  "Dữ liệu": BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí;
}

export async function ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv(dữLiệuMới: ReqBàiĐăngHoặcNơiĐăngTạoMới) {
  const url = `${origin}/api/thêm-bài-đăng-hoặc-nơi-đăng-mới`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dữLiệuMới),
  });
  return await res.json();
}

/** Không dùng cho `await Response`, mà dùng cho `await (await Response).json()` */
export interface PhảnHồiTừCORSProxy {
  "Nếu là bài đăng": BàiĐăng;
  "Nếu là nơi đăng": NơiĐăngCóCácLựaChọnVịTrí;
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
