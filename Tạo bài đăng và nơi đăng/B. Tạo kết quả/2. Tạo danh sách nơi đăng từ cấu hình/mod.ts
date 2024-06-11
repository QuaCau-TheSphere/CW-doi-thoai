import {
  DanhSáchNơiĐăngKhác,
  LoạiNơiĐăngDiễnĐàn,
  ThôngTinNơiĐăngChưaCóId,
  TênChứcNăngTrongSaaS,
  TênNềnTảngSaaS,
  VậtThểLàmGiáTrịChoTênSaaS,
  ĐịnhDạngTậpTin,
} from "../../Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { TênDiễnĐàn } from "../../Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { CấuHìnhNơiĐăngDiễnĐàn } from "../../Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./Tạo danh sách nơi đăng chat.ts";
import {
  cóThôngTinNơiĐăngTrongVậtThểVịTrí,
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  tạoDanhSáchVịTríCóThểĐăng,
} from "../../Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { đổiTừCơSố10SangCơSố64 } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm xử lý chuỗi.ts";
import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Tạo slug.ts";
import CấuHìnhNơiĐăng, {
  lấyCấuHìnhChung,
  ThôngTinCấuHìnhNơiĐăng,
  tạoDanhSáchThôngTinCấuHìnhNơiĐăng,
} from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { táchUrlHoặcEmailĐầuTiênTrongChuỗi } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm và kiểu cho URL.ts";

async function tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhNơiĐăngDiễnĐàn = cấuHìnhNơiĐăng["Diễn đàn"];
  if (!cấuHìnhNơiĐăngDiễnĐàn) return;
  for (const [tênDiễnĐàn, vậtThểLàmGiáTrịChoTênDiễnĐàn] of Object.entries(cấuHìnhNơiĐăngDiễnĐàn) as [TênDiễnĐàn, CấuHìnhNơiĐăngDiễnĐàn][]) {
    if (!vậtThểLàmGiáTrịChoTênDiễnĐàn) continue;
    for (const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênDiễnĐàn) as [LoạiNơiĐăngDiễnĐàn[0], string[]][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
        const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
        danhSáchThôngTinNơiĐăng.push({
          "Tên nơi đăng": [tênNơiĐăng],
          "Loại nơi đăng": [loạiNơiĐăng],
          "Tên nền tảng": tênDiễnĐàn,
          "Loại nền tảng": "Diễn đàn",
          URL: url,
          "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
        });
      }
    }
  }
}

async function tạoDanhSáchTậpTin(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhTậpTin = cấuHìnhNơiĐăng["Tập tin"];
  if (!cấuHìnhTậpTin) return;
  for (const [địnhĐạngTậpTin, danhSáchTênNơiĐăng] of Object.entries(cấuHìnhTậpTin) as [ĐịnhDạngTậpTin, string[]][]) {
    for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
      const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [địnhĐạngTậpTin],
        "Tên nền tảng": địnhĐạngTậpTin,
        "Loại nền tảng": "Tập tin",
        URL: url,
        "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
      });
    }
  }
}

async function tạoDanhSáchSaaS(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhSaaS = cấuHìnhNơiĐăng["SaaS"];
  if (!cấuHìnhSaaS) return;
  for (const [tênSaaS, vậtThểLàmGiáTrịChoTênSaaS] of Object.entries(cấuHìnhSaaS) as [TênNềnTảngSaaS, VậtThểLàmGiáTrịChoTênSaaS | null][]) {
    if (!vậtThểLàmGiáTrịChoTênSaaS) continue;
    for (const [TênChứcNăngTrongSaaS, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênSaaS) as [TênChứcNăngTrongSaaS, string[] | null][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
        const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
        danhSáchThôngTinNơiĐăng.push({
          "Tên nơi đăng": [tênNơiĐăng],
          "Loại nơi đăng": [TênChứcNăngTrongSaaS],
          "Tên nền tảng": tênSaaS,
          "Loại nền tảng": "SaaS",
          URL: url,
          "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
        });
      }
    }
  }
}

async function tạoDanhSáchKhác(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  for (const loạiNơiĐăngKhác of DanhSáchNơiĐăngKhác) {
    const cấuHìnhLoạiNơiĐăngKhác = cấuHìnhNơiĐăng[loạiNơiĐăngKhác];
    if (!cấuHìnhLoạiNơiĐăngKhác) continue;
    for (const tênNơiĐăngKhácUrl of Object.values(cấuHìnhLoạiNơiĐăngKhác)) {
      const [tênNơiĐăngKhác, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngKhácUrl);
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăngKhác],
        "Loại nơi đăng": [loạiNơiĐăngKhác],
        "Tên nền tảng": loạiNơiĐăngKhác,
        "Loại nền tảng": loạiNơiĐăngKhác,
        URL: url,
        "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
      });
    }
  }
}

