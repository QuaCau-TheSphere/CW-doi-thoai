import { Handlers } from "$fresh/server.ts";
import { generateFreshHandlers } from "https://deno.land/x/kv_api@0.0.3/mod.ts";

export const handler: Handlers = generateFreshHandlers({
  prefix: "/kv",
});
