import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
import { Handlers } from "$fresh/server.ts";
import esthetic from "npm:esthetic";
import { load } from "$std/dotenv/mod.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const url = ctx.url.searchParams.get("url");
    if (!url) return new Response("");
    console.log("URL được gửi lên server:", url);
    let html = await (await fetch(url)).text();
    const document = new DOMParser().parseFromString(html, "text/html");
    const title = document.querySelector("title")?.textContent;
    if (title === "Log in to Facebook") html = await htmlTừProxy(url);
    // return new Response(html);
    return new Response(esthetic.html(html));
  },
};

async function htmlTừProxy(url: string) {
  const env = await load();
  const urlProxy = new URL(env["PROXY"]);
  urlProxy.search = new URLSearchParams({ url: url.toString() }).toString();
  return (await fetch(urlProxy)).text();
}
