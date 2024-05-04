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
  "Kênh forum Discord"?: string[] | null;
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
export type TênNơiĐăng = TênNơiĐăngDiễnĐàn | TênNơiĐăngChat | TênNơiĐăngKhác;
export class NơiĐăng {
  "Loại nền tảng": LoạiNềnTảng;
  "Tên nền tảng": TênNềnTảng;
  "Loại nơi đăng": LoạiNơiĐăng;
  "Tên nơi đăng": TênNơiĐăng;
  URL?: URLString;
  "Lĩnh vực"?: string[];
  "Mô tả nơi đăng"?: string;
  "Mã nơi đăng"?: string;
  "Vị trí"?: string[];

  // constructor(
  //   tênNơiĐăng: TênNơiĐăng = "",
  //   tênCộngĐồng: string = "",
  //   loạiNơiĐăng: LoạiNơiĐăng = "Nhóm",
  //   tênNềnTảng: TênNềnTảng = "Facebook",
  //   loạiNềnTảng: LoạiNềnTảng = "Diễn đàn",
  //   url: URLString = "",
  //   môTảNơiĐăng: string = "",
  // ) {
  //   this["Tên nơi đăng"] = tênNơiĐăng;
  //   this["Tên cộng đồng"] = tênCộngĐồng;
  //   this["Loại nơi đăng"] = loạiNơiĐăng;
  //   this["Tên nền tảng"] = tênNềnTảng;
  //   this["Loại nền tảng"] = loạiNềnTảng;
  //   this.URL = url;
  //   this["Mô tả nơi đăng"] = môTảNơiĐăng;
  // }
}

/**
 * | Diễn đàn                    | Discord                    | Messenger      | Telegram |
 * | --------------------------- | -------------------------- | -------------- | -------- |
 * | Tài khoản, trang, nhóm      | Server                     | Community      | Group    |
 * | Ảnh bìa, ảnh đại diện, v.v. | Text Channel/Forum Channel | Community Chat | Topic    |
 * | ❌                          | Channel Thread/Forum Post  | Sidechat       | ❌       |
 */

/**
 * DIỄN ĐÀN
 *
 * Diễn đàn là một loại nền tảng
 *
 * Không xem subreddit là nhóm hay cộng đồng là máy chủ luôn được vì muốn sau đó xuất ra vẫn giữ tên là subreddit hay cộng động
 */

