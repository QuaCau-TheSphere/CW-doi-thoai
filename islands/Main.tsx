import CấuHìnhNơiĐăng from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import SectionBênPhải from "./Section bên phải.tsx";
import SectionBênTrái from "./Section bên trái.tsx";
interface MainProps {
  danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[];
  danhSáchBàiĐăng: BàiĐăng[];
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng;
  text: string;
}
export default function Main(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăng, text }: MainProps,
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
        <SectionBênPhải cấuHìnhNơiĐăng={cấuHìnhNơiĐăng} text={text} />
      </section>
    </main>
  );
}
