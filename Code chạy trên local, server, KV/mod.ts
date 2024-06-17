import { kvSignal, readUnitSignal, writeUnitSignal } from "./Signal KV.ts";
import { kvGet, kvList } from "./Hàm cho KV.ts";
import { tạoBàiĐăng, tạoNơiĐăng, xoáDữLiệuTrênKv } from "./Tạo dữ liệu.ts";
import { tạoCache } from "./Hàm cho cache.ts";

// await chạyTrênDeployChứKhôngChạyTrênLocal();
// await copyDữLiệuTrênDeployXuốngLocal();

// await xoáDữLiệuTrênKv();
// console.log("🚀 ~ await kvList({ prefix: [] }):", await kvList({ prefix: [] }));

// await tạoCache();
await tạoBàiĐăng();
await tạoNơiĐăng();

console.log("Số read unit", readUnitSignal.value);
console.log("Số write unit", writeUnitSignal.value);

// const a = await kvList({ prefix: ["Đuôi rút gọn"] });
// for (const entry of a) {
//   console.log(entry.key);
//   console.log(entry.value["Đuôi rút gọn"]);
// }

// debugger;
