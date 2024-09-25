/** Chỉ có những biến có từ cấu hình trong tên là dành cho cấu hình, còn lại là dành cho kết quả là vật thể nơi đăng */
import { UrlChưaChínhTắc } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";
import { DanhSáchVịTríCóThểĐăng } from "../../Code chạy trên client/Hàm và kiểu cho vị trí.ts";
import { OneKey } from "../../Code chạy trên client/Kiểu hỗ trợ.ts";

export type Slug = string;
/**
 * Loại nền tảng có kiểu là string, không phải string[]. Tên nơi đăng mới có kiểu string[]
 * @type string
 */
export type LoạiNềnTảng =
  | "Diễn đàn"
  | "Chat"
  | "Tập tin"
  | "SaaS"
  | LoạiNềnTảngKhác;
/**
 * Tên nền tảng có kiểu là string, không phải string[]. Tên nơi đăng mới có kiểu string[]
 * @type string
 */
export type TênNềnTảng =
  | TênDiễnĐàn
  | TênNềnTảngChat
  | TênNềnTảngTậpTin
  | TênNềnTảngSaaS
  | TênNềnTảngKhác;

/**
 * Loại nơi đăng có kiểu là string[], nhưng thông thường chỉ có một phần tử.
 * @type string[]
 * @example
 * ```
 * ["Nhóm"];
 * ["Máy chủ", "Kênh diễn đàn", "Bài diễn đàn"];
 * ```
 */
export type LoạiNơiĐăng =
  | LoạiNơiĐăngDiễnĐàn
  | LoạiNơiĐăngChat
  | LoạiNơiĐăngTậpTin
  | LoạiNơiĐăngSaaS
  | LoạiNơiĐăngKhác;
/**
 * Tên nơi đăng có kiểu là string[], không phải string. Tên nền tảng và loại nền tảng mới có kiểu string
 * @type string[]
 */
export type TênNơiĐăng =
  | TênNơiĐăngDiễnĐàn
  | TênNơiĐăngChat
  | TênNơiĐăngTậpTin
  | TênNơiĐăngSaaS
  | TênNơiĐăngKhác;
export type PhươngThứcTạoNơiĐăng = "Lấy trong cấu hình nơi đăng" | "Nhập tay trên web";

export interface ThôngTinNơiĐăng {
  "Loại nền tảng": LoạiNềnTảng;
  "Tên nền tảng": TênNềnTảng;
  "Loại nơi đăng": LoạiNơiĐăng;
  "Tên nơi đăng": TênNơiĐăng;
  URL?: UrlChưaChínhTắc;
  "Lĩnh vực"?: string[];
  "Mô tả nơi đăng"?: string | null;
  "Slug"?: string | null;
  "Đơn vị quản lý"?: string;
  "Vị trí có thể đăng"?: DanhSáchVịTríCóThểĐăng;
  id: string;
  "Phương thức tạo": PhươngThứcTạoNơiĐăng;
}
export type ThôngTinNơiĐăngChưaCóId = Omit<ThôngTinNơiĐăng, "id">;
export type ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo = Omit<ThôngTinNơiĐăng, "id" | "Phương thức tạo">;
/**
 * | Diễn đàn                    | Discord                    | Messenger      | Telegram |
 * | --------------------------- | -------------------------- | -------------- | -------- |
 * | Tài khoản, trang, nhóm      | Server                     | Community      | Group    |
 * | Ảnh bìa, ảnh đại diện, v.v. | Text Channel/Forum Channel | Chat cộng đồng | Topic    |
 * | ❌                          | Channel Thread/Forum Post  | Sidechat       | ❌       |
 */

/**
 * DIỄN ĐÀN
 *
 * Diễn đàn là một loại nền tảng
 *
 * Không xem subreddit là nhóm hay cộng đồng là máy chủ luôn được vì muốn sau đó xuất ra vẫn giữ tên là subreddit hay cộng động
 */
//deno-fmt-ignore
export const danhSáchDiễnĐàn = [
  "Facebook", "LinkedIn",
  "Twitter", "Mastodon",
  "YouTube", "TikTok",
  "Instagram", "Pinterest",
  "Reddit", "Stack Exchange", "Quora", "Tinh tế", "Spiderum", "Medium", "Substack",
  "GitHub", "GitLab",
  "Zalo",
] as const;
/**
 * Vì diễn đàn là một loại nền tảng, nên tên diễn đàn chính là tên nền tảng. Đúng ra là nên đặt tên là `TênNềnTảngDiễnĐàn` cho thống nhất với `TênNềnTảngChat` và `TênNềnTảngKhác`, nhưng lúc viết code thấy có thể rút gọn được thì rút cho gọn.
 */
