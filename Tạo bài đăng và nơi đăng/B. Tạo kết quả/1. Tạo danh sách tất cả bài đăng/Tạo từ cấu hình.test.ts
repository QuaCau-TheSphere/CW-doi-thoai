import { ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3%20cho%20server/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG } from "../../../%C4%90%C6%AF%E1%BB%9CNG_D%E1%BA%AAN.ts";

export async function tạoDanhSáchBàiĐăngTest(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng) {
  const danhSáchBàiĐăng: { url: string; html: string }[] = [];
  const { Slug: _, ...cấuHìnhĐãBỏSlug } = cấuHìnhNơiĐăng;
  const urls = lấyURLTrongJSON(cấuHìnhĐãBỏSlug);
  for (const url of urls) {
    const html = await lấyHTML(url.href);
    danhSáchBàiĐăng.push({ url: (await lấyURLChínhTắc(url.href, html)).href, html: html });
  }
  return danhSáchBàiĐăng;
}
// const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
// const danhSáchBàiĐăng = [];
// for (const thôngTinCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
//   if (thôngTinCấuHình.tênCấuHình !== "test") continue;
//   const newLocal = await tạoDanhSáchBàiĐăngTest(thôngTinCấuHình.cấuHình);
//   danhSáchBàiĐăng.push(...newLocal);
// }
// Deno.writeTextFileSync("tét.json", JSON.stringify(danhSáchBàiĐăng, null, 2));

const a = JSON.parse(Deno.readTextFileSync("tét.json")) as { url: string; html: string }[];
const danhSáchNơiĐăng = JSON.parse(Deno.readTextFileSync(TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG)) as NơiĐăngCóCácLựaChọnVịTrí[];
a.forEach(async ({ url, html }) => {
  const thôngTinNơiĐăng = danhSáchNơiĐăng.filter((i) => i.URL === url)[0];
  const metaTagUrlVàDocument = await lấyMetaTagVàTạoDocument(url, html);
  const { meta, document } = metaTagUrlVàDocument;

  console.log("title:", tạoTiêuĐề(thôngTinNơiĐăng, metaTagUrlVàDocument));
  console.log("meta:", meta.og?.title);
  const htmlTitle = document.querySelector("title")?.textContent;
  console.log("html:", htmlTitle);
  console.log("sitename:", meta.og?.site_name);
  // console.log(tnd);
  // console.log(tnt);
  // console.log(i.Slug);
  // console.log(i.URL);
  console.log();
});
