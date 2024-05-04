import tạoDanhSáchBàiĐăngTrênVault from "./a. Tạo theo vault.ts";
import tạoDanhSáchBàiĐăngTrênWordPress from "./b. Lấy từ WordPress.ts";
import {
  THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT,
  ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV,
} from "../../Code hỗ trợ/Hằng.ts";

// deno-fmt-ignore
const danhSáchBàiĐăng = (await tạoDanhSáchBàiĐăngTrênVault(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT)).concat(
  await tạoDanhSáchBàiĐăngTrênWordPress(ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV));
Deno.writeTextFileSync(
  "core/A. Cấu hình/Danh sách tất cả bài đăng.json",
  JSON.stringify(danhSáchBàiĐăng),
);
console.log("done");
