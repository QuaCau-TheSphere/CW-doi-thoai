import { DữLiệuCấuHình, Falsy } from "./Kiểu cho dữ liệu nhập vào.ts";
import { parse } from "https://deno.land/std@0.194.0/yaml/mod.ts";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";

function làRỗng(dữLiệu: string | Falsy){
    return !dữLiệu || /^\\s+$/.test(dữLiệu)
} 

/**
 * Trả về cấu hình dưới dạng vật thể nếu cấu hình có vẻ hợp lệ, hoặc báo lỗi nếu phát hiện không hợp lệ
 * 
 * Kiểu `never` là để đảm bảo là mình biết rõ là nó có thể báo lỗi
 * Xem thêm: [An object is validated via a try-catch block. Why does the LSP recognize its type incorrectly?](https://stackoverflow.com/a/77769739/3416774)
 */
function lấyCấuHìnhHợpLệ(cấuHìnhNhậpVào: string|Falsy): DữLiệuCấuHình | never {
    try {
        const cấuHìnhCóVẻHợpLệ = parse(cấuHìnhNhậpVào as string) as DữLiệuCấuHình
        const khaiBáo = cấuHìnhCóVẻHợpLệ['Khai báo']
        if (!khaiBáo) throw new Error('Cấu hình chưa có phần khai báo từ khoá')

        for (const i in khaiBáo) {   
            const tênChiều = khaiBáo[i]['Tên chiều'] 
            if (!tênChiều) throw new Error(`Chiều số ${parseInt(i)+1} chưa có tên`)
            if (typeof tênChiều !== 'string') throw new Error(`Tên chiều ${parseInt(i)+1} không phải là một tên hợp lệ`) 
        } 
        return cấuHìnhCóVẻHợpLệ
    } catch (error) {
        const { name, message } = error
        if (làRỗng(cấuHìnhNhậpVào) ||
            message === 'cấuHìnhCóVẻHợpLệ is null') throw 'Cấu hình rỗng hoặc không tồn tại'
        switch (name) {
            case 'YAMLError':
                console.log(message)
                throw `Cấu hình không đúng cú pháp YAML: ${message}`
            default:
                switch (message) {
                    case "Cannot read properties of null (reading 'Khai báo')":
                        throw 'Cấu hình chưa có phần khai báo từ khoá'
                    default:
                        throw message
                } 
        } 
    } 
} 
type KýHiệuCấuHình = 'tt' | 'tương tác' | 
                     'gd' | 'giao dịch' |
                     'yt' | 'ý tưởng'   |
                     'web' |
                     'tts'| 'Tiếp thị số'|
                     ''

async function lấyDữLiệuCấuHình(kýHiệuCấuHình: KýHiệuCấuHình) {
    let tênCấuHình = '';    
    switch(kýHiệuCấuHình) {
        case 'tt':
        case 'tương tác':
            tênCấuHình = 'Tương tác';
            break;

        case 'gd':
        case 'giao dịch':
            tênCấuHình = 'Giao dịch';
            break;

        case 'ý tưởng':
        case 'yt':
            tênCấuHình = 'Ý tưởng';
            break;

        case 'web':
            tênCấuHình = 'Giao dịch mẫu cho web';
            break;

        case 'tts':
        case 'Tiếp thị số':
            tênCấuHình = 'Tiếp thị số';
            break;

        default:
        // console.error('Cấu hình không tồn tại');
        throw 'Cấu hình không tồn tại'
    }
    
    const thưMụcHiệnTại = path.dirname(path.fromFileUrl(import.meta.url))
    const đườngDẫn = thưMụcHiệnTại + '/../../A. Cấu hình/' + tênCấuHình + '.yaml'
    const cấuHìnhNhậpVào = await Deno.readTextFile(đườngDẫn)
    const cấuHìnhCóVẻHợpLệ = lấyCấuHìnhHợpLệ(cấuHìnhNhậpVào)

    return { 
        tênCấuHình: tênCấuHình,
        đườngDẫn: đườngDẫn,
        dữLiệuCấuHình: cấuHìnhCóVẻHợpLệ,
    }
}
export default lấyDữLiệuCấuHình
export { lấyCấuHìnhHợpLệ, làRỗng } 
export type { KýHiệuCấuHình}

