const kv = await Deno.openKv("./testkv");
// const all = await Array.fromAsync(kv.list({ prefix: [] }));
const res = await kv.set(["preferences", "ada"], "sdfsdf");
console.log(res.versionstamp); // "00a44a3c3e53b9750000"
const a = await kv.get(["preferences", "ada"]);
// const all1 = await Array.fromAsync(kv.list({ prefix: ["preferences"] }));
// console.log("🚀 ~ all:", all);
// console.log(get1);
// console.log(all1);
// console.log();
// const a = await kv.get(["Phần rút gọn", "chưaLàmLiênKếtRútGọn"]);
console.log(JSON.stringify(a));
debugger;
