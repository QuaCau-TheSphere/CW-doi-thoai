import { Handlers, PageProps } from "$fresh/server.ts";
import { parse } from "$std/yaml/mod.ts";
import { BàiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăng,
} from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import tạoDanhSáchNơiĐăng from "../../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/2.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import Main from "../islands/Main.tsx";
import Footer from "../components/Footer.tsx";
import { TÊN_MIỀN_RÚT_GỌN } from "../../Code hỗ trợ/Hằng.ts";
import Meta from "../components/Meta.tsx";
import { VậtThểTiếpThị } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20web.ts";

export const handler: Promise<Handlers> = {
  async GET(req, ctx) {
    const urlReq = new URL(req.url);
    const đuôiRútGọn = urlReq.searchParams.get("q");
    // return new Response(JSON.stringify(đuôiRútGọn, null, 2));

    if (đuôiRútGọn) {
      const TÊN_MIỀN_RÚT_GỌN = "https://localhost:8000";
      const restUrl = `${TÊN_MIỀN_RÚT_GỌN}/k~v/?key=${đuôiRútGọn}`;
      const res = await fetch(restUrl);
      const clientGet = await res.json();
      const vậtThểTiếpThị = clientGet.value as VậtThểTiếpThị;

      if (vậtThểTiếpThị) {
        const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
        return new Response(JSON.stringify(liênKếtUTM, null, 2));
      } else {
        return ctx.renderNotFound();
      }
    } else {
      return ctx.render();
    }
  },
};

export default async function App(prop: PageProps) {
  const danhSáchBàiĐăng = JSON.parse(
    await Deno.readTextFile("A. Cấu hình/Danh sách tất cả bài đăng.json"),
  ) as BàiĐăng[];
  const cấuHìnhNơiĐăng = parse(
    await Deno.readTextFile("A. Cấu hình/Nơi đăng.yaml"),
  ) as CấuHìnhNơiĐăng;
  const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng) as NơiĐăng[];
  return (
    <body class="bg-base-100 flex flex-col h-screen">
      <Meta
        imageUrl="platos1.gif"
        href={TÊN_MIỀN_RÚT_GỌN}
      />
      <Main
        class="mb-auto"
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
        cấuHìnhNơiĐăng={cấuHìnhNơiĐăng}
      />
      <Footer />
    </body>
  );
}
