import CấuHìnhNơiĐăng from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import SectionBênPhải from "./Section bên phải.tsx";
import SectionBênTrái from "./Section bên trái.tsx";
import { cấuHìnhNơiĐăng } from "./Signals.ts";
interface MainProps {
  danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[];
  danhSáchBàiĐăng: BàiĐăng[];
  cấuHìnhNơiĐăngProp: CấuHìnhNơiĐăng;
  textTrangChủ: string;
}
//@ts-ignore:
function Test({ danhSáchNơiĐăng, danhSáchBàiĐăng }) {
  return (
    <SectionBênTrái
      danhSáchBàiĐăng={danhSáchBàiĐăng}
      danhSáchNơiĐăng={danhSáchNơiĐăng}
    />
  );
}
function Production(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăngProp, textTrangChủ }:
    MainProps,
) {
  return (
    <main class="flex flex-row gap-3 w-full mb-auto">
      <section id="section-bên-trái" class="basis-1/2 p-10">
        <SectionBênTrái
          danhSáchBàiĐăng={danhSáchBàiĐăng}
          danhSáchNơiĐăng={danhSáchNơiĐăng}
        />
      </section>
      <section id="section-bên-phải" class="basis-1/2 p-10">
        <SectionBênPhải text={textTrangChủ} />
      </section>
    </main>
  );
}
export default function Main(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăngProp, textTrangChủ }:
    MainProps,
) {
  cấuHìnhNơiĐăng.value = cấuHìnhNơiĐăngProp;
  return (
    <Test danhSáchBàiĐăng={danhSáchBàiĐăng} danhSáchNơiĐăng={danhSáchNơiĐăng} />
  );
  return (
    <Production
      danhSáchBàiĐăng={danhSáchBàiĐăng}
      danhSáchNơiĐăng={danhSáchNơiĐăng}
      textTrangChủ={textTrangChủ}
    />
  );
}
