/** API để mỗi khi người dùng chọn xong bài đăng và nơi đăng thì biết được đó là lần đăng thứ mấy
 * @see tìmVậtThểTiếpThịĐãCó
 */

import { Handlers } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../../Code hỗ trợ cho client/Hàm và kiểu cho vật thể tiếp thị.ts";
import { kvList } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const bàiĐăngVàNơiĐăngTừRequest = await req.json();
    /** Vì tất cả cái này đều đã được stringify trước khi trở thành request, và cần để ở dạng này để có thể so sánh giống nhau ở dưới, nên không thể gán kiểu { "Bài đăng": BàiĐăng, "Nơi đăng": NơiĐăngĐãXácĐịnhVịTrí } được*/
    const {
      "Bài đăng": { "URL": urlBàiĐăng },
      "Nơi đăng": {
        "Loại nền tảng": loạiNềnTảng,
        "Tên nền tảng": tênNềnTảng,
        "Tên nơi đăng": tênNơiĐăng,
        "Loại nơi đăng": loạiNơiĐăng,
        "Vị trí": vịTrí,
      },
    } = bàiĐăngVàNơiĐăngTừRequest;

    const tấtCảVậtThểTiếpThịĐangCó = await kvList(
      { prefix: ["Đuôi rút gọn"] },
      "POST handler trong routes\\api\\tìm-vật-thể-tiếp-thị-đã-có.ts",
    ) as Deno.KvEntry<VậtThểTiếpThị>[];
    const filtered = tấtCảVậtThểTiếpThịĐangCó.filter((i) => {
      const j = i.value as VậtThểTiếpThị;
      if (j["Bài đăng"]["URL"] !== urlBàiĐăng) return false;
      if (j["Nơi đăng"]["Loại nền tảng"] !== loạiNềnTảng) return false;
      if (j["Nơi đăng"]["Tên nền tảng"] !== tênNềnTảng) return false;
      if (JSON.stringify(j["Nơi đăng"]["Tên nơi đăng"]) !== JSON.stringify(tênNơiĐăng)) return false;
      if (JSON.stringify(j["Nơi đăng"]["Loại nơi đăng"]) !== JSON.stringify(loạiNơiĐăng)) return false;

      /** Không dùng vị trí để so sánh, vì khác vị trí cũng tính là đã có đăng ở đó một lần rồi */
      // if (JSON.stringify(j["Nơi đăng"]["Vị trí"]) !== JSON.stringify(vịTrí)) {
      //   return false;
      // }
      return true;
    });
    if (filtered.length === 0) {
      return new Response(
        "Không tìm thấy vật thể tiếp thị nào trước đây đã từng tạo mà có cùng URL của bài đăng, loại nền tảng, tên nền tảng, tên nơi đăng, loại nơi đăng như vật thể tiếp thị trong request",
      );
    } else {
      /** Nếu có nhiều vật thể tiếp thị có cùng lần đăng lớn nhất thì lấy cái đầu tiên tìm được
       * https://stackoverflow.com/a/34087850/3416774
       */
      const vậtThểTiếpThịCóLầnĐăngLớnNhất = filtered.reduce((prev, current) =>
        (prev && prev.value["Lần đăng"] > current.value["Lần đăng"]) ? prev : current
      );
      return Response.json(vậtThểTiếpThịCóLầnĐăngLớnNhất);
    }
  },
};
