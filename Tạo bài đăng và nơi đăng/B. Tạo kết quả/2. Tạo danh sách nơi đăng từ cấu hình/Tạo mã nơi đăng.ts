import { ThôngTinNơiĐăngChưaCóId } from "../../Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { táchUrlTrongChuỗi } from "../../Code hỗ trợ cho server/Code hỗ trợ.ts";
import { CấuHìnhMãNơiĐăng } from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { kiểuKebab } from "../../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";

export type TừĐiểnMãNơiĐăng = Map<string, string>;

/** Từ điển (hay ánh xạ) giữa tên nơi đăng thành phần và mã nơi đăng */
export function tạoTừĐiểnMãNơiĐăng(cấuHìnhMãNơiĐăng: CấuHìnhMãNơiĐăng | undefined): TừĐiểnMãNơiĐăng {
  const từĐiển: TừĐiểnMãNơiĐăng = new Map();

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

export function tạoMãNơiĐăng(nơiĐăng: ThôngTinNơiĐăngChưaCóId, từĐiểnMãNơiĐăng: TừĐiểnMãNơiĐăng | undefined): string | undefined {
  const {
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
  } = nơiĐăng;
  if (từĐiểnMãNơiĐăng) {
    for (const tênNơiĐăngThànhPhần of tênNơiĐăng.toReversed()) {
      const mãNơiĐăngĐượcKhaiBáo = từĐiểnMãNơiĐăng.get(tênNơiĐăngThànhPhần.toLowerCase());
      if (mãNơiĐăngĐượcKhaiBáo) return mãNơiĐăngĐượcKhaiBáo;
    }
  }
  return kiểuKebab(tênNơiĐăng[0]);
}
