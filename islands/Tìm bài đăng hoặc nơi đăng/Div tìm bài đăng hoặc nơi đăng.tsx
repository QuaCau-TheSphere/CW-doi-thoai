import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js";
// import ModalTạoMới from "../Modal tạo mới/Modal chung.tsx";
import KếtQuảĐượcChọn from "../Kết quả được chọn/Kết quả được chọn.tsx";
import type { MụcĐượcChọn, TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { kiểuKebab } from "../../utils/Hàm cho khung nhập.ts";
import { bàiĐăngĐượcChọn, nơiĐăngChưaXácĐịnhVịTríĐượcChọn } from "../Signals tổng.ts";
import { DanhSáchKếtQuảTìmKiếm } from "./Danh sách kết quả tìm kiếm.tsx";
import InputTìmBàiĐăngHoặcNơiĐăng from "./Input tìm bài đăng hoặc nơi đăng.tsx";
import { Signal } from "@preact/signals";

export default function DivTìmBàiĐăngHoặcNơiĐăng({ tênDanhSách, fuse }: { tênDanhSách: TênDanhSách; fuse: Fuse }) {
  let mụcĐượcChọn: Signal<MụcĐượcChọn>;
  switch (tênDanhSách) {
    case "nơi đăng":
      mụcĐượcChọn = nơiĐăngChưaXácĐịnhVịTríĐượcChọn;
      break;
    case "bài đăng":
      mụcĐượcChọn = bàiĐăngĐượcChọn;
      break;
  }
  return (
    <div id={`div-${kiểuKebab(tênDanhSách)}`}>
      <InputTìmBàiĐăngHoặcNơiĐăng fuse={fuse} tênDanhSách={tênDanhSách} mụcĐượcChọn={mụcĐượcChọn} />
      <DanhSáchKếtQuảTìmKiếm tênDanhSách={tênDanhSách} mụcĐượcChọn={mụcĐượcChọn} />
      {/* <ModalTạoMới tênDanhSách={tênDanhSách} mụcĐượcChọn={mụcĐượcChọn} /> */}
      <KếtQuảĐượcChọn loạiVậtThể={tênDanhSách} />
    </div>
  );
}
