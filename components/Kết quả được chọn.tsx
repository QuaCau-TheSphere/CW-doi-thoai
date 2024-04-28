import { ThamSốUTM } from "../core/Code hỗ trợ/Kiểu cho tham số UTM.ts";
import {
  kebabCase,
  viếtHoa,
} from "../utils/H%C3%A0m%20cho%20khung%20nh%E1%BA%ADp.ts";
import { MụcĐượcChọn, TênDanhSách } from "../utils/Ki%E1%BB%83u%20cho%20web.ts";

export default function KếtQuảĐượcChọn(
  { tênDanhSách, mụcĐượcChọn }: {
    tênDanhSách: TênDanhSách | "tham số UTM" | "thông tin khác";
    mụcĐượcChọn: MụcĐượcChọn | ThamSốUTM | {
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
  if (mụcĐượcChọn) {
    return (
      <div class="prose result border-2 rounded border-secondary p-4">
        <h3 class="h3">{`${viếtHoa(tênDanhSách)}:`}</h3>
        <ul id={`${kebabCase(tênDanhSách)}-được-chọn`}>
          {Object.entries(mụcĐượcChọn).map(([key, value]) => (
            <li>
              <span class="font-bold">{key}</span>: {lấyGiáTrị(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  } else return <></>;
}
