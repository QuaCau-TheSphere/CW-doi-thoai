import tạoKếtQuả from '../B.%20Ph%C3%A2n%20lo%E1%BA%A1i/4.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/4.1%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3.ts'
import lấyDữLiệuCấuHình, { lấyCấuHìnhHợpLệ } from  '../B.%20Ph%C3%A2n%20lo%E1%BA%A1i/Code%20h%E1%BB%97%20tr%E1%BB%A3/H%C3%A0m%20li%C3%AAn%20quan%20t%E1%BB%9Bi%20c%E1%BA%A5u%20h%C3%ACnh.ts'
import builder from 'npm:utm-builder';
import { writeText } from "https://deno.land/x/copy_paste/mod.ts";

const kv = await Deno.openKv();
const cấuHìnhNhậpVào = await Deno.readTextFile('Cấu hình.yaml')
const dữLiệuCấuHình = lấyCấuHìnhHợpLệ(cấuHìnhNhậpVào)

const câuNhập = Deno.args.join(' ')
const vậtThểKếtQuả = tạoKếtQuả(câuNhập, dữLiệuCấuHình) 
// console.log(vậtThểKếtQuả)

const tiêuĐềBàiViết = vậtThểKếtQuả['Bài viết'] 
if (typeof tiêuĐềBàiViết !== 'string') {
    throw "Tiêu đề bài viết không phải là string" 
} 
const urls = [
    {
        tiêuĐề: "Một đám mây chim sáo",
        url: "https://quảcầu.cc/mot-dam-may-chim-sao/" 
    },
    {
        tiêuĐề: "Truyện ngụ ngôn về những người mong đợi",
        url: "https://quảcầu.cc/truyen-ngu-ngon-ve-nhung-nguoi-mong-doi/" 
    },
    {
        tiêuĐề: "Trang chủ Obsidian, quản lý dự án và công cụ nghĩ",
        url: "https://obsidian.quảcầu.cc/" 
    },
    {
        tiêuĐề: "Trang chủ Tiếp thị số, xử lý dữ liệu và lập trình",
        url: "https://lậptrình.quảcầu.cc/" 
    },
    {
        tiêuĐề: "Trấn Kỳ — Phân loại câu nhập bằng tiếng Việt tự nhiên",
        url: "https://tranky.deno.dev" 
    },
    {
        tiêuĐề: "Các buổi đáp ứng nhu cầu học lập trình",
        url: "https://quảcầu.cc/cac-buoi-dap-ung-nhu-cau-hoc-cach-su-dung-cong-cu-va-tu-duy-lap-trinh-cho-nhu-cau-ca-nhan-hoac-nghien-cuu/" 
    },
    {
        tiêuĐề: "Bàn làm việc Google Calendar",
        url: "https://quảcầu.cc/ban-lam-viec-google-calendar/" 
    },
    {
        tiêuĐề: "Tích hợp Trấn Kỳ vào hệ thống của bạn",
        url: "https://quảcầu.cc/tich-hop-tran-ky-vao-he-thong-cua-ban/" 
    },
] 
const url = urls.find(({tiêuĐề}) => tiêuĐề === tiêuĐềBàiViết)!.url

let loạiNơiĐăng
switch (vậtThểKếtQuả['Loại nơi đăng']){
    case 'Nhóm Facebook':
        loạiNơiĐăng = 'F G'
        break
    
    case 'Trang Facebook':
        loạiNơiĐăng = 'F Pg'
        break
    
    case 'Tài khoản Facebook':
        loạiNơiĐăng = 'F Pr'
        break
    
    case 'Discord':
        loạiNơiĐăng = 'Discord'
        break
    
    default:
        loạiNơiĐăng = vậtThểKếtQuả['Loại nơi đăng']
        break
} 

let medium
switch (vậtThểKếtQuả['Loại nơi đăng']){
    case 'Nhóm Facebook':
    case 'Trang Facebook':
    case 'Tài khoản Facebook':
    case 'Reddit':
        medium = 'social'
        break

    case 'Discord':
    case 'Zalo':
        medium = 'chat'
        break

    case 'Email':
        medium = 'email'
        break
    case 'quacau.deno.dev':
        medium = 'redirect'
        break
        
} 


const source = `${loạiNơiĐăng} ${vậtThểKếtQuả['Nơi đăng']}`
const campaign = vậtThểKếtQuả['Loại bài viết']
const content = ''
const term = ''

console.log(`Bài viết: %c${tiêuĐềBàiViết}`, 'color: green')
console.log(`URL: %c${url}\n`, 'color: green')
console.table({
    source: source,
    medium: medium,
    campaign: campaign,
    content: content,
    term: term,
})

const utmLink = builder(url, source, medium, campaign);
// console.log('Kết quả (đã được chép vào clipboard): https://quảcầu.cc/%crútgọn', 'color: green')
console.log('Liên kết UTM:', utmLink)
// console.log('Liên kết rút gọn (đã được chép vào clipboard): https://tranky.deno.dev/%crútgọn\n\n', 'color: green')
await writeText(utmLink)


interface NơiĐăng {
	'Nơi đăng': string,
	url: string,
	'Viết tắt': string[]
} 
interface BàiViết {
	'Bài viết': string,
	url: string,
	'Viết tắt': string[]
} 

const prefs: BàiViết = {
	'Bài viết': "ada",
	url: "dark",
	'Viết tắt': ["en-US"] ,
};
const prefs2 = {
  'Nơi đăng': "ada",
  url: "dark",
  'Viết tắt': "en-US",
};

const result = await kv.set(["preferences", "ada"], prefs);

const entry = await kv.get(["preferences", "ada"]);
console.log(entry.key);
console.log(entry.value);
console.log(entry.versionstamp);