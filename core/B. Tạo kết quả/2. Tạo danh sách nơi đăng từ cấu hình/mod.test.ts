import CấuHìnhNơiĐăng, {
  LoạiNơiĐăng,
  NơiĐăng,
  TênNềnTảng,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { parse } from "$std/yaml/mod.ts";
import { join } from "$std/path/join.ts";
import { LoạiNềnTảng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import tạoDanhSáchNơiĐăng from "./mod.ts";

const danhSáchNơiĐăngTổng: NơiĐăng[] = [];
const folder = "./core/A. Cấu hình/Nơi đăng";
for (const file of Deno.readDirSync(folder)) {
  if (!file.isFile) continue;
  const fullPath = join(folder, file.name);
  //deno-fmt-ignore
  const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync(fullPath)) as CấuHìnhNơiĐăng;
  const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng);
  danhSáchNơiĐăngTổng.push(...danhSáchNơiĐăng);
}
console.log("🚀 ~ danhSáchNơiĐăngTổng:", danhSáchNơiĐăngTổng);
// interface CấuHìnhThiếtLậpChung {
//   "Vị trí": CấuHìnhVịTrí;
//   "Vị trí nhỏ hơn"?: Record<string, string[]>;
// }
// type CấuHìnhVịTrí = {
//   "Nơi đăng": [LoạiNềnTảng, TênNềnTảng, ...LoạiNơiĐăng];
//   "Vị trí": string[];
// }[];
// function làCùngVịTrí(
//   nơiĐăngĐangXét: NơiĐăng,
//   vịTríĐangXét: CấuHìnhVịTrí[number]["Nơi đăng"],
// ) {
//   const {
//     "Loại nền tảng": loạiNềnTảng,
//     "Tên nền tảng": tênNềnTảng,
//     "Loại nơi đăng": loạiNơiĐăng,
//   } = nơiĐăngĐangXét;

//   const vịTríCủaNơiĐăngĐangXét = [loạiNềnTảng, tênNềnTảng, ...loạiNơiĐăng];
//   console.log({
//     "vịTríĐangXét": vịTríĐangXét,
//     "nơiĐăngĐangXét": nơiĐăngĐangXét,
//   });
//   for (const i in vịTríĐangXét) {
//     if (vịTríĐangXét[i] !== vịTríCủaNơiĐăngĐangXét[i]) return false;
//   }
//   return true;
// }

// //deno-fmt-ignore
// const {"Vị trí": cấuHìnhVịTrí, "Vị trí nhỏ hơn": vịTríNhỏHơn} = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml')) as CấuHìnhThiếtLậpChung
// for (const vịTrí of cấuHìnhVịTrí) {
//   const vịTríĐangXét = vịTrí["Nơi đăng"];
//   // const lọc = danhSáchNơiĐăngTổng.filter((nơiĐăng) => {
//   // làCùngVịTrí(nơiĐăng, vịTríĐangXét);
//   // const a = làCùngVịTrí(nơiĐăng, vịTríĐangXét);
//   // if (!a) {
//   //   console.log({
//   //     "vịTríĐangXét": vịTríĐangXét,
//   //     "nơiĐăng": nơiĐăng,
//   //   });
//   //   console.log(a);
//   // }
//   // return a;
//   // });
//   // console.log(vịTríĐangXét, lọc);
// }

// const filteredList = danhSáchNơiĐăngTổng.filter((i) =>
//   i["Tên nền tảng"] === "Discord"
//   // i["Tên nền tảng"] === "Discord" && i["Loại nơi đăng"][2] === "Forum post"
// );
// for (const nơiĐăng of filteredList) {
//   console.log(nơiĐăng["Loại nơi đăng"], nơiĐăng["Tên nơi đăng"]);
// }
// console.log("🚀 ~ a:", filteredList);
// // console.log(JSON.stringify(a, null, 2));
// console.log("done");
