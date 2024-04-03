import { Handlers, PageProps } from "$fresh/server.ts";
import { parse } from "$std/yaml/mod.ts";
import Footer from "../components/Footer.tsx";
import Meta from "../components/Meta.tsx";
import tạoDanhSáchNơiĐăng from "../core/B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/2.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăng,
} from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { VậtThểTiếpThị } from "../utils/Kiểu cho web.ts";
import Main from "../islands/Main.tsx";

export const handler: Promise<Handlers> = {
  async GET(req, ctx) {
    const urlReq = new URL(req.url);
    const đuôiRútGọn = urlReq.searchParams.get("q");

    if (đuôiRútGọn) {
      const kv = await Deno.openKv();
      const serverGet = await kv.get(["Đuôi rút gọn", đuôiRútGọn]);
      const vậtThểTiếpThị = serverGet.value as VậtThểTiếpThị;

      // const restUrl = `${TÊN_MIỀN_RÚT_GỌN}/kv?key=${đuôiRútGọn}`;
      // const res = await fetch(restUrl);
      // const clientGet = await res.json();
      // const vậtThểTiếpThị = clientGet.value as VậtThểTiếpThị;

      if (vậtThểTiếpThị) {
        const liênKếtUTM = vậtThểTiếpThị["Liên kết UTM"];
        return Response.redirect(liênKếtUTM, 307);
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
    await Deno.readTextFile("core/A. Cấu hình/Danh sách tất cả bài đăng.json"),
  ) as BàiĐăng[];
  const cấuHìnhNơiĐăng = parse(
    await Deno.readTextFile("core/A. Cấu hình/Nơi đăng.yaml"),
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
