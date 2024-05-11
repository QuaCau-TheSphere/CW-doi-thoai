//deno-fmt-ignore-file
import CấuHìnhNơiĐăng, {
  danhSáchNơiĐăngKhác,
  LoạiNơiĐăngDiễnĐàn,
  ThôngTinNơiĐăng,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { CấuHìnhNơiĐăngDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./Tạo danh sách nơi đăng chat.ts";
import { vậtThểVịTríCóThôngTinNơiĐăng, tạoDanhSáchVịTríCóThểĐăng } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { parse } from "$std/yaml/mod.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { CấuHìnhVịTrí } from "../../Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";

function tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăng[]) {
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

function tạoDanhSáchKhác(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăng[]) {
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

export default function tạoDanhSáchNơiĐăngCXĐVT(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): NơiĐăngChưaXácĐịnhVịTrí[] {
  const danhSáchNơiĐăng: NơiĐăngChưaXácĐịnhVịTrí[] = [];
  tạoDanhSáchDiễnĐàn(cấuHìnhNơiĐăng, danhSáchNơiĐăng);
  tạoDanhSáchChat(cấuHìnhNơiĐăng, danhSáchNơiĐăng);
  tạoDanhSáchKhác(cấuHìnhNơiĐăng, danhSáchNơiĐăng);

  const cấuHìnhVịTrí = parse(Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng/Thiết lập chung (processed).yaml")) as CấuHìnhVịTrí
  const {
    "Danh sách vật thể vị trí": danhSáchVậtThểVịTrí,
    "Vị trí nhỏ hơn": cấuHìnhVịTríNhỏHơn,
  } = cấuHìnhVịTrí;
  for (const thôngTinNơiĐăng of danhSáchNơiĐăng) {
    for (const vậtThểVịTrí of danhSáchVậtThểVịTrí) {
      const { "Danh sách vị trí": danhSáchVịTríThànhPhần } = vậtThểVịTrí;
      if (vậtThểVịTríCóThôngTinNơiĐăng(thôngTinNơiĐăng, vậtThểVịTrí)) {
        thôngTinNơiĐăng["Vị trí có thể đăng"] = tạoDanhSáchVịTríCóThểĐăng(
          danhSáchVịTríThànhPhần,
          cấuHìnhVịTríNhỏHơn,
        );
      }
    }
  }
  return danhSáchNơiĐăng
}
// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng/UAN.yaml')) as CấuHìnhNơiĐăng;
// const a = tạoDanhSáchNơiĐăngCXĐVT(cấuHìnhNơiĐăng)
// console.log(a)
// console.log('')
