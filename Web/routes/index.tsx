import { Handlers, PageProps } from "$fresh/server.ts";
import { parse } from "$std/yaml/mod.ts";
import { BàiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, {
  NơiĐăng,
} from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import tạoDanhSáchNơiĐăng from "../../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/2.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import Main from "../islands/Main.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const a = { req };
    return ctx.render(a);
  },
};

export default async function App(prop: PageProps) {
  const danhSáchBàiĐăng = JSON.parse(
    await Deno.readTextFile("A. Cấu hình/Bài đăng.json"),
  ) as BàiĐăng[];
  const cấuHìnhNơiĐăng = parse(
    await Deno.readTextFile("A. Cấu hình/Nơi đăng.yaml"),
  ) as CấuHìnhNơiĐăng;
  const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng) as NơiĐăng[];
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
