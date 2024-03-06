import {MộtCâuLog, KhốiKếtQuả, VịTríBắtĐầu, VịTríKếtThúc} from '../Code hỗ trợ/Kiểu cho việc xử lý.ts'
import { ChỉSốChiều, lấyChỉSốChiều } from '../Code hỗ trợ/Hàm liên quan tới chiều.ts';
import { KhaiBáoChiều } from "../Code hỗ trợ/Kiểu cho dữ liệu nhập vào.ts";
/**
 * Nếu trong câu nhập có cả từ đơn và từ ghép thì chỉ chọn từ ghép. Ví dụ như nếu câu nhập có 'bún bò', thì chỉ có một món là 'bún bò', không phải hai món là 'bún' và 'bò'.
*/
function loạiBỏTừĐơnBịNhậnDiệnSai(
    khốiKếtQuả: KhốiKếtQuả, 
    debug1: MộtCâuLog[]
    ): void {
    debug1.push(['Hàm con được kiểm tra', 'loạiBỏTừĐơnBịNhậnDiệnSai'])
    
    let danhSáchTừĐượcPhátHiện: [string, [VịTríBắtĐầu, VịTríKếtThúc]][] = tạodanhSáchTừĐượcPhátHiện();
    const danhSáchTừCầnBịLoại = tạodanhSáchTừCầnBịLoại();
    loạiBỏTừĐơnBịNhậnDiệnSaiTrongkhốiKếtQuả();
    
    
    /** Đổi cấu trúc khốiKếtQuả để dễ tính toán  */
    function tạodanhSáchTừĐượcPhátHiện() {
        debug1.push(['Hàm con được kiểm tra', '.tạodanhSáchTừĐượcPhátHiện']);
        const danhSáchTừĐượcPhátHiện: [string, [VịTríBắtĐầu, VịTríKếtThúc]][] = []
        for (const i of khốiKếtQuả) {
            for (const k in i[0]) {
                debug1.push(['i', khốiKếtQuả.indexOf(i)]);
                debug1.push(['i[0]', JSON.stringify(i[0])]);
                debug1.push(['i[2]', JSON.stringify(i[2])]);

                danhSáchTừĐượcPhátHiện.push([i[0][k], i[2][k]]);
                debug1.push(['Từ được phát hiện', JSON.stringify(i[0][k])]);

                debug1.push(['Vị trí trong câu nhập', JSON.stringify(i[2][k])]);
                debug1.push(['', '']);
            }
        }
        debug1.push(['Danh sách từ được phát hiện', JSON.stringify(danhSáchTừĐượcPhátHiện)]);
        return danhSáchTừĐượcPhátHiện;
    }

    /** 
     * Tìm những từ cần bị loại 
     * x, y là vị trí của từ trong danhSáchTừĐượcPhátHiện 
     * từ x, từ y là cặp từ và vị trí của nó trong từ*/
    function tạodanhSáchTừCầnBịLoại() {
        debug1.push(['Hàm con được kiểm tra', '.tạodanhSáchTừCầnBịLoại']);

        danhSáchTừĐượcPhátHiện = danhSáchTừĐượcPhátHiện.filter( từ => từ[1] !== undefined ) 
        const danhSáchTừCầnBịLoại = []; let x = 0;
        while (x < danhSáchTừĐượcPhátHiện.length) {
            let y = x + 1;
            const từx: [string, [VịTríBắtĐầu, VịTríKếtThúc]] = danhSáchTừĐượcPhátHiện[x];
            if (từx[1] === undefined) {
            x++
            continue
            }
            while (y < danhSáchTừĐượcPhátHiện.length) {
                const từy: [string, [VịTríBắtĐầu, VịTríKếtThúc]] = danhSáchTừĐượcPhátHiện[y];
                if (từy[1] === undefined) {
                    y++;
                        continue
                    }
                if (từx[0].length > từy[0].length &&
                từy[1][0] >= từx[1][0] &&
                từy[1][1] <= từx[1][1]
                ) {
                    danhSáchTừCầnBịLoại.push(từy);
                }
                else if (từy[0].length > từx[0].length &&
                từx[1][0] >= từy[1][0] &&
                từx[1][1] <= từy[1][1]) {
                    danhSáchTừCầnBịLoại.push(từx);
                }
                debug1.push(['y', JSON.stringify(y)]);
                debug1.push(['từy', JSON.stringify(từy)]);
                y++;
            }
            debug1.push(['x', JSON.stringify(x)]);
            debug1.push(['từx', JSON.stringify(từx)]);
            debug1.push(['', '']);
            x++;
        }
        debug1.push(['Danh sách tất cả từ cần bị loại:', danhSáchTừCầnBịLoại]);
        return danhSáchTừCầnBịLoại;
    }

    /** Loại bỏ những từ đơn cần bị loại trong khốiKếtQuả */
    function loạiBỏTừĐơnBịNhậnDiệnSaiTrongkhốiKếtQuả() {
        debug1.push(['Hàm con được kiểm tra', '.loạiBỏTừĐơnBịNhậnDiệnSaiTrongkhốiKếtQuả']);
        for (const từCầnBịLoại of danhSáchTừCầnBịLoại) {
            for (const i of khốiKếtQuả) {
                for (const vịTríTrongCâuNhập of i[2]) {
                if (từCầnBịLoại[1] === vịTríTrongCâuNhập) {
                    const k = i[2].indexOf(vịTríTrongCâuNhập);
                    if (k > -1) {
                        i[0].splice(k, 1);
                        i[1].splice(k, 1);
                        i[2].splice(k, 1);
                    }
                }
                }
            }
        }
    }
}

/**
 * Nếu trong câu nhập có nhiều món đồ cùng nhãn thì chỉ lấy một nhãn
*/
function loạiBỏNhãnBịTrùngLặp(
    khốiKếtQuả: KhốiKếtQuả,
    debug2: MộtCâuLog[]
    ): void {
    khốiKếtQuả[0][0] = [...new Set(khốiKếtQuả[0][0])]
    khốiKếtQuả[0][1] = [...new Set(khốiKếtQuả[0][1])]
}


function làmSạchKếtQuả(
    khốiKếtQuả: KhốiKếtQuả,
    debug: MộtCâuLog[] 
    ): void {
    debug.push(['Hàm được kiểm tra', 'làmSạchKếtQuả'])
    const debug1: MộtCâuLog[] = [] 
    const debug2: MộtCâuLog[] = [] 

    loạiBỏTừĐơnBịNhậnDiệnSai(khốiKếtQuả, debug1)
    loạiBỏNhãnBịTrùngLặp(khốiKếtQuả, debug2) 

    debug.push(...debug1) 
    // debug.push(...debug2) 
}

export default làmSạchKếtQuả