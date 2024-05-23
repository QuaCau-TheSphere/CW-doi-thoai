import { bàiĐăngĐượcChọn, cóRútGọn, vậtThểTiếpThịĐượcTạo } from "./Signals tổng.ts";
import KhungThôngTinKhiKhôngCóKếtQuả from "../components/KhungThôngTinKhiKhôngCóKếtQuả.tsx";
import { ThamSốUTM } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import { VậtThểTiếpThị } from "../utils/Kiểu cho web.ts";
import punycode from "npm:punycode";
import { VậtThểKhác } from "../components/Th%C3%B4ng%20tin%20v%E1%BA%ADt%20th%E1%BB%83%20ti%E1%BA%BFp%20th%E1%BB%8B.tsx";

export default function SectionBênPhải({ textTrangChủ }: { textTrangChủ: string }) {
  return (
    <section id="section-bên-phải" class="basis-1/2 p-5 md:p-10">
      {vậtThểTiếpThịĐượcTạo.value ? <KhungThôngTinKhiCóKếtQuả /> : <KhungThôngTinKhiKhôngCóKếtQuả textTrangChủ={textTrangChủ} />}
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
  const liênKếtUTM = punycode.toUnicode(decodeURI(vậtThểTiếpThị["Liên kết UTM"].href)).replace(" ", "%20");
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
  if (!vậtThểTiếpThịĐượcTạo.value) return <></>;

  return (
    <article id="khung-bên-phải-khi-có-kết-quả" class="prose">
      <KếtQuảSaoChép vậtThểTiếpThị={vậtThểTiếpThịĐượcTạo.value} />
      <DetailThamSốUTM thamSốUTM={vậtThểTiếpThịĐượcTạo.value["Tham số UTM"]} />
    </article>
  );
}
