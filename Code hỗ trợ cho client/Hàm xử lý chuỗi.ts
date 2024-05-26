import { URLString } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import punycode from "npm:punycode";
import { VịTrí } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { ThôngTinNơiĐăng, TênNơiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";

export function viếtHoa(chuỗi: string | undefined) {
  if (!chuỗi) return "";
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

export function kiểuKebab(chuỗi: string | undefined) {
  if (!chuỗi) return "";
  return chuỗi.replace(" ", "-");
}

export function tạoVịTríString(vịTrí: VịTrí): string {
  if (vịTrí[1] && vịTrí[1] !== "Nội dung chính" && !vịTrí[1].includes("Mô tả")) {
    return `${vịTrí.join(": ")}`;
  }
  return vịTrí[0];
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

export function isUrl(string: string | undefined) {
  try {
    if (!string) return false;
    return Boolean(new URL(string));
  } catch {
    return false;
  }
}

export function xửLýPunycode(url: URLString | undefined, đểDấuCáchTrongLiênKết: boolean = false): string {
  if (!url) return "";
  const liênKết = punycode.toUnicode(decodeURI(url.toString()));
  if (đểDấuCáchTrongLiênKết) return liênKết;
  return liênKết.replaceAll(" ", "%20");
}
