import { StateUpdater, useEffect, useState } from "preact/hooks";
import {
  ElementDùngTab,
  MụcĐượcChọn,
  PhảnHồiTừCORSProxy,
  TênDanhSách,
} from "../../utils/Kiểu cho web.ts";
import { đổiKhungNhập } from "../../utils/Hàm cho khung nhập.ts";
import ModalBàiĐăng from "./Modal bài đăng.tsx";
import ModalNơiĐăng from "./Modal nơi đăng.tsx";
import {
  BàiĐăng,
  URLString,
} from "../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  LoạiNềnTảng,
  TênNềnTảng,
} from "../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";

function CácTrườngNhậpMới(
  { tênDanhSách, urlNhậpỞKhungNhậpNgoài }: {
    tênDanhSách: TênDanhSách;
    urlNhậpỞKhungNhậpNgoài: string;
  },
) {
  // console.log("🚀 ~ urlNhậpỞKhungNhậpNgoài:", urlNhậpỞKhungNhậpNgoài);
  const [urlNhậpTrongModal, setUrl] = useState(urlNhậpỞKhungNhậpNgoài);
  // console.log("🚀 ~ urlNhậpTrongModal1:", urlNhậpTrongModal);

  //deno-fmt-ignore
  const [phảnHồiTừCORSProxy, setPhảnHồiTừCORSProxy] = useState<PhảnHồiTừCORSProxy | undefined>(undefined);
  useEffect(() => {
    async function lấyMetaTag() {
      const originWeb = globalThis.location.origin;
      const corsProxyUrl = `${originWeb}/api/cors-proxy/${urlNhậpTrongModal}`;
      //deno-fmt-ignore
      const phảnHồiTừCORSProxy = (await (await fetch(corsProxyUrl)).json()) as PhảnHồiTừCORSProxy;
      setPhảnHồiTừCORSProxy(phảnHồiTừCORSProxy);
    }
    lấyMetaTag();
    //todo
  }, [urlNhậpTrongModal]);

  // console.log(phảnHồiTừCORSProxy);

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
      phảnHồiTừCORSProxy,
      urlNhậpTrongModal,
      urlNhậpỞKhungNhậpNgoài,
      setUrl,
    );
  } else if (tênDanhSách === "nơi đăng") {
    return ModalNơiĐăng(
      phảnHồiTừCORSProxy,
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
) {
  event.preventDefault();
  const dữLiệuMới = tạoDữLiệuMới(event.currentTarget, tênDanhSách);
  const originWeb = globalThis.location.origin;
  const url = `${originWeb}/api/newData`;

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
  đổiKhungNhập("xuôi", tênDanhSách);
}

export default function ModalTạoMới(
  { tênDanhSách, URL, setSelectedItem }: {
    tênDanhSách: TênDanhSách;
    URL: string;
    setSelectedItem: StateUpdater<MụcĐượcChọn>;
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

function tạoDữLiệuMới(eventcurrentTarget: any, tênDanhSách: TênDanhSách) {
  const formData = Object.fromEntries(new FormData(eventcurrentTarget));

  let dữLiệu: BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí;
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
        url: url,
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
      } satisfies BàiĐăng;
      break;
    }
    case "nơi đăng": {
      const {
        URL: url,
        "Tên nơi đăng": tênNơiĐăng,
        "Loại nơi đăng": loạiNơiĐăng,
        "Tên nền tảng": tênNềnTảng,
        "Mô tả nơi đăng": môTảNơiĐăng,
        "Loại nền tảng": loạiNềnTảng,
        "Vị trí có thể đăng": vịTríCóThểĐăng,
      } = formData as Record<string, string>;
      dữLiệu = {
        URL: url as URLString,
        "Tên nơi đăng": JSON.parse(tênNơiĐăng),
        "Loại nơi đăng": JSON.parse(loạiNơiĐăng),
        "Tên nền tảng": tênNềnTảng as TênNềnTảng,
        "Mô tả nơi đăng": môTảNơiĐăng,
        "Loại nền tảng": loạiNềnTảng as LoạiNềnTảng,
        "Vị trí có thể đăng": JSON.parse(vịTríCóThểĐăng),
      } satisfies NơiĐăngChưaXácĐịnhVịTrí;
      break;
    }
  }
  return {
    "Tên danh sách": tênDanhSách,
    "Dữ liệu": dữLiệu,
  };
}
