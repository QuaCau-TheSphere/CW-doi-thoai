import { LoạiNơiĐăngChat, LoạiNềnTảng, TênNơiĐăng } from "./Kiểu cho nơi đăng.ts";

/** Source */
type KýHiệuLoạiDiễnĐàn = "G " | "Pg " | "Pr " | "";
export type TênNơiĐăngString =
  | TênNơiĐăng[0]
  | `${TênNơiĐăng[0]} » ${TênNơiĐăng[1]}`
  | `${TênNơiĐăng[0]} » ${TênNơiĐăng[1]} » ${TênNơiĐăng[2]}`;
export type SourceDiễnĐàn = `${string} ${KýHiệuLoạiDiễnĐàn}${TênNơiĐăngString}`;

type KýHiệuLoạiNềnTảngChat = "I" | "GC" | "Sv" | LoạiNơiĐăngChat[0];
export type SourceNềnTảngChat = `${string} ${KýHiệuLoạiNềnTảngChat} ${TênNơiĐăngString}`;

export type SourceKhác = `Ảnh ${TênNơiĐăngString}` | TênNơiĐăngString;
export type Source = SourceDiễnĐàn | SourceNềnTảngChat | SourceKhác;

/** Medium, campaign, v.v. */
export type Medium =
  | "social"
  | "chat"
  | "email"
  | "redirect"
  | "referral"
  | LoạiNềnTảng;
export type Campaign = string | undefined;
export type Content = string | undefined;
export type Term = string | undefined;

/** Kết quả */
export interface ThamSốUTM {
  source: Source;
  medium: Medium;
  campaign: Campaign;
  content?: Content;
  term?: Term;
}
export type LiênKếtUTM = URL;
export type ĐuôiRútGọn = string;
export default interface VậtThểThamSốUTM {
  "Tham số UTM": ThamSốUTM;
  "Liên kết UTM": LiênKếtUTM;
}
