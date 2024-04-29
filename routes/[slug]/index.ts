// deno-fmt-ignore-file
import { Handlers } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../../utils/Kiểu cho web.ts";

const kv = await Deno.openKv();
export const handler: Handlers = {
  async GET(req, ctx) {
    const đuôiRútGọn = ctx.params.slug;
    const serverGet = await kv.get(["Đuôi rút gọn", đuôiRútGọn]);
    const vậtThểTiếpThị = serverGet.value as VậtThểTiếpThị;
    req.headers
    if (vậtThểTiếpThị) {
      const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
      thêmThờiĐiểmTruyCập() 
      return Response.redirect(liênKếtUTM, 307);
    } else {
      return ctx.renderNotFound();
    }

    function thêmThờiĐiểmTruyCập(){
      const bâyGiờ = new Date()
      const năm = bâyGiờ.getFullYear() 
      const tháng = bâyGiờ.getMonth() 
      const ngày = bâyGiờ.getDay() 
      const giờ = bâyGiờ.getHours() 
    
      if (vậtThểTiếpThị["Các lần truy cập"] === undefined)                                                      vậtThểTiếpThị["Các lần truy cập"] = {} 
      if (vậtThểTiếpThị["Các lần truy cập"][năm] === undefined)                                                 vậtThểTiếpThị["Các lần truy cập"][năm] = {} 
      if (vậtThểTiếpThị["Các lần truy cập"][năm][`Tháng ${tháng}`] === undefined)                               vậtThểTiếpThị["Các lần truy cập"][năm][`Tháng ${tháng}`] = {} 
      if (vậtThểTiếpThị["Các lần truy cập"][năm][`Tháng ${tháng}`][`Ngày ${ngày}`] === undefined)               vậtThểTiếpThị["Các lần truy cập"][năm][`Tháng ${tháng}`][`Ngày ${ngày}`] = {} 
      if (vậtThểTiếpThị["Các lần truy cập"][năm][`Tháng ${tháng}`][`Ngày ${ngày}`][`${giờ} giờ`] === undefined) vậtThểTiếpThị["Các lần truy cập"][năm][`Tháng ${tháng}`][`Ngày ${ngày}`][`${giờ} giờ`] = []
      
      vậtThểTiếpThị["Các lần truy cập"][năm][`Tháng ${tháng}`][`Ngày ${ngày}`][`${giờ} giờ`].push({'Thời điểm': bâyGiờ, header: req.headers})
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
