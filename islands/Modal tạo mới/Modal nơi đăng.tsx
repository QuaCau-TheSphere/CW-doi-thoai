import { useEffect, useState } from "preact/hooks";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { queryNơiĐăng } from "../Tìm bài đăng hoặc nơi đăng/Signal tìm bài đăng hoặc nơi đăng.ts";
import { PhảnHồiTừCORSProxy } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";

export default function ModalNơiĐăng() {
  const [phảnHồiTừCORSProxy, setPhảnHồiTừCORSProxy] = useState<PhảnHồiTừCORSProxy | undefined>(undefined);
  const [urlNhậpVào, setUrlNhậpVào] = useState<string | undefined>(undefined);
  setUrlNhậpVào(queryNơiĐăng.value);
  useEffect(() => {
    async function lấyMetaTag() {
      const corsProxyUrl = `${origin}/api/cors-proxy/${urlNhậpVào}`;
      setPhảnHồiTừCORSProxy(await (await fetch(corsProxyUrl)).json() as PhảnHồiTừCORSProxy);
    }
    lấyMetaTag();
  }, [urlNhậpVào]);
  console.log("Kết quả lấy dữ liệu từ URL được nhập vào nơi đăng:", phảnHồiTừCORSProxy);
  const nơiĐăng: NơiĐăngCóCácLựaChọnVịTrí | Record<string | number | symbol, never> = phảnHồiTừCORSProxy?.["Nếu là nơi đăng"] || {};
  const {
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Tên nơi đăng": tênNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Mô tả nơi đăng": môTảNơiĐăng,
    "Vị trí có thể đăng": vịTríCóThểĐăng,
    "Lĩnh vực": lĩnhVực,
    "Đơn vị quản lý": đơnVịQuảnLý,
    "Mã nơi đăng": mãNơiĐăng,
    URL: urlChínhTắc,
  } = nơiĐăng;
  return (
    <>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">URL</span>
        </div>
        <input
          name="URL"
          class="input input-bordered w-full max-w-xs"
          type="url"
          required
          id="URL"
          value={urlChínhTắc as string || urlNhậpVào}
          onInput={(e: InputEvent) => setUrlNhậpVào((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tên nơi đăng</span>
        </div>
        <input
          name="Tên nơi đăng"
          type="text"
          class="input input-bordered w-full max-w-xs"
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
          class="input input-bordered w-full max-w-xs"
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
          class="input input-bordered w-full max-w-xs"
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
          class="input input-bordered w-full max-w-xs"
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
          class="input input-bordered w-full max-w-xs"
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
