import { viếtHoa, đổiTừCơSố10SangCơSố64 } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { BàiĐăng, BàiĐăngChưaCóId, PhươngThứcTạoBàiĐăng } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { PhươngThứcTạoNơiĐăng, ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Kiểu cho nơi đăng.ts";
import { kvGet, kvGetSốLượngDữLiệu, kvSet, tạoKeyKV } from "./Hàm cho KV.ts";

export interface VậtThểId {
  idGợiÝ: string;
  cáchXácĐịnh: number;
  giảiThích: string;
}
/**
 * Việc tạo Id chỉ vào lúc trước khi dữ liệu được đẩy lên KV từ local, hoặc khi người dùng tạo mới trên client. Không tạo id khi mới lấy URL, để tránh tình trạng tạo og xong thì người dùng không làm nữa
 * Id cần ngắn nhất có thể để nếu không tạo được Slug có ý nghĩa thì id sẽ được dùng để tạo đuôi rút gọn
 */
export async function xácĐịnhIdTrênLocal(
  tênDanhSách: TênDanhSách,
  dữLiệu: BàiĐăngChưaCóId | BàiĐăng | ThôngTinNơiĐăngChưaCóId | ThôngTinNơiĐăng,
): Promise<VậtThểId> {
  if ("id" in dữLiệu) {
    const idGợiÝ = (dữLiệu as BàiĐăng | ThôngTinNơiĐăng).id;
    return {
      idGợiÝ: idGợiÝ,
      cáchXácĐịnh: 0,
      giảiThích: "Dữ liệu đã có sẵn id",
    };
  }

  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = (await kvGet(key, "xácĐịnhIdTrênLocal trong Hàm cho id.ts")).value as BàiĐăng | ThôngTinNơiĐăng | undefined | null;
  if (value && value.id) {
    return {
      idGợiÝ: value.id,
      cáchXácĐịnh: 1,
      giảiThích:
        "Dữ liệu đầu vào không có sẵn id. Tạo key từ dữ liệu này rồi kiểm tra trên KV thì thấy đã có dữ liệu trên đó với key này, và dữ liệu này đã có sẵn id",
    };
  }

  let tổngSốĐangCó = 0;
  const sốLượngĐangCó = await kvGetSốLượngDữLiệu(viếtHoa(tênDanhSách) as TênBảng) as SốLượngBàiĐăng | SốLượngNơiĐăng | null;
  if (sốLượngĐangCó) {
    console.log("🚀 ~ Object.values(sốLượngĐangCó):", Object.values(sốLượngĐangCó));
    tổngSốĐangCó = Object.values(sốLượngĐangCó).reduce((sum, i) => sum + i, 0);
  }
  console.log(`Tổng số ${tênDanhSách} đang có:`, tổngSốĐangCó);
  if (tổngSốĐangCó) {
    return {
      idGợiÝ: đổiTừCơSố10SangCơSố64(tổngSốĐangCó + 1),
      cáchXácĐịnh: 2,
      giảiThích:
        "Dữ liệu đầu vào không có sẵn id. Tạo key từ dữ liệu này rồi kiểm tra trên KV thì cũng không thấy có dữ liệu nào trên đó với key này. Dùng tổng số entry hiện tại rồi cộng thêm 1 ",
    };
  }

  return {
    idGợiÝ: đổiTừCơSố10SangCơSố64(Date.now()),
    cáchXácĐịnh: 3,
    giảiThích:
      'Dữ liệu đầu vào không có sẵn id. Tạo key từ dữ liệu này rồi kiểm tra trên KV thì cũng không thấy có dữ liệu nào trên đó với key này. Trên KV không có key `["Số lượng dữ liệu"]`. Tạo id đơn thuần bằng ngày tháng',
  };
}

export type TênBảng = "Nơi đăng" | "Bài đăng" | "Đuôi rút gọn";
export type SốLượngBàiĐăng = Record<PhươngThứcTạoBàiĐăng, number>;
export type SốLượngNơiĐăng = Record<PhươngThứcTạoNơiĐăng, number>;

type KeyLấySốLượngBàiĐăngHoặcNơiĐăng = ["Bài đăng", PhươngThứcTạoBàiĐăng] | ["Nơi đăng", PhươngThứcTạoNơiĐăng];

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
