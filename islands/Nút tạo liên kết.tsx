import {
  bàiĐăngĐượcChọn,
  bốiCảnh,
  cấuHìnhChungSignal,
  lầnĐăngHiệnTại,
  nơiĐăngCóMộtVịTríCụThể,
  tênNút,
  vậtThểTiếpThịĐượcTạo,
} from "./Signals tổng.ts";
import tạoVậtThểUTM from "../Code hỗ trợ cho client/Tạo liên kết UTM/Tạo tham số UTM.ts";
import { tạoĐuôiRútGọn } from "../Code hỗ trợ cho client/Tạo liên kết UTM/Tạo đuôi rút gọn.ts";
import { ghiVậtThểTiếpThịLênKV } from "../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";

async function tạoVậtThểTiếpThị() {
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const nơiĐăng = nơiĐăngCóMộtVịTríCụThể.value;
  const bốicảnh = bốiCảnh.value;
  const cấuHìnhViếtTắt = cấuHìnhChungSignal.value["Viết tắt"];
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
