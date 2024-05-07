import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.219.0/assert/mod.ts";
import tạoDanhSáchNơiĐăngCXĐVT from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.219.0/assert/assert_array_includes.ts";
import { parse } from "$std/yaml/parse.ts";
import tạoDanhSáchBàiĐăngTrênVault from "../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import tạoDanhSáchBàiĐăngTrênWordPress from "../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/b.%20L%E1%BA%A5y%20t%E1%BB%AB%20WordPress.ts";
import CấuHìnhNơiĐăng from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import {
  THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT,
  TÊN_MIỀN_RÚT_GỌN,
  ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV,
} from "./H%E1%BA%B1ng.ts";
import tạoThamSốUTMVàLiênKếtRútGọn from "../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";

const cấuHìnhNơiĐăng = parse(
  Deno.readTextFileSync("./core/A. Cấu hình/Nơi đăng.yaml"),
) as CấuHìnhNơiĐăng;
const danhSáchBàiĐăng =
  (await tạoDanhSáchBàiĐăngTrênVault(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT)).concat(
    await tạoDanhSáchBàiĐăngTrênWordPress(ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV),
  );
const danhSáchNơiĐăng = tạoDanhSáchNơiĐăngCXĐVT(cấuHìnhNơiĐăng);

Deno.test("tạoDanhSáchNơiĐăng", () => {
  assert(
    danhSáchNơiĐăng.some((e) => e["Tên nơi đăng"] === "Một đám mây chim sáo"),
  );
  assert(danhSáchNơiĐăng.some((e) => e["Tên nơi đăng"] === "Ảnh bìa Quả Cầu"));
});

Deno.test("danhSáchVậtThểBàiĐăng", () => {
  assert(
    danhSáchBàiĐăng.some((e) =>
      e["Tiêu đề"] === "AI là định dạng ảnh mờ của web"
    ),
  );
});

const bàiĐăng = {
  "Tiêu đề": "Cloudflare",
  "url": "https://lậptrình.quảcầu.cc/✍️Lập trình/Web/Quản trị mạng/Cloudflare",
  "Vault": "Tiếp thị số, xử lý dữ liệu và lập trình",
  "Dự án": {
    "Tên dự án": "Tiếp thị số, xử lý dữ liệu và lập trình",
    "Mã dự án": "C2",
  },
};
const nơiĐăng = {
  "Tên nơi đăng": "#tiếng-việt",
  "Tên cộng đồng": "Obsidian",
  "Loại nơi đăng": "Máy chủ",
  "Tên nền tảng": "Discord",
  "Loại nền tảng": "Chat",
};

Deno.test("tạo tham số UTM", () => {
  const thamSốUTMVàLiênKếtRútGọn = {
    source: "D Sv #tiếng-việt",
    medium: "chat",
    campaign: "C2 Tiếp thị số, xử lý dữ liệu và lập trình",
    content: undefined,
    term: undefined,
  };
  assertEquals(
    tạoThamSốUTMVàLiênKếtRútGọn({
      bàiĐăng,
      nơiĐăng,
      bốiCảnh: 3,
      lầnĐăng: cấuHìnhNơiĐăng,
    }),
    thamSốUTMVàLiênKếtRútGọn,
  );
});
