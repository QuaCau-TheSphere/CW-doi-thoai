import {
  DanhSáchKếtQuảTìmKiếmType,
  FlexSearchBàiĐăngHoặcNơiĐăng,
  MụcĐượcChọn,
  TênDanhSách,
  đổiKhungNhập,
} from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { kiểuKebab, viếtHoa } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { element } from "../Signals tổng.ts";
import { cursor } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { Signal } from "@preact/signals";

function handleInput(
  e: InputEvent,
  tênDanhSách: TênDanhSách,
  flexSearch: FlexSearchBàiĐăngHoặcNơiĐăng,
  querySignal: Signal<string | undefined>,
  danhSáchGợiÝSignal: Signal<DanhSáchKếtQuảTìmKiếmType>,
) {
  element.value = tênDanhSách;
  querySignal.value = (e.target as HTMLTextAreaElement).value;
  const flexResult = flexSearch.search(querySignal.value, { enrich: true, limit: 10 });
  if (flexResult && flexResult[0]) {
    danhSáchGợiÝSignal.value = flexResult[0].result as unknown as DanhSáchKếtQuảTìmKiếmType;
  } else {
    danhSáchGợiÝSignal.value = [];
  }
}

function handleKeyDown(
  e: KeyboardEvent,
  mụcĐượcChọnSignal: Signal<MụcĐượcChọn>,
  tênDanhSách: TênDanhSách,
  danhSáchGợiÝSignal: Signal<DanhSáchKếtQuảTìmKiếmType>,
) {
  const danhSáchGợiÝ = danhSáchGợiÝSignal.value;
  if (!danhSáchGợiÝ) return;

  const cursorHiệnTại = cursor.value;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    cursor.value = cursorHiệnTại < danhSáchGợiÝ.length - 1 ? cursorHiệnTại + 1 : 0;
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    cursor.value = cursorHiệnTại > 0 ? cursorHiệnTại - 1 : danhSáchGợiÝ.length - 1;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    if (danhSáchGợiÝ.length === 0) {
      //refactor: mount component ModalTạoMới vào đây
      (document.getElementById("model-tạo-mới") as HTMLDialogElement).showModal();
    } else {
      const mụcĐượcChọn = danhSáchGợiÝ[cursorHiệnTại].doc;
      mụcĐượcChọnSignal.value = mụcĐượcChọn;
      console.log(`${viếtHoa(tênDanhSách)} được chọn:`, mụcĐượcChọn);
      đổiKhungNhập("xuôi");
    }
  }
  if (e.key === "Tab") {
    if (!e.shiftKey) {
      e.preventDefault();
      đổiKhungNhập("xuôi");
    } else {
      e.preventDefault();
      đổiKhungNhập("ngược");
    }
  }
}

export default function InputTìmBàiĐăngHoặcNơiĐăng(
  { tênDanhSách, mụcĐượcChọnSignal, querySignal, flexSearch, danhSáchGợiÝSignal }: {
    tênDanhSách: TênDanhSách;
    mụcĐượcChọnSignal: Signal<MụcĐượcChọn>;
    querySignal: Signal<string | undefined>;
    flexSearch: FlexSearchBàiĐăngHoặcNơiĐăng;
    danhSáchGợiÝSignal: Signal<DanhSáchKếtQuảTìmKiếmType>;
  },
) {
  return (
    <label class="input input-bordered flex items-center gap-2">
      {viếtHoa(tênDanhSách)}
      <input
        type="text"
        class="grow bg-base-100"
        autoFocus
        required
        value={querySignal.value}
        id={`khung-nhập-${kiểuKebab(tênDanhSách)}`}
        placeholder={`Tìm ${tênDanhSách} hoặc dán URL để tạo mới`}
        onInput={(e: InputEvent) => handleInput(e, tênDanhSách, flexSearch, querySignal, danhSáchGợiÝSignal)}
        onFocus={() => element.value = tênDanhSách}
        onKeyDown={(e: KeyboardEvent) => handleKeyDown(e, mụcĐượcChọnSignal, tênDanhSách, danhSáchGợiÝSignal)}
      />
    </label>
  );
}
