import { StateUpdater } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { BàiĐăng } from "../../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { PhảnHồiTừCORSProxy } from "../../utils/Ki%E1%BB%83u%20cho%20web.ts";

export default function ModalBàiĐăng(
  corsProxyRes: PhảnHồiTừCORSProxy | undefined,
  urlNhậpTrongModal: string,
  urlNhậpỞKhungNhậpNgoài: string,
  setUrl: StateUpdater<string>,
) {
  let bàiĐăng;
  if (corsProxyRes === undefined || corsProxyRes.lỗi) {
    bàiĐăng = new BàiĐăng();
  } else {
    bàiĐăng = corsProxyRes["Nếu là bài đăng"];
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
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">URL</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="URL"
          type="text"
          name="URL"
          value={urlNhậpTrongModal || urlNhậpỞKhungNhậpNgoài}
          onInput={(e: InputEvent) => {
            const urlNhậpTrongModal = (e.target as HTMLTextAreaElement).value;
            setUrl(urlNhậpTrongModal);
          }}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Tiêu đề</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="tiêu-đề"
          type="text"
          name="Tiêu đề"
          value={tiêuĐề}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Mô tả bài đăng</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="mô-tả"
          type="text"
          name="Mô tả bài đăng"
          value={nộiDungBàiĐăng?.["Mô tả bài đăng"]}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Tên dự án</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="tên-dự-án"
          type="text"
          name="Tên dự án"
          placeholder="Việc đăng bài này nằm trong dự án hoặc chiến dịch nào của bạn?"
          value={dựÁn?.["Tên dự án"]}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Website</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="website"
          type="text"
          name="Website"
          value={vault}
        />
      </label>
    </>
  );
}
