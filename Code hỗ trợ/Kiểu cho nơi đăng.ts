export type DanhSáchNơiĐăng = {
  'Tên nơi đăng': string
  'Tên cộng đồng'?: string
  'Loại nơi đăng': string
  'Tên nền tảng': string
}[] 

/** Mạng xã hội */
type TênMXH = 'Facebook' | 'LinkedIn' | 'Reddit' | 'YouTube' | 'Tinh tế';
interface VậtThểNơiĐăngMXH {
  Nhóm?: string[];
  Trang?: string[];
  'Tài khoản'?: string[];
}
type MạngXãHội = Record<TênMXH, VậtThểNơiĐăngMXH>;

/** Chat */

type TênMáyChủ = string;
type TênThreadHoặcTopic = string;
type TênKênhMáyChủ = string;
type KênhMáyChủ = TênKênhMáyChủ | Record<TênKênhMáyChủ, TênThreadHoặcTopic[] | null>;
export type MáyChủ = Record<TênMáyChủ, KênhMáyChủ[]>;

export interface VậtThểNơiĐăngChat {
  'Cá nhân'?: string[];
  Nhóm?: string[];
}

interface Chat {
  Messenger: VậtThểNơiĐăngChat & { 'Cộng đồng': MáyChủ[]; };
  Discord: VậtThểNơiĐăngChat & { 'Máy chủ': MáyChủ[]; };
  Telegram: { 'Cá nhân': string[], Kênh: string[], Nhóm: MáyChủ[] };

  Zalo: VậtThểNơiĐăngChat;
  Viber: VậtThểNơiĐăngChat;
  'Reddit chat': VậtThểNơiĐăngChat;
}

/** Nơi đăng khác */
interface NơiĐăngKhác {
  Website: string[];
  Email: string[];
  Ảnh: {};
}

export default interface CấuHìnhNơiĐăng {
  'Mạng xã hội': MạngXãHội;
  Chat: Chat;
  Khác: NơiĐăngKhác;
}

