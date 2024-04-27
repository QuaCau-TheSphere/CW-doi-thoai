import { StateUpdater, useEffect, useState } from "preact/hooks";
import {
  CorsProxyRes,
  ElementDùngTab,
  MụcĐượcChọn,
  TênDanhSách,
} from "../utils/Kiểu cho web.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code hỗ trợ/Hằng.ts";
import { đổiKhungNhập } from "../utils/Hàm cho khung nhập.ts";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { useSignal } from "@preact/signals";

function CácTrườngNhậpMới(
  { tênDanhSách, urlNhậpỞKhungNhậpNgoài }: {
    tênDanhSách: TênDanhSách;
    urlNhậpỞKhungNhậpNgoài: string;
  },
) {
  console.log("🚀 ~ urlNhậpỞKhungNhậpNgoài:", urlNhậpỞKhungNhậpNgoài);
  const [urlNhậpTrongModal, setUrl] = useState(urlNhậpỞKhungNhậpNgoài);
  console.log("🚀 ~ urlNhậpTrongModal1:", urlNhậpTrongModal);

  const [corsProxyRes, setCorsProxyRes] = useState<CorsProxyRes | undefined>(
    undefined,
  );
  useEffect(() => {
    async function lấyMetaTag() {
      console.log("🚀 ~ lấyMetaTag ~ url:", urlNhậpTrongModal);
      const corsProxyUrl =
        `${TÊN_MIỀN_RÚT_GỌN}/api/cors-proxy/${urlNhậpTrongModal}`;
      const corsProxyRes =
        (await (await fetch(corsProxyUrl)).json()) as CorsProxyRes;
      setCorsProxyRes(corsProxyRes);
    }
    lấyMetaTag();
    //todo
  }, [urlNhậpTrongModal]);

  if (tênDanhSách === "bài đăng") {
    let bàiĐăng;
    if (corsProxyRes === undefined || corsProxyRes.lỗi) {
      bàiĐăng = new BàiĐăng();
    } else {
      bàiĐăng = corsProxyRes["Nếu là bài đăng"];
    }
    const {
      "Tiêu đề": tiêuĐề,
      "Mô tả bài đăng": môTảBàiĐăng,
      "Dự án": dựÁn,
      Vault: vault,
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
    let nơiĐăng;
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
      "Tên cộng đồng": tênCộngĐồng,
      "Tên nền tảng": tênNềnTảng,
      URL,
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
  setElement: StateUpdater<ElementDùngTab>,
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
  đổiKhungNhập("xuôi", tênDanhSách, setElement);
}

export default function ModalTạoMới(
  { tênDanhSách, URL, setSelectedItem, setElement }: {
    tênDanhSách: TênDanhSách;
    URL: string;
    setSelectedItem: StateUpdater<MụcĐượcChọn>;
    setElement: StateUpdater<ElementDùngTab>;
  },
) {
  return (
    <dialog id="model-tạo-mới" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Tạo {tênDanhSách} mới</h3>
        <form
          onSubmit={(e: FormDataEvent) =>
            handleSubmit(
              e,
              tênDanhSách,
              setSelectedItem,
              setElement,
            )}
        >
          <CácTrườngNhậpMới
            tênDanhSách={tênDanhSách}
            urlNhậpỞKhungNhậpNgoài={URL}
          />
          <button class="btn btn-secondary gap-2" type="submit">
            Tạo (<kbd>Enter</kbd>)
          </button>
        </form>
      </div>
    </dialog>
  );
}
