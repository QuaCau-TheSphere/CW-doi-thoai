import { StateUpdater } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { PhảnHồiTừCORSProxy } from "../../utils/Kiểu cho web.ts";
import { BàiĐăng } from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";

export default function ModalBàiĐăng(
  { phảnHồiTừCORSProxy, urlNhậpTrongModal, urlNhậpỞKhungNhậpNgoài, setUrl }: {
    phảnHồiTừCORSProxy: PhảnHồiTừCORSProxy | undefined;
    urlNhậpTrongModal: string;
    urlNhậpỞKhungNhậpNgoài: string;
    setUrl: StateUpdater<string>;
  },
) {
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
      {urlNhậpTrongModal}
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
          value={urlNhậpTrongModal || urlNhậpỞKhungNhậpNgoài}
          onInput={(e: InputEvent) => {
            const urlNhậpTrongModal = (e.target as HTMLTextAreaElement).value;
            setUrl(urlNhậpTrongModal);
          }}
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
