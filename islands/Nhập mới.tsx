import { useEffect, useState } from "preact/hooks";
import {
  BàiĐăng,
  URLString,
} from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { DanhSáchĐangActive } from "../utils/Ki%E1%BB%83u%20cho%20web.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code hỗ trợ/Hằng.ts";
import { kebabCase, viếtHoa } from "../utils/Hàm.ts";
import { TênDanhSách } from "../utils/Kiểu cho web.ts";
import { LoạiNơiĐăng } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { TênNềnTảng } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { LoạiNềnTảng } from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";

async function tạoBàiĐăngTừURL(url: string): Promise<BàiĐăng> {
  const { title, description } = (await getMetaTags(url)).og as {
    title: string;
    description: string;
  };
  return {
    "Tiêu đề": title as string,
    url: url,
    "Mô tả bài đăng": description as string,
  };
}

async function tạoNơiĐăngTừURL(url: string): Promise<void | NơiĐăng> {
  try {
    const { title, description } = (await getMetaTags(url)).og as {
      title: string;
      description: string;
    };

    const { hostname, pathname } = new URL(url);
    let tênNềnTảng: TênNềnTảng;
    let loạiNềnTảng: LoạiNềnTảng;
    let loạiNơiĐăng: LoạiNơiĐăng;
    let tênCộngĐồng: string = "";

    if (hostname.includes("facebook")) {
      loạiNềnTảng = "Diễn đàn";
      tênNềnTảng = "Facebook";
      if (pathname.includes("group")) {
        loạiNơiĐăng = "Nhóm";
        tênCộngĐồng = ""; //todo
      } else {
        loạiNơiĐăng = "Trang";
      }
    } else if (hostname.includes("discord")) {
      loạiNềnTảng = "Chat";
      tênNềnTảng = "Discord";
      loạiNơiĐăng = "Máy chủ";
    } else {
      //@ts-ignore: todo
      loạiNềnTảng = "";
      //@ts-ignore: todo
      tênNềnTảng = "";
      //@ts-ignore: todo
      loạiNơiĐăng = "";
    }

    return {
      "Tên nơi đăng": title,
      URL: url,
      "Mô tả nơi đăng": description,
      "Loại nơi đăng": loạiNơiĐăng,
      "Loại nền tảng": loạiNềnTảng,
      "Tên nền tảng": tênNềnTảng,
      "Tên cộng đồng": tênCộngĐồng,
    };
  } catch (err) {
    console.error(err);
  }
}

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
  if (tênDanhSách === "bài đăng") {
    const [bàiĐăng, setBàiĐăng] = useState<BàiĐăng | undefined>(undefined);
    useEffect(() => {
      async function a() {
        const bàiĐăng = (await tạoBàiĐăngTừURL(url))!;
        setBàiĐăng(bàiĐăng);
      }
      a();
      //todo
    }, []);
    if (bàiĐăng === undefined) return <></>;
    const { "Tiêu đề": tiêuĐề, "Mô tả bài đăng": môTảBàiĐăng } = bàiĐăng;
    return (
      <>
        <label className="input input-bordered flex items-center gap-2">
          URL
          <input id="URL" type="text" name="URL" value={url} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Tiêu đề
          <input id="tiêu-đề" type="text" name="Tiêu đề" value={tiêuĐề} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Mô tả bài đăng
          <input
            id="mô-tả"
            type="text"
            name="Mô tả bài đăng"
            value={môTảBàiĐăng}
          />
        </label>
      </>
    );
  } else if (tênDanhSách === "nơi đăng") {
    const [nơiĐăng, setnơiĐăng] = useState<NơiĐăng | undefined>(undefined);
    useEffect(() => {
      async function a() {
        const nơiĐăng = (await tạoNơiĐăngTừURL(url))!;
        setnơiĐăng(nơiĐăng);
      }
      a();
      //todo
    });

    if (nơiĐăng === undefined) return <></>;
    const {
      "Tên nơi đăng": tênNơiĐăng,
      "Mô tả nơi đăng": môTảNơiĐăng,
      "Loại nơi đăng": loạiNơiĐăng,
      "Loại nền tảng": loạiNềnTảng,
      "Tên cộng đồng": tênCộngĐồng,
      "Tên nền tảng": tênNềnTảng,
    } = nơiĐăng;
    return (
      <>
        <label className="input input-bordered flex items-center gap-2">
          URL
          <input id="URL" type="text" name="URL" placeholder={url} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Tên nơi đăng
          <input
            id="tên"
            type="text"
            name="Tên nơi đăng"
            placeholder={tênNơiĐăng}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Mô tả nơi đăng
          <input
            id="mô-tả"
            type="text"
            name="Mô tả nơi đăng"
            placeholder={môTảNơiĐăng}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Loại nơi đăng
          <input
            id="loại"
            type="text"
            name="Loại nơi đăng"
            placeholder={loạiNơiĐăng}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Loại nền tảng
          <input
            id="loại-nền-tảng"
            type="text"
            name="Loại nền tảng"
            placeholder={loạiNềnTảng}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Tên cộng đồng
          <input
            id="tên-cộng-đồng"
            type="text"
            name="Tên cộng đồng"
            placeholder={tênCộngĐồng}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Tên nền tảng
          <input
            id="tên-nền-tảng"
            type="text"
            name="Tên nền tảng"
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
