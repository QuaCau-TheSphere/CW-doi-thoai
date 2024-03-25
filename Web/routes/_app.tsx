import { type PageProps } from "$fresh/server.ts";
import { Stylesheet } from "lunchbox";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tạo và rút gọn link UTM</title>
        <link rel="stylesheet" href="/styles.css" />
        <Stylesheet />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
