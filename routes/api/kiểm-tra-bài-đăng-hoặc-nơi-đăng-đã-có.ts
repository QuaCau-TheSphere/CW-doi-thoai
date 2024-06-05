import { Handlers } from "$fresh/server.ts";
import { kvGet, tạoKeyKV } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { ReqBàiĐăngHoặcNơiĐăng } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { BàiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { lấyTổngSốBàiĐăngHoặcNơiĐăngĐangCó } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho id và số lượng dữ liệu.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = await req.json() as ReqBàiĐăngHoặcNơiĐăng;
    const key = tạoKeyKV(tênDanhSách, dữLiệu);
    const value = (await kvGet(key, "kiểm-tra-bài-đăng-hoặc-nơi-đăng-đã-có.ts")).value as BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí;
    if (value) {
      return Response.json({
        "Dữ liệu có id": value,
        "Loại dữ liệu": tênDanhSách,
      });
    }

    return Response.json({
      "Tổng số dữ liệu đang có": lấyTổngSốBàiĐăngHoặcNơiĐăngĐangCó(tênDanhSách),
      "Loại dữ liệu": tênDanhSách,
    });
  },
};
