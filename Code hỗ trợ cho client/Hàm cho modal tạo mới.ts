import { LoạiNềnTảng, TênNềnTảng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import {
  NơiĐăngCóCácLựaChọnVịTrí,
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { TênDanhSách } from "./Hàm và kiểu cho khung nhập.ts";
import { kiểmTraBàiĐăngHoặcNơiĐăngĐãCó } from "./Hàm và kiểu cho API server.ts";
import { viếtHoa, đổiTừCơSố10SangCơSố64 } from "./Hàm xử lý chuỗi.ts";
import { TableName } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
import {
  BàiĐăng,
  BàiĐăngChưaCóId,
  URLString,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";

/** @see tạoBàiĐăngTừURL */
function tạoBàiĐăngĐểNhậpLênKV(dữLiệuNgườiDùngNhậpTrongForm: Record<string, FormDataEntryValue>) {
  const {
    URL: url,
    "Tiêu đề": tiêuĐề,
    "Mô tả bài đăng": môTảBàiĐăng,
    "Tên dự án": dựÁn,
    Slug: slug,
  } = dữLiệuNgườiDùngNhậpTrongForm as Record<string, string>;
  return {
    URL: url,
    "Tiêu đề": tiêuĐề,
    "Dự án": {
      "Mã dự án": undefined,
      "Tên dự án": dựÁn,
    },
    "Slug": slug,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": môTảBàiĐăng,
      "Toàn bộ nội dung": undefined,
      "Định dạng nội dung": undefined,
    },
    "Phương thức tạo": "Người dùng nhập tay trên web",
  } satisfies BàiĐăngChưaCóId;
}

/** @see tạoNơiĐăngTừURL */
function tạoNơiĐăngĐểNhậpLênKV(dữLiệuNgườiDùngNhậpTrongForm: Record<string, FormDataEntryValue>) {
  const {
    URL: url,
    "Tên nơi đăng": tênNơiĐăng,
    "Mô tả nơi đăng": môTảNơiĐăng,
    "Loại nền tảng": loạiNềnTảng,
    "Vị trí có thể đăng": danhSáchVịTríCóThểĐăng,
    "Lĩnh vực": lĩnhVực,
    "Đơn vị quản lý": đơnVịQuảnLý,
  } = dữLiệuNgườiDùngNhậpTrongForm as Record<string, string>;
  return {
    URL: url as URLString,
    "Tên nơi đăng": JSON.parse(tênNơiĐăng),
    "Mô tả nơi đăng": môTảNơiĐăng,
    "Loại nền tảng": loạiNềnTảng as LoạiNềnTảng,
    "Phương thức tạo": "Người dùng nhập tay trên web",
    "Lĩnh vực": lĩnhVực.split(",").map((i) => viếtHoa(i)),
    "Vị trí có thể đăng": JSON.parse(danhSáchVịTríCóThểĐăng),
    "Đơn vị quản lý": đơnVịQuảnLý,
  } satisfies NơiĐăngCóCácLựaChọnVịTríChưaCóId;
}

async function xácĐịnhId(
  tênDanhSách: TênDanhSách,
  dữLiệuChưaCóId: BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId,
) {
  const res = await kiểmTraBàiĐăngHoặcNơiĐăngĐãCó({
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": dữLiệuChưaCóId,
  });
  console.log(res);
  if ("id" in res) return res.id;

  const tổngSốEntryHiệnTại = res.get(viếtHoa(tênDanhSách) as TableName);
  if (tổngSốEntryHiệnTại) return đổiTừCơSố10SangCơSố64(tổngSốEntryHiệnTại + 1);

  return đổiTừCơSố10SangCơSố64(Date.now());
}

/**
 * Chuyển từ dữLiệuNgườiDùngNhậpTrongForm sang BàiĐăng hoặc NơiĐăngChưaXácĐịnhVịTrí
 * Tất cả những gì nhập trong modal đều là dạng string
 */
export async function tạoVậtThểDữLiệuMới(dữLiệuNgườiDùngNhậpTrongForm: Record<string, FormDataEntryValue>, tênDanhSách: TênDanhSách) {
  let dữLiệuChưaCóId: BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId;
  switch (tênDanhSách) {
    case "bài đăng": {
      dữLiệuChưaCóId = tạoBàiĐăngĐểNhậpLênKV(dữLiệuNgườiDùngNhậpTrongForm);
      break;
    }
    case "nơi đăng": {
      dữLiệuChưaCóId = dữLiệuNgườiDùngNhậpTrongForm["Nâng cao"] as unknown as NơiĐăngCóCácLựaChọnVịTríChưaCóId;
      console.log("🚀 ~ tạoVậtThểDữLiệuMới ~ dữLiệuChưaCóId:", dữLiệuChưaCóId);
      break;
    }
  }
  const dữLiệuCóId: BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí = {
    ...dữLiệuChưaCóId,
    id: await xácĐịnhId(tênDanhSách, dữLiệuChưaCóId),
  };
  return {
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": dữLiệuCóId,
  };
}
