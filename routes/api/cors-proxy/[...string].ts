import { Handlers } from "$fresh/server.ts";
import esthetic from "npm:esthetic";
import { appendSlashToUrlIfIsPossible } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm và kiểu cho URL.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const url = ctx.url.searchParams.get("url");
    if (!url) return new Response("");
    console.log("URL được gửi lên cors proxy:", url);
    const html = await (await fetch(appendSlashToUrlIfIsPossible(url))).text();
    return new Response(html);
    return new Response(esthetic.html(html));
  },
};
