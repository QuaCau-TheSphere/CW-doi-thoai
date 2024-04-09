import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.js";
import { StateUpdater, useState } from "preact/hooks";
import { BốiCảnh, DanhSáchĐangActive } from "../utils/Kiểu cho web.ts";
import SearchDiv from "./SearchDiv.tsx";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { Signal } from "@preact/signals";

export default function KhungNhậpBênTrái(
  {
    danhSáchNơiĐăng,
    danhSáchBàiĐăng,
    chọnBàiĐăng,
    chọnNơiĐăng,
    setBốiCảnh,
    count,
  }: {
    danhSáchBàiĐăng: BàiĐăng[];
    danhSáchNơiĐăng: NơiĐăng[];
    chọnNơiĐăng: StateUpdater<NơiĐăng | undefined>;
    chọnBàiĐăng: StateUpdater<BàiĐăng | undefined>;
    setBốiCảnh: StateUpdater<BốiCảnh>;
    count: Signal<number>;
  },
) {
  /** Active list is used to determine whether the search list should be popup or not */
  const [activeList, setActiveList] = useState<DanhSáchĐangActive>("bài đăng");

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
      <SearchDiv
        tênDanhSách="bài đăng"
        fuse={fuseBàiĐăng}
        activeList={activeList}
        setActiveList={setActiveList}
        chọnBàiĐăngHoặcNơiĐăng={chọnBàiĐăng}
      />
      <SearchDiv
        tênDanhSách="nơi đăng"
        fuse={fuseNơiĐăng}
        activeList={activeList}
        setActiveList={setActiveList}
        chọnBàiĐăngHoặcNơiĐăng={chọnNơiĐăng}
      />
      <label class="input input-bordered flex items-center gap-2">
        Bối cảnh
        <input
          type="text"
          class="grow"
          id={"input-bối-cảnh"}
          placeholder={`Nhập bối cảnh`}
          onInput={(e) => {
            setBốiCảnh((e.target as HTMLInputElement).value);
          }}
          onFocus={() => setActiveList("bối cảnh")}
        />
      </label>
      <br />
      <button
        class="btn btn-secondary gap-2"
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
