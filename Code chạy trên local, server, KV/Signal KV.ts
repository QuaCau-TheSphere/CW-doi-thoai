import { signal } from "@preact/signals";
// import { load } from "$std/dotenv/mod.ts";

// const env = await load();

// export const kvSignal = signal<Deno.Kv>(await Deno.openKv(env["DATABASE_URL"]));
export const kvSignal = signal<Deno.Kv>(await Deno.openKv());
export const readUnitSignal = signal(0);
export const writeUnitSignal = signal(0);
