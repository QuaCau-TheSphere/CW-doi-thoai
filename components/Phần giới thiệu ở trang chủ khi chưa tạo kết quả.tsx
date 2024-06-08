import { extract } from "$std/front_matter/yaml.ts";
import { render } from "gfm";
import IconBrandDiscord from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-discord.tsx";
import IconBrandFacebook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-facebook.tsx";
import IconSphere from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/sphere.tsx";

export default function KhungThôngTinKhiKhôngCóKếtQuả({ textTrangChủ }: { textTrangChủ: string }) {
  const bàiViết = extract(textTrangChủ);
  const tênBàiViết = bàiViết.attrs.title;
  const môTảBàiViết = bàiViết.attrs.description;
  const nộiDungBàiViết = render(bàiViết.body);
  return (
    <article id="khung-thông-tin-khi-không-có-kết-quả" class="prose">
      <div dangerouslySetInnerHTML={{ __html: nộiDungBàiViết }} />

      <nav class="flex gap-5">
        <a href="https://quảcầu.cc/?utm_source=doi-thoai.deno.dev+(Trang+chủ)&utm_medium=Website&utm_campaign=&utm_content=&utm_term=">
          <IconSphere class="w-6 h-6" />
        </a>
        <a href="https://doi-thoai.deno.dev/jWTk4EHFK2.doi-thoai.1">
          <IconBrandDiscord class="w-6 h-6" />
        </a>
        <a href="https://doi-thoai.deno.dev/quacau.sphere.doi-thoai.1">
          <IconBrandFacebook class="w-6 h-6" />
        </a>
      </nav>
    </article>
  );
}
