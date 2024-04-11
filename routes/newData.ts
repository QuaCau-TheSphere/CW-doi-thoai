import { Handlers } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../utils/Ki%E1%BB%83u%20cho%20web.ts";

export const handler: Handlers = {
  //   async GET(req, ctx) {
  //     const kv = await Deno.openKv();
  //     const đuôiRútGọn = new URL(req.url).pathname.substring(1);
  //     const serverGet = await kv.get(["Đuôi rút gọn", đuôiRútGọn]);
  //     const vậtThểTiếpThị = serverGet.value as VậtThểTiếpThị;

  //     if (vậtThểTiếpThị) {
  //       const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
  //       return Response.redirect(liênKếtUTM, 307);
  //     } else {
  //       return ctx.renderNotFound();
  //     }
  //   },
  async POST(req, ctx) {
    const kv = await Deno.openKv();
    const đuôiRútGọn = new URL(req.url).pathname.substring(1);
    const vậtThểTiếpThị = await req.json() as VậtThểTiếpThị;
    await kv.set(["Đuôi rút gọn", đuôiRútGọn], vậtThểTiếpThị);

    return new Response(JSON.stringify(vậtThểTiếpThị, null, 2));
  },
};
