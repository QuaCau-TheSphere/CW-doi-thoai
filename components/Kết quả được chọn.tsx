import { ThamSốUTM } from "../core/Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { MụcĐượcChọn, TênDanhSách } from "../utils/Ki%E1%BB%83u%20cho%20web.ts";
import {
  NơiĐăngChưaXácĐịnhVịTrí,
} from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import {
  tạoLoạiNơiĐăngString,
  tạoTênNơiĐăngString,
  tạoVịTríString,
  viếtHoa,
} from "../utils/Hàm cho khung nhập.ts";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";

function tạoTiêuĐề(từKhoáTiêuĐề: string | TênDanhSách | undefined) {
  let tiêuĐề;
  if (từKhoáTiêuĐề === "bài đăng" || từKhoáTiêuĐề === "nơi đăng") {
    tiêuĐề = `${viếtHoa(từKhoáTiêuĐề)} được chọn:`;
  } else {
    tiêuĐề = từKhoáTiêuĐề;
  }
  return <h3 class="h3">{tiêuĐề}</h3>;
}

function thểHiệnThuộcTính(
  key: string,
  value: string | Record<string, string>,
) {
  if (typeof value === "object") {
    return (
      <details>
        <summary>{key}</summary>
        {Object.entries(value).map(([key2, value2]) => (
          <ul class="pl-8">
            <li>
              <span class="font-bold">{key2}:</span> {value2}
            </li>
          </ul>
        ))}
      </details>
    );
  } else {
    return (
      <li>
        <span class="font-bold">{key}</span>: {value}
      </li>
    );
  }
}

function BàiĐăngĐượcChọn({ bàiĐăng }: { bàiĐăng: BàiĐăng | undefined }) {
  if (!bàiĐăng) return <></>;
  const {
    "Tiêu đề": tiêuĐề,
    "Dự án": dựÁn,
    Vault: vault,
    "Nội dung bài đăng": nộiDung,
    url,
  } = bàiĐăng;
  const môTả = nộiDung?.["Mô tả bài đăng"] || "";
  const toànBộNộiDung = nộiDung?.["Toàn bộ nội dung"] || "";
  const địnhDạng = nộiDung?.["Định dạng nội dung"];
  return (
    <article class="bài-đăng-được-chọn prose border-2 rounded border-secondary p-4">
      <h2 class="h2 tên-bài-đăng">{tiêuĐề}</h2>
      <span class="font-xs text-slate-400 hover:text-primary-content">
        <span class="vault">Vault: {vault}</span>
        <br />
        <span class="dự-án">Dự án: {dựÁn?.["Tên dự án"]}</span>
        <br />
        <span class="url">URL: {url}</span>
        <br />
        <details>
          <summary>Nội dung liên kết</summary>
          <span class="mô-tả">Mô tả ngắn: {môTả}</span>
          <br />
          <span class="mô-tả">Định dạng: {địnhDạng}</span>
          <br />
          <span class="mô-tả">Toàn bộ nội dung:</span>
          <pre>{toànBộNộiDung}</pre>
        </details>
      </span>
    </article>
  );
}
function NơiĐăngĐượcChọn(
  { nơiĐăng }: { nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí | undefined },
) {
  if (!nơiĐăng) return <></>;
  const danhSáchLựaChọn = [];
  const { "Vị trí có thể đăng": danhSáchVịTríCóThểĐăng, URL: url } = nơiĐăng;
  for (const vịTríCóThểĐăng of danhSáchVịTríCóThểĐăng) {
    const value = JSON.stringify(vịTríCóThểĐăng);
    const text = tạoVịTríString(vịTríCóThểĐăng);
    danhSáchLựaChọn.push(<option value={value}>{text}</option>);
  }
  const tênNơiĐăngString = tạoTênNơiĐăngString(nơiĐăng["Tên nơi đăng"]);
  const loạiNơiĐăngString = tạoLoạiNơiĐăngString(nơiĐăng);

  return (
    <article class="nơi-đăng-được-chọn prose border-2 rounded border-secondary p-4">
      <h2 class="h2 tên-nơi-đăng">{tênNơiĐăngString}</h2>
      <span class="font-xs text-slate-400 hover:text-primary-content">
        <span class="loại-nơi-đăng">{loạiNơiĐăngString}</span>
        <br />
        <span class="url">URL: {url}</span>
      </span>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Vị trí</span>
        </div>
        <select
          name="Vị trí"
          class="select select-bordered w-full max-w-xs"
          id="vị-trí"
          required
        >
          {danhSáchLựaChọn}
        </select>
      </label>
    </article>
  );
}
export default function KếtQuảĐượcChọn(
  { từKhoáTiêuĐề, vậtThể }: {
    từKhoáTiêuĐề?: string;
    vậtThể: MụcĐượcChọn | ThamSốUTM | {
      "Thời điểm tạo": string;
      "Đuôi rút gọn": string;
    };
  },
) {
  if (vậtThể?.["Vị trí có thể đăng"]) {
    return <NơiĐăngĐượcChọn nơiĐăng={vậtThể} />;
  } else if (vậtThể?.["Tiêu đề"]) {
    return <BàiĐăngĐượcChọn bàiĐăng={vậtThể} />;
  } else return <></>;
}
// export default function KếtQuảĐượcChọn(
//   { từKhoáTiêuĐề, vậtThể }: {
//     từKhoáTiêuĐề?: string;
//     vậtThể: MụcĐượcChọn | ThamSốUTM | {
//       "Thời điểm tạo": string;
//       "Đuôi rút gọn": string;
//     };
//   },
// ) {
//   if (vậtThể) {
//     return (
//       <article class="nội-dung-vật-thể prose border-2 rounded border-secondary p-4">
//         {tạoTiêuĐề(từKhoáTiêuĐề)}
//         <ul>
//           {Object.entries(vậtThể).map(([key, value]) =>
//             thểHiệnThuộcTính(key, value)
//           )}
//         </ul>
//       </article>
//     );
//   } else return <></>;
// }
