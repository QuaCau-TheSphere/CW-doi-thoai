import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js";
import { StateUpdater, useState } from "preact/hooks";
import ModalTạoMới from "./Modal tạo mới/Modal chung.tsx";
import KếtQuảĐượcChọn from "./Kết quả được chọn/Kết quả được chọn.tsx";
import type {
  Cursor,
  DanhSáchKếtQuảTìmKiếm,
  MụcĐượcChọn,
  TênDanhSách,
} from "../utils/Kiểu cho web.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/plus.tsx";
import {
  kiểuKebab,
  tạoLoạiNơiĐăngString,
  tạoTênNơiĐăngString,
  tạoVaultHoặcDựÁnString,
  viếtHoa,
  đổiKhungNhập,
} from "../utils/Hàm cho khung nhập.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  bàiĐăngĐượcChọn,
  element,
  nơiĐăngChưaXácĐịnhVịTríĐượcChọn,
} from "./Signals.ts";

function DanhSáchKếtQuảTìmKiếm({
  tênDanhSách,
  danhSáchKếtQuảTìmKiếm,
  cursor,
  setCursor,
  setSelectedItem,
}: {
  tênDanhSách: TênDanhSách;
  danhSáchKếtQuảTìmKiếm: DanhSáchKếtQuảTìmKiếm;
  cursor: Cursor;
  setCursor: StateUpdater<Cursor>;
  setSelectedItem: StateUpdater<MụcĐượcChọn>;
}) {
  if (!danhSáchKếtQuảTìmKiếm) return <></>;
  if (danhSáchKếtQuảTìmKiếm.length === 0) {
    return (
      <ul class="cursor border-2 rounded border-secondary">
        <li class="bg-secondary p-2">
          <IconPlus class="w-5 h-5" /> Tạo mới
        </li>
      </ul>
    );
  }
  return (
    <ul
      id={`danh-sách-${kiểuKebab(tênDanhSách)}-tìm-được`}
      class="active border-2 rounded border-secondary"
    >
      {danhSáchKếtQuảTìmKiếm.map((item, index) => (
        <li
          key={index}
          class={cursor === index
            ? "cursor bg-secondary p-2 box-decoration-clone"
            : "p-2"}
          onClick={() => setSelectedItem(item)}
          onMouseEnter={() => setCursor(index)}
          onMouseLeave={() => setCursor(-1)}
        >
          <Item item={item.item} />
        </li>
      ))}
    </ul>
  );

  function Item({ item }: { item: BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí }) {
    let dòngChính, dòngPhụ;
    switch (tênDanhSách) {
      case "bài đăng": {
        item = item as BàiĐăng;
        const { "Dự án": dựÁn, Vault: vault, "Tiêu đề": tiêuĐề } = item;
        dòngChính = <h4 class="h4 tiêu-đề">{tiêuĐề}</h4>;

        const vaultHoặcDựÁnString = tạoVaultHoặcDựÁnString(dựÁn, vault);
        dòngPhụ = (
          <>
            <span class="nơi-lưu-bài-đăng">{vaultHoặcDựÁnString}</span>
          </>
        );
        break;
      }
      case "nơi đăng": {
        item = item as NơiĐăngChưaXácĐịnhVịTrí;
        const tênNơiĐăng = item["Tên nơi đăng"];
        if (!Array.isArray(tênNơiĐăng)) return <></>;
        const tênNơiĐăngString = tạoTênNơiĐăngString(tênNơiĐăng);
        dòngChính = <h4 class="h4 tiêu-đề">{tênNơiĐăngString}</h4>;

        const loạiNơiĐăngString = tạoLoạiNơiĐăngString(item);
        dòngPhụ = <span class="loại-nơi-đăng">{loạiNơiĐăngString}</span>;
      }
    }
    return (
      <>
        {dòngChính}
        <span class="dòng-phụ font-xs text-slate-400">{dòngPhụ}</span>
      </>
    );
  }
}
export default function KhungTìmBàiĐăngHoặcNơiĐăng(
  {
    tênDanhSách,
    fuse,
  }: {
    tênDanhSách: TênDanhSách;
    fuse: Fuse;
  },
) {
  const [searchList, setSearchList] = useState<DanhSáchKếtQuảTìmKiếm>(
    undefined,
  );
  const [cursor, setCursor] = useState<Cursor>(0);
  const [mụcĐượcChọn, setMục] = useState<MụcĐượcChọn>(undefined);
  const [query, setQuery] = useState<string>("");
  switch (tênDanhSách) {
    case "nơi đăng":
      nơiĐăngChưaXácĐịnhVịTríĐượcChọn.value =
        mụcĐượcChọn as NơiĐăngChưaXácĐịnhVịTrí;
      break;

    case "bài đăng":
      bàiĐăngĐượcChọn.value = mụcĐượcChọn as BàiĐăng;
      break;
  }
  return (
    <div
      id={`div-${kiểuKebab(tênDanhSách)}`}
    >
      <label class="input input-bordered flex items-center gap-2">
        {viếtHoa(tênDanhSách)}
        <input
          type="text"
          class="grow"
          autoFocus
          required
          value={query}
          id={`khung-nhập-${kiểuKebab(tênDanhSách)}`}
          placeholder={`Tìm ${tênDanhSách} hoặc dán URL để tạo mới`}
          onInput={handleInput}
          onFocus={() => element.value = tênDanhSách}
          onKeyDown={handleKeyDown}
        />
      </label>
      {tênDanhSách === element.value
        ? (
          <>
            <DanhSáchKếtQuảTìmKiếm
              tênDanhSách={tênDanhSách}
              danhSáchKếtQuảTìmKiếm={searchList}
              cursor={cursor}
              setCursor={setCursor}
              setSelectedItem={setMục}
            />
            <ModalTạoMới
              tênDanhSách={tênDanhSách}
              URL={query}
              setSelectedItem={setMục}
            />
          </>
        )
        : null}
      <KếtQuảĐượcChọn tênDanhSách={tênDanhSách} />
      <br />
    </div>
  );

  function handleInput(e: InputEvent) {
    element.value = tênDanhSách;
    const query = (e.target as HTMLTextAreaElement).value;
    setQuery(query);
    setSearchList(fuse.search(query).slice(0, 10));
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (!searchList) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newCursor = cursor < searchList.length - 1 ? cursor + 1 : 0;
      setCursor(newCursor);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newCursor = cursor > 0 ? cursor - 1 : searchList.length - 1;
      setCursor(newCursor);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchList.length === 0) {
        (document.getElementById("model-tạo-mới") as HTMLDialogElement)
          .showModal();
      } else {
        setMục(searchList[cursor].item);
        đổiKhungNhập("xuôi");
      }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      đổiKhungNhập("xuôi");
    }
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      đổiKhungNhập("ngược");
    }
  }
}
