import { bàiĐăngĐượcChọn, vậtThểTiếpThịĐượcTạo } from "./Signals tổng.ts";
import KhungThôngTinKhiKhôngCóKếtQuả from "../components/KhungThôngTinKhiKhôngCóKếtQuả.tsx";
import KếtQuảĐượcChọn from "./Kết quả được chọn/Kết quả được chọn.tsx";

export default function SectionBênPhải({ text }: { text: string }) {
  const bàiĐăng = bàiĐăngĐượcChọn.value;
  const vậtThểTiếpThị = vậtThểTiếpThịĐượcTạo.value;
  if (!vậtThểTiếpThị) return <KhungThôngTinKhiKhôngCóKếtQuả text={text} />;

  const thamSốUTM = vậtThểTiếpThị?.["Tham số UTM"];
  const đuôiRútGọn = vậtThểTiếpThị?.["Đuôi rút gọn"];
  const liênKếtRútGọn = `${origin}/${đuôiRútGọn}`;
  const liênKếtRútGọnChart = `${origin}/${đuôiRútGọn}/chart`;

  if (globalThis.location.hostname !== "localhost") {
    navigator.clipboard.writeText(liênKếtRútGọn);
  }
  return (
    <section id="section-bên-phải" class="basis-1/2 p-10">
      <article id="khung-bên-phải-khi-có-kết-quả" class="prose">
        <KếtQuảSaoChép />
        Nội dung trên đã được sao chép sẵn vào bộ nhớ. Truy cập <a href={liênKếtRútGọnChart}>{liênKếtRútGọnChart}</a>
        {" "}
        để xem thống kê lượt truy cập.
        <details>
          <summary>Tham số UTM</summary>
          <KếtQuảĐượcChọn loạiVậtThể="tham số UTM" vậtThể={thamSốUTM} />
        </details>
      </article>
    </section>
  );

  function KếtQuảSaoChép() {
    if (!bàiĐăng) return <></>;
    const tiêuĐề = bàiĐăng["Tiêu đề"];
    if (!bàiĐăng["Nội dung bài đăng"]) {
      return (
        <p id="nội-dung-tạo-sẵn">
          Không tìm thấy nội dung hoặc mô tả ngắn ở bài đăng. Liên kết rút gọn: <pre>{liênKếtRútGọn}</pre>
        </p>
      );
    }
    let nộiDungTạoSẵn = liênKếtRútGọn;
    const {
      "Mô tả bài đăng": môTả,
      "Toàn bộ nội dung": nộiDung,
    } = bàiĐăng["Nội dung bài đăng"];

    if (tiêuĐề && môTả) {
      nộiDungTạoSẵn = `Theo như bài "${tiêuĐề}", thì ${môTả}. Link: ${liênKếtRútGọn}`;
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
