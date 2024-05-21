import { bàiĐăngĐượcChọn, cóRútGọn, vậtThểTiếpThịĐượcTạo } from "./Signals tổng.ts";
import KhungThôngTinKhiKhôngCóKếtQuả from "../components/KhungThôngTinKhiKhôngCóKếtQuả.tsx";
import KếtQuảĐượcChọn from "./Kết quả được chọn/Kết quả được chọn.tsx";

export default function SectionBênPhải({ text }: { text: string }) {
  return (
    <section id="section-bên-phải" class="basis-1/2 p-10">
      {vậtThểTiếpThịĐượcTạo.value ? <KhungThôngTinKhiCóKếtQuả /> : <KhungThôngTinKhiKhôngCóKếtQuả text={text} />}
    </section>
  );
}

function KhungThôngTinKhiCóKếtQuả() {
  if (!vậtThểTiếpThịĐượcTạo.value) return <></>;
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const vậtThểTiếpThị = vậtThểTiếpThịĐượcTạo.value;

  const thamSốUTM = vậtThểTiếpThị["Tham số UTM"];
  const đuôiRútGọn = vậtThểTiếpThị["Đuôi rút gọn"];

  const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"].href;
  const liênKếtRútGọn = `${origin}/${đuôiRútGọn}`;
  const liênKếtRútGọnChart = `${origin}/${đuôiRútGọn}/chart`;

  const liênKếtĐượcDùng = cóRútGọn.value ? liênKếtRútGọn : liênKếtUTM;

  if (globalThis.location.hostname !== "localhost") {
    navigator.clipboard.writeText(liênKếtĐượcDùng);
  }
  return (
    <article id="khung-bên-phải-khi-có-kết-quả" class="prose">
      <KếtQuảSaoChép />
      Nội dung trên đã được sao chép sẵn vào bộ nhớ. {cóRútGọn.value
        ? (
          <>
            Truy cập <a href={liênKếtRútGọnChart}>{liênKếtRútGọnChart}</a> để xem thống kê lượt truy cập.
          </>
        )
        : <></>}
      <details>
        <summary>Tham số UTM</summary>
        <KếtQuảĐượcChọn loạiVậtThể="tham số UTM" vậtThể={thamSốUTM} />
      </details>
    </article>
  );

  function KếtQuảSaoChép() {
    if (!bàiĐăng) return <></>;
    const tiêuĐề = bàiĐăng["Tiêu đề"];
    if (!bàiĐăng["Nội dung bài đăng"]) {
      return (
        <p id="nội-dung-tạo-sẵn">
          Không tìm thấy nội dung hoặc mô tả ngắn ở bài đăng. Liên kết {cóRútGọn.value ? "rút gọn" : "UTM"}: <pre>{liênKếtĐượcDùng}</pre>
        </p>
      );
    }
    let nộiDungTạoSẵn = liênKếtĐượcDùng;
    const {
      "Mô tả bài đăng": môTả,
      "Toàn bộ nội dung": nộiDung,
    } = bàiĐăng["Nội dung bài đăng"];

    if (tiêuĐề && môTả) {
      nộiDungTạoSẵn = `Theo như bài "${tiêuĐề}", thì ${môTả}. Link: ${liênKếtĐượcDùng}`;
    } else if (tiêuĐề && nộiDung) {
      nộiDungTạoSẵn = `Về vấn đề này thì mình nghĩ ${tiêuĐề}. ${nộiDung}
Nếu sau này mình nghĩ ra được thêm điều gì mới thì sẽ cập nhật ghi chú tại ${liênKếtĐượcDùng}`;
    } else {
      nộiDungTạoSẵn = `${tiêuĐề}: ${liênKếtĐượcDùng}`;
    }
    return (
      <p id="nội-dung-tạo-sẵn">
        Nội dung được tạo sẵn:
        <pre>{nộiDungTạoSẵn}</pre>
      </p>
    );
  }
}
