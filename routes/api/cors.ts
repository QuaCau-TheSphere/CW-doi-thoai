//refactor: không chỉ trả về html mà trả luôn bài đăng hoặc nơi đăng

import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { Handlers } from "$fresh/server.ts";
import esthetic from "npm:esthetic";
import { load } from "$std/dotenv/mod.ts";

function bịChặn(html: string) {
  const document = new DOMParser().parseFromString(html, "text/html");
  const title = document.querySelector("title")?.textContent;
  return title === "Log in to Facebook";
}

async function lấyHtmlTừProxy(url: string) {
  const env = await load();
  const urlProxy = new URL(env["PROXY"]);
  urlProxy.search = new URLSearchParams({ url: url.toString() }).toString();
  return (await fetch(urlProxy)).text();
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const url = ctx.url.searchParams.get("url");
    if (!url) return new Response("");
    console.log("URL được gửi lên server:", url);
    let html = await (await fetch(url)).text();
    if (bịChặn(html)) {
      html = await lấyHtmlTừProxy(url);
    }
    return new Response(html);
    // return new Response(esthetic.html(html));
  },
};
