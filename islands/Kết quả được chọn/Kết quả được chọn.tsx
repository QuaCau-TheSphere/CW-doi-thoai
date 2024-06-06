import { lấyGiờVN } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import { bàiĐăngSignal } from "../Signals tổng.ts";
import NơiĐăngĐượcChọn from "./Nơi đăng được chọn.tsx";
import { xửLýPunycode } from "../../Code hỗ trợ cho client/Hàm và kiểu cho URL.ts";

function BàiĐăngĐượcChọn() {
  if (!bàiĐăngSignal.value) return <></>;
  const {
    "Tiêu đề": tiêuĐề,
    "Dự án": dựÁn,
    Vault: vault,
    "Nội dung bài đăng": nộiDung,
    URL: url,
    id,
    "Tác giả": tácGiả,
    Slug: slug,
    "Ngày tạo": ngàyTạo,
    "Ngày cập nhật": ngàyCậpNhật,
  } = bàiĐăngSignal.value;
  const môTả = nộiDung?.["Mô tả bài đăng"] || "";
  const toànBộNộiDung = nộiDung?.["Toàn bộ nội dung"] || "";
  const địnhDạng = nộiDung?.["Định dạng nội dung"];
  const liênKết = xửLýPunycode(url, true);

  return (
    <article id="bài-đăng-được-chọn" class="card w-full bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 id="tên-bài-đăng" class="card-title">{tiêuĐề}</h2>
        <ul class="font-xs text-slate-400">
          <li id="vault" class="hover:text-primary-content">Vault: {vault || "∅"}</li>
          <li id="dự-án" class="hover:text-primary-content">Dự án: {dựÁn?.["Tên dự án"] || "∅"}</li>
          <li id="liên-kết" class="hover:text-primary-content">Liên kết: {liênKết ? <a href={liênKết}>{liênKết}</a> : "∅"}</li>
          <li id="tác-giả" class="hover:text-primary-content">Tác giả: {tácGiả || "∅"}</li>
          <li id="ngày-tạo" class="hover:text-primary-content">Ngày tạo: {lấyGiờVN(ngàyTạo) || "∅"}</li>
          <li id="ngày-cập-nhật" class="hover:text-primary-content">Ngày cập nhật: {lấyGiờVN(ngàyCậpNhật) || "∅"}</li>
          <li id="slug-bài-đăng" class="hover:text-primary-content">Slug: {slug || "∅"}</li>

          <details id="nội-dung-liên-kết" class="hover:text-primary-content">
            <summary>Nội dung liên kết</summary>
            <ul>
              <li id="mô-tả">Mô tả ngắn: {môTả}</li>
              <li id="định-dạng">Định dạng: {địnhDạng}</li>
              <li id="toàn-bộ-nội-dung" class="prose max-w-none">
                Toàn bộ nội dung:<pre>{toànBộNộiDung}</pre>
              </li>
            </ul>
          </details>
        </ul>
      </div>
    </article>
  );
}

export default function KếtQuảĐượcChọn({ loạiVậtThể }: { loạiVậtThể: TênDanhSách }) {
  switch (loạiVậtThể) {
    case "bài đăng":
      return <BàiĐăngĐượcChọn />;
    case "nơi đăng":
      return <NơiĐăngĐượcChọn />;
  }
}
