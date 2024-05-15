import { useState } from "preact/hooks";
import { PhảnHồiTừCORSProxy } from "../../utils/Kiểu cho web.ts";
import { BàiĐăng } from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { Signal } from "https://esm.sh/v135/@preact/signals-core@1.5.1/dist/signals-core.js";
import { useSignalEffect } from "@preact/signals";

export default function ModalBàiĐăng({ url }: { url: Signal<string> }) {
  const [phảnHồiTừCORSProxy, setPhảnHồiTừCORSProxy] = useState<PhảnHồiTừCORSProxy | undefined>(undefined);
  useSignalEffect(() => {
    async function lấyMetaTag() {
      console.log("🚀 ~ urlTrongeffect:", url.value);
      const corsProxyUrl = `${origin}/api/cors-proxy/${url.value}`;
      setPhảnHồiTừCORSProxy(await (await fetch(corsProxyUrl)).json() as PhảnHồiTừCORSProxy);
    }
    lấyMetaTag();
  });
  let bàiĐăng;
  if (phảnHồiTừCORSProxy === undefined || phảnHồiTừCORSProxy.lỗi) {
    bàiĐăng = new BàiĐăng();
  } else {
    bàiĐăng = phảnHồiTừCORSProxy["Nếu là bài đăng"];
  }
  const {
    "Tiêu đề": tiêuĐề,
    "Dự án": dựÁn,
    Vault: vault,
    "Nội dung bài đăng": nộiDungBàiĐăng,
  } = bàiĐăng;
  return (
    <>
      {url}
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">URL</span>
        </div>
        <input
          class="input input-bordered input-primary w-full max-w-xs"
          id="URL"
          type="url"
          name="URL"
          required
          value={url}
          onInput={(e: InputEvent) => url.value = (e.target as HTMLTextAreaElement).value}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tiêu đề</span>
        </div>
        <input
          class="input input-bordered input-primary w-full max-w-xs"
          id="tiêu-đề"
          type="text"
          required
          name="Tiêu đề"
          value={tiêuĐề}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Mô tả bài đăng</span>
        </div>
        <input
          class="input input-bordered input-primary w-full max-w-xs"
          id="mô-tả"
          type="text"
          name="Mô tả bài đăng"
          value={nộiDungBàiĐăng?.["Mô tả bài đăng"]}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tên dự án</span>
        </div>
        <input
          class="input input-bordered input-primary w-full max-w-xs"
          id="tên-dự-án"
          type="text"
          name="Tên dự án"
          placeholder="Dự án hoặc chiến dịch của việc đăng bài này"
          value={dựÁn?.["Tên dự án"]}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Website</span>
        </div>
        <input
          class="input input-bordered input-primary w-full max-w-xs"
          id="website"
          type="text"
          name="Website"
          value={vault}
        />
      </label>
    </>
  );
}
