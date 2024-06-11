import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTừCSV from "./b. Tạo từ CSV.ts";
import { BàiĐăng } from "../../Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { ThôngTinCấuHìnhNơiĐăng } from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { đổiTừCơSố10SangCơSố64 } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm xử lý chuỗi.ts";
import { tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng } from "./c. Tạo từ cấu hình nơi đăng.ts";

export async function tạoDanhSáchBàiĐăng(danhSáchThôngTinCấuHìnhNơiĐăng: ThôngTinCấuHìnhNơiĐăng[]): Promise<BàiĐăng[]> {
  const danhSáchBàiĐăngĐãCóId: BàiĐăng[] = [];
  const danhSáchBàiĐăngChưaCóId = [
    ...await tạoDanhSáchBàiĐăngTrênVault(),
    ...await tạoDanhSáchBàiĐăngTừCSV(),
  ];
  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình === "test") continue;
    danhSáchBàiĐăngChưaCóId.push(...await tạoDanhSáchBàiĐăngTừCấuHìnhNơiĐăng(thôngTinCấuHình.cấuHình));
  }
  let sốBàiĐăngChưaCóId = 0;
  for (const bàiĐăngChưaCóId of danhSáchBàiĐăngChưaCóId) {
    // let id: string;
    // const vậtThểId = await xácĐịnhIdTrênLocal("bài đăng", bàiĐăngChưaCóId);
    // if (vậtThểId.cáchXácĐịnh !== 3) {
    //   id = vậtThểId.idGợiÝ;
    // } else {
    //   sốBàiĐăngChưaCóId += 1;
    //   id = đổiTừCơSố10SangCơSố64(sốBàiĐăngChưaCóId);
    // }
    danhSáchBàiĐăngĐãCóId.push({
      ...bàiĐăngChưaCóId,
      id: đổiTừCơSố10SangCơSố64(sốBàiĐăngChưaCóId),
      // id: id,
      // vậtThểId: vậtThểId,
    });
    sốBàiĐăngChưaCóId += 1;
  }
  console.log(sốBàiĐăngChưaCóId);
  return danhSáchBàiĐăngĐãCóId;
}
