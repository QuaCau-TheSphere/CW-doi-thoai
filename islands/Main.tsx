import FlexSearch, { Document } from "npm:flexsearch";
import { BàiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import SectionBênTrái from "./Section bên trái.tsx";
import SectionBênPhải from "./Section bên phải.tsx";
import { cấuHìnhChungSignal, flexSearchBàiĐăngSignal, flexSearchNơiĐăngSignal } from "./Signals tổng.ts";
import { CấuHìnhChung } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import ModalNơiĐăng from "./Modal tạo mới/Modal nơi đăng.tsx";
import ModalBàiĐăng from "./Modal tạo mới/Modal bài đăng.tsx";

interface MainProps {
  danhSáchNơiĐăng: NơiĐăngCóCácLựaChọnVịTrí[];
  danhSáchBàiĐăng: BàiĐăng[];
  cấuHìnhChung: CấuHìnhChung;
  textTrangChủ: string;
}

function nạpSignal(cấuHìnhChung: CấuHìnhChung, danhSáchBàiĐăng: BàiĐăng[], danhSáchNơiĐăng: NơiĐăngCóCácLựaChọnVịTrí[]) {
  cấuHìnhChungSignal.value = cấuHìnhChung;

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
  for (const bàiĐăng of danhSáchBàiĐăng) flexSearchBàiĐăng.add(bàiĐăng);
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
  for (const nơiĐăng of danhSáchNơiĐăng) flexSearchNơiĐăng.add(nơiĐăng);
  //@ts-ignore: để coi store nghĩa là gì sau
  flexSearchNơiĐăngSignal.value = flexSearchNơiĐăng;
}

export default function Main({ danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhChung, textTrangChủ }: MainProps) {
  nạpSignal(cấuHìnhChung, danhSáchBàiĐăng, danhSáchNơiĐăng);

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
