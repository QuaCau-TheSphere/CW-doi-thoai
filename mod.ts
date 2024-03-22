import tạoThamSốUTMVàLiênKếtRútGọn from "./C.%20T%E1%BA%A1o%20v%C3%A0%20r%C3%BAt%20g%E1%BB%8Dn%20li%C3%AAn%20k%E1%BA%BFt%20UTM/3.%20T%E1%BA%A1o%20tham%20s%E1%BB%91%20UTM%20v%C3%A0%20li%C3%AAn%20k%E1%BA%BFt%20r%C3%BAt%20g%E1%BB%8Dn.ts";
import { writeText } from "https://deno.land/x/copy_paste/mod.ts";
import tạoDanhSáchNơiĐăng from "./C.%20T%E1%BA%A1o%20v%C3%A0%20r%C3%BAt%20g%E1%BB%8Dn%20li%C3%AAn%20k%E1%BA%BFt%20UTM/2.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV } from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";
import tạoDanhSáchVậtThểBàiĐăngTrênVault from "./C.%20T%E1%BA%A1o%20v%C3%A0%20r%C3%BAt%20g%E1%BB%8Dn%20li%C3%AAn%20k%E1%BA%BFt%20UTM/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import tạoDanhSáchVậtThểBàiĐăngTrênWordPress from "./C.%20T%E1%BA%A1o%20v%C3%A0%20r%C3%BAt%20g%E1%BB%8Dn%20li%C3%AAn%20k%E1%BA%BFt%20UTM/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/b.%20L%E1%BA%A5y%20t%E1%BB%AB%20WordPress.ts";
import { đọcCấuHìnhNơiĐăng } from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/Code%20h%E1%BB%97%20tr%E1%BB%A3.ts";

const danhSáchVậtThểBàiĐăng = (await tạoDanhSáchVậtThểBàiĐăngTrênVault(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT)).concat(await tạoDanhSáchVậtThểBàiĐăngTrênWordPress(ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV)) 
const cấuHìnhNơiĐăng = đọcCấuHìnhNơiĐăng()
const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng)

const bàiĐăng = danhSáchVậtThểBàiĐăng.find(e => e["Tiêu đề"] === 'Các buổi đáp ứng nhu cầu học cách sử dụng công cụ và tư duy lập trình cho nhu cầu công việc')
const nơiĐăng = danhSáchNơiĐăng.find(e => e["Tên nơi đăng"] === 'Các buổi đáp ứng nhu cầu học lập trình hoặc quản lý dự án')
const thamSốUTMVàLiênKếtRútGọn = tạoThamSốUTMVàLiênKếtRútGọn(nơiĐăng!, bàiĐăng!, cấuHìnhNơiĐăng) 

const liênKếtUTM = thamSốUTMVàLiênKếtRútGọn["Liên kết UTM"]
const phầnRútGọn = thamSốUTMVàLiênKếtRútGọn["Phần rút gọn"]
const TÊN_MIỀN_RÚT_GỌN = 'https://quacau.deno.dev'
const liênKếtRútGọn = TÊN_MIỀN_RÚT_GỌN + '/' + phầnRútGọn

const kv = await Deno.openKv();
await kv.set(['Phần rút gọn', phầnRútGọn], thamSốUTMVàLiênKếtRútGọn);

console.log(`Bài viết: %c${bàiĐăng!["Tiêu đề"]}`, 'color: green')
console.log(`URL: %c${bàiĐăng!.url}`, 'color: green')
console.table(thamSốUTMVàLiênKếtRútGọn["Tham số UTM"])
console.log('Liên kết UTM:', liênKếtUTM)
await writeText(liênKếtRútGọn)
console.log(`Liên kết rút gọn (đã được chép vào clipboard): %c${liênKếtRútGọn}`, 'color: green')
console.log('Xong')
