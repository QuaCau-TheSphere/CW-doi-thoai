import { Handlers } from "$fresh/server.ts";
import esthetic from "npm:esthetic";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const url = ctx.url.searchParams.get("url");
    if (!url) return new Response("");
    console.log("URL được gửi lên cors proxy:", url);
    const html = await (await fetch(url)).text();
    return new Response(html);
    return new Response(esthetic.html(html));
  },
};
