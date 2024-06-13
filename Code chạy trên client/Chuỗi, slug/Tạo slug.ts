import { táchUrlHoặcEmailĐầuTiênTrongChuỗi, Url } from "../URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { lấyUsername } from "../URL, HTML/Hàm và kiểu cho dữ liệu meta.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
  TênNơiĐăng,
} from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import CấuHìnhNơiĐăng from "../../Code chạy trên local, server, KV/Hàm và kiểu cho cấu hình.ts";

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
      từĐiển.set(url, slug);
    }
  }
}

/**
 * @param [từĐiểnSlugNơiĐăng=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển slug. Lúc này trả về tên nơi đăng dạng kebab
 */
export function tạoSlugNơiĐăng(
  tênNơiĐăng: TênNơiĐăng,
  url: Url,
  từĐiểnSlugNơiĐăng: TừĐiểnSlugNơiĐăng,
): string | undefined {
  if (url) {
    const slug = từĐiểnSlugNơiĐăng.get(url.toString());
    if (slug) return slug;
  }
  for (const tênNơiĐăngThànhPhần of tênNơiĐăng.toReversed()) {
    const slugNơiĐăngĐượcKhaiBáo = từĐiểnSlugNơiĐăng.get(tênNơiĐăngThànhPhần.toLowerCase());
    if (slugNơiĐăngĐượcKhaiBáo) return slugNơiĐăngĐượcKhaiBáo;
  }
}

export function tạoSlugBàiĐăng({ hostname, pathname }: URL) {
  const làDiễnĐàn = (danhSáchDiễnĐàn as unknown as string[]).includes(hostname);
  const làNềnTảngChat = (danhSáchNềnTảngChat as unknown as string[]).includes(hostname);
  if (!làDiễnĐàn && !làNềnTảngChat) {
    let slugWebsiteCóSẵn = pathname.substring(1);
    slugWebsiteCóSẵn = slugWebsiteCóSẵn.slice(-1) === "/" ? slugWebsiteCóSẵn.slice(0, -1) : slugWebsiteCóSẵn;
    if (slugWebsiteCóSẵn.startsWith("blog/")) slugWebsiteCóSẵn = slugWebsiteCóSẵn.replace("blog/", "");
    if (slugWebsiteCóSẵn.includes("/")) return undefined;
    return slugWebsiteCóSẵn ? slugWebsiteCóSẵn : lấyUsername(hostname);
  }
  return undefined;
}
