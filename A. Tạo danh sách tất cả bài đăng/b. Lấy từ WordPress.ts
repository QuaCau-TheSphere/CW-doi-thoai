import { parse } from "$std/csv/mod.ts";
import { BàiĐăng, TênDựÁn } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u.ts";

type TậpTinCSV = {
    post_title: string,
    guid: string,
    categories: string
}[] 
const ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV = './A. Tạo danh sách tất cả bài đăng/wpd9_posts.csv'
const tậpTinCSV = parse(Deno.readTextFileSync(ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV) , {
  skipFirstRow: true,
  strip: true,
}) as TậpTinCSV;

export default function tạoDanhSáchVậtThểBàiĐăngTrênWordPress(tậpTinCSV: TậpTinCSV) {
    const danhSáchBàiĐăng: BàiĐăng[] = [] 
        for (const dòng of tậpTinCSV) {
            const tiêuĐề = dòng.post_title
            const url = dòng.guid
            const tênDựÁn: TênDựÁn = dòng.categories

            danhSáchBàiĐăng.push({
                'Tiêu đề': tiêuĐề,
                url: url,
                'Dự án': {
                    "Tên dự án": tênDựÁn,
                    "Mã dự án": ''//todo
                } 
            })
        } 
    return danhSáchBàiĐăng
}
// console.log("🚀 ~ tạoDanhSáchVậtThểBàiĐăngTrênWordPress(tậpTinCSV) :", tạoDanhSáchVậtThểBàiĐăngTrênWordPress(tậpTinCSV) )