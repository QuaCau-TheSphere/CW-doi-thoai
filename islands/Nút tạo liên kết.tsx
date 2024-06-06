import { bàiĐăngSignal, nơiĐăngCóMộtVịTríCụThểSignal, tênNút, vậtThểTiếpThịSignal } from "./Signals tổng.ts";
import { ghiVậtThểTiếpThịLênKV } from "../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { tạoVậtThểTiếpThị, VậtThểTiếpThị } from "../Code hỗ trợ cho client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { cóRútGọn } from "./Signals tổng.ts";

function tạoHoverTitle(vậtThểTiếpThị: VậtThểTiếpThị | void): string {
  if (!vậtThểTiếpThị) return "Cần chọn bài đăng và nơi đăng trước khi rút gọn liên kết";
  if (cóRútGọn.value) return `${origin}/${vậtThểTiếpThị["Đuôi rút gọn"]}`;
  return vậtThểTiếpThị["Liên kết UTM"].href;
}

export async function bấmNútTạoLiênKết(vậtThểTiếpThị: VậtThểTiếpThị | void) {
  vậtThểTiếpThịSignal.value = vậtThểTiếpThị;
  if (!vậtThểTiếpThị) return;
  console.info("Bài đăng được chọn:", bàiĐăngSignal.value);
  console.info("Nơi đăng được chọn:", nơiĐăngCóMộtVịTríCụThểSignal.value);
  await ghiVậtThểTiếpThịLênKV(vậtThểTiếpThị);
}

export function NútTạoLiênKết() {
  const vậtThểTiếpThị = tạoVậtThểTiếpThị();
  return (
    <button
      class="btn btn-secondary gap-2"
      id="nút-tạo-liên-kết"
      onClick={async () => await bấmNútTạoLiênKết(vậtThểTiếpThị)}
      title={tạoHoverTitle(vậtThểTiếpThị)}
    >
      {tênNút.value}
    </button>
  );
}
