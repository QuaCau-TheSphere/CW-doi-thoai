import { StateUpdater } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { PhảnHồiTừCORSProxy } from "../../utils/Ki%E1%BB%83u%20cho%20web.ts";
import {
  DanhSáchVịTríThànhPhần,
  NơiĐăngChưaXácĐịnhVịTrí,
  tạoVịTríString,
} from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { NơiĐăngĐãXácĐịnhVịTrí } from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";

export default function ModalNơiĐăng(
  phảnHồiTừCORSProxy: PhảnHồiTừCORSProxy | undefined,
  urlNhậpTrongModal: string,
  urlNhậpỞKhungNhậpNgoài: string,
  setUrl: StateUpdater<string>,
) {
  //@ts-ignore: bổ sung sau
  const nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí =
    phảnHồiTừCORSProxy?.["Nếu là nơi đăng"] || new NơiĐăngĐãXácĐịnhVịTrí();
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
  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">URL</span>
        </div>
        <input
          name="URL"
          className="input input-bordered input-primary w-full max-w-xs"
          type="url"
          required
          id="URL"
          value={url as string || urlNhậpTrongModal || urlNhậpỞKhungNhậpNgoài}
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
          name="Tên nơi đăng"
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          required
          id="tên"
          value={JSON.stringify(tênNơiĐăng)}
          placeholder={JSON.stringify(tênNơiĐăng)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Mô tả nơi đăng</span>
        </div>
        <input
          name="Mô tả nơi đăng"
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          id="mô-tả"
          value={môTảNơiĐăng}
          placeholder={môTảNơiĐăng}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Loại nơi đăng</span>
        </div>
        <input
          name="Loại nơi đăng"
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          id="loại"
          required
          value={JSON.stringify(loạiNơiĐăng)}
          placeholder={JSON.stringify(loạiNơiĐăng)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Loại nền tảng</span>
        </div>
        <input
          name="Loại nền tảng"
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          id="loại-nền-tảng"
          value={loạiNềnTảng}
          placeholder={loạiNềnTảng}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Tên nền tảng</span>
        </div>
        <input
          name="Tên nền tảng"
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
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

      {
        /* <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">Vị trí</span>
        </div>
        <select
          name="Vị trí"
          class=" select select-bordered w-full max-w-xs"
          id="vị-trí"
          required
        >
          <option value="dog">Bài đăng</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </label> */
      }
    </>
  );
}
