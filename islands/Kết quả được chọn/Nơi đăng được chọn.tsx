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
    <article
      id="nơi-đăng-được-chọn"
      class="card w-full bg-base-200 shadow-xl"
    >
      <div class="card-body">
        <h2 id="tên-nơi-đăng" class="card-title">{tênNơiĐăngString}</h2>
        <span class="font-xs text-slate-400">
          <span id="loại-nơi-đăng" class="hover:text-primary-content">
            {loạiNơiĐăngString}
          </span>
          <br />
          <span id="url" class="hover:text-primary-content">URL: {url}</span>
        </span>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text font-bold">Vị trí</span>
          </div>
          <select
            name="Vị trí"
            class="select select-bordered w-full max-w-xs prose"
            id="vị-trí"
            value={vịTríString.value}
            onChange={(e) =>
              handleChange((e.target as HTMLSelectElement).value, nơiĐăng)}
            required
          >
            {danhSáchLựaChọn}
          </select>
        </label>
      </div>
    </article>
  );
}