export type TênDiễnĐàn = typeof danhSáchDiễnĐàn[number];
//deno-fmt-ignore
export type LoạiNơiĐăngDiễnĐàn = [
  | "Nhóm" | "Trang" | "Tài khoản" | "Sự kiện" 
  | "Danh sách phát" | "Kênh" | "Video" 
  | "Subreddit" | "Repo"
]
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
export type CấuHìnhNơiĐăngDiễnĐàn = Record<LoạiNơiĐăngDiễnĐàn[0], string[]> | null;

export type CấuHìnhDiễnĐàn = Record<TênDiễnĐàn, CấuHìnhNơiĐăngDiễnĐàn | null>;

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
export type CấuHìnhNơiĐăngChatThôngThường = Record<LoạiNơiĐăngChatThôngThường[0], string[] | null>;
type TênNơiĐăngChatThôngThường = [string];

/** Messenger, Discord, Telegram */
export type TênMáyChủ = string;
type TênKênh = string;
export type TênThreadHoặcTopic = string;
export type TênNơiĐăngMessengerDiscordTelegram =
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
export type CấuHìnhMáyChủ = (TênKênh | Record<TênKênh, TênThreadHoặcTopic[] | null>)[];
type MáyChủ = OneKey<TênMáyChủ, CấuHìnhMáyChủ | null>;

type LoạiNơiĐăngMessenger =
  | ["Cộng đồng", "Chat cộng đồng"]
  | ["Cộng đồng", "Chat cộng đồng", "Sidechat"];
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

export interface CấuHìnhChat {
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
 * TẬP TIN
 */
export const danhSáchTậpTin = ["PDF", "Văn bản", "Bảng tính", "Booklet", "Slide"] as const;
export type TênTậpTin = typeof danhSáchTậpTin[number];
export type TênNềnTảngTậpTin = TênTậpTin;
type LoạiNơiĐăngTậpTin = [TênTậpTin];
type TênNơiĐăngTậpTin = [string];
export type CấuHìnhTậpTin = Record<TênTậpTin, string[] | null> | null;

/**
 * SaaS
 */
export const danhSáchSaaS = ["Google", "Zoom", "Notion"] as const;
export type TênSaaS = typeof danhSáchSaaS[number];
export type TênChứcNăngTrongSaaS = "Forms" | "Docs" | "Sheets" | "Slides" | "Meet" | "Drive" | "Calendar";
export type TênNềnTảngSaaS = TênSaaS;
export type LoạiNơiĐăngSaaS = [TênChứcNăngTrongSaaS];
type TênNơiĐăngSaaS = [string];

export type VậtThểLàmGiáTrịChoTênSaaS = Record<TênChứcNăngTrongSaaS, string[] | null>;
export type CấuHìnhSaaS = Record<TênNềnTảngSaaS, VậtThểLàmGiáTrịChoTênSaaS | null> | null;

/**
 * KHÁC
 */
export const danhSáchNơiĐăngKhác = ["Vault", "Website", "Email", "Ảnh"] as const;
export type LoạiNơiĐăngKhác = [typeof danhSáchNơiĐăngKhác[number]];
/** Tên nền tảng của vault, website, email, CV, ảnh, dịch vụ lưu trữ không quan trọng, không phức tạp, không làm ảnh hưởng tới cách gọi các cấp bậc nhỏ hơn nên để null cũng được */
type TênNềnTảngKhác = typeof danhSáchNơiĐăngKhác[number];
type LoạiNềnTảngKhác = typeof danhSáchNơiĐăngKhác[number];
type TênNơiĐăngKhác = [string];

export type CấuHìnhVault = string[];
export type CấuHìnhWebsite = string[];
export type CấuHìnhEmail = string[];
export type CấuHìnhẢnh = string[];

/** Không xét URL vì có những nơi đăng có nhiều URL khác nhau */
export function làCùngNơiĐăng(nơiĐăng1: ThôngTinNơiĐăng, nơiĐăng2: ThôngTinNơiĐăng): boolean {
  if (!nơiĐăng1 || !nơiĐăng2) return false;
  const tiêuChíXétGiốngNhau = ["Loại nền tảng", "Tên nền tảng", "Tên nơi đăng", "Loại nơi đăng"] as const;
  for (const key of tiêuChíXétGiốngNhau) {
    if (JSON.stringify(nơiĐăng1[key]) !== JSON.stringify(nơiĐăng2[key])) return false;
  }
  return true;
}
