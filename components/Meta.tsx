import { Head } from "$fresh/runtime.ts";
import { load } from "$std/dotenv/mod.ts";

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}
const env = await load();
const ORIGIN = env["ORIGIN"];
const TÊN_TRANG = "đối ⊷ thoại | Rút gọn liên kết dành cho người Việt";
const MÔ_TẢ_TRANG = "Nhanh chóng tìm lại các cuộc thảo luận đã từng có trước đây và nắm được mức độ quan tâm của các bên liên quan";
const GA = "GTM - MWZ4WG7";

function StandardTags({ title, description }: { title: string; description: string }) {
  return (
    <>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}

function OpenGraphTags({ title, description, url, imageUrl }: MetaProps) {
  return (
    <>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content={TÊN_TRANG} />
      <meta property="og:type" content="article" />
    </>
  );
}

function SearchEngineTags({ title, description }: MetaProps) {
  return (
    <>
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
    </>
  );
}

function GoogleAnalytics() {
  if (globalThis.location?.hostname === "localhost") return <></>;
  return (
    <>
      <script>
        (function(w,d,s,l,i)&#123;w[l]=w[l]||[];w[l].push(&#123;'gtm.start': new Date().getTime(),event:'gtm.js'&#125;);var
        f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); &#125;)(window,document,'script','dataLayer',{GA});
      </script>
      <link rel="stylesheet" href="/styles.css" />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GA}`}
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        >
        </iframe>
      </noscript>
    </>
  );
}

export default function HeadVàMeta({
  title = TÊN_TRANG,
  description = MÔ_TẢ_TRANG,
  url = ORIGIN,
  imageUrl,
}: MetaProps) {
  return (
    <Head>
      <StandardTags title={title} description={description} />
      <OpenGraphTags title={title} description={description} url={url} imageUrl={imageUrl} />
      <SearchEngineTags title={title} description={description} />
      <GoogleAnalytics />
    </Head>
  );
}
