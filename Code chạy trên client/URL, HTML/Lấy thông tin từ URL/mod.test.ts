import { TẬP_TIN_CACHE_HTML } from "../../../Code chạy trên local, server, KV/ĐƯỜNG_DẪN.ts";
import {
  CacheHTML,
  lấyHTMLTừLocal,
  lấyMetaTagVàTạoDocumentTrênLocal,
  lấyURLChínhTắcVàHTMLTừLocal,
} from "../../../Code chạy trên local, server, KV/Hàm cho cache.ts";
import { lấyThôngTinTừUrl } from "./mod.ts";

//deno-fmt-ignore
const urls = [
  // "https://www.facebook.com/qua.cau.the.sphere",
  // "https://www.facebook.com/qua.cau.the.sphere/posts/pfbid0EnMbJtaQ2ZWFGTgqqFsv2HntCmrmYqRKkmGDgxX46fX3ETvKLHwpp9ErtjsYHX72l",
  // "https://www.facebook.com/qua.cau.the.sphere/posts/pfbid0EnMbJtaQ2ZWFGTgqqFsv2HntCmrmYqRKkmGDgxX46fX3ETvKLHwpp9ErtjsYHX72l?comment_id=323075084103411",
  // "https://www.facebook.com/groups/projectcommunity.vn/posts/2331699787028679/?comment_id=2332269553638369&notif_id=1709297755833843&notif_t=group_comment_mention",
  // "https://www.facebook.com/groups/obsidian.secondbrain/posts/798746878792783/",
  // "https://www.facebook.com/quacau.sphere/",
  // "https://www.facebook.com/groups/562933844569060/",
  // "https://www.facebook.com/events/1203432294159071",
  // "https://www.facebook.com/permalink.php?story_fbid=pfbid024Y2xvTL1vgRQejd3whAJfkKgFSVWTqCHJpa8ugPMT672mGe1DDMzhqfdphF3pK8Ml&id=100037812854278",
  // "https://m.facebook.com/story.php?story_fbid=pfbid02VDEJXmeoLGcoeREbJm2V1BQRiGpNVQ2nYGurhQgXa7XQFbNSJE1LD7ZU6EZzK2kxl&id=512837615",
  // "https://www.facebook.com/huylt88/posts/%C4%91%C6%B0a-s%E1%BB%9Bt-b%C3%A1t-v%C3%A0o-l%E1%BA%A1i-cu%E1%BB%99c-s%E1%BB%91ng864-t%E1%BB%AB-3-ph%C3%BAt-%C4%91%E1%BB%8Dct%C3%B4i-l%E1%BB%9Bn-l%C3%AAn-%E1%BB%9F-ch%E1%BB%A3-l%E1%BB%9Bn-trong-k%C3%BD-%E1%BB%A9c-/10160352347137616/",
  // 'https://www.facebook.com/quangdong.ta/posts/pfbid027p4eUygg1MAZ8dmvPeWHkR5ETQ49hjyDh7MgTZTGBzNW8sK2sr1tb4cHwtLd3Em4l',
  // 'https://www.facebook.com/quangdong.ta/posts/cr7-kh%C3%B4ng-ph%E1%BA%A3i-l%C3%A0-x%C3%AA-r%E1%BB%9D-b%E1%BA%A9y-m%C3%A0-l%C3%A0-x%C3%AA-e-r%E1%BB%9D-b%E1%BA%A9y-t%C3%AAn-c%E1%BB%A7a-ch%E1%BB%AF-r-l%C3%A0-e-r%E1%BB%9D-kh%C3%B4ng-ph%E1%BA%A3i-r/8164875740191224/',
//   'https://www.facebook.com/cat.tiensinh/videos/1003254044066366',
// 'https://www.facebook.com/khanhvyofficial/videos/1534519627339156',
//   'https://www.facebook.com/share/v/Chvakc2K9q777WKy/',

//   "https://duyphong1204.notion.site",
// "https://duyphong1204.notion.site/M-nh-c-a-hi-n-t-i-aeb41d0ef8e841489ce618c39af5b6ac?pvs=73",
// "https://duyphong1204.notion.site/Brand-New-Cherry-Flavor-c3ac54c3ad9244cfb24b4c7f208b1330?pvs=73",
  // 'https://kiếmtiền.quảcầu.cc/',
//   'https://zalo.me/412965979141442805',
  // "https://github.com/orgs/QuaCau-TheSphere",
  // "https://github.com/QuaCau-TheSphere/CW-obsidian-quan-ly-du-an-va-cong-cu-nghi",
  // "https://discord.gg/jWTk4EHFK2",
  // "https://www.youtube.com/channel/UCReU_XcmJlp9ORWi8U2O-Fg",
  // "https://youtu.be/rOLGvZagdC0?si=I6VOoQ8pux3mRzAF",
  // "https://quảcầu.cc",
  // "https://obsidian.quảcầu.cc",
  // "https://lậptrình.quảcầu.cc",
  // "https://doi-thoai.deno.dev",
  // "https://tranky.deno.dev",
  // "https://docs.google.com/forms/d/e/1FAIpQLSc0d5gkpeBflyzwzXwBjsOSLT1KN82BBOeNZtZjwHuXd5faSA/viewform",
  // 'https://docs.google.com/spreadsheets/d/1Ahec-7viw04abKIz-x2FzMByux8N_41OoLp0qiRLm5E/edit?gid=0#gid=0',
  // 'https://drive.google.com/file/d/1gIxbgTjeP3XcfAfUU_WlUHdAo5ntFydK/view?usp=drive_link',
  // 'https://drive.google.com/file/d/1gIxbgTjeP3XcfAfUU_WlUHdAo5ntFydK/view?usp=sharing',
  // 'https://docs.google.com/forms/d/e/1FAIpQLSeT6QlGtAtTknBInCT6nmxRJLEm1S_jU6Fb30ub9JsYAQZknw/viewform',
  // 'https://doi-thoai.deno.dev/blog/NhiềuNềnTảng',
  'https://slide.quảcầu.cc/Đáp ứng nhu cầu doanh nghiệp/VNPAY.html'
];
// const url = urls[3];
// const url = "https://www.youtube.com/channel/UCReU_XcmJlp9ORWi8U2O-Fg";
const url = urls[urls.length - 1];
// await chạyMộtUrl(url);
await chạyHếtUrls();
// await chạyToànBộCache();

