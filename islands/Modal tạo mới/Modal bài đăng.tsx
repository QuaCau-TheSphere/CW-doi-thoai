import { useEffect, useState } from "preact/hooks";
import { BàiĐăng } from "../../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { queryBàiĐăng } from "../Tìm bài đăng hoặc nơi đăng/Signal tìm bài đăng hoặc nơi đăng.ts";
import { PhảnHồiTừCORSProxy } from "../../utils/Hàm và kiểu cho API server.ts";

export default function ModalBàiĐăng() {
  const [phảnHồiTừCORSProxy, setPhảnHồiTừCORSProxy] = useState<PhảnHồiTừCORSProxy | undefined>(undefined);
  const [urlNhậpVào, setUrlNhậpVào] = useState(queryBàiĐăng.value);
  useEffect(() => {
    async function lấyMetaTag() {
      const corsProxyUrl = `${origin}/api/cors-proxy/${urlNhậpVào}`;
      setPhảnHồiTừCORSProxy(await (await fetch(corsProxyUrl)).json() as PhảnHồiTừCORSProxy);
    }
    lấyMetaTag();
  }, [urlNhậpVào]);
  let bàiĐăng;
  console.log("🚀 ~ ModalBàiĐăng ~ phảnHồiTừCORSProxy:", phảnHồiTừCORSProxy);
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
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">URL</span>
        </div>
        <input
          class="input input-bordered w-full max-w-xs"
          id="URL"
          type="url"
          name="URL"
          required
          value={urlNhậpVào}
          onInput={(e: InputEvent) => setUrlNhậpVào((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tiêu đề</span>
        </div>
        <input
          class="input input-bordered w-full max-w-xs"
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
          class="input input-bordered w-full max-w-xs"
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
          class="input input-bordered w-full max-w-xs"
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
          class="input input-bordered w-full max-w-xs"
          id="website"
          type="text"
          name="Website"
          value={vault}
        />
      </label>
    </>
  );
}
