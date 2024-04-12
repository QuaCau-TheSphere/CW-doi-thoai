import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.js";
import { StateUpdater, useState } from "preact/hooks";
import type {
  Cursor,
  DanhSáchKếtQuảTìmKiếm,
  KhungNhậpĐangActive,
  MụcĐượcChọn,
  TênDanhSách,
} from "../utils/Kiểu cho web.ts";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/plus.tsx";
import NhậpMới from "./Nh%E1%BA%ADp%20m%E1%BB%9Bi.tsx";
import { isURL } from "https://deno.land/x/deno_validator@v0.0.5/mod.ts";
import { kebabCase } from "../utils/Hàm.ts";

function DanhSáchKếtQuảTìmKiếm({
  tênDanhSách,
  searchList,
  cursor,
  setCursor,
  setSelectedItem,
}: {
  tênDanhSách: TênDanhSách;
  searchList: DanhSáchKếtQuảTìmKiếm;
  cursor: Cursor;
  setCursor: StateUpdater<Cursor>;
  setSelectedItem: StateUpdater<MụcĐượcChọn>;
}) {
  if (!searchList) return <></>;
  if (searchList.length === 0) {
    return (
      <h4 class="h4 tiêu-đề cursor bg-secondary">
        <IconPlus class="w-5 h-5" /> Tạo mới
      </h4>
    );
  }
  const id = `Search list ${tênDanhSách}`;
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
    switch (tênDanhSách) {
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
export default function KhungTìmBàiĐăngHoặcNơiĐăng(
  {
    tênDanhSách,
    fuse,
    khungNhậpĐangActive,
    setKhungNhậpActive,
    setBàiĐăngHoặcNơiĐăng,
  }: {
    tênDanhSách: TênDanhSách;
    fuse: Fuse;
    khungNhậpĐangActive: KhungNhậpĐangActive;
    setKhungNhậpActive: StateUpdater<KhungNhậpĐangActive>;
    setBàiĐăngHoặcNơiĐăng: any;
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
      id={`div-${tênDanhSách.replace(" ", "-")}`}
    >
      <label class="input input-bordered flex items-center gap-2">
        {tênDanhSách.replace(/^(.)/g, (x) => x.toUpperCase())}
        <input
          type="text"
          class="grow"
          autoFocus
          value={query}
          id={`input-${tênDanhSách?.replace(" ", "-")}`}
          placeholder={`Nhập ${tênDanhSách}`}
          onInput={handleInput}
          onFocus={() => setKhungNhậpActive(tênDanhSách)}
          onKeyDown={handleKeyDown}
        />
      </label>
      {tênDanhSách === khungNhậpĐangActive
        ? (
          <DanhSáchKếtQuảTìmKiếm
            tênDanhSách={tênDanhSách}
            searchList={searchList}
            cursor={cursor}
            setCursor={setCursor}
            setSelectedItem={setMục}
          />
        )
        : null}
      <NhậpMới
        activeList={tênDanhSách}
        url={query}
        setSelectedItem={setMục}
      />
      <KếtQuảĐượcChọn />
      <br />
    </div>
  );

  function handleInput(e: InputEvent) {
    setKhungNhậpActive(tênDanhSách);
    const query = (e.target as HTMLTextAreaElement).value;
    setQuery(query);
    if (isURL(query)) {
      (document.getElementById("model-nhập-mới") as HTMLDialogElement)
        .showModal();
    } else {
      setSearchList(fuse.search(query).slice(0, 10));
    }
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (!searchList) return;
    const inputBàiĐăng = document.getElementById("input-bài-đăng")!;
    const inputNơiĐăng = document.getElementById("input-nơi-đăng")!;
    const inputBốiCảnh = document.getElementById("input-bối-cảnh")!;

    if (e.key === "Escape") {
      e.preventDefault();
      setKhungNhậpActive(undefined);
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
    if (e.key === "Enter" || e.key === "Tab") {
      setMục(searchList[cursor].item);
      if (khungNhậpĐangActive === "bài đăng") {
        setKhungNhậpActive("nơi đăng");
        inputNơiĐăng.focus();
      } else if (khungNhậpĐangActive === "nơi đăng") {
        setKhungNhậpActive("bối cảnh");
        inputBốiCảnh.focus();
      } else if (khungNhậpĐangActive === "bối cảnh") {
        //todo
      }
    }
  }
  function KếtQuảĐượcChọn() {
    function lấyGiáTrị(giáTrị: string | Record<string, string>) {
      if (typeof giáTrị === "object") {
        return Object.entries(giáTrị).map(([key, value]) => (
          <li>{key}: {value}</li>
        ));
      } else {
        return giáTrị;
      }
    }
    return (
      <div class="prose result">
        <ul id={`${kebabCase(tênDanhSách)}-được-chọn`}>
          {mụcĐượcChọn
            ? Object.entries(mụcĐượcChọn).map(([key, value]) => (
              <li>
                <span class="font-bold">{key}</span>: {lấyGiáTrị(value)}
              </li>
            ))
            : ""}
        </ul>
      </div>
    );
  }
}
