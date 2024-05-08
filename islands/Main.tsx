//deno-fmt-ignore-file
import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { KếtQuả, MainProps } from "../utils/Kiểu cho web.ts";
import KhungKếtQuảBênPhải from "./KhungK%E1%BA%BFtQu%E1%BA%A3B%C3%AAnPh%E1%BA%A3i.tsx";
import KhungNhậpBênTrái from "./KhungNhậpBênTrái.tsx";
import KhungThôngTinKhiKhôngCóKếtQuả from "../components/KhungThôngTinKhiKhôngCóKếtQuả.tsx";
import { NơiĐăngĐãXácĐịnhVịTrí } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { NơiĐăngChưaXácĐịnhVịTrí, VịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";

export default function Main(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăng }: MainProps,
) {
  const [bàiĐăngĐượcChọn, setBàiĐăng] = useState<BàiĐăng | undefined>(undefined);
  const [nơiĐăngĐượcChọn, setNơiĐăng] = useState<NơiĐăngChưaXácĐịnhVịTrí | NơiĐăngĐãXácĐịnhVịTrí | undefined>(undefined);
  const [bốiCảnh, setBốiCảnh] = useState<string | undefined>(undefined);
  const count = useSignal(0);

  return (
    <main class="flex flex-row gap-3 w-full mb-auto">
      <div class="basis-1/2 p-10">
        <KhungNhậpBênTrái
          danhSáchBàiĐăng={danhSáchBàiĐăng}
          danhSáchNơiĐăng={danhSáchNơiĐăng}
          setBàiĐăng={setBàiĐăng}
          setNơiĐăng={setNơiĐăng}
          setBốiCảnh={setBốiCảnh}
          count={count}
        />
      </div>
      <div class="basis-1/2 p-10">
        {count.value > 0 && bàiĐăngĐượcChọn && nơiĐăngĐượcChọn
          ? (
            <KhungKếtQuảBênPhải
              bàiĐăngĐượcChọn={bàiĐăngĐượcChọn}
              nơiĐăngĐượcChọn={nơiĐăngĐượcChọn}
              bốiCảnh={bốiCảnh}
              cấuHìnhNơiĐăng={cấuHìnhNơiĐăng}
              count={count}
            />
          )
          : <KhungThôngTinKhiKhôngCóKếtQuả />}
      </div>
    </main>
  );
}
