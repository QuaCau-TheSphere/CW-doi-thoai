import { Handlers } from "$fresh/server.ts"
import ThamSố from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u.ts" 

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
