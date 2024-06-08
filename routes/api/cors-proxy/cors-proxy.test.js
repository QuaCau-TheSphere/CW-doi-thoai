import { load } from "$std/dotenv/mod.ts";
import { tạoUrlCorsProxy } from "../../../Code hỗ trợ cho client/Hàm và kiểu cho URL.ts";
// const url = "https://youtu.be/v3F5Hsua4J4?si=PuQHF7GLWfCzGeKZ";
// const url = "https://www.facebook.com/Cactus2104";
// deno-fmt-ignore
// const url = "https://www.facebook.com/Cactus2104/posts/pfbid0XLHc4EKL25bSxiXv9yuqKNF1JvV3cZkchFjsPuCWfzb3f9WUwzZCLf1xMoQnax7gl?comment_id=678453504365525&reply_comment_id=3323225997979225&notif_id=1714455987822437&notif_t=feed_threaded_comment_reply&ref=notif";
// const url = "https://www.youtube.com/watch?v=gU-8U7Z-E64";
// const url = "https://www.facebook.com/groups/EUPD.VN/";
// const url = "https://www.linkedin.com/in/nh%E1%BA%ADt-l%C3%BD/";
// const url = "https://docs.google.com/forms/d/e/1FAIpQLSeIYwh8-76fFxqDROZo3lLWC2KBp3xlT72VRokR4KJf0E7dew/viewform";
const url = "https://www.inkandswitch.com/local-first";
// await fetchTrựcTiếp();
await fetchQuaAPI();

// debugger;

async function fetchTrựcTiếp() {
  const fetchResult = await fetch(url);
  console.log("Status:", fetchResult.status);
  const html = await fetchResult.text();
  console.log("HTML:", html);
  console.log(JSON.stringify(fetchResult, null, 2));
}
async function fetchQuaAPI() {
  const env = await load();
  const urlCorsProxy = tạoUrlCorsProxy(url, env["ORIGIN"]);
  console.log("🚀 ~ fetchQuaAPI ~ urlCorsProxy:", urlCorsProxy);
  const fetchResult = await fetch(urlCorsProxy);
  const html = await fetchResult.text();

  console.log("Status:", fetchResult.status);
  console.log("HTML:", html);
  console.log(JSON.stringify(fetchResult, null, 2));
}
