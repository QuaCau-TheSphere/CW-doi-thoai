import { FreshContext, Handlers } from "$fresh/server.ts";
import { tạoBàiĐăngTừURL, tạoNơiĐăngTừURL } from "../../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import esthetic from "npm:esthetic";

function lọcUrlStringTừContext(ctx: FreshContext<Record<string, unknown>>) {
  const fullUrl = ctx.url.href;
  const temp = fullUrl.split("/api/cors-proxy/");
  temp.shift();
  const url = temp.join();
  console.log("URL được gửi lên cors proxy:", url);
  return new URL(url);
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const url = lọcUrlStringTừContext(ctx);
      try {
        return Response.json({
          "Nếu là bài đăng": await tạoBàiĐăngTừURL(url),
          "Nếu là nơi đăng": await tạoNơiĐăngTừURL(url),
        });
      } catch (e) {
        const html = await (await fetch(url)).text();
        return Response.json({
          lỗi: String(e.stack),
          html: esthetic.html(html),
        });
      }
    } catch {
      return Response.json({
        lỗi: `URL không hợp lệ`,
      });
    }
  },
};
