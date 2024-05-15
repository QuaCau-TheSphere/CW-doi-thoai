import type { MụcĐượcChọn, TênDanhSách } from "../../utils/Kiểu cho web.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/plus.tsx";
import {
  kiểuKebab,
  tạoLoạiNơiĐăngString,
  tạoTênNơiĐăngString,
  tạoVaultHoặcDựÁnString,
} from "../../utils/Hàm cho khung nhập.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { BàiĐăng } from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { element } from "../Signals tổng.ts";
import { cursor, searchList } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { Signal } from "@preact/signals";

function Item({ item, tênDanhSách }: { item: BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí; tênDanhSách: TênDanhSách }) {
  let dòngChính, dòngPhụ;
  switch (tênDanhSách) {
    case "bài đăng": {
      item = item as BàiĐăng;
      const { "Dự án": dựÁn, Vault: vault, "Tiêu đề": tiêuĐề } = item;
      dòngChính = tiêuĐề;

      const vaultHoặcDựÁnString = tạoVaultHoặcDựÁnString(dựÁn, vault);
      dòngPhụ = <span id="nơi-lưu-bài-đăng">{vaultHoặcDựÁnString}</span>;
      break;
    }
    case "nơi đăng": {
      item = item as NơiĐăngChưaXácĐịnhVịTrí;
      const tênNơiĐăng = item["Tên nơi đăng"];
      if (!Array.isArray(tênNơiĐăng)) return <></>;
      const tênNơiĐăngString = tạoTênNơiĐăngString(tênNơiĐăng);
      dòngChính = tênNơiĐăngString;

      const loạiNơiĐăngString = tạoLoạiNơiĐăngString(item);
      dòngPhụ = <span id="loại-nơi-đăng">{loạiNơiĐăngString}</span>;
    }
  }
  return (
    <>
      <h2 id="dòng-chính" class="text-lg">{dòngChính}</h2>
      <span id="dòng-phụ" class="text-slate-400">{dòngPhụ}</span>
    </>
  );
}

export function DanhSáchKếtQuảTìmKiếm(
  { tênDanhSách, mụcĐượcChọn }: { tênDanhSách: TênDanhSách; mụcĐượcChọn: Signal<MụcĐượcChọn> },
) {
  const danhSáchKếtQuảTìmKiếm = searchList.value;
  if (tênDanhSách !== element.value || !danhSáchKếtQuảTìmKiếm) return <></>;
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
          class={cursor.value === index ? "cursor bg-secondary p-2 box-decoration-clone" : "p-2"}
          onClick={() => mụcĐượcChọn.value = item}
          onMouseEnter={() => cursor.value = index}
          onMouseLeave={() => cursor.value = -1}
        >
          <Item item={item.item} tênDanhSách={tênDanhSách} />
        </li>
      ))}
    </ul>
  );
}
