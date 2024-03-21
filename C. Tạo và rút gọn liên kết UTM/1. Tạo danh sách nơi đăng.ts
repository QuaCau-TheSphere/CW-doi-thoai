import { parse } from "$std/yaml/mod.ts";
import * as path from "$std/path/mod.ts";
import CấuHìnhNơiĐăng, { DanhSáchNơiĐăng, MáyChủ, VậtThểNơiĐăngChat } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
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
                'Loại nơi đăng': loạiNơiĐăngMXH,
                "Tên nền tảng": tênMXH
            }) 
        } 
    } 
    
    /** Chat */
    for (const [tênNềnTảngChat, vậtThểNơiĐăngChat] of Object.entries(cấuHìnhNơiĐăng.Chat) as [string, VậtThểNơiĐăngChat][]) {
        /** Cộng đồng trên Discord, Messenger, Telegram */
        lấyNơiĐăngTừCộngĐồngChat('Discord'); 
        lấyNơiĐăngTừCộngĐồngChat('Messenger'); 
        lấyNơiĐăngTừCộngĐồngChat('Telegram'); 
        
        /** Nền tảng chat khác */
        for (const [loạiNơiĐăngChat, danhSáchNơiĐăngChat] of Object.entries(vậtThểNơiĐăngChat)) {
            if (
                tênNềnTảngChat === 'Discord' && loạiNơiĐăngChat === 'Máy chủ' ||
                tênNềnTảngChat === 'Messenger' && loạiNơiĐăngChat === 'Cộng đồng' ||
                tênNềnTảngChat === 'Telegram' && loạiNơiĐăngChat === 'Nhóm' ||
                !danhSáchNơiĐăngChat
            ) { 
                continue
            }  

            for (const tênNơiĐăngChat of danhSáchNơiĐăngChat) {
                danhSáchNơiĐăng.push({
                    'Tên nơi đăng': tênNơiĐăngChat,
                    'Loại nơi đăng': loạiNơiĐăngChat,
                    "Tên nền tảng": tênNềnTảngChat
                }) 
            } 
        } 
    } 
    
    /** Khác */
    for (const [loạiNơiĐăngKhác, danhSáchNơiĐăngKhác] of Object.entries(cấuHìnhNơiĐăng.Khác)) {
        if (!danhSáchNơiĐăngKhác) continue
        for (const tênNơiĐăngKhác of danhSáchNơiĐăngKhác) {
            danhSáchNơiĐăng.push({
                'Tên nơi đăng': tênNơiĐăngKhác,
                'Loại nơi đăng': loạiNơiĐăngKhác,
                "Tên nền tảng": 'Khác'
            })         
        } 
    }
    
    return danhSáchNơiĐăng
    
    /**
     * Về mặt phân cấp thì Messenger Cộng đồng và Discord là như nhau. Chỉ khác nhau ở cái tên. Không gom chung lại thành cùng một tên biến để sau này debug cho dễ, đỡ phải nhớ nhiều tên biến 
     * @param tênNềnTảng 
     * @argument danhSáchMáyChủ Trên Discord thì gọi là máy chủ, trên Messenger thì gọi là cộng đồng
     * @argument 
     */
    function lấyNơiĐăngTừCộngĐồngChat(tênNềnTảng: 'Discord' | 'Messenger' | 'Telegram') {
        let loạiNơiĐăng: 'Cộng đồng' | 'Máy chủ' | 'Nhóm' 
        let danhSáchMáyChủ: MáyChủ[] 

        if (tênNềnTảng === "Messenger") {
            loạiNơiĐăng = 'Cộng đồng'
            danhSáchMáyChủ = cấuHìnhNơiĐăng.Chat.Messenger["Cộng đồng"]
        } else if (tênNềnTảng === "Discord") {
            loạiNơiĐăng = 'Máy chủ'
            danhSáchMáyChủ = cấuHìnhNơiĐăng.Chat.Discord["Máy chủ"]
        } else {
            loạiNơiĐăng = 'Nhóm'
            danhSáchMáyChủ = cấuHìnhNơiĐăng.Chat.Telegram.Nhóm
        } 
        for (const MáyChủ of danhSáchMáyChủ) {
            for (const [tênMáyChủ, danhSáchKênh] of Object.entries(MáyChủ)) {
                for (const kênh of danhSáchKênh) {
                    if (typeof kênh === 'string') {
                    danhSáchNơiĐăng.push({
                        'Tên nơi đăng': kênh,
                        'Tên cộng đồng': tênMáyChủ,
                        'Loại nơi đăng': loạiNơiĐăng,
                        "Tên nền tảng": tênNềnTảng
                    });
            
                    } else {
                        for (const [tênKênh, danhSáchThreadHoặcTopic] of Object.entries(kênh)) {
                            if (danhSáchThreadHoặcTopic === null) {
                            danhSáchNơiĐăng.push({
                                'Tên nơi đăng': tênKênh,
                                'Tên cộng đồng': tênMáyChủ,
                                'Loại nơi đăng': loạiNơiĐăng,
                                "Tên nền tảng": tênNềnTảng
                            });
                            } else {
                                for (const threadHoặcTopic of danhSáchThreadHoặcTopic) {
                                    danhSáchNơiĐăng.push({
                                    'Tên nơi đăng': `${threadHoặcTopic} (${tênKênh})`,
                                    'Tên cộng đồng': tênMáyChủ,
                                    'Loại nơi đăng': loạiNơiĐăng,
                                    "Tên nền tảng": tênNềnTảng
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} 
const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng()
console.log(JSON.stringify(danhSáchNơiĐăng, null, 2))
// console.log(JSON.stringify(danhSáchNơiĐăng[0], null, 2))
