import ThamSốUTM, { ĐuôiRútGọn } from "./Tạo liên kết UTM/Kiểu cho tham số UTM.ts";
import { NơiĐăngCóMộtVịTríCụThể } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { DữLiệuTruyCậpCácNăm } from "./Hàm và kiểu cho biểu đồ.ts";
import {
  BàiĐăng,
  BàiĐăngChưaCóId,
  URLString,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { LoạiNềnTảng, TênNềnTảng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import {
  NơiĐăngCóCácLựaChọnVịTrí,
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { TênDanhSách } from "./Hàm và kiểu cho khung nhập.ts";
import { kiểmTraBàiĐăngHoặcNơiĐăngĐãCó } from "./Hàm và kiểu cho API server.ts";
import { viếtHoa, đổiTừCơSố10SangCơSố64 } from "./Hàm xử lý chuỗi.ts";
import { TableName } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";
export interface VậtThểTiếpThị extends ThamSốUTM {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăngCóMộtVịTríCụThể;
  "Thời điểm tạo": Date;
  "Các lần truy cập": DữLiệuTruyCậpCácNăm;
  "Đuôi rút gọn": ĐuôiRútGọn;
  "Lần đăng": number;
}

/**
 * Chuyển cấu trúc từ formData trên web sang BàiĐăng hoặc NơiĐăngChưaXácĐịnhVịTrí
 */
export async function tạoVậtThểDữLiệuMới(formData: Record<string, FormDataEntryValue>, tênDanhSách: TênDanhSách) {
  let dữLiệuChưaCóId: BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId;
  switch (tênDanhSách) {
    case "bài đăng": {
      const {
        URL: url,
        "Tiêu đề": tiêuĐề,
        "Mô tả bài đăng": môTảBàiĐăng,
        "Tên dự án": dựÁn,
        Website: vault,
      } = formData as Record<string, string>;
      dữLiệuChưaCóId = {
        URL: url,
        "Tiêu đề": tiêuĐề,
        "Dự án": {
          "Mã dự án": undefined,
          "Tên dự án": dựÁn,
        },
        "Slug": undefined,
        "Nội dung bài đăng": {
          "Mô tả bài đăng": môTảBàiĐăng,
          "Toàn bộ nội dung": undefined,
          "Định dạng nội dung": undefined,
        },
        Vault: vault,
      } satisfies BàiĐăngChưaCóId;
      break;
    }
    case "nơi đăng": {
      const {
        URL: url,
        "Tên nơi đăng": tênNơiĐăng,
        "Loại nơi đăng": loạiNơiĐăng,
        "Tên nền tảng": tênNềnTảng,
        "Mô tả nơi đăng": môTảNơiĐăng,
        "Loại nền tảng": loạiNềnTảng,
        "Vị trí có thể đăng": vịTríCóThểĐăng,
      } = formData as Record<string, string>;
      dữLiệuChưaCóId = {
        URL: url as URLString,
        "Tên nơi đăng": JSON.parse(tênNơiĐăng),
        "Loại nơi đăng": JSON.parse(loạiNơiĐăng),
        "Tên nền tảng": tênNềnTảng as TênNềnTảng,
        "Mô tả nơi đăng": môTảNơiĐăng,
        "Loại nền tảng": loạiNềnTảng as LoạiNềnTảng,
        "Vị trí có thể đăng": JSON.parse(vịTríCóThểĐăng),
      };
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
