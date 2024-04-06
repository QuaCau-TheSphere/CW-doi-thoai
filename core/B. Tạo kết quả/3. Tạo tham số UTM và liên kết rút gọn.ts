import {
  BàiĐăng,
  DựÁn,
  MãDựÁn,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, {
  LoạiNơiĐăng,
  LoạiNềnTảng,
  NơiĐăng,
  TênNơiĐăng,
  TênNềnTảng,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import ThamSốUTMVàLiênKếtRútGọn, {
  Campaign,
  Content,
  Medium,
  Source,
  SourceKhác,
  Term,
  ThamSốUTM,
  ĐuôiRútGọn,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import { SourceDiễnĐàn } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import { SourceNềnTảngChat } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import {
  lấyKýHiệuViếtTắt,
  tạoLiênKếtUTM,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Code%20h%E1%BB%97%20tr%E1%BB%A3.ts";

export function tạoSource(
  loạiNềnTảng: LoạiNềnTảng,
  tênNềnTảng: TênNềnTảng,
  loạiNơiĐăng: LoạiNơiĐăng,
  tênNơiĐăng: TênNơiĐăng,
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
): Source {
  const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhNơiĐăng);
  switch (loạiNềnTảng) {
    case "Diễn đàn":
      return tạoSourceDiễnĐàn();
    case "Chat":
      return tạoSourceNềnTảngChat();
    case "Vault":
      return tạoSourceVault();
    case "Khác":
      return tạoSourceKhác();
    default:
      return undefined;
  }

  function tạoSourceDiễnĐàn(): SourceDiễnĐàn {
    switch (loạiNơiĐăng) {
      case "Trang":
        return `${kýHiệuNềnTảng} Pg ${tênNơiĐăng}`;
      case "Tài khoản":
        return `${kýHiệuNềnTảng} Pr ${tênNơiĐăng}`;
      case "Nhóm":
        return `${kýHiệuNềnTảng} G ${tênNơiĐăng}`;
      case "Repo":
        return `${kýHiệuNềnTảng} ${tênNơiĐăng}`;
      case "Subreddit":
        return `${kýHiệuNềnTảng} ${tênNơiĐăng}`;
      default:
        return undefined;
    }
  }
  function tạoSourceNềnTảngChat(): SourceNềnTảngChat {
    switch (loạiNơiĐăng) {
      case "Cá nhân":
        return `${kýHiệuNềnTảng} I ${tênNơiĐăng}`;
      case "Nhóm" || "Kênh":
        return `${kýHiệuNềnTảng} GC ${tênNơiĐăng}`;
      case "Máy chủ" || "Cộng đồng":
        return `${kýHiệuNềnTảng} Sv ${tênNơiĐăng}`;
      default:
        return undefined;
    }
  }

  function tạoSourceKhác(): SourceKhác {
    switch (loạiNơiĐăng) {
      case "Website" || "Email":
        return tênNơiĐăng;
      case "Ảnh":
        return `Ảnh ${tênNơiĐăng}`;
      default:
        return undefined;
    }
  }
  function tạoSourceVault(): Source {
    throw new Error("Function not implemented.");
  }
}

function tạoMedium(loạiNơiĐăng: LoạiNơiĐăng, loạiNềnTảng: LoạiNềnTảng): Medium {
  switch (loạiNềnTảng) {
    case "Diễn đàn":
      return "social";
    case "Chat":
      return "chat";
  }
  switch (loạiNơiĐăng) {
    case "Email":
      return "email";
  }
  // case 'quacau.deno.dev':
  //     return 'redirect'
  return undefined;
}

/**
 * Tên dự án chính là tên chiến dịch
 */
function tạoCampaign(dựÁn: DựÁn): Campaign {
  return `${dựÁn["Mã dự án"]} ${dựÁn["Tên dự án"]}`;
}

function tạoContent(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng): Content {
  return; //TODO
}

function tạoTerm(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng): Term {
  return; //TODO
}

/** Nếu ký hiệu viết tắt có ít hơn 8 ký tự thì dùng trong đuôi rút gọn luôn, còn không thì tạo ngẫu nhiên 3 ký tự */
function tạoĐuôiRútGọn(
  mãDựÁn: MãDựÁn,
  tênNơiĐăng: TênNơiĐăng,
  lầnĐăng: number,
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
): ĐuôiRútGọn {
  const tênNơiĐăngViếtTắt = lấyKýHiệuViếtTắt(tênNơiĐăng, cấuHìnhNơiĐăng);

  let tênNơiĐăngRútGọn: string = "";
  if (tênNơiĐăngViếtTắt.length < 7) {
    tênNơiĐăngRútGọn = tênNơiĐăngViếtTắt;
  } else {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < 3; i++) {
      tênNơiĐăngRútGọn += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
  }
  return `${mãDựÁn}${tênNơiĐăngRútGọn}${lầnĐăng}`;
}

export default function tạoThamSốUTMVàLiênKếtRútGọn(
  bàiĐăng: BàiĐăng,
  nơiĐăng: NơiĐăng,
  lầnĐăng: number,
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
): ThamSốUTMVàLiênKếtRútGọn {
  const tênNềnTảng = nơiĐăng["Tên nền tảng"];
  const loạiNơiĐăng = nơiĐăng["Loại nơi đăng"];
  const tênNơiĐăng = nơiĐăng["Tên nơi đăng"];
  const loạiNềnTảng = nơiĐăng["Loại nền tảng"];

  const url = bàiĐăng.url;
  const dựÁn = bàiĐăng["Dự án"];
  const mãDựÁn = bàiĐăng["Dự án"]["Mã dự án"];
  const thamSốUTM: ThamSốUTM = {
    source: tạoSource(
      loạiNềnTảng,
      tênNềnTảng,
      loạiNơiĐăng,
      tênNơiĐăng,
      cấuHìnhNơiĐăng,
    ),
    medium: tạoMedium(loạiNơiĐăng, loạiNềnTảng),
    campaign: tạoCampaign(dựÁn),
    content: tạoContent(nơiĐăng, bàiĐăng),
    term: tạoTerm(nơiĐăng, bàiĐăng),
  };
  return {
    "Tham số UTM": thamSốUTM,
    "Liên kết UTM": tạoLiênKếtUTM(url, thamSốUTM),
    "Lần đăng": lầnĐăng,
    "Đuôi rút gọn": tạoĐuôiRútGọn(mãDựÁn, tênNơiĐăng, lầnĐăng, cấuHìnhNơiĐăng),
  };
}
