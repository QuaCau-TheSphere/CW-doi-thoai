import { parse } from "$std/yaml/mod.ts";
import * as path from "$std/path/mod.ts";
import CấuHìnhNơiĐăng, { DanhSáchNơiĐăng } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
function đọcCấuHìnhNơiĐăng(): CấuHìnhNơiĐăng{
    const thưMụcHiệnTại = path.dirname(path.fromFileUrl(import.meta.url))
    return parse(Deno.readTextFileSync(thưMụcHiệnTại+'/Nơi đăng.yaml')) as CấuHìnhNơiĐăng
} 

export function tạoDanhSáchNơiĐăng() {
    const cấuHìnhNơiĐăng = đọcCấuHìnhNơiĐăng() 
    const danhSáchNơiĐăng: DanhSáchNơiĐăng = [] 

    /** Mạng xã hội */
    for (const [tênMXH, vậtThểNơiĐăngMXH] of Object.entries(cấuHìnhNơiĐăng["Mạng xã hội"]) ) {
        for (const [loạiNơiĐăngMXH, tênNơiĐăngMXH] of Object.entries(vậtThểNơiĐăngMXH)) {
            danhSáchNơiĐăng.push({
                'Tên nơi đăng': tênNơiĐăngMXH,
                'Loại nơi đăng': `${loạiNơiĐăngMXH} ${tênMXH}`
            }) 
        } 
    } 
    
    /** Chat */
    for (const [tênNềnTảngChat, vậtThểNơiĐăngChat] of Object.entries(cấuHìnhNơiĐăng.Chat) ) {
        /** Về mặt phân cấp thì Messenger Cộng đồng và Discord là như nhau. Chỉ khác nhau ở cái tên. Không gom chung lại thành cùng một tên biến để sau này debug cho dễ, đỡ phải nhớ nhiều tên biến */
        /** Cộng đồng Messenger */
        const danhSáchCộngĐồngMessenger = cấuHìnhNơiĐăng.Chat.Messenger["Cộng đồng"]
        for (const cộngĐồng of danhSáchCộngĐồngMessenger) {
            for (const [tênCộngĐồng, danhSáchPhòngChatCộngĐồng] of Object.entries(cộngĐồng)) {
                for (const tênPhòngChatCộngĐồng of danhSáchPhòngChatCộngĐồng) {
                    danhSáchNơiĐăng.push({
                        'Tên nơi đăng': tênPhòngChatCộngĐồng,
                        'Tên cộng đồng': tênCộngĐồng,
                        'Loại nơi đăng': `Cộng đồng Messenger`
                    })
                } 
            } 
        } 
        
        /** Máy chủ Discord */
        const danhSáchMáyChủDiscord = cấuHìnhNơiĐăng.Chat.Discord["Máy chủ"]
        for (const MáyChủ of danhSáchMáyChủDiscord) {
            for (const [tênMáyChủ, danhSáchKênh] of Object.entries(MáyChủ)) {
                for (const kênh of danhSáchKênh) {
                    if (typeof kênh === 'string') {
                        danhSáchNơiĐăng.push({
                            'Tên nơi đăng': kênh,
                            'Tên cộng đồng': tênMáyChủ,
                            'Loại nơi đăng': 'Máy chủ Discord'
                        })
                        
                    } else {
                        for (const [tênKênh, danhSáchThreadHoặcTopic] of Object.entries(kênh)) {
                            if (danhSáchThreadHoặcTopic === null) {
                                danhSáchNơiĐăng.push({
                                    'Tên nơi đăng': tênKênh,
                                    'Tên cộng đồng': tênMáyChủ,
                                    'Loại nơi đăng': 'Máy chủ Discord'
                                })
                            } else {
                                for (const threadHoặcTopic of danhSáchThreadHoặcTopic) {
                                    danhSáchNơiĐăng.push({
                                        'Tên nơi đăng': `${threadHoặcTopic} (${tênKênh})`,
                                        'Tên cộng đồng': tênMáyChủ,
                                        'Loại nơi đăng': 'Máy chủ Discord'
                                    })
                                } 
                            } 
                        } 
                    } 
                } 
            } 
        } 
        
        /** Nền tảng chat khác */
        for (const [loạiNơiĐăngChat, tênNơiĐăngChat] of Object.entries(vậtThểNơiĐăngChat)) {
            if (tênNềnTảngChat === 'Messenger' && loạiNơiĐăngChat === 'Cộng đồng' ||
                tênNềnTảngChat === 'Discord' && loạiNơiĐăngChat === 'Máy chủ') { 
                continue
            }   
            danhSáchNơiĐăng.push({
                'Tên nơi đăng': tênNơiĐăngChat as string,
                'Loại nơi đăng': loạiNơiĐăngChat + tênNềnTảngChat
            }) 
        } 
    } 

    return danhSáchNơiĐăng
} 
const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng()
console.log(JSON.stringify(danhSáchNơiĐăng, null, 2))
// console.log(JSON.stringify(danhSáchNơiĐăng[0], null, 2))
