import {
  danhSáchNơiĐăngKhác,
  LoạiNơiĐăngDiễnĐàn,
  ThôngTinNơiĐăngChưaCóId,
  TênChứcNăngTrongSaaS,
  TênNềnTảngSaaS,
  VậtThểLàmGiáTrịChoTênSaaS,
  ĐịnhDạngTậpTin,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { CấuHìnhNơiĐăngDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./Tạo danh sách nơi đăng chat.ts";
import { cóThôngTinNơiĐăngTrongVậtThểVịTrí, tạoDanhSáchVịTríCóThểĐăng } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { parse } from "$std/yaml/mod.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { kiểmTraIdĐangCó, táchUrlTrongChuỗi } from "../../Code hỗ trợ/Code hỗ trợ.ts";
import { tạoMãNơiĐăng, tạoTừĐiểnMãNơiĐăng, TừĐiểnMãNơiĐăng } from "./Tạo mã nơi đăng.ts";
import CấuHìnhNơiĐăng, { CấuHìnhChung, ThôngTinCấuHìnhNơiĐăng } from "../../Code hỗ trợ/Hàm và kiểu cho cấu hình.ts";

function tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhNơiĐăngDiễnĐàn = cấuHìnhNơiĐăng["Diễn đàn"];
  if (!cấuHìnhNơiĐăngDiễnĐàn) return;
  for (const [tênDiễnĐàn, vậtThểLàmGiáTrịChoTênDiễnĐàn] of Object.entries(cấuHìnhNơiĐăngDiễnĐàn) as [TênDiễnĐàn, CấuHìnhNơiĐăngDiễnĐàn][]) {
    if (!vậtThểLàmGiáTrịChoTênDiễnĐàn) continue;
    for (const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênDiễnĐàn) as [LoạiNơiĐăngDiễnĐàn[0], string[]][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
        const [tênNơiĐăng, url] = táchUrlTrongChuỗi(tênNơiĐăngUrl);
        danhSáchThôngTinNơiĐăng.push({
          "Tên nơi đăng": [tênNơiĐăng],
          "Loại nơi đăng": [loạiNơiĐăng],
          "Tên nền tảng": tênDiễnĐàn,
          "Loại nền tảng": "Diễn đàn",
          URL: url,
        });
      }
    }
  }
}

function tạoDanhSáchTậpTin(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhTậpTin = cấuHìnhNơiĐăng["Tập tin"];
  if (!cấuHìnhTậpTin) return;
  for (const [địnhĐạngTậpTin, danhSáchTênNơiĐăng] of Object.entries(cấuHìnhTậpTin) as [ĐịnhDạngTậpTin, string[]][]) {
    for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
      const [tênNơiĐăng, url] = táchUrlTrongChuỗi(tênNơiĐăngUrl);
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [địnhĐạngTậpTin],
        "Tên nền tảng": địnhĐạngTậpTin,
        "Loại nền tảng": "Tập tin",
        URL: url,
      });
    }
  }
}

function tạoDanhSáchSaaS(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhSaaS = cấuHìnhNơiĐăng["SaaS"];
  if (!cấuHìnhSaaS) return;
  for (const [tênSaaS, vậtThểLàmGiáTrịChoTênSaaS] of Object.entries(cấuHìnhSaaS) as [TênNềnTảngSaaS, VậtThểLàmGiáTrịChoTênSaaS | null][]) {
    if (!vậtThểLàmGiáTrịChoTênSaaS) continue;
    for (const [TênChứcNăngTrongSaaS, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênSaaS) as [TênChứcNăngTrongSaaS, string[] | null][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
        const [tênNơiĐăng, url] = táchUrlTrongChuỗi(tênNơiĐăngUrl);
        danhSáchThôngTinNơiĐăng.push({
          "Tên nơi đăng": [tênNơiĐăng],
          "Loại nơi đăng": [TênChứcNăngTrongSaaS],
          "Tên nền tảng": tênSaaS,
          "Loại nền tảng": "SaaS",
          URL: url,
        });
      }
    }
  }
}

function tạoDanhSáchKhác(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  for (const loạiNơiĐăngKhác of danhSáchNơiĐăngKhác) {
    const cấuHìnhLoạiNơiĐăngKhác = cấuHìnhNơiĐăng[loạiNơiĐăngKhác];
    if (!cấuHìnhLoạiNơiĐăngKhác) continue;
    for (const tênNơiĐăngKhácUrl of Object.values(cấuHìnhLoạiNơiĐăngKhác)) {
      const [tênNơiĐăngKhác, url] = táchUrlTrongChuỗi(tênNơiĐăngKhácUrl);
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăngKhác],
        "Loại nơi đăng": [loạiNơiĐăngKhác],
        "Tên nền tảng": loạiNơiĐăngKhác,
        "Loại nền tảng": loạiNơiĐăngKhác,
        URL: url,
      });
    }
  }
}

/**
 * Tạo danh sách nơi đăng từ một file cấu hình. Kết quả
 */
export default async function tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí(
  vậtThểCấuHình: ThôngTinCấuHìnhNơiĐăng,
  cấuHìnhChung: CấuHìnhChung,
): Promise<NơiĐăngCóCácLựaChọnVịTrí[]> {
  const { cấuHình, loạiCấuHình, tênCấuHình } = vậtThểCấuHình;
  const danhSáchNơiĐăng: NơiĐăngCóCácLựaChọnVịTrí[] = [];
  tạoDanhSáchDiễnĐàn(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchChat(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchTậpTin(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchSaaS(cấuHình, danhSáchNơiĐăng);
  tạoDanhSáchKhác(cấuHình, danhSáchNơiĐăng);

  const {
    "Vị trí đặt liên kết ở nơi đăng": danhSáchVậtThểVịTrí,
    "Vị trí thành phần": cấuHìnhVịTríNhỏHơn,
  } = cấuHìnhChung;
  const từĐiểnMãNơiĐăng = tạoTừĐiểnMãNơiĐăng(vậtThểCấuHình.cấuHình["Mã nơi đăng"]);

  for (const thôngTinNơiĐăng of danhSáchNơiĐăng) {
    for (const vậtThểVịTrí of danhSáchVậtThểVịTrí) {
      const danhSáchVịTríThànhPhần = vậtThểVịTrí["Danh sách vị trí"];
      if (cóThôngTinNơiĐăngTrongVậtThểVịTrí(thôngTinNơiĐăng, vậtThểVịTrí)) {
        thôngTinNơiĐăng["Vị trí có thể đăng"] = tạoDanhSáchVịTríCóThểĐăng(danhSáchVịTríThànhPhần, cấuHìnhVịTríNhỏHơn);
      }
    }
    switch (loạiCấuHình) {
      case "Chủ đề":
        thôngTinNơiĐăng["Lĩnh vực"] = [tênCấuHình];
        break;

      default:
        thôngTinNơiĐăng["Đơn vị quản lý"] = tênCấuHình;
        break;
    }
    thôngTinNơiĐăng.id = await kiểmTraIdĐangCó("nơi đăng", thôngTinNơiĐăng);

    thôngTinNơiĐăng["Mã nơi đăng"] = tạoMãNơiĐăng(thôngTinNơiĐăng, từĐiểnMãNơiĐăng);
  }
  return danhSáchNơiĐăng;
}
// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng/Tổ chức/Quả Cầu.yaml")) as CấuHìnhNơiĐăng;
// const a = await tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí(cấuHìnhNơiĐăng);
// console.log(a);
// console.log("");
//
