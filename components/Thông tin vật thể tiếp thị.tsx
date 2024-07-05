import { VậtThểTiếpThị } from "../Code chạy trên client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { kiểuKebab, lấyGiờVN, viếtHoa } from "../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";

function ListItem({ loạiDữLiệu, dữLiệu }: { loạiDữLiệu: string; dữLiệu: any }) {
  return (
    <li id={kiểuKebab(loạiDữLiệu)}>
      <strong class="font-bold">{loạiDữLiệu}:</strong> {String(dữLiệu)}
    </li>
  );
}

export function VậtThểKhác({ vậtThể, loạiVậtThể, cóTiêuĐề }: { vậtThể: Record<string, any>; loạiVậtThể: string; cóTiêuĐề?: boolean }) {
  const danhSáchPhầnTử = [];
  for (const [key, value] of Object.entries(vậtThể)) {
    if (typeof value === "object" && value) {
      danhSáchPhầnTử.push(
        <details>
          <summary>{key}</summary>
          {Object.entries(value).map(([key2, value2]) => <ListItem loạiDữLiệu={key2} dữLiệu={value2} />)}
        </details>,
      );
    } else {
      danhSáchPhầnTử.push(<ListItem loạiDữLiệu={key} dữLiệu={value} />);
    }
    console.log("dsfdf");
  }
  return (
    <article id={kiểuKebab(loạiVậtThể)} class="card w-full bg-base-200 shadow-xl">
      <div class="card-body">
        {cóTiêuĐề ? <h2 class="card-title">{viếtHoa(loạiVậtThể)}</h2> : <></>}
        <ul>{danhSáchPhầnTử}</ul>
      </div>
    </article>
  );
}

export default function ThôngTinVậtThểTiếpThị({ vậtThểTiếpThị }: { vậtThểTiếpThị: VậtThểTiếpThị }) {
  console.log("🚀 ~ vậtThểTiếpThị:", vậtThểTiếpThị);
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
