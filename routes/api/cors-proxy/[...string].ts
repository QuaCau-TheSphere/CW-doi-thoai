import { Handlers } from "$fresh/server.ts";
import { lấyURL, tạoBàiĐăngHoặcNơiĐăngMớiTừURL } from "../../../core/Code hỗ trợ/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import esthetic from "npm:esthetic";

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const url = lấyURL(ctx);
      try {
        const { bàiĐăng, nơiĐăng } = await tạoBàiĐăngHoặcNơiĐăngMớiTừURL(url);

        return Response.json({
          "Nếu là bài đăng": bàiĐăng,
          "Nếu là nơi đăng": nơiĐăng,
        });
      } catch (e) {
        return Response.json({
          lỗi: String(e.stack),
          html: esthetic.format(await (await fetch(url)).text()),
        });
      }
    } catch {
      return Response.json({
        lỗi: `URL không hợp lệ`,
      });
    }
  },
};
