import { Handlers, PageProps } from "$fresh/server.ts";
import { parse } from "$std/yaml/mod.ts";
import Meta from "../components/Meta.tsx";
import tạoDanhSáchNơiĐăng from "../core/B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình.ts";
import { TÊN_MIỀN_RÚT_GỌN } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import { BàiĐăng } from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăng,
} from "../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import Main from "../islands/Main.tsx";

export default async function App(prop: PageProps) {
  const kv = await Deno.openKv();

  const iterBàiĐăng = kv.list({ prefix: ["Bài đăng"] });
  const danhSáchBàiĐăngNgườiDùngTạoThêm: BàiĐăng[] = [];
  for await (const res of iterBàiĐăng) {
    danhSáchBàiĐăngNgườiDùngTạoThêm.push(res.value as BàiĐăng);
  }
  const danhSáchBàiĐăngLấyTừVault = JSON.parse(
    await Deno.readTextFile("core/A. Cấu hình/Danh sách tất cả bài đăng.json"),
  ) as BàiĐăng[];
  const danhSáchBàiĐăng = [
    ...danhSáchBàiĐăngLấyTừVault,
    ...danhSáchBàiĐăngNgườiDùngTạoThêm,
  ];

  const iterNơiĐăng = kv.list({ prefix: ["Nơi đăng"] });
  const danhSáchNơiĐăngNgườiDùngTạoThêm: NơiĐăng[] = [];
  for await (const res of iterNơiĐăng) {
    danhSáchNơiĐăngNgườiDùngTạoThêm.push(res.value as NơiĐăng);
  }
  const cấuHìnhNơiĐăng = parse(
    await Deno.readTextFile("core/A. Cấu hình/Nơi đăng.yaml"),
  ) as CấuHìnhNơiĐăng;
  const danhSáchNơiĐăngLấyTừCấuHình = tạoDanhSáchNơiĐăng(
    cấuHìnhNơiĐăng,
  ) as NơiĐăng[];
  const danhSáchNơiĐăng = [
    ...danhSáchNơiĐăngLấyTừCấuHình,
    ...danhSáchNơiĐăngNgườiDùngTạoThêm,
  ];

  return (
    <body class="bg-base-100">
      <Main
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
        cấuHìnhNơiĐăng={cấuHìnhNơiĐăng}
      />
    </body>
  );
}
