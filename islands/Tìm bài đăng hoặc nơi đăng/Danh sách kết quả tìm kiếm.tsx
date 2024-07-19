import { Signal } from "@preact/signals";
import { element } from "../Signals tổng.ts";
import { cursor } from "./Signal tìm bài đăng hoặc nơi đăng.ts";
import { DanhSáchKếtQuảTìmKiếmType, MụcĐượcChọn, TênDanhSách, đổiKhungNhập } from "../../Code chạy trên client/Hàm và kiểu cho khung nhập.ts";
import { xửLýPunycode } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { kiểuKebab, tạoLoạiNơiĐăngString, tạoTênNơiĐăngString } from "../../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { BàiĐăng } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Code chạy trên client/Hàm và kiểu cho vị trí.ts";
import { JSX } from "preact";

function ChữHiểnThị({ dòngChính, dòngPhụ }: { dòngChính: JSX.Element | string | undefined | null; dòngPhụ: JSX.Element }) {
  return (
    <>
      <h2 class="dòng-chính text-lg">{dòngChính}</h2>
      <span class="dòng-phụ text-slate-400">{dòngPhụ}</span>
    </>
  );
}

function tạoDòngPhụCủaBàiĐăng(bàiĐăng: BàiĐăng) {
  const { "Dự án": dựÁn, "Kho thông tin": khoThôngTin, URL } = bàiĐăng;
  let key, value;
  if (dựÁn && dựÁn["Tên dự án"]) {
    key = "Dự án";
    value = dựÁn["Tên dự án"];
  } else if (khoThôngTin) {
    key = "Kho thông tin";
    value = khoThôngTin;
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
      dòngPhụ = <span class="nơi-lưu-bài-đăng">{tạoDòngPhụCủaBàiĐăng(item)}</span>;
      break;
    }
    case "nơi đăng": {
      item = item as NơiĐăngCóCácLựaChọnVịTrí;
      const {
        "Tên nơi đăng": tênNơiĐăng,
        "Mô tả nơi đăng": môTảNơiĐăng,
      } = item;
      if (!Array.isArray(tênNơiĐăng)) return <></>;
      dòngChính = tạoTênNơiĐăngString(tênNơiĐăng) || môTảNơiĐăng;
      dòngPhụ = <span class="loại-nơi-đăng">{tạoLoạiNơiĐăngString(item)}</span>;
    }
  }
  return <ChữHiểnThị dòngChính={dòngChính} dòngPhụ={dòngPhụ} />;
}

export function DanhSáchKếtQuảTìmKiếm(
  { tênDanhSách, mụcĐượcChọnSignal, querySignal, danhSáchKếtQuảTìmKiếm }: {
    tênDanhSách: TênDanhSách;
    mụcĐượcChọnSignal: Signal<MụcĐượcChọn>;
    querySignal: Signal<string>;
    danhSáchKếtQuảTìmKiếm: DanhSáchKếtQuảTìmKiếmType;
  },
) {
  if (tênDanhSách !== element.value || !danhSáchKếtQuảTìmKiếm || !querySignal.value) return <></>;
  if (danhSáchKếtQuảTìmKiếm.length === 0) {
    const dòngChính = <>❗Danh sách {tênDanhSách} hiện tại chưa có từ khoá hoặc URL này</>;
    const dòngPhụ = (
      <>
        Để lưu {tênDanhSách} mới vào hệ thống, hãy dán URL vào ô nhập rồi bấm <kbd class="kbd bg-secondary">Enter</kbd>
      </>
    );
    return (
      <ul class="cursor border-2 rounded border-secondary">
        <li class="bg-secondary p-2">
          <ChữHiểnThị dòngChính={dòngChính} dòngPhụ={dòngPhụ} />
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
