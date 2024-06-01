import { Signal } from "@preact/signals";
import { MụcĐượcChọn, TênDanhSách, đổiKhungNhập } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import ModalBàiĐăng from "./Modal bài đăng.tsx";
import ModalNơiĐăng from "./Modal nơi đăng.tsx";
import { element } from "../Signals tổng.ts";
import { ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { tạoVậtThểDữLiệuMới } from "../../Code hỗ trợ cho client/Hàm cho modal tạo mới.ts";

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

async function handleSubmit(event: any, tênDanhSách: TênDanhSách, mụcĐượcChọn: Signal<MụcĐượcChọn>) {
  event.preventDefault();
  // if (event.currentTarget === null) return
  const vậtThểNgườiDùngNhậpTừForm = Object.fromEntries(new FormData(event.currentTarget));
  const vậtThểDữLiệuMới = await tạoVậtThểDữLiệuMới(vậtThểNgườiDùngNhậpTừForm, tênDanhSách);
  const data = await ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv(vậtThểDữLiệuMới);
  console.log("Kết quả dữ liệu sau khi được ghi lên KV:", data);
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
