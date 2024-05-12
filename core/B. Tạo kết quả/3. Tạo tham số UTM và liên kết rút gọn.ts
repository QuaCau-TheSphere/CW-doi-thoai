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
  LoạiNơiĐăngChat,
  LoạiNềnTảng,
  NơiĐăngĐãXácĐịnhVịTrí,
} from "../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { tạoVịTríString } from "../../utils/Hàm cho khung nhập.ts";

function tạoSource(
  nơiĐăng: NơiĐăngĐãXácĐịnhVịTrí,
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
): Source {
  const {
    "Tên nơi đăng": tênNơiĐăng,
    "Loại nơi đăng": loạiNơiĐăng,
    "Tên nền tảng": tênNềnTảng,
    "Loại nền tảng": loạiNềnTảng,
    "Vị trí": vịTrí,
  } = nơiĐăng;
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhNơiĐăng) ||
    tênNềnTảng;
  const tênNơiĐăngString: TênNơiĐăngString = tênNơiĐăng.join(" » ");

  let phầnNềnTảngVàNơiĐăng: string;

  switch (loạiNềnTảng) {
    case "Diễn đàn":
      phầnNềnTảngVàNơiĐăng = tạoSourceDiễnĐàn();
      break;
    case "Chat":
      phầnNềnTảngVàNơiĐăng = `${kýHiệuNềnTảng} ${tênNơiĐăngString}`;
      // phầnNềnTảngVàNơiĐăng = tạoSourceChat(loạiNơiĐăng as LoạiNơiĐăngChat);
      break;
    default:
      phầnNềnTảngVàNơiĐăng = tạoSourceKhác();
      break;
  }

  if (
    vịTrí.length > 1 &&
    vịTrí[0] !== "Bài đăng" && vịTrí[1] !== "Nội dung chính"
  ) {
    return `${phầnNềnTảngVàNơiĐăng} (${tạoVịTríString(vịTrí)})`;
  } else {
    return phầnNềnTảngVàNơiĐăng;
  }

  function tạoSourceDiễnĐàn(): SourceDiễnĐàn {
    switch (loạiNơiĐăng[0]) {
      case "Trang":
        return `${kýHiệuNềnTảng} Pg ${tênNơiĐăngString}`;
      case "Tài khoản":
        return `${kýHiệuNềnTảng} Pr ${tênNơiĐăngString}`;
      case "Nhóm":
        return `${kýHiệuNềnTảng} G ${tênNơiĐăngString}`;
      // case "Repo":
      // case "Subreddit":
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
      case "Máy chủ":
      case "Cộng đồng":
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

function tạoContent(bốiCảnh: BốiCảnh): Content {
  return bốiCảnh;
}

function tạoTerm(lĩnhVực: string[] | undefined): Term {
  if (!lĩnhVực) return undefined;
  return lĩnhVực.join(", ");
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
  const phầnChoNơiĐăng = mãNơiĐăng ||
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
  const url = bàiĐăng.URL;
  const dựÁn = bàiĐăng["Dự án"];
  const loạiNềnTảng = nơiĐăng["Loại nền tảng"];
  const lĩnhVực = nơiĐăng["Lĩnh vực"];

  const thamSốUTM: ThamSốUTM = {
    source: tạoSource(nơiĐăng, cấuHìnhNơiĐăng),
    medium: tạoMedium(loạiNềnTảng),
    campaign: tạoCampaign(dựÁn),
    content: tạoContent(bốiCảnh),
    term: tạoTerm(lĩnhVực),
  };
  return {
    "Tham số UTM": thamSốUTM,
    "Liên kết UTM": tạoLiênKếtUTM(url, thamSốUTM),
    "Lần đăng": lầnĐăng,
    "Đuôi rút gọn": tạoĐuôiRútGọn(bàiĐăng, nơiĐăng, lầnĐăng, cấuHìnhNơiĐăng),
  };
}
