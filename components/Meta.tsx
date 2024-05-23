import { MÔ_TẢ_TRANG, TÊN_TRANG } from "../utils/H%E1%BA%B1ng.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

interface MetaProps {
  title?: string;
  description?: string;
  href?: string;
  imageUrl?: string;
}
const env = await load();
const ORIGIn = env["ORIGIN"];

export default function Meta({
  title = TÊN_TRANG,
  href = ORIGIn,
  imageUrl,
  description = MÔ_TẢ_TRANG,
}: MetaProps) {
  return (
    <>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      {imageUrl && <meta itemProp="image" content={imageUrl} />}

      {/* Facebook Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={href} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content={TÊN_TRANG} />
      <meta property="og:type" content="article" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
