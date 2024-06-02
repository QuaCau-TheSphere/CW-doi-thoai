import { ThôngTinNơiĐăngChưaCóId, ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo } from "../../Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { CấuHìnhMãNơiĐăng } from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { kiểuKebab, táchUrlTrongChuỗi } from "../../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";

export type TừĐiểnSlugNơiĐăng = Map<string, string>;

/** Từ điển (hay ánh xạ) giữa tên nơi đăng thành phần và slug */
export function tạoTừĐiểnSlugNơiĐăng(cấuHìnhMãNơiĐăng: CấuHìnhMãNơiĐăng | undefined): TừĐiểnSlugNơiĐăng {
  const từĐiển: TừĐiểnSlugNơiĐăng = new Map();

  if (!cấuHìnhMãNơiĐăng) return từĐiển;
  for (const [mã, nơiĐăngThànhPhần] of Object.entries(cấuHìnhMãNơiĐăng)) {
    if (typeof nơiĐăngThànhPhần === "string") {
      const [tênNơiĐăngThànhPhần, url] = táchUrlTrongChuỗi(nơiĐăngThànhPhần);
      từĐiển.set(tênNơiĐăngThànhPhần.toLowerCase(), mã);
    } else {
      for (const dòng of nơiĐăngThànhPhần) {
        const [tênNơiĐăngThànhPhần, url] = táchUrlTrongChuỗi(dòng);
        từĐiển.set(tênNơiĐăngThànhPhần.toLowerCase(), mã);
      }
    }
  }
  return từĐiển;
}

/**
 * @param [từĐiểnSlugNơiĐăng=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển slug. Lúc này trả về tên nơi đăng dạng kebab
 */
export function tạoSlugNơiĐăng(
  nơiĐăng: ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo,
  từĐiểnSlugNơiĐăng: TừĐiểnSlugNơiĐăng | undefined = undefined,
): string | undefined {
  const {
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
  } = nơiĐăng;
  if (từĐiểnSlugNơiĐăng) {
    for (const tênNơiĐăngThànhPhần of tênNơiĐăng.toReversed()) {
      const mãNơiĐăngĐượcKhaiBáo = từĐiểnSlugNơiĐăng.get(tênNơiĐăngThànhPhần.toLowerCase());
      if (mãNơiĐăngĐượcKhaiBáo) return mãNơiĐăngĐượcKhaiBáo;
    }
  }
  return kiểuKebab(tênNơiĐăng[0]);
}
