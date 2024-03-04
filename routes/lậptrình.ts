import { Handlers } from "$fresh/server.ts"
import builder from 'npm:utm-builder';

export const handler: Handlers = {
	GET(_req, ctx) {
    try {
      const utmLink = builder('https://quảcầu.cc/cac-buoi-dap-ung-nhu-cau-hoc-cach-su-dung-cong-cu-va-tu-duy-lap-trinh-cho-nhu-cau-ca-nhan-hoac-nghien-cuu/', 'Discord ooker » About me', 'chat', 'A Vùng đất Quả Cầu');
      return Response.redirect(utmLink, 307);
    } catch {
      return ctx.renderNotFound() 
    } 
  }
}
