import tạoDanhSáchVậtThểBàiViết from "../A.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20v%E1%BA%ADt%20th%E1%BB%83%20b%C3%A0i%20vi%E1%BA%BFt/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import { KếtQuảPhânLoạiCâuNhập, VậtThểTiếpThị } from "../Ki%E1%BB%83u.ts";

/**
 * 
 * @param tiêuĐề tiêu đề được khai báo trong cấu hình phải trùng với tiêu đề có được khi tạo danh sách vật thể bài viết
 * @returns 
 */
async function lấyURL(tiêuĐề: string) {
    
    const danhSáchVậtThểBàiViết = await tạoDanhSáchVậtThểBàiViết("D:\\QC supplements\\Vaults\\C Obsidian, quản lý dự án và công cụ nghĩ", 'https://obsidian.quảcầu.cc') //todo
    const vậtThểBàiViết = danhSáchVậtThểBàiViết.find(vậtThểBàiViết => vậtThểBàiViết.title = tiêuĐề)
    if (vậtThểBàiViết != undefined) {
        return vậtThểBàiViết.url
    } else {
        throw new Error('Không tìm thấy URL cho bài viết') 
    } 
} 
export default async function tạoVậtThểTiếpThị(kếtQuảPhânLoạiCâuNhập: KếtQuảPhânLoạiCâuNhập): Promise<VậtThểTiếpThị>{
    const tiêuĐề = kếtQuảPhânLoạiCâuNhập["Bài viết"]
    const chiếnDịch = kếtQuảPhânLoạiCâuNhập["Loại bài viết"]
    const nơiĐăng = kếtQuảPhânLoạiCâuNhập["Nơi đăng"]
    const loạiNơiĐăng = kếtQuảPhânLoạiCâuNhập["Loại nơi đăng"]
    const url = await lấyURL(tiêuĐề) 
    
    return {
        url: url,
        'Tiêu đề': tiêuĐề,
        'Chiến dịch': chiếnDịch,
        'Nơi đăng': nơiĐăng,
        'Loại nơi đăng': loạiNơiĐăng,
    } 
} 
