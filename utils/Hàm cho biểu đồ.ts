// deno-fmt-ignore-file
import { ĐơnVị, DữLiệuTruyCậpCácNăm, DữLiệuBiểuĐồ, DANH_SÁCH_ĐƠN_VỊ_THỜI_GIAN } from "./Ki%E1%BB%83u%20cho%20web.ts";

type DanhSáchThờiĐiểm = Date[]
function tạoDanhSáchThờiĐiểmĐượcTruyCập(dữLiệuTruyCậpCácNăm: DữLiệuTruyCậpCácNăm): DanhSáchThờiĐiểm {
const danhSáchThờiĐiểmĐượcTruyCập: DanhSáchThờiĐiểm = [] 
for (const [_year, monthData] of Object.entries(dữLiệuTruyCậpCácNăm)) {
 for (const [_month, dayData] of Object.entries(monthData)) {
   for (const [_day, hourData] of Object.entries(dayData)) {
     for (const [_hour, hitsEachHour] of Object.entries(hourData)) {
       for (const hit of hitsEachHour) {
         danhSáchThờiĐiểmĐượcTruyCập.push(hit)
       } 
     }
   }
 }
}
return danhSáchThờiĐiểmĐượcTruyCập
}
  
function thêmThờiGian(startDate: Date|string|number, sốLượng: number, đơnVị: ĐơnVị) {
    let date: Date
    typeof startDate === 'string' || typeof startDate === 'number' ? date = new Date(startDate) : date = startDate
    switch (đơnVị) {
      case "giờ":
        return new Date(date.setHours(date.getHours() + sốLượng));
      case "ngày":
        return new Date(date.setDate(date.getDate() + sốLượng));
      case "tuần":
        return new Date(date.setDate(date.getDate() + 7 * sốLượng));
      case "tháng":
        return new Date(date.setMonth(date.getMonth() + sốLượng));
      case "năm":
        return new Date(date.setFullYear(date.getFullYear() + sốLượng));
    }
}

/** Nếu không có đơn vị thì mặc định là giờ */
function lọc(danhSáchThờiĐiểm: DanhSáchThờiĐiểm, thờiĐiểmĐangXét: Date, đơnVị?: ĐơnVị): DanhSáchThờiĐiểm {
  const nămĐangXét = thờiĐiểmĐangXét.getFullYear() 
  const thángĐangXét = thờiĐiểmĐangXét.getMonth() 
  //todo const tuầnĐangXét = thờiĐiểmĐangXét.getMonth() 
  const ngàyĐangXét = thờiĐiểmĐangXét.getDate() 
  const giờĐangXét = thờiĐiểmĐangXét.getHours() 
  
  const danhSáchCùngNăm = danhSáchThờiĐiểm.filter(thờiĐiểm => (new Date(thờiĐiểm)).getFullYear() === nămĐangXét) 
  if (đơnVị === "năm") return danhSáchCùngNăm

  const danhSáchCùngTháng = danhSáchCùngNăm.filter(thờiĐiểm => (new Date(thờiĐiểm)).getMonth() === thángĐangXét) 
  if (đơnVị === "tháng") return danhSáchCùngTháng
  
  //todo: tuần
  if (đơnVị === "tuần") return [] 

  const danhSáchCùngNgày = danhSáchCùngTháng.filter(thờiĐiểm => (new Date(thờiĐiểm)).getDate() === ngàyĐangXét) 
  if (đơnVị === "ngày") return danhSáchCùngNgày
  
  const danhSáchCùngGiờ = danhSáchCùngNgày.filter(thờiĐiểm => (new Date(thờiĐiểm)).getHours() === giờĐangXét) 
  return danhSáchCùngGiờ
} 

export function tạoDữLiệuBiểuĐồ(dữLiệuTruyCậpCácNăm: DữLiệuTruyCậpCácNăm): DữLiệuBiểuĐồ {
  const danhSáchThờiĐiểm = tạoDanhSáchThờiĐiểmĐượcTruyCập(dữLiệuTruyCậpCácNăm)
  const danhSáchDạngSố = danhSáchThờiĐiểm.map(i => i.getTime())
  const minDate = Math.min(...danhSáchDạngSố)
  const maxDate = Math.max(...danhSáchDạngSố)
  
  const kếtQuả: Partial<DữLiệuBiểuĐồ> = {} 
  for (const đơnVị of DANH_SÁCH_ĐƠN_VỊ_THỜI_GIAN) {
    const dữLiệuBiểuĐồ: {datetime: Date, hit: number}[] = [];
    let i = minDate
    while (i <= maxDate) {
      const thờiĐiểmĐangXét = new Date(i)   
      dữLiệuBiểuĐồ.push({
        datetime: thờiĐiểmĐangXét,
        hit: lọc(danhSáchThờiĐiểm, thờiĐiểmĐangXét, đơnVị).length,
      });
    
      i = thêmThờiGian(i, 1, đơnVị).getTime()
    }
    kếtQuả[đơnVị] = dữLiệuBiểuĐồ
  } 
  return kếtQuả as DữLiệuBiểuĐồ
}