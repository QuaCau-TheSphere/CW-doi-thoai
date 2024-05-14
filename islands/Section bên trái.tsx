import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js";
import KhungTìmBàiĐăngHoặcNơiĐăng from "./Khung tìm bài đăng hoặc nơi đăng.tsx";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { bốiCảnh, element } from "./Signals.ts";
import { NútTạoLiênKết } from "./Nút tạo liên kết.tsx";

function KhungNhậpBốiCảnh() {
  return (
    <label class="input input-bordered flex items-center gap-2">
      Bối cảnh
      <input
        type="text"
        class="grow"
        id="khung-nhập-bối-cảnh"
        placeholder="Lý do khiến bài đăng trở nên hữu ích tại nơi đăng (không bắt buộc)"
        onInput={(e) => {
          bốiCảnh.value = (e.target as HTMLInputElement).value;
        }}
        onFocus={() => element.value = "bối cảnh"}
      />
    </label>
  );
}

export default function SectionBênTrái(
  {
    danhSáchNơiĐăng,
    danhSáchBàiĐăng,
  }: {
    danhSáchBàiĐăng: BàiĐăng[];
    danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[];
  },
) {
  const fuseBàiĐăng = new Fuse(danhSáchBàiĐăng, {
    ignoreLocation: true,
    keys: [
      {
        name: "Tiêu đề",
        weight: 2,
      },
      "Mô tả bài đăng",
      "URL",
    ],
  });
  const fuseNơiĐăng = new Fuse(danhSáchNơiĐăng, {
    ignoreLocation: true,
    keys: [
      {
        name: "Tên nơi đăng",
        weight: 2,
      },
      "Loại nơi đăng",
      "Tên nền tảng",
      "Loại nền tảng",
      "URL",
    ],
  });

  return (
    <>
      <KhungTìmBàiĐăngHoặcNơiĐăng
        tênDanhSách="bài đăng"
        fuse={fuseBàiĐăng}
      />
      <KhungTìmBàiĐăngHoặcNơiĐăng
        tênDanhSách="nơi đăng"
        fuse={fuseNơiĐăng}
      />
      <KhungNhậpBốiCảnh />
      <br />
      <NútTạoLiênKết />
    </>
  );
}
