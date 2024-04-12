// deno-fmt-ignore-file 
import { StateUpdater } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { KhungNhậpĐangActive, TênDanhSách } from "./Kiểu cho web.ts";

export function viếtHoa(tênDanhSách: TênDanhSách) {
  return tênDanhSách.replace(/^(.)/g, (x) => x.toUpperCase());
}

export function kebabCase(tênDanhSách: TênDanhSách) {
  return tênDanhSách.replace(" ", "-");
}


export function đổiKhungNhậpXuôi(
  khungNhậpĐangActive: KhungNhậpĐangActive,
  setKhungNhậpActive: StateUpdater<KhungNhậpĐangActive>,
  ) {
  const khungNhậpBàiĐăng = document.getElementById("khung-nhập-bài-đăng")!;
  const khungNhậpNơiĐăng = document.getElementById("khung-nhập-nơi-đăng")!;
  const khungNhậpBốiCảnh = document.getElementById("khung-nhập-bối-cảnh")!;
  if (khungNhậpĐangActive === "bài đăng") {
    setKhungNhậpActive("nơi đăng");
    khungNhậpNơiĐăng.focus();
  } else if (khungNhậpĐangActive === "nơi đăng") {
    setKhungNhậpActive("bối cảnh");
    console.log(true)
    khungNhậpBốiCảnh.focus();
  } else if (khungNhậpĐangActive === "bối cảnh") {
    setKhungNhậpActive("bài đăng");
    khungNhậpBàiĐăng.focus();
  }
}

export function đổiKhungNhậpNgược(
  khungNhậpĐangActive: KhungNhậpĐangActive,
  setKhungNhậpActive: StateUpdater<KhungNhậpĐangActive>,
  ) {
  const khungNhậpBàiĐăng = document.getElementById("khung-nhập-bài-đăng")!;
  const khungNhậpNơiĐăng = document.getElementById("khung-nhập-nơi-đăng")!;
  const khungNhậpBốiCảnh = document.getElementById("khung-nhập-bối-cảnh")!;
  if (khungNhậpĐangActive === "bối cảnh") {
    setKhungNhậpActive("nơi đăng");
    khungNhậpNơiĐăng.focus();
  } else if (khungNhậpĐangActive === "nơi đăng") {
    setKhungNhậpActive("bài đăng");
    khungNhậpBàiĐăng.focus();
  } else if (khungNhậpĐangActive === "bài đăng") {
    setKhungNhậpActive("bối cảnh");
    khungNhậpBốiCảnh.focus();
  }
}
