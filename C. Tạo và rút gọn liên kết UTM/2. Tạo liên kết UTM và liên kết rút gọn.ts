import builder from 'npm:utm-builder';
import ThamSố, { VậtThểTiếpThị, Source, Medium, LiênKếtUTM, PhầnRútGọn } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u.ts";
import { ThamSốUTM } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u.ts";

function tạoSource(vậtThểTiếpThị: VậtThểTiếpThị): Source{
    switch (vậtThểTiếpThị['Loại nơi đăng']){
        case 'Nhóm Facebook':
            return 'F G'
        
        case 'Trang Facebook':
            return 'F Pg'
        
        case 'Tài khoản Facebook':
            return 'F Pr'
        
        case 'Discord':
            return 'Discord'
        default:
            return 'Không tạo được source'
    }     
} 
function tạoMedium(vậtThểTiếpThị: VậtThểTiếpThị): Medium{
    switch (vậtThểTiếpThị['Loại nơi đăng']){
        case 'Nhóm Facebook':
        case 'Trang Facebook':
        case 'Tài khoản Facebook':
        case 'Reddit':
            return 'social'

        case 'Discord':
        case 'Zalo':
            return 'chat'

        case 'Email':
            return 'email'
        case 'quacau.deno.dev':
            return 'redirect'
        default:
            return 'Không tạo được medium'
    }     
} 
/**
 * Tên dự án chính là tên chiến dịch
 */
function tạoCampaign(vậtThểTiếpThị: VậtThểTiếpThị){
    return vậtThểTiếpThị['Loại bài viết'] 
} 
function tạoContent(vậtThểTiếpThị: VậtThểTiếpThị){
    return vậtThểTiếpThị['Dự án'] //TODO
} 
function tạoTerm(vậtThểTiếpThị: VậtThểTiếpThị){
    return vậtThểTiếpThị['Dự án'] //TODO
} 

function tạoLiênKếtUTM(vậtThểTiếpThị: VậtThểTiếpThị, thamSốUTM: ThamSốUTM): LiênKếtUTM{
    console.log("🚀 ~ tạoLiênKếtUTM ~ thamSốUTM:", thamSốUTM)
    console.log("🚀 ~ tạoLiênKếtUTM ~ vậtThểTiếpThị:", vậtThểTiếpThị)
    
    return builder(vậtThểTiếpThị.url, thamSốUTM.source, thamSốUTM.medium, thamSốUTM.campaign, thamSốUTM.content, thamSốUTM.term)
}  
function tạoLiênKếtRútGọn(vậtThểTiếpThị: VậtThểTiếpThị, thamSốUTM: ThamSốUTM): PhầnRútGọn{
    return 'chưaLàmLiênKếtRútGọn' //TODO
}  

export default function tạoVậtThểChiaSẻ(vậtThểTiếpThị: VậtThểTiếpThị): ThamSố{
    const thamSốUTM = {
        source: tạoSource(vậtThểTiếpThị),
        medium: tạoMedium(vậtThểTiếpThị),
        campaign: tạoCampaign(vậtThểTiếpThị),
        content: tạoContent(vậtThểTiếpThị),
        term: tạoTerm(vậtThểTiếpThị),
    }
    return {
        'Tham số UTM': thamSốUTM,
        'Liên kết UTM': tạoLiênKếtUTM(vậtThểTiếpThị, thamSốUTM),
        'Phần rút gọn': tạoLiênKếtRútGọn(vậtThểTiếpThị, thamSốUTM),
    } 
} 
