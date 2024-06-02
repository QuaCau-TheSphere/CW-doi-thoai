import { Handlers } from "$fresh/server.ts";
import { kvGet, SốLượngDữLiệu, TableName, tạoKeyKV } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { ReqBàiĐăngHoặcNơiĐăng } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { viếtHoa } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { BàiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { "Tên danh sách": tênDanhSách, "Dữ liệu": dữLiệu } = await req.json() as ReqBàiĐăngHoặcNơiĐăng;
    const key = tạoKeyKV(tênDanhSách, dữLiệu);
    const value = (await kvGet(key, "POST handler trong routes\\api\\kiểm-tra-bài-đăng-hoặc-nơi-đăng-đã-có.ts")).value as
      | BàiĐăng
      | NơiĐăngCóCácLựaChọnVịTrí;
    if (value) {
      return Response.json({
        "Dữ liệu có id": value,
        "Loại dữ liệu": tênDanhSách,
      });
    }

    const sốLượngDữLiệu = (await kvGet(["Số lượng dữ liệu"], "POST handler trong routes\\api\\kiểm-tra-bài-đăng-hoặc-nơi-đăng-đã-có.ts"))
      .value as SốLượngDữLiệu;
    return Response.json({
      "Tổng số dữ liệu đang có": sốLượngDữLiệu.get(viếtHoa(tênDanhSách) as TableName),
      "Loại dữ liệu": tênDanhSách,
    });
  },
};
