import { BàiĐăng } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { CấuHìnhViếtTắt, NơiĐăngChưaXácĐịnhVịTrí } from "./Hàm và kiểu cho vị trí.tsx";
import { TênDanhSách } from "../../utils/Kiểu cho web.ts";
import { tạoKeyKV } from "../../utils/Hàm và kiểu cho API server.ts";
import * as linkify from "npm:linkifyjs";

export function táchUrlTrongChuỗi(chuỗiCóThểCóUrl: string): [string, string | undefined] {
  if (!chuỗiCóThểCóUrl) return ["", ""];
  console.log("🚀 chuỗiCóThểCóUrl:", chuỗiCóThểCóUrl);
  let chuỗiKhôngCóUrl = chuỗiCóThểCóUrl;
  let url = undefined;
  const urls = linkify.find(chuỗiCóThểCóUrl);
  console.log("🚀 urls:", urls);
  if (urls.length > 0) {
    url = urls[0].href as string;
    console.log("🚀 url:", url);
    chuỗiKhôngCóUrl = chuỗiCóThểCóUrl.replace(url, "").trim();
    if (chuỗiKhôngCóUrl === "") chuỗiKhôngCóUrl = url;
  }
  return [chuỗiKhôngCóUrl, url];
}

/** Tìm trong cấu hình nơi đăng xem từ được kiểm tra có ký hiệu viết tắt không. Nếu không thì trả về undefined */
export function lấyKýHiệuViếtTắt(từĐượcKiểmTra: string | undefined, cấuHìnhViếtTắt: CấuHìnhViếtTắt): string | undefined {
  if (cấuHìnhViếtTắt) {
    for (const danhMụcViếtTắt of cấuHìnhViếtTắt) {
      const từĐượcViếtTắt = Object.keys(danhMụcViếtTắt)[0];
      const từViếtTắt = Object.values(danhMụcViếtTắt)[0];
      if (từĐượcViếtTắt === từĐượcKiểmTra) return từViếtTắt;
    }
  }
  return undefined;
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

export async function xácĐịnhId(
  tênDanhSách: TênDanhSách,
  dữLiệu: BàiĐăng | NơiĐăngChưaXácĐịnhVịTrí | Omit<BàiĐăng, "id"> | Omit<NơiĐăngChưaXácĐịnhVịTrí, "id">,
): Promise<string> {
  //@ts-ignore:
  if (dữLiệu.id) return dữLiệu.id;
  const kv = await Deno.openKv();
  const key = tạoKeyKV(tênDanhSách, dữLiệu as DữLiệu);
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
