import { Handlers } from "$fresh/server.ts";
import { ReqBàiĐăngHoặcNơiĐăngTạoMới, thêmBàiĐăngHoặcNơiĐăngMớiVàoKV } from "../../utils/Hàm và kiểu cho API server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const kv = await Deno.openKv();
    const bàiĐăngHoặcNơiĐăngTạoMới = await req.json() as ReqBàiĐăngHoặcNơiĐăngTạoMới;
    const key = await thêmBàiĐăngHoặcNơiĐăngMớiVàoKV(bàiĐăngHoặcNơiĐăngTạoMới, kv);
    return Response.json(await kv.get(key));
  },
};
