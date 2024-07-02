import { táchUrlHoặcEmailĐầuTiênTrongChuỗi, Url } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { TênNơiĐăng } from "./Kiểu cho nơi đăng.ts";
import CấuHìnhNơiĐăng from "../Hàm và kiểu cho cấu hình.ts";
import { lấyURLChínhTắcVàHTMLTừLocal } from "../H%C3%A0m%20cho%20cache.ts";

export type TừĐiểnSlugNơiĐăng = Map<string, string>;

/** Từ điển (hay ánh xạ) giữa tên nơi đăng thành phần và slug */
export async function tạoTừĐiểnSlugNơiĐăng(cấuHìnhSlug: CấuHìnhNơiĐăng["Slug"] | undefined): Promise<TừĐiểnSlugNơiĐăng> {
  const từĐiển: TừĐiểnSlugNơiĐăng = new Map();

  if (!cấuHìnhSlug) return từĐiển;
  for (const [slug, nơiĐăngThànhPhần] of Object.entries(cấuHìnhSlug)) {
    if (typeof nơiĐăngThànhPhần === "string") {
      await thêmDòngTrongTừĐiểnTừDòngTrongCấuHình(nơiĐăngThànhPhần, slug);
    } else {
      for (const dòng of nơiĐăngThànhPhần) {
        await thêmDòngTrongTừĐiểnTừDòngTrongCấuHình(dòng, slug);
      }
    }
  }
  return từĐiển;

  async function thêmDòngTrongTừĐiểnTừDòngTrongCấuHình(chuỗi: string, slug: string) {
    const [tênNơiĐăngThànhPhần, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(chuỗi);
    if (tênNơiĐăngThànhPhần !== url) {
      từĐiển.set(tênNơiĐăngThànhPhần.toLowerCase(), slug);
    } else {
      const urlChínhTắc = (await lấyURLChínhTắcVàHTMLTừLocal(url))[0];
      từĐiển.set(urlChínhTắc, slug);
    }
  }
}

/**
 * Không tự động tạo slug nếu trong từ điển không có sẵn, vì slug nơi đăng có thể không quan trọng với người dùng, và họ chỉ cần id là đủ.
 *
 * @param từĐiểnSlugNơiĐăng nếu từĐiểnSlugNơiĐăng là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển slug. Lúc này trả về undefined. Nếu có từĐiểnSlugNơiĐăng nhưng vẫn không có slug nào được khai báo bên trong thì trả về null
 */
export function lấySlugTrongTừĐiểnSlug(
  tênNơiĐăng: TênNơiĐăng | [undefined],
  url: Url | undefined,
  từĐiểnSlugNơiĐăng: TừĐiểnSlugNơiĐăng | undefined,
): string | undefined | null {
  if (từĐiểnSlugNơiĐăng === undefined) return undefined;
  if (url) {
    const slug = từĐiểnSlugNơiĐăng.get(url.toString());
    if (slug) return slug;
  }
  for (const tênNơiĐăngThànhPhần of tênNơiĐăng.toReversed()) {
    if (tênNơiĐăngThànhPhần === undefined) continue;
    const slugNơiĐăngĐượcKhaiBáo = từĐiểnSlugNơiĐăng.get(tênNơiĐăngThànhPhần.toLowerCase());
    if (slugNơiĐăngĐượcKhaiBáo) return slugNơiĐăngĐượcKhaiBáo;
  }
  return null;
}
