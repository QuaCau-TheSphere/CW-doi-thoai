import { load } from "$std/dotenv/mod.ts";
import { kvSignal, readUnitSignal, writeUnitSignal } from "./Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Signal KV.ts";
import { xoáDữLiệuTrênKv, đẩyBàiĐăngLênKV, đẩyNơiĐăngLênKV } from "./Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";

const env = await load();
Deno.env.set("DENO_KV_ACCESS_TOKEN", env["DENO_KV_ACCESS_TOKEN"]);
// kvSignal.value = await Deno.openKv(env["API"]);

// await xoáDữLiệuTrênKv();

await đẩyNơiĐăngLênKV();
await đẩyBàiĐăngLênKV();

console.log("Số read unit", readUnitSignal.value);
console.log("Số write unit", writeUnitSignal.value);
// const sốLượngDữLiệu = (await kv.get(["Số lượng dữ liệu"])).value;
// console.log(sốLượngDữLiệu.get("Bài đăng"));

// debugger;
