import { Handlers } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../../utils/Kiểu cho web.ts";

const kv = await Deno.openKv();
export const handler: Handlers = {
  async GET(req, ctx) {
    const đuôiRútGọn = ctx.params.slug;
    const serverGet = await kv.get(["Đuôi rút gọn", đuôiRútGọn]);
    const vậtThểTiếpThị = serverGet.value as VậtThểTiếpThị;

    if (vậtThểTiếpThị) {
      const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
      vậtThểTiếpThị["Các lần truy cập"].push(new Date());

      return Response.redirect(liênKếtUTM, 307);
    } else {
      return ctx.renderNotFound();
    }
  },
  async POST(req, ctx) {
    // const kv = await Deno.openKv();
    const đuôiRútGọn = ctx.params.slug;
    const vậtThểTiếpThị = await req.json() as VậtThểTiếpThị;
    await kv.set(["Đuôi rút gọn", đuôiRútGọn], vậtThểTiếpThị);

    return new Response(JSON.stringify(vậtThểTiếpThị, null, 2));
  },
};
