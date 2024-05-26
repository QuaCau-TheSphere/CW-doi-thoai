import { Signal } from "@preact/signals";
import { MụcĐượcChọn, TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { đổiKhungNhập } from "../../utils/Hàm cho khung nhập.ts";
import ModalBàiĐăng from "./Modal bài đăng.tsx";
import ModalNơiĐăng from "./Modal nơi đăng.tsx";
import { BàiĐăng, BàiĐăngChưaCóId, URLString } from "../../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { LoạiNềnTảng, ThôngTinNơiĐăngChưaCóId, TênNềnTảng } from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { element } from "../Signals tổng.ts";
import { ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv } from "../../utils/Hàm và kiểu cho API server.ts";

function CácTrườngNhậpMới({ tênDanhSách }: { tênDanhSách: TênDanhSách }) {
  switch (tênDanhSách) {
    case "bài đăng":
      return <ModalBàiĐăng />;
    case "nơi đăng":
      return <ModalNơiĐăng />;
    default:
      return <></>;
  }
}

/** Chuyển cấu trúc từ formData trên web sang BàiĐăng hoặc NơiĐăngChưaXácĐịnhVịTrí */
function tạoVậtThểDữLiệuMới(formData: Record<string, FormDataEntryValue>, tênDanhSách: TênDanhSách) {
  let dữLiệu: BàiĐăngChưaCóId | ThôngTinNơiĐăngChưaCóId;
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
      } satisfies BàiĐăngChưaCóId;
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
      };
      break;
    }
  }
  return {
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": dữLiệu,
  };
}

async function handleSubmit(event: any, tênDanhSách: TênDanhSách, mụcĐượcChọn: Signal<MụcĐượcChọn>) {
  event.preventDefault();
  // if (event.currentTarget === null) return
  const formData = Object.fromEntries(new FormData(event.currentTarget));
  const vậtThểDữLiệuMới = await tạoVậtThểDữLiệuMới(formData, tênDanhSách);
  const data = await ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv(vậtThểDữLiệuMới);
  console.log(data);
  mụcĐượcChọn.value = data.value;
  (document.getElementById("model-tạo-mới") as HTMLDialogElement).close();
  đổiKhungNhập("xuôi");
}

export default function ModalTạoMới({ tênDanhSách, mụcĐượcChọn }: { tênDanhSách: TênDanhSách; mụcĐượcChọn: Signal<MụcĐượcChọn> }) {
  if (tênDanhSách !== element.value) return <></>;
  return (
    <dialog id="model-tạo-mới" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Tạo {tênDanhSách} mới</h3>
        <form onSubmit={(e) => handleSubmit(e, tênDanhSách, mụcĐượcChọn)}>
          <CácTrườngNhậpMới tênDanhSách={tênDanhSách} />
          <button class="btn btn-secondary gap-2" type="submit">
            Tạo <kbd class="kbd bg-secondary">Enter</kbd>
          </button>
        </form>
      </div>
    </dialog>
  );
}
