import { ThamSốUTM } from "../core/Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { viếtHoa } from "../utils/H%C3%A0m%20cho%20khung%20nh%E1%BA%ADp.ts";
import { MụcĐượcChọn, TênDanhSách } from "../utils/Ki%E1%BB%83u%20cho%20web.ts";

function tạoTiêuĐề(từKhoáTiêuĐề: string | TênDanhSách | undefined) {
  let tiêuĐề;
  if (từKhoáTiêuĐề === "bài đăng" || từKhoáTiêuĐề === "nơi đăng") {
    tiêuĐề = `${viếtHoa(từKhoáTiêuĐề)} được chọn:`;
  } else {
    tiêuĐề = từKhoáTiêuĐề;
  }
  return <h3 class="h3">{tiêuĐề}</h3>;
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
  function thểHiệnThuộcTính(
    key: string,
    value: string | Record<string, string>,
    // paddingLeft: number = 4
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
  if (vậtThể) {
    return (
      <article class="nội-dung-vật-thể prose border-2 rounded border-secondary p-4">
        {tạoTiêuĐề(từKhoáTiêuĐề)}
        <ul>
          {Object.entries(vậtThể).map(([key, value]) =>
            thểHiệnThuộcTính(key, value)
          )}
        </ul>
      </article>
    );
  } else return <></>;
}
