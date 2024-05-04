import {
  LoạiNơiĐăngChat,
  LoạiNềnTảng,
  TênNơiĐăng,
} from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

/** Source */
type KýHiệuLoạiDiễnĐàn = "G " | "Pg " | "Pr " | "";
export type TênNơiĐăngString =
  | TênNơiĐăng[0]
  | `${TênNơiĐăng[0]} » ${TênNơiĐăng[1]}`
  | `${TênNơiĐăng[0]} » ${TênNơiĐăng[1]} » ${TênNơiĐăng[2]}`;
export type SourceDiễnĐàn = `${string} ${KýHiệuLoạiDiễnĐàn}${TênNơiĐăngString}`;

type KýHiệuLoạiNềnTảngChat = "I" | "GC" | "Sv" | LoạiNơiĐăngChat[0];
export type SourceNềnTảngChat =
  `${string} ${KýHiệuLoạiNềnTảngChat} ${TênNơiĐăngString}`;

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
export default interface ThamSốUTMVàLiênKếtRútGọn {
  "Tham số UTM": ThamSốUTM;
  "Liên kết UTM": LiênKếtUTM;
  "Đuôi rút gọn": ĐuôiRútGọn;
  "Lần đăng": number;
}
