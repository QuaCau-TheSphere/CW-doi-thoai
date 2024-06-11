import { VịTrí } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { ThôngTinNơiĐăng, TênNơiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { CấuHìnhViếtTắt } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";

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
export function tạoTênNơiĐăngString(tênNơiĐăng: TênNơiĐăng | undefined): string {
  if (!tênNơiĐăng) return "";
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

// export function
/* ====
ID
*/

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

export function lấyGiờVN(thờiĐiểm: Date | string | undefined) {
  if (!thờiĐiểm) return undefined;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  };
  const date = new Date(thờiĐiểm);
  const ngày = date.toLocaleDateString("vi-VN", options);
  const giờ = date.toLocaleTimeString("vi-VN").slice(0, -3);
  return `${ngày} ${giờ}`;
}

export function lấyNgàyISO(thờiĐiểm: Date | string | undefined) {
  if (!thờiĐiểm) return undefined;
  const iso = new Date(thờiĐiểm).toISOString();
  return iso.substring(0, iso.indexOf("T"));
}
