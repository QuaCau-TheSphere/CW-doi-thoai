import { walk } from "$std/fs/walk.ts";
import { parse } from "$std/yaml/mod.ts";
import { basename, extname, SEPARATOR } from "$std/path/mod.ts";
import { VậtThểCấuHìnhVịTrí, VịTríThànhPhần } from "./Hàm và kiểu cho vị trí.ts";
import { THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG, TẬP_TIN_CẤU_HÌNH_CHUNG, ĐườngDẫnTuyệtĐối, ĐườngDẫnTươngĐối } from "../../ĐƯỜNG_DẪN.ts";
import {
  CấuHìnhChat,
  CấuHìnhDiễnĐàn,
  CấuHìnhEmail,
  CấuHìnhSaaS,
  CấuHìnhTậpTin,
  CấuHìnhVault,
  CấuHìnhWebsite,
  CấuHìnhẢnh,
  Slug,
} from "./Kiểu cho nơi đăng.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { cấuHìnhChungSignal } from "../../islands/Signals tổng.ts";

export type CấuHìnhViếtTắt = Record<string, string>[] | undefined | null;
export interface CấuHìnhChung {
  "Vị trí đặt liên kết ở nơi đăng": VậtThểCấuHìnhVịTrí[];
  "Vị trí thành phần": Record<string, VịTríThànhPhần[]>;
  "Viết tắt"?: CấuHìnhViếtTắt;
}

export type LoạiCấuHình = "Cá nhân" | "Tổ chức" | "Chủ đề";
export type ThôngTinCấuHìnhNơiĐăng = {
  cấuHình: CấuHìnhNơiĐăng;
  loạiCấuHình: LoạiCấuHình;
  tênCấuHình: string;
};

/** null là để cho việc người dùng khai báo xong để đó */
export default interface CấuHìnhNơiĐăng {
  "Diễn đàn"?: CấuHìnhDiễnĐàn | null;
  Chat?: CấuHìnhChat | null;
  Vault?: CấuHìnhVault | null;
  Website?: CấuHìnhWebsite | null;
  Ảnh?: CấuHìnhẢnh | null;
  Email?: CấuHìnhEmail | null;
  "Tập tin"?: CấuHìnhTậpTin | null;
  SaaS?: CấuHìnhSaaS | null;
  "Kênh forum Discord"?: string[] | null;
  "Slug"?: CấuHìnhSlug;
}
export type CấuHìnhSlug = Record<Slug, string | string[]>;

export async function tạoDanhSáchThôngTinCấuHìnhNơiĐăng(): Promise<ThôngTinCấuHìnhNơiĐăng[]> {
  const danhSáchCấuHình: ThôngTinCấuHìnhNơiĐăng[] = [];

  for await (const walkEntry of walk(THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG)) {
    if (extname(walkEntry.path) === ".yaml") {
      const { name, path } = walkEntry;
      const tênCấuHình = basename(name).replace(".yaml", "");
      if (tênCấuHình.includes("Cấu hình chung")) continue;

      const pathSplit = path.split(SEPARATOR);
      const tênThưMục = pathSplit[pathSplit.length - 2] as LoạiCấuHình;
      const cấuHình = parse(await Deno.readTextFile(path)) as CấuHìnhNơiĐăng;
      danhSáchCấuHình.push({
        cấuHình: cấuHình,
        loạiCấuHình: tênThưMục,
        tênCấuHình: tênCấuHình,
      });
    }
  }
  return danhSáchCấuHình;
}
export function lấyCấuHìnhChung(): CấuHìnhChung {
  if (IS_BROWSER) return cấuHìnhChungSignal.value;
  return parse(Deno.readTextFileSync(TẬP_TIN_CẤU_HÌNH_CHUNG)) as CấuHìnhChung;
}

export async function đọcJSON(đườngDẫn: ĐườngDẫnTươngĐối | ĐườngDẫnTuyệtĐối) {
  return JSON.parse(await Deno.readTextFile(đườngDẫn));
}
