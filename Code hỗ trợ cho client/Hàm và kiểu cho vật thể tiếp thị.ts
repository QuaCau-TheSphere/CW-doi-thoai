import ThamSốUTM, { ĐuôiRútGọn } from "./Tạo liên kết UTM/Kiểu cho tham số UTM.ts";
import { NơiĐăngCóMộtVịTríCụThể } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { DữLiệuTruyCậpCácNăm, Giờ, Ngày, Năm, Tháng } from "./Hàm và kiểu cho biểu đồ.ts";
import { BàiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import tạoVậtThểUTM from "./Tạo liên kết UTM/Tạo tham số UTM.ts";
import { tạoĐuôiRútGọn } from "./Tạo liên kết UTM/Tạo đuôi rút gọn.ts";
import { CấuHìnhViếtTắt } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { bàiĐăngSignal, bốiCảnhSignal, cấuHìnhChungSignal, lầnĐăngHiệnTại, nơiĐăngCóMộtVịTríCụThểSignal } from "../islands/Signals tổng.ts";

export interface VậtThểTiếpThị extends ThamSốUTM {
  "Bài đăng": BàiĐăng;
  "Nơi đăng": NơiĐăngCóMộtVịTríCụThể;
  "Thời điểm tạo": Date;
  "Các lần truy cập": DữLiệuTruyCậpCácNăm;
  "Đuôi rút gọn": ĐuôiRútGọn;
  "Lần đăng": number;
}

interface ThamSốChoHàmTạoVậtThểTiếpThị {
  bàiĐăng: BàiĐăng | undefined;
  nơiĐăng: NơiĐăngCóMộtVịTríCụThể | undefined;
  lầnĐăng: number;
  cấuHìnhViếtTắt: CấuHìnhViếtTắt;
  bốiCảnh: string | undefined;
}

export function tạoVậtThểTiếpThị({ bàiĐăng, nơiĐăng, lầnĐăng, cấuHìnhViếtTắt, bốiCảnh }: ThamSốChoHàmTạoVậtThểTiếpThị = {
  bàiĐăng: bàiĐăngSignal.value,
  nơiĐăng: nơiĐăngCóMộtVịTríCụThểSignal.value,
  bốiCảnh: bốiCảnhSignal.value,
  cấuHìnhViếtTắt: cấuHìnhChungSignal.value["Viết tắt"],
  lầnĐăng: lầnĐăngHiệnTại.value,
}): VậtThểTiếpThị | void {
  if (!bàiĐăng || !nơiĐăng) return;
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

export function thêmThờiĐiểmTruyCập(vậtThểTiếpThị: VậtThểTiếpThị, headers: Headers) {
  const bâyGiờ = new Date();
  const năm = bâyGiờ.getFullYear().toString() as Năm;
  const tháng = (bâyGiờ.getMonth() + 1).toString() as Tháng;
  const ngày = bâyGiờ.getDate().toString() as Ngày;
  const giờ = bâyGiờ.getHours().toString() as Giờ;

  if (vậtThểTiếpThị["Các lần truy cập"] === undefined) vậtThểTiếpThị["Các lần truy cập"] = {};
  if (vậtThểTiếpThị["Các lần truy cập"][năm] === undefined) vậtThểTiếpThị["Các lần truy cập"][năm] = {};
  if (vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`] === undefined) vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`] = {};
  if (vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`] === undefined) {
    vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`] = {};
  }
  if (vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`]![`${giờ} giờ`] === undefined) {
    vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`]![`${giờ} giờ`] = [];
  }

  vậtThểTiếpThị["Các lần truy cập"][năm]![`Tháng ${tháng}`]![`Ngày ${ngày}`]![`${giờ} giờ`]!.push({ "Thời điểm": bâyGiờ, header: headers });
}
