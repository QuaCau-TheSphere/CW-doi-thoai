import { load } from "$std/dotenv/mod.ts";
import { kvSignal, readUnitSignal, writeUnitSignal } from "./Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Signal KV.ts";
import { xoáDữLiệuTrênKv, đẩyBàiĐăngLênKV, đẩyNơiĐăngLênKV } from "./Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { replaceLocalDataWithRemote } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";

const env = await load();
Deno.env.set("DENO_KV_ACCESS_TOKEN", env["DENO_KV_ACCESS_TOKEN"]);
// kvSignal.value = await Deno.openKv(env["API"]);

const remoteKvUrl = `https://api.deno.com/databases/${env["KV_UUID"]}/connect`;
const result = await replaceLocalDataWithRemote(remoteKvUrl);

if (!result.ok) {
  const failedKeys = result.failedKeys;
  // ...
}

// await xoáDữLiệuTrênKv();

await đẩyNơiĐăngLênKV();
await đẩyBàiĐăngLênKV();

console.log("Số read unit", readUnitSignal.value);
console.log("Số write unit", writeUnitSignal.value);
// const sốLượngDữLiệu = (await kv.get(["Số lượng dữ liệu"])).value;
// console.log(sốLượngDữLiệu.get("Bài đăng"));

// debugger;
