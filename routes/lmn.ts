import { Handlers } from "$fresh/server.ts"
import builder from 'npm:utm-builder';

export const handler: Handlers = {
	GET(_req, ctx) {
    try {
      const utmLink = builder('https://xn--qucu-hr5aza.cc/gioi-thieu-nguoi-sang-lap/', 'Discord ooker » About me', 'chat', 'A Vùng đất Quả Cầu');
      return Response.redirect(utmLink, 307);
    } catch {
      return ctx.renderNotFound() 
    } 
  }
}