async function chạyHếtUrls() {
  for (const url of urls) {
    console.log(url);
    await chạyMộtUrl(url);
    console.log();
  }
}

async function chạyToànBộCache() {
  const cache = new Map(Object.entries(JSON.parse(await Deno.readTextFile(TẬP_TIN_CACHE_HTML)))) as CacheHTML;
  cache.forEach((value, key, map) => {
    console.log(key);
    setInterval(async () => await chạyMộtUrl(key), 2000);
  });
}

async function chạyMộtUrl(url: string) {
  let metaTagUrlVàDocument;
  try {
    metaTagUrlVàDocument = await đọcHTMLTừCache(url);
  } catch (error) {
    metaTagUrlVàDocument = await tạoCacheHTML(url);
  }
  const { meta } = metaTagUrlVàDocument;
  const a = lấyThôngTinTừUrl(metaTagUrlVàDocument);
  // console.clear();
  console.log("Meta:", JSON.stringify(meta, null, 2));
  console.log();
  console.info("Thông tin URL:", JSON.stringify(a, null, 2));
  console.log("\n\n");
}

async function tạoCacheHTML(url: string) {
  const đườngDẫnHTML = tạoĐườngDẫnHTML(url);
  const [_, html] = await lấyURLChínhTắcVàHTMLTừLocal(url);
  console.log("🚀 ~ tạoCacheHTML ~ đườngDẫnHTML:", đườngDẫnHTML);
  await Deno.writeTextFile(đườngDẫnHTML, html);
  return await lấyMetaTagVàTạoDocumentTrênLocal(url, html);
}
async function đọcHTMLTừCache(url: string) {
  const đườngDẫnHTML = tạoĐườngDẫnHTML(url);
  const html = await Deno.readTextFile(đườngDẫnHTML);
  return await lấyMetaTagVàTạoDocumentTrênLocal(url, html);
}

function tạoĐườngDẫnHTML(url: string) {
  const origin = new URL(url).origin;
  const tênFile = url.replace(origin, "").replaceAll("/", "-").replaceAll("?", "--");
  return `Code chạy trên client\\URL, HTML\\Lấy thông tin từ URL\\${tênFile}.html`;
}
