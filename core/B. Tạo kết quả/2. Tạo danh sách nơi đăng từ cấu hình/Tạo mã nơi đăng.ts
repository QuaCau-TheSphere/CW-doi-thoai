import { CấuHìnhMãNơiĐăng, MãNơiĐăng, TênNơiĐăng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { lấyKýHiệuViếtTắt, táchUrlTrongChuỗi, tạoChuỗiNgẫuNhiên } from "../../Code hỗ trợ/Code hỗ trợ.ts";
import { CấuHìnhViếtTắt } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { ThôngTinNơiĐăng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";

/** Từ điển (hay ánh xạ) giữa tên nơi đăng thành phần và mã nơi đăng */
export function tạoTừĐiểnMãNơiĐăng(
  cấuHìnhMãNơiĐăng: CấuHìnhMãNơiĐăng | undefined | null,
): Map<string, string> {
  const từĐiển: Map<string, string> = new Map();
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

function tìmMãNơiĐăngĐượcKhaiBáo(
  tênNơiĐăng: TênNơiĐăng,
  từĐiểnMãNơiĐăng: Map<string, string>,
): string | undefined {
  for (const tênNơiĐăngThànhPhần of tênNơiĐăng) {
    const mãNơiĐăngĐượcKhaiBáo = từĐiểnMãNơiĐăng.get(tênNơiĐăngThànhPhần.toLowerCase());
    if (mãNơiĐăngĐượcKhaiBáo) return mãNơiĐăngĐượcKhaiBáo;
  }
}

export function tạoMãNơiĐăng(
  nơiĐăng: ThôngTinNơiĐăng & { id: string },
  từĐiểnMãNơiĐăng: Map<string, string>,
  cấuHìnhViếtTắt: CấuHìnhViếtTắt,
): `${string}:${MãNơiĐăng}` {
  const {
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
  } = nơiĐăng;
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhViếtTắt) || tênNềnTảng;
  const phầnNơiĐăng: MãNơiĐăng = tìmMãNơiĐăngĐượcKhaiBáo(tênNơiĐăng, từĐiểnMãNơiĐăng) || nơiĐăng.id;

  return `${kýHiệuNềnTảng}:${phầnNơiĐăng}`;
}
