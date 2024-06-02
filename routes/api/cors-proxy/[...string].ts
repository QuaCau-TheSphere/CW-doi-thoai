import { FreshContext, Handlers } from "$fresh/server.ts";
// import esthetic from "npm:esthetic";

function lọcUrlStringTừContext(ctx: FreshContext<Record<string, unknown>>) {
  const urlTrongContext = ctx.url.href;
  const temp = urlTrongContext.split("/api/cors-proxy/");
  temp.shift();
  return temp.join();
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const urlString = lọcUrlStringTừContext(ctx);
    console.log("URL được gửi lên cors proxy:", urlString);
    const html = await (await fetch(urlString)).text();
    // const prettyHTML = esthetic.html(html);
    // console.log("🚀 ~ GET ~ newLocal:", prettyHTML);
    // return new Response(prettyHTML);
    return new Response(html);
  },
};
