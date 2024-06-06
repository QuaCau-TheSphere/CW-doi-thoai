import {
  bàiĐăngĐượcChọn,
  bốiCảnh,
  cấuHìnhChungSignal,
  lầnĐăngHiệnTại,
  nơiĐăngCóMộtVịTríCụThể,
  tênNút,
  vậtThểTiếpThịĐượcTạo,
} from "./Signals tổng.ts";
import { ghiVậtThểTiếpThịLênKV } from "../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { tạoVậtThểTiếpThị, VậtThểTiếpThị } from "../Code hỗ trợ cho client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { cóRútGọn } from "./Signals tổng.ts";

function tạoHoverTitle(vậtThểTiếpThị: VậtThểTiếpThị): string {
  if (cóRútGọn.value) return `${origin}/${vậtThểTiếpThị["Đuôi rút gọn"]}`;
  return vậtThểTiếpThị["Liên kết UTM"].href;
}
export function NútTạoLiênKết() {
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const nơiĐăng = nơiĐăngCóMộtVịTríCụThể.value;
  const bốicảnh = bốiCảnh.value;
  const cấuHìnhViếtTắt = cấuHìnhChungSignal.value["Viết tắt"];
  const lầnĐăng = lầnĐăngHiệnTại.value;

  if (!bàiĐăng || !nơiĐăng) {
    return (
      <button
        class="btn btn-secondary gap-2"
        id="nút-tạo-liên-kết"
        title="Cần chọn bài đăng và nơi đăng trước khi rút gọn liên kết"
      >
        {tênNút.value}
      </button>
    );
  }
  const vậtThểTiếpThị = tạoVậtThểTiếpThị({ bàiĐăng: bàiĐăng, nơiĐăng: nơiĐăng, bốiCảnh: bốicảnh, lầnĐăng: lầnĐăng, cấuHìnhViếtTắt: cấuHìnhViếtTắt });

  return (
    <button
      class="btn btn-secondary gap-2"
      id="nút-tạo-liên-kết"
      onClick={async () => {
        vậtThểTiếpThịĐượcTạo.value = vậtThểTiếpThị;
        console.info("Bài đăng được chọn:", bàiĐăngĐượcChọn.value);
        console.info("Nơi đăng được chọn:", nơiĐăngCóMộtVịTríCụThể.value);
        await ghiVậtThểTiếpThịLênKV(vậtThểTiếpThị);
      }}
      title={tạoHoverTitle(vậtThểTiếpThị)}
    >
      {tênNút.value}
    </button>
  );
}
