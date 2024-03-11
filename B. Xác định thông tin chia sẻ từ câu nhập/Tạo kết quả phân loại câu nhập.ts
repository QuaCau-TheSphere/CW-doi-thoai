import { làRỗng }                          from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/H%C3%A0m%20li%C3%AAn%20quan%20t%E1%BB%9Bi%20c%E1%BA%A5u%20h%C3%ACnh.ts"
import { lấyTênChiều, lấyTênNhãn }         from './Code%20h%E1%BB%97%20tr%E1%BB%A3/H%C3%A0m%20li%C3%AAn%20quan%20t%E1%BB%9Bi%20chi%E1%BB%81u.ts'
import {Debug, KếtQuảPhânLoại, KhốiKếtQuả}   from './Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20vi%E1%BB%87c%20x%E1%BB%AD%20l%C3%BD.ts'
import { CâuNhập, DữLiệuCấuHình, Falsy }   from './Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20d%E1%BB%AF%20li%E1%BB%87u%20nh%E1%BA%ADp%20v%C3%A0o.ts'
import xửLýDấuThanhVàViếtTắt               from './2.%20Ti%E1%BB%81n%20x%E1%BB%AD%20l%C3%BD/2.1%20X%E1%BB%AD%20l%C3%BD%20d%E1%BA%A5u%20thanh%20v%C3%A0%20vi%E1%BA%BFt%20t%E1%BA%AFt.ts'
import tạoKhốiKhaiBáo                      from "./2.%20Ti%E1%BB%81n%20x%E1%BB%AD%20l%C3%BD/2.2%20T%E1%BA%A1o%20kh%E1%BB%91i%20khai%20b%C3%A1o.ts"
import lọcDữLiệuTừCâuNhập                  from './3.%20L%E1%BB%8Dc%20d%E1%BB%AF%20li%E1%BB%87u/3.1%20T%E1%BA%A1o%20kh%E1%BB%91i%20k%E1%BA%BFt%20qu%E1%BA%A3.ts'
import làmSạchKếtQuả                       from './3.%20L%E1%BB%8Dc%20d%E1%BB%AF%20li%E1%BB%87u/3.2%20L%C3%A0m%20s%E1%BA%A1ch%20k%E1%BA%BFt%20qu%E1%BA%A3.ts'
import xửLýChiềuĐặcThù                     from './3.%20L%E1%BB%8Dc%20d%E1%BB%AF%20li%E1%BB%87u/3.3%20X%E1%BB%AD%20l%C3%BD%20chi%E1%BB%81u%20%C4%91%E1%BA%B7c%20th%C3%B9.ts'

/**
 * Tạo kết quả phân loại từ câu nhập
 * @description Đầu tiên nó tạo ra một khốiKếtQuả rỗng, sau đó lần lượt chạy các hàm sau:
 * - Kiểm tra xem câu nhập có rỗng hay không
 * - Tạo khối kết quả và debug
 * 2. Tiền xử lý: 
 *   2.1 Xử lý dấu thanh và viết tắt
 *   2.2 Tạo khối khai báo
 * 3. Lọc dữ liệu: 
 *   3.1 Lọc dữ liệu từ câu nhập
 *   3.2 Làm sách kết quả
 *   3.3 Xử lý chiều đặc thù
 */
function tạoKếtQuảPhânLoại(câuNhậpGốc: CâuNhập | Falsy, dữLiệuCấuHình: DữLiệuCấuHình): KếtQuảPhânLoại {
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
    const vậtThểKếtQuả: KếtQuảPhânLoại = {
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

export default tạoKếtQuảPhânLoại