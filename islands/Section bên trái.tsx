import DivTìmBàiĐăngHoặcNơiĐăng from "./Tìm bài đăng hoặc nơi đăng/Div tìm bài đăng hoặc nơi đăng.tsx";
import { bốiCảnhSignal, cóRútGọn, element } from "./Signals tổng.ts";
import { bấmNútTạoLiênKết, NútTạoLiênKết } from "./Nút tạo liên kết.tsx";
import { tạoVậtThểTiếpThị } from "../Code chạy trên client/Hàm và kiểu cho vật thể tiếp thị.ts";

function KhungNhậpBốiCảnh() {
  return (
    <label class="input input-bordered flex items-center gap-2">
      Bối cảnh
      <input
        type="text"
        class="grow bg-base-100"
        id="khung-nhập-bối-cảnh"
        placeholder="VD: lý do khiến bài đăng trở nên hữu ích tại nơi đăng, v.v. (không bắt buộc)"
        onInput={(e) => bốiCảnhSignal.value = (e.target as HTMLInputElement).value}
        onFocus={() => element.value = "bối cảnh"}
        onKeyDown={async (e: KeyboardEvent) => {
          if (!bốiCảnhSignal.value && e.key === "Enter") {
            e.preventDefault();
            const vậtThểTiếpThị = tạoVậtThểTiếpThị();
            await bấmNútTạoLiênKết(vậtThểTiếpThị);
          }
        }}
      />
    </label>
  );
}
function ÔChọnRútGọnLink() {
  return (
    <div class="form-control basis-0">
      <label class="label cursor-pointer">
        <span class="label-text">Rút gọn liên kết</span>
        <input type="checkbox" checked={cóRútGọn.value} onChange={() => cóRútGọn.value = !cóRútGọn.value} class="checkbox checkbox-sm" />
      </label>
    </div>
  );
}
export default function SectionBênTrái() {
  return (
    <section id="section-bên-trái" class="basis-1/2 space-y-5 p-5 md:p-10">
      <DivTìmBàiĐăngHoặcNơiĐăng tênDanhSách="bài đăng" />
      <DivTìmBàiĐăngHoặcNơiĐăng tênDanhSách="nơi đăng" />
      <KhungNhậpBốiCảnh />
      <ÔChọnRútGọnLink />
      <NútTạoLiênKết />
    </section>
  );
}
