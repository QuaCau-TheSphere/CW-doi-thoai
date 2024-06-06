import { load } from "$std/dotenv/mod.ts";
import { kvSignal, readUnitSignal, writeUnitSignal } from "./Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Signal KV.ts";
import { kvGet, kvList, tạoBàiĐăng, tạoNơiĐăng, xoáDữLiệuTrênKv } from "./Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { replaceLocalDataWithRemote } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";

const env = await load();
// await chạyTrênDeployChứKhôngChạyTrênLocal();
// await thayDữLiệuTrênLocalBằngDữLiệuTrênDeploy();

// await xoáDữLiệuTrênKv();
console.log("🚀 ~ await kvList({ prefix: [] }):", await kvList({ prefix: [] }));
await tạoBàiĐăng();
await tạoNơiĐăng();

console.log("Số read unit", readUnitSignal.value);
console.log("Số write unit", writeUnitSignal.value);

// debugger;

async function chạyTrênDeployChứKhôngChạyTrênLocal() {
  Deno.env.set("DENO_KV_ACCESS_TOKEN", env["DENO_KV_ACCESS_TOKEN"]);
  const api = `https://api.deno.com/databases/${env["KV_UUID"]}/connect`;
  kvSignal.value = await Deno.openKv(api);
}
async function thayDữLiệuTrênLocalBằngDữLiệuTrênDeploy() {
  console.log("thayDữLiệuTrênLocalBằngDữLiệuTrênDeploy");
  const remoteKvUrl = `https://api.deno.com/databases/${env["KV_UUID"]}/connect`;
  const result = await replaceLocalDataWithRemote(remoteKvUrl);

  if (!result.ok) {
    const failedKeys = result.failedKeys;
    // ...
  }
}
