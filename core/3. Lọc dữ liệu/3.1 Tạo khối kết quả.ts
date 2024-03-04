import {ANY_CHAR, escapeRegex} from '../Code hỗ trợ/Regex.ts'
import {MộtCâuLog, KhốiKếtQuả, ChiềuKhốiKhaiBáo} from '../Code hỗ trợ/Kiểu cho việc xử lý.ts'
import {ChỉSốChiều, TênChiều, TênNhãn, lấyChỉSốChiều, lấyTênNhãn} from '../Code hỗ trợ/Hàm liên quan tới chiều.ts'
import { CâuNhập, KhaiBáoChiều } from "../Code hỗ trợ/Kiểu cho dữ liệu nhập vào.ts";

/** Những gì được điền trực tiếp sẽ được nhập thẳng vào vật thể kết quả, không nhập vào khối câu nhập */
function lọcDữLiệuĐượcĐiềnTrựcTiếp(
    câuNhập: CâuNhập,
    khaiBáo: KhaiBáoChiều[], 
    khốiKếtQuả: KhốiKếtQuả, 
    debug1: MộtCâuLog[]
    ): CâuNhập {
        
    debug1.push(['Hàm con được kiểm tra', 'lọcDữLiệuĐượcĐiềnTrựcTiếp'])
    for (const i of khaiBáo) {
        if (!i['Ký tự để nhập trực tiếp']) continue
        const tênChiều = i['Tên chiều']
        debug1.push(['Tên chiều', tênChiều])         
        
        if (i['Ký tự để nhập trực tiếp']['Nhãn']) {
            const tênNhãn = lấyTênNhãn(tênChiều) 
            const kýTựBênTráiChoNhãn: string = i['Ký tự để nhập trực tiếp']['Nhãn'][0]
            const kýTựBênPhảiChoNhãn  : string = i['Ký tự để nhập trực tiếp']['Nhãn'][1]
            lọc('nhãn', tênNhãn, kýTựBênTráiChoNhãn, kýTựBênPhảiChoNhãn)
        }
        if (i['Ký tự để nhập trực tiếp']['Từ']) {
            const kýTựBênTráiChoTừ: string = i['Ký tự để nhập trực tiếp']['Từ'][0]
            const kýTựBênPhảiChoTừ  : string = i['Ký tự để nhập trực tiếp']['Từ'][1]
            lọc('chiều', tênChiều, kýTựBênTráiChoTừ, kýTựBênPhảiChoTừ)
        }
        debug1.push([' ', '\n\n\n'])
    }
    /**
     * Lọc từ khoá vào chiều hoặc nhãn của nó, dựa vào các ký tự để nhập trực tiếp cho chiều hoặc nhãn đó
     * 
     * **Cách nhận dạng từ khoá:** Từ khoá bắt đầu ngay sau ký tự để nhập trực tiếp bên trái cho tới ngay trước ký tự bên phải. Nếu sau đó không gặp lại ký tự bên phải thì từ khoá sẽ dừng khi gặp dấu cách đầu tiên.
     * @param tênChiềuHoặcTênNhãn 
     * @param kýTựBênTrái 
     * @param kýTựBênPhải Nếu người dùng không khai báo ký tự bên phải thì mặc định là giống ký tự bên trái
     */
    function lọc(
        loạiDữLiệu: 'chiều' | 'nhãn',
        tênChiềuHoặcTênNhãn: TênChiều | TênNhãn, 
        kýTựBênTrái: string, 
        kýTựBênPhải = kýTựBênTrái
        ): void {
        debug1.push(['Hàm con được kiểm tra', `.lọc ${tênChiềuHoặcTênNhãn}`])
        const escapedKýTựBênTrái = escapeRegex(kýTựBênTrái) 
        const escapedKýTựBênPhải = escapeRegex(kýTựBênPhải) 
        debug1.push([`câuNhập`, câuNhập])

        const danhSáchRegex = {
            '1 đầu': new RegExp('(?<= ' + escapedKýTựBênTrái + ')(.*?)(?= )', 'g'),
            '2 đầu': new RegExp('(?<= ' + escapedKýTựBênTrái + ')(?!' + escapedKýTựBênTrái + ').*?(?=' + escapedKýTựBênPhải + ' )', 'g'),
        }

        /* Cần làm 2 đầu trước 1 đầu */
        lọcRegex('2 đầu') 
        lọcRegex('1 đầu') 
        
        function lọcRegex(key: '1 đầu' | '2 đầu'){
            const regex: RegExp = danhSáchRegex[key]
            debug1.push([`Regex ${key}`, regex])
            let cóTừTrongCâuNhập = true;
            const danhSáchTừĐượcPhátHiện: string[] = []
            while (cóTừTrongCâuNhập) {
                const kếtQuảLọc = regex.exec(câuNhập)
                if (kếtQuảLọc === null || kếtQuảLọc[0] === '') {
                    cóTừTrongCâuNhập = false
                    debug1.push(['Không phát hiện được DLĐNTT nào', '']);
                    danhSáchTừĐượcPhátHiện.push('')
                    continue
                }
                /* DLĐNTT = dữ liệu được nhập trực tiếp. Dữ liệu này có thể là DLĐNTT dành cho chiều (VD: @cá), hoặc DLĐNTT dành cho nhãn (VD: @@lương thực@@). Đặt tên là từ hoặc từKhoá cũng được, nhưng sẽ dễ bị nhầm vì dữ liệu cần tự động nhận dạng chính là từ khoá dành cho chiều, và nó đã được gọi tắt là từ */
                const DLĐNTT = kếtQuảLọc[0]
                danhSáchTừĐượcPhátHiện.push(DLĐNTT)
                
                debug1.push(['Từ được nhận diện', DLĐNTT]);
                const i = lấyChỉSốChiều(tênChiềuHoặcTênNhãn, khaiBáo)
                if (loạiDữLiệu === 'chiều') {
                    khốiKếtQuả[i][0].push(DLĐNTT)
                    khốiKếtQuả[i][1].push('')
                } else {
                    khốiKếtQuả[i][0].push('')
                    khốiKếtQuả[i][1].push(DLĐNTT)
                } 
                khốiKếtQuả[i][2].push([regex.lastIndex - DLĐNTT.length, regex.lastIndex])
            }
            
            for (const DLĐNTT of danhSáchTừĐượcPhátHiện) {
                let phầnCầnThay: string
                key === '1 đầu' ? phầnCầnThay = kýTựBênTrái + DLĐNTT : phầnCầnThay = kýTựBênTrái + DLĐNTT + kýTựBênPhải
                câuNhập = câuNhập.replaceAll(phầnCầnThay, '~'.repeat(phầnCầnThay.length) )
            }
            debug1.push([`câuNhập`, câuNhập])
            debug1.push(['', ''])
        }
    }
    debug1.push([`câuNhập`, câuNhập])
    debug1.push(['', ''])
    return câuNhập
}


