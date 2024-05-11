import { useEffect, useState } from "preact/hooks";
import tạoThamSốUTMVàLiênKếtRútGọn from "../core/B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import { VậtThểTiếpThị } from "../utils/Kiểu cho web.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import CấuHìnhNơiĐăng from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { bàiĐăngĐượcChọn, nơiĐăngĐãXácĐịnhVịTríĐượcChọn } from "./Signals.ts";
import KhungThôngTinKhiKhôngCóKếtQuả from "../components/KhungThôngTinKhiKhôngCóKếtQuả.tsx";
import { bốiCảnh } from "./Signals.ts";
import { lầnTạoLiênKết } from "./Signals.ts";

export default function SectionBênPhải(
  { cấuHìnhNơiĐăng }: { cấuHìnhNơiĐăng: CấuHìnhNơiĐăng },
) {
  const [thamSốUTMVàLiênKếtRútGọn, setThamSốUTMVàLiênKếtRútGọn] = useState<
    ThamSốUTMVàLiênKếtRútGọn | undefined
  >(undefined);
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const nơiĐăng = nơiĐăngĐãXácĐịnhVịTríĐượcChọn.value;
  if (!bàiĐăng || !nơiĐăng || lầnTạoLiênKết.value === 0) {
    console.log("🚀 ~ lầnTạoLiênKết.value:", lầnTạoLiênKết.value);
    console.log("🚀 ~ nơiĐăng:", nơiĐăng);
    console.log("🚀 ~ bàiĐăng:", bàiĐăng);
    return <KhungThôngTinKhiKhôngCóKếtQuả />;
  }
  console.info("Bài đăng được chọn:", bàiĐăng);
  console.info("Nơi đăng được chọn:", nơiĐăng);

  useEffect(() => {
    const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(
      {
        bàiĐăng: bàiĐăng,
        nơiĐăng: nơiĐăng,
        bốiCảnh: bốiCảnh.value,
        lầnĐăng: 1,
        cấuHìnhNơiĐăng: cấuHìnhNơiĐăng,
      },
    );
    const đuôiRútGọn = thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
    const origin = globalThis.location.origin;
    const liênKếtRútGọn = `${origin}/${đuôiRútGọn}`;
    const thờiĐiểmTạo = new Date();
    const vậtThểTiếpThị: VậtThểTiếpThị = {
      ...{
        "Bài đăng": bàiĐăng,
        "Nơi đăng": nơiĐăng,
        "Thời điểm tạo": thờiĐiểmTạo,
        "Các lần truy cập": {},
      },
      ...thamSốUTMVàLiênKếtRútGọn,
    };

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
    ghiLênKV().catch(console.error);
    if (globalThis.location.hostname !== "localhost") {
      navigator.clipboard.writeText(liênKếtRútGọn);
    }
    setThamSốUTMVàLiênKếtRútGọn(thamSốUTMVàLiênKếtRútGọn);
    console.info("Tham số UTM và liên kết rút gọn:", thamSốUTMVàLiênKếtRútGọn);
    lầnTạoLiênKết.value = 0;
  }, [lầnTạoLiênKết.value]);

  if (thamSốUTMVàLiênKếtRútGọn === undefined) return <></>;
  const originWeb = globalThis.location.origin;
  const đuôiRútGọn = thamSốUTMVàLiênKếtRútGọn["Đuôi rút gọn"];
  const liênKếtRútGọn = `${originWeb}/${đuôiRútGọn}`;
  const liênKếtRútGọnChart = `${originWeb}/${đuôiRútGọn}/chart`;

  const thamSốUTM = thamSốUTMVàLiênKếtRútGọn["Tham số UTM"];
  return (
    <article id="khung-bên-phải-khi-có-kết-quả" class="prose">
      {tạoKếtQuảSaoChép()}
      Nội dung trên đã được sao chép sẵn vào bộ nhớ. Truy cập{" "}
      <a href={liênKếtRútGọnChart}>{liênKếtRútGọnChart}</a>{" "}
      để xem thống kê lượt truy cập.
      <details>
        <summary>Tham số UTM</summary>
        <KếtQuảĐượcChọn vậtThể={thamSốUTM} />
      </details>
    </article>
  );

  function tạoKếtQuảSaoChép() {
    console.log(bàiĐăng);
    if (!bàiĐăng) return <></>;
    const tiêuĐề = bàiĐăng["Tiêu đề"];
    if (!bàiĐăng["Nội dung bài đăng"]) {
      return (
        <p id="nội-dung-tạo-sẵn">
          Không tìm thấy nội dung hoặc mô tả ngắn ở bài đăng. Liên kết rút gọn:
          {" "}
          <pre>{liênKếtRútGọn}</pre>
        </p>
      );
    }
    let nộiDungTạoSẵn = liênKếtRútGọn;
    const {
      "Mô tả bài đăng": môTả,
      "Toàn bộ nội dung": nộiDung,
    } = bàiĐăng["Nội dung bài đăng"];

    if (tiêuĐề && môTả) {
      nộiDungTạoSẵn =
        `Theo như bài "${tiêuĐề}", thì ${môTả}. Link: ${liênKếtRútGọn}`;
    } else if (tiêuĐề && nộiDung) {
      nộiDungTạoSẵn = `Về vấn đề này thì mình nghĩ ${tiêuĐề}. ${nộiDung}
Nếu sau này mình nghĩ ra được thêm điều gì mới thì sẽ cập nhật ghi chú tại ${liênKếtRútGọn}`;
    } else {
      nộiDungTạoSẵn = `${tiêuĐề}: ${liênKếtRútGọn}`;
    }
    return (
      <p id="nội-dung-tạo-sẵn">
        Nội dung được tạo sẵn:
        <pre>{nộiDungTạoSẵn}</pre>
      </p>
    );
  }
}
