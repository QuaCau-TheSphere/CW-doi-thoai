import { tạoBàiĐăngTừURL } from "../../../Code hỗ trợ cho client/Tạo bài đăng hoặc nơi đăng từ URL.ts";
// deno-fmt-ignore
const url = "https://www.inkandswitch.com/local-first";
const fetchResult = await fetch(url);
console.log("Status:", fetchResult.status);
const html = await fetchResult.text();
console.log("HTML:", html);
console.log(JSON.stringify(fetchResult, null, 2));
// const url = "https://youtu.be/v3F5Hsua4J4?si=PuQHF7GLWfCzGeKZ";
// const url = "https://www.facebook.com/Cactus2104";
// const url = "https://www.facebook.com/Cactus2104/posts/pfbid0XLHc4EKL25bSxiXv9yuqKNF1JvV3cZkchFjsPuCWfzb3f9WUwzZCLf1xMoQnax7gl?comment_id=678453504365525&reply_comment_id=3323225997979225&notif_id=1714455987822437&notif_t=feed_threaded_comment_reply&ref=notif";
// const url = "https://www.youtube.com/watch?v=gU-8U7Z-E64";
// const url = "https://www.facebook.com/groups/EUPD.VN/";
// const url = "https://www.linkedin.com/in/nh%E1%BA%ADt-l%C3%BD/";

// debugger;
const a = await tạoBàiĐăngTừURL(url);
console.log("🚀 ~ a:", a);
