import { parse } from "$std/yaml/mod.ts";
import { writeText } from "https://deno.land/x/copy_paste/mod.ts";
import CấuHìnhNơiĐăng from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import {
  THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT,
  TÊN_MIỀN_RÚT_GỌN,
  ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV,
} from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import tạoDanhSáchNơiĐăng from "./B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/2.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import tạoThamSốUTMVàLiênKếtRútGọn from "./B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import tạoDanhSáchBàiĐăngTrênVault from "./B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import tạoDanhSáchBàiĐăngTrênWordPress from "./B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/b.%20L%E1%BA%A5y%20t%E1%BB%AB%20WordPress.ts";

const kv = await Deno.openKv();

const danhSáchBàiĐăng =
  (await tạoDanhSáchBàiĐăngTrênVault(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT))
    .concat(
      await tạoDanhSáchBàiĐăngTrênWordPress(ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV),
    );
const cấuHìnhNơiĐăng = parse(
  Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng.yaml"),
) as CấuHìnhNơiĐăng;
const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng);

const bàiĐăng = danhSáchBàiĐăng.find((e) => e["Tiêu đề"].includes("Các buổi"));
const nơiĐăng = danhSáchNơiĐăng.find((e) =>
  e["Tên nơi đăng"].includes("Các buổi")
);
const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
  bàiĐăng!,
  nơiĐăng!,
  await chỉSốLầnĐăngTrước() + 1,
  cấuHìnhNơiĐăng,
);

const liênKếtUTM = thamSốUTMVàLiênKếtRútGọn["Liên kết UTM"];
const đuôiRútGọn = thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
const liênKếtRútGọn = `${TÊN_MIỀN_RÚT_GỌN}/${đuôiRútGọn}`;

// await kv.set(['Đuôi rút gọn', đuôiRútGọn], thamSốUTMVàLiênKếtRútGọn);

console.log(`Bài viết: %c${bàiĐăng!["Tiêu đề"]}`, "color: green");
console.log(`URL: %c${bàiĐăng!.url}`, "color: green");
console.table(thamSốUTMVàLiênKếtRútGọn["Tham số UTM"]);
console.log("Liên kết UTM:", liênKếtUTM);
await writeText(liênKếtRútGọn);
console.log(
  `Liên kết rút gọn (đã được chép vào clipboard): %c${liênKếtRútGọn}`,
  "color: green",
);
console.log("Xong");

async function chỉSốLầnĐăngTrước(): Promise<number> {
  const iter = kv.list({ prefix: ["users"] });
  const users = [];
  for await (const res of iter) users.push(res);
  return 3;
  return users[0].value as number;
}
