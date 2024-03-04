import { CâuNhập, Falsy } from './Kiểu cho dữ liệu nhập vào.ts'

type VịTríBắtĐầu = number
type VịTríKếtThúc = number
type Từ = string | number | null
type Nhãn = string
type ChiềuDữLiệu = [Từ[], Nhãn[], [VịTríBắtĐầu, VịTríKếtThúc][]] 
type KhốiKếtQuả = ChiềuDữLiệu[] 

type MộtCâuLog = [string, unknown]

type KếtQuảHiểnThị = {
    [key: string]: number | string | null
}
/**
 * Cần để kiểu `Câu nhập rỗng` vào `VậtThểKếtQuả` vì khi chạy số lượng lớn thì sẽ muốn hàm `tạoKếtQuả()` vẫn chạy được, và `DanhSáchVậtThểKếtQuả` đơn giản là `VậtThểKếtQuả[]`
 */
interface VậtThểKếtQuả {
    'Câu nhập': CâuNhập | Falsy
    [key: string]: string | number | Debug | Falsy,
    'Số tiền'?: number | null,
    debug: Debug | 'Câu nhập rỗng'
}

class Debug {
    xửLýDấuThanhVàViếtTắt: MộtCâuLog[]
    lọcDữLiệuTừCâuNhập: MộtCâuLog[]
    loạiBỏTừĐơnBịNhậnDiệnSai: MộtCâuLog[]
    làmSạchKếtQuả: MộtCâuLog[]
    xửLýChiềuĐặcThù: MộtCâuLog[]
    tạoKếtQuả: MộtCâuLog[]

    constructor() {
        this.xửLýDấuThanhVàViếtTắt = []
        this.lọcDữLiệuTừCâuNhập = []
        this.loạiBỏTừĐơnBịNhậnDiệnSai = []
        this.làmSạchKếtQuả = []
        this.xửLýChiềuĐặcThù = []
        this.tạoKếtQuả = []
        }
}

type DanhSáchTừ = string[] | null
type DanhSáchNhãn = string[] | null
type ChiềuKhốiKhaiBáo = [DanhSáchTừ, DanhSáchNhãn]

export {
	Debug,
};

export type {
    VậtThểKếtQuả,
    KếtQuảHiểnThị,
    KhốiKếtQuả,

    VịTríBắtĐầu,
    VịTríKếtThúc,

    MộtCâuLog,

    DanhSáchTừ,
    DanhSáchNhãn,
    ChiềuKhốiKhaiBáo
};
