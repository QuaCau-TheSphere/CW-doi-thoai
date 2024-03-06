import builder from 'npm:utm-builder';
import VậtThểChiaSẻ, { VậtThểNộiDung, Source, Medium, LiênKếtUTM, PhầnRútGọn } from "../Ki%E1%BB%83u.ts";
import { ThamSốUTM } from "../Ki%E1%BB%83u.ts";

function tạoSource(vậtThểNộiDung: VậtThểNộiDung): Source{
    switch (vậtThểNộiDung['Loại nơi đăng']){
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
function tạoMedium(vậtThểNộiDung: VậtThểNộiDung): Medium{
switch (vậtThểNộiDung['Loại nơi đăng']){
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
function tạoCampaign(vậtThểNộiDung: VậtThểNộiDung){
    return vậtThểNộiDung['Loại bài viết'] 
} 
function tạoContent(vậtThểNộiDung: VậtThểNộiDung){
    return vậtThểNộiDung['Dự án'] //TODO
} 
function tạoTerm(vậtThểNộiDung: VậtThểNộiDung){
    return vậtThểNộiDung['Dự án'] //TODO
} 

function tạoLiênKếtUTM(vậtThểNộiDung: VậtThểNộiDung, thamSốUTM: ThamSốUTM): LiênKếtUTM{
    console.log("🚀 ~ tạoLiênKếtUTM ~ thamSốUTM:", thamSốUTM)
    console.log("🚀 ~ tạoLiênKếtUTM ~ vậtThểNộiDung:", vậtThểNộiDung)
    
    return builder(vậtThểNộiDung.url, thamSốUTM.source, thamSốUTM.medium, thamSốUTM.campaign, thamSốUTM.content, thamSốUTM.term)
}  
function tạoLiênKếtRútGọn(vậtThểNộiDung: VậtThểNộiDung, thamSốUTM: ThamSốUTM): PhầnRútGọn{
    return 'chưaLàmLiênKếtRútGọn' //TODO
}  

export default function tạoVậtThểChiaSẻ(vậtThểNộiDung: VậtThểNộiDung): VậtThểChiaSẻ{
    const thamSốUTM = {
        source: tạoSource(vậtThểNộiDung),
        medium: tạoMedium(vậtThểNộiDung),
        campaign: tạoCampaign(vậtThểNộiDung),
        content: tạoContent(vậtThểNộiDung),
        term: tạoTerm(vậtThểNộiDung),
    }
    return {
        'Tham số UTM': thamSốUTM,
        'Liên kết UTM': tạoLiênKếtUTM(vậtThểNộiDung, thamSốUTM),
        'Phần rút gọn': tạoLiênKếtRútGọn(vậtThểNộiDung, thamSốUTM),
    } 
} 