/**
 * Trong mỗi chiều dữ liệu, xét lần lượt từng từ trong khối khai báo để xem nó có trong câu nhập hay không. Nếu có thì sẽ cho vào khối câu nhập và dán nhãn nó. Nếu không thì dùng mặc định.
*/
function lọcDữLiệuCầnTựĐộngNhậnDạng(
    câuNhập: CâuNhập, 
    khốiKhaiBáo: ChiềuKhốiKhaiBáo[],
    khốiKếtQuả: KhốiKếtQuả, 
    debug2: MộtCâuLog[]
    ): void {
    debug2.push(['Hàm con được kiểm tra', 'lọcDữLiệuCầnTựĐộngNhậnDạng']);

    /* Đi lần lượt từng chiều một */
    for (const i in khốiKhaiBáo) {
        /* Nếu người dùng không khai báo dữ liệu tự nhận dạng thì bỏ qua chiều này */
        if (khốiKhaiBáo[i][0] === null) continue

        /* Đi lần lượt từng từ trong danhSáchTừ để xem có nó trong câu nhập hay không. Nếu có thì sẽ cho vào khốiKếtQuả */
        for (const từ of khốiKhaiBáo[i][0]!) {
            /* Đọc thêm trong hướng dẫn sử dụng về biểu thức regex này */
            const regex = new RegExp('(?<!' + ANY_CHAR + ')' + từ + '(?!' + ANY_CHAR + ')', 'giu');
            let cóTừTrongCâuNhập = true;
            while (cóTừTrongCâuNhập) {
                cóTừTrongCâuNhập = regex.test(câuNhập);
                debug2.push(['Từ được kiểm tra', từ])
                if (cóTừTrongCâuNhập) {
                debug2.push(['Từ được nhận diện', từ]);
                regex.lastIndex = regex.lastIndex - 1;
                dánNhãnTừ(i, từ, khốiKhaiBáo, khốiKếtQuả, regex.lastIndex, debug2);
            }
            }
        }
        // debug2.push([`khốiKếtQuả[${i}][0]`, khốiKếtQuả[i][0]]);
    }
}

/**
 * Đẩy từ vào khốiKếtQuả. Nếu chiều đang xét có dữ liệu tự nhận dạng thì tìm nhãn của từ trong khốiKhaiBáo rồi đẩy nhãn đó vào khốiKếtQuả luôn
 * @description Nếu vị trí kết thúc của từ trong câu là null thì đó là giá trị mặc định 
 * @description Chỉ dùng cho dữ liệu tự nhận dạng, không dùng cho dữ liệu được nhập trực tiếp
 * */
