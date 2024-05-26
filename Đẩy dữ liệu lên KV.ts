import { load } from "$std/dotenv/mod.ts";
import { đẩyBàiĐăngLênKV, đẩyNơiĐăngLênKV } from "./Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import { wipeKvStore } from "https://deno.land/x/kv_utils@1.1.1/mod.ts";

const env = await load();
Deno.env.set("DENO_KV_ACCESS_TOKEN", env["DENO_KV_ACCESS_TOKEN"]);
const mapKV = new Map();
// mapKV.set("Cloud", await Deno.openKv(env["LOCATION"]));
mapKV.set("Local", await Deno.openKv());
await xoáDữLiệuTrênKv();

await đẩyNơiĐăngLênKV(mapKV);
await đẩyBàiĐăngLênKV(mapKV);

// const sốLượngDữLiệu = (await kv.get(["Số lượng dữ liệu"])).value;
// console.log(sốLượngDữLiệu.get("Bài đăng"));

async function xoáDữLiệuTrênKv() {
  const result = await wipeKvStore();

  if (!result.ok) {
    const keysWhichWereNotDeleted = result.failedKeys;
    console.log(keysWhichWereNotDeleted);
  }
  console.log("Đã xoá sạch");
}

// debugger;
