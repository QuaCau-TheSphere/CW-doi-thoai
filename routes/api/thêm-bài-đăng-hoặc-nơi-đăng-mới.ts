import { Handlers } from "$fresh/server.ts";
import { kvGet, kvSet, tạoKeyKV } from "../../Code chạy trên local, server, KV/Hàm cho KV.ts";
import { ReqBàiĐăngHoặcNơiĐăng } from "../../Code chạy trên client/Hàm và kiểu cho API server.ts";
import { cậpNhậtSốLượngBàiĐăng, cậpNhậtSốLượngNơiĐăng } from "../../Code chạy trên local, server, KV/Hàm và kiểu cho id và số lượng dữ liệu.ts";
import { PhươngThứcTạoNơiĐăng } from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";

export async function thêmBàiĐăngHoặcNơiĐăngMớiVàoKV(bàiĐăngHoặcNơiĐăngTạoMới: ReqBàiĐăngHoặcNơiĐăng) {
  const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = bàiĐăngHoặcNơiĐăngTạoMới;
  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = { ...dữLiệu, "Thời điểm nhập vào KV": new Date() };
  await kvSet(key, value, "thêmBàiĐăngHoặcNơiĐăngMớiVàoKV trong routes\\api\\thêm-bài-đăng-hoặc-nơi-đăng-mới.ts");
  const phươngThứcTạo = dữLiệu["Phương thức tạo"];
  switch (tênDanhSách) {
    case "bài đăng":
      cậpNhậtSốLượngBàiĐăng(phươngThứcTạo);
      break;
    case "nơi đăng":
      cậpNhậtSốLượngNơiĐăng(phươngThứcTạo as PhươngThứcTạoNơiĐăng);
      break;
  }
  return key;
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const bàiĐăngHoặcNơiĐăngTạoMới = await req.json() as ReqBàiĐăngHoặcNơiĐăng;
    const key = await thêmBàiĐăngHoặcNơiĐăngMớiVàoKV(bàiĐăngHoặcNơiĐăngTạoMới);
    return Response.json(await kvGet(key, "POST handler trong routes\\api\\thêm-bài-đăng-hoặc-nơi-đăng-mới.ts"));
  },
};
