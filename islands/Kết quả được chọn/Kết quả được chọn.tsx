import { TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { kiểuKebab, viếtHoa } from "../../utils/Hàm cho khung nhập.ts";
import { bàiĐăngĐượcChọn } from "../Signals.ts";
import NơiĐăngĐượcChọn from "./Nơi đăng được chọn.tsx";

function BàiĐăngĐượcChọn() {
  if (!bàiĐăngĐượcChọn.value) return <></>;
  const {
    "Tiêu đề": tiêuĐề,
    "Dự án": dựÁn,
    Vault: vault,
    "Nội dung bài đăng": nộiDung,
    URL: url,
  } = bàiĐăngĐượcChọn.value;
  const môTả = nộiDung?.["Mô tả bài đăng"] || "";
  const toànBộNộiDung = nộiDung?.["Toàn bộ nội dung"] || "";
  const địnhDạng = nộiDung?.["Định dạng nội dung"];
  return (
    <article
      id="bài-đăng-được-chọn"
      class="card w-full bg-base-200 shadow-xl"
    >
      <div class="card-body">
        <h2 id="tên-bài-đăng" class="card-title">{tiêuĐề}</h2>
        <span class="font-xs text-slate-400">
          <span id="vault" class="hover:text-primary-content">
            Vault: {vault}
          </span>
          <br />
          <span id="dự-án" class="hover:text-primary-content">
            Dự án: {dựÁn?.["Tên dự án"]}
          </span>
          <br />
          <span id="url" class="hover:text-primary-content">URL: {url}</span>
          <br />
          <details id="nội-dung-liên-kết" class="hover:text-primary-content">
            <summary>Nội dung liên kết</summary>
            <span id="mô-tả">Mô tả ngắn: {môTả}</span>
            <br />
            <span id="định-dạng">Định dạng: {địnhDạng}</span>
            <br />
            <div id="toàn-bộ-nội-dung">
              Toàn bộ nội dung:
              <pre>{toànBộNộiDung}</pre>
            </div>
          </details>
        </span>
      </div>
    </article>
  );
}

function VậtThểKhác(
  { vậtThể, loạiVậtThể }: { vậtThể: Record<string, any>; loạiVậtThể: string },
) {
  const danhSáchPhầnTử = [];
  for (const [key, value] of Object.entries(vậtThể)) {
    if (typeof value === "object") {
      danhSáchPhầnTử.push(
        <details>
          <summary>{key}</summary>
          {Object.entries(value).map(([key2, value2]) => (
            <ListItems loạiDữLiệu={key2} dữLiệu={value2} />
          ))}
        </details>,
      );
    } else {
      danhSáchPhầnTử.push(
        <ListItems loạiDữLiệu={key} dữLiệu={value} />,
      );
    }
  }
  return (
    <article
      id={kiểuKebab(loạiVậtThể)}
      class="prose card bg-base-200 shadow-xl"
    >
      <div class="card-body">
        <ul>{danhSáchPhầnTử}</ul>
      </div>
    </article>
  );
  function ListItems(
    { loạiDữLiệu, dữLiệu }: { loạiDữLiệu: string; dữLiệu: any },
  ) {
    return (
      <li id={kiểuKebab(loạiDữLiệu)}>
        <span class="font-bold">{loạiDữLiệu}:</span> {String(dữLiệu)}
        <br></br>
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

function tạoTiêuĐề(từKhoáTiêuĐề: string | TênDanhSách | undefined) {
  let tiêuĐề;
  if (từKhoáTiêuĐề === "bài đăng" || từKhoáTiêuĐề === "nơi đăng") {
    tiêuĐề = `${viếtHoa(từKhoáTiêuĐề)} được chọn:`;
  } else {
    tiêuĐề = từKhoáTiêuĐề;
  }
  return <h3 class="h3">{tiêuĐề}</h3>;
}
