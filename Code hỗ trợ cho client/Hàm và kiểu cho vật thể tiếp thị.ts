import ThamSốUTM, { ĐuôiRútGọn } from "./Tạo liên kết UTM/Kiểu cho tham số UTM.ts";
import { NơiĐăngCóMộtVịTríCụThể } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { DữLiệuTruyCậpCácNăm } from "./Hàm và kiểu cho biểu đồ.ts";
import { BàiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import tạoVậtThểUTM from "./Tạo liên kết UTM/Tạo tham số UTM.ts";
import { tạoĐuôiRútGọn } from "./Tạo liên kết UTM/Tạo đuôi rút gọn.ts";
import { CấuHìnhViếtTắt } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";

export interface VậtThểTiếpThị extends ThamSốUTM {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăngCóMộtVịTríCụThể;
  "Thời điểm tạo": Date;
  "Các lần truy cập": DữLiệuTruyCậpCácNăm;
  "Đuôi rút gọn": ĐuôiRútGọn;
  "Lần đăng": number;
}

interface ThamSốChoHàmTạoVậtThểTiếpThị {
  bàiĐăng: BàiĐăng;
  nơiĐăng: NơiĐăngCóMộtVịTríCụThể;
  lầnĐăng: number;
  cấuHìnhViếtTắt: CấuHìnhViếtTắt;
  bốiCảnh: string | undefined;
}

export function tạoVậtThểTiếpThị({ bàiĐăng, nơiĐăng, lầnĐăng, cấuHìnhViếtTắt, bốiCảnh }: ThamSốChoHàmTạoVậtThểTiếpThị): VậtThểTiếpThị {
  const thamSốUTMVàLiênKếtRútGọn = tạoVậtThểUTM(
    {
      bàiĐăng: bàiĐăng,
      nơiĐăng: nơiĐăng,
      bốiCảnh: bốiCảnh,
      cấuHìnhViếtTắt: cấuHìnhViếtTắt,
    },
  );

  return {
    "Bài đăng": bàiĐăng,
    "Nơi đăng": nơiĐăng,
    "Thời điểm tạo": new Date(),
    "Lần đăng": lầnĐăng,
    "Đuôi rút gọn": tạoĐuôiRútGọn(bàiĐăng, nơiĐăng, lầnĐăng, cấuHìnhViếtTắt),
    "Các lần truy cập": {},
    ...thamSốUTMVàLiênKếtRútGọn,
  };
}
