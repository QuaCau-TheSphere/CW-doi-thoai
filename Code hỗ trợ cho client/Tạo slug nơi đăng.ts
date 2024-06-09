import { ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { kiểuKebab, lấyKýHiệuViếtTắt } from "./Hàm xử lý chuỗi.ts";
import { táchUrlHoặcEmailTrongChuỗi } from "./Hàm và kiểu cho URL.ts";
import CấuHìnhNơiĐăng from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { cấuHìnhChungSignal } from "../islands/Signals tổng.ts";

export type TừĐiểnSlugNơiĐăng = Map<string, string>;

/** Từ điển (hay ánh xạ) giữa tên nơi đăng thành phần và slug */
export function tạoTừĐiểnSlugNơiĐăng(cấuHìnhSlug: CấuHìnhNơiĐăng["Slug"] | undefined): TừĐiểnSlugNơiĐăng {
  const từĐiển: TừĐiểnSlugNơiĐăng = new Map();

  if (!cấuHìnhSlug) return từĐiển;
  for (const [slug, nơiĐăngThànhPhần] of Object.entries(cấuHìnhSlug)) {
    if (typeof nơiĐăngThànhPhần === "string") {
      const [tênNơiĐăngThànhPhần, url] = táchUrlHoặcEmailTrongChuỗi(nơiĐăngThànhPhần);
      từĐiển.set(tênNơiĐăngThànhPhần.toLowerCase(), slug);
    } else {
      for (const dòng of nơiĐăngThànhPhần) {
        const [tênNơiĐăngThànhPhần, url] = táchUrlHoặcEmailTrongChuỗi(dòng);
        từĐiển.set(tênNơiĐăngThànhPhần.toLowerCase(), slug);
      }
    }
  }
  return từĐiển;
}

/**
 * @param [từĐiểnSlugNơiĐăng=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển slug. Lúc này trả về tên nơi đăng dạng kebab
 */
export function tạoSlugNơiĐăng(
  nơiĐăng: Omit<ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo, "Slug">,
  từĐiểnSlugNơiĐăng: TừĐiểnSlugNơiĐăng | undefined = undefined,
  cấuHìnhViếtTắt = cấuHìnhChungSignal.value["Viết tắt"],
): string | undefined {
  const {
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
    URL: url,
  } = nơiĐăng;
  if (từĐiểnSlugNơiĐăng) {
    if (url) {
      const slug = từĐiểnSlugNơiĐăng.get(url.toString());
      if (slug) return slug;
    }
    for (const tênNơiĐăngThànhPhần of tênNơiĐăng.toReversed()) {
      const slugNơiĐăngĐượcKhaiBáo = từĐiểnSlugNơiĐăng.get(tênNơiĐăngThànhPhần.toLowerCase());
      if (slugNơiĐăngĐượcKhaiBáo) return slugNơiĐăngĐượcKhaiBáo;
    }
  }

  const kýHiệuTênNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhViếtTắt);
  if (kýHiệuTênNềnTảng) return `${kýHiệuTênNềnTảng}:${kiểuKebab(tênNơiĐăng[0])}`;
  return kiểuKebab(tênNơiĐăng[0]);
}
