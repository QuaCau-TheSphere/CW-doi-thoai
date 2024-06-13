import { Document, EnrichedDocumentSearchResultSetUnitResultUnit } from "npm:flexsearch";
import { StateUpdater } from "preact/hooks";
import { element } from "../islands/Signals tổng.ts";
import { NơiĐăngCóCácLựaChọnVịTrí, NơiĐăngCóMộtVịTríCụThể } from "../Code chạy trên local, server, KV/Nơi đăng/Hàm và kiểu cho vị trí.ts";
import { BàiĐăng } from "../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";

export type BốiCảnh = string | undefined;

export type FlexSearchBàiĐăngHoặcNơiĐăng = Document<BàiĐăng> | Document<NơiĐăngCóCácLựaChọnVịTrí>;
export type DanhSáchKếtQuảTìmKiếmType =
  | EnrichedDocumentSearchResultSetUnitResultUnit<BàiĐăng>[]
  | EnrichedDocumentSearchResultSetUnitResultUnit<NơiĐăngCóCácLựaChọnVịTrí>[]
  | undefined;
export type MụcĐượcChọn = BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí | undefined;
/** Cursor is the current highlighted item in the search list. It's undefined when the mouse leaves */
export type Cursor = number;

export type TênDanhSách = "nơi đăng" | "bài đăng";
export type ElementDùngTab = TênDanhSách | "bối cảnh" | "nút tạo liên kết";

export type SetNơiĐăng = StateUpdater<NơiĐăngCóCácLựaChọnVịTrí | NơiĐăngCóMộtVịTríCụThể | undefined>;
export type SetBàiĐăngHoặcNơiĐăng = StateUpdater<BàiĐăng | undefined> | SetNơiĐăng;

export function đổiKhungNhập(xuôiHayNgược: "xuôi" | "ngược") {
  const khungNhậpBàiĐăng = document.getElementById("khung-nhập-bài-đăng")!;
  const khungNhậpNơiĐăng = document.getElementById("khung-nhập-nơi-đăng")!;
  const khungNhậpBốiCảnh = document.getElementById("khung-nhập-bối-cảnh")!;
  const nútTạoLiênKết = document.getElementById("nút-tạo-liên-kết")!;

  const elementHiệnTại = element.value;
  switch (xuôiHayNgược) {
    case "xuôi":
      switch (elementHiệnTại) {
        case "bài đăng":
          element.value = "nơi đăng";
          khungNhậpNơiĐăng.focus();
          break;
        case "nơi đăng":
          element.value = "bối cảnh";
          khungNhậpBốiCảnh.focus();
          break;
        case "bối cảnh":
          element.value = "nút tạo liên kết";
          nútTạoLiênKết.focus();
          break;
        case "nút tạo liên kết":
          element.value = "bài đăng";
          khungNhậpBàiĐăng.focus();
          break;
      }
      break;
    case "ngược":
      switch (elementHiệnTại) {
        // case "nút tạo liên kết":
        //   element.value = "bối cảnh";
        //   khungNhậpBốiCảnh.focus();
        //   break;
        // case "bối cảnh":
        //   element.value = "nơi đăng";
        //   khungNhậpNơiĐăng.focus();
        //   break;
        case "nơi đăng":
          element.value = "bài đăng";
          khungNhậpBàiĐăng.focus();
          break;
        case "bài đăng":
          element.value = "nút tạo liên kết";
          nútTạoLiênKết.focus();
          break;
      }
      break;
  }
}
