import tạoDanhSáchVậtThểBàiĐăngTrênVault from "./B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import tạoDanhSáchVậtThểBàiĐăngTrênWordPress from "./B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/b.%20L%E1%BA%A5y%20t%E1%BB%AB%20WordPress.ts";
import {
  THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT,
  ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV,
} from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";

const danhSáchVậtThểBàiĐăng =
  (await tạoDanhSáchVậtThểBàiĐăngTrênVault(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT))
    .concat(
      await tạoDanhSáchVậtThểBàiĐăngTrênWordPress(ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV),
    );
Deno.writeTextFileSync("Bài đăng.json", JSON.stringify(danhSáchVậtThểBàiĐăng));
