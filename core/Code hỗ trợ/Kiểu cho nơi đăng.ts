import { danhSáchDiễnĐàn, danhSáchNềnTảngChat } from "./H%E1%BA%B1ng.ts";

export default interface CấuHìnhNơiĐăng {
  'Diễn đàn': CấuHìnhDiễnĐàn;
  Chat: CấuHìnhChat;
  Khác: NơiĐăngKhác;
  'Viết tắt'?: Record<string, string>[] 
}

export type LoạiNềnTảng = 'Diễn đàn' | 'Chat' | 'Vault' | 'Khác'
export type TênNềnTảng = TênDiễnĐàn | TênNềnTảngChat | LoạiNơiĐăngKhác //| TênVault 
export type LoạiNơiĐăng = LoạiNơiĐăngDiễnĐàn | LoạiNơiĐăngChat | LoạiNơiĐăngKhác
export type TênNơiĐăng = string
export type NơiĐăng = {
  'Tên nơi đăng': TênNơiĐăng
  'Tên cộng đồng'?: string
  'Loại nơi đăng': LoạiNơiĐăng
  'Tên nền tảng': TênNềnTảng
  'Loại nền tảng': LoạiNềnTảng
}


/** 
 * | Diễn đàn                    | Discord                    | Messenger      | Telegram |
 * | --------------------------- | -------------------------- | -------------- | -------- |
 * | Tài khoản, trang, nhóm      | Server                     | Community      | Group    |
 * | Ảnh bìa, ảnh đại diện, v.v. | Text Channel/Forum Channel | Community Chat | Topic    |
 * | ❌                          | Channel Thread/Forum Post  | Sidechat       | ❌       |
 */

/**
 * Diễn đàn 
 * 
 * Không xem subreddit là nhóm hay cộng đồng là máy chủ luôn được vì muốn sau đó xuất ra vẫn giữ tên là subreddit hay cộng động
 */
export type TênDiễnĐàn = typeof danhSáchDiễnĐàn[number]
export type LoạiNơiĐăngDiễnĐàn = 'Nhóm' | 'Trang' | 'Tài khoản' | 'Subreddit'
type ThànhPhần = 'Câu giới thiệu ngắn' | 'Đoạn giới thiệu chi tiết' | 'Ảnh bìa' | 'Ảnh đại diện'
type TênTàiKhoảnTrangHoặcNhóm = string

/** 
 * ```yaml
 * - Tên tài khoản         # Kiểu `TênTàiKhoảnTrangHoặcNhóm`
 * - Tên trang:            # Kiểu `Record<TênTàiKhoảnTrangHoặcNhóm, ThànhPhần[]>`
 *   - Thành phần 1    
 *   - Thành phần 2    
 * - Tên nhóm:             # Kiểu `Record<TênTàiKhoảnTrangHoặcNhóm, null>
 * ```
 */
type TàiKhoảnHoặcTrangHoặcNhóm = TênTàiKhoảnTrangHoặcNhóm | Record<TênTàiKhoảnTrangHoặcNhóm, ThànhPhần[] | null>
export type VậtThểNơiĐăngDiễnĐàn = Record<LoạiNơiĐăngDiễnĐàn, TàiKhoảnHoặcTrangHoặcNhóm[]>

type CấuHìnhDiễnĐàn = Record<TênDiễnĐàn, VậtThểNơiĐăngDiễnĐàn>;

/** 
 * Chat
 */

export type TênNềnTảngChat = typeof danhSáchNềnTảngChat[number] 
type TênMáyChủ = string;
type TênThreadHoặcTopic = string;
type TênKênh = string;
/** 
 * ```yaml
 * - Tên cộng đồng 1       # Kiểu `string`
 * - Tên máy chủ:          # Kiểu `Record<string, string[]>`
 *   - Kênh 1                   # Kiểu `string`
 *   - Kênh 2:                  # Kiểu `Record<TênKênh, TênThreadHoặcTopic[]>`
 *     - Thread 1
 *   - Kênh 3:                  # Kiểu `Record<TênKênh, null>`
 * - Tên cộng đồng 2:      # Kiểu `Record<string, null>
 * ```
 */
type Kênh = TênKênh | Record<TênKênh, TênThreadHoặcTopic[] | null>;
export type MáyChủ = Record<TênMáyChủ, Kênh[]>;

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
 * Vault 
 */

type TênVault = string

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