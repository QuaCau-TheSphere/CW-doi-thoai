import { CâuNhập } from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20d%E1%BB%AF%20li%E1%BB%87u%20nh%E1%BA%ADp%20v%C3%A0o.ts";
export interface VậtThểBàiViết {
    title: string,
    url: string,
    description?: string
} 
export interface VậtThểNộiDung {
    url: string,
    'Câu nhập': CâuNhập
    'Tiêu đề': string,
    'Dự án'?: string,
    'Nơi đăng'?: string,
    'Loại nơi đăng'?: string,
} 

type SocailSource = 'F G' | 'F Pg' | 'F Pr' | 'LinkedIn'
type ChatSource = 'Messenger' | 'Discord' | 'Zalo' | 'Telegram'

export type Source = SocailSource | ChatSource | undefined | 'Không tạo được source'
export type Medium = 'social' | 'chat' | 'email' | 'redirect' | 'referral' | undefined | 'Không tạo được medium'
export type Campaign = string | undefined | 'Không tạo được campaign'
export type Content = string | undefined | 'Không tạo được content'
export type Term = string | undefined | 'Không tạo được term'

export interface ThamSốUTM {
    source: Source,
    medium: Medium,
    campaign: Campaign,
    content?: Content,
    term?: Term
}  
export type LiênKếtUTM = string
export type PhầnRútGọn = string
export default interface VậtThểChiaSẻ {
    'Tham số UTM': ThamSốUTM
    'Liên kết UTM': LiênKếtUTM,
    'Phần rút gọn': PhầnRútGọn
} 