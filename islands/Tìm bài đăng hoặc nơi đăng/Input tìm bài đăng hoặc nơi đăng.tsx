import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js";
import type { MụcĐượcChọn, TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { kiểuKebab, viếtHoa, đổiKhungNhập } from "../../utils/Hàm cho khung nhập.ts";
import { element } from "../Signals tổng.ts";
import { queryBàiĐăng, queryNơiĐăng, searchList } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { cursor } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { Signal } from "@preact/signals";

function handleInput(e: InputEvent, tênDanhSách: TênDanhSách, fuse: Fuse, query: Signal<string>) {
  element.value = tênDanhSách;
  query.value = (e.target as HTMLTextAreaElement).value;
  searchList.value = fuse.search(query.value).slice(0, 10);
}

function handleKeyDown(e: KeyboardEvent, mụcĐượcChọn: Signal<MụcĐượcChọn>) {
  const searchlist = searchList.value;
  if (!searchlist) return;

  const cursorHiệnTại = cursor.value;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    cursor.value = cursorHiệnTại < searchlist.length - 1 ? cursorHiệnTại + 1 : 0;
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    cursor.value = cursorHiệnTại > 0 ? cursorHiệnTại - 1 : searchlist.length - 1;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    if (searchlist.length === 0) {
      (document.getElementById("model-tạo-mới") as HTMLDialogElement).showModal();
    } else {
      mụcĐượcChọn.value = searchlist[cursorHiệnTại].item;
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
  { tênDanhSách, fuse, mụcĐượcChọn }: { tênDanhSách: TênDanhSách; fuse: Fuse; mụcĐượcChọn: Signal<MụcĐượcChọn> },
) {
  let query;
  switch (tênDanhSách) {
    case "bài đăng":
      query = queryBàiĐăng;
      break;
    case "nơi đăng":
      query = queryNơiĐăng;
      break;
  }
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
        onInput={(e: InputEvent) => handleInput(e, tênDanhSách, fuse, query)}
        onFocus={() => element.value = tênDanhSách}
        onKeyDown={(e: KeyboardEvent) => handleKeyDown(e, mụcĐượcChọn)}
      />
    </label>
  );
}
