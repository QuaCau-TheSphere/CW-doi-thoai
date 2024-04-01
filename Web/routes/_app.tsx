import { Stylesheet } from "lunchbox";
import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html data-theme="retro" class="h-screen">
      <head>
        {
          /* <script>
					(function(w,d,s,l,i)&#123;w[l]=w[l]||[];w[l].push(&#123;'gtm.start':
					new Date().getTime(),event:'gtm.js'&#125;);var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					&#125;)(window,document,'script','dataLayer','GTM-MWZ4WG7');
				</script> */
        }
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Tạo và rút gọn link UTM</title>
        <meta property="og:site_name" content="Tạo và rút gọn link UTM" />
        {
          /* <meta property="og:description" content={MÔ_TẢ_TRANG_2} />
				<meta property="og:locale" content="vi" />
				<meta property="og:image" content="mayphanloaitien.png" />
				<meta property="og:image:secure_url" content="mayphanloaitien.png" />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:alt" content={`Máy phân loại tiền với dòng chữ ${MÔ_TẢ_TRANG_1}`} /> */
        }
        <link rel="stylesheet" href="/styles.css" />

        <Stylesheet />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MWZ4WG7"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          >
          </iframe>
        </noscript>
        <Component />
      </body>
    </html>
  );
}
