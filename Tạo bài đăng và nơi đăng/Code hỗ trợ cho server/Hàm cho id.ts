import { viếtHoa, đổiTừCơSố10SangCơSố64 } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { BàiĐăng, BàiĐăngChưaCóId } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Kiểu cho nơi đăng.ts";
import { kvGet, kvGetCount, TableName, tạoKeyKV } from "./Hàm cho KV.ts";

export interface VậtThểId {
  id: string;
  cáchXácĐịnh: number;
  giảiThích: string;
}
/**
 * Việc tạo Id chỉ vào lúc trước khi dữ liệu được đẩy lên KV từ local, hoặc khi người dùng tạo mới trên client. Không tạo id khi mới lấy URL, để tránh tình trạng tạo og xong thì người dùng không làm nữa
 * Id cần ngắn nhất có thể để nếu không tạo được mã bài đăng có ý nghĩa thì id sẽ được dùng để tạo đuôi rút gọn
 */
export async function xácĐịnhIdTrênLocal(
  tênDanhSách: TênDanhSách,
  dữLiệu: BàiĐăngChưaCóId | BàiĐăng | ThôngTinNơiĐăngChưaCóId | ThôngTinNơiĐăng,
): Promise<VậtThểId> {
  if ("id" in dữLiệu) {
    const id = (dữLiệu as BàiĐăng | ThôngTinNơiĐăng).id;
    return {
      id: id,
      cáchXácĐịnh: 0,
      giảiThích: "Dữ liệu đã có sẵn id",
    };
  }

  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = (await kvGet(key)).value as BàiĐăng | ThôngTinNơiĐăng | undefined | null;
  if (value && value.id) {
    return {
      id: value.id,
      cáchXácĐịnh: 1,
      giảiThích:
        "Dữ liệu đầu vào không có sẵn id. Tạo key từ dữ liệu này rồi kiểm tra trên KV thì thấy đã có dữ liệu trên đó với key này, và dữ liệu này đã có sẵn id",
    };
  }

  const tổngSốEntryHiệnTại = await kvGetCount(viếtHoa(tênDanhSách) as TableName);
  console.log("🚀 ~ tổngSốEntryHiệnTại:", tổngSốEntryHiệnTại);
  if (tổngSốEntryHiệnTại) {
    return {
      id: đổiTừCơSố10SangCơSố64(tổngSốEntryHiệnTại + 1),
      cáchXácĐịnh: 2,
      giảiThích:
        "Dữ liệu đầu vào không có sẵn id. Tạo key từ dữ liệu này rồi kiểm tra trên KV thì cũng không thấy có dữ liệu nào trên đó với key này. Dùng tổng số entry hiện tại rồi cộng thêm 1 ",
    };
  }

  return {
    id: đổiTừCơSố10SangCơSố64(Date.now()),
    cáchXácĐịnh: 3,
    giảiThích:
      'Dữ liệu đầu vào không có sẵn id. Tạo key từ dữ liệu này rồi kiểm tra trên KV thì cũng không thấy có dữ liệu nào trên đó với key này. Trên KV không có key `["Số lượng dữ liệu"]`. Tạo id đơn thuần bằng ngày tháng',
  };
}
