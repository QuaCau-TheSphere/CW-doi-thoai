import CấuHìnhNơiĐăng, {
  danhSáchNơiĐăngKhác,
  LoạiNơiĐăngDiễnĐàn,
  ThôngTinNơiĐăng,
  TênChứcNăngTrongSaaS,
  TênNềnTảngSaaS,
  VậtThểCấuHình,
  VậtThểLàmGiáTrịChoTênSaaS,
  ĐịnhDạngTậpTin,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { CấuHìnhNơiĐăngDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./Tạo danh sách nơi đăng chat.ts";
import { tạoDanhSáchVịTríCóThểĐăng, vậtThểVịTríCóThôngTinNơiĐăng } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { parse } from "$std/yaml/mod.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { CấuHìnhVịTrí } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { xácĐịnhId } from "../../Code hỗ trợ/Code hỗ trợ.ts";

function tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: Omit<ThôngTinNơiĐăng, "id">[]) {
  const cấuHìnhNơiĐăngDiễnĐàn = cấuHìnhNơiĐăng["Diễn đàn"];
  if (!cấuHìnhNơiĐăngDiễnĐàn) return;
  for (const [tênDiễnĐàn, vậtThểLàmGiáTrịChoTênDiễnĐàn] of Object.entries(cấuHìnhNơiĐăngDiễnĐàn) as [TênDiễnĐàn, CấuHìnhNơiĐăngDiễnĐàn][]) {
    if (!vậtThểLàmGiáTrịChoTênDiễnĐàn) continue;
    for (const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênDiễnĐàn) as [LoạiNơiĐăngDiễnĐàn[0], string[]][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăng of danhSáchTênNơiĐăng) {
        danhSáchThôngTinNơiĐăng.push({
          "Tên nơi đăng": [tênNơiĐăng],
          "Loại nơi đăng": [loạiNơiĐăng],
          "Tên nền tảng": tênDiễnĐàn,
          "Loại nền tảng": "Diễn đàn",
        });
      }
    }
  }
}

function tạoDanhSáchTậpTin(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: Omit<ThôngTinNơiĐăng, "id">[]) {
  const cấuHìnhTậpTin = cấuHìnhNơiĐăng["Tập tin"];
  if (!cấuHìnhTậpTin) return;
  for (const [địnhĐạngTậpTin, danhSáchTênNơiĐăng] of Object.entries(cấuHìnhTậpTin) as [ĐịnhDạngTậpTin, string[]][]) {
    for (const tênNơiĐăng of danhSáchTênNơiĐăng) {
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [địnhĐạngTậpTin],
        "Tên nền tảng": địnhĐạngTậpTin,
        "Loại nền tảng": "Tập tin",
      });
    }
  }
}

function tạoDanhSáchSaaS(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: Omit<ThôngTinNơiĐăng, "id">[]) {
  const cấuHìnhSaaS = cấuHìnhNơiĐăng["SaaS"];
  if (!cấuHìnhSaaS) return;
  for (const [tênSaaS, vậtThểLàmGiáTrịChoTênSaaS] of Object.entries(cấuHìnhSaaS) as [TênNềnTảngSaaS, VậtThểLàmGiáTrịChoTênSaaS | null][]) {
    if (!vậtThểLàmGiáTrịChoTênSaaS) continue;
    for (const [TênChứcNăngTrongSaaS, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênSaaS) as [TênChứcNăngTrongSaaS, string[] | null][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăng of danhSáchTênNơiĐăng) {
        danhSáchThôngTinNơiĐăng.push({
          "Tên nơi đăng": [tênNơiĐăng],
          "Loại nơi đăng": [TênChứcNăngTrongSaaS],
          "Tên nền tảng": tênSaaS,
          "Loại nền tảng": "SaaS",
        });
      }
    }
  }
}

function tạoDanhSáchKhác(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: Omit<ThôngTinNơiĐăng, "id">[]) {
  for (const loạiNơiĐăngKhác of danhSáchNơiĐăngKhác) {
    const cấuHìnhLoạiNơiĐăngKhác = cấuHìnhNơiĐăng[loạiNơiĐăngKhác];
    if (!cấuHìnhLoạiNơiĐăngKhác) continue;
    for (const tênNơiĐăngKhác of Object.values(cấuHìnhLoạiNơiĐăngKhác)) {
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăngKhác],
        "Loại nơi đăng": [loạiNơiĐăngKhác],
        "Tên nền tảng": loạiNơiĐăngKhác,
        "Loại nền tảng": loạiNơiĐăngKhác,
      });
    }
  }
}

export default async function tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí(
  vậtThểCấuHình: VậtThểCấuHình,
  cấuHìnhVịTrí: CấuHìnhVịTrí,
): Promise<NơiĐăngChưaXácĐịnhVịTrí[]> {
  const { cấuHình, loạiCấuHình, tênCấuHình } = vậtThểCấuHình;
  const danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[] = [];
  tạoDanhSáchDiễnĐàn(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchChat(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchTậpTin(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchSaaS(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchKhác(cấuHình, danhSáchNơiĐăng);

  const {
    "Vị trí đặt liên kết ở nơi đăng": danhSáchVậtThểVịTrí,
    "Vị trí thành phần": cấuHìnhVịTríNhỏHơn,
  } = cấuHìnhVịTrí;
  for (const thôngTinNơiĐăng of danhSáchNơiĐăng) {
    for (const vậtThểVịTrí of danhSáchVậtThểVịTrí) {
      const danhSáchVịTríThànhPhần = vậtThểVịTrí["Danh sách vị trí"];
      if (vậtThểVịTríCóThôngTinNơiĐăng(thôngTinNơiĐăng, vậtThểVịTrí)) {
        thôngTinNơiĐăng["Vị trí có thể đăng"] = tạoDanhSáchVịTríCóThểĐăng(danhSáchVịTríThànhPhần, cấuHìnhVịTríNhỏHơn);
        thôngTinNơiĐăng["Lĩnh vực"] = [tênCấuHình];
      }
    }
    thôngTinNơiĐăng.id = await xácĐịnhId("nơi đăng", thôngTinNơiĐăng);
  }
  return danhSáchNơiĐăng;
}
// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng/Tổ chức/Quả Cầu.yaml")) as CấuHìnhNơiĐăng;
// const a = await tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí(cấuHìnhNơiĐăng);
// console.log(a);
// console.log("");
//
