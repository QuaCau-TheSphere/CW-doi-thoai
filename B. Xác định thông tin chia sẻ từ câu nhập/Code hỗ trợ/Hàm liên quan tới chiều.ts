import { KhaiBáoChiều } from './Kiểu cho dữ liệu nhập vào.ts'

type ChỉSốChiều = number | `${number}`
type TênChiều = Capitalize<string>
type TênNhãn = `Loại ${Uncapitalize<string>}`
/** 
 * Lấy chỉ số chiều từ tên chiều hoặc tên nhãn, theo thứ tự khai báo của người dùng. Ví dụ, người dùng khai báo chiều `Món đồ` đầu tiên, thì chỉ số của chiều này là `0`.
 * @description Nếu kết quả ra `-1` nghĩa là chiều đó không tồn tại. Nó dùng để kiểm tra xem một chiều đặc thù nào đó có tồn tại hay không. Vì những chiều đặc thù cần phải được xử lý riêng. Nếu cứ cố xử lý những chiều này mà không chúng không tồn tại thì sẽ gây lỗi.
 */
function lấyChỉSốChiều(tênChiềuHoặcTênNhãn: TênChiều|TênNhãn, khaiBáo: KhaiBáoChiều[]): ChỉSốChiều {
    let tênChiều: TênChiều
    if (tênChiềuHoặcTênNhãn.startsWith('Loại ')) {
        const tênNhãn = tênChiềuHoặcTênNhãn
        const temp = tênNhãn.replace(/^Loại /g, '')
        tênChiều = temp.charAt(0).toUpperCase() + temp.slice(1)
    } else {
        tênChiều = tênChiềuHoặcTênNhãn
    }
    const danhSáchChỉSốChiều = Object.entries(khaiBáo).find(([k, v]) => v['Tên chiều'] === tênChiều)

    if (danhSáchChỉSốChiều) {
        return Number(danhSáchChỉSốChiều[0]) 
    } else {
        return -1
    }
}
function lấyTênChiều(chỉSốChiều: ChỉSốChiều, khaiBáo: KhaiBáoChiều[]): TênChiều {
    try {
        return khaiBáo[chỉSốChiều]['Tên chiều'];
    } catch {
        throw new Error(`Không có chiều nào có chỉ số chiều là ${chỉSốChiều}`)
    }
}

function lấyTênNhãn(tênChiều: TênChiều): TênNhãn {
	return 'Loại ' + tênChiều.charAt(0).toLowerCase() + tênChiều.slice(1) as TênNhãn
}
export {lấyChỉSốChiều, lấyTênChiều, lấyTênNhãn}
export type {ChỉSốChiều, TênChiều, TênNhãn}