import DivTìmBàiĐăngHoặcNơiĐăng from "./Tìm bài đăng hoặc nơi đăng/Div tìm bài đăng hoặc nơi đăng.tsx";
import { bốiCảnh, cóRútGọn, element } from "./Signals tổng.ts";
import { NútTạoLiênKết } from "./Nút tạo liên kết.tsx";

function KhungNhậpBốiCảnh() {
  return (
    <label class="input input-bordered flex items-center gap-2">
      Bối cảnh
      <input
        type="text"
        class="grow"
        id="khung-nhập-bối-cảnh"
        placeholder="Lý do khiến bài đăng trở nên hữu ích tại nơi đăng (không bắt buộc)"
        onInput={(e) => bốiCảnh.value = (e.target as HTMLInputElement).value}
        onFocus={() => element.value = "bối cảnh"}
      />
    </label>
  );
}
function ÔChọnRútGọnLink() {
  console.log(cóRútGọn.value);
  return (
    <input type="checkbox" defaultChecked class="checkbox " />
    // <div class="form-control flex-shrink">
    //   <label class="label cursor-pointer">
    //     <span class="label-text">Rút gọn liên kết {cóRútGọn.value}</span>
    //   </label>
    // </div>
  );
}
export default function SectionBênTrái() {
  return (
    <section id="section-bên-trái" class="basis-1/2 p-10 space-y-5">
      <DivTìmBàiĐăngHoặcNơiĐăng tênDanhSách="bài đăng" />
      <DivTìmBàiĐăngHoặcNơiĐăng tênDanhSách="nơi đăng" />
      <KhungNhậpBốiCảnh />
      <ÔChọnRútGọnLink />
      <NútTạoLiênKết />
    </section>
  );
}
