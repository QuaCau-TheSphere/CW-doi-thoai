import { URLString } from "./Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";

type OneKey<K extends string, V = any> = {
  [P in K]: (
    & Record<P, V>
    & Partial<Record<Exclude<K, P>, never>>
  ) extends infer O ? { [Q in keyof O]: O[Q] }
    : never;
}[K];

export default interface CấuHìnhNơiĐăng {
  "Diễn đàn": CấuHìnhDiễnĐàn;
  Chat: CấuHìnhChat;
  Khác: NơiĐăngKhác;
  "Viết tắt"?: Record<string, string>[];
}

export type LoạiNềnTảng = "Diễn đàn" | "Chat" | "Khác";
export type TênNềnTảng = TênDiễnĐàn | TênNềnTảngChat | LoạiNơiĐăngKhác; //| TênVault
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
  URL: URLString;

  constructor(
    tênNơiĐăng: TênNơiĐăng = "",
    tênCộngĐồng: string = "",
    loạiNơiĐăng: LoạiNơiĐăng = "Nhóm",
    tênNềnTảng: TênNềnTảng = "Facebook",
    loạiNềnTảng: LoạiNềnTảng = "Diễn đàn",
    url: URLString = "",
  ) {
    this["Tên nơi đăng"] = tênNơiĐăng;
    this["Tên cộng đồng"] = tênCộngĐồng;
    this["Loại nơi đăng"] = loạiNơiĐăng;
    this["Tên nền tảng"] = tênNềnTảng;
    this["Loại nền tảng"] = loạiNềnTảng;
    this.URL = url;
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

  "Zalo",
  "Tinh tế",
  "Spiderum",
] as const;

export type TênDiễnĐàn = typeof danhSáchDiễnĐàn[number] | "GitHub";
export type LoạiNơiĐăngDiễnĐàn =
  | "Nhóm"
  | "Trang"
  | "Tài khoản"
  | "Subreddit"
  | "Repo";
type ThànhPhầnTàiKhoảnTrangHoặcNhóm =
  | "Câu giới thiệu ngắn"
  | "Đoạn giới thiệu chi tiết"
  | "Ảnh bìa"
  | "Ảnh đại diện";
type TênTàiKhoảnTrangHoặcNhóm = string;

/**
 * Ví dụ:
 * ```yaml
 * - ooker777         # Kiểu `TênTàiKhoảnTrangHoặcNhóm`
 * - Quả Cầu:            # Kiểu `Record<TênTàiKhoảnTrangHoặcNhóm, ThànhPhần[]>`
 *   - Câu giới thiệu ngắn
 *   - Đoạn giới thiệu chi tiết
 * - SNPO:             # Kiểu `Record<TênTàiKhoảnTrangHoặcNhóm, null>
 * ```
 */
type TàiKhoảnHoặcTrangHoặcNhóm =
  | TênTàiKhoảnTrangHoặcNhóm
  | OneKey<TênTàiKhoảnTrangHoặcNhóm, ThànhPhầnTàiKhoảnTrangHoặcNhóm[] | null>;
export type VậtThểLàmGiáTrịChoTênDiễnĐàn = Record<
  LoạiNơiĐăngDiễnĐàn,
  TàiKhoảnHoặcTrangHoặcNhóm[]
>;

type CấuHìnhDiễnĐàn = Record<TênDiễnĐàn, VậtThểLàmGiáTrịChoTênDiễnĐàn> | GitHub;

type ThànhPhầnGitHub = "Website" | "Readme" | "Discussion" | "Issue";
export type TênRepo = string;
type GitHub = Record<TênRepo, ThànhPhầnGitHub[]>[];

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

/** Vì các nơi đăng khác không phải là nền tảng nào, nên dùng luôn loại nơi đăng làm tên nền tảng */
export type LoạiNơiĐăngKhác = "Website" | "Email" | "Ảnh";
type TênEmailWebsiteHoặcẢnh = string;
type ThànhPhầnEmailWebsiteHoặcẢnh = string;
export type EmailWebsiteHoặcẢnh =
  | TênEmailWebsiteHoặcẢnh
  | OneKey<TênEmailWebsiteHoặcẢnh, ThànhPhầnEmailWebsiteHoặcẢnh[] | null>;
export type NơiĐăngKhác = Record<LoạiNơiĐăngKhác, EmailWebsiteHoặcẢnh[]>;
