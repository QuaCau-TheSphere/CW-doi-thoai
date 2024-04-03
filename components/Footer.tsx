import IconBrandDiscord from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-discord.tsx";
import IconBrandFacebook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-facebook.tsx";
import IconSphere from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/sphere.tsx";
import { TÊN_TRANG } from "../utils/H%E1%BA%B1ng.ts";

export default function Footer() {
  const danhSáchBàiViết = [
    { bài: `${TÊN_TRANG} là gì?`, href: "/lagi" },
    {
      bài: `Biến ${TÊN_TRANG} thành của bạn`,
      href: "https://quảcầu.cc/tich-hop-tran-ky-vao-he-thong-cua-ban/",
    },
    {
      bài: "Các buổi đáp ứng nhu cầu tự học lập trình",
      href:
        "https://quảcầu.cc/cac-buoi-dap-ung-nhu-cau-hoc-cach-su-dung-cong-cu-va-tu-duy-lap-trinh-cho-nhu-cau-ca-nhan-hoac-nghien-cuu/",
    },
    {
      bài: "Trấn kỳ",
      href: "https://tranky.deno.dev",
    },
  ];
  return (
    <footer class="footer items-center p-4 bg-neutral text-neutral-content gap-8">
      <aside className="grid items-center gap-8 md:grid-cols-1
                lg:grid-cols-[minmax(min-content,max-content)_minmax(min-content,max-content)_minmax(min-content,max-content)_minmax(min-content,max-content)_minmax(min-content,max-content)_minmax(min-content,max-content)]">
        <a class="text-2xl italic font-mono font-bold tracking-wide" href="/">
          {TÊN_TRANG}
        </a>
        {danhSáchBàiViết.map((liênKết) => (
          <a class="link link-hover" href={liênKết.href}>{liênKết.bài}</a>
        ))}
      </aside>
      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
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
    </footer>
  );
}
