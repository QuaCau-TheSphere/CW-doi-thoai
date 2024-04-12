import { StateUpdater, useEffect, useState } from "preact/hooks";
import {
  CorsProxyRes,
  DanhSáchĐangActive,
  KhungNhậpĐangActive,
  MụcĐượcChọn,
} from "../utils/Ki%E1%BB%83u%20cho%20web.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code hỗ trợ/Hằng.ts";
import { TênDanhSách } from "../utils/Kiểu cho web.ts";
import { đổiKhungNhậpXuôi } from "../utils/Hàm.ts";

function CácTrườngNhậpMới(
  { tênDanhSách, corsProxyUrl }: {
    tênDanhSách: TênDanhSách;
    corsProxyUrl: string;
  },
) {
  const [corsProxyRes, setCorsProxyRes] = useState<CorsProxyRes | undefined>(
    undefined,
  );
  useEffect(() => {
    async function lấyMetaTag() {
      const corsProxyRes =
        (await (await fetch(corsProxyUrl)).json()) as CorsProxyRes;
      setCorsProxyRes(corsProxyRes);
    }
    lấyMetaTag();
    //todo
  }, []);
  if (corsProxyRes === undefined || corsProxyRes.lỗi) return <></>;

  if (tênDanhSách === "bài đăng") {
    const {
      "Tiêu đề": tiêuĐề,
      "Mô tả bài đăng": môTảBàiĐăng,
      "Dự án": dựÁn,
      Vault: vault,
      URL,
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
            value={URL as string}
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
function handleSubmit(
  event: FormDataEvent,
  tênDanhSách: TênDanhSách,
  setSelectedItem: StateUpdater<MụcĐượcChọn>,
  setKhungNhậpActive: StateUpdater<KhungNhậpĐangActive>,
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const dữLiệuMới = {
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": Object.fromEntries(formData),
  };
  const url = `${TÊN_MIỀN_RÚT_GỌN}/api/newData`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dữLiệuMới),
  }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      setSelectedItem(data.value);
    })
    .catch(console.error);
  (document.getElementById("model-tạo-mới") as HTMLDialogElement).close();
  đổiKhungNhậpXuôi(tênDanhSách, setKhungNhậpActive);
}

export default function ModalTạoMới(
  { danhSáchĐangActive, url, setSelectedItem, setKhungNhậpActive }: {
    danhSáchĐangActive: DanhSáchĐangActive;
    url: string;
    setSelectedItem: StateUpdater<MụcĐượcChọn>;
    setKhungNhậpActive: StateUpdater<KhungNhậpĐangActive>;
  },
) {
  if (danhSáchĐangActive === undefined || url === "") return <></>;
  const corsProxyUrl = `${TÊN_MIỀN_RÚT_GỌN}/api/cors-proxy/${url}`;
  return (
    <dialog id="model-tạo-mới" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Tạo {danhSáchĐangActive} mới</h3>
        <form
          onSubmit={(e: FormDataEvent) =>
            handleSubmit(
              e,
              danhSáchĐangActive,
              setSelectedItem,
              setKhungNhậpActive,
            )}
        >
          <CácTrườngNhậpMới
            tênDanhSách={danhSáchĐangActive}
            corsProxyUrl={corsProxyUrl}
          />
          <button class="btn btn-secondary gap-2" type="submit">
            Tạo (<kbd>Enter</kbd>)
          </button>
        </form>
      </div>
    </dialog>
  );
}
