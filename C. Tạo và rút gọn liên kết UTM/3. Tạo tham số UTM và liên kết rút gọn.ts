// import "npm:@total-typescript/ts-reset";
import builder from 'npm:utm-builder';
import { BàiĐăng, DựÁn, MãDựÁn, URLString } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import CấuHìnhNơiĐăng, { LoạiNềnTảng, NơiĐăng, TênNềnTảng, LoạiNơiĐăng, TênNơiĐăng } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import ThamSốUTMVàLiênKếtRútGọn, { Campaign, Content, Term, LiênKếtUTM, Medium, ĐuôiRútGọn, Source, ThamSốUTM, SourceKhác } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import { SourceDiễnĐàn } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import { SourceNềnTảngChat } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20tham%20s%E1%BB%91%20UTM.ts";
import { lấyKýHiệuViếtTắt } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Code%20h%E1%BB%97%20tr%E1%BB%A3.ts";

function tạoSource(loạiNềnTảng: LoạiNềnTảng, tênNềnTảng: TênNềnTảng, loạiNơiĐăng: LoạiNơiĐăng, tênNơiĐăng: TênNơiĐăng, cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Source{
    const kýHiệuNềnTảng = lấyKýHiệuViếtTắt(tênNềnTảng, cấuHìnhNơiĐăng);
    switch (loạiNềnTảng) {
        case "Diễn đàn":
            return tạoSourceDiễnĐàn() 
        case "Chat":
            return tạoSourceNềnTảngChat() 
        case "Vault":
            return tạoSourceVault()
        case "Khác":
            return tạoSourceKhác() 
        default:
            return undefined
    }

    function tạoSourceDiễnĐàn(): SourceDiễnĐàn {
        switch (loạiNơiĐăng) {
            case "Trang":
                return `${kýHiệuNềnTảng} Pg ${tênNơiĐăng}`
            case "Tài khoản":
                return `${kýHiệuNềnTảng} Pr ${tênNơiĐăng}`
            case "Nhóm":
                return `${kýHiệuNềnTảng} G ${tênNơiĐăng}`
            default:
                return undefined
        }
    }
    function tạoSourceNềnTảngChat(): SourceNềnTảngChat {
        switch (loạiNơiĐăng) {
            case "Cá nhân":
                return `${kýHiệuNềnTảng} I ${tênNơiĐăng}`
            case "Nhóm" || "Kênh" :
                return `${kýHiệuNềnTảng} GC ${tênNơiĐăng}`
            case "Máy chủ" || "Cộng đồng":
                return `${kýHiệuNềnTảng} Sv ${tênNơiĐăng}`
            default:
                return undefined
        }
    }

    function tạoSourceKhác(): SourceKhác {
        switch (loạiNơiĐăng) {
            case "Website" || "Email":
                return tênNơiĐăng;
            case "Ảnh":
                return `Ảnh ${tênNơiĐăng}`;
            default:
                return undefined
        }
    }
    function tạoSourceVault(): Source {
        throw new Error("Function not implemented.");
    }
} 


function tạoMedium(loạiNơiĐăng: LoạiNơiĐăng, loạiNềnTảng: LoạiNềnTảng): Medium{
    switch (loạiNềnTảng){
        case "Diễn đàn":
            return 'social'
        case "Chat":
            return 'chat'
    }
    switch (loạiNơiĐăng) {
        case "Email":
            return 'email'
    }
        // case 'quacau.deno.dev':
        //     return 'redirect'
    return undefined
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

function tạoLiênKếtUTM(url: URLString, thamSốUTM: ThamSốUTM): LiênKếtUTM {
    return builder(url, thamSốUTM.source, thamSốUTM.medium, thamSốUTM.campaign, thamSốUTM.content, thamSốUTM.term)
}  
/** Nếu có ký hiệu viết tắt thì dùng, còn không thì viết tắt tên nơi đăng */
function tạoĐuôiRútGọn(mãDựÁn: MãDựÁn, tênNơiĐăng: TênNơiĐăng, lầnĐăng: number, cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): ĐuôiRútGọn{
    let tênNơiĐăngRútGọn: string = ''
    if (tênNơiĐăng !== lấyKýHiệuViếtTắt(tênNơiĐăng, cấuHìnhNơiĐăng)) {
        tênNơiĐăngRútGọn = lấyKýHiệuViếtTắt(tênNơiĐăng, cấuHìnhNơiĐăng) 
    } else {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < 3; i++) {
            tênNơiĐăngRútGọn += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    } 
    return `${mãDựÁn}${tênNơiĐăngRútGọn}${lầnĐăng}`
}  

export default function tạoThamSốUTMVàLiênKếtRútGọn(nơiĐăng: NơiĐăng, bàiĐăng: BàiĐăng, lầnĐăng: number, cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): ThamSốUTMVàLiênKếtRútGọn{
    const tênNềnTảng = nơiĐăng["Tên nền tảng"]
    const loạiNơiĐăng = nơiĐăng["Loại nơi đăng"]
    const tênNơiĐăng = nơiĐăng["Tên nơi đăng"];
    const loạiNềnTảng = nơiĐăng["Loại nền tảng"];

    const url = bàiĐăng.url
    const dựÁn = bàiĐăng["Dự án"]
    const mãDựÁn = bàiĐăng["Dự án"]["Mã dự án"]
    const thamSốUTM: ThamSốUTM = {
        source: tạoSource(loạiNềnTảng, tênNềnTảng, loạiNơiĐăng, tênNơiĐăng, cấuHìnhNơiĐăng),
        medium: tạoMedium(loạiNơiĐăng, loạiNềnTảng),
        campaign: tạoCampaign(dựÁn),
        content: tạoContent(nơiĐăng, bàiĐăng),
        term: tạoTerm(nơiĐăng, bàiĐăng),
    }
    return {
        'Tham số UTM': thamSốUTM,
        'Liên kết UTM': tạoLiênKếtUTM(url, thamSốUTM),
        'Đuôi rút gọn': tạoĐuôiRútGọn(mãDựÁn, tênNơiĐăng, lầnĐăng, cấuHìnhNơiĐăng),
    } 
} 