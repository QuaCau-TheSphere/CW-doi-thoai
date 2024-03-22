import { TênNơiĐăng } from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

/** Source */
export type KýHiệuMXH = 'F' | 'L' | 'R' | 'Y' 
type KýHiệuLoạiMXH = 'G' | 'Pg' | 'Pr' | 'Sub'
type KýHiệuSourceMXH = `${KýHiệuMXH} ${KýHiệuLoạiMXH}`

export type KýHiệuNềnTảngChat = 'M' | 'D' | 'T' | 'Z' | 'L' | 'R'
type KýHiệuLoạiNềnTảngChat = 'I' | 'GI' | 'Sv'
type KýHiệuSourceNềnTảngChat = `${KýHiệuNềnTảngChat} ${KýHiệuLoạiNềnTảngChat}`

export type Source = `${KýHiệuSourceMXH | KýHiệuSourceNềnTảngChat} ${TênNơiĐăng}`

/** Medium, campaign, v.v. */
export type Medium = 'social' | 'chat' | 'email' | 'redirect' | 'referral' | undefined | 'Không tạo được medium'
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
export default interface ThamSố {
    'Tham số UTM': ThamSốUTM
    'Liên kết UTM': LiênKếtUTM,
    'Phần rút gọn': PhầnRútGọn
} 
