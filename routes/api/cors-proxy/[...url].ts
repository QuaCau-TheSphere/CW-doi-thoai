import { Handlers } from "$fresh/server.ts";
import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { BàiĐăng } from "../../../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  LoạiNơiĐăng,
  LoạiNềnTảng,
  NơiĐăng,
  TênNềnTảng,
} from "../../../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { viếtThường } from "../../../utils/Hàm cho khung nhập.ts";
interface MetaTags {
  title: string;
  description: string;
  site_name: string;
  type: string;
  url: string;
  image: string;
  alt: string;
  locale: string;
}

function lấyTitle(title: string): string {
  const titleSplit = title.split(" | ");
  titleSplit.pop();
  return titleSplit.join(" | ");
}

async function lấyMetaTag(
  url: URL,
): Promise<{ bàiĐăng: BàiĐăng; nơiĐăng: NơiĐăng }> {
  const og = (await getMetaTags(url.href)).og as MetaTags;
  const title = lấyTitle(og.title);
  const description = og.description;
  const site_name = og.site_name?.replace("www.", "");

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
    let loạiNềnTảng: LoạiNềnTảng | undefined = undefined;
    let tênNềnTảng: TênNềnTảng | undefined = undefined;
    let loạiNơiĐăng: LoạiNơiĐăng | undefined = undefined;

    //deno-fmt-ignore
    const danhSáchNềnTảng = (danhSáchDiễnĐàn as unknown as TênNềnTảng[]).concat(danhSáchNềnTảngChat);
    for (const nềnTảng of danhSáchNềnTảng) {
      if (hostname.includes(viếtThường(nềnTảng))) {
        tênNềnTảng = nềnTảng;
        if ((danhSáchDiễnĐàn as unknown as TênNềnTảng[]).includes(nềnTảng)) {
          loạiNềnTảng = "Diễn đàn";
          pathname.includes("group")
            ? loạiNơiĐăng = ["Nhóm"]
            : loạiNơiĐăng = ["Trang"];
        } else {
          loạiNềnTảng = "Chat";
          if (hostname.includes("discord")) {
            loạiNơiĐăng = ["Máy chủ", "Kênh thường"];
          }
        }
      }
    }
    return {
      "Tên nơi đăng": [title],
      URL: url,
      "Mô tả nơi đăng": description,
      "Loại nền tảng": loạiNềnTảng ?? "Website",
      "Tên nền tảng": tênNềnTảng ?? "Website",
      "Loại nơi đăng": loạiNơiĐăng ?? ["Website"],
    };
  }
  const nơiĐăng = tạoNơiĐăng();
  console.log("🚀 ~ nơiĐăng:", nơiĐăng);
  return { bàiĐăng: bàiĐăng, nơiĐăng: nơiĐăng };
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
      } catch (e) {
        console.log(JSON.stringify(e));
        return Response.json({
          lỗi: e,
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
