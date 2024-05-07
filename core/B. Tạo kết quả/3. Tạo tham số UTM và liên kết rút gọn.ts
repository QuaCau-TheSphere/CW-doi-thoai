import {
  BàiĐăng,
  DựÁn,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import ThamSốUTMVàLiênKếtRútGọn, {
  Campaign,
  Content,
  Medium,
  Source,
  SourceDiễnĐàn,
  SourceKhác,
  SourceNềnTảngChat,
  Term,
  ThamSốUTM,
  TênNơiĐăngString,
  ĐuôiRútGọn,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import {
  lấyKýHiệuViếtTắt,
  tạoLiênKếtUTM,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Code%20h%E1%BB%97%20tr%E1%BB%A3.ts";
import { BốiCảnh } from "../../utils/Ki%E1%BB%83u%20cho%20web.ts";
import CấuHìnhNơiĐăng, {
  LoạiNơiĐăng,
  LoạiNơiĐăngChat,
  LoạiNềnTảng,
  NơiĐăngĐãXácĐịnhVịTrí,
  TênNơiĐăng,
  TênNềnTảng,
} from "../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { VịTrí } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/H%C3%A0m%20v%C3%A0%20ki%E1%BB%83u%20cho%20v%E1%BB%8B%20tr%C3%AD.ts";

function tạoSource(
  loạiNềnTảng: LoạiNềnTảng,
  tênNềnTảng: TênNềnTảng,
  loạiNơiĐăng: LoạiNơiĐăng,
  tênNơiĐăng: TênNơiĐăng,
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
): Source {
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhNơiĐăng) ||
    tênNềnTảng;
  const tênNơiĐăngString: TênNơiĐăngString = tênNơiĐăng.join(" » ");

  switch (loạiNềnTảng) {
    case "Diễn đàn":
      return tạoSourceDiễnĐàn();
    case "Chat":
      return tạoSourceChat(loạiNơiĐăng as LoạiNơiĐăngChat);
    default:
      return tạoSourceKhác();
  }

  function tạoSourceDiễnĐàn(): SourceDiễnĐàn {
    switch (loạiNơiĐăng[0]) {
      case "Trang":
        return `${kýHiệuNềnTảng} Pg ${tênNơiĐăngString}`;
      case "Tài khoản":
        return `${kýHiệuNềnTảng} Pr ${tênNơiĐăngString}`;
      case "Nhóm":
        return `${kýHiệuNềnTảng} G ${tênNơiĐăngString}`;
      case "Repo":
      case "Subreddit":
      default:
        return `${kýHiệuNềnTảng} ${tênNơiĐăngString}`;
    }
  }

  function tạoSourceChat(loạiNơiĐăng: LoạiNơiĐăngChat): SourceNềnTảngChat {
    switch (loạiNơiĐăng[0]) {
      case "Cá nhân":
        return `${kýHiệuNềnTảng} I ${tênNơiĐăngString}`;
      case "Nhóm" ?? "Kênh":
        return `${kýHiệuNềnTảng} GC ${tênNơiĐăngString}`;
      case "Máy chủ" ?? "Cộng đồng":
        return `${kýHiệuNềnTảng} Sv ${tênNơiĐăngString}`;
      default:
        return `${kýHiệuNềnTảng} ${loạiNơiĐăng[0]} ${tênNơiĐăngString}`;
    }
  }

  function tạoSourceKhác(): SourceKhác {
    switch (loạiNơiĐăng[0]) {
      case "Website" ?? "Email":
        return tênNơiĐăngString;
      case "Ảnh":
        return `Ảnh ${tênNơiĐăngString}`;
      default:
        return tênNơiĐăngString;
    }
  }
}

function tạoMedium(loạiNềnTảng: LoạiNềnTảng): Medium {
  switch (loạiNềnTảng) {
    case "Diễn đàn":
      return "social";
    case "Chat":
      return "chat";
    case "Email":
      return "email";
    default:
      return loạiNềnTảng;
  }
}

/**
 * Tên dự án chính là tên chiến dịch
 */
function tạoCampaign(dựÁn: DựÁn | undefined = undefined): Campaign {
  if (dựÁn) {
    const { "Tên dự án": tênDựÁn, "Mã dự án": mãDựÁn } = dựÁn;
    if (mãDựÁn && tênDựÁn) {
      return `${mãDựÁn} ${tênDựÁn}`;
    } else if (!mãDựÁn && tênDựÁn) {
      return `${tênDựÁn}`;
    } else if (mãDựÁn && !tênDựÁn) {
      return `${mãDựÁn}`;
    } else {
      return undefined;
    }
  }
}

function tạoContent(vịTrí: VịTrí, bốiCảnh: BốiCảnh): Content {
  return `Vị trí: ${vịTrí} | Bối cảnh: ${bốiCảnh}`;
}

function tạoTerm(nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí): Term {
  return nơiĐăng["Lĩnh vực"]?.join(", ");
}

/**
 * Đuôi rút gọn theo cấu trúc sau: `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 * @param bàiĐăng Thứ tự tìm: mã bài đăng, mã dự án, viết tắt của tên dự án, ngẫu nhiên ký tự
 * @param nơiĐăng
 * @param lầnĐăng
 * @param cấuHìnhNơiĐăng dùng để tìm chuỗi viết tắt
 * @returns `phầnChoBàiĐăng.phầnChoNơiĐăng.lầnĐăng`
 */
function tạoĐuôiRútGọn(
  bàiĐăng: BàiĐăng,
  nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí,
  lầnĐăng: number,
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
): ĐuôiRútGọn {
  let phầnChoBàiĐăng: string | undefined;
  let phầnChoNơiĐăng: string;

  const { "Mã bài đăng": mãBàiĐăng, "Dự án": dựÁn } = bàiĐăng;
  if (mãBàiĐăng) {
    phầnChoBàiĐăng = mãBàiĐăng;
  } else if (dựÁn) {
    const { "Mã dự án": mãDựÁn, "Tên dự án": tênDựÁn } = dựÁn;
    phầnChoBàiĐăng = mãDựÁn || lấyKýHiệuViếtTắt(tênDựÁn, cấuHìnhNơiĐăng);
  }
  if (phầnChoBàiĐăng === undefined) {
    phầnChoBàiĐăng = tạoChuỗiNgẫuNhiên(4);
  }

  const { "Mã nơi đăng": mãNơiĐăng, "Tên nơi đăng": tênNơiĐăng } = nơiĐăng;
  phầnChoNơiĐăng = mãNơiĐăng ||
    lấyKýHiệuViếtTắt(tênNơiĐăng[0], cấuHìnhNơiĐăng) ||
    tạoChuỗiNgẫuNhiên(4);

  return `${phầnChoBàiĐăng}.${phầnChoNơiĐăng}.${lầnĐăng}`;

  function tạoChuỗiNgẫuNhiên(n: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let kếtQuả: string = "";
    for (let i = 0; i < n; i++) {
      kếtQuả += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return kếtQuả;
  }
}

export default function tạoThamSốUTMVàLiênKếtRútGọn(
  { bàiĐăng, nơiĐăng, bốiCảnh, lầnĐăng, cấuHìnhNơiĐăng }: {
    bàiĐăng: BàiĐăng;
    nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí;
    bốiCảnh: BốiCảnh;
    lầnĐăng: number;
    cấuHìnhNơiĐăng: CấuHìnhNơiĐăng;
  },
): ThamSốUTMVàLiênKếtRútGọn {
  const {
    "Tên nơi đăng": tênNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nền tảng": loạiNềnTảng,
    "Vị trí": vịTrí,
  } = nơiĐăng;
  const url = bàiĐăng.URL;
  const dựÁn = bàiĐăng["Dự án"];
  const thamSốUTM: ThamSốUTM = {
    source: tạoSource(
      loạiNềnTảng,
      tênNềnTảng,
      loạiNơiĐăng,
      tênNơiĐăng,
      cấuHìnhNơiĐăng,
    ),
    medium: tạoMedium(loạiNềnTảng),
    campaign: tạoCampaign(dựÁn),
    content: tạoContent(vịTrí, bốiCảnh),
    term: tạoTerm(nơiĐăng),
  };
  return {
    "Tham số UTM": thamSốUTM,
    "Liên kết UTM": tạoLiênKếtUTM(url, thamSốUTM),
    "Lần đăng": lầnĐăng,
    "Đuôi rút gọn": tạoĐuôiRútGọn(bàiĐăng, nơiĐăng, lầnĐăng, cấuHìnhNơiĐăng),
  };
}
