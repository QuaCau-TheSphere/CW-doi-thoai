import { Signal, useComputed, useSignal } from "@preact/signals";
import { EnrichedDocumentSearchResultSetUnitResultUnit } from "npm:flexsearch";
import KếtQuảĐượcChọn from "../Kết quả được chọn/Kết quả được chọn.tsx";
import ModalTạoMới from "../Modal tạo mới/Modal chung.tsx";
import { bàiĐăngSignal, flexSearchBàiĐăngSignal, flexSearchNơiĐăngSignal, nơiĐăngCóCácLựaChọnVịTríSignal } from "../Signals tổng.ts";
import { DanhSáchKếtQuảTìmKiếm } from "./Danh sách kết quả tìm kiếm.tsx";
import InputTìmBàiĐăngHoặcNơiĐăng from "./Input tìm bài đăng hoặc nơi đăng.tsx";
import { queryBàiĐăngSignal, queryNơiĐăngSignal } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import {
  DanhSáchKếtQuảTìmKiếmType,
  FlexSearchBàiĐăngHoặcNơiĐăng,
  MụcĐượcChọn,
  TênDanhSách,
} from "../../Code chạy trên client/Hàm và kiểu cho khung nhập.ts";
import { kiểuKebab } from "../../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { BàiĐăng } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Code chạy trên client/Hàm và kiểu cho vị trí.ts";

/** Những signal được tạo ở ngoài rồi import vào đây là có được sử dụng ở ngoài div. Những signal được tạo trong đây chỉ cần dùng trong div này */
export default function DivTìmBàiĐăngHoặcNơiĐăng({ tênDanhSách }: { tênDanhSách: TênDanhSách }) {
  let mụcĐượcChọnSignal: Signal<MụcĐượcChọn>;
  let querySignal: Signal<string | undefined>;
  let flexSearch: FlexSearchBàiĐăngHoặcNơiĐăng;
  let danhSáchGợiÝSignal: Signal<DanhSáchKếtQuảTìmKiếmType>;
  let tạoMới: Signal<boolean>;

  switch (tênDanhSách) {
    case "bài đăng":
      mụcĐượcChọnSignal = bàiĐăngSignal;
      querySignal = queryBàiĐăngSignal;
      flexSearch = flexSearchBàiĐăngSignal.value;
      danhSáchGợiÝSignal = useSignal<EnrichedDocumentSearchResultSetUnitResultUnit<BàiĐăng>[] | undefined>(undefined);
      tạoMới = useComputed(() => {
        if (danhSáchGợiÝSignal.value && danhSáchGợiÝSignal.value.length === 0) return true;
        return false;
      });
      break;
    case "nơi đăng":
      mụcĐượcChọnSignal = nơiĐăngCóCácLựaChọnVịTríSignal;
      querySignal = queryNơiĐăngSignal;
      flexSearch = flexSearchNơiĐăngSignal.value;
      danhSáchGợiÝSignal = useSignal<EnrichedDocumentSearchResultSetUnitResultUnit<NơiĐăngCóCácLựaChọnVịTrí>[] | undefined>(undefined);
      tạoMới = useComputed(() => {
        if (danhSáchGợiÝSignal.value && danhSáchGợiÝSignal.value.length === 0) return true;
        return false;
      });
      break;
  }
  return (
    <div id={`div-tìm-${kiểuKebab(tênDanhSách)}`}>
      <InputTìmBàiĐăngHoặcNơiĐăng
        tênDanhSách={tênDanhSách}
        mụcĐượcChọnSignal={mụcĐượcChọnSignal}
        querySignal={querySignal}
        flexSearch={flexSearch}
        danhSáchGợiÝSignal={danhSáchGợiÝSignal}
      />
      <DanhSáchKếtQuảTìmKiếm
        tênDanhSách={tênDanhSách}
        mụcĐượcChọnSignal={mụcĐượcChọnSignal}
        querySignal={querySignal}
        danhSáchKếtQuảTìmKiếm={danhSáchGợiÝSignal.value}
      />
      <KếtQuảĐượcChọn loạiVậtThể={tênDanhSách} />
      {tạoMới.value ? <ModalTạoMới tênDanhSách={tênDanhSách} mụcĐượcChọnSignal={mụcĐượcChọnSignal} /> : <></>}
    </div>
  );
}
