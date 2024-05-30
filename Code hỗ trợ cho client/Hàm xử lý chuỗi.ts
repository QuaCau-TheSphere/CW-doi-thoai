import { URLString } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { VịTrí } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { ThôngTinNơiĐăng, TênNơiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import punycode from "npm:punycode";
import * as linkify from "npm:linkifyjs";
import { CấuHìnhViếtTắt } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";

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
  return viếtThường(chuỗi).replaceAll(" ", "-");
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
  if (!loạiNơiĐăng) return tênNềnTảng || "";
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

export function táchUrlTrongChuỗi(chuỗiCóThểCóUrl: string): [string, string | undefined] {
  if (!chuỗiCóThểCóUrl) return ["", ""];
  let chuỗiKhôngCóUrl = chuỗiCóThểCóUrl;
  let url = undefined;
  const urls = linkify.find(chuỗiCóThểCóUrl);
  if (urls.length > 0) {
    url = urls[0].href as string;
    chuỗiKhôngCóUrl = chuỗiCóThểCóUrl.replace(url, "").trim();
    if (chuỗiKhôngCóUrl === "") chuỗiKhôngCóUrl = url;
  }
  return [chuỗiKhôngCóUrl, url];
}

/** Tìm trong cấu hình nơi đăng xem từ được kiểm tra có ký hiệu viết tắt không. Nếu không thì trả về undefined */
export function lấyKýHiệuViếtTắt(từĐượcKiểmTra: string | undefined, cấuHìnhViếtTắt: CấuHìnhViếtTắt): string | undefined {
  if (cấuHìnhViếtTắt) {
    for (const danhMụcViếtTắt of cấuHìnhViếtTắt) {
      const từĐượcViếtTắt = Object.keys(danhMụcViếtTắt)[0];
      const từViếtTắt = Object.values(danhMụcViếtTắt)[0];
      if (từĐượcViếtTắt === từĐượcKiểmTra) return từViếtTắt;
    }
  }
  return undefined;
}

const digit = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";

export function đổiTừCơSố10SangCơSố64(x: number) {
  return x.toString(2).split(/(?=(?:.{6})+(?!.))/g).map((v) => digit[parseInt(v, 2)]).join("");
}

export function tạoChuỗiNgẫuNhiên(sốKýTự: number): string {
  let kếtQuả: string = "";
  for (let i = 0; i < sốKýTự; i++) {
    kếtQuả += digit.charAt(Math.floor(Math.random() * digit.length));
  }
  return kếtQuả;
}

function đổiTừCơSố64SangCơSố10(x: string) {
  return x.split("").reduce((s, v) => s * 64 + digit.indexOf(v), 0);
}
