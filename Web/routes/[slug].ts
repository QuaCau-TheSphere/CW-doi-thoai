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
    slug: "qcpg",
    source: "F Pg Quả Cầu",
    medium: "social" 
  },
  {
    slug: "qcpr",
    source: "F Pr Quả Cầu",
    medium: "social" 
  },
] 
export const handler: Handlers = {
	GET(req, ctx) {
    try {
      const slug = ctx.params.slug
      const utmParam = slugs.filter(paramSet => paramSet.slug === slug)[0] 
      const utmLink = builder('https://quảcầu.cc', utmParam.source, utmParam.medium, 'A Vùng đất Quả Cầu', utmParam.content, utmParam.term);
      return Response.redirect(utmLink, 307);
    } catch {
      return ctx.renderNotFound() 
    } 
  }
}
