import FlexSearch, { Document } from "npm:flexsearch";
import { BàiĐăng } from "../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { CấuHìnhViếtTắt, NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import SectionBênPhải from "./Section bên phải.tsx";
import SectionBênTrái from "./Section bên trái.tsx";
import { cấuHìnhViếtTắtSignal, flexSearchBàiĐăngSignal, flexSearchNơiĐăngSignal } from "./Signals tổng.ts";

interface MainProps {
  danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[];
  danhSáchBàiĐăng: BàiĐăng[];
  cấuHìnhViếtTắt: CấuHìnhViếtTắt;
  textTrangChủ: string;
}

function Test() {
  return <SectionBênTrái />;
}

function Production({ textTrangChủ }: { textTrangChủ: string }) {
  return (
    <main class="flex flex-col md:flex-row flex-row gap-3 w-full mb-auto">
      <SectionBênTrái />
      <SectionBênPhải text={textTrangChủ} />
    </main>
  );
}

export default function Main({ danhSáchNơiĐăng, danhSáchBàiĐăng, cấuHìnhViếtTắt, textTrangChủ }: MainProps) {
  cấuHìnhViếtTắtSignal.value = cấuHìnhViếtTắt;

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
        "Mã bài đăng",
        "Nội dung bài đăng:Mô tả bài đăng",
      ],
      store: true,
    },
  });
  for (const bàiĐăng of danhSáchBàiĐăng) flexSearchBàiĐăng.add(bàiĐăng);
  //@ts-ignore: để coi store nghĩa là gì sau
  flexSearchBàiĐăngSignal.value = flexSearchBàiĐăng;

  const flexSearchNơiĐăng: Document<NơiĐăngChưaXácĐịnhVịTrí, true> = new FlexSearch.Document({
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
        "Mã nơi đăng",
      ],
      store: true,
    },
  });
  for (const nơiĐăng of danhSáchNơiĐăng) flexSearchNơiĐăng.add(nơiĐăng);
  //@ts-ignore: để coi store nghĩa là gì sau
  flexSearchNơiĐăngSignal.value = flexSearchNơiĐăng;

  /** Tách ra thành test với production để khi không quan tâm tới section bên phải thì section bên trái không giảm một nửa bề rộng do tailwind*/
  return <Production textTrangChủ={textTrangChủ} />;
  return <Test />;
}
