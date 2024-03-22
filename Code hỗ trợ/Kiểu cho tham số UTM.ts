import { TênNơiĐăng } from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

/** Source */
type KýHiệuLoạiDiễnĐàn = 'G' | 'Pg' | 'Pr'
export type SourceDiễnĐàn = `${string} ${KýHiệuLoạiDiễnĐàn} ${TênNơiĐăng}` | undefined

type KýHiệuLoạiNềnTảngChat = 'I' | 'GC' | 'Sv'
export type SourceNềnTảngChat = `${string} ${KýHiệuLoạiNềnTảngChat} ${TênNơiĐăng}` | undefined

export type SourceKhác = `Ảnh ${TênNơiĐăng}` | TênNơiĐăng | undefined
export type Source = SourceDiễnĐàn | SourceNềnTảngChat | SourceKhác

/** Medium, campaign, v.v. */
export type Medium = 'social' | 'chat' | 'email' | 'redirect' | 'referral' | undefined
export type Campaign = string | undefined | 'Không tạo được campaign'
export type Content = string | undefined | 'Không tạo được content'
export type Term = string | undefined | 'Không tạo được term'

/** Kết quả */
export interface ThamSốUTM {
    source: Source,
    medium: Medium,
    campaign: Campaign,
    content?: Content,
    term?: Term
}  
export type LiênKếtUTM = URL
export type PhầnRútGọn = string
export default interface ThamSốUTMVàLiênKếtRútGọn {
    'Tham số UTM': ThamSốUTM
    'Liên kết UTM': LiênKếtUTM,
    'Phần rút gọn': PhầnRútGọn
} 
