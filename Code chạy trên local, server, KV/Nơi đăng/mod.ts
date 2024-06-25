import {
  CấuHìnhNơiĐăngDiễnĐàn,
  danhSáchNơiĐăngKhác,
  LoạiNơiĐăngDiễnĐàn,
  ThôngTinNơiĐăngChưaCóId,
  TênChứcNăngTrongSaaS,
  TênDiễnĐàn,
  TênNềnTảngSaaS,
  VậtThểLàmGiáTrịChoTênSaaS,
  ĐịnhDạngTậpTin,
} from "./Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./Tạo danh sách nơi đăng chat.ts";
import {
  cóThôngTinNơiĐăngTrongVậtThểVịTrí,
  NơiĐăngCóCácLựaChọnVịTrí,
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  tạoDanhSáchVịTríCóThểĐăng,
} from "../../Code chạy trên client/Hàm và kiểu cho vị trí.ts";
import CấuHìnhNơiĐăng, { lấyCấuHìnhChung, ThôngTinCấuHìnhNơiĐăng, tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "../Hàm và kiểu cho cấu hình.ts";
import { đổiTừCơSố10SangCơSố64 } from "../../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "./Tạo slug.ts";
import { táchUrlHoặcEmailĐầuTiênTrongChuỗi } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";

async function tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const cấuHìnhNơiĐăngDiễnĐàn = cấuHìnhNơiĐăng["Diễn đàn"];
  const danhSáchDiễnĐàn: ThôngTinNơiĐăngChưaCóId[] = [];
  if (!cấuHìnhNơiĐăngDiễnĐàn) return [];
  for (const [tênDiễnĐàn, vậtThểLàmGiáTrịChoTênDiễnĐàn] of Object.entries(cấuHìnhNơiĐăngDiễnĐàn) as [TênDiễnĐàn, CấuHìnhNơiĐăngDiễnĐàn][]) {
    if (!vậtThểLàmGiáTrịChoTênDiễnĐàn) continue;
    for (const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênDiễnĐàn) as [LoạiNơiĐăngDiễnĐàn[0], string[]][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
        const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
        danhSáchDiễnĐàn.push({
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
  return danhSáchDiễnĐàn;
}

async function tạoDanhSáchTậpTin(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const cấuHìnhTậpTin = cấuHìnhNơiĐăng["Tập tin"];
  const danhSáchTậpTin: ThôngTinNơiĐăngChưaCóId[] = [];
  if (!cấuHìnhTậpTin) return [];
  for (const [địnhĐạngTậpTin, danhSáchTênNơiĐăng] of Object.entries(cấuHìnhTậpTin) as [ĐịnhDạngTậpTin, string[]][]) {
    for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
      const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
      danhSáchTậpTin.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [địnhĐạngTậpTin],
        "Tên nền tảng": địnhĐạngTậpTin,
        "Loại nền tảng": "Tập tin",
        URL: url,
        "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
      });
    }
  }
  return danhSáchTậpTin;
}

async function tạoDanhSáchSaaS(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const cấuHìnhSaaS = cấuHìnhNơiĐăng["SaaS"];
  const danhSáchSaaS: ThôngTinNơiĐăngChưaCóId[] = [];
  if (!cấuHìnhSaaS) return [];
  for (const [tênSaaS, vậtThểLàmGiáTrịChoTênSaaS] of Object.entries(cấuHìnhSaaS) as [TênNềnTảngSaaS, VậtThểLàmGiáTrịChoTênSaaS | null][]) {
    if (!vậtThểLàmGiáTrịChoTênSaaS) continue;
    for (const [TênChứcNăngTrongSaaS, danhSáchTênNơiĐăng] of Object.entries(vậtThểLàmGiáTrịChoTênSaaS) as [TênChứcNăngTrongSaaS, string[] | null][]) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
        const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
        danhSáchSaaS.push({
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
  return danhSáchSaaS;
}

async function tạoDanhSáchKhác(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const danhSáchKhác: ThôngTinNơiĐăngChưaCóId[] = [];
  for (const loạiNơiĐăngKhác of danhSáchNơiĐăngKhác) {
    const cấuHìnhLoạiNơiĐăngKhác = cấuHìnhNơiĐăng[loạiNơiĐăngKhác];
    if (!cấuHìnhLoạiNơiĐăngKhác) continue;
    for (const tênNơiĐăngKhácUrl of Object.values(cấuHìnhLoạiNơiĐăngKhác)) {
      const [tênNơiĐăngKhác, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngKhácUrl);
      danhSáchKhác.push({
        "Tên nơi đăng": [tênNơiĐăngKhác],
        "Loại nơi đăng": [loạiNơiĐăngKhác],
        "Tên nền tảng": loạiNơiĐăngKhác,
        "Loại nền tảng": loạiNơiĐăngKhác,
        URL: url,
        "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
      });
    }
  }
  return danhSáchKhác;
}

/**
 * Tạo danh sách nơi đăng từ một file cấu hình
 */
export default async function tạoDanhSáchNơiĐăngCóCácLựaChọnVịTrí(
  thôngTinCấuHìnhNơiĐăng: ThôngTinCấuHìnhNơiĐăng,
): Promise<NơiĐăngCóCácLựaChọnVịTríChưaCóId[]> {
  const { cấuHình, loạiCấuHình, tênCấuHình } = thôngTinCấuHìnhNơiĐăng;
  const danhSáchNơiĐăng: ThôngTinNơiĐăngChưaCóId[] = [
    ...await tạoDanhSáchDiễnĐàn(cấuHình),
    ...await tạoDanhSáchChat(cấuHình),
    ...await tạoDanhSáchTậpTin(cấuHình),
    ...await tạoDanhSáchSaaS(cấuHình),
    ...await tạoDanhSáchKhác(cấuHình),
  ];

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
    switch (loạiCấuHình) {
      case "Chủ đề":
        thôngTinNơiĐăng["Lĩnh vực"] = [tênCấuHình];
        break;

      default:
        thôngTinNơiĐăng["Đơn vị quản lý"] = tênCấuHình;
        break;
    }
    const { "Tên nơi đăng": tênNơiĐăng, URL: url } = thôngTinNơiĐăng;
    thôngTinNơiĐăng["Slug"] = tạoSlugNơiĐăng(tênNơiĐăng, url, từĐiểnSlugNơiĐăng);
  }
  return danhSáchNơiĐăng as NơiĐăngCóCácLựaChọnVịTríChưaCóId[];
}

export async function tạoDanhSáchNơiĐăngTừTấtCảCấuHình() {
  const danhSáchNơiĐăngChưaCóIdTừTấtCảCấuHình: NơiĐăngCóCácLựaChọnVịTríChưaCóId[] = [];
  const danhSáchNơiĐăngTừTấtCảCấuHình: NơiĐăngCóCácLựaChọnVịTrí[] = [];
  const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();

  for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
    if (thôngTinCấuHình.tênCấuHình === "test") continue;
    // if (thôngTinCấuHình.tênCấuHình !== "Quả Cầu") continue;
    // if (thôngTinCấuHình.tênCấuHình !== "test") continue;
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

// console.log(await tạoDanhSáchNơiĐăngTừTấtCảCấuHình());
// debugger;
