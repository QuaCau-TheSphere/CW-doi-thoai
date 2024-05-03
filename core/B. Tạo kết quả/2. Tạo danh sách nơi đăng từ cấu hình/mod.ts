import CấuHìnhNơiĐăng, {
  danhSáchNơiĐăngKhác,
  LoạiNơiĐăngDiễnĐàn,
  NơiĐăng,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { CấuHìnhNơiĐăngDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./Tạo danh sách nơi đăng chat.ts";
import tạoCácPhiênBảnVịTrí, { CấuHìnhThiếtLậpChung } from "./Tạo các phiên bản vị trí.ts";
import { parse } from "$std/yaml/mod.ts";

function tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchNơiĐăng: NơiĐăng[]) {
  const cấuHìnhNơiĐăngDiễnĐàn = cấuHìnhNơiĐăng["Diễn đàn"];
  if (!cấuHìnhNơiĐăngDiễnĐàn) return;
  for (
    const [tênDiễnĐàn, vậtThểLàmGiáTrịChoTênDiễnĐàn] of Object.entries(
      cấuHìnhNơiĐăngDiễnĐàn,
    ) as [TênDiễnĐàn, CấuHìnhNơiĐăngDiễnĐàn][]
  ) {
    if (!vậtThểLàmGiáTrịChoTênDiễnĐàn) continue;
    for (
      const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(
        vậtThểLàmGiáTrịChoTênDiễnĐàn,
      ) as [LoạiNơiĐăngDiễnĐàn[0], string[]][]
    ) {
      if (!danhSáchTênNơiĐăng) continue;
      for (const tênNơiĐăng of danhSáchTênNơiĐăng) {
        danhSáchNơiĐăng.push({
          "Tên nơi đăng": [tênNơiĐăng],
          "Loại nơi đăng": [loạiNơiĐăng],
          "Tên nền tảng": tênDiễnĐàn,
          "Loại nền tảng": "Diễn đàn",
        });
      }
    }
  }
}

function tạoDanhSáchKhác(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchNơiĐăng: NơiĐăng[]) {
  for (const loạiNơiĐăngKhác of danhSáchNơiĐăngKhác) {
    const cấuHìnhLoạiNơiĐăngKhác = cấuHìnhNơiĐăng[loạiNơiĐăngKhác];
    if (!cấuHìnhLoạiNơiĐăngKhác) continue;
    for (const tênNơiĐăngKhác of Object.values(cấuHìnhLoạiNơiĐăngKhác)) {
      danhSáchNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăngKhác],
        "Loại nơi đăng": [loạiNơiĐăngKhác],
        "Tên nền tảng": loạiNơiĐăngKhác,
        "Loại nền tảng": loạiNơiĐăngKhác,
      });
    }
  }
}

export default function tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng) {
  const danhSáchNơiĐăng: NơiĐăng[] = [];

  tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng, danhSáchNơiĐăng);
  tạoDanhSáchChat(cấuHìnhNơiĐăng, danhSáchNơiĐăng);
  tạoDanhSáchKhác(cấuHìnhNơiĐăng, danhSáchNơiĐăng);
  const cấuHìnhThiếtLậpChung = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml')) as CấuHìnhThiếtLậpChung
  const danhSáchNơiĐăngCóCácPhiênBảnVịTrí = tạoCácPhiênBảnVịTrí(danhSáchNơiĐăng, cấuHìnhThiếtLậpChung)
  return danhSáchNơiĐăngCóCácPhiênBảnVịTrí ;
}
// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/UAN.yaml')) as CấuHìnhNơiĐăng;
// tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng) 
// console.log('')