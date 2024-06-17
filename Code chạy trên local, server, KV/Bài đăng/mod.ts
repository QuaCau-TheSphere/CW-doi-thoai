import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTừCSV from "./b. Tạo từ CSV.ts";
import tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng from "./c. Tạo từ cấu hình nơi đăng.ts";
import { BàiĐăng } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "../Hàm và kiểu cho cấu hình.ts";
import { đổiTừCơSố10SangCơSố64 } from "../../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";

export default async function tạoDanhSáchBàiĐăng(): Promise<BàiĐăng[]> {
  const danhSáchBàiĐăngĐãCóId: BàiĐăng[] = [];
  const danhSáchBàiĐăngChưaCóId = [
    ...await tạoDanhSáchBàiĐăngTrênVault(),
    ...await tạoDanhSáchBàiĐăngTừCSV(),
  ];
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình === "test") continue;
    danhSáchBàiĐăngChưaCóId.push(...await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(thôngTinCấuHình.cấuHình));
  }
  let sốBàiĐăngChưaCóId = 0;
  for (const bàiĐăngChưaCóId of danhSáchBàiĐăngChưaCóId) {
    danhSáchBàiĐăngĐãCóId.push({
      ...bàiĐăngChưaCóId,
      id: đổiTừCơSố10SangCơSố64(sốBàiĐăngChưaCóId),
    });
    sốBàiĐăngChưaCóId += 1;
  }
  console.log(sốBàiĐăngChưaCóId);
  return danhSáchBàiĐăngĐãCóId;
}

// console.log(await tạoDanhSáchBàiĐăng());
