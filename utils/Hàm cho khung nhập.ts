import {
  ThôngTinNơiĐăng,
  TênNơiĐăng,
} from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { VịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { DựÁn } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { element } from "../islands/Signals.ts";

export function viếtHoa(chuỗi: string) {
  return chuỗi.replace(/^(.)/g, (x) => x.toUpperCase());
}

/**
 * Nếu từ đầu tiên trong chuỗi là từ viết tắt thì không viết thường. VD: `QR trong ảnh` → `QR trong ảnh`
 */
export function viếtThường(chuỗi: string | undefined) {
  if (!chuỗi) return "";
  const từĐầuTiên = chuỗi.split(" ")[0];
  if (từĐầuTiên === từĐầuTiên.toLocaleUpperCase()) return chuỗi;
  return chuỗi.toLocaleLowerCase();
}

export function kiểuKebab(chuỗi: string) {
  return chuỗi.replace(" ", "-");
}

export function tạoVịTríString(vịTrí: VịTrí): string {
  if (vịTrí[1]) {
    return `${vịTrí.join(": ")}`;
  } else {
    return vịTrí[0];
  }
}
export function tạoTênNơiĐăngString(tênNơiĐăng: TênNơiĐăng): string {
  if (typeof tênNơiĐăng === "string") {
    return tênNơiĐăng;
  }
  return tênNơiĐăng.join(" ➯ ");
}

export function tạoLoạiNơiĐăngString(thôngTinNơiĐăng: ThôngTinNơiĐăng): string {
  const {
    "Loại nơi đăng": loạiNơiĐăng,
    "Tên nền tảng": tênNềnTảng,
  } = thôngTinNơiĐăng;
  if (loạiNơiĐăng[0] !== tênNềnTảng) {
    const array = JSON.parse(JSON.stringify(loạiNơiĐăng));
    array[0] = `${loạiNơiĐăng[0]} ${tênNềnTảng}`;
    return `${array.join(" → ")}`;
  } else {
    return loạiNơiĐăng[0];
  }
}

export function tạoVaultHoặcDựÁnString(
  dựÁn: DựÁn | undefined,
  vault: string | undefined,
) {
  let key, value;
  if (dựÁn && dựÁn["Tên dự án"]) {
    key = "Dự án";
    value = dựÁn["Tên dự án"];
  } else if (vault) {
    key = "Vault";
    value = vault;
  }
  return `${key}: ${value}`;
}

export function đổiKhungNhập(
  xuôiHayNgược: "xuôi" | "ngược",
) {
  const khungNhậpBàiĐăng = document.getElementById("khung-nhập-bài-đăng")!;
  const khungNhậpNơiĐăng = document.getElementById("khung-nhập-nơi-đăng")!;
  const khungNhậpBốiCảnh = document.getElementById("khung-nhập-bối-cảnh")!;
  const nútTạoLiênKết = document.getElementById("nút-tạo-liên-kết")!;

  const elementHiệnTại = element.value;
  switch (xuôiHayNgược) {
    case "xuôi":
      switch (elementHiệnTại) {
        case "bài đăng":
          element.value = "nơi đăng";
          khungNhậpNơiĐăng.focus();
          break;
        case "nơi đăng":
          element.value = "bối cảnh";
          khungNhậpBốiCảnh.focus();
          break;
        case "bối cảnh":
          element.value = "nút tạo liên kết";
          nútTạoLiênKết.focus();
          break;
        case "nút tạo liên kết":
          element.value = "bài đăng";
          khungNhậpBàiĐăng.focus();
          break;
      }
      break;
    case "ngược":
      switch (elementHiệnTại) {
        case "nút tạo liên kết":
          element.value = "bối cảnh";
          khungNhậpBốiCảnh.focus();
          break;
        case "bối cảnh":
          element.value = "nơi đăng";
          khungNhậpNơiĐăng.focus();
          break;
        case "nơi đăng":
          element.value = "bài đăng";
          khungNhậpBàiĐăng.focus();
          break;
        case "bài đăng":
          element.value = "nút tạo liên kết";
          nútTạoLiênKết.focus();
          break;
      }
      break;
  }
}
