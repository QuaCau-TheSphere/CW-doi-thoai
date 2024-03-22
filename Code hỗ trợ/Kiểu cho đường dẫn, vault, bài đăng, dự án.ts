import { ParsedPath, parse } from "$std/path/mod.ts";

/** Đường dẫn */
export type URLString = string
export type ĐườngDẫnTuyệtĐối = string
export type ĐườngDẫnTươngĐối = string
export type VậtThểĐườngDẫnTuyệtĐối = Readonly<ParsedPath> & { readonly isAbsolute: true };
export type VậtThểĐườngDẫnTươngĐối = Readonly<ParsedPath> & { readonly isAbsolute: false };

export function đọcĐườngDẫn(path: string): VậtThểĐườngDẫnTuyệtĐối | VậtThểĐườngDẫnTươngĐối {
	const parsed = parse(path);
	return Object.assign(parsed, { isAbsolute: parsed.root.length > 0 });
}

/** Vault */
export type TênVault = string
export type MãVault = string
export interface Vault {
    'Tên vault': TênVault,
    'Mã vault': MãVault,
    URL: URLString,
    'Nơi lưu vault': ĐườngDẫnTuyệtĐối,
    'Mô tả vault'?: string
} 

/** Dự án */
export type TênDựÁn = string
export type MãDựÁn = string
export interface DựÁn {
    'Tên dự án': TênDựÁn,
    'Mã dự án': MãDựÁn
}

/** Bài đăng */
export interface YAMLCủaGhiChú {
    title?: string,
    description?: string,
    alias?: string | string[]
    created?: string
    updated?: string
    share?: boolean
} 
export interface BàiĐăng {
    'Tiêu đề': string,
    url: URLString,
    'Mô tả bài đăng'?: string,
    'Dự án': DựÁn 
    'Mã bài đăng'?: string
} 