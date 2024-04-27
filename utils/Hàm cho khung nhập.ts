import { StateUpdater } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { ElementDùngTab, TênDanhSách } from "./Ki%E1%BB%83u%20cho%20web.ts";

export function viếtHoa(tênDanhSách: TênDanhSách) {
  return tênDanhSách.replace(/^(.)/g, (x) => x.toUpperCase());
}

export function kebabCase(tênDanhSách: TênDanhSách) {
  return tênDanhSách.replace(" ", "-");
}

export function đổiKhungNhập(
  xuôiHayNgược: "xuôi" | "ngược",
  focusedElement: ElementDùngTab,
  setElement: StateUpdater<ElementDùngTab>,
) {
  const khungNhậpBàiĐăng = document.getElementById("khung-nhập-bài-đăng")!;
  const khungNhậpNơiĐăng = document.getElementById("khung-nhập-nơi-đăng")!;
  const khungNhậpBốiCảnh = document.getElementById("khung-nhập-bối-cảnh")!;
  const nútTạoLiênKết = document.getElementById("nút-tạo-liên-kết")!;
  switch (xuôiHayNgược) {
    case "xuôi":
      switch (focusedElement) {
        case "bài đăng":
          setElement("nơi đăng");
          khungNhậpNơiĐăng.focus();
          break;
        case "nơi đăng":
          setElement("bối cảnh");
          khungNhậpBốiCảnh.focus();
          break;
        case "bối cảnh":
          setElement("nút tạo liên kết");
          nútTạoLiênKết.focus();
          break;
        case "nút tạo liên kết":
          setElement("bài đăng");
          khungNhậpBàiĐăng.focus();
          break;
      }
      break;
    case "ngược":
      switch (focusedElement) {
        case "nút tạo liên kết":
          setElement("bối cảnh");
          khungNhậpBốiCảnh.focus();
          break;
        case "bối cảnh":
          setElement("nơi đăng");
          khungNhậpNơiĐăng.focus();
          break;
        case "nơi đăng":
          setElement("bài đăng");
          khungNhậpBàiĐăng.focus();
          break;
        case "bài đăng":
          setElement("nút tạo liên kết");
          nútTạoLiênKết.focus();
          break;
      }
      break;
  }
}
