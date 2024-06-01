import { Signal } from "@preact/signals";
import { MụcĐượcChọn, TênDanhSách, đổiKhungNhập } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import ModalBàiĐăng from "./Modal bài đăng.tsx";
import ModalNơiĐăng from "./Modal nơi đăng.tsx";
import { element } from "../Signals tổng.ts";
import { ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { NơiĐăngCóCácLựaChọnVịTríChưaCóId } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { BàiĐăngChưaCóId } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";

async function handleSubmit(
  formData: FormData,
  tênDanhSách: TênDanhSách,
  mụcĐượcChọnSignal: Signal<MụcĐượcChọn>,
) {
  const dữLiệuChưaCóId = JSON.parse(formData.get("Nâng cao") as string) as BàiĐăngChưaCóId | NơiĐăngCóCácLựaChọnVịTríChưaCóId;
  const data = await ghiBàiĐăngHoặcNơiĐăngTạoMớiLênKv(dữLiệuChưaCóId, tênDanhSách);
  console.log("Kết quả dữ liệu sau khi được ghi lên KV:", data);
  mụcĐượcChọnSignal.value = data.value;
  (document.getElementById("model-tạo-mới") as HTMLDialogElement).close();
  đổiKhungNhập("xuôi");
}

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

export default function ModalTạoMới({ tênDanhSách, mụcĐượcChọnSignal }: { tênDanhSách: TênDanhSách; mụcĐượcChọnSignal: Signal<MụcĐượcChọn> }) {
  if (tênDanhSách !== element.value) return <></>;
  return (
    <dialog id="model-tạo-mới" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Tạo {tênDanhSách} mới</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(new FormData(e.currentTarget), tênDanhSách, mụcĐượcChọnSignal);
          }}
        >
          <CácTrườngNhậpMới tênDanhSách={tênDanhSách} />
          <button class="btn btn-secondary gap-2" type="submit">
            Tạo <kbd class="kbd bg-secondary">Enter</kbd>
          </button>
        </form>
      </div>
    </dialog>
  );
}
