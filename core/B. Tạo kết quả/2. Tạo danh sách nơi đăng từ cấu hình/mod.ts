import CấuHìnhNơiĐăng, {
  danhSáchNơiĐăngKhác,
  LoạiNơiĐăngDiễnĐàn,
  NơiĐăng,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { CấuHìnhNơiĐăngDiễnĐàn } from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import tạoDanhSáchChat from "./T%E1%BA%A1o%20danh%20d%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng%20chat.ts";

/**
 * Lấy dữ liệu từ `Nơi đăng.yaml`
 */
export default function tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng) {
  const danhSáchNơiĐăng: NơiĐăng[] = [];

  tạoDanhSáchDiễnĐàn();
  tạoDanhSáchChat(cấuHìnhNơiĐăng, danhSáchNơiĐăng);
  tạoDanhSáchKhác();

  return danhSáchNơiĐăng;

  function tạoDanhSáchDiễnĐàn() {
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

  function tạoDanhSáchKhác() {
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
}
