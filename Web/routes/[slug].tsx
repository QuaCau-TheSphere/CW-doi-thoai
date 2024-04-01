import { Handlers, PageProps } from "$fresh/server.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../../Code hỗ trợ/Kiểu cho tham số UTM.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const kv = await Deno.openKv();
    const đuôiRútGọn = new URL(req.url).pathname;
    const thamSốUTMVàLiênKếtRútGọn =
      (await kv.get(["Đuôi rút gọn", đuôiRútGọn]))
        .value as ThamSốUTMVàLiênKếtRútGọn;
    if (thamSốUTMVàLiênKếtRútGọn) {
      const liênKếtUTM = thamSốUTMVàLiênKếtRútGọn["Liên kết UTM"];
      return Response.redirect(liênKếtUTM, 307);
    } else return ctx.renderNotFound();
  },
};
