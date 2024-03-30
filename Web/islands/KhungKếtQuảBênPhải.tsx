import tạoThamSốUTMVàLiênKếtRútGọn, {
  tạoSource,
} from "../../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import { KhungKếtQuảBênPhảiProps } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20web.ts";

export default function KhungKếtQuảBênPhải(
  { kếtQuả, cấuHìnhNơiĐăng }: KhungKếtQuảBênPhảiProps,
) {
  console.log("🚀 ~ kếtQuả:", kếtQuả);
  if (kếtQuả?.bàiĐăng && kếtQuả?.nơiĐăng) {
    console.log("🚀 ~ kếtQuảsfd:");
    const tênNềnTảng = kếtQuả.nơiĐăng["Tên nền tảng"];
    const loạiNơiĐăng = kếtQuả.nơiĐăng["Loại nơi đăng"];
    const tênNơiĐăng = kếtQuả.nơiĐăng["Tên nơi đăng"];
    const loạiNềnTảng = kếtQuả.nơiĐăng["Loại nền tảng"];

    const url = kếtQuả.bàiĐăng.url;
    const dựÁn = kếtQuả.bàiĐăng["Dự án"];
    const mãDựÁn = kếtQuả.bàiĐăng["Dự án"]["Mã dự án"];
    const thamSốUTM: ThamSốUTM = {
      source: tạoSource(
        loạiNềnTảng,
        tênNềnTảng,
        loạiNơiĐăng,
        tênNơiĐăng,
        cấuHìnhNơiĐăng,
      ),
      //   medium: tạoMedium(loạiNơiĐăng, loạiNềnTảng),
      //   campaign: tạoCampaign(dựÁn),
      //   content: tạoContent(nơiĐăng, bàiĐăng),
      //   term: tạoTerm(nơiĐăng, bàiĐăng),
    };
    // return JSON.stringify(thamSốUTM);
  }
  // const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
  //   kếtQuả.bàiĐăng,
  //   kếtQuả.nơiĐăng,
  //   3,
  //   cấuHìnhNơiĐăng,
  // );
  // const liênKếtRútGọn = TÊN_MIỀN_RÚT_GỌN + "/" +
  //   "xcfsdf";
  // thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
  // console.log("🚀 ~ thamSốUTMVàLiênKếtRútGọn:", thamSốUTMVàLiênKếtRútGọn);
  // return liênKếtRútGọn;
  //   } else return;
}
