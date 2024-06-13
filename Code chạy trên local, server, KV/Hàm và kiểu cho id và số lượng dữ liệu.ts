import { viếtHoa } from "../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../Code chạy trên client/Hàm và kiểu cho khung nhập.ts";
import { PhươngThứcTạoBàiĐăng } from "./Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { PhươngThứcTạoNơiĐăng } from "./Nơi đăng/Kiểu cho nơi đăng.ts";
import { kvGet, kvSet } from "./Hàm cho KV.ts";

export type TênBảng = "Nơi đăng" | "Bài đăng" | "Đuôi rút gọn";
export type SốLượngBàiĐăng = Record<PhươngThứcTạoBàiĐăng, number>;
export type SốLượngNơiĐăng = Record<PhươngThứcTạoNơiĐăng, number>;

export async function lấyTổngSốBàiĐăngHoặcNơiĐăngĐangCó(tênDanhSách: TênDanhSách) {
  let tổngSốĐangCó = 0;
  const sốLượngĐangCó = await lấySốLượngDữLiệu(tênDanhSách) as SốLượngBàiĐăng | SốLượngNơiĐăng | null;
  if (sốLượngĐangCó) {
    console.log("🚀 ~ Object.values(sốLượngĐangCó):", Object.values(sốLượngĐangCó));
    tổngSốĐangCó = Object.values(sốLượngĐangCó).reduce((sum, i) => sum + i, 0);
    console.log(`Tổng số ${tênDanhSách} đang có:`, tổngSốĐangCó);
    return tổngSốĐangCó;
  }
  return `Không có entry số lượng dữ liệu cho ${tênDanhSách} trong KV`;
}

export async function cậpNhậtSốLượngBàiĐăng(value: SốLượngBàiĐăng | PhươngThứcTạoBàiĐăng, delta: number = 1) {
  const key = ["Số lượng dữ liệu", "Bài đăng"];
  if (typeof value === "object") {
    await kvSet(key, value);
  } else if (typeof value === "string") {
    const sốLượngBàiĐăng = (await kvGet(key)).value as SốLượngBàiĐăng;
    const sốLượngBàiĐăngTạoTừPhươngThức = sốLượngBàiĐăng[value];
    sốLượngBàiĐăng[value] = sốLượngBàiĐăngTạoTừPhươngThức + delta;
    kvSet(key, sốLượngBàiĐăng);
  }
}

export async function cậpNhậtSốLượngNơiĐăng(value: SốLượngNơiĐăng | PhươngThứcTạoNơiĐăng, delta: number = 1) {
  const key = ["Số lượng dữ liệu", "Nơi đăng"];
  if (typeof value === "object") {
    await kvSet(key, value);
  } else if (typeof value === "string") {
    const sốLượngNơiĐăng = (await kvGet(key)).value as SốLượngNơiĐăng;
    const sốLượngNơiĐăngTạoTừPhươngThức = sốLượngNơiĐăng[value];
    sốLượngNơiĐăng[value] = sốLượngNơiĐăngTạoTừPhươngThức + delta;
    kvSet(key, sốLượngNơiĐăng);
  }
}

export async function cậpNhậtSốLượngĐuôiRútGọn(delta: number = 1) {
  const key = ["Số lượng dữ liệu", "Đuôi rút gọn"];
  const sốLượngĐangCó = (await kvGet(key, "cậpNhậtSốLượng")).value as number | null || 0;
  await kvSet(key, sốLượngĐangCó + delta, "cậpNhậtSốLượng");
}

export async function lấySốLượngDữLiệu(input: TênDanhSách | "Đuôi rút gọn", caller: string | undefined = undefined) {
  const tênBảng = viếtHoa(input);
  const value = (await kvGet(["Số lượng dữ liệu", tênBảng], caller)).value;

  switch (input) {
    case "Đuôi rút gọn":
      return value as number | null;
    default:
      return value as SốLượngBàiĐăng | SốLượngNơiĐăng | null;
  }
}
