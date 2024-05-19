import { BàiĐăng, URLString } from "./Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import CấuHìnhNơiĐăng from "./Kiểu cho nơi đăng.ts";
import { LiênKếtUTM, ThamSốUTM } from "./Kiểu cho tham số UTM.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "./Hàm và kiểu cho vị trí.tsx";
import { TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { tạoKeyKV } from "../../utils/Hàm và kiểu cho API server.ts";

/** Tìm trong cấu hình nơi đăng xem từ được kiểm tra có ký hiệu viết tắt không. Nếu không thì trả về undefined */
export function lấyKýHiệuViếtTắt(từĐượcKiểmTra: string | undefined, cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): string | undefined {
  if (cấuHìnhNơiĐăng["Viết tắt"]) {
    for (const danhMụcViếtTắt of cấuHìnhNơiĐăng["Viết tắt"]) {
      const từĐượcViếtTắt = Object.keys(danhMụcViếtTắt)[0];
      const từViếtTắt = Object.values(danhMụcViếtTắt)[0];
      if (từĐượcViếtTắt === từĐượcKiểmTra) return từViếtTắt;
    }
  }
  return undefined;
}

export function tạoLiênKếtUTM(link: URLString, thamSốUTM: ThamSốUTM): LiênKếtUTM {
  const url = new URL(link);
  const { source, medium, campaign, content, term } = thamSốUTM;
  url.searchParams.set("utm_source", source || "");
  url.searchParams.set("utm_medium", medium || "");
  url.searchParams.set("utm_campaign", campaign || "");
  url.searchParams.set("utm_content", content || "");
  url.searchParams.set("utm_term", term || "");
  return url;
}

export function tạoChuỗiNgẫuNhiên(sốKýTự: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let kếtQuả: string = "";
  for (let i = 0; i < sốKýTự; i++) {
    kếtQuả += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return kếtQuả;
}

type DữLiệu = BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí;

export async function xácĐịnhId(tênDanhSách: TênDanhSách, dữLiệu: Omit<BàiĐăng, "id"> | Omit<NơiĐăngChưaXácĐịnhVịTrí, "id">): Promise<string> {
  const kv = await Deno.openKv();
  const key = tạoKeyKV(tênDanhSách, dữLiệu as DữLiệu);
  console.log("🚀 ~ xácĐịnhId ~ key:", key, typeof key);
  const value = (await kv.get(key)).value as DữLiệu | undefined | null;
  return value?.id || tạoChuỗiNgẫuNhiên(4);
}

export type OneKey<K extends string, V = any> = {
  [P in K]: (
    & Record<P, V>
    & Partial<Record<Exclude<K, P>, never>>
  ) extends infer O ? { [Q in keyof O]: O[Q] }
    : never;
}[K];
