import {
  DanhSáchVịTríCóThểĐăng,
  NơiĐăngChưaXácĐịnhVịTrí,
  tạoNơiĐăngĐãXácĐịnhVịTrí,
} from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import {
  nơiĐăngChưaXácĐịnhVịTríĐượcChọn,
  nơiĐăngĐãXácĐịnhVịTríĐượcChọn,
  vịTríString,
} from "../Signals.ts";
import {
  tạoLoạiNơiĐăngString,
  tạoTênNơiĐăngString,
  tạoVịTríString,
} from "../../utils/Hàm cho khung nhập.ts";

/** Tạo danh sách các phần tử <option> để người dùng lựa chọn vị trí đăng từ danh sách vị trí có thể đăng*/
function tạoDanhSáchLựaChọn(
  danhSáchVịTríCóThểĐăng: DanhSáchVịTríCóThểĐăng | undefined,
  nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí,
) {
  if (!danhSáchVịTríCóThểĐăng) return [];
  const danhSáchLựaChọn = [];
  for (const vịTríCóThểĐăng of danhSáchVịTríCóThểĐăng) {
    const value = JSON.stringify(vịTríCóThểĐăng);
    const text = tạoVịTríString(vịTríCóThểĐăng);
    const i = danhSáchVịTríCóThểĐăng.indexOf(vịTríCóThểĐăng);

    if (i === 0) {
      danhSáchLựaChọn.push(<option selected value={value}>{text}</option>);
      const vịTrí = vịTríString.value;
      if (!vịTrí) {
        vịTríString.value = value;
        nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value = tạoNơiĐăngĐãXácĐịnhVịTrí(
          value,
          nơiĐăng,
        );
      }
    } else {
      danhSáchLựaChọn.push(<option value={value}>{text}</option>);
    }
  }
  return danhSáchLựaChọn;
}

function handleChange(
  vịTríStringĐượcChọn: string,
  nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí,
) {
  vịTríString.value = vịTríStringĐượcChọn;
  nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value = tạoNơiĐăngĐãXácĐịnhVịTrí(
    vịTríStringĐượcChọn,
    nơiĐăng,
  );
}

export default function NơiĐăngĐượcChọn() {
  const nơiĐăng = nơiĐăngChưaXácĐịnhVịTríĐượcChọn.value;
  if (!nơiĐăng) return <></>;
  const {
    "Tên nơi đăng": tênNơiĐăng,
    URL: url,
    "Vị trí có thể đăng": danhSáchVịTríCóThểĐăng,
  } = nơiĐăng;
  const danhSáchLựaChọn = tạoDanhSáchLựaChọn(danhSáchVịTríCóThểĐăng, nơiĐăng);

  const tênNơiĐăngString = tạoTênNơiĐăngString(tênNơiĐăng);
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
          value={vịTríString.value}
          onChange={(e) =>
            handleChange((e.target as HTMLSelectElement).value, nơiĐăng)}
          required
        >
          {danhSáchLựaChọn}
        </select>
      </label>
    </article>
  );
}
