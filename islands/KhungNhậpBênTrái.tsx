import Fuse from "https://deno.land/x/fuse@v6.4.1/dist/fuse.esm.js";
import { StateUpdater, useState } from "preact/hooks";
import { BốiCảnh, ElementDùngTab } from "../utils/Kiểu cho web.ts";
import KhungTìmBàiĐăngHoặcNơiĐăng from "./Khung tìm bài đăng hoặc nơi đăng.tsx";
import { Signal } from "@preact/signals";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { NơiĐăngĐãXácĐịnhVịTrí } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";

export default function KhungNhậpBênTrái(
  {
    danhSáchNơiĐăng,
    danhSáchBàiĐăng,
    setBàiĐăng,
    setNơiĐăng,
    setBốiCảnh,
    count,
  }: {
    danhSáchBàiĐăng: BàiĐăng[];
    danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[];
    setBàiĐăng: StateUpdater<BàiĐăng | undefined>;
    setNơiĐăng: StateUpdater<
      NơiĐăngĐãXácĐịnhVịTrí | NơiĐăngChưaXácĐịnhVịTrí | undefined
    >;
    setBốiCảnh: StateUpdater<BốiCảnh>;
    count: Signal<number>;
  },
) {
  /** Do ngay từ lúc mới KhungNhậpBênTrái mới render đã setKhungNhậpActive là 'bài đăng' rồi, nên sẽ không có chuyện undefined */
  const [element, setElement] = useState<ElementDùngTab>(
    "bài đăng",
  );

  const fuseBàiĐăng = new Fuse(danhSáchBàiĐăng, {
    // minMatchCharLength: 3,
    ignoreLocation: true,
    keys: [{
      name: "Tiêu đề",
      weight: 2,
    }, "Mô tả bài đăng"],
  });
  const fuseNơiĐăng = new Fuse(danhSáchNơiĐăng, {
    // minMatchCharLength: 2,
    ignoreLocation: true,
    keys: [
      "Tên nơi đăng",
      "Tên cộng đồng",
      "Loại nơi đăng",
      "Tên nền tảng",
      "Loại nền tảng",
    ],
  });
  return (
    <section id="khung-nhập-bên-phải">
      <KhungTìmBàiĐăngHoặcNơiĐăng
        tênDanhSách="bài đăng"
        fuse={fuseBàiĐăng}
        element={element}
        setElement={setElement}
        setBàiĐăngHoặcNơiĐăng={setBàiĐăng}
      />
      <KhungTìmBàiĐăngHoặcNơiĐăng
        tênDanhSách="nơi đăng"
        fuse={fuseNơiĐăng}
        element={element}
        setElement={setElement}
        setBàiĐăngHoặcNơiĐăng={setNơiĐăng}
      />
      <label class="input input-bordered flex items-center gap-2">
        Bối cảnh
        <input
          type="text"
          class="grow"
          id="khung-nhập-bối-cảnh"
          placeholder="(Không bắt buộc) Lý do khiến bài đăng trở nên hữu ích tại nơi đăng"
          onInput={(e) => {
            setBốiCảnh((e.target as HTMLInputElement).value);
          }}
          onFocus={() => setElement("bối cảnh")}
        />
      </label>
      <br />
      <button
        class="btn btn-secondary gap-2"
        id="nút-tạo-liên-kết"
        onClick={() => {
          count.value += 1;
          console.log(count.value);
        }}
      >
        Tạo liên kết
      </button>
    </section>
  );
}
