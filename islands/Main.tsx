import FlexSearch, { Document } from "npm:flexsearch";
import SectionBênTrái from "./Section bên trái.tsx";
import SectionBênPhải from "./Section bên phải.tsx";
import { cấuHìnhChungSignal, danhSáchThôngTinCấuHìnhNơiĐăngSignal, flexSearchBàiĐăngSignal, flexSearchNơiĐăngSignal } from "./Signals tổng.ts";
import ModalNơiĐăng from "./Modal tạo mới/Modal nơi đăng.tsx";
import ModalBàiĐăng from "./Modal tạo mới/Modal bài đăng.tsx";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../Code chạy trên client/Hàm và kiểu cho vị trí.ts";
import { BàiĐăng } from "../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { CấuHìnhChung, ThôngTinCấuHìnhNơiĐăng } from "../Code chạy trên local, server, KV/Hàm và kiểu cho cấu hình.ts";

export interface DanhSáchBàiĐăngVàNơiĐăng {
  dsBàiĐăng: BàiĐăng[];
  dsNơiĐăng: NơiĐăngCóCácLựaChọnVịTrí[];
}
interface MainProps {
  dsBàiĐăngVàNơiĐăng: DanhSáchBàiĐăngVàNơiĐăng;
  danhSáchThôngTinCấuHìnhNơiĐăng: ThôngTinCấuHìnhNơiĐăng[];
  cấuHìnhChung: CấuHìnhChung;
  textTrangChủ: string;
}

function nạpSignal(
  cấuHìnhChung: CấuHìnhChung,
  dsBàiĐăngVàNơiĐăng: DanhSáchBàiĐăngVàNơiĐăng,
  danhSáchThôngTinCấuHìnhNơiĐăng: ThôngTinCấuHìnhNơiĐăng[],
) {
  cấuHìnhChungSignal.value = cấuHìnhChung;
  danhSáchThôngTinCấuHìnhNơiĐăngSignal.value = danhSáchThôngTinCấuHìnhNơiĐăng;
  const { dsBàiĐăng, dsNơiĐăng } = dsBàiĐăngVàNơiĐăng;

  const flexSearchBàiĐăng: Document<BàiĐăng, true> = new FlexSearch.Document({
    document: {
      id: "id",
      index: [
        "Tiêu đề",
        "Vault",
        "Dự án:Tên dự án",
        "Dự án:Mã dự án",
        "Tác giả",
        "URL",
        "Slug",
        "Nội dung bài đăng:Mô tả bài đăng",
      ],
      store: true,
    },
    tokenize: "forward",
  });
  for (const bàiĐăng of dsBàiĐăng) flexSearchBàiĐăng.add(bàiĐăng);
  //@ts-ignore: để coi store nghĩa là gì sau
  flexSearchBàiĐăngSignal.value = flexSearchBàiĐăng;

  const flexSearchNơiĐăng: Document<NơiĐăngCóCácLựaChọnVịTrí, true> = new FlexSearch.Document({
    document: {
      id: "id",
      index: [
        "Loại nền tảng",
        "Tên nền tảng",
        "Tên nơi đăng",
        "Loại nơi đăng",
        "Mô tả nơi đăng",
        "URL",
        "Lĩnh vực",
        "Mô tả nơi đăng",
        "Slug",
      ],
      store: true,
    },
    tokenize: "forward",
  });
  for (const nơiĐăng of dsNơiĐăng) flexSearchNơiĐăng.add(nơiĐăng);
  //@ts-ignore: để coi store nghĩa là gì sau
  flexSearchNơiĐăngSignal.value = flexSearchNơiĐăng;
}

export default function Main({ dsBàiĐăngVàNơiĐăng, cấuHìnhChung, textTrangChủ, danhSáchThôngTinCấuHìnhNơiĐăng }: MainProps) {
  nạpSignal(cấuHìnhChung, dsBàiĐăngVàNơiĐăng, danhSáchThôngTinCấuHìnhNơiĐăng);

  /** Cần debug component nào thì cứ return nó ở đây */
  // return <ModalBàiĐăng />;
  // return <ModalNơiĐăng />;
  // return <SectionBênTrái />;

  /** Tách ra thành test với production để khi không quan tâm tới section bên phải thì section bên trái không giảm một nửa bề rộng do tailwind*/
  return (
    <main class="flex flex-col md:flex-row gap-3 w-full mb-auto">
      <SectionBênTrái />
      <SectionBênPhải textTrangChủ={textTrangChủ} />
    </main>
  );
}
