import { MainProps } from "../utils/Kiểu cho web.ts";
import SectionBênPhải from "./Section bên phải.tsx";
import SectionBênTrái from "./Section bên trái.tsx";

export default function Main(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăng }: MainProps,
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
        <SectionBênPhải cấuHìnhNơiĐăng={cấuHìnhNơiĐăng} />
      </section>
    </main>
  );
}
