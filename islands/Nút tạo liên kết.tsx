import {
  bàiĐăngĐượcChọn,
  bốiCảnh,
  cấuHìnhNơiĐăng,
  lầnĐăngHiệnTại,
  nơiĐăngĐãXácĐịnhVịTríĐượcChọn,
  tênNút,
  vậtThểTiếpThịĐượcTạo,
} from "./Signals.ts";
import tạoThamSốUTMVàLiênKếtRútGọn from "../core/B. Tạo kết quả/3. Tạo tham số UTM và liên kết rút gọn.ts";

async function ghiLênKV() {
  const đuôiRútGọn = vậtThểTiếpThịĐượcTạo.value?.["Đuôi rút gọn"];
  const liênKếtRútGọn = `${origin}/${đuôiRútGọn}`;
  const res = await fetch(liênKếtRútGọn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vậtThểTiếpThịĐượcTạo.value),
  });
  // console.log("Đã thêm thành công vật thể tiếp thị vào cơ sở dữ liệu:", res);
}

function tạoVậtThểTiếpThị() {
  console.log("tạo vật thể tiếp thị");
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const nơiĐăng = nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value;
  const bốicảnh = bốiCảnh.value;

  if (!bàiĐăng) {
    console.error("Chưa có bài đăng");
    return;
  }
  if (!nơiĐăng) {
    console.error("Chưa có nơi đăng");
    return;
  }
  const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
    {
      bàiĐăng: bàiĐăng,
      nơiĐăng: nơiĐăng,
      bốiCảnh: bốicảnh,
      lầnĐăng: lầnĐăngHiệnTại.value,
      cấuHìnhNơiĐăng: cấuHìnhNơiĐăng.value,
    },
  );
  const thờiĐiểmTạo = new Date();
  vậtThểTiếpThịĐượcTạo.value = {
    ...{
      "Bài đăng": bàiĐăng,
      "Nơi đăng": nơiĐăng,
      "Thời điểm tạo": thờiĐiểmTạo,
      "Các lần truy cập": {},
    },
    ...thamSốUTMVàLiênKếtRútGọn,
  };
  // console.info("Bài đăng được chọn:", bàiĐăng);
  // console.info("Nơi đăng được chọn:", nơiĐăng);

  ghiLênKV().catch(console.error);
}

export function NútTạoLiênKết() {
  return (
    <button
      class="btn btn-secondary gap-2"
      id="nút-tạo-liên-kết"
      onClick={() => tạoVậtThểTiếpThị()}
    >
      {tênNút.value}
    </button>
  );
}
