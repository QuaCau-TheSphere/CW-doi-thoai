import { MainProps } from "../utils/Kiểu cho web.ts";
import KhungKếtQuảBênPhải from "./KhungK%E1%BA%BFtQu%E1%BA%A3B%C3%AAnPh%E1%BA%A3i.tsx";
import KhungNhậpBênTrái from "./Section bên trái.tsx";

export default function Main(
  { danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhNơiĐăng }: MainProps,
) {
  return (
    <main class="flex flex-row gap-3 w-full mb-auto">
      <section id="section-bên-trái" class="basis-1/2 p-10">
        <KhungNhậpBênTrái
          danhSáchBàiĐăng={danhSáchBàiĐăng}
          danhSáchNơiĐăng={danhSáchNơiĐăng}
        />
      </section>
      <section id="section-bên-phải" class="basis-1/2 p-10">
        <KhungKếtQuảBênPhải cấuHìnhNơiĐăng={cấuHìnhNơiĐăng} />
      </section>
    </main>
  );
}
