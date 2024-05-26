import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { BàiĐăngChưaCóId, URLString } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import {
  danhSáchDiễnĐàn,
  danhSáchNềnTảngChat,
  LoạiNơiĐăng,
  LoạiNềnTảng,
  ThôngTinNơiĐăngChưaCóId,
  TênNềnTảng,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { viếtThường } from "./Hàm xử lý chuỗi.ts";
import { assert } from "$std/assert/assert.ts";
import {
  NơiĐăngCóCácLựaChọnVịTríChưaCóId,
  tạoNơiĐăngCóCácLựaChọnVịTrí,
} from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { tạoMãNơiĐăng, TừĐiểnMãNơiĐăng } from "../Tạo bài đăng và nơi đăng/B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/Tạo mã nơi đăng.ts";

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

/**
 * @param [từĐiểnMãNơiĐăng=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển mã nơi đăng
 */
export async function tạoNơiĐăngTừURL(
  urlString: URL,
  từĐiểnMãNơiĐăng: TừĐiểnMãNơiĐăng | undefined = undefined,
): Promise<NơiĐăngCóCácLựaChọnVịTríChưaCóId> {
  const url = new URL(urlString);
  console.info("Tạo nơi đăng mới từ URL:", url.href);
  const og = (await getMetaTags(url.href)).og as MetaTags;
  assert(og, `Không lấy được các thẻ Meta cho ${url.href}`);

  const { hostname, pathname } = url;

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

  const thôngTinNơiĐăngChưaCóId: ThôngTinNơiĐăngChưaCóId = {
    "Tên nơi đăng": [lấyTitle(og.title)],
    URL: url.href,
    "Mô tả nơi đăng": og.description,
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": loạiNơiĐăng,
  };
  const thôngTinNơiĐăng = {
    ...thôngTinNơiĐăngChưaCóId,
    "Mã nơi đăng": tạoMãNơiĐăng(thôngTinNơiĐăngChưaCóId, từĐiểnMãNơiĐăng),
  };
  return tạoNơiĐăngCóCácLựaChọnVịTrí(thôngTinNơiĐăng);
}

export async function tạoBàiĐăngTừURL(urlString: URLString): Promise<BàiĐăngChưaCóId> {
  const url = new URL(urlString);
  console.info("Tạo bài đăng mới từ URL:", url.href);
  const og = (await getMetaTags(url.href)).og as MetaTags;
  assert(og, `Không lấy được các thẻ Meta cho ${url.href}`);

  return {
    "Tiêu đề": lấyTitle(og.title),
    "URL": url.href,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": og.description,
    },
  };
}
