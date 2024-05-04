import { StateUpdater } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { NơiĐăng } from "../../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { CorsProxyRes } from "../../utils/Ki%E1%BB%83u%20cho%20web.ts";

export default function ModalNơiĐăng(
  corsProxyRes: CorsProxyRes | undefined,
  urlNhậpTrongModal: string,
  urlNhậpỞKhungNhậpNgoài: string,
  setUrl: StateUpdater<string>,
) {
  let nơiĐăng: NơiĐăng;
  if (corsProxyRes === undefined || corsProxyRes.lỗi) {
    nơiĐăng = new NơiĐăng();
  } else {
    nơiĐăng = corsProxyRes["Nếu là nơi đăng"];
  }
  const {
    "Tên nơi đăng": tênNơiĐăng,
    "Mô tả nơi đăng": môTảNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
  } = nơiĐăng;
  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">URL</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="URL"
          type="text"
          value={urlNhậpTrongModal || urlNhậpỞKhungNhậpNgoài}
          onInput={(e: InputEvent) => {
            const urlNhậpTrongModal = (e.target as HTMLTextAreaElement).value;
            setUrl(urlNhậpTrongModal);
          }}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Tên nơi đăng</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="tên"
          type="text"
          name="Tên nơi đăng"
          value={tênNơiĐăng}
          placeholder={JSON.stringify(tênNơiĐăng)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Mô tả nơi đăng</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="mô-tả"
          type="text"
          name="Mô tả nơi đăng"
          value={môTảNơiĐăng}
          placeholder={môTảNơiĐăng}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Loại nơi đăng</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="loại"
          type="text"
          name="Loại nơi đăng"
          value={loạiNơiĐăng}
          placeholder={JSON.stringify(loạiNơiĐăng)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Loại nền tảng</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="loại-nền-tảng"
          type="text"
          name="Loại nền tảng"
          value={loạiNềnTảng}
          placeholder={loạiNềnTảng}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Tên nền tảng</span>
        </div>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          id="tên-nền-tảng"
          type="text"
          name="Tên nền tảng"
          value={tênNềnTảng}
          placeholder={tênNềnTảng}
        />
      </label>
    </>
  );
}
