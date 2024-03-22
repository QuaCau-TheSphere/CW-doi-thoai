import { parse } from "$std/yaml/mod.ts";
import * as path from "$std/path/mod.ts";
import CấuHìnhNơiĐăng, { NơiĐăng, MáyChủ, VậtThểNơiĐăngChat, TênNềnTảngChat, TênMXH, VậtThểNơiĐăngMXH, LoạiNơiĐăngMXH } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { LoạiNơiĐăngKhác, LoạiNơiĐăngChat } from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
function đọcCấuHìnhNơiĐăng(): CấuHìnhNơiĐăng{
    const thưMụcHiệnTại = path.dirname(path.fromFileUrl(import.meta.url))
    return parse(Deno.readTextFileSync(thưMụcHiệnTại+'/Nơi đăng.yaml')) as CấuHìnhNơiĐăng
} 

/**
 * Lấy dữ liệu từ `Nơi đăng.yaml`
 */
export default function tạoDanhSáchNơiĐăng() {
    const cấuHìnhNơiĐăng = đọcCấuHìnhNơiĐăng() 
    const danhSáchNơiĐăng: NơiĐăng[] = [] 

    /** Mạng xã hội */
    for (const [tênMXH, vậtThểNơiĐăngMXH] of Object.entries(cấuHìnhNơiĐăng["Mạng xã hội"]) as [TênMXH, VậtThểNơiĐăngMXH][]) {
        for (const [loạiNơiĐăngMXH, danhSáchNơiĐăngMXH] of Object.entries(vậtThểNơiĐăngMXH) as [LoạiNơiĐăngMXH, string[]][]) {
            if (!danhSáchNơiĐăngMXH) continue
            for (const tênNơiĐăngMXH of danhSáchNơiĐăngMXH) {
                danhSáchNơiĐăng.push({
                    'Tên nơi đăng': tênNơiĐăngMXH,
                    'Loại nơi đăng': loạiNơiĐăngMXH,
                    "Tên nền tảng": tênMXH,
                    "Loại nền tảng": "Mạng xã hội"
                }) 
            } 
        } 
    } 
    
    /** Chat */
    for (const [tênNềnTảngChat, vậtThểNơiĐăngChat] of Object.entries(cấuHìnhNơiĐăng.Chat) as [TênNềnTảngChat, VậtThểNơiĐăngChat][]) {
        if (!vậtThểNơiĐăngChat) continue
        /** Cộng đồng trên Discord, Messenger, Telegram */
        lấyNơiĐăngTừCộngĐồngChat('Discord'); 
        lấyNơiĐăngTừCộngĐồngChat('Messenger'); 
        lấyNơiĐăngTừCộngĐồngChat('Telegram'); 
        
        /** Nền tảng chat khác */
        for (const [loạiNơiĐăngChat, danhSáchNơiĐăngChat] of Object.entries(vậtThểNơiĐăngChat) as [LoạiNơiĐăngChat, string[]][]) {
            if (
                tênNềnTảngChat === 'Discord' && loạiNơiĐăngChat === 'Máy chủ' ||
                tênNềnTảngChat === 'Messenger' && loạiNơiĐăngChat === 'Cộng đồng' ||
                tênNềnTảngChat === 'Telegram' && loạiNơiĐăngChat === 'Nhóm' ||
                !danhSáchNơiĐăngChat
                ) continue  

            for (const tênNơiĐăngChat of danhSáchNơiĐăngChat) {
                danhSáchNơiĐăng.push({
                    'Tên nơi đăng': tênNơiĐăngChat,
                    'Loại nơi đăng': loạiNơiĐăngChat,
                    "Tên nền tảng": tênNềnTảngChat,
                    "Loại nền tảng": 'Chat'
                }) 
            } 
        } 
    } 
    
    /** Khác */
    for (const [loạiNơiĐăngKhác, danhSáchNơiĐăngKhác] of Object.entries(cấuHìnhNơiĐăng.Khác) as [LoạiNơiĐăngKhác, string[]][] ) {
        if (!danhSáchNơiĐăngKhác) continue
        for (const tênNơiĐăngKhác of danhSáchNơiĐăngKhác) {
            danhSáchNơiĐăng.push({
                'Tên nơi đăng': tênNơiĐăngKhác,
                'Loại nơi đăng': loạiNơiĐăngKhác,
                "Tên nền tảng": loạiNơiĐăngKhác, 
                "Loại nền tảng": 'Khác'                
            })         
        } 
    }
    
    return danhSáchNơiĐăng
    
    /**
     * Về mặt phân cấp thì Messenger và Discord là như nhau. Chỉ khác nhau ở cái tên. Không gom chung lại thành cùng một tên biến để sau này debug cho dễ, đỡ phải nhớ nhiều tên biến 
     * | Discord                    | Messenger      | Telegram |
     * | -------------------------- | -------------- | -------- |
     * | Server                     | Community      | Group    |
     * | Text Channel/Forum Channel | Community Chat | Topic    |
     * | Channel Thread/Forum Post  | Sidechat       | ❌       |
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
                        "Tên nền tảng": tênNềnTảng,
                        "Loại nền tảng": 'Chat'
                    });
                    
                    } else {
                        for (const [tênKênh, danhSáchThreadHoặcTopic] of Object.entries(kênh)) {
                            /** Trường hợp chỉ có kênh chứ không có thread hoặc topic */
                            if (danhSáchThreadHoặcTopic === null) {
                                danhSáchNơiĐăng.push({
                                    'Tên nơi đăng': tênKênh,
                                    'Tên cộng đồng': tênMáyChủ,
                                    'Loại nơi đăng': loạiNơiĐăng,
                                    "Tên nền tảng": tênNềnTảng,
                                    "Loại nền tảng": 'Chat'
                                });

                            /** Trường hợp kênh có thread hoặc topic nhỏ hơn*/
                            } else {
                                for (const threadHoặcTopic of danhSáchThreadHoặcTopic) {
                                    danhSáchNơiĐăng.push({
                                        'Tên nơi đăng': `${threadHoặcTopic} (${tênKênh})`,
                                        'Tên cộng đồng': tênMáyChủ,
                                        'Loại nơi đăng': loạiNơiĐăng,
                                        "Tên nền tảng": tênNềnTảng,
                                        "Loại nền tảng": 'Chat'
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
console.log(JSON.stringify(danhSáchNơiĐăng[0], null, 2))
