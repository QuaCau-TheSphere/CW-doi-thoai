import { Head } from "$fresh/runtime.ts";
import Meta from "../components/Meta.tsx";
import { ORIGIN } from "../env.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
        <script>
          (function(w,d,s,l,i)&#123;w[l]=w[l]||[];w[l].push(&#123;'gtm.start': new Date().getTime(),event:'gtm.js'&#125;);var
          f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          &#125;)(window,document,'script','dataLayer','GTM-MWZ4WG7');
        </script>
      </Head>
      <Meta imageUrl="sihouette.jpg" href={ORIGIN} />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MWZ4WG7"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        >
        </iframe>
      </noscript>
      <div class="flex flex-col bg-base-300 items-center justify-center">
        <h1 class="text-4xl font-bold p-5">404 - Không tìm thấy trang</h1>
        <a href="/" class="underline">Về trang chủ</a>
        <img src="sihouette.jpg" alt="sihouette" />
      </div>
    </>
  );
}
