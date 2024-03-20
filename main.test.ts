import { assertEquals, assert } from "https://deno.land/std@0.219.0/assert/mod.ts";
import { Vault} from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u.ts";
import tạoDanhSáchVậtThểBàiĐăngTrênVault, { tạoDanhSáchThôngTinTấtCảCácVault } from "./A.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import { KếtQuảPhânLoại } from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20vi%E1%BB%87c%20x%E1%BB%AD%20l%C3%BD.ts";

const thưMụcChứaTấtCảCácVault = "D:\\QC supplements\\Vaults"

const danhSáchThôngTinTấtCảCácVaultDựKiến = [
  {
    "Tên vault": "Obsidian, quản lý dự án và công cụ nghĩ",
    "Mã vault": "C1",
    "Mô tả": "Hiểu biết sâu về các môi trường nơi sự suy nghĩ diễn ra, và cách ứng dụng chúng vào quản lý dự án", 
    URL: "https://obsidian.quảcầu.cc",
    "Nơi lưu": "D:\\QC supplements\\Vaults\\C Obsidian, quản lý dự án và công cụ nghĩ"
  },
  {
    "Tên vault": "Tiếp thị số, xử lý dữ liệu và lập trình",
    "Mã vault": "C2",
    "Mô tả": "Những thứ giúp xây dựng mental model khi phải code một cái gì đó",
    URL: "https://lậptrình.quảcầu.cc",
    "Nơi lưu": "D:\\QC supplements\\Vaults\\C Tiếp thị số, xử lý dữ liệu và lập trình"
  }
] satisfies Vault[] 

Deno.test("tạoDanhSáchThôngTinTấtCảCácVault", async () => {
  const danhSáchThôngTinTấtCảCácVaultThựcTế = await tạoDanhSáchThôngTinTấtCảCácVault(thưMụcChứaTấtCảCácVault);
  assertEquals(danhSáchThôngTinTấtCảCácVaultThựcTế, danhSáchThôngTinTấtCảCácVaultDựKiến);
});

Deno.test("tạoDanhSáchVậtThểBàiĐăng", async () => {
  const danhSáchVậtThểBàiĐăng = await tạoDanhSáchVậtThểBàiĐăngTrênVault(thưMụcChứaTấtCảCácVault)
  assert(danhSáchVậtThểBàiĐăng.some(e => (
    e.title === "AI là định dạng ảnh mờ của web" &&
    e.url === "https://obsidian.quảcầu.cc/⚡Hiểu biết sâu/Công nghệ thông tin/AI/AI là định dạng ảnh mờ của web" &&
    e["Dự án"] === "C1 Obsidian, quản lý dự án và công cụ nghĩ"
  ) ))
});

const vậtThểKếtQuảPhânLoại = {
  'Câu nhập': 'c31',
  'Bài viết': 'Trấn Kỳ — Phân loại câu nhập bằng tiếng Việt tự nhiên',
  'Loại bài viết': 'C Trấn Kỳ',
  'Nơi đăng': 'Vùng đất Quả Cầu',
  'Loại nơi đăng': 'Nhóm Facebook'
} satisfies KếtQuảPhânLoại