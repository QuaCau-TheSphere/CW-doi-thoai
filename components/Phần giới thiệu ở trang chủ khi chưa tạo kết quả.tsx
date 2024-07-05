import { extract } from "$std/front_matter/yaml.ts";
import { render } from "gfm";
import IconBrandDiscord from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-discord.tsx";
import IconBrandFacebook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-facebook.tsx";
import IconSphere from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/sphere.tsx";

export default function PhầnGiớiThiệuỞTrangChủKhiChưaTạoKếtQuả({ textTrangChủ }: { textTrangChủ: string }) {
  // const {body} = extract(textTrangChủ);
  // const html = render(body);
  const html = textTrangChủ;
  return (
    <article id="khung-thông-tin-khi-không-có-kết-quả" class="prose">
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <nav class="flex gap-5">
        <a href="https://quảcầu.cc/?utm_source=đối+⊷+thoại+(Trang+chủ)&utm_medium=Website&utm_campaign=&utm_content=&utm_term=">
          <IconSphere class="w-6 h-6" />
        </a>
        <a href="https://doi-thoai.deno.dev/discordQC.đốithoại.1">
          <IconBrandDiscord class="w-6 h-6" />
        </a>
        <a href="https://doi-thoai.deno.dev/pagefbQC.đốithoại.1">
          <IconBrandFacebook class="w-6 h-6" />
        </a>
      </nav>
    </article>
  );
}
