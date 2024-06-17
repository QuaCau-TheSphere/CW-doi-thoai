import { MetaTagUrlVàDocument } from "../Hàm và kiểu cho dữ liệu meta.ts";

interface ThôngTinNhómTrangTàiKhoảnSựKiệnFacebook {
  tên?: string;
  avatar?: string;
  slug?: string;
  môTả?: string;
  tàiKhoảnTạo?: string;
  ngàyTạo?: string;
  id?: string | null;
  ảnh?: string;
}
export type NhómFacebook = ThôngTinNhómTrangTàiKhoảnSựKiệnFacebook;
export type TàiKhoảnFacebook = ThôngTinNhómTrangTàiKhoảnSựKiệnFacebook;
export type SựKiệnFacebook = ThôngTinNhómTrangTàiKhoảnSựKiệnFacebook;
export type TrangFacebook = ThôngTinNhómTrangTàiKhoảnSựKiệnFacebook & { sốLượtThích?: number };

type NhómTrangTàiKhoảnSựKiệnFacebook = { Nhóm: NhómFacebook } | { Trang: TrangFacebook } | { "Tài khoản": TàiKhoảnFacebook } | {
  "Sự kiện": SựKiệnFacebook;
};
interface ThôngTinBàiĐăngBìnhLuậnFacebook {
  tiêuĐề?: string;
  nộiDung?: string;
  ảnh?: string;
  tácGiảNộiDung?: string;
  tàiKhoảnĐăng?: string;
  ngàyĐăng?: string;
  id?: string | null;
}

interface BàiĐăng {
  "Bài đăng": ThôngTinBàiĐăngBìnhLuậnFacebook;
}
interface BìnhLuận {
  "Bình luận": ThôngTinBàiĐăngBìnhLuậnFacebook;
}

type ThôngTinUrlFacebook = NhómTrangTàiKhoảnSựKiệnFacebook | BàiĐăng | BìnhLuận;

function xửLýNhómTrangTàiKhoản(metaTagUrlVàDocument: MetaTagUrlVàDocument): NhómTrangTàiKhoảnSựKiệnFacebook {
  const { meta, url } = metaTagUrlVàDocument;
  const { pathname } = url;

  const description = meta.og?.description!;
  const ogTitle = meta.og?.title;
  const ogImage = meta.og?.image as string;
  const alUrl = meta.al?.url;
  const descriptionSplitByDot = description?.split(". ");
  const pathnameSplitBySlash = pathname.split("/");

  const làNhóm = pathname.includes("group");
  const làProfile = alUrl?.includes("profile");
  const làTrang = làProfile && descriptionSplitByDot?.length > 0 ? descriptionSplitByDot[1]?.includes("lượt thích") : false;

  if (làNhóm) {
    return {
      Nhóm: {
        tên: ogTitle?.replace(" | Facebook", "") || "",
        môTả: description,
        avatar: ogImage,
        slug: pathnameSplitBySlash[2],
        id: new URL(alUrl).searchParams.get("id"),
      },
    };
  }
  if (làProfile) {
    const slug = pathnameSplitBySlash[1];
    if (làTrang) {
      return {
        Trang: {
          tên: ogTitle,
          sốLượtThích: parseInt(descriptionSplitByDot[1].split(" ")[0].replace(".", "")),
          môTả: descriptionSplitByDot[2],
          avatar: ogImage,
          slug: slug,
        },
      };
    }
    const alUrlSplitBySlash = alUrl?.split("/");
    return {
      "Tài khoản": {
        tên: ogTitle,
        id: alUrlSplitBySlash[alUrlSplitBySlash.length - 1],
        avatar: ogImage,
        slug: slug,
      },
    };
  }
  return {
    "Sự kiện": {
      tên: ogTitle,
      ảnh: ogImage,
      môTả: meta.og?.description,
    },
  };
}

function xửLýBàiĐăng(metaTagUrlVàDocument: MetaTagUrlVàDocument): BàiĐăng {
  const { meta, url } = metaTagUrlVàDocument;
  const { pathname, searchParams } = url;
  const pathnameSplitBySlash = pathname.split("/");

  const description = meta.og?.description!;
  const ogImage = meta.og?.image as string;

  const descriptionSplitByNewLine = description?.split("\n");
  let tiêuĐề = "";
  let nộiDung = description;
  if (description?.includes("\n")) {
    tiêuĐề = descriptionSplitByNewLine[0].replace(/^#/g, "").trim();
    descriptionSplitByNewLine.shift()!;
    nộiDung = descriptionSplitByNewLine.join(" ").replace(/\s\s+/g, " ").trim();
  }
  return {
    "Bài đăng": {
      tiêuĐề: tiêuĐề,
      nộiDung: nộiDung,
      ảnh: ogImage,
      id: lấyIdBàiĐăngFacebook(searchParams, pathnameSplitBySlash),
    },
  };
}

function lấyIdBàiĐăngFacebook(searchParams: URLSearchParams, pathnameSplitBySlash: string[]): string | null | undefined {
  if (searchParams.has("id")) return searchParams.get("id");
  return !Number.isNaN(parseInt(pathnameSplitBySlash[3])) ? pathnameSplitBySlash[3] : pathnameSplitBySlash[4];
}

function xửLýBìnhLuận(metaTagUrlVàDocument: MetaTagUrlVàDocument): ThôngTinUrlFacebook {
  const { meta, url } = metaTagUrlVàDocument;
  const { pathname, searchParams } = url;
  const pathnameSplitBySlash = pathname.split("/");

  const description = meta.og?.description!;
  const ogTitle = meta.og?.title;
  const alUrl = meta.al?.url;

  return {
    // nhóm: {
    //   slug: pathnameSplitBySlash[2],
    //   id: new URL(alUrl).searchParams.get("id"),
    // },
    // bàiĐăng: {
    //   id: pathnameSplitBySlash[4],
    // },
    "Bình luận": {
      nộiDung: description,
      tácGiảNộiDung: ogTitle,
      tàiKhoảnĐăng: ogTitle,
      id: searchParams.get("comment_id"),
    },
  };
}

export function thôngTinUrlFacebook(metaTagUrlVàDocument: MetaTagUrlVàDocument): ThôngTinUrlFacebook {
  const { pathname, searchParams } = metaTagUrlVàDocument.url;

  const làBìnhLuận = searchParams.has("comment_id");
  const làBàiĐăng = pathname.includes("posts") || searchParams.has("story_fbid");

  if (làBìnhLuận) return xửLýBìnhLuận(metaTagUrlVàDocument);
  if (làBàiĐăng) return xửLýBàiĐăng(metaTagUrlVàDocument);
  return xửLýNhómTrangTàiKhoản(metaTagUrlVàDocument);
}
