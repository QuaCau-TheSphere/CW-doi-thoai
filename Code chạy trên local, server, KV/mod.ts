import { kvSignal, readUnitSignal, writeUnitSignal } from "./Signal KV.ts";
import { kvGet, kvList } from "./Hàm cho KV.ts";
import { copyDữLiệuTrênDeployXuốngLocal, tạoBàiĐăng, tạoNơiĐăng, xoáDữLiệuTrênKv } from "./Tạo dữ liệu.ts";
import { tạoCache } from "./Hàm cho cache.ts";
import { VậtThểTiếpThị } from "../Code chạy trên client/Hàm và kiểu cho vật thể tiếp thị.ts";

// await chạyTrênDeployChứKhôngChạyTrênLocal();
// await copyDữLiệuTrênDeployXuốngLocal();

// await xoáDữLiệuTrênKv();
// console.log("🚀 ~ await kvList({ prefix: [] }):", await kvList({ prefix: [] }));

await tạoCache();
await tạoBàiĐăng();
await tạoNơiĐăng();

// console.log("Số read unit", readUnitSignal.value);
// console.log("Số write unit", writeUnitSignal.value);

// const a = await kvList({ prefix: ["Đuôi rút gọn"] }) as Deno.KvEntry<VậtThểTiếpThị>[];
// for (const entry of a) {
//   if (entry.value["Đuôi rút gọn"] !== "webđốithoại.SNPO.1") continue;
//   console.log(entry.key);
//   // console.log(entry.value["Đuôi rút gọn"]);
//   console.log(entry.value["Các lần truy cập"]["2024"]);
// }

// debugger;
