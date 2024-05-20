import { BàiĐăng } from "../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { NơiĐăngĐãXácĐịnhVịTrí } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênDanhSách, VậtThểTiếpThị } from "./Kiểu cho web.ts";
import { lầnĐăngGầnNhất } from "../islands/Signals tổng.ts";

export function tạoKeyKV(tênDanhSách: TênDanhSách, dữLiệu: BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí): Deno.KvKey {
  switch (tênDanhSách) {
    case "bài đăng": {
      const {
        "Tiêu đề": tiêuĐề,
        "Dự án": dựÁn,
        Vault: vault,
        URL,
      } = dữLiệu as BàiĐăng;
      return [
        "Bài đăng",
        vault || "",
        dựÁn?.["Tên dự án"] || "",
        tiêuĐề || "",
        URL as string || "",
      ];
    }

    case "nơi đăng": {
      const {
        "Loại nền tảng": loạiNềnTảng,
        "Tên nền tảng": tênNềnTảng,
        "Loại nơi đăng": loạiNơiĐăng,
        "Tên nơi đăng": tênNơiĐăng,
        URL,
      } = dữLiệu as NơiĐăngChưaXácĐịnhVịTrí;
      return [
        "Nơi đăng",
        loạiNềnTảng,
        tênNềnTảng,
        JSON.stringify(loạiNơiĐăng),
        JSON.stringify(tênNơiĐăng),
        URL as string || "",
      ];
    }
  }
}

export async function thêmBàiĐăngHoặcNơiĐăngMớiVàoKV(bàiĐăngHoặcNơiĐăngTạoMới: ReqBàiĐăngHoặcNơiĐăngTạoMới, kv: Deno.Kv) {
  const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = bàiĐăngHoặcNơiĐăngTạoMới;
  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = { ...dữLiệu, "Thời điểm nhập vào KV": new Date() };
  await kv.set(key, value);
  return key;
}

export interface ReqBàiĐăngHoặcNơiĐăngTạoMới {
  "Tên danh sách": TênDanhSách;
  "Dữ liệu": BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí;
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
  "Nếu là nơi đăng": NơiĐăngChưaXácĐịnhVịTrí;
  lỗi?: string | "URL không hợp lệ";
  html?: string | null;
}

export type PhảnHồiTừAPITìmVậtThểTiếpThịĐãCó = Deno.KvEntry<VậtThểTiếpThị>;

export async function tìmVậtThểTiếpThịĐãCó(bàiĐăng: BàiĐăng, nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí) {
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
  console.log("Đã thêm thành công vật thể tiếp thị vào cơ sở dữ liệu:", res);
}
