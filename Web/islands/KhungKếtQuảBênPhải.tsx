import tạoThamSốUTMVàLiênKếtRútGọn from "../../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import { KhungKếtQuảBênPhảiProps } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20web.ts";
import ThamSốUTMVàLiênKếtRútGọn, {
  ĐuôiRútGọn,
} from "../../Code hỗ trợ/Kiểu cho tham số UTM.ts";
import { useEffect, useState } from "preact/hooks";
import { VậtThểTiếpThị } from "../Code hỗ trợ/Kiểu cho web.ts";

async function ghiLênKV(đuôiRútGọn: ĐuôiRútGọn, vậtThểTiếpThị: VậtThểTiếpThị) {
  const TÊN_MIỀN_RÚT_GỌN = "http://localhost:8000";
  const urlToPost = new URL(`${TÊN_MIỀN_RÚT_GỌN}/kv`);
  urlToPost.searchParams.set("key", `Đuôi rút gọn,${đuôiRútGọn}`);
  console.log(JSON.stringify(urlToPost, null, 2));

  const postResponse = await fetch(urlToPost.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vậtThểTiếpThị),
  });
  return {
    urlToPost: urlToPost,
    postResponse: postResponse,
  };
}

export default function KhungKếtQuảBênPhải(
  { bàiĐăngĐượcChọn, nơiĐăngĐượcChọn, cấuHìnhNơiĐăng }: KhungKếtQuảBênPhảiProps,
) {
  const [urlToPost, setUrlToPost] = useState<URL | undefined>(undefined);

  const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
    bàiĐăngĐượcChọn,
    nơiĐăngĐượcChọn,
    3,
    cấuHìnhNơiĐăng,
  );
  const đuôiRútGọn = thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
  const liênKếtRútGọn = `${TÊN_MIỀN_RÚT_GỌN}/${đuôiRútGọn}`;
  const vậtThểTiếpThị: VậtThểTiếpThị = {
    ...{ "Bài đăng": bàiĐăngĐượcChọn, "Nơi đăng": nơiĐăngĐượcChọn },
    ...thamSốUTMVàLiênKếtRútGọn,
  };
  console.log("🚀 ~ vậtThểTiếpThị:", vậtThểTiếpThị);

  useEffect(() => {
    async function ghi() {
      const { urlToPost, postResponse } = await ghiLênKV(
        đuôiRútGọn,
        vậtThểTiếpThị,
      );
      setUrlToPost(urlToPost);
      console.log("🚀 ~ ghi ~ postResponse:", postResponse);
    }

    ghi()
      .catch(console.error);
  }, []);
  // navigator.clipboard.writeText(liênKếtRútGọn);

  console.log("🚀 ~ ghi ~ urlToPost:", urlToPost);
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
      {urlToPost?.href}
    </div>
  );
}
