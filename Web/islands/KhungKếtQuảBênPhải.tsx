import tạoThamSốUTMVàLiênKếtRútGọn from "../../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import { KhungKếtQuảBênPhảiProps } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20web.ts";

export default function KhungKếtQuảBênPhải(
  { kếtQuả, cấuHìnhNơiĐăng }: KhungKếtQuảBênPhảiProps,
) {
  if (kếtQuả && kếtQuả.bàiĐăng && kếtQuả.nơiĐăng) {
    const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
      kếtQuả.bàiĐăng,
      kếtQuả.nơiĐăng,
      3,
      cấuHìnhNơiĐăng,
    );
    return thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
  }
}