export const danhSáchDiễnĐàn = [
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
 * Vì diễn đàn là một loại nền tảng, nên tên diễn đàn chính là tên nền tảng. Đúng ra là nên đặt tên là `TênNềnTảngDiễnĐàn` cho thống nhất với `TênNềnTảngChat` và `TênNềnTảngKhác`, nhưng lúc viết code thấy có thể rút gọn được thì rút cho gọn.
 */
export type TênDiễnĐàn = typeof danhSáchDiễnĐàn[number];
export type LoạiNơiĐăngDiễnĐàn = [
  "Nhóm" | "Trang" | "Tài khoản" | "Subreddit" | "Repo",
];
type TênNơiĐăngDiễnĐàn = [string];
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
export type CấuHìnhNơiĐăngDiễnĐàn =
  | Record<LoạiNơiĐăngDiễnĐàn[0], string[]>
  | null;

type CấuHìnhDiễnĐàn = Record<
  TênDiễnĐàn,
  CấuHìnhNơiĐăngDiễnĐàn | null
>;

/**
 * CHAT
 */
export const danhSáchNềnTảngChat = [
  "Messenger",
  "Discord",
  "Telegram",
  "Zalo",
  "Viber",
  "Reddit",
  "LinkedIn",
] as const;

export type TênNềnTảngChat = typeof danhSáchNềnTảngChat[number];

/** Thông thường */
export type LoạiNơiĐăngChatThôngThường = ["Cá nhân" | "Tài khoản" | "Nhóm"];
export type CấuHìnhNơiĐăngChatThôngThường = Record<
  LoạiNơiĐăngChatThôngThường[0],
  string[] | null
>;
type TênNơiĐăngChatThôngThường = [string];

/** Messenger, Discord, Telegram */
export type TênMáyChủ = string;
type TênKênh = string;
export type TênThreadHoặcTopic = string;
type TênNơiĐăngMessengerDiscordTelegram =
  | [TênMáyChủ, TênKênh]
  | [TênMáyChủ, TênKênh, TênThreadHoặcTopic];
/**
 * Cấu hình máy chủ cũng chính là danh sách kênh của máy chủ đó
 *
 * @example
 * ```yaml
 * - Kênh 1          # `TênKênh`
 * - Kênh 2:         # `Record<TênKênh, TênThreadHoặcTopic[]>`
 *   - Thread 1
 * - Kênh 3:         # `Record<TênKênh, null>`
 * ```
 */
export type CấuHìnhMáyChủ =
  (TênKênh | Record<TênKênh, TênThreadHoặcTopic[] | null>)[];
type MáyChủ = OneKey<TênMáyChủ, CấuHìnhMáyChủ | null>;

type LoạiNơiĐăngMessenger =
  | ["Cộng đồng", "Community chat"]
  | ["Cộng đồng", "Community chat", "Sidechat"];
type LoạiNơiĐăngDiscord =
  | ["Máy chủ", "Kênh thường"]
  | ["Máy chủ", "Kênh thường", "Thread"]
  | ["Máy chủ", "Kênh diễn đàn", "Bài diễn đàn"];
type LoạiNơiĐăngTelegram = ["Nhóm"] | ["Nhóm", "Chủ đề"];
export type LoạiNơiĐăngMessengerDiscordTelegram =
  | LoạiNơiĐăngMessenger
  | LoạiNơiĐăngDiscord
  | LoạiNơiĐăngTelegram;

/** Tổng hợp */
type TênNơiĐăngChat =
  | TênNơiĐăngChatThôngThường
  | TênNơiĐăngMessengerDiscordTelegram;
export type LoạiNơiĐăngChat =
  | LoạiNơiĐăngChatThôngThường
  | LoạiNơiĐăngMessengerDiscordTelegram;

interface CấuHìnhChat {
  Messenger:
    | CấuHìnhNơiĐăngChatThôngThường & { "Cộng đồng": MáyChủ[] | null }
    | null;
  Discord:
    | CấuHìnhNơiĐăngChatThôngThường & { "Máy chủ": MáyChủ[] | null }
    | null;
  Telegram:
    | CấuHìnhNơiĐăngChatThôngThường & {
      Kênh: string[] | null;
      Nhóm: MáyChủ[] | null;
    }
    | null;
  Zalo: CấuHìnhNơiĐăngChatThôngThường | null;
  Viber: CấuHìnhNơiĐăngChatThôngThường | null;
  Reddit: CấuHìnhNơiĐăngChatThôngThường | null;
  LinkedIn: CấuHìnhNơiĐăngChatThôngThường | null;
}

/**
 * KHÁC
 */
export const danhSáchNơiĐăngKhác = [
  "Vault",
  "Website",
  "Email",
  "CV",
  "Ảnh",
  "Dịch vụ lưu trữ",
] as const;
export type LoạiNơiĐăngKhác = [typeof danhSáchNơiĐăngKhác[number]];
/** Tên nền tảng của vault, website, email, CV, ảnh, dịch vụ lưu trữ không quan trọng, không phức tạp, không làm ảnh hưởng tới cách gọi các cấp bậc nhỏ hơn nên để null cũng được */
type TênNềnTảngKhác = typeof danhSáchNơiĐăngKhác[number];
type LoạiNềnTảngKhác = typeof danhSáchNơiĐăngKhác[number];
type TênNơiĐăngKhác = [string];

export type CấuHìnhVault = string[] | null;
export type CấuHìnhWebsite = string[] | null;
export type CấuHìnhEmail = string[] | null;
export type CấuHìnhCV = string[] | null;
export type CấuHìnhẢnh = string[] | null;
export type CấuHìnhDịchVụLưuTrữ = string[] | null;