/**
 * Tạo danh sách nơi đăng từ một file cấu hình
 */
export default async function tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí(
  thôngTinCấuHìnhNơiĐăng: ThôngTinCấuHìnhNơiĐăng,
): Promise<NơiĐăngCóCácLựaChọnVịTríChưaCóId[]> {
  const { cấuHình, loạiCấuHình, tênCấuHình } = thôngTinCấuHìnhNơiĐăng;
  const danhSáchNơiĐăng: NơiĐăngCóCácLựaChọnVịTríChưaCóId[] = [];
  await tạoDanhSáchDiễnĐàn(cấuHình, danhSáchNơiĐăng);
  await tạoDanhSáchChat(cấuHình, danhSáchNơiĐăng);
  await tạoDanhSáchTậpTin(cấuHình, danhSáchNơiĐăng);
  await tạoDanhSáchSaaS(cấuHình, danhSáchNơiĐăng);
  await tạoDanhSáchKhác(cấuHình, danhSáchNơiĐăng);

  const {
    "Vị trí đặt liên kết ở nơi đăng": danhSáchVậtThểVịTrí,
    "Vị trí thành phần": cấuHìnhVịTríNhỏHơn,
  } = lấyCấuHìnhChung();
  const từĐiểnSlugNơiĐăng = await tạoTừĐiểnSlugNơiĐăng(thôngTinCấuHìnhNơiĐăng.cấuHình["Slug"]);

  for (const thôngTinNơiĐăng of danhSáchNơiĐăng) {
    for (const vậtThểVịTrí of danhSáchVậtThểVịTrí) {
      const danhSáchVịTríThànhPhần = vậtThểVịTrí["Danh sách vị trí"];
      if (cóThôngTinNơiĐăngTrongVậtThểVịTrí(thôngTinNơiĐăng, vậtThểVịTrí)) {
        thôngTinNơiĐăng["Vị trí có thể đăng"] = tạoDanhSáchVịTríCóThểĐăng(danhSáchVịTríThànhPhần, cấuHìnhVịTríNhỏHơn);
      }
    }
    if (thôngTinNơiĐăng.URL === "") {
    }
    switch (loạiCấuHình) {
      case "Chủ đề":
        thôngTinNơiĐăng["Lĩnh vực"] = [tênCấuHình];
        break;

      default:
        thôngTinNơiĐăng["Đơn vị quản lý"] = tênCấuHình;
        break;
    }

    thôngTinNơiĐăng["Slug"] = tạoSlugNơiĐăng(thôngTinNơiĐăng, từĐiểnSlugNơiĐăng);
  }
  return danhSáchNơiĐăng;
}

export async function tạoDanhSáchNơiĐăngTừTấtCảCấuHình() {
  const danhSáchNơiĐăngChưaCóIdTừTấtCảCấuHình: NơiĐăngCóCácLựaChọnVịTríChưaCóId[] = [];
  const danhSáchNơiĐăngTừTấtCảCấuHình: NơiĐăngCóCácLựaChọnVịTrí[] = [];
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();

  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình === "test") continue;
    danhSáchNơiĐăngChưaCóIdTừTấtCảCấuHình.push(...await tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí(thôngTinCấuHình));
  }
  let sốNơiĐăngChưaCóId = 0;
  for (const nơiĐăngChưaCóId of danhSáchNơiĐăngChưaCóIdTừTấtCảCấuHình) {
    danhSáchNơiĐăngTừTấtCảCấuHình.push({
      ...nơiĐăngChưaCóId,
      id: đổiTừCơSố10SangCơSố64(sốNơiĐăngChưaCóId),
    });
    sốNơiĐăngChưaCóId += 1;
  }
  console.log(sốNơiĐăngChưaCóId);
  return danhSáchNơiĐăngTừTấtCảCấuHình;
}

// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng/Tổ chức/Quả Cầu.yaml")) as CấuHìnhNơiĐăng;
// const a = await tạoDanhSáchNơiĐăngChưaXácĐịnhVịTrí(cấuHìnhNơiĐăng);
// console.log(a);
// console.log("");
//
