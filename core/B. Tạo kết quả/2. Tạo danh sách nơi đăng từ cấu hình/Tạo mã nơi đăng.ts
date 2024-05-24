import { CấuHìnhMãNơiĐăng, MãNơiĐăng, TênNơiĐăng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { lấyKýHiệuViếtTắt, táchUrlTrongChuỗi, tạoChuỗiNgẫuNhiên } from "../../Code hỗ trợ/Code hỗ trợ.ts";
import { CấuHìnhViếtTắt } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { ThôngTinNơiĐăng } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";

export function tạoTừĐiểnGiữaTênNơiĐăngThànhPhầnVàMãNơiĐăng(
  đơnVịQuảnLý: CấuHìnhMãNơiĐăng | undefined | null,
): Record<string, string> {
  const a: Record<string, string> = {};
  if (!đơnVịQuảnLý) return a;
  for (const [tênĐơnVị, nơiĐăngThànhPhần] of Object.entries(đơnVịQuảnLý)) {
    if (typeof nơiĐăngThànhPhần === "string") {
      const [tênNơiĐăngThànhPhần, url] = táchUrlTrongChuỗi(nơiĐăngThànhPhần);
      a[tênNơiĐăngThànhPhần] = tênĐơnVị;
    } else {
      for (const dòng of nơiĐăngThànhPhần) {
        const [tênNơiĐăngThànhPhần, url] = táchUrlTrongChuỗi(dòng);
        a[tênNơiĐăngThànhPhần] = tênĐơnVị;
      }
    }
  }
  return a;
}

function tìmMãNơiĐăngĐượcKhaiBáo(
  tênNơiĐăng: TênNơiĐăng,
  từĐiểnGiữaTênNơiĐăngThànhPhầnVàĐơnVịQuảnLý: Record<string, string>,
): string | undefined {
  for (const phầnTửTrongTênNơiĐăng of tênNơiĐăng) {
    const mãNơiĐăngĐượcKhaiBáo = từĐiểnGiữaTênNơiĐăngThànhPhầnVàĐơnVịQuảnLý[phầnTửTrongTênNơiĐăng];
    if (mãNơiĐăngĐượcKhaiBáo) return mãNơiĐăngĐượcKhaiBáo;
  }
}

export function tạoMãNơiĐăng(
  nơiĐăng: ThôngTinNơiĐăng & { id: string },
  từĐiểnGiữaTênNơiĐăngThànhPhầnVàĐơnVịQuảnLý: Record<string, string>,
  cấuHìnhViếtTắt: CấuHìnhViếtTắt,
): `${string}:${MãNơiĐăng}` {
  const {
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
  } = nơiĐăng;
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhViếtTắt) || tênNềnTảng;
  const phầnNơiĐăng: MãNơiĐăng = tìmMãNơiĐăngĐượcKhaiBáo(tênNơiĐăng, từĐiểnGiữaTênNơiĐăngThànhPhầnVàĐơnVịQuảnLý) || nơiĐăng.id;

  return `${kýHiệuNềnTảng}:${phầnNơiĐăng}`;
}
