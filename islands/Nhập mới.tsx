import { useEffect, useState } from "preact/hooks";
import {
  CorsProxyRes,
  DanhSáchĐangActive,
} from "../utils/Ki%E1%BB%83u%20cho%20web.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code hỗ trợ/Hằng.ts";
import { kebabCase, viếtHoa } from "../utils/Hàm.ts";
import { TênDanhSách } from "../utils/Kiểu cho web.ts";

function handleSubmit(event: FormDataEvent, tênDanhSách: TênDanhSách) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const dữLiệuMới = Object.fromEntries(formData);
  console.log("🚀 ~ handleSubmit ~ dữLiệuMới:", dữLiệuMới);
  useEffect(() => {
    async function ghiLênKV() {
      const url = `${TÊN_MIỀN_RÚT_GỌN}/${kebabCase(tênDanhSách)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dữLiệuMới),
      });
      console.log("Response:", res);
    }
    ghiLênKV()
      .catch(console.error);
  }, [formData]);
}

function CácTrườngNhậpMới(
  { tênDanhSách, url }: { tênDanhSách: TênDanhSách; url: string },
) {
  const [corsProxyRes, setCorsProxyRes] = useState<CorsProxyRes | undefined>(
    undefined,
  );
  useEffect(() => {
    async function a() {
      const corsProxyRes = (await (await fetch(url)).json()) as CorsProxyRes;
      setCorsProxyRes(corsProxyRes);
    }
    a();
    //todo
  }, []);
  if (corsProxyRes === undefined || corsProxyRes.lỗi) return <></>;

  if (tênDanhSách === "bài đăng") {
    const {
      "Tiêu đề": tiêuĐề,
      "Mô tả bài đăng": môTảBàiĐăng,
      "Dự án": dựÁn,
      Vault: vault,
      url,
    } = corsProxyRes["Nếu là bài đăng"];
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
            name="URL"
            value={url as string}
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
            value={môTảBàiĐăng}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Dự án</span>
          </div>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            id="dự-án"
            type="text"
            name="Dự án"
            value={dựÁn?.["Tên dự án"]}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Vault</span>
          </div>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            id="vault"
            type="text"
            name="Vault"
            value={vault}
          />
        </label>
      </>
    );
  } else if (tênDanhSách === "nơi đăng") {
    const {
      "Tên nơi đăng": tênNơiĐăng,
      "Mô tả nơi đăng": môTảNơiĐăng,
      "Loại nơi đăng": loạiNơiĐăng,
      "Loại nền tảng": loạiNềnTảng,
      "Tên cộng đồng": tênCộngĐồng,
      "Tên nền tảng": tênNềnTảng,
      URL,
    } = corsProxyRes["Nếu là nơi đăng"];
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
            name="URL"
            value={URL as string}
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
            placeholder={tênNơiĐăng}
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
            placeholder={loạiNơiĐăng}
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
            <span className="label-text font-bold">Tên cộng đồng</span>
          </div>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            id="tên-cộng-đồng"
            type="text"
            name="Tên cộng đồng"
            value={tênCộngĐồng}
            placeholder={tênCộngĐồng}
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
  } else return <></>;
}
export default function NhậpMới(
  { activeList, url }: { activeList: DanhSáchĐangActive; url: string },
) {
  if (activeList === undefined || url === "") return <></>;
  const corsProxy = `${TÊN_MIỀN_RÚT_GỌN}/cors-proxy/${url}`;
  return (
    <dialog id="model-nhập-mới" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Thêm {activeList} mới</h3>
        <form onSubmit={handleSubmit}>
          <CácTrườngNhậpMới tênDanhSách={activeList} url={corsProxy} />
          <button class="btn btn-secondary gap-2" type="submit">
            Thêm mới
          </button>
        </form>
      </div>
    </dialog>
  );
}
