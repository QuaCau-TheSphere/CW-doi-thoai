import { MộtCâuLog } from '../Code hỗ trợ/Kiểu cho việc xử lý.ts'
import { ANY_CHAR } from '../Code hỗ trợ/Regex.ts'
import { CâuNhập, DữLiệuCấuHình } from '../Code hỗ trợ/Kiểu cho dữ liệu nhập vào.ts'

function xửLýDấuThanhVàViếtTắt(câuNhập: CâuNhập, dữLiệuCấuHình: DữLiệuCấuHình, debug: MộtCâuLog[]) {
    const kiểuCũ  = ['òa', 'óa', 'ỏa', 'õa', 'ọa', 'òe', 'óe', 'ỏe', 'õe', 'ọe', 'ùy', 'úy', 'ủy', 'ũy', 'ụy']
    const kiểuMới = ['oà', 'oá', 'oả', 'oã', 'oạ', 'oè', 'oé', 'oẻ', 'oẽ', 'oẹ', 'uỳ', 'uý', 'uỷ', 'uỹ', 'uỵ']
    const VIẾT_TẮT = dữLiệuCấuHình['Viết tắt']
    const danhSáchViếtTắt: string[][] = [[],[]]
    debug.push([`danhSáchViếtTắt[0]`, danhSáchViếtTắt[0]])
    
    if (!VIẾT_TẮT) return câuNhập
    
    for (const danhMục of VIẾT_TẮT) {
        
        const sốCáchViếtTắt = Object.values(danhMục)[0].length
        const từĐượcViếtĐầyĐủ = Object.keys(danhMục)[0]
        
        danhSáchViếtTắt[0] = danhSáchViếtTắt[0].concat(Object.values(danhMục)[0])
        danhSáchViếtTắt[1] = danhSáchViếtTắt[1].concat(Array(sốCáchViếtTắt).fill(từĐượcViếtĐầyĐủ))
        // debug.push([`danhMục`, JSON.stringify(danhMục) ])
        // debug.push([`danhSáchViếtTắt[0]`, danhSáchViếtTắt[0]])
    }

    for (const k in kiểuCũ) {
        if (câuNhập.includes(kiểuCũ[k])) {
            câuNhập = câuNhập.replaceAll(kiểuCũ[k], kiểuMới[k])
        }
    }
    for (const k in danhSáchViếtTắt[0]) {
        // debug.push([`danhSáchViếtTắt[0][${k}]`, danhSáchViếtTắt[0][k]])
        // debug.push([`danhSáchViếtTắt[1][${k}]`, danhSáchViếtTắt[1][k]])
        if (câuNhập.includes(danhSáchViếtTắt[0][k])) {
            const regex = new RegExp('(?<!' + ANY_CHAR + ')'+ danhSáchViếtTắt[0][k] + '(?!' + ANY_CHAR + ')', 'giu');
            câuNhập = câuNhập.replace(regex, danhSáchViếtTắt[1][k])
            debug.push(['Phát hiện từ viết tắt', danhSáchViếtTắt[0][k]])
            debug.push(['Câu nhập sau khi thay từ viết tắt', câuNhập])
        }
    }
    return câuNhập
}

export default xửLýDấuThanhVàViếtTắt