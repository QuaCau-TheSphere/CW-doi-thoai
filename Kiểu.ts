import { KếtQuảPhânLoại } from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20vi%E1%BB%87c%20x%E1%BB%AD%20l%C3%BD.ts";
export type URLString = string

/** Vault */
export type TênVault = string
export interface Vault {
    'Tên vault': TênVault,
    'Mã vault': string,
    URL: URLString,
    'Nơi lưu': string,
    'Mô tả'?: string
} 

/** Bài đăng */
export interface YAMLAttributes {
    title?: string,
    description?: string,
    alias?: string | string[]
    created?: string
    updated?: string
    share?: boolean
} 
export type TênDựÁn = string
export interface BàiĐăng {
    title: string,
    url: URLString,
    description?: string,
    'Dự án': TênDựÁn
} 

/** Câu nhập */
export interface KếtQuảPhânLoạiCâuNhập extends KếtQuảPhânLoại {
    'Bài viết': string,
    'Loại bài viết': string,
    'Nơi đăng': string,
    'Loại nơi đăng': string
} 
export interface VậtThểTiếpThị {
    url: URLString,
    'Tiêu đề': string,
    'Chiến dịch': string,
    'Nơi đăng': string,
    'Loại nơi đăng': string,
} 
export default interface VậtThểChiaSẻ {
    'Tham số UTM': ThamSốUTM
    'Liên kết UTM': LiênKếtUTM,
    'Phần rút gọn': PhầnRútGọn
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
export type LiênKếtUTM = URL
export type PhầnRútGọn = string