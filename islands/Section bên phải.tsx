import { cóRútGọn, vậtThểTiếpThịSignal } from "./Signals tổng.ts";
import { VậtThểKhác } from "../components/Thông tin vật thể tiếp thị.tsx";
import KhungThôngTinKhiKhôngCóKếtQuả from "../components/Phần giới thiệu ở trang chủ khi chưa tạo kết quả.tsx";
import { ThamSốUTM } from "../Code chạy trên client/Tham số UTM và liên kết rút gọn/Kiểu cho tham số UTM.ts";
import { VậtThểTiếpThị } from "../Code chạy trên client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { xửLýPunycode } from "../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL.ts";

export default function SectionBênPhải({ textTrangChủ }: { textTrangChủ: string }) {
  return (
    <section id="section-bên-phải" class="basis-1/2 p-5 md:p-10">
      {vậtThểTiếpThịSignal.value ? <KhungThôngTinKhiCóKếtQuả /> : <KhungThôngTinKhiKhôngCóKếtQuả textTrangChủ={textTrangChủ} />}
    </section>
  );
}
function LiênKếtThốngKê({ đuôiRútGọn }: { đuôiRútGọn: string }) {
  const liênKếtRútGọnChart = `${origin}/${đuôiRútGọn}/chart`;
  if (cóRútGọn.value) {
    return (
      <>
        Truy cập <a id="liên-kết-thống-kê" href={liênKếtRútGọnChart}>{liênKếtRútGọnChart}</a> để xem thống kê lượt truy cập.
      </>
    );
  }
  return <></>;
}
function DetailThamSốUTM({ thamSốUTM }: { thamSốUTM: ThamSốUTM }) {
  if (cóRútGọn.value) {
    return (
      <details>
        <summary>Tham số UTM</summary>
        <VậtThểKhác loạiVậtThể="tham số UTM" vậtThể={thamSốUTM} />
      </details>
    );
  }
  return <VậtThểKhác loạiVậtThể="tham số UTM" vậtThể={thamSốUTM} cóTiêuĐề />;
}
function KếtQuảSaoChép({ vậtThểTiếpThị }: { vậtThểTiếpThị: VậtThểTiếpThị }) {
  const bàiĐăng = vậtThểTiếpThị["Bài đăng"];
  const đuôiRútGọn = vậtThểTiếpThị["Đuôi rút gọn"];
  const liênKếtUTM = xửLýPunycode(vậtThểTiếpThị["Liên kết UTM"].href);
  const liênKếtRútGọn = `${origin}/${đuôiRútGọn}`;

  const liênKếtĐượcDùng = cóRútGọn.value ? liênKếtRútGọn : liênKếtUTM;

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
  if (globalThis.location.hostname !== "localhost") {
    navigator.clipboard.writeText(nộiDungTạoSẵn);
  }
  return (
    <>
      <p id="nội-dung-tạo-sẵn">
        Nội dung được tạo sẵn:
        <pre>{nộiDungTạoSẵn}</pre>
      </p>
      <p>
        Nội dung trên đã được sao chép sẵn vào bộ nhớ. <LiênKếtThốngKê đuôiRútGọn={đuôiRútGọn} />
      </p>
    </>
  );
}

function KhungThôngTinKhiCóKếtQuả() {
  if (!vậtThểTiếpThịSignal.value) return <></>;

  return (
    <article id="khung-bên-phải-khi-có-kết-quả" class="prose">
      <KếtQuảSaoChép vậtThểTiếpThị={vậtThểTiếpThịSignal.value} />
      <DetailThamSốUTM thamSốUTM={vậtThểTiếpThịSignal.value["Tham số UTM"]} />
    </article>
  );
}
