import { StateUpdater, useEffect, useState } from "preact/hooks";
import {
  CorsProxyRes,
  ElementDùngTab,
  MụcĐượcChọn,
  TênDanhSách,
} from "../../utils/Kiểu cho web.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../../core/Code hỗ trợ/Hằng.ts";
import { đổiKhungNhập } from "../../utils/Hàm cho khung nhập.ts";
import ModalBàiĐăng from "./Modal bài đăng.tsx";
import ModalNơiĐăng from "./Modal nơi đăng.tsx";
import {
  BàiĐăng,
  URLString,
} from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  LoạiNềnTảng,
  NơiĐăng,
} from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênNềnTảng } from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { LoạiNơiĐăng } from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";

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
    // return (
    //   <ModalBàiĐăng
    //     corsProxyRes={corsProxyRes}
    //     urlNhậpTrongModal={urlNhậpTrongModal}
    //     urlNhậpỞKhungNhậpNgoài={urlNhậpỞKhungNhậpNgoài}
    //     setUrl={setUrl}
    //   />
    // );
    return ModalBàiĐăng(
      corsProxyRes,
      urlNhậpTrongModal,
      urlNhậpỞKhungNhậpNgoài,
      setUrl,
    );
  } else if (tênDanhSách === "nơi đăng") {
    return ModalNơiĐăng(
      corsProxyRes,
      urlNhậpTrongModal,
      urlNhậpỞKhungNhậpNgoài,
      setUrl,
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
  const dữLiệuMới = tạoDữLiệuMới(event.currentTarget, tênDanhSách);
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
            Tạo <kbd class="kbd bg-secondary">Enter</kbd>
          </button>
        </form>
      </div>
    </dialog>
  );
}

//todo
function tạoDữLiệuMới(eventcurrentTarget: any, tênDanhSách: TênDanhSách) {
  const formData = Object.fromEntries(new FormData(eventcurrentTarget));

  let dữLiệu: BàiĐăng | NơiĐăng;
  switch (tênDanhSách) {
    case "bài đăng": {
      const {
        URL: url,
        "Tiêu đề": tiêuĐề,
        "Mô tả bài đăng": môTảBàiĐăng,
        "Tên dự án": dựÁn,
        Website: vault,
      } = formData as Record<string, string>;
      dữLiệu = {
        URL: url,
        "Tiêu đề": tiêuĐề,
        "Dự án": {
          "Mã dự án": undefined,
          "Tên dự án": dựÁn,
        },
        "Mã bài đăng": undefined,
        "Nội dung bài đăng": {
          "Mô tả bài đăng": môTảBàiĐăng,
          "Toàn bộ nội dung": undefined,
          "Định dạng nội dung": undefined,
        },
        Vault: vault,
      };
      break;
    }
    case "nơi đăng":
      {
        dữLiệu = formData as unknown as NơiĐăng;
        // const {
        //   URL: url,
        //   "Tên nơi đăng": tênNơiĐăng,
        //   "Loại nơi đăng": loạiNơiĐăng,
        //   "Tên cộng đồng": tênCộngĐồng,
        //   "Tên nền tảng": tênNềnTảng,
        //   "Mô tả nơi đăng": môTảNơiĐăng,
        //   "Loại nền tảng": loạiNềnTảng,
        // } = formData as unknown as NơiĐăng;
        // dữLiệu = {
        //   URL: url,
        //   "Tên nơi đăng": tênNơiĐăng,
        //   "Loại nơi đăng": loạiNơiĐăng as LoạiNơiĐăng,
        //   "Tên cộng đồng": tênCộngĐồng,
        //   "Tên nền tảng": tênNềnTảng as TênNềnTảng,
        //   "Mô tả nơi đăng": môTảNơiĐăng,
        //   "Loại nền tảng": loạiNềnTảng as LoạiNềnTảng,
        // };
      }
      break;
  }
  return {
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": dữLiệu,
  };
}
