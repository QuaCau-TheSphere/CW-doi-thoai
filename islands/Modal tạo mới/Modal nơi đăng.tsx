import { useState } from "preact/hooks";
import { useSignalEffect } from "@preact/signals";
import { Signal } from "https://esm.sh/v135/@preact/signals-core@1.5.1/dist/signals-core.js";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { PhảnHồiTừCORSProxy } from "../../utils/Kiểu cho web.ts";

export default function ModalNơiĐăng({ urlNhậpTrongModal }: { urlNhậpTrongModal: Signal<string> }) {
  const [phảnHồiTừCORSProxy, setPhảnHồiTừCORSProxy] = useState<PhảnHồiTừCORSProxy | undefined>(undefined);
  useSignalEffect(() => {
    async function lấyMetaTag() {
      console.log("🚀 ~ urlTrongeffect nơi đăng:", urlNhậpTrongModal.value);
      const corsProxyUrl = `${origin}/api/cors-proxy/${urlNhậpTrongModal.value}`;
      setPhảnHồiTừCORSProxy(await (await fetch(corsProxyUrl)).json() as PhảnHồiTừCORSProxy);
    }
    lấyMetaTag();
  });
  console.log("🚀 ~ ModalNơiĐăng ~ phảnHồiTừCORSProxy:", phảnHồiTừCORSProxy);
  const nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí | Record<string | number | symbol, never> =
    phảnHồiTừCORSProxy?.["Nếu là nơi đăng"] || {};
  const {
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Mô tả nơi đăng": môTảNơiĐăng,
    "Vị trí có thể đăng": vịTríCóThểĐăng,
    "Lĩnh vực": lĩnhVực,
    "Mã nơi đăng": mãNơiĐăng,
    URL: url,
  } = nơiĐăng;
  console.log("🚀 ~ ModalNơiĐăng ~ nơiĐăng:", nơiĐăng);
  return (
    <>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">URL</span>
        </div>
        <input
          name="URL"
          class="input input-bordered input-primary w-full max-w-xs"
          type="url"
          required
          id="URL"
          value={url as string || urlNhậpTrongModal}
          onInput={(e: InputEvent) => urlNhậpTrongModal.value = (e.target as HTMLTextAreaElement).value}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tên nơi đăng</span>
        </div>
        <input
          name="Tên nơi đăng"
          type="text"
          class="input input-bordered input-primary w-full max-w-xs"
          required
          id="tên"
          value={JSON.stringify(tênNơiĐăng)}
          placeholder={JSON.stringify(tênNơiĐăng)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Mô tả nơi đăng</span>
        </div>
        <input
          name="Mô tả nơi đăng"
          type="text"
          class="input input-bordered input-primary w-full max-w-xs"
          id="mô-tả"
          value={môTảNơiĐăng}
          placeholder={môTảNơiĐăng}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Loại nơi đăng</span>
        </div>
        <input
          name="Loại nơi đăng"
          type="text"
          class="input input-bordered input-primary w-full max-w-xs"
          id="loại"
          required
          value={JSON.stringify(loạiNơiĐăng)}
          placeholder={JSON.stringify(loạiNơiĐăng)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Loại nền tảng</span>
        </div>
        <input
          name="Loại nền tảng"
          type="text"
          class="input input-bordered input-primary w-full max-w-xs"
          id="loại-nền-tảng"
          value={loạiNềnTảng}
          placeholder={loạiNềnTảng}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tên nền tảng</span>
        </div>
        <input
          name="Tên nền tảng"
          type="text"
          class="input input-bordered input-primary w-full max-w-xs"
          id="tên-nền-tảng"
          value={tênNềnTảng}
          placeholder={tênNềnTảng}
        />
      </label>
      <input
        name="Vị trí có thể đăng"
        type="hidden"
        value={JSON.stringify(vịTríCóThểĐăng)}
      />
    </>
  );
}
