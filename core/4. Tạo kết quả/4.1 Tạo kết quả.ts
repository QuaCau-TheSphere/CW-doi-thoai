import { làRỗng }                          from "../Code hỗ trợ/Hàm liên quan tới cấu hình.ts"
import { lấyTênChiều, lấyTênNhãn }         from '../Code hỗ trợ/Hàm liên quan tới chiều.ts'
import {Debug, VậtThểKếtQuả, KhốiKếtQuả}   from '../Code hỗ trợ/Kiểu cho việc xử lý.ts'
import { CâuNhập, DữLiệuCấuHình, Falsy }   from '../Code hỗ trợ/Kiểu cho dữ liệu nhập vào.ts'
import xửLýDấuThanhVàViếtTắt               from '../2. Tiền xử lý/2.1 Xử lý dấu thanh và viết tắt.ts'
import tạoKhốiKhaiBáo                      from "../2. Tiền xử lý/2.2 Tạo khối khai báo.ts"
import lọcDữLiệuTừCâuNhập                  from '../3. Lọc dữ liệu/3.1 Tạo khối kết quả.ts'
import làmSạchKếtQuả                       from '../3. Lọc dữ liệu/3.2 Làm sạch kết quả.ts'
import xửLýChiềuĐặcThù                     from '../3. Lọc dữ liệu/3.3 Xử lý chiều đặc thù.ts'

/**
 * Tạo kết quả từ câu nhập
 * @description Đầu tiên nó tạo ra một khốiKếtQuả rỗng, sau đó chạy tất cả các hàm đã được xây dựng.
 */
function tạoKếtQuả(câuNhậpGốc: CâuNhập | Falsy, dữLiệuCấuHình: DữLiệuCấuHình): VậtThểKếtQuả {
    if (làRỗng(câuNhậpGốc) ) {
        console.log('Câu nhập rỗng. Bỏ qua')
        return {
            'Câu nhập': câuNhậpGốc,
            debug: 'Câu nhập rỗng'
        }
    }

    /* Tạo khốiKếtQuả và debug */
    const debug = new Debug() 
    const debug0 = debug.tạoKếtQuả
    debug0.push(['Hàm được kiểm tra', 'tạoKếtQuả'])

    const khaiBáo = dữLiệuCấuHình['Khai báo']
    const khốiKhaiBáo = tạoKhốiKhaiBáo(khaiBáo) 
    
    const khốiKếtQuả: KhốiKếtQuả = khốiKhaiBáo.map( () => [[], [], []])
    
    let câuNhập = xửLýDấuThanhVàViếtTắt(câuNhậpGốc as CâuNhập, dữLiệuCấuHình, debug.xửLýDấuThanhVàViếtTắt)
    câuNhập = ' ' + câuNhập + ' ';      //thêm khoảng trắng trước và sau để regex chạy được
    câuNhập = lọcDữLiệuTừCâuNhập(câuNhập, khaiBáo, khốiKhaiBáo, khốiKếtQuả, debug.lọcDữLiệuTừCâuNhập)
    
    làmSạchKếtQuả(khốiKếtQuả, debug.làmSạchKếtQuả)
    xửLýChiềuĐặcThù(câuNhập, khaiBáo, khốiKếtQuả, debug.xửLýChiềuĐặcThù)

    /* Nhập khốiKếtQuả và debug và vậtThểKếtQuả */
    const vậtThểKếtQuả: VậtThểKếtQuả = {
        'Câu nhập': câuNhậpGốc,
        debug: debug
    }
    for (const i in khốiKếtQuả) {
        const tênChiều = lấyTênChiều(i, khaiBáo)
        const tênNhãn = lấyTênNhãn(tênChiều) 
        debug0.push(['tênChiều', tênChiều])
        debug0.push([`khốiKếtQuả[${i}][0]`, khốiKếtQuả[i][0]])
        
        /* Nếu khốiKếtQuả[i][0] === [null] thì ở vậtThểKếtQuả sẽ là null*/
        if (khốiKếtQuả[i][0][0] === null && khốiKếtQuả[i][0].length === 1) {
            vậtThểKếtQuả[tênChiều] = null
            if (khaiBáo[i]['Dữ liệu tự nhận dạng']) {
                vậtThểKếtQuả[tênNhãn] = null 
            }
        } else {
            debug0.push([`khốiKếtQuả[${i}][0].join(', ')`, khốiKếtQuả[i][0].join(', ')])
            vậtThểKếtQuả[tênChiều] = khốiKếtQuả[i][0].join(', ') 
            debug0.push([`vậtThểKếtQuả['${tênChiều}']`, vậtThểKếtQuả[tênChiều]])
            if (khaiBáo[i]['Dữ liệu tự nhận dạng']) {
                vậtThểKếtQuả[tênNhãn] = khốiKếtQuả[i][1].join(', ')
            }
        }
    }
    return vậtThểKếtQuả
}

export default tạoKếtQuả