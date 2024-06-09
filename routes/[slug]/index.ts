import { Handlers } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../../Code hỗ trợ cho client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { thêmThờiĐiểmTruyCập } from "../../Code hỗ trợ cho client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { kvGet, kvSet } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { cậpNhậtSốLượngĐuôiRútGọn } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho id và số lượng dữ liệu.ts";

export const handler: Handlers = {
  /** Người dùng truy cập để tới liên kết thực sự */
  async GET(req, ctx) {
    const đuôiRútGọn = ctx.params.slug;
    console.log("Đuôi rút gọn được truy cập:", đuôiRútGọn);
    const key = ["Đuôi rút gọn", đuôiRútGọn];
    const vậtThểTiếpThị = (await kvGet(key, "GET hander trong cors proxy")).value as VậtThểTiếpThị;
    const headers = req.headers;

    if (vậtThểTiếpThị) {
      const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
      thêmThờiĐiểmTruyCập(vậtThểTiếpThị, headers);
      await kvSet(key, vậtThểTiếpThị, "GET handler trong routes\\[slug]\\index.ts");
      await cậpNhậtSốLượngĐuôiRútGọn();
      return Response.redirect(liênKếtUTM, 307);
    } else {
      return ctx.renderNotFound({ đuôiRútGọn: đuôiRútGọn });
    }
  },

  /** Chương trình tạo liên kết rút gọn mới */
  async POST(req, ctx) {
    const đuôiRútGọn = decodeURIComponent(ctx.params.slug);
    const vậtThểTiếpThị = await req.json() as VậtThểTiếpThị;
    await kvSet(["Đuôi rút gọn", đuôiRútGọn], vậtThểTiếpThị, "POST handler trong routes\\[slug]\\index.ts");
    await cậpNhậtSốLượngĐuôiRútGọn();

    return new Response(JSON.stringify(vậtThểTiếpThị, null, 2));
  },
};
