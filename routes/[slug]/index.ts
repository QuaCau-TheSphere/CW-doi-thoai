// deno-fmt-ignore-file
import { Handlers } from "$fresh/server.ts";
import { Giờ, Ngày, Năm, Tháng, VậtThểTiếpThị } from "../../utils/Kiểu cho web.ts";

function thêmThờiĐiểmTruyCập(vậtThểTiếpThị: VậtThểTiếpThị, headers: Headers){
  const bâyGiờ = new Date()
  const năm = bâyGiờ.getFullYear().toString() as Năm
  const tháng = (bâyGiờ.getMonth() + 1).toString() as Tháng
  const ngày = bâyGiờ.getDate().toString() as Ngày
  const giờ = bâyGiờ.getHours().toString() as Giờ

  if (vậtThểTiếpThị["Các lần truy cập"] === undefined)                                                      vậtThểTiếpThị["Các lần truy cập"] = {} 
  if (vậtThểTiếpThị["Các lần truy cập"][năm] === undefined)                                                 vậtThểTiếpThị["Các lần truy cập"][năm] = {} 
  if (vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`] === undefined)                               vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`] = {} 
  if (vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`] === undefined)               vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`] = {} 
  if (vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`]![`${giờ} giờ`] === undefined) vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`]![`${giờ} giờ`] = []
  
  vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`]![`${giờ} giờ`]!.push({'Thời điểm': bâyGiờ, header: headers})
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const kv = await Deno.openKv();
    const đuôiRútGọn = ctx.params.slug;
    const key = ["Đuôi rút gọn", đuôiRútGọn]
    const vậtThểTiếpThị = (await kv.get(key)).value as VậtThểTiếpThị;
    const headers =  req.headers

    if (vậtThểTiếpThị) {
      const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
      thêmThờiĐiểmTruyCập(vậtThểTiếpThị, headers) 
      await kv.set(key, vậtThểTiếpThị);
      return Response.redirect(liênKếtUTM, 307);
    } else {
      return ctx.renderNotFound();
    } 
  },
  async POST(req, ctx) {
    const kv = await Deno.openKv();
    const đuôiRútGọn = ctx.params.slug;
    const vậtThểTiếpThị = await req.json() as VậtThểTiếpThị;
    await kv.set(["Đuôi rút gọn", đuôiRútGọn], vậtThểTiếpThị);

    return new Response(JSON.stringify(vậtThểTiếpThị, null, 2));
  },
};
