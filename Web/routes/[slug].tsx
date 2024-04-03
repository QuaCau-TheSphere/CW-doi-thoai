import { Handlers, PageProps } from "$fresh/server.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../../Code hỗ trợ/Kiểu cho tham số UTM.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const kv = await Deno.openKv();
    const đuôiRútGọn = new URL(req.url).searchParams.get(q);
    const vậtThểTiếpThị = (await kv.get(["Đuôi rút gọn", đuôiRútGọn]))
      .value as VậtThểTiếpThị;
    return new Response(JSON.stringify(vậtThểTiếpThị, null, 2));
    if (vậtThểTiếpThị) {
      const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
      return new Response(liênKếtUTM);
      // return Response.redirect(liênKếtUTM, 307);
    } else return ctx.renderNotFound();
  },
};
