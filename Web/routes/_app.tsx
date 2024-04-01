import { Stylesheet } from "lunchbox";
import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html data-theme="retro" class="h-screen">
      <head>
        <script>
          (function(w,d,s,l,i)&#123;w[l]=w[l]||[];w[l].push(&#123;'gtm.start':
          new Date().getTime(),event:'gtm.js'&#125;);var
          f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          &#125;)(window,document,'script','dataLayer','GTM-MWZ4WG7');
        </script>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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
