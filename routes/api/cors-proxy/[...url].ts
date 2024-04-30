import { Handlers } from "$fresh/server.ts";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { BàiĐăng } from "../../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  LoạiNơiĐăng,
  LoạiNềnTảng,
  NơiĐăng,
  TênNềnTảng,
} from "../../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";

async function lấyMetaTag(
  url: URL,
): Promise<{ bàiĐăng: BàiĐăng; nơiĐăng: NơiĐăng }> {
  const { title, description, site_name } = (await getMetaTags(url.href))
    .og as {
      title: string;
      description: string;
      site_name: string;
    };
  const { hostname, pathname } = new URL(url);

  const bàiĐăng: BàiĐăng = {
    "Tiêu đề": title,
    URL: url,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": description,
    },
    Vault: site_name || hostname,
  };

  function tạoNơiĐăng(): NơiĐăng {
    let tênNềnTảng: TênNềnTảng;
    let loạiNềnTảng: LoạiNềnTảng;
    let loạiNơiĐăng: LoạiNơiĐăng;
    let tênCộngĐồng: string = site_name;

    if (hostname.includes("facebook")) {
      loạiNềnTảng = "Diễn đàn";
      tênNềnTảng = "Facebook";
      if (pathname.includes("group")) {
        loạiNơiĐăng = "Nhóm";
        tênCộngĐồng = ""; //todo
      } else {
        loạiNơiĐăng = "Trang";
      }
    } else if (hostname.includes("discord")) {
      loạiNềnTảng = "Chat";
      tênNềnTảng = "Discord";
      loạiNơiĐăng = "Máy chủ";
    } else {
      loạiNềnTảng = "Khác";
      tênNềnTảng = "Website";
      loạiNơiĐăng = "Website";
    }
    return {
      "Tên nơi đăng": title,
      URL: url,
      "Mô tả nơi đăng": description,
      "Loại nơi đăng": loạiNơiĐăng,
      "Loại nền tảng": loạiNềnTảng,
      "Tên nền tảng": tênNềnTảng,
      "Tên cộng đồng": tênCộngĐồng,
    };
  }
  return { bàiĐăng: bàiĐăng, nơiĐăng: tạoNơiĐăng() };
}

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const url = new URL(ctx.params.url);
      const html = await (await fetch(url)).text();
      try {
        const { bàiĐăng, nơiĐăng } = await lấyMetaTag(url);

        return Response.json({
          "Nếu là bài đăng": bàiĐăng,
          "Nếu là nơi đăng": nơiĐăng,
          html: html,
        });
      } catch {
        return Response.json({
          lỗi: "Không lấy được các thẻ Open Graph",
          html: html,
        });
      }
    } catch {
      return Response.json({
        lỗi: `${ctx.params.url} không phải là URL hợp lệ`,
      });
    }
  },
};
