import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.js";
import { useState } from "preact/hooks";
import {
  DanhSáchĐangActive,
  KhungKiếmBênTráiProps,
} from "../utils/Kiểu cho web.ts";
import SearchDiv from "./SearchDiv.tsx";

export default function KhungNhậpBênTrái(
  {
    danhSáchNơiĐăng,
    danhSáchBàiĐăng,
    chọnBàiĐăng,
    chọnNơiĐăng,
    setBốiCảnh,
    lầnBấmEnter,
    đổiSốLầnBấmEnter,
  }: KhungKiếmBênTráiProps,
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
        listName="bài đăng"
        fuse={fuseBàiĐăng}
        activeList={activeList}
        setActiveList={setActiveList}
        chọnBàiĐăngHoặcNơiĐăng={chọnBàiĐăng}
        đổiSốLầnBấmEnter={đổiSốLầnBấmEnter}
        lầnBấmEnter={lầnBấmEnter}
      />
      <SearchDiv
        listName="nơi đăng"
        fuse={fuseNơiĐăng}
        activeList={activeList}
        setActiveList={setActiveList}
        chọnBàiĐăngHoặcNơiĐăng={chọnNơiĐăng}
        đổiSốLầnBấmEnter={đổiSốLầnBấmEnter}
        lầnBấmEnter={lầnBấmEnter}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") đổiSốLầnBấmEnter(lầnBấmEnter + 1);
          }}
        />
      </label>
    </section>
  );
}
