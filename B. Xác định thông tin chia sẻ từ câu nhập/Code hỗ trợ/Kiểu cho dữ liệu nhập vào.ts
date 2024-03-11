import { TênChiều } from "./Hàm liên quan tới chiều.ts";
import { KếtQuảPhânLoại } from "./Kiểu cho việc xử lý.ts"
type CấuHìnhĐượcNhập = DữLiệuCấuHình | string

type DữLiệuTựNhậnDạngCủaMộtChiều = Record<string, string[]>[]
type Falsy = false | "" | null | undefined 
type CâuNhập = string 
interface KhaiBáoChiều {
    'Tên chiều': TênChiều,
    'Dữ liệu tự nhận dạng'?: DữLiệuTựNhậnDạngCủaMộtChiều,
    'Giá trị mặc định'?: string,
    'Ký tự để nhập trực tiếp'?: {Từ: string[], Nhãn: string[]},
    'Tên gọi đầu ra'?: {Từ: string, Nhãn: string}
}
interface DữLiệuCấuHình {
    'Khai báo': KhaiBáoChiều[],
    'Viết tắt'?: Record<string, string[]>[],
    Keep?: {ID: string, 'App password': string},
    Fibery?: {
        API: {
            host: string, 
            token: string
        }, 
        'Tên space': string,
        'Tên database': string, 
        'Name field'?: {
            Tên?: string,
            'Giá trị'?: string
        }
    }
}
export type {
    CấuHìnhĐượcNhập,
    DữLiệuTựNhậnDạngCủaMộtChiều, 
    KhaiBáoChiều,
    DữLiệuCấuHình,
    CâuNhập,
    Falsy,
}
