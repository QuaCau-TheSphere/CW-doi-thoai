import { getMetaTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";
import { BàiĐăngChưaCóId, URLString } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { danhSáchDiễnĐàn, danhSáchNềnTảngChat, LoạiNơiĐăng, LoạiNềnTảng, ThôngTinNơiĐăngChưaCóId, TênNềnTảng } from "./Kiểu cho nơi đăng.ts";
import { viếtThường } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { NơiĐăngCóCácLựaChọnVịTríChưaCóId, tạoNơiĐăngCóCácLựaChọnVịTrí } from "./Hàm và kiểu cho vị trí.ts";
import { tạoMãNơiĐăng, TừĐiểnMãNơiĐăng } from "../B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/Tạo mã nơi đăng.ts";
import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";
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
async function tạoOgVàDOM(urlString: URLString) {
  const url = new URL(urlString);
  const html = await (await fetch(url)).text();
  const og = (await getMetaTags(html)).og as MetaTags | undefined;
  console.error(`Không lấy được các thẻ Meta cho ${url.href}`);
  const dom = new DOMParser().parseFromString(html, "text/html");
  return { og, url, dom };
}

function cóTênNềnTảngTrongHostname(hostname: string, nềnTảng: TênNềnTảng) {
  if (hostname.includes("youtu.be") && nềnTảng === "YouTube") return true;

  const tênNềnTảngViếtThườngKhôngCách = viếtThường(nềnTảng).replaceAll(" ", "");
  return hostname.includes(tênNềnTảngViếtThườngKhôngCách);
}

function lấyTitle(og: MetaTags | undefined, dom: HTMLDocument): string {
  const title = og?.title || dom.querySelector("title")?.textContent;
  if (!title) return "";
  const titleSplit = title.split(" | ");
  titleSplit.pop();
  return titleSplit.join(" | ") || title;
}

function lấyTênMiền(hostname: string) {
  const TLDs = new RegExp(
    /\.(com|net|org|biz|ltd|plc|edu|mil|asn|adm|adv|arq|art|bio|cng|cnt|ecn|eng|esp|etc|eti|fot|fst|g12|ind|inf|jor|lel|med|nom|ntr|odo|ppg|pro|psc|psi|rec|slg|tmp|tur|vet|zlg|asso|presse|k12|gov|muni|ernet|res|store|firm|arts|info|mobi|maori|iwi|travel|asia|web|tel)(\.[a-z]{2,3})?$|(\.[^\.]{2,3})(\.[^\.]{2,3})$|(\.[^\.]{2})$/,
  );
  return hostname.replace(TLDs, "").split(".").pop();
}

function lấyMôTả(og: MetaTags | undefined, dom: HTMLDocument): string | null | undefined {
  return og?.description || dom.querySelector("p")?.textContent;
}

function tạoSlug({ hostname, pathname }: URL) {
  const làDiễnĐàn = (danhSáchDiễnĐàn as unknown as string[]).includes(hostname);
  const làNềnTảngChat = (danhSáchNềnTảngChat as unknown as string[]).includes(hostname);

  if (!làDiễnĐàn && !làNềnTảngChat) {
    const tênMiền = lấyTênMiền(hostname);
    const slugWebsiteCóSẵn = pathname.substring(1);
    return `${tênMiền}-${slugWebsiteCóSẵn}`;
  }
  return undefined;
}

/**
 * @param [từĐiểnMãNơiĐăng=undefined] nếu là undefined nghĩa là URL là do người dùng nhập chứ không phải được khai báo sẵn, nên từ đầu đã không có từ điển mã nơi đăng
 */
export async function tạoNơiĐăngTừURL(
  urlString: URLString,
  từĐiểnMãNơiĐăng: TừĐiểnMãNơiĐăng | undefined = undefined,
): Promise<NơiĐăngCóCácLựaChọnVịTríChưaCóId> {
  console.info("Tạo nơi đăng mới từ URL:", urlString.toString());
  const { og, url, dom } = await tạoOgVàDOM(urlString);
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
    "Tên nơi đăng": [lấyTitle(og, dom)],
    URL: url.href,
    "Mô tả nơi đăng": lấyMôTả(og, dom),
    "Loại nền tảng": loạiNềnTảng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Phương thức tạo": "Người dùng nhập tay trên web",
  };
  const thôngTinNơiĐăng = {
    ...thôngTinNơiĐăngChưaCóId,
    "Mã nơi đăng": tạoMãNơiĐăng(thôngTinNơiĐăngChưaCóId, từĐiểnMãNơiĐăng),
  };
  return tạoNơiĐăngCóCácLựaChọnVịTrí(thôngTinNơiĐăng);
}

export async function tạoBàiĐăngTừURL(urlString: URLString): Promise<BàiĐăngChưaCóId> {
  console.info("Tạo bài đăng mới từ URL:", urlString.toString());
  const { og, url, dom } = await tạoOgVàDOM(urlString);

  return {
    "Tiêu đề": lấyTitle(og, dom),
    "URL": url.href,
    "Nội dung bài đăng": {
      "Mô tả bài đăng": lấyMôTả(og, dom),
    },
    Slug: tạoSlug(url),
    "Phương thức tạo": "Người dùng nhập tay trên web",
  };
}
