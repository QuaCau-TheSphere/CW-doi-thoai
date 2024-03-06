import tạoKếtQuảPhânLoại from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/4.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/4.1%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3.ts";
import { lấyCấuHìnhHợpLệ } from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/Code%20h%E1%BB%97%20tr%E1%BB%A3/H%C3%A0m%20li%C3%AAn%20quan%20t%E1%BB%9Bi%20c%E1%BA%A5u%20h%C3%ACnh.ts";
import { CâuNhập } from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20d%E1%BB%AF%20li%E1%BB%87u%20nh%E1%BA%ADp%20v%C3%A0o.ts";
import tạoVậtThểChiaSẻ from "./C.%20T%E1%BA%A1o%20v%C3%A0%20r%C3%BAt%20g%E1%BB%8Dn%20li%C3%AAn%20k%E1%BA%BFt%20UTM/1.%20T%E1%BA%A1o%20li%C3%AAn%20k%E1%BA%BFt%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import { writeText } from "https://deno.land/x/copy_paste/mod.ts";
import { DanhSáchVậtThểBàiViết, VậtThểNộiDung } from "./Ki%E1%BB%83u.ts";
import { VậtThểKếtQuảPhânLoại } from "./B.%20X%C3%A1c%20%C4%91%E1%BB%8Bnh%20th%C3%B4ng%20tin%20chia%20s%E1%BA%BB%20t%E1%BB%AB%20c%C3%A2u%20nh%E1%BA%ADp/Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20vi%E1%BB%87c%20x%E1%BB%AD%20l%C3%BD.ts";

// const cấuHìnhNhậpVào = await Deno.readTextFile('Cấu hình.yaml')
// const cấuHìnhCóVẻHợpLệ = lấyCấuHìnhHợpLệ(cấuHìnhNhậpVào)
// const vậtThểKếtQuảPhânLoại = tạoKếtQuảPhânLoại(Deno.args[0] as CâuNhập, cấuHìnhCóVẻHợpLệ) 
const vậtThểKếtQuảPhânLoại = {
    'Câu nhập': 'c31',
    'Bài viết': 'Trấn Kỳ — Phân loại câu nhập bằng tiếng Việt tự nhiên',
    'Loại bài viết': 'C Trấn Kỳ',
    'Nơi đăng': 'Vùng đất Quả Cầu',
    'Loại nơi đăng': 'Nhóm Facebook'
} satisfies VậtThểKếtQuảPhânLoại //todo

const tiêuĐềTrang = vậtThểKếtQuảPhânLoại["Bài viết"] as string

const danhSáchVậtThểBàiViết = [
    {
        title: 'Trấn Kỳ — Phân loại câu nhập bằng tiếng Việt tự nhiên',
        url: 'https://tranky.deno.dev'
    } 
] //todo
function lấyURL(tiêuĐềTrang: string, danhSáchVậtThểBàiViết: DanhSáchVậtThểBàiViết) {
    const vậtThểBàiViết = danhSáchVậtThểBàiViết.find(vậtThểBàiViết => vậtThểBàiViết.title = tiêuĐềTrang)
    if (vậtThểBàiViết != undefined) {
        return vậtThểBàiViết.url
    } else {
        throw new Error('Không tìm thấy URL cho bài viết') 
    } 
} 
const url = lấyURL(tiêuĐềTrang, danhSáchVậtThểBàiViết) 
const vậtThểNộiDung = { 
    url: url, 
    "Tiêu đề": tiêuĐềTrang,
    ...vậtThểKếtQuảPhânLoại
} satisfies VậtThểNộiDung

const vậtThểChiaSẻ = tạoVậtThểChiaSẻ(vậtThểNộiDung) 
const liênKếtUTM = vậtThểChiaSẻ["Liên kết UTM"]
const phầnRútGọn = vậtThểChiaSẻ["Phần rút gọn"]
const TÊN_MIỀN_RÚT_GỌN = 'https://quacau.deno.dev'
const liênKếtRútGọn = TÊN_MIỀN_RÚT_GỌN + '/' + phầnRútGọn

const kv = await Deno.openKv();
await kv.set(['Phần rút gọn', phầnRútGọn], vậtThểChiaSẻ);

console.log(`Bài viết: %c${tiêuĐềTrang}`, 'color: green')
console.log(`URL: %c${url}`, 'color: green')
console.table(vậtThểChiaSẻ["Tham số UTM"])
console.log('Liên kết UTM:', liênKếtUTM)
await writeText(liênKếtRútGọn)
console.log(`Liên kết rút gọn (đã được chép vào clipboard): %c${liênKếtRútGọn}`, 'color: green')
console.log('Xong')