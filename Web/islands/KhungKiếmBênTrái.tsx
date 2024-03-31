import { StateUpdater, useState } from "preact/hooks";
import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.js";
import { BàiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import type {
  ActiveList,
  Cursor,
  KhungKiếmBênTráiProps,
  ListName,
  SearchList,
  SelectedItem,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20web.ts";

function SearchList({
  listName,
  searchList,
  cursor,
  setCursor,
  setSelectedItem,
}: {
  listName: ListName;
  searchList: SearchList;
  cursor: Cursor;
  setCursor: StateUpdater<Cursor>;
  setSelectedItem: StateUpdater<SelectedItem>;
}) {
  if (!searchList) return;
  const id = `Search list ${listName}`;
  return (
    <ul id={id} className="active">
      {searchList.map((item, index) => (
        <li
          key={index}
          className={cursor === index ? "cursor" : ""}
          onClick={() => setSelectedItem(item)}
          onMouseEnter={() => setCursor(index)}
          onMouseLeave={() => setCursor(undefined)}
        >
          <Item item={item.item} />
        </li>
      ))}
    </ul>
  );

  function Item({ item }: { item: BàiĐăng | NơiĐăng }) {
    switch (listName) {
      case "bài đăng":
        item = item as BàiĐăng;
        return (
          <>
            <h4>{item["Tiêu đề"]}</h4>
            <span>{item["Dự án"]["Tên dự án"]}</span>
          </>
        );
      case "nơi đăng":
        item = item as NơiĐăng;
        return (
          <>
            <h4>{item["Tên nơi đăng"]}</h4>
            {item["Tên nền tảng"]}
          </>
        );
    }
  }
}

function SearchDiv(
  { listName, fuse, activeList, setActiveList, chọnBàiĐăngHoặcNơiĐăng }: {
    listName: ListName;
    fuse: Fuse;
    activeList: ActiveList;
    setActiveList: StateUpdater<ActiveList>;
    chọnBàiĐăngHoặcNơiĐăng:
      | StateUpdater<BàiĐăng | undefined>
      | StateUpdater<NơiĐăng | undefined>;
  },
) {
  const [searchList, setSearchList] = useState<SearchList>(undefined);
  const [cursor, setCursor] = useState<Cursor>(0);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(undefined);

  function handleKeyDown(e: KeyboardEvent) {
    if (!searchList) return;
    if (e.key === "ArrowDown") {
      const newCursor = Math.min(cursor! + 1, searchList.length - 1);
      setCursor(newCursor);
    } else if (e.key === "ArrowUp") {
      const newCursor = Math.max(0, cursor! - 1);
      setCursor(newCursor);
    } else if (e.key === "Enter" && cursor !== undefined) {
      setSelectedItem(searchList[cursor]);
    }
  }
  chọnBàiĐăngHoặcNơiĐăng(selectedItem?.item);

  const searchListNode = (
    <SearchList
      listName={listName}
      searchList={searchList}
      cursor={cursor}
      setCursor={setCursor}
      setSelectedItem={setSelectedItem}
    />
  );
  return (
    <div
      id={`search-div-${listName}`}
      className="search-bar-container"
    >
      <input
        type="text"
        placeholder={`Tìm ${listName}`}
        onInput={(e) => {
          setSearchList(
            fuse.search((e.target as HTMLTextAreaElement).value).slice(0, 10),
          );
        }}
        onFocus={() => setActiveList(listName)}
        onKeyDown={handleKeyDown}
      />
      <br />
      {activeList === listName ? searchListNode : undefined}
      Cursor: {cursor}
      <br />
      Selected item of list {listName}:{" "}
      <span id={`Item ${listName}`} className={"result"}>
        {JSON.stringify(selectedItem)}
      </span>
      <br />
    </div>
  );
}

export default function KhungKiếmBênTrái(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, chọnBàiĐăng, chọnNơiĐăng }:
    KhungKiếmBênTráiProps,
) {
  /** Active list is used to determine whether the search list should be popup or not */
  const [activeList, setActiveList] = useState<ActiveList>(undefined);

  const fuseBàiĐăng = new Fuse(danhSáchBàiĐăng, {
    // minMatchCharLength: 3,
    ignoreLocation: true,
    keys: [{
      name: "Tiêu đề",
      weight: 2,
    }, "Mô tả bài đăng"],
  });
  const fuseNơiĐăng = new Fuse(danhSáchNơiĐăng, {
    // minMatchCharLength: 2,
    ignoreLocation: true,
    keys: [
      "Tên nơi đăng",
      "Tên cộng đồng",
      "Loại nơi đăng",
      "Tên nền tảng",
      "Loại nền tảng",
    ],
  });
  return (
    <>
      <SearchDiv
        listName="bài đăng"
        fuse={fuseBàiĐăng}
        activeList={activeList}
        setActiveList={setActiveList}
        chọnBàiĐăngHoặcNơiĐăng={chọnBàiĐăng}
      />
      <SearchDiv
        listName="nơi đăng"
        fuse={fuseNơiĐăng}
        activeList={activeList}
        setActiveList={setActiveList}
        chọnBàiĐăngHoặcNơiĐăng={chọnNơiĐăng}
      />
    </>
  );
}
