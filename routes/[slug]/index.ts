// deno-fmt-ignore-file
import { Handlers } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../../Code hỗ trợ cho client/Kiểu cho vật thể tiếp thị.ts";
import { Giờ, Ngày, Năm, Tháng } from "../../Code hỗ trợ cho client/Hàm và kiểu cho biểu đồ.ts";
import { kvGet, kvSet } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { cậpNhậtSốLượngĐuôiRútGọn } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho id và số lượng dữ liệu.ts";

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
  /** Người dùng truy cập để tới liên kết thực sự */
  async GET(req, ctx) {
    const đuôiRútGọn = ctx.params.slug;
    const key = ["Đuôi rút gọn", đuôiRútGọn]
    const vậtThểTiếpThị = (await kvGet(key, 'GET hander trong cors proxy')).value as VậtThểTiếpThị;
    const headers =  req.headers

    if (vậtThểTiếpThị) {
      const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
      thêmThờiĐiểmTruyCập(vậtThểTiếpThị, headers) 
      await kvSet(key, vậtThểTiếpThị, 'GET handler trong routes\\[slug]\\index.ts');
      await cậpNhậtSốLượngĐuôiRútGọn();
      return Response.redirect(liênKếtUTM, 307);
    } else {
      return ctx.renderNotFound();
    } 
  },

  /** Chương trình tạo liên kết rút gọn mới */
  async POST(req, ctx) {
    const đuôiRútGọn = ctx.params.slug;
    const vậtThểTiếpThị = await req.json() as VậtThểTiếpThị;
    await kvSet(["Đuôi rút gọn", đuôiRútGọn], vậtThểTiếpThị, 'POST handler trong routes\\[slug]\\index.ts');
    await cậpNhậtSốLượngĐuôiRútGọn();
    
    return new Response(JSON.stringify(vậtThểTiếpThị, null, 2));
  },
};
