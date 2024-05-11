// deno-fmt-ignore-file
import { Handlers } from "$fresh/server.ts";
import { BàiĐăng } from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { TênDanhSách } from "../../utils/Kiểu cho web.ts";

function tạoKey(
  tênDanhSách: TênDanhSách,
  dữLiệu: BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí,
): Deno.KvKey {
  switch (tênDanhSách) {
    case "bài đăng": {
      const {
        "Tiêu đề": tiêuĐề,
        "Dự án": dựÁn,
        Vault: vault,
        url,
      } = dữLiệu as BàiĐăng;
      return [
        "Bài đăng",
        vault || "",
        dựÁn?.["Tên dự án"] || "",
        tiêuĐề || "",
        url as string || "",
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
        URL as string,
      ];
    }
  }
}

interface ReqBàiĐăngHoặcNơiĐăngTạoMới {
  "Tên danh sách": TênDanhSách;
  "Dữ liệu": BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí;
}
export const handler: Handlers = {
  async POST(req, ctx) {
    const kv = await Deno.openKv();
    const bàiĐăngHoặcNơiĐăngTạoMới = await req.json() as ReqBàiĐăngHoặcNơiĐăngTạoMới;
    const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = bàiĐăngHoặcNơiĐăngTạoMới;
    const key = tạoKey(tênDanhSách, dữLiệu);
    const value = {
      ...dữLiệu,
      "Thời điểm tạo": new Date(),
    };
    await kv.set(key, value)
    return Response.json(await kv.get(key));
  },
};
