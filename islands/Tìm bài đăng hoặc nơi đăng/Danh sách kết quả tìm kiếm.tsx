import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/plus.tsx";
import { MụcĐượcChọn, TênDanhSách, đổiKhungNhập } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { BàiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { element } from "../Signals tổng.ts";
import { cursor, danhSáchGợiÝSignal } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { Signal } from "@preact/signals";
import { kiểuKebab, tạoLoạiNơiĐăngString, tạoTênNơiĐăngString } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { xửLýPunycode } from "../../Code hỗ trợ cho client/Hàm và kiểu cho URL.ts";

function tạoDòngPhụCủaBàiĐăng(bàiĐăng: BàiĐăng) {
  const { "Dự án": dựÁn, Vault: vault, URL, "Slug": mãBàiĐăng, id } = bàiĐăng;
  let key, value;
  if (dựÁn && dựÁn["Tên dự án"]) {
    key = "Dự án";
    value = dựÁn["Tên dự án"];
  } else if (vault) {
    key = "Vault";
    value = vault;
  }
  if (value) return <>{key}: {value}</>;
  return <>URL: {xửLýPunycode(URL, true)}</>;
}

function Item({ item, tênDanhSách }: { item: BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí; tênDanhSách: TênDanhSách }) {
  let dòngChính, dòngPhụ;
  switch (tênDanhSách) {
    case "bài đăng": {
      item = item as BàiĐăng;
      dòngChính = item["Tiêu đề"];
      dòngPhụ = <span id="nơi-lưu-bài-đăng">{tạoDòngPhụCủaBàiĐăng(item)}</span>;
      break;
    }
    case "nơi đăng": {
      item = item as NơiĐăngCóCácLựaChọnVịTrí;
      const tênNơiĐăng = item["Tên nơi đăng"];
      if (!Array.isArray(tênNơiĐăng)) return <></>;
      dòngChính = tạoTênNơiĐăngString(tênNơiĐăng);
      dòngPhụ = <span id="loại-nơi-đăng">{tạoLoạiNơiĐăngString(item)}</span>;
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
  { tênDanhSách, mụcĐượcChọnSignal, querySignal }: { tênDanhSách: TênDanhSách; mụcĐượcChọnSignal: Signal<MụcĐượcChọn>; querySignal: Signal<string> },
) {
  const danhSáchKếtQuảTìmKiếm = danhSáchGợiÝSignal.value;
  if (tênDanhSách !== element.value || !danhSáchKếtQuảTìmKiếm || !querySignal.value) return <></>;
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
          onClick={() => {
            mụcĐượcChọnSignal.value = item.doc;
            đổiKhungNhập("xuôi");
          }}
          onMouseEnter={() => cursor.value = index}
          onMouseLeave={() => cursor.value = -1}
        >
          <Item item={item.doc} tênDanhSách={tênDanhSách} />
        </li>
      ))}
    </ul>
  );
}
