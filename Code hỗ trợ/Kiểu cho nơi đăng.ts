import { danhSáchMXH, danhSáchNềnTảngChat } from "./H%E1%BA%B1ng.ts";

export default interface CấuHìnhNơiĐăng {
  'Mạng xã hội': CấuHìnhMXH;
  Chat: CấuHìnhChat;
  Khác: NơiĐăngKhác;
}

export type LoạiNềnTảng = 'Mạng xã hội' | 'Chat' | 'Diễn đàn' | 'Vault' | 'Khác'
export type TênNềnTảng = TênMXH | TênNềnTảngChat | LoạiNơiĐăngKhác //| TênDiễnĐàn | TênVault 
export type LoạiNơiĐăng = LoạiNơiĐăngMXH | LoạiNơiĐăngChat | LoạiNơiĐăngKhác
export type TênNơiĐăng = string
export type NơiĐăng = {
  'Tên nơi đăng': TênNơiĐăng
  'Tên cộng đồng'?: string
  'Loại nơi đăng': LoạiNơiĐăng
  'Tên nền tảng': TênNềnTảng
  'Loại nền tảng': LoạiNềnTảng
}




/**
 * Mạng xã hội 
 * 
 * Không xem subreddit là nhóm hay cộng đồng là máy chủ luôn được vì muốn sau đó xuất ra vẫn giữ tên là subreddit hay cộng động
 */
export type TênMXH = typeof danhSáchMXH[number]
export type LoạiNơiĐăngMXH = 'Nhóm' | 'Trang' | 'Tài khoản' | 'Subreddit'
export type VậtThểNơiĐăngMXH = Record<LoạiNơiĐăngMXH, string[]>
type CấuHìnhMXH = Record<TênMXH, VậtThểNơiĐăngMXH>;

/** 
 * Chat
 */

export type TênNềnTảngChat = typeof danhSáchNềnTảngChat[number] 
type TênMáyChủ = string;
type TênThreadHoặcTopic = string;
type TênKênhMáyChủ = string;
type KênhMáyChủ = TênKênhMáyChủ | Record<TênKênhMáyChủ, TênThreadHoặcTopic[] | null>;
export type MáyChủ = Record<TênMáyChủ, KênhMáyChủ[]>;

export type LoạiNơiĐăngChat = 'Cá nhân' | 'Cộng đồng' | 'Máy chủ' | 'Kênh' | 'Nhóm'
export interface VậtThểNơiĐăngChat {
  'Cá nhân': string[];
  Nhóm: string[];
}

interface CấuHìnhChat {
  Messenger: VậtThểNơiĐăngChat & { 'Cộng đồng': MáyChủ[]; };
  Discord: VậtThểNơiĐăngChat & { 'Máy chủ': MáyChủ[]; };
  Telegram: { 'Cá nhân': string[], Kênh: string[], Nhóm: MáyChủ[] };

  Zalo: VậtThểNơiĐăngChat;
  Viber: VậtThểNơiĐăngChat;
  Reddit: VậtThểNơiĐăngChat;
  LinkedIn: VậtThểNơiĐăngChat;
}

/** 
 * Diễn đàn, vault 
 */

// type TênVault = ''
// type TênDiễnĐàn = ''

/** 
 * Nơi đăng khác 
 */

/** Vì các nơi đăng khác không phải là nền tảng nào, nên dùng luôn loại nơi đăng làm tên nền tảng */
export type LoạiNơiĐăngKhác = 'Website' | 'Email' | 'Ảnh' 
export interface NơiĐăngKhác {
  Website: string[];
  Email: string[];
  Ảnh: string[] ;
}