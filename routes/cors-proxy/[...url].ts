import { Handlers } from "$fresh/server.ts";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { BàiĐăng } from "../../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import {
  LoạiNơiĐăng,
  LoạiNềnTảng,
  NơiĐăng,
  TênNềnTảng,
} from "../../core/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

async function lấyMetaTag(url: URL) {
  return (await getMetaTags(url.href)).og as {
    title: string;
    description: string;
    site_name: string;
  };
}
async function tạoBàiĐăngTừURL(url: URL): Promise<BàiĐăng> {
  const { title, description, site_name } = await lấyMetaTag(url);
  return {
    "Tiêu đề": title,
    url: url,
    "Mô tả bài đăng": description,
    Vault: site_name,
  };
}

async function tạoNơiĐăngTừURL(url: URL): Promise<NơiĐăng> {
  const { title, description, site_name } = await lấyMetaTag(url);

  const { hostname, pathname } = new URL(url);
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

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const url = new URL(ctx.params.url);
      const html = await (await fetch(url)).text();
      try {
        const bàiĐăng = await tạoBàiĐăngTừURL(url);
        const nơiĐăng = await tạoNơiĐăngTừURL(url);

        return Response.json({
          "Nếu là bài đăng": bàiĐăng,
          "Nếu là nơi đăng": nơiĐăng,
          html: html,
        });
      } catch {
        return Response.json({
          lỗi:
            "Không lấy được dữ liệu thẻ og:title, og:description hoặc og:site_name Open Graph",
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
