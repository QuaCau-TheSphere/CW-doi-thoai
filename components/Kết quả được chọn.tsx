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
  function lấyGiáTrị(giáTrị: string | Record<string, string>) {
    if (typeof giáTrị === "object") {
      return Object.entries(giáTrị).map(([key, value]) => (
        <li>{key}: {value}</li>
      ));
    } else {
      return giáTrị;
    }
  }
  if (vậtThể) {
    return (
      <article class="nội-dung-vật-thể prose border-2 rounded border-secondary p-4">
        {tạoTiêuĐề(từKhoáTiêuĐề)}
        <ul>
          {Object.entries(vậtThể).map(([key, value]) => (
            <li>
              <span class="font-bold">{key}</span>: {lấyGiáTrị(value)}
            </li>
          ))}
        </ul>
      </article>
    );
  } else return <></>;
}
