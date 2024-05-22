import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { BàiĐăng, URLString } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { danhSáchDiễnĐàn, danhSáchNềnTảngChat, LoạiNơiĐăng, LoạiNềnTảng, ThôngTinNơiĐăng, TênNềnTảng } from "./Kiểu cho nơi đăng.ts";
import { viếtThường } from "../../utils/Hàm cho khung nhập.ts";
import { assert } from "$std/assert/assert.ts";
import { FreshContext } from "https://deno.land/x/fresh@1.6.8/src/server/mod.ts";
import { CấuHìnhChung, NơiĐăngChưaXácĐịnhVịTrí, tạoNơiĐăngChưaXácĐịnhVịTrí } from "./Hàm và kiểu cho vị trí.tsx";
import { parse } from "$std/yaml/mod.ts";
import { tạoChuỗiNgẫuNhiên } from "./Code hỗ trợ.ts";
import { ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG } from "./env.ts";

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

export function lấyURL(ctx: FreshContext<Record<string, unknown>>) {
  const fullUrl = ctx.url.href;
  const temp = fullUrl.split("/api/cors-proxy/");
  temp.shift();
  const url = temp.join();
  console.log("URL được gửi lên cors proxy:", url);
  return new URL(url);
}

function cóTênNềnTảngTrongHostname(hostname: string, nềnTảng: TênNềnTảng) {
  if (hostname.includes("youtu.be") && nềnTảng === "YouTube") return true;

  const tênNềnTảngViếtThườngKhôngCách = viếtThường(nềnTảng).replaceAll(" ", "");
  return hostname.includes(tênNềnTảngViếtThườngKhôngCách);
}

function lấyTitle(title: string): string {
  const titleSplit = title.split(" | ");
  titleSplit.pop();
  return titleSplit.join(" | ") || title;
}

async function tạoNơiĐăng(
  title: string,
  url: URL,
  description: string,
  hostname: string,
  pathname: string,
): Promise<NơiĐăngChưaXácĐịnhVịTrí> {
  let loạiNềnTảng: LoạiNềnTảng | undefined = undefined;
  let tênNềnTảng: TênNềnTảng | undefined = undefined;
  let loạiNơiĐăng: LoạiNơiĐăng | undefined = undefined;

  const danhSáchNềnTảng = (danhSáchDiễnĐàn as unknown as TênNềnTảng[]).concat(danhSáchNềnTảngChat);
  for (const nềnTảng of danhSáchNềnTảng) {
    if (cóTênNềnTảngTrongHostname(hostname, nềnTảng)) {
      tênNềnTảng = nềnTảng;
      if ((danhSáchDiễnĐàn as unknown as TênNềnTảng[]).includes(nềnTảng)) {
        loạiNềnTảng = "Diễn đàn";
        if (hostname.includes("github")) {
          loạiNơiĐăng = ["Repo"];
        }
        if (hostname.includes("facebook") || hostname.includes("linkedin")) {
          pathname.includes("group") ? loạiNơiĐăng = ["Nhóm"] : loạiNơiĐăng = ["Trang"];
        }
        if (hostname.includes("youtube") || url.href.includes("youtu.be")) {
          if (pathname.includes("playlist")) {
            loạiNơiĐăng = ["Danh sách phát"];
          } else if (pathname.includes("/@")) {
            loạiNơiĐăng = ["Kênh"];
          } else {
            loạiNơiĐăng = ["Video"];
          }
        }
      } else {
        loạiNềnTảng = "Chat";
        if (hostname.includes("discord")) {
          loạiNơiĐăng = ["Máy chủ", "Kênh thường"];
        }
        if (hostname.includes("telegram")) {
          loạiNơiĐăng = ["Nhóm", "Chủ đề"];
        }
      }
    }
  }
  loạiNềnTảng = loạiNềnTảng ?? "Website";
  tênNềnTảng = tênNềnTảng ?? "Website";
  loạiNơiĐăng = loạiNơiĐăng ?? ["Website"];

  const thôngTinNơiĐăng = {
    "Tên nơi đăng": [title],
    URL: url.href,
    "Mô tả nơi đăng": description,
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": loạiNơiĐăng,
    id: tạoChuỗiNgẫuNhiên(4),
  } satisfies ThôngTinNơiĐăng;
  const cấuHìnhVịTrí = parse(await Deno.readTextFile(ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG)) as CấuHìnhChung;

  return tạoNơiĐăngChưaXácĐịnhVịTrí(thôngTinNơiĐăng, cấuHìnhVịTrí);
}

/** Không muốn tách ra thành tạo bài đăng từ URL và tạo nơi đăng từ URL, để chỉ cần cào một lần, cào 2 lần sợ bị chặn */
export async function tạoBàiĐăngHoặcNơiĐăngMớiTừURL(urlString: URLString): Promise<{ bàiĐăng: BàiĐăng; nơiĐăng: NơiĐăngChưaXácĐịnhVịTrí }> {
  const url = new URL(urlString);
  console.info("Tạo bài đăng hoặc nơi đăng mới mới từ URL:", url.href);
  const og = (await getMetaTags(url.href)).og as MetaTags;
  assert(og, `Không lấy được các thẻ Meta cho ${url.href}`);

  const title = lấyTitle(og.title);
  const description = og.description;
  const { hostname, pathname } = new URL(url);

  const bàiĐăng: BàiĐăng = {
    "Tiêu đề": title,
    "URL": url.href,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": description,
    },
    id: tạoChuỗiNgẫuNhiên(4),
  };

  const nơiĐăng = await tạoNơiĐăng(title, url, description, hostname, pathname);
  return { bàiĐăng: bàiĐăng, nơiĐăng: nơiĐăng };
}
