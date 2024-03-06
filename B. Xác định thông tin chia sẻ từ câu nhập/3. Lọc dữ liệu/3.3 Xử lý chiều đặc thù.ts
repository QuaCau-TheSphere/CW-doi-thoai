import {ANY_CHAR} from '../Code hỗ trợ/Regex.ts'
import {MộtCâuLog, KhốiKếtQuả} from '../Code hỗ trợ/Kiểu cho việc xử lý.ts'
import {ChỉSốChiều, lấyChỉSốChiều} from '../Code hỗ trợ/Hàm liên quan tới chiều.ts'
import { CâuNhập, KhaiBáoChiều } from "../Code hỗ trợ/Kiểu cho dữ liệu nhập vào.ts";

/**
 * Tất cả những số tiền trong câu nhập sẽ được đưa vào trong danhSáchSốTiềnDạngChữ. Trong trường hợp danh sách này chỉ chứa 1 kết quả, thì đó chính là số tiền. Nếu có nhiều hơn 1, thì lấy kết quả mà ở trước nó có dấu '='. Kết quả cuối cùng sẽ được gán vào tổngTrướcKhiĐịnhDạng.
 */
function lọcSốTiền(
    câuNhập: CâuNhập, 
    khốiKếtQuả: KhốiKếtQuả, 
    i: ChỉSốChiều,
    debug: MộtCâuLog[]
    ): number | null {
    debug.push(['Hàm con được kiểm tra', 'lấySốTiền'])
    debug.push(['Câu nhập', câuNhập])

    /* Đọc thêm trong tài liệu hướng dẫn để hiểu biểu thức regex này */
    const regexSốTiền = new RegExp('=? *(\\d|,|\\.)+ ?(k|tr|d|đ)(?!' + ANY_CHAR + ')', 'giu');
    const danhSáchSốTiềnDạngChữ = câuNhập.match(regexSốTiền) as string[] | null
    debug.push(['Danh sách số tiền dạng chữ', danhSáchSốTiềnDạngChữ]);
    
    let tổngSốTiềnDạngSố
    if (danhSáchSốTiềnDạngChữ === null) { 
        tổngSốTiềnDạngSố = null
    } else if (danhSáchSốTiềnDạngChữ.some(sốTiền => sốTiền.includes('='))) {
        const tổngSốTiềnDạngChữ = danhSáchSốTiềnDạngChữ.find(sốTiền => sốTiền.includes('='))!
        tổngSốTiềnDạngSố = đổiSốTiềnSangDạngSố(tổngSốTiềnDạngChữ) 
    } else {
        const danhSáchSốTiềnDạngSố = danhSáchSốTiềnDạngChữ.map(sốTiền => đổiSốTiềnSangDạngSố(sốTiền))
        tổngSốTiềnDạngSố = danhSáchSốTiềnDạngSố.reduce((a, b) => a + b, 0)
    }

    khốiKếtQuả[i][0][0] = tổngSốTiềnDạngSố
    debug.push(['Tổng số tiền dạng số', tổngSốTiềnDạngSố])

    return tổngSốTiềnDạngSố

    function đổiSốTiềnSangDạngSố(sốTiềnDạngChữ: string): number {
        const phầnNguyên = parseFloat(sốTiềnDạngChữ.replace(/=|k|tr|d|đ|,/gu, ''));

        if (sốTiềnDạngChữ.includes('tr')) {
            return phầnNguyên * 1000000;
        } else if(sốTiềnDạngChữ.includes('k')) {
            return phầnNguyên * 1000;
        } else {
            return phầnNguyên;
        }
    }
}
/**
 * Nếu trong câu nhập có nhiều PTTT thì chỉ lấy cái cuối cùng, còn tất cả những cái phía trước chỉ là thông tin
 */
function lấyPTTTCuốiCùng(
    khốiKếtQuả: KhốiKếtQuả, 
    i: ChỉSốChiều,
    debug: MộtCâuLog[]
    ){
    debug.push(['Hàm con được kiểm tra', 'lấyPTTTCuốiCùng'])
    debug.push(['khốiKếtQuả[i][0]', khốiKếtQuả[i][0]]);
    const danhSáchVịTríCuốiCủaCácPTTTTrongCâuNhập = khốiKếtQuả[i][2].map((vịTríCuối: number[]) => vịTríCuối[1]);
    const vịTríCuốiCủaPTTTThựcSự = Math.max(...danhSáchVịTríCuốiCủaCácPTTTTrongCâuNhập);
    let k = danhSáchVịTríCuốiCủaCácPTTTTrongCâuNhập.indexOf(vịTríCuốiCủaPTTTThựcSự);
    /* Nếu ra k === -1 nghĩa là chỉ tìm được 1 PTTT */
    k === -1 ? k = 0 : k;
    khốiKếtQuả[i][0] = [khốiKếtQuả[i][0][k]];
    khốiKếtQuả[i][1] = [khốiKếtQuả[i][1][k]];
    khốiKếtQuả[i][2] = [khốiKếtQuả[i][2][k]];

    debug.push(['k', JSON.stringify(k)]);
    debug.push(['PTTT thực sự', khốiKếtQuả[i][0][k]]);
}

function xửLýChiềuĐặcThù(
    câuNhập: CâuNhập,
    khaiBáo: KhaiBáoChiều[],
    khốiKếtQuả: KhốiKếtQuả,
    debug: MộtCâuLog[] 
) {
    debug.push(['Hàm được kiểm tra', 'xửLýChiềuĐặcThù'])

    const i1 = lấyChỉSốChiều('Số tiền', khaiBáo) 
    if (i1 !== -1) lọcSốTiền(câuNhập, khốiKếtQuả, i1, debug);

    const i2 = lấyChỉSốChiều('Phương thức thanh toán', khaiBáo) 
    if (i2 !== -1) lấyPTTTCuốiCùng(khốiKếtQuả, i2, debug);
        
}
export default xửLýChiềuĐặcThù
