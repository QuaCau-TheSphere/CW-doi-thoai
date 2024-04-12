import { parse, ParsedPath } from "$std/path/mod.ts";

/** Đường dẫn */
export type URLString = string | URL;
export type ĐườngDẫnTuyệtĐối = string;
export type ĐườngDẫnTươngĐối = string;
export type VậtThểĐườngDẫnTuyệtĐối = Readonly<ParsedPath> & {
  readonly isAbsolute: true;
};
export type VậtThểĐườngDẫnTươngĐối = Readonly<ParsedPath> & {
  readonly isAbsolute: false;
};

export function đọcĐườngDẫn(
  path: string,
): VậtThểĐườngDẫnTuyệtĐối | VậtThểĐườngDẫnTươngĐối {
  const parsed = parse(path);
  return Object.assign(parsed, { isAbsolute: parsed.root.length > 0 });
}

/** Vault */
export type TênVault = string;
export type MãVault = string;
export interface Vault {
  "Tên vault": TênVault;
  "Mã vault": MãVault;
  URL: URLString;
  "Nơi lưu vault": ĐườngDẫnTuyệtĐối;
  "Mô tả vault"?: string;
}

/** Dự án */
export type TênDựÁn = string | undefined;
export type MãDựÁn = string | undefined;
export interface DựÁn {
  "Tên dự án": TênDựÁn;
  "Mã dự án": MãDựÁn;
}

/** Bài đăng */
export interface YAMLCủaGhiChú {
  title?: string;
  description?: string;
  alias?: string | string[];
  created?: string;
  updated?: string;
  share?: boolean;
  "Mã bài đăng"?: string;
}
export class BàiĐăng {
  "Tiêu đề": string;
  URL: URLString;
  "Mô tả bài đăng"?: string;
  "Dự án"?: DựÁn;
  Vault?: string;
  "Mã bài đăng"?: string;

  constructor(
    tiêuĐề: string = "",
    url: URLString = "",
    môTảBàiĐăng: string = "",
    dựÁn: DựÁn = {
      "Mã dự án": "",
      "Tên dự án": "",
    },
    vault: string = "",
    mãBàiĐăng: string = "",
  ) {
    this["Tiêu đề"] = tiêuĐề;
    this.URL = url;
    this["Mô tả bài đăng"] = môTảBàiĐăng;
    this["Dự án"] = dựÁn;
    this.Vault = vault;
    this["Mã bài đăng"] = mãBàiĐăng;
  }
}
