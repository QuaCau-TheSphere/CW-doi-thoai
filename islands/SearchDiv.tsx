import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.js";
import { StateUpdater, useState } from "preact/hooks";
import type {
  Cursor,
  DanhSáchKếtQuảTìmKiếm,
  DanhSáchĐangActive,
  MụcĐượcChọn,
  TênDanhSách,
} from "../utils/Kiểu cho web.ts";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { SwitchStatement } from "https://deno.land/x/ts_morph@21.0.1/ts_morph.js";

function DanhSáchKếtQuảTìmKiếm({
  listName,
  searchList,
  cursor,
  setCursor,
  setSelectedItem,
}: {
  listName: TênDanhSách;
  searchList: DanhSáchKếtQuảTìmKiếm;
  cursor: Cursor;
  setCursor: StateUpdater<Cursor>;
  setSelectedItem: StateUpdater<MụcĐượcChọn>;
}) {
  if (!searchList) return;
  const id = `Search list ${listName}`;
  return (
    <ul id={id} class="active">
      {searchList.map((item, index) => (
        <li
          key={index}
          class={cursor === index ? "cursor bg-secondary" : ""}
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
    switch (listName) {
      case "bài đăng": {
        item = item as BàiĐăng;
        dòngChính = <h4 class="h4 tiêu-đề">{item["Tiêu đề"]}</h4>;

        let key, value;
        if (item["Dự án"]["Tên dự án"]) {
          key = "Dự án";
          value = item["Dự án"]["Tên dự án"];
        } else if (item.Vault) {
          key = "Vault";
          value = item.Vault;
        }

        dòngPhụ = (
          <>
            <span class="nơi-lưu-bài-đăng">{key}:</span> {value}
          </>
        );
        break;
      }
      case "nơi đăng":
        item = item as NơiĐăng;
        dòngChính = <h4 class="h4 tiêu-đề">{item["Tên nơi đăng"]}</h4>;
        switch (item["Loại nền tảng"]) {
          case "Diễn đàn":
          case "Chat":
            dòngPhụ = (
              <span class="nơi-đăng">
                {item["Loại nơi đăng"]} {item["Tên nền tảng"]}{" "}
                {item["Tên cộng đồng"]}
              </span>
            );
            break;
          case "Khác":
            dòngPhụ = (
              <span class="nơi-đăng">
                {item["Loại nơi đăng"]}
              </span>
            );
            break;
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
export default function SearchDiv(
  {
    listName,
    fuse,
    activeList,
    setActiveList,
    chọnBàiĐăngHoặcNơiĐăng,
  }: {
    listName: TênDanhSách;
    fuse: Fuse;
    activeList: DanhSáchĐangActive;
    setActiveList: StateUpdater<DanhSáchĐangActive>;
    chọnBàiĐăngHoặcNơiĐăng: any;
  },
) {
  const [searchList, setSearchList] = useState<DanhSáchKếtQuảTìmKiếm>(
    undefined,
  );
  const [cursor, setCursor] = useState<Cursor>(0);
  const [selectedItem, setSelectedItem] = useState<MụcĐượcChọn>(undefined);

  //@ts-ignore:
  chọnBàiĐăngHoặcNơiĐăng(selectedItem);
  const searchListNode = (
    <DanhSáchKếtQuảTìmKiếm
      listName={listName}
      searchList={searchList}
      cursor={cursor}
      setCursor={setCursor}
      setSelectedItem={setSelectedItem}
    />
  );
  return (
    <div
      id={`div-${listName.replace(" ", "-")}`}
    >
      <label class="input input-bordered flex items-center gap-2">
        {listName.replace(/^(.)/g, (x) => x.toUpperCase())}
        <input
          type="text"
          class="grow"
          autoFocus
          id={`input-${listName?.replace(" ", "-")}`}
          placeholder={`Nhập ${listName}`}
          onInput={(e) => {
            setSearchList(
              fuse.search((e.target as HTMLTextAreaElement).value).slice(0, 10),
            );
            setActiveList(listName);
          }}
          onFocus={() => setActiveList(listName)}
          onKeyDown={handleKeyDown}
        />
      </label>
      {listName === activeList ? searchListNode : undefined}
      <KếtQuảĐượcChọn />
      <br />
    </div>
  );

  function handleKeyDown(e: KeyboardEvent) {
    if (!searchList) return;
    const inputBàiĐăng = document.getElementById("input-bài-đăng")!;
    const inputNơiĐăng = document.getElementById("input-nơi-đăng")!;
    const inputBốiCảnh = document.getElementById("input-bối-cảnh")!;

    if (e.key === "Escape") {
      setActiveList(undefined);
      inputBàiĐăng.blur();
      inputNơiĐăng.blur();
    }
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
      setSelectedItem(searchList[cursor].item);
      if (activeList === "bài đăng") {
        setActiveList("nơi đăng");
        inputNơiĐăng.focus();
      } else if (activeList === "nơi đăng") {
        setActiveList("bối cảnh");
        inputBốiCảnh.focus();
      } else if (activeList === "bối cảnh") {
        //todo
      }
    }
  }
  function KếtQuảĐượcChọn() {
    const lấyGiáTrị = (giáTrị: string | {}) => {
      if (typeof giáTrị === "object") {
        return Object.entries(giáTrị).map((j) => <li>{j[0]}: {j[1]}</li>);
      } else {
        return giáTrị;
      }
    };
    return (
      <div class="prose result">
        <ul id={`${listName.replace(" ", "-")}-được-chọn`}>
          {selectedItem
            ? Object.entries(selectedItem).map((i) => (
              <li>
                <span class="font-bold">{i[0]}</span>: {lấyGiáTrị(i[1])}
              </li>
            ))
            : ""}
        </ul>
      </div>
    );
  }
}
