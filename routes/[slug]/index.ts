import { Handlers } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../../Code chạy trên client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { thêmThờiĐiểmTruyCập } from "../../Code chạy trên client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { kvGet, kvSet } from "../../Code chạy trên local, server, KV/Hàm cho KV.ts";
import { cậpNhậtSốLượngĐuôiRútGọn } from "../../Code chạy trên local, server, KV/Hàm và kiểu cho id và số lượng dữ liệu.ts";

export const handler: Handlers = {
  /** Người dùng truy cập để tới liên kết thực sự */
  async GET(req, ctx) {
    const slug = ctx.params.slug;
    console.log("🚀:", ["renderer.js.map", "installHook.js.map"].includes(slug));
    if (!["renderer.js.map", "installHook.js.map"].includes(slug)) {
      const đuôiRútGọn = decodeURIComponent(slug);
      console.log("Đuôi rút gọn được truy cập:", đuôiRútGọn);
      const key = ["Đuôi rút gọn", đuôiRútGọn];
      const vậtThểTiếpThị = (await kvGet(key, "GET hander trong routes\\[slug]\\index.ts")).value as VậtThểTiếpThị;

      if (vậtThểTiếpThị) {
        const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
        thêmThờiĐiểmTruyCập(vậtThểTiếpThị, req.headers);
        await kvSet(key, vậtThểTiếpThị, "GET handler trong routes\\[slug]\\index.ts");
        await cậpNhậtSốLượngĐuôiRútGọn();
        return Response.redirect(liênKếtUTM, 307);
      } else {
        return ctx.renderNotFound({ đuôiRútGọn: đuôiRútGọn });
      }
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
