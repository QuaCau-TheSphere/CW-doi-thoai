import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = ctx.params.url;
    const res = await fetch(url);
    return res;
  },
};
