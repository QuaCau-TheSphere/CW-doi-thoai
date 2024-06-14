/**
 * @fileoverview dùng cho việc tạo id khi người dùng tạo bài đăng hoặc nơi đăng mới thủ công
 * @see kiểmTraBàiĐăngHoặcNơiĐăngĐãCó trong Code chạy trên client\Hàm và kiểu cho API server.ts
 * @see islands\Modal tạo mới\Modal chung.tsx
 */
import { Handlers } from "$fresh/server.ts";
import { kvGet, tạoKeyKV } from "../../Code chạy trên local, server, KV/Hàm cho KV.ts";
import { ReqBàiĐăngHoặcNơiĐăng } from "../../Code chạy trên client/Hàm và kiểu cho API server.ts";
import { BàiĐăng } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Code chạy trên client/Hàm và kiểu cho vị trí.ts";
import { lấyTổngSốBàiĐăngHoặcNơiĐăngĐangCó } from "../../Code chạy trên local, server, KV/Hàm và kiểu cho id và số lượng dữ liệu.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = await req.json() as ReqBàiĐăngHoặcNơiĐăng;
    const key = tạoKeyKV(tênDanhSách, dữLiệu);
    const value = (await kvGet(key, "kiểm-tra-bài-đăng-hoặc-nơi-đăng-đã-có.ts")).value as BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí;
    if (value && value.id) {
      return Response.json({
        "Dữ liệu có id": value,
        "Loại dữ liệu": tênDanhSách,
      });
    }

    const tổngSốBàiĐăngHoặcNơiĐăngĐangCó = lấyTổngSốBàiĐăngHoặcNơiĐăngĐangCó(tênDanhSách);
    if (typeof tổngSốBàiĐăngHoặcNơiĐăngĐangCó === "string") return Response.json(tổngSốBàiĐăngHoặcNơiĐăngĐangCó);
    return Response.json({
      "Tổng số dữ liệu đang có": tổngSốBàiĐăngHoặcNơiĐăngĐangCó,
      "Loại dữ liệu": tênDanhSách,
    });
  },
};
