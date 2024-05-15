import { Signal, useSignal } from "@preact/signals";
import { MụcĐượcChọn, TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { isUrl, đổiKhungNhập } from "../../utils/Hàm cho khung nhập.ts";
import ModalBàiĐăng from "./Modal bài đăng.tsx";
import ModalNơiĐăng from "./Modal nơi đăng.tsx";
import { BàiĐăng, URLString } from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { LoạiNềnTảng, TênNềnTảng } from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { element } from "../Signals tổng.ts";
import { queryBàiĐăng, queryNơiĐăng } from "../Tìm bài đăng hoặc nơi đăng/Signal tìm bài đăng hoặc nơi đăng.ts";

function CácTrườngNhậpMới({ tênDanhSách }: { tênDanhSách: TênDanhSách }) {
  let query;
  switch (tênDanhSách) {
    case "bài đăng":
      query = queryBàiĐăng;
      break;
    case "nơi đăng":
      query = queryNơiĐăng;
      break;
  }
  if (!isUrl(query.value)) return <></>;
  const url = useSignal<string | undefined>(undefined);
  url.value = query.value;
  console.log("🚀 ~ urlNhậpTrongModal1:", url.value);

  switch (tênDanhSách) {
    case "bài đăng":
      return <ModalBàiĐăng url={url} />;
    case "nơi đăng":
      return <ModalNơiĐăng urlNhậpTrongModal={url} />;
    default:
      return <></>;
  }
}

function tạoVậtThểDữLiệuMới(eventcurrentTarget: any, tênDanhSách: TênDanhSách) {
  const formData = Object.fromEntries(new FormData(eventcurrentTarget));

  let dữLiệu: BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí;
  switch (tênDanhSách) {
    case "bài đăng": {
      const {
        URL: url,
        "Tiêu đề": tiêuĐề,
        "Mô tả bài đăng": môTảBàiĐăng,
        "Tên dự án": dựÁn,
        Website: vault,
      } = formData as Record<string, string>;
      dữLiệu = {
        URL: url,
        "Tiêu đề": tiêuĐề,
        "Dự án": {
          "Mã dự án": undefined,
          "Tên dự án": dựÁn,
        },
        "Mã bài đăng": undefined,
        "Nội dung bài đăng": {
          "Mô tả bài đăng": môTảBàiĐăng,
          "Toàn bộ nội dung": undefined,
          "Định dạng nội dung": undefined,
        },
        Vault: vault,
      } satisfies BàiĐăng;
      break;
    }
    case "nơi đăng": {
      const {
        URL: url,
        "Tên nơi đăng": tênNơiĐăng,
        "Loại nơi đăng": loạiNơiĐăng,
        "Tên nền tảng": tênNềnTảng,
        "Mô tả nơi đăng": môTảNơiĐăng,
        "Loại nền tảng": loạiNềnTảng,
        "Vị trí có thể đăng": vịTríCóThểĐăng,
      } = formData as Record<string, string>;
      dữLiệu = {
        URL: url as URLString,
        "Tên nơi đăng": JSON.parse(tênNơiĐăng),
        "Loại nơi đăng": JSON.parse(loạiNơiĐăng),
        "Tên nền tảng": tênNềnTảng as TênNềnTảng,
        "Mô tả nơi đăng": môTảNơiĐăng,
        "Loại nền tảng": loạiNềnTảng as LoạiNềnTảng,
        "Vị trí có thể đăng": JSON.parse(vịTríCóThểĐăng),
      } satisfies NơiĐăngChưaXácĐịnhVịTrí;
      break;
    }
  }
  return {
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": dữLiệu,
  };
}

function handleSubmit(event: FormDataEvent, tênDanhSách: TênDanhSách, mụcĐượcChọn: Signal<MụcĐượcChọn>) {
  event.preventDefault();
  const vậtThểDữLiệuMới = tạoVậtThểDữLiệuMới(event.currentTarget, tênDanhSách);
  const url = `${origin}/api/newData`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vậtThểDữLiệuMới),
  }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      mụcĐượcChọn.value = data.value;
    })
    .catch(console.error);
  (document.getElementById("model-tạo-mới") as HTMLDialogElement).close();
  đổiKhungNhập("xuôi");
}

export default function ModalTạoMới(
  { tênDanhSách, mụcĐượcChọn }: { tênDanhSách: TênDanhSách; mụcĐượcChọn: Signal<MụcĐượcChọn> },
) {
  if (tênDanhSách !== element.value) return <></>;
  return (
    <dialog id="model-tạo-mới" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Tạo {tênDanhSách} mới</h3>
        <form onSubmit={(e: FormDataEvent) => handleSubmit(e, tênDanhSách, mụcĐượcChọn)}>
          <CácTrườngNhậpMới tênDanhSách={tênDanhSách} />
          <button class="btn btn-secondary gap-2" type="submit">
            Tạo <kbd class="kbd bg-secondary">Enter</kbd>
          </button>
        </form>
      </div>
    </dialog>
  );
}
