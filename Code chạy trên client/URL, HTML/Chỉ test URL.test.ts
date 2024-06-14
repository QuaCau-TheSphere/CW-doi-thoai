import { lấyMetaTagVàTạoDocument, tạoTiêuĐề } from "./Hàm và kiểu cho dữ liệu meta.ts";
import { TẬP_TIN_CACHE_HTML, TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG } from "../../Code chạy trên local, server, KV/ĐƯỜNG_DẪN.ts";
import { CacheHTML, lấyHTMLTừLocal, lấyMetaTagVàTạoDocumentTrênLocal } from "../../Code chạy trên local, server, KV/Hàm cho cache.ts";

const urls = [
  "https://www.facebook.com/quacau.sphere/",
  "https://www.facebook.com/qua.cau.the.sphere",
  "https://github.com/orgs/QuaCau-TheSphere",
  "https://github.com/QuaCau-TheSphere/CW-obsidian-quan-ly-du-an-va-cong-cu-nghi",
  "https://discord.gg/jWTk4EHFK2",
  "https://quảcầu.cc",
  "https://obsidian.quảcầu.cc",
  "https://lậptrình.quảcầu.cc",
  "https://doi-thoai.deno.dev",
  "https://tranky.deno.dev",
  "https://www.facebook.com/quacau.sphere",
  "https://www.facebook.com/groups/562933844569060/",
  "https://www.youtube.com/channel/UCReU_XcmJlp9ORWi8U2O-Fg",
];
// const url = urls[3];
// const url = "https://www.youtube.com/channel/UCReU_XcmJlp9ORWi8U2O-Fg";
// await chạyMộtUrl(url);
await chạyHếtUrls();
// await chạyToànBộCache();

async function chạyHếtUrls() {
  for (const url of urls) {
    await chạyMộtUrl(url);
    console.log();
  }
}

async function chạyToànBộCache() {
  const cache = new Map(Object.entries(JSON.parse(await Deno.readTextFile(TẬP_TIN_CACHE_HTML)))) as CacheHTML;
  cache.forEach((value, key, map) => {
    setInterval(async () => await chạyMộtUrl(key), 2000);
  });
}

async function chạyMộtUrl(url: string) {
  console.log(url);
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocumentTrênLocal(url);
  const { meta, document } = metaTagUrlVàDocument;
  const metaTitle = meta.og?.title;
  const htmlTitle = document.querySelector("title")?.textContent;
  const htmlTitleSplit = htmlTitle?.split(/ [-–—|·] /g) || [];
  const siteName = meta.og?.site_name;

  console.log("title:", await tạoTiêuĐề(metaTagUrlVàDocument));
  console.log("metaTitle:", metaTitle);
  console.log("htmlTitleSplit:", htmlTitleSplit);
  console.log("siteName:", siteName);
  console.log();
}
