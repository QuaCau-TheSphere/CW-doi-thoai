import { useEffect, useState } from "preact/hooks";
import tạoThamSốUTMVàLiênKếtRútGọn from "../core/B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import {
  KhungKếtQuảBênPhảiProps,
  VậtThểTiếpThị,
} from "../utils/Kiểu cho web.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";

export default function KhungKếtQuảBênPhải(
  {
    bàiĐăngĐượcChọn,
    nơiĐăngĐượcChọn,
    bốiCảnh,
    cấuHìnhNơiĐăng,
    lầnBấmEnter,
  }: KhungKếtQuảBênPhảiProps,
) {
  const [thamSốUTMVàLiênKếtRútGọn, setThamSốUTMVàLiênKếtRútGọn] = useState<
    ThamSốUTMVàLiênKếtRútGọn | undefined
  >(undefined);
  useEffect(() => {
    const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
      {
        bàiĐăng: bàiĐăngĐượcChọn,
        nơiĐăng: nơiĐăngĐượcChọn,
        bốiCảnh: bốiCảnh,
        lầnĐăng: 1,
        cấuHìnhNơiĐăng: cấuHìnhNơiĐăng,
      },
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
    if (!window.location.href.includes("http://localhost")) {
      navigator.clipboard.writeText(liênKếtRútGọn);
    }
    setThamSốUTMVàLiênKếtRútGọn(thamSốUTMVàLiênKếtRútGọn);
    console.log(
      "🚀 ~ useEffect ~ thamSốUTMVàLiênKếtRútGọn:",
      thamSốUTMVàLiênKếtRútGọn,
    );
  }, [lầnBấmEnter]);

  if (thamSốUTMVàLiênKếtRútGọn === undefined) return <></>;
  const thamSốUTM = thamSốUTMVàLiênKếtRútGọn["Tham số UTM"];
  const liênKếtRútGọn = `${TÊN_MIỀN_RÚT_GỌN}/${
    thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"]
  }`;

  return (
    <div id="khung-bên-phải-khi-có-kết-quả" class="prose">
      <ul>
        {Object.entries(thamSốUTM).map((
          i,
        ) => (
          <li>
            <span class="font-bold">{i[0]}</span>: {i[1]}
          </li>
        ))}
      </ul>
      <br />

      Liên kết rút gọn (đã được sao chép ✅):{" "}
      <pre id="liên-kết-rút-gọn">{liênKếtRútGọn}</pre>
    </div>
  );
}
