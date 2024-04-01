import { Handlers, PageProps } from "$fresh/server.ts";
import ThamSốUTMVàLiênKếtRútGọn from "../../Code hỗ trợ/Kiểu cho tham số UTM.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const kv = await Deno.openKv();
    const đuôiRútGọn = new URL(req.url).pathname;
    const a = await kv.get(["preferences", "ada"]);
    console.log(a);
    return ctx.render({ a });
    const thamSốUTMVàLiênKếtRútGọn =
      //   (await kv.get(["Đuôi rút gọn", đuôiRútGọn]))
      (await kv.get(["Phần rút gọn", "chưaLàmLiênKếtRútGọn"]))
        .value as ThamSốUTMVàLiênKếtRútGọn;
    if (thamSốUTMVàLiênKếtRútGọn) {
      const liênKếtUTM = thamSốUTMVàLiênKếtRútGọn["Liên kết UTM"];
      return ctx.render({ liênKếtUTM });
    } else return new Response(JSON.stringify(thamSốUTMVàLiênKếtRútGọn));
  },
};

export default function Home({ data }: PageProps) {
  return (
    <div>
      {/* {data.thamSốUTMVàLiênKếtRútGọn} */}
      {JSON.stringify(data.a)}
    </div>
  );
}
