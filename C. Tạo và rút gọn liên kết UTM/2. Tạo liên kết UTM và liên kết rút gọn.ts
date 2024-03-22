import "npm:@total-typescript/ts-reset";
import builder from 'npm:utm-builder';
import { danhSáchMXH, danhSáchNềnTảngChat } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import { BàiĐăng, DựÁn } from    "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { LoạiNềnTảng, NơiĐăng, TênNềnTảng, LoạiNơiĐăng, TênNơiĐăng } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import ThamSố, { KýHiệuMXH, KýHiệuNềnTảngChat, Campaign, Content, Term, LiênKếtUTM, Medium, PhầnRútGọn, Source, ThamSốUTM } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91.ts";

function tạoSource(loạiNềnTảng: LoạiNềnTảng, tênNềnTảng: TênNềnTảng, loạiNơiĐăng: LoạiNơiĐăng, tênNơiĐăng: TênNơiĐăng): Source{
    switch (loạiNềnTảng) {
        case "Mạng xã hội": {
            let kýHiệuMXH
            danhSáchMXH.includes(tênNềnTảng) ? kýHiệuMXH = tênNềnTảng[0] : kýHiệuMXH = tênNềnTảng
            switch (loạiNơiĐăng) {
                case "Trang":
                    return `${kýHiệuMXH} Pg ${tênNơiĐăng}`
                case "Tài khoản":
                    return `${kýHiệuMXH} Pr ${tênNơiĐăng}`
                case "Nhóm":
                    return `${kýHiệuMXH} G ${tênNơiĐăng}`
                case "Subreddit":
                    return `${kýHiệuMXH} Sub ${tênNơiĐăng}`
            }
            break
        }
        case "Chat": {
            let kýHiệuNềnTảngChat
            danhSáchNềnTảngChat.includes(tênNềnTảng) ? kýHiệuNềnTảngChat = tênNềnTảng[0] : kýHiệuNềnTảngChat = tênNềnTảng
            switch (loạiNơiĐăng) {
                case "Cá nhân":
                    return `${kýHiệuNềnTảngChat} I ${tênNơiĐăng}`
                case "Nhóm" || "Kênh" :
                    return `${kýHiệuNềnTảngChat} GI ${tênNơiĐăng}`
                case "Máy chủ" || "Cộng đồng":
                    return `${kýHiệuNềnTảngChat} Sv ${tênNơiĐăng}`
            }
            break
        }
        case "Diễn đàn": {
            return 
        } 
    }
} 

function tạoMedium(loạiNềnTảng: LoạiNềnTảng): Medium{
    switch (loạiNềnTảng){
        case "Mạng xã hội":
            return 'social'

        case "Chat":
            return 'chat'

        // case 'Email':
        //     return 'email'
        // case 'quacau.deno.dev':
        //     return 'redirect'
        default:
            return 'Không tạo được medium'
    }     
} 

/**
 * Tên dự án chính là tên chiến dịch
 */
function tạoCampaign(dựÁn: DựÁn): Campaign{
    return `${dựÁn["Mã dự án"]} ${dựÁn["Tên dự án"]}`
} 

function tạoContent(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng): Content{
    return //TODO
} 

function tạoTerm(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng): Term{
    return //TODO
} 

function tạoLiênKếtUTM(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng, thamSốUTM: ThamSốUTM): LiênKếtUTM{
    console.log("🚀 ~ tạoLiênKếtUTM ~ thamSốUTM:", thamSốUTM)
    console.log("🚀 ~ tạoLiênKếtUTM ~ nơiĐăng, bàiĐăng:", nơiĐăng, bàiĐăng)
    
    return builder(nơiĐăng, bàiĐăng.url, thamSốUTM.source, thamSốUTM.medium, thamSốUTM.campaign, thamSốUTM.content, thamSốUTM.term)
}  
function tạoLiênKếtRútGọn(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng, thamSốUTM: ThamSốUTM): PhầnRútGọn{
    return 'chưaLàmLiênKếtRútGọn' //TODO
}  

export default function tạoThamSốUTMVàLiênKếtRútGọn(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng): ThamSố{
    const tênNềnTảng = nơiĐăng["Tên nền tảng"]
    const loạiNơiĐăng = nơiĐăng["Loại nơi đăng"]
    const tênNơiĐăng = nơiĐăng["Tên nơi đăng"];
    const loạiNềnTảng = nơiĐăng["Loại nền tảng"];

    const dựÁn = bàiĐăng["Dự án"]
    const thamSốUTM: ThamSốUTM = {
        source: tạoSource(loạiNềnTảng, tênNềnTảng, loạiNơiĐăng, tênNơiĐăng),
        medium: tạoMedium(loạiNềnTảng),
        campaign: tạoCampaign(dựÁn),
        content: tạoContent(nơiĐăng, bàiĐăng),
        term: tạoTerm(nơiĐăng, bàiĐăng),
    }
    return {
        'Tham số UTM': thamSốUTM,
        'Liên kết UTM': tạoLiênKếtUTM(nơiĐăng, bàiĐăng, thamSốUTM),
        'Phần rút gọn': tạoLiênKếtRútGọn(nơiĐăng, bàiĐăng, thamSốUTM),
    } 
} 
