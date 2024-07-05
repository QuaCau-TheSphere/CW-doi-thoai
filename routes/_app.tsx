import { type PageProps } from "$fresh/server.ts";
import HeadVàMeta from "../components/Meta.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html data-theme="retro" class="h-screen">
      <body>
        <Component />
      </body>
    </html>
  );
}
