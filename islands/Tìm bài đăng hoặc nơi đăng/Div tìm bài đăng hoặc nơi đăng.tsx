import KếtQuảĐượcChọn from "../Kết quả được chọn/Kết quả được chọn.tsx";
import ModalTạoMới from "../Modal tạo mới/Modal chung.tsx";
import type { FlexSearchBàiĐăngHoặcNơiĐăng, MụcĐượcChọn, TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { kiểuKebab } from "../../utils/Hàm cho khung nhập.ts";
import { bàiĐăngĐượcChọn, flexSearchBàiĐăngSignal, flexSearchNơiĐăngSignal, nơiĐăngCóCácLựaChọnVịTrí } from "../Signals tổng.ts";
import { DanhSáchKếtQuảTìmKiếm } from "./Danh sách kết quả tìm kiếm.tsx";
import InputTìmBàiĐăngHoặcNơiĐăng from "./Input tìm bài đăng hoặc nơi đăng.tsx";
import { Signal } from "@preact/signals";
import { queryBàiĐăng, queryNơiĐăng } from "./Signal tìm bài đăng hoặc nơi đăng.ts";

export default function DivTìmBàiĐăngHoặcNơiĐăng({ tênDanhSách }: { tênDanhSách: TênDanhSách }) {
  let mụcĐượcChọn: Signal<MụcĐượcChọn>;
  let query: Signal<string>;
  let flexSearch: FlexSearchBàiĐăngHoặcNơiĐăng;
  switch (tênDanhSách) {
    case "bài đăng":
      mụcĐượcChọn = bàiĐăngĐượcChọn;
      query = queryBàiĐăng;
      flexSearch = flexSearchBàiĐăngSignal.value;
      break;
    case "nơi đăng":
      mụcĐượcChọn = nơiĐăngCóCácLựaChọnVịTrí;
      query = queryNơiĐăng;
      flexSearch = flexSearchNơiĐăngSignal.value;
      break;
  }
  return (
    <div id={`div-tìm-${kiểuKebab(tênDanhSách)}`}>
      <InputTìmBàiĐăngHoặcNơiĐăng tênDanhSách={tênDanhSách} mụcĐượcChọn={mụcĐượcChọn} query={query} flexSearch={flexSearch} />
      <DanhSáchKếtQuảTìmKiếm tênDanhSách={tênDanhSách} mụcĐượcChọn={mụcĐượcChọn} query={query} />
      <KếtQuảĐượcChọn loạiVậtThể={tênDanhSách} />
      <ModalTạoMới tênDanhSách={tênDanhSách} mụcĐượcChọn={mụcĐượcChọn} />
    </div>
  );
}
