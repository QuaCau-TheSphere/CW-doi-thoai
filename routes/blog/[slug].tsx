import { join } from "$std/path/mod.ts";
import { extractYaml } from "@std/front-matter";
import { type Extract } from "@std/front-matter/create-extractor";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm";
import { YAMLCủaGhiChú } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { THƯ_MỤC_BLOG } from "../../Code chạy trên local, server, KV/ĐƯỜNG_DẪN.ts";
import { lấyNgàyISO } from "../../Code chạy trên client/Chuỗi, slug/Hàm xử lý chuỗi.ts";
import HeadVàMeta from "../../components/Meta.tsx";

const slugs: Record<string, string> = {
  ChiaSẻKhoThôngTin: "Chia sẻ kho kiến thức, tài nguyên đến với mọi người",
  NhiềuNềnTảng: "Hiện diện trên nhiều nền tảng",
};

async function lấyBàiBlog(slug: string): Promise<Extract<YAMLCủaGhiChú>> {
  const đườngDẫn = join(THƯ_MỤC_BLOG, `${slugs[slug]}.md`);
  const text = await Deno.readTextFile(đườngDẫn);
  return extractYaml(text);
}

export const handler: Handlers<Extract<YAMLCủaGhiChú> | null> = {
  async GET(_req, ctx) {
    try {
      const slug = decodeURIComponent(ctx.params.slug);
      return ctx.render(await lấyBàiBlog(slug));
    } catch {
      return ctx.renderNotFound();
    }
  },
};

export default function BàiBlog(props: PageProps<Extract<YAMLCủaGhiChú>>) {
  const { attrs, body } = props.data;
  const html = render(body);

  return (
    <>
      <HeadVàMeta title={attrs.title} imageUrl="Linh Rab.jpg" />
      <main class="prose max-w-screen-md px-4 pt-16 mx-auto">
        <time class="text-gray-500">{lấyNgàyISO(attrs.created)}</time>
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </>
  );
}
