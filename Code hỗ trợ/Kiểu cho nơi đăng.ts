export type DanhSáchNơiĐăng = {
  'Tên nơi đăng': string
  'Tên cộng đồng'?: string
  'Loại nơi đăng': string
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
type TênCộngĐồngMessenger = string;
type TênPhòngChatCộngĐồngMessenger = string;
type CộngĐồngMessenger = Record<TênCộngĐồngMessenger, TênPhòngChatCộngĐồngMessenger[]>;

type TênMáyChủDiscord = string;
type TênThreadHoặcTopic = string;
type TênKênhMáyChủDiscord = string;
type KênhMáyChủDiscord = TênKênhMáyChủDiscord | Record<TênKênhMáyChủDiscord, TênThreadHoặcTopic[] | null>;
type MáyChủDiscord = Record<TênMáyChủDiscord, KênhMáyChủDiscord[]>;

interface VậtThểNơiĐăngChat {
  'Cá nhân'?: string[];
  Nhóm?: string[];
}

interface Chat {
  Messenger: VậtThểNơiĐăngChat & { 'Cộng đồng': CộngĐồngMessenger[]; };
  Discord: VậtThểNơiĐăngChat & { 'Máy chủ': MáyChủDiscord[]; };
  Telegram: VậtThểNơiĐăngChat & { Kênh: string[]; };

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

