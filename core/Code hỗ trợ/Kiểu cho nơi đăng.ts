import { URLString } from "./Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";

type OneKey<K extends string, V = any> = {
  [P in K]: (
    & Record<P, V>
    & Partial<Record<Exclude<K, P>, never>>
  ) extends infer O ? { [Q in keyof O]: O[Q] }
    : never;
}[K];

export default interface CấuHìnhNơiĐăng {
  "Diễn đàn"?: CấuHìnhDiễnĐàn | null;
  Chat?: CấuHìnhChat | null;
  Vault?: CấuHìnhVault | null;
  Website?: CấuHìnhWebsite | null;
  CV?: CấuHìnhCV | null;
  Ảnh?: CấuHìnhẢnh | null;
  Email?: CấuHìnhEmail | null;
  "Dịch vụ lưu trữ"?: CấuHìnhDịchVụLưuTrữ | null;
  "Viết tắt"?: Record<string, string>[] | null;
  "Thành phần": ThànhPhần | null;
}

export type LoạiNềnTảng =
  | "Diễn đàn"
  | "Chat"
  | LoạiNềnTảngKhác;
export type TênNềnTảng =
  | TênDiễnĐàn
  | TênNềnTảngChat
  | TênNềnTảngKhác;
export type LoạiNơiĐăng =
  | LoạiNơiĐăngDiễnĐàn
  | LoạiNơiĐăngChat
  | LoạiNơiĐăngKhác;
export type TênNơiĐăng = string;
export class NơiĐăng {
  "Tên nơi đăng": TênNơiĐăng;
  "Tên cộng đồng"?: string;
  "Loại nơi đăng": LoạiNơiĐăng;
  "Tên nền tảng": TênNềnTảng;
  "Loại nền tảng": LoạiNềnTảng;
  URL?: URLString;
  "Mô tả nơi đăng"?: string;

  constructor(
    tênNơiĐăng: TênNơiĐăng = "",
    tênCộngĐồng: string = "",
    loạiNơiĐăng: LoạiNơiĐăng = "Nhóm",
    tênNềnTảng: TênNềnTảng = "Facebook",
    loạiNềnTảng: LoạiNềnTảng = "Diễn đàn",
    url: URLString = "",
    môTảNơiĐăng: string = "",
  ) {
    this["Tên nơi đăng"] = tênNơiĐăng;
    this["Tên cộng đồng"] = tênCộngĐồng;
    this["Loại nơi đăng"] = loạiNơiĐăng;
    this["Tên nền tảng"] = tênNềnTảng;
    this["Loại nền tảng"] = loạiNềnTảng;
    this.URL = url;
    this["Mô tả nơi đăng"] = môTảNơiĐăng;
  }
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
 * Diễn đàn là một loại nền tảng
 * Không xem subreddit là nhóm hay cộng đồng là máy chủ luôn được vì muốn sau đó xuất ra vẫn giữ tên là subreddit hay cộng động
 */

const danhSáchDiễnĐàn = [
  "Facebook",
  "LinkedIn",
  "Twitter",
  "Mastodon",
  "Reddit",
  "YouTube",
  "Stack Exchange",
  "Instagram",
  "Pinterest",
  "GitHub",
  "GitLab",
  "Zalo",
  "Tinh tế",
  "Spiderum",
] as const;
/**
 * Vì diễn đàn là một loại nền tảng, nên tên diễn đàn chính là tên nền tảng
 */
export type TênDiễnĐàn = typeof danhSáchDiễnĐàn[number];
export type LoạiNơiĐăngDiễnĐàn =
  | "Nhóm"
  | "Trang"
  | "Tài khoản"
  | "Subreddit"
  | "Repo";

/**
 * Tên nơi đăng diễn đàn, bao gồm tên tài khoản, tên trang hoặc tên nhóm
 * @example
 * ```yaml
 * Nhóm:
 *   - SNPO
 * ```
 * @example
 * ```yaml
 * Tài khoản:
 *   - ooker777
 * ```
 * @example
 * ```yaml
 * Trang:
 *   - Quả Cầu
 * ```
 */
export type VậtThểLàmGiáTrịChoTênDiễnĐàn =
  | Record<LoạiNơiĐăngDiễnĐàn, string[]>
  | null;

type CấuHìnhDiễnĐàn = Record<
  TênDiễnĐàn,
  VậtThểLàmGiáTrịChoTênDiễnĐàn | undefined | null
>;

/**
 * Chat
 */
const danhSáchNềnTảngChat = [
  "Messenger",
  "Discord",
  "Telegram",
  "Zalo",
  "Viber",
  "Reddit",
  "LinkedIn",
] as const;

export type TênNềnTảngChat = typeof danhSáchNềnTảngChat[number];
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
export type MáyChủ = OneKey<TênMáyChủ, Kênh[]>;

export type LoạiNơiĐăngChat =
  | "Cá nhân"
  | "Cộng đồng"
  | "Máy chủ"
  | "Kênh"
  | "Nhóm";
export interface VậtThểNơiĐăngChat {
  "Cá nhân": string[];
  Nhóm: string[];
}

interface CấuHìnhChat {
  Messenger: VậtThểNơiĐăngChat & { "Cộng đồng": MáyChủ[] };
  Discord: VậtThểNơiĐăngChat & { "Máy chủ": MáyChủ[] };
  Telegram: { "Cá nhân": string[]; Kênh: string[]; Nhóm: MáyChủ[] };

  Zalo: VậtThểNơiĐăngChat;
  Viber: VậtThểNơiĐăngChat;
  Reddit: VậtThểNơiĐăngChat;
  LinkedIn: VậtThểNơiĐăngChat;
}

/**
 * Nơi đăng khác
 */
export const danhSáchLoạiNơiĐăngKhác = [
  "Vault",
  "Website",
  "Email",
  "CV",
  "Ảnh",
  "Dịch vụ lưu trữ",
] as const;
export type LoạiNơiĐăngKhác = typeof danhSáchLoạiNơiĐăngKhác[number];
type TênNềnTảngKhác = typeof danhSáchLoạiNơiĐăngKhác[number];
type LoạiNềnTảngKhác = typeof danhSáchLoạiNơiĐăngKhác[number];

export type CấuHìnhVault = string[];
export type CấuHìnhWebsite = string[];
export type CấuHìnhEmail = string[];
export type CấuHìnhCV = string[];
export type CấuHìnhẢnh = string[];
export type CấuHìnhDịchVụLưuTrữ = string[];

export interface ThànhPhần {
  "Diễn đàn": Record<TênDiễnĐàn, Record<LoạiNơiĐăngDiễnĐàn, string[]>>;
  Chat: Record<TênNềnTảngChat, Record<LoạiNơiĐăngChat, string[]>>;
  Vault: string[];
  Website: string[];
  CV: string[];
  Ảnh: string[];
  Email: string[];
  "Dịch vụ lưu trữ": string[];
}
