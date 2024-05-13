import { extract } from "$std/front_matter/yaml.ts";
import { render } from "gfm";
import IconBrandDiscord from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-discord.tsx";
import IconBrandFacebook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-facebook.tsx";
import IconSphere from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/sphere.tsx";

export default function KhungThôngTinKhiKhôngCóKếtQuả(
  { text }: { text: string },
) {
  const bàiViết = extract(text);
  const tênBàiViết = bàiViết.attrs.title;
  const môTảBàiViết = bàiViết.attrs.description;
  const nộiDungBàiViết = render(bàiViết.body);
  return (
    // prose prose-xl mx-5 my-10 md:my-36 md:mx-auto
    <article
      id="khung-thông-tin-khi-không-có-kết-quả"
      class="prose"
    >
      <div dangerouslySetInnerHTML={{ __html: nộiDungBàiViết }}>
        {nộiDungBàiViết}
      </div>

      <nav class="flex gap-5">
        <a href="https://quảcầu.com">
          <IconSphere class="w-6 h-6" />
        </a>
        <a href="https://discord.gg/jWTk4EHFK2">
          <IconBrandDiscord class="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com/quacau.sphere/">
          <IconBrandFacebook class="w-6 h-6" />
        </a>
      </nav>
    </article>
  );
}
