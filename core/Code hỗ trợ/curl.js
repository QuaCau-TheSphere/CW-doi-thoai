import { kv } from "../../env.ts";
const allEntries = await Array.fromAsync(kv.list({ prefix: [] }));
for (const entry of allEntries) {
  console.log("🚀 ~ entry:", entry);
  kv.delete(entry.key);
}

// import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
// import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";

// // const url = "https://www.facebook.com/Cactus2104";
// // deno-fmt-ignore
// // const url = "https://www.facebook.com/Cactus2104/posts/pfbid0XLHc4EKL25bSxiXv9yuqKNF1JvV3cZkchFjsPuCWfzb3f9WUwzZCLf1xMoQnax7gl?comment_id=678453504365525&reply_comment_id=3323225997979225&notif_id=1714455987822437&notif_t=feed_threaded_comment_reply&ref=notif";
// const url = "https://www.youtube.com/watch?v=gU-8U7Z-E64";
// // const url = "https://www.facebook.com/groups/EUPD.VN/";
// // const url = "https://www.linkedin.com/in/nh%E1%BA%ADt-l%C3%BD/";

// const res = await (await fetch(url)).text();
// console.log(res);
// console.log("____________________");

// const document = new DOMParser().parseFromString(res, "text/html");
// const head = document.head;
// const scripts = head.querySelectorAll("script");
// // for (const script of scripts) {
// //   head.removeChild(script);
// // }
// console.log(head.outerHTML);
// // console.log(document.querySelector("title").textContent);

// // const { title, description, site_name } = (await getMetaTags(url.href)).og
// const og = (await getMetaTags(url)).og;
// console.log(JSON.stringify(og, null, 2));
