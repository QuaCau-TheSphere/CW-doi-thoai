import KếtQuảĐượcChọn from "../Kết quả được chọn/Kết quả được chọn.tsx";
import ModalTạoMới from "../Modal tạo mới/Modal chung.tsx";
import { kiểuKebab } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { bàiĐăngĐượcChọn, flexSearchBàiĐăngSignal, flexSearchNơiĐăngSignal, nơiĐăngCóCácLựaChọnVịTrí } from "../Signals tổng.ts";
import { DanhSáchKếtQuảTìmKiếm } from "./Danh sách kết quả tìm kiếm.tsx";
import InputTìmBàiĐăngHoặcNơiĐăng from "./Input tìm bài đăng hoặc nơi đăng.tsx";
import { Signal, useComputed } from "@preact/signals";
import { danhSáchGợiÝSignal, queryBàiĐăngSignal, queryNơiĐăngSignal } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { FlexSearchBàiĐăngHoặcNơiĐăng, MụcĐượcChọn, TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";

export default function DivTìmBàiĐăngHoặcNơiĐăng({ tênDanhSách }: { tênDanhSách: TênDanhSách }) {
  let mụcĐượcChọnSignal: Signal<MụcĐượcChọn>;
  let querySignal: Signal<string>;
  let flexSearch: FlexSearchBàiĐăngHoặcNơiĐăng;
  const tạoMới = useComputed(() => {
    if (danhSáchGợiÝSignal.value && danhSáchGợiÝSignal.value.length === 0) return true;
    return false;
  });
  switch (tênDanhSách) {
    case "bài đăng":
      mụcĐượcChọnSignal = bàiĐăngĐượcChọn;
      querySignal = queryBàiĐăngSignal;
      flexSearch = flexSearchBàiĐăngSignal.value;
      break;
    case "nơi đăng":
      mụcĐượcChọnSignal = nơiĐăngCóCácLựaChọnVịTrí;
      querySignal = queryNơiĐăngSignal;
      flexSearch = flexSearchNơiĐăngSignal.value;
      break;
  }
  return (
    <div id={`div-tìm-${kiểuKebab(tênDanhSách)}`}>
      <InputTìmBàiĐăngHoặcNơiĐăng tênDanhSách={tênDanhSách} mụcĐượcChọnSignal={mụcĐượcChọnSignal} querySignal={querySignal} flexSearch={flexSearch} />
      <DanhSáchKếtQuảTìmKiếm tênDanhSách={tênDanhSách} mụcĐượcChọnSignal={mụcĐượcChọnSignal} querySignal={querySignal} />
      <KếtQuảĐượcChọn loạiVậtThể={tênDanhSách} />
      {tạoMới.value ? <ModalTạoMới tênDanhSách={tênDanhSách} mụcĐượcChọnSignal={mụcĐượcChọnSignal} /> : <></>}
    </div>
  );
}
