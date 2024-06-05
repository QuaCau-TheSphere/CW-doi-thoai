import { type PageProps } from "$fresh/server.ts";
import Meta from "../components/Meta.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html data-theme="retro" class="h-screen">
      <Meta imageUrl="sihouette.jpg" />
      <body>
        <Component />
      </body>
    </html>
  );
}
