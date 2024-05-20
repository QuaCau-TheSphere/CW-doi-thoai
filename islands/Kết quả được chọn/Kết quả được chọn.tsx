import { TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { kiểuKebab } from "../../utils/Hàm cho khung nhập.ts";
import { bàiĐăngĐượcChọn } from "../Signals tổng.ts";
import NơiĐăngĐượcChọn from "./Nơi đăng được chọn.tsx";

function BàiĐăngĐượcChọn() {
  if (!bàiĐăngĐượcChọn.value) return <></>;
  const {
    "Tiêu đề": tiêuĐề,
    "Dự án": dựÁn,
    Vault: vault,
    "Nội dung bài đăng": nộiDung,
    URL: url,
    id,
    "Tác giả": tácGiả,
    "Mã bài đăng": mãBàiĐăng,
    "Ngày tạo": ngàyTạo,
    "Ngày cập nhật": ngàyCậpNhật,
  } = bàiĐăngĐượcChọn.value;
  const môTả = nộiDung?.["Mô tả bài đăng"] || "";
  const toànBộNộiDung = nộiDung?.["Toàn bộ nội dung"] || "";
  const địnhDạng = nộiDung?.["Định dạng nội dung"];
  return (
    <article id="bài-đăng-được-chọn" class="card w-full bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 id="tên-bài-đăng" class="card-title">{tiêuĐề}</h2>
        <ul class="font-xs text-slate-400">
          <li id="vault" class="hover:text-primary-content">Vault: {vault}</li>
          <li id="dự-án" class="hover:text-primary-content">Dự án: {dựÁn?.["Tên dự án"]}</li>
          <li id="url" class="hover:text-primary-content">URL: {url}</li>
          <li id="khác" class="hover:text-primary-content">
            <span id="tác-giả">Tác giả: {tácGiả}</span> • <span id="mã-bài-đăng">Mã bài đăng: {mãBàiĐăng}</span> •{" "}
            <span id="ngày-tạo">Ngày tạo: {ngàyTạo}</span> • <span id="ngày-cập-nhật">Ngày cập nhật: {ngàyCậpNhật}</span> •{" "}
            <span id="id">id: {id}</span>
          </li>
          <details id="nội-dung-liên-kết" class="hover:text-primary-content">
            <summary>Nội dung liên kết</summary>
            <ul>
              <li id="mô-tả">Mô tả ngắn: {môTả}</li>
              <li id="định-dạng">Định dạng: {địnhDạng}</li>
              <li id="toàn-bộ-nội-dung" class="prose">
                Toàn bộ nội dung:<pre>{toànBộNộiDung}</pre>
              </li>
            </ul>
          </details>
        </ul>
      </div>
    </article>
  );
}

function VậtThểKhác({ vậtThể, loạiVậtThể }: { vậtThể: Record<string, any>; loạiVậtThể: string }) {
  const danhSáchPhầnTử = [];
  for (const [key, value] of Object.entries(vậtThể)) {
    if (typeof value === "object") {
      danhSáchPhầnTử.push(
        <details>
          <summary>{key}</summary>
          {Object.entries(value).map(([key2, value2]) => <ListItem loạiDữLiệu={key2} dữLiệu={value2} />)}
        </details>,
      );
    } else {
      danhSáchPhầnTử.push(<ListItem loạiDữLiệu={key} dữLiệu={value} />);
    }
  }
  return (
    <article id={kiểuKebab(loạiVậtThể)} class="prose card bg-base-200 shadow-xl">
      <div class="card-body">
        <ul>{danhSáchPhầnTử}</ul>
      </div>
    </article>
  );
  function ListItem({ loạiDữLiệu, dữLiệu }: { loạiDữLiệu: string; dữLiệu: any }) {
    return (
      <li id={kiểuKebab(loạiDữLiệu)}>
        <strong class="font-bold">{loạiDữLiệu}:</strong> {String(dữLiệu)}
      </li>
    );
  }
}

export default function KếtQuảĐượcChọn(
  { loạiVậtThể, vậtThể }: {
    loạiVậtThể: TênDanhSách | "tham số UTM";
    vậtThể?: Record<string, any>;
  },
) {
  switch (loạiVậtThể) {
    case "bài đăng":
      return <BàiĐăngĐượcChọn />;
    case "nơi đăng":
      return <NơiĐăngĐượcChọn />;
    default:
      if (!vậtThể) return <></>;
      return <VậtThểKhác loạiVậtThể={loạiVậtThể} vậtThể={vậtThể} />;
  }
}