function dánNhãnTừ(
    i: ChỉSốChiều, 
    từ: string, 
    khốiKhaiBáo: ChiềuKhốiKhaiBáo[],
    khốiKếtQuả: KhốiKếtQuả, 
    vịTríKếtThúcCủaTừTrongCâu: number | null,
    debug: MộtCâuLog[] 
    ): void {
    function đẩyTừVàoKhốiKếtQuả() {
        // debug.push(['Hàm con được kiểm tra', 'dánNhãnTừ'])
        // console.log(i, "🚀 ~ từ:", từ)
        // console.log(`🚀 ~ khốiKhaiBáo[${i}]:`, khốiKhaiBáo[i])
        // console.log(`🚀 ~ khốiKhaiBáo[${i}][0]:`, khốiKhaiBáo[i][0])
        // console.log(`🚀 ~ khốiKếtQuả[${i}]:`, khốiKếtQuả[i])
        // console.log(`🚀 ~ khốiKếtQuả[${i}][0]:`, khốiKếtQuả[i][0])
        khốiKếtQuả[i][0].push(từ)
        // debug.push(['khốiKhaiBáo[i][0]', khốiKhaiBáo[i][0]])
    } 

    function đẩyNhãnVàoKhốiKếtQuả() {
        /** k là chỉ số của từ trong danhSáchTừ của khối khai báo. Nhãn tương ứng cho từ đó cũng nằm ở vị trí k trong danhSáchNhãn */
        if (khốiKhaiBáo[i][0] === null) return
        const k = khốiKhaiBáo[i][0]!.indexOf(từ);
        const nhãn = khốiKhaiBáo[i][1]![k];
        khốiKếtQuả[i][1].push(nhãn);
    }

    đẩyTừVàoKhốiKếtQuả() 
    đẩyNhãnVàoKhốiKếtQuả();
    if (vịTríKếtThúcCủaTừTrongCâu !== null) {
        khốiKếtQuả[i][2].push([vịTríKếtThúcCủaTừTrongCâu - từ.length, vịTríKếtThúcCủaTừTrongCâu])
    }
    // console.log("🚀 ~ từ:", từ)
    // console.log("🚀 ~ vịTríKếtThúcCủaTừTrongCâu:", vịTríKếtThúcCủaTừTrongCâu)
    // console.log("🚀 ~ khốiKếtQuả:", khốiKếtQuả)
}


/** Nếu kết quả không có từ nào thì dùng từ mặc định */
function điềnGiáTrịMặcĐịnh(
    khaiBáo: KhaiBáoChiều[], 
    khốiKhaiBáo: ChiềuKhốiKhaiBáo[],
    khốiKếtQuả: KhốiKếtQuả,
    debug3: MộtCâuLog[]) {
    debug3.push(['Hàm con được kiểm tra', 'điềnGiáTrịMặcĐịnh'])
    for (const i in khốiKếtQuả) {
        const khôngCóTừNào = khốiKếtQuả[i][0].length === 0;
        const giáTrịMặcĐịnh = khaiBáo[i]['Giá trị mặc định'];
        debug3.push(['i', i])
        debug3.push(['giáTrịMặcĐịnh ', giáTrịMặcĐịnh])
        debug3.push([`khôngCóTừNào`, khôngCóTừNào])
        if (khôngCóTừNào && giáTrịMặcĐịnh) {
            debug3.push(['Từ mặc định được gán', giáTrịMặcĐịnh])
            dánNhãnTừ(i, giáTrịMặcĐịnh, khốiKhaiBáo, khốiKếtQuả, null, debug3);
        }        
        debug3.push(['', ''])
    } 
}


function lọcDữLiệuTừCâuNhập(
    câuNhập: CâuNhập, 
    khaiBáo: KhaiBáoChiều[],
    khốiKhaiBáo: ChiềuKhốiKhaiBáo[],
    khốiKếtQuả: KhốiKếtQuả,
    debug: MộtCâuLog[] 
    ): string {
    const debug1: MộtCâuLog[] = [] 
    const debug2: MộtCâuLog[] = [] 
    const debug3: MộtCâuLog[] = [] 

    debug.push(['Hàm được kiểm tra', 'lọcDữLiệuTừCâuNhập'])
    câuNhập = lọcDữLiệuĐượcĐiềnTrựcTiếp(câuNhập, khaiBáo, khốiKếtQuả, debug1);
    lọcDữLiệuCầnTựĐộngNhậnDạng(câuNhập, khốiKhaiBáo, khốiKếtQuả, debug2);   
    điềnGiáTrịMặcĐịnh(khaiBáo, khốiKhaiBáo, khốiKếtQuả, debug3);

    debug.push(...debug1) 
    debug.push(...debug2) 
    debug.push(...debug3) 

    return câuNhập
}
export default lọcDữLiệuTừCâuNhập