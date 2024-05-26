import { BàiĐăng, BàiĐăngChưaCóId } from "./Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { TênDanhSách } from "../../Code hỗ trợ cho client/Hàm và kiểu cho khung nhập.ts";
import * as linkify from "npm:linkifyjs";
import { kvGetCount, TableName, tạoKeyKV } from "./Hàm cho KV.ts";
import { viếtHoa } from "../../Code hỗ trợ cho client/Hàm xử lý chuỗi.ts";
import { ThôngTinNơiĐăng, ThôngTinNơiĐăngChưaCóId } from "./Kiểu cho nơi đăng.ts";
import { CấuHìnhViếtTắt } from "./Hàm và kiểu cho cấu hình.ts";

export function táchUrlTrongChuỗi(chuỗiCóThểCóUrl: string): [string, string | undefined] {
  if (!chuỗiCóThểCóUrl) return ["", ""];
  let chuỗiKhôngCóUrl = chuỗiCóThểCóUrl;
  let url = undefined;
  const urls = linkify.find(chuỗiCóThểCóUrl);
  if (urls.length > 0) {
    url = urls[0].href as string;
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

const digit = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
export function đổiTừCơSố10SangCơSố64(x: number) {
  return x.toString(2).split(/(?=(?:.{6})+(?!.))/g).map((v) => digit[parseInt(v, 2)]).join("");
}

export function tạoChuỗiNgẫuNhiên(sốKýTự: number): string {
  let kếtQuả: string = "";
  for (let i = 0; i < sốKýTự; i++) {
    kếtQuả += digit.charAt(Math.floor(Math.random() * digit.length));
  }
  return kếtQuả;
}

function đổiTừCơSố64SangCơSố10(x: string) {
  return x.split("").reduce((s, v) => s * 64 + digit.indexOf(v), 0);
}

/**
 * Việc tạo Id chỉ vào lúc trước khi dữ liệu được đẩy lên KV từ local, hoặc khi người dùng tạo mới trên client. Không tạo id khi mới lấy URL, để tránh tình trạng tạo og xong thì người dùng không làm nữa
 */
export async function kiểmTraIdĐangCó(
  tênDanhSách: TênDanhSách,
  dữLiệu: BàiĐăngChưaCóId | BàiĐăng | ThôngTinNơiĐăngChưaCóId | ThôngTinNơiĐăng,
): Promise<string | undefined> {
  /** Nếu dữ liệu đã có sẵn id thì lấy id đó */
  if ("id" in dữLiệu) return (dữLiệu as BàiĐăng | ThôngTinNơiĐăng).id;

  /** Nếu dữ liệu không có sẵn id thì kiểm tra id trên KV */
  const kv = await Deno.openKv();
  const key = tạoKeyKV(tênDanhSách, dữLiệu);
  const value = (await kv.get(key)).value as BàiĐăng | ThôngTinNơiĐăng | undefined | null;
  if (value && value.id) return value.id;

  /** Nếu trên KV không có dữ liệu thì dùng tổng số entry hiện tại rồi cộng thêm 1 */
  const tổngSốEntryHiệnTại = await kvGetCount(viếtHoa(tênDanhSách) as TableName, kv);
  console.log("🚀 ~ tổngSốEntryHiệnTại:", tổngSốEntryHiệnTại);
  if (tổngSốEntryHiệnTại) return đổiTừCơSố10SangCơSố64(tổngSốEntryHiệnTại + 1);
}

export type OneKey<K extends string, V = any> = {
  [P in K]: (
    & Record<P, V>
    & Partial<Record<Exclude<K, P>, never>>
  ) extends infer O ? { [Q in keyof O]: O[Q] }
    : never;
}[K];
