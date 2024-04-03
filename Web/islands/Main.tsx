import { useState } from "preact/hooks";
import KhungKếtQuảBênPhải from "./KhungK%E1%BA%BFtQu%E1%BA%A3B%C3%AAnPh%E1%BA%A3i.tsx";
import KhungKiếmBênTrái from "./KhungKi%E1%BA%BFmB%C3%AAnTr%C3%A1i.tsx";
import { MainProps } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20web.ts";
import { BàiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

function cóKếtQuả(kếtQuả: KếtQuả): kếtQuả is {
  bàiĐăng: BàiĐăng;
  nơiĐăng: NơiĐăng;
} {
  if (kếtQuả && kếtQuả.bàiĐăng && kếtQuả.nơiĐăng) {
    return true;
  }
  return false;
}

function KhungThôngTinKhiKhôngCóKếtQuả() {
  return (
    <div id="khung-thông-tin-khi-không-có-kết-quả">
      <h2>Viết bài để làm gì nếu không phải là để đối thoại?</h2>
    </div>
  );
}

export default function Main(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăng }: MainProps,
) {
  const [bàiĐăngĐượcChọn, chọnBàiĐăng] = useState<BàiĐăng | undefined>(
    undefined,
  );
  const [nơiĐăngĐượcChọn, chọnNơiĐăng] = useState<NơiĐăng | undefined>(
    undefined,
  );
  return (
    <main class="grid grid-cols-1 grid-cols-2 gap-5 h-full">
      <KhungKiếmBênTrái
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
        chọnBàiĐăng={chọnBàiĐăng}
        chọnNơiĐăng={chọnNơiĐăng}
      />
      {bàiĐăngĐượcChọn && nơiĐăngĐượcChọn
        ? (
          <KhungKếtQuảBênPhải
            bàiĐăngĐượcChọn={bàiĐăngĐượcChọn}
            nơiĐăngĐượcChọn={nơiĐăngĐượcChọn}
            cấuHìnhNơiĐăng={cấuHìnhNơiĐăng}
          />
        )
        : <KhungThôngTinKhiKhôngCóKếtQuả />}
    </main>
  );
}
