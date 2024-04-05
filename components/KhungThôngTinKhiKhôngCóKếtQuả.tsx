import IconBrandDiscord from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-discord.tsx";
import IconBrandFacebook from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-facebook.tsx";
import IconSphere from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/sphere.tsx";
import { TÊN_TRANG } from "../utils/H%E1%BA%B1ng.ts";

export default function KhungThôngTinKhiKhôngCóKếtQuả() {
  return (
    <div id="khung-thông-tin-khi-không-có-kết-quả">
      <h1>{TÊN_TRANG}</h1>
      <p>
        Đây là chương trình giúp bạn tự động tạo và rút gọn liên kết UTM trên
        website của bạn chỉ bằng việc nhập bài đăng và nơi đăng. Điều này sẽ
        giúp bạn đo lường tính hiệu quả sự đối thoại của bạn bằng dữ liệu.
      </p>
      <p>
        Website của bạn cần cài sẵn Google Analytics để có thể nhận dữ liệu.
      </p>
      <p>
        Liên lạc với chúng tôi để nhập bài đăng và nơi đăng của bạn, hoặc tải mã
        nguồn để dùng riêng với hệ thống của bạn. Trong tương lai chúng tôi cũng
        sẽ tạo một plugin Obsidian để bạn có thể tạo bài đăng ngay trên vault
        của mình. Tất cả đều miễn phí.
      </p>
      <p>Sản phẩm khác:</p>
      <ul>
        <li>
          <a href="https://tranky.deno.dev">Trấn Kỳ</a>
        </li>
        <li>
          <a href="https://quảcầu.cc/cac-buoi-dap-ung-nhu-cau-hoc-cach-su-dung-cong-cu-va-tu-duy-lap-trinh-cho-nhu-cau-ca-nhan-hoac-nghien-cuu/">
            Các buổi đáp ứng nhu cầu tự học lập trình hoặc quản lý dự án
          </a>
        </li>
        <li>
          <a href="https://obsidian.quảcầu.cc/%F0%9F%93%90%20d%E1%BB%B1%20%C3%A1n/c%C3%B4ng%20c%E1%BB%A5%20cho%20h%E1%BB%87%20sinh%20th%C3%A1i/9%20blog/t%E1%BB%AB%20vi%E1%BB%87c%20l%C6%B0u%20d%E1%BB%AF%20li%E1%BB%87u%20t%E1%BA%A1i%20ch%E1%BB%97%20%C4%91%E1%BA%BFn%20s%E1%BB%B1%20h%E1%BB%A3p%20t%C3%A1c%20%C4%91a%20ph%C6%B0%C6%A1ng%20v%C3%A0%20li%C3%AAn%20ng%C3%A0nh%20v%C3%A0%20n%E1%BB%81n%20kinh%20t%E1%BA%BF%20kh%C3%B4ng%20d%C3%B9ng%20ti%E1%BB%81n/">
            Hệ thống quản lý kiến thức cộng đồng
          </a>
        </li>
      </ul>
      <p>Viết bởi Quả Cầu.</p>

      <a href="https://quảcầu.com">
        <IconSphere class="w-6 h-6" />
      </a>
      <a href="https://discord.gg/jWTk4EHFK2">
        <IconBrandDiscord class="w-6 h-6" />
      </a>
      <a href="https://www.facebook.com/quacau.sphere/">
        <IconBrandFacebook class="w-6 h-6" />
      </a>
    </div>
  );
}

function Footer() {
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
        </a>
        {danhSáchBàiViết.map((liênKết) => (
          <a class="link link-hover" href={liênKết.href}>{liênKết.bài}</a>
        ))}
      </aside>
      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      </nav>
    </footer>
  );
}
