import { Handlers } from "$fresh/server.ts";
import { kvGet, SốLượngDữLiệu, tạoKeyKV } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { ReqBàiĐăngHoặcNơiĐăng } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = await req.json() as ReqBàiĐăngHoặcNơiĐăng;
    const key = tạoKeyKV(tênDanhSách, dữLiệu);
    const value = (await kvGet(key)).value;
    if (value) return Response.json(value);

    const sốLượngDữLiệu = (await kvGet(["Số lượng dữ liệu"])).value as SốLượngDữLiệu;
    return Response.json(sốLượngDữLiệu);
  },
};
