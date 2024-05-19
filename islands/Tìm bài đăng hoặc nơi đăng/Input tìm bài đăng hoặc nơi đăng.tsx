import type { DanhSáchKếtQuảTìmKiếmType, FlexSearchBàiĐăngHoặcNơiĐăng, MụcĐượcChọn, TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { kiểuKebab, viếtHoa, đổiKhungNhập } from "../../utils/Hàm cho khung nhập.ts";
import { element } from "../Signals tổng.ts";
import { cursor, danhSáchGợiÝSignal } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { Signal } from "@preact/signals";

function handleInput(
  e: InputEvent,
  tênDanhSách: TênDanhSách,
  flexSearch: FlexSearchBàiĐăngHoặcNơiĐăng,
  query: Signal<string>,
) {
  element.value = tênDanhSách;
  query.value = (e.target as HTMLTextAreaElement).value;
  const flexResult = flexSearch.search(query.value, { enrich: true, limit: 10 });
  if (flexResult && flexResult[0]) {
    danhSáchGợiÝSignal.value = flexResult[0].result as unknown as DanhSáchKếtQuảTìmKiếmType;
  } else {
    danhSáchGợiÝSignal.value = [];
  }
}

function handleKeyDown(e: KeyboardEvent, mụcĐượcChọn: Signal<MụcĐượcChọn>) {
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
      (document.getElementById("model-tạo-mới") as HTMLDialogElement).showModal();
    } else {
      mụcĐượcChọn.value = danhSáchGợiÝ[cursorHiệnTại].doc;
      đổiKhungNhập("xuôi");
    }
  }
  // if (e.key === "Tab") {
  //   e.preventDefault();
  //   đổiKhungNhập("xuôi");
  // }
  // if (e.key === "Tab" && e.shiftKey) {
  //   e.preventDefault();
  //   đổiKhungNhập("ngược");
  // }
}

export default function InputTìmBàiĐăngHoặcNơiĐăng(
  { tênDanhSách, mụcĐượcChọn, query, flexSearch }: {
    tênDanhSách: TênDanhSách;
    mụcĐượcChọn: Signal<MụcĐượcChọn>;
    query: Signal<string>;
    flexSearch: FlexSearchBàiĐăngHoặcNơiĐăng;
  },
) {
  return (
    <label class="input input-bordered flex items-center gap-2">
      {viếtHoa(tênDanhSách)}
      <input
        type="text"
        class="grow"
        autoFocus
        required
        value={query.value}
        id={`khung-nhập-${kiểuKebab(tênDanhSách)}`}
        placeholder={`Tìm ${tênDanhSách} hoặc dán URL để tạo mới`}
        onInput={(e: InputEvent) => handleInput(e, tênDanhSách, flexSearch, query)}
        onFocus={() => element.value = tênDanhSách}
        onKeyDown={(e: KeyboardEvent) => handleKeyDown(e, mụcĐượcChọn)}
      />
    </label>
  );
}
