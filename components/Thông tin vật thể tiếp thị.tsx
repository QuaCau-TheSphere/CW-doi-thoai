import { kiểuKebab, lấyGiờVN, viếtHoa } from "../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { VậtThểTiếpThị } from "../Code hỗ trợ cho client/Kiểu cho vật thể tiếp thị.ts";

export function VậtThểKhác({ vậtThể, loạiVậtThể, cóTiêuĐề }: { vậtThể: Record<string, any>; loạiVậtThể: string; cóTiêuĐề?: boolean }) {
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
    <article id={kiểuKebab(loạiVậtThể)} class="card w-full bg-base-200 shadow-xl">
      <div class="card-body">
        {cóTiêuĐề ? <h2 class="card-title">{viếtHoa(loạiVậtThể)}</h2> : <></>}
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

export default function ThôngTinVậtThểTiếpThị({ vậtThểTiếpThị }: { vậtThểTiếpThị: VậtThểTiếpThị }) {
  const {
    "Bài đăng": bàiĐăng,
    "Nơi đăng": nơiĐăng,
    "Tham số UTM": thamSốUTM,
    "Thời điểm tạo": thờiĐiểmTạo,
    "Đuôi rút gọn": đuôiRútGọn,
  } = vậtThểTiếpThị;
  const khác = {
    "Thời điểm tạo": lấyGiờVN(thờiĐiểmTạo),
    "Đuôi rút gọn": đuôiRútGọn,
  };
  return (
    <article class="grid grid-cols-2 gap-4">
      <VậtThểKhác vậtThể={bàiĐăng} loạiVậtThể="Bài đăng" cóTiêuĐề />
      <VậtThểKhác vậtThể={nơiĐăng} loạiVậtThể="Nơi đăng" cóTiêuĐề />
      <VậtThểKhác vậtThể={thamSốUTM} loạiVậtThể="Tham số UTM" cóTiêuĐề />
      <VậtThểKhác vậtThể={khác} loạiVậtThể="Thông tin khác" cóTiêuĐề />
    </article>
  );
}
