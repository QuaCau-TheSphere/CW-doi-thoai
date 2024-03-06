import { Handlers } from "$fresh/server.ts"
import builder from 'npm:utm-builder';

interface UtmParam {
  slug: string,
  source: string,
  medium: string,
  content?: string
  term?: string,
} 
const slugs: UtmParam[] = [
  {
    slug: "j2team",
    source: "F G J2TEAM",
    medium: "social" 
  },
] 
export const handler: Handlers = {
	GET(req, ctx) {
    try {
      const slug = ctx.params.slug
      const utmParam = slugs.filter(paramSet => paramSet.slug === slug)[0] 
      const utmLink = builder('https://quảcầu.cc/cac-buoi-dap-ung-nhu-cau-hoc-cach-su-dung-cong-cu-va-tu-duy-lap-trinh-cho-nhu-cau-ca-nhan-hoac-nghien-cuu/', utmParam.source, utmParam.medium, 'A Vùng đất Quả Cầu', utmParam.content, utmParam.term);
      return Response.redirect(utmLink, 307);
    } catch {
      return ctx.renderNotFound() 
    } 
  }
}
