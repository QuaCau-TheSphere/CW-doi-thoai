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
            Tạo <kbd class="kbd bg-secondary">Enter</kbd>
          </button>
        </form>
      </div>
    </dialog>
  );
}

// function tạoDữLiệuMới(eventcurrentTarget: any, tênDanhSách: TênDanhSách) {
//   const formData = Object.fromEntries(new FormData(eventcurrentTarget))
//   let dữLiệu
//   switch (tênDanhSách) {
//     case 'bài đăng':
//       const {URL: url, 'Tiêu đề': tiêuĐề, 'Mô tả bài đăng': môTảBàiĐăng, ''} = formData
//       break;

//     default:
//       break;
//   }
//   return {
//     "Tên danh sách": tênDanhSách,
//     "Dữ liệu": dữLiệu,
//   };
// }
