import { useEffect, useState } from "preact/hooks";
import tạoThamSốUTMVàLiênKếtRútGọn from "../core/B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import {
  KhungKếtQuảBênPhảiProps,
  VậtThểTiếpThị,
} from "../utils/Kiểu cho web.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";

export default function KhungKếtQuảBênPhải(
  { bàiĐăngĐượcChọn, nơiĐăngĐượcChọn, cấuHìnhNơiĐăng }: KhungKếtQuảBênPhảiProps,
) {
  const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
    bàiĐăngĐượcChọn,
    nơiĐăngĐượcChọn,
    3,
    cấuHìnhNơiĐăng,
  );
  const đuôiRútGọn = thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
  const liênKếtRútGọn = `${TÊN_MIỀN_RÚT_GỌN}/${đuôiRútGọn}`;
  const thờiĐiểmTạo = new Date();
  const vậtThểTiếpThị: VậtThểTiếpThị = {
    ...{
      "Bài đăng": bàiĐăngĐượcChọn,
      "Nơi đăng": nơiĐăngĐượcChọn,
      "Thời điểm tạo": thờiĐiểmTạo,
    },
    ...thamSốUTMVàLiênKếtRútGọn,
  };
  console.table(vậtThểTiếpThị);

  useEffect(() => {
    async function ghiLênKV() {
      const res = await fetch(liênKếtRútGọn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vậtThểTiếpThị),
      });
      console.log("Response:", res);
    }
    ghiLênKV()
      .catch(console.error);
  }, []);
  navigator.clipboard.writeText(liênKếtRútGọn);

  return (
    <div id="khung-bên-phải-khi-có-kết-quả">
      <ul>
        {Object.entries(thamSốUTMVàLiênKếtRútGọn["Tham số UTM"]).map((
          i,
        ) => <li>{i[0]}: {i[1]}</li>)}
      </ul>
      <br />

      Liên kết rút gọn: <pre id="liên-kết-rút-gọn">{liênKếtRútGọn}</pre>
      <br />
      (✅Đã copy)<br />
    </div>
  );
}
