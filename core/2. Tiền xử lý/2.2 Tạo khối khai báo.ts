import { DữLiệuTựNhậnDạngCủaMộtChiều, KhaiBáoChiều } from '../Code hỗ trợ/Kiểu cho dữ liệu nhập vào.ts'
import { ChiềuKhốiKhaiBáo, DanhSáchNhãn, DanhSáchTừ } from "../Code hỗ trợ/Kiểu cho việc xử lý.ts"

/** Đổi cấu trúc dữ liệu tự nhận dạng do người dùng nhập từ dạng vật thể của các mảng sang dạng mảng 2 chiều
*/
function tạoCặpDanhSáchTừVàNhãn(dữLiệuTựNhậnDạngCủaMộtChiều: DữLiệuTựNhậnDạngCủaMộtChiều): ChiềuKhốiKhaiBáo {
    let danhSáchTừ  : DanhSáchTừ   = [];
    let danhSáchNhãn: DanhSáchNhãn = [];
    if (dữLiệuTựNhậnDạngCủaMộtChiều) {
        for (const danhMục of dữLiệuTựNhậnDạngCủaMộtChiều) {
            if (Object.values(danhMục)[0] === null) continue
            const độDàiGiáTrịDanhMục = Object.values(danhMục)[0].length
            const nhãnDanhMục = Object.keys(danhMục)[0]
    
            danhSáchTừ = danhSáchTừ.concat(Object.values(danhMục)[0])
            danhSáchNhãn = danhSáchNhãn.concat(Array(độDàiGiáTrịDanhMục).fill(nhãnDanhMục))
        }
    } else {
        danhSáchTừ = null
        danhSáchNhãn = null
    }
    return [danhSáchTừ, danhSáchNhãn]
}

/**
 * @description Nếu có chiều nào ra `[null, null]` thì là do người dùng không khai báo dữ liệu tự nhận dạng 
*/
function tạoKhốiKhaiBáo(khaiBáo: KhaiBáoChiều[]) {
    const khốiKhaiBáo = khaiBáo.map(chiều => 
        tạoCặpDanhSáchTừVàNhãn(chiều['Dữ liệu tự nhận dạng'])
    )
    return khốiKhaiBáo
}

export default tạoKhốiKhaiBáo