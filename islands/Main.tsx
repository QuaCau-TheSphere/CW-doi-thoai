import CấuHìnhNơiĐăng from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import SectionBênPhải from "./Section bên phải.tsx";
import SectionBênTrái from "./Section bên trái.tsx";
import { cấuHìnhNơiĐăngSignal } from "./Signals tổng.ts";
interface MainProps {
  danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[];
  danhSáchBàiĐăng: BàiĐăng[];
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng;
  textTrangChủ: string;
}

function Test({ danhSáchNơiĐăng, danhSáchBàiĐăng }: Omit<MainProps, "cấuHìnhNơiĐăng" | "textTrangChủ">) {
  return (
    <SectionBênTrái
      danhSáchBàiĐăng={danhSáchBàiĐăng}
      danhSáchNơiĐăng={danhSáchNơiĐăng}
    />
  );
}

function Production({ danhSáchNơiĐăng, danhSáchBàiĐăng, textTrangChủ }: Omit<MainProps, "cấuHìnhNơiĐăng">) {
  return (
    <main class="flex flex-row gap-3 w-full mb-auto">
      <SectionBênTrái
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
      />
      <SectionBênPhải text={textTrangChủ} />
    </main>
  );
}

export default function Main(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăng, textTrangChủ }: MainProps,
) {
  cấuHìnhNơiĐăngSignal.value = cấuHìnhNơiĐăng;
  return <Test danhSáchBàiĐăng={danhSáchBàiĐăng} danhSáchNơiĐăng={danhSáchNơiĐăng} />;
  // return <Production danhSáchBàiĐăng={danhSáchBàiĐăng} danhSáchNơiĐăng={danhSáchNơiĐăng} textTrangChủ={textTrangChủ} />;
}
