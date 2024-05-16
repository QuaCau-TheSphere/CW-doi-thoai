import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngĐãXácĐịnhVịTrí } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênDanhSách, VậtThểTiếpThị } from "./Kiểu cho web.ts";
import { lầnĐăngGầnNhất } from "../islands/Signals tổng.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";

/** Không dùng cho `await Response`, mà dùng cho `await (await Response).json()` */
export interface PhảnHồiTừCORSProxy {
  "Nếu là bài đăng": BàiĐăng;
  "Nếu là nơi đăng": NơiĐăngChưaXácĐịnhVịTrí;
  lỗi?:
    | string
    | "URL không hợp lệ";
  html?: string | null;
}

export type PhảnHồiTừAPITìmVậtThểTiếpThịĐãCó = Deno.KvEntry<VậtThểTiếpThị>;

export async function kiểmTraLầnĐăngĐãCóTrênKv(bàiĐăng: BàiĐăng, nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí) {
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

export async function ghiLênKV(vậtThểTiếpThị: VậtThểTiếpThị) {
  const đuôiRútGọn = vậtThểTiếpThị["Đuôi rút gọn"];
  const liênKếtRútGọn = `${origin}/${đuôiRútGọn}`;
  const res = await fetch(liênKếtRútGọn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vậtThểTiếpThị),
  });
  console.log("Đã thêm thành công vật thể tiếp thị vào cơ sở dữ liệu:", res);
}

export interface ReqBàiĐăngHoặcNơiĐăngTạoMới {
  "Tên danh sách": TênDanhSách;
  "Dữ liệu": BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí;
}

export async function ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv(dữLiệuMới: ReqBàiĐăngHoặcNơiĐăngTạoMới) {
  const url = `${origin}/api/newData`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dữLiệuMới),
  });
  return await res.json();
}
