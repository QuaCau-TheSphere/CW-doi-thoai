import {
  bàiĐăngĐượcChọn,
  bốiCảnh,
  cấuHìnhViếtTắtSignal,
  lầnĐăngHiệnTại,
  nơiĐăngCóMộtVịTríCụThể,
  tênNút,
  vậtThểTiếpThịĐượcTạo,
} from "./Signals tổng.ts";
import tạoVậtThểUTM from "../core/B. Tạo kết quả/3. Tạo liên kết/Tạo tham số UTM.ts";
import { tạoĐuôiRútGọn } from "../core/B. Tạo kết quả/3. Tạo liên kết/Tạo đuôi rút gọn.ts";
import { ghiVậtThểTiếpThịLênKV } from "../utils/Hàm và kiểu cho API server.ts";

async function tạoVậtThểTiếpThị() {
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const nơiĐăng = nơiĐăngCóMộtVịTríCụThể.value;
  const bốicảnh = bốiCảnh.value;
  const cấuHìnhViếtTắt = cấuHìnhViếtTắtSignal.value;
  const lầnĐăng = lầnĐăngHiệnTại.value;

  if (!bàiĐăng) {
    console.error("Chưa có bài đăng");
    return;
  }
  if (!nơiĐăng) {
    console.error("Chưa có nơi đăng");
    return;
  }
  const thamSốUTMVàLiênKếtRútGọn = tạoVậtThểUTM(
    {
      bàiĐăng: bàiĐăng,
      nơiĐăng: nơiĐăng,
      bốiCảnh: bốicảnh,
      cấuHìnhViếtTắt: cấuHìnhViếtTắt,
    },
  );

  vậtThểTiếpThịĐượcTạo.value = {
    ...{
      "Bài đăng": bàiĐăng,
      "Nơi đăng": nơiĐăng,
      "Thời điểm tạo": new Date(),
      "Lần đăng": lầnĐăng,
      "Đuôi rút gọn": tạoĐuôiRútGọn(bàiĐăng, nơiĐăng, lầnĐăng, cấuHìnhViếtTắt),
      "Các lần truy cập": {},
    },
    ...thamSốUTMVàLiênKếtRútGọn,
  };
  console.info("Bài đăng được chọn:", bàiĐăng);
  console.info("Nơi đăng được chọn:", nơiĐăng);

  await ghiVậtThểTiếpThịLênKV(vậtThểTiếpThịĐượcTạo.value);
}

export function NútTạoLiênKết() {
  return (
    <button
      class="btn btn-secondary gap-2"
      id="nút-tạo-liên-kết"
      onClick={async () => await tạoVậtThểTiếpThị()}
    >
      {tênNút.value}
    </button>
  );
}
