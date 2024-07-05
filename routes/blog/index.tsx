import { extractYaml } from "@std/front-matter";
import { render } from "gfm";
import { YAMLCủaGhiChú } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { lấyNgàyISO } from "../../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { type Extract } from "@std/front-matter/create-extractor";
import HeadVàMeta from "../../components/Meta.tsx";

export default async function BàiBlog() {
  const text = await Deno.readTextFile("./docs/Tổng quan blog.md");
  const { attrs, body } = extractYaml(text) as Extract<YAMLCủaGhiChú>;
  return (
    <>
      <HeadVàMeta title="Giới thiệu đối ⊷ thoại" imageUrl="Linh Rab.jpg" />
      <main class="prose max-w-screen-md px-4 pt-16 mx-auto">
        <time class="text-gray-500">{lấyNgàyISO(attrs.created)}</time>
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(body) }}
        />
      </main>
    </>
  );
}
