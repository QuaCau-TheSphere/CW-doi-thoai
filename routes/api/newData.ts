import { Handlers } from "$fresh/server.ts";
import { NơiĐăng } from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { BàiĐăng } from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { TênDanhSách } from "../../utils/Kiểu cho web.ts";

function tạoKey(
  tênDanhSách: TênDanhSách,
  dữLiệu: BàiĐăng | NơiĐăng,
): Deno.KvKey {
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
        "Tên cộng đồng": tênCộngĐồng,
        "Tên nơi đăng": tênNơiĐăng,
        URL,
      } = dữLiệu as NơiĐăng;
      return [
        "Nơi đăng",
        loạiNềnTảng,
        tênNềnTảng,
        loạiNơiĐăng,
        tênCộngĐồng || "",
        tênNơiĐăng,
        URL as string,
      ];
    }
  }
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const kv = await Deno.openKv();
    const {
      "Tên danh sách": tênDanhSách,
      "Dữ liệu": dữLiệu,
    } = await req.json() as {
      "Tên danh sách": TênDanhSách;
      "Dữ liệu": BàiĐăng | NơiĐăng;
    };
    const thờiĐiểmTạo = new Date();
    const key = tạoKey(tênDanhSách, dữLiệu);
    const value = {
      ...dữLiệu,
      "Thời điểm tạo": thờiĐiểmTạo,
    };
    console.log("🚀 ~ POST ~ key:", key);
    await kv.set(key, value);
    const kvValue = (await kv.get(key)).value;
    const isOk = JSON.stringify(value) === JSON.stringify(kvValue);
    return Response.json({
      isOk: isOk,
      postValue: value,
      kvValue: kvValue,
    });
  },
};
