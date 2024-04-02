import { kv } from "./Code hỗ trợ.ts";
const url = "http://localhost:8000/kv/?key=preferences,ada";
const resFetch = await fetch(url);
console.log("resFetch:", await resFetch.json());
// await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(value),
//   });

// async function kiểmTraCSDL(liênKếtRútGọn) {
//   const res = await fetch(liênKếtRútGọn)
//   const thamSốUTMVàLiênKếtRútGọn = JSON.parse(res) as ThamSốUTMVàLiênKếtRútGọn
// }

// const all = await Array.fromAsync(kv.list({ prefix: [] }));
// const res = await kv.set(["preferences", "ada"], "sdfsdf");
// console.log(res.versionstamp); // "00a44a3c3e53b9750000"
const resDeno = await kv.get(["preferences", "ada"]);
console.log("resDeno:", resDeno);

// const all1 = await Array.fromAsync(kv.list({ prefix: ["preferences"] }));
// console.log("🚀 ~ all:", all);
// console.log(get1);
// console.log(all1);
// console.log();
// const a = await kv.get(["Phần rút gọn", "chưaLàmLiênKếtRútGọn"]);
// console.log(JSON.stringify(a));
debugger;

// async function ghiLênCSDL(keys: string[], value: ThamSốUTMVàLiênKếtRútGọn) {
//   const url = new URL(`${TÊN_MIỀN_RÚT_GỌN}/kv`);
//   url.searchParams.set("key", keys.join());

//   await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(value),
//   });
//   return url;
// }
// async function kiểmTraCSDL(liênKếtRútGọn) {
//   const res = await fetch(liênKếtRútGọn);
//   const thamSốUTMVàLiênKếtRútGọn = JSON.parse(res) as ThamSốUTMVàLiênKếtRútGọn;
//   if (condition) {
//   }
// }
// useEffect(() => {
//   const url = ghiLênCSDL(
//     ["Đuôi rút gọn", đuôiRútGọn],
//     thamSốUTMVàLiênKếtRútGọn,
//   ).then().catch(
//     (e) => console.error(e),
//   );
// }, []);
