import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import type {
  Cursor,
  DanhSáchKếtQuảTìmKiếm,
  ElementDùngTab,
  MụcĐượcChọn,
  TênDanhSách,
} from "../utils/Kiểu cho web.ts";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/plus.tsx";
import ModalTạoMới from "./Modal tạo mới/Modal chung.tsx";
import {
  kebabCase,
  viếtThường,
  đổiKhungNhập,
} from "../utils/Hàm cho khung nhập.ts";
import KếtQuảĐượcChọn from "../components/K%E1%BA%BFt%20qu%E1%BA%A3%20%C4%91%C6%B0%E1%BB%A3c%20ch%E1%BB%8Dn.tsx";
import { tạoVịTríString } from "../utils/Hàm cho vị trí.ts";

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
      id={`danh-sách-${kebabCase(tênDanhSách)}-tìm-được`}
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

  function Item({ item }: { item: BàiĐăng | NơiĐăng }) {
    let dòngChính, dòngPhụ;
    switch (tênDanhSách) {
      case "bài đăng": {
        const { "Dự án": dựÁn, Vault: vault, "Tiêu đề": tiêuĐề } =
          item as BàiĐăng;
        dòngChính = <h4 class="h4 tiêu-đề">{tiêuĐề}</h4>;

        let key, value;
        if (dựÁn?.["Tên dự án"]) {
          key = "Dự án";
          value = dựÁn?.["Tên dự án"];
        } else if (vault) {
          key = "Vault";
          value = vault;
        }

        dòngPhụ = (
          <>
            <span class="nơi-lưu-bài-đăng">{key}:</span> {value}
          </>
        );
        break;
      }
      case "nơi đăng": {
        const {
          "Loại nền tảng": loạiNềnTảng,
          "Tên nơi đăng": tênNơiĐăng,
          "Loại nơi đăng": loạiNơiĐăng,
          "Tên nền tảng": tênNềnTảng,
          "Vị trí": vịTrí,
        } = item as NơiĐăng;
        if (!Array.isArray(tênNơiĐăng) || !vịTrí) return <></>;
        dòngChính = <h4 class="h4 tiêu-đề">{tênNơiĐăng.join(" ➯ ")}</h4>;

        let loạiNơiĐăngString: string;
        if (loạiNơiĐăng[0] !== tênNềnTảng) {
          loạiNơiĐăngString = `${loạiNơiĐăng[0]} ${tênNềnTảng} ${
            tênNơiĐăng[0]
          }`;
        } else {
          loạiNơiĐăngString = loạiNơiĐăng[0];
        }

        const vịTríString = tạoVịTríString(vịTrí);
        dòngPhụ = (
          <>
            <span class="loại-nơi-đăng">
              {`${loạiNơiĐăngString} (${vịTríString})`}
            </span>
          </>
        );
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
    element,
    setElement,
    setBàiĐăngHoặcNơiĐăng,
  }: {
    tênDanhSách: TênDanhSách;
    fuse: Fuse;
    element: ElementDùngTab;
    setElement: StateUpdater<ElementDùngTab>;
    setBàiĐăngHoặcNơiĐăng:
      | StateUpdater<BàiĐăng | undefined>
      | StateUpdater<NơiĐăng | undefined>;
  },
) {
  const [searchList, setSearchList] = useState<DanhSáchKếtQuảTìmKiếm>(
    undefined,
  );
  const [cursor, setCursor] = useState<Cursor>(0);
  const [mụcĐượcChọn, setMục] = useState<MụcĐượcChọn>(undefined);
  const [query, setQuery] = useState<string>("");
  //@ts-ignore:
  setBàiĐăngHoặcNơiĐăng(mụcĐượcChọn);
  return (
    <div
      id={`div-${kebabCase(tênDanhSách)}`}
    >
      <label class="input input-bordered flex items-center gap-2">
        {tênDanhSách.replace(/^(.)/g, (x) => x.toUpperCase())}
        <input
          type="text"
          class="grow"
          autoFocus
          value={query}
          id={`khung-nhập-${tênDanhSách?.replace(" ", "-")}`}
          placeholder={`Tìm ${tênDanhSách} hoặc dán URL để tạo mới`}
          onInput={handleInput}
          onFocus={() => setElement(tênDanhSách)}
          onKeyDown={handleKeyDown}
        />
      </label>
      {tênDanhSách === element
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
              setElement={setElement}
            />
          </>
        )
        : null}
      <KếtQuảĐượcChọn từKhoáTiêuĐề={tênDanhSách} vậtThể={mụcĐượcChọn} />
      <br />
    </div>
  );

  function handleInput(e: InputEvent) {
    setElement(tênDanhSách);
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
        đổiKhungNhập("xuôi", element, setElement);
      }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      đổiKhungNhập("xuôi", element, setElement);
    }
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      đổiKhungNhập("ngược", element, setElement);
    }
  }
}
