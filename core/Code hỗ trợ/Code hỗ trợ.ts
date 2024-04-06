import { URLString } from "./Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import {
  LiênKếtUTM,
  ThamSốUTM,
} from "./Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";

export function lấyKýHiệuViếtTắt(
  từĐượcKiểmTra: string,
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
) {
  if (cấuHìnhNơiĐăng["Viết tắt"]) {
    for (const danhMụcViếtTắt of cấuHìnhNơiĐăng["Viết tắt"]) {
      const từĐượcViếtTắt = Object.keys(danhMụcViếtTắt)[0];
      const từViếtTắt = Object.values(danhMụcViếtTắt)[0];
      if (từĐượcViếtTắt === từĐượcKiểmTra) {
        return từViếtTắt;
      }
    }
    return từĐượcKiểmTra;
  } else return từĐượcKiểmTra;
}

export function tạoLiênKếtUTM(
  link: URLString,
  thamSốUTM: ThamSốUTM,
): LiênKếtUTM {
  const url = new URL(link);
  const { source, medium, campaign, content, term } = thamSốUTM;
  url.searchParams.set("utm_source", source || "");
  url.searchParams.set("utm_medium", medium || "");
  url.searchParams.set("utm_campaign", campaign || "");
  url.searchParams.set("utm_content", content || "");
  url.searchParams.set("utm_term", term || "");

  return url;
}
