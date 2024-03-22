import { Handlers } from "$fresh/server.ts"
import ThamSố from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts" 

export const handler: Handlers = {
  async GET(req, ctx) {
    const kv = await Deno.openKv();
    const kếtQuảTruyVấn = await kv.get(['Phần rút gọn', 'chưaLàmLiênKếtRútGọn']);
    const vậtThểChiaSẻ = kếtQuảTruyVấn.value as ThamSố
    const liênKếtUTM = vậtThểChiaSẻ["Liên kết UTM"]

    console.log(liênKếtUTM)
    try {
      return Response.redirect(liênKếtUTM, 307);
    } catch {
      return ctx.renderNotFound() 
    } 
  }
}
