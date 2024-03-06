import lấyDữLiệuCấuHình, { KýHiệuCấuHình } from './Code%20h%E1%BB%97%20tr%E1%BB%A3/H%C3%A0m%20li%C3%AAn%20quan%20t%E1%BB%9Bi%20c%E1%BA%A5u%20h%C3%ACnh.ts';
import { CâuNhập } from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20d%E1%BB%AF%20li%E1%BB%87u%20nh%E1%BA%ADp%20v%C3%A0o.ts";
import { VậtThểKếtQuảPhânLoại } from "./Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20vi%E1%BB%87c%20x%E1%BB%AD%20l%C3%BD.ts";
import tạoKếtQuảPhânLoại from './4.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/4.1%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3.ts'
import đẩyLênFibery from './4.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/4.2%20%C4%90%E1%BA%A9y%20l%C3%AAn%20fibery.ts';
import { parse as flagParse } from "https://deno.land/std@0.194.0/flags/mod.ts";
import { stringify } from "https://deno.land/std@0.194.0/yaml/mod.ts";
import { json } from "https://deno.land/std@0.194.0/yaml/schema/json.ts";
import { VậtThểNộiDung } from "../Ki%E1%BB%83u.ts";

const flags = flagParse(Deno.args, {
    boolean: ['json', 'yaml', 'debug', 'json-debug', 'h'],
    string: ['ch'],
    // default: {'ch': 'giao dịch'}
})
let địnhDạngKếtQuả = ''
if (flags.json) { địnhDạngKếtQuả = 'json' }
if (flags.yaml) { địnhDạngKếtQuả = 'yaml' }
if (flags.debug) { địnhDạngKếtQuả = 'debug' }
if (flags['json-debug']) { địnhDạngKếtQuả = 'json-debug' }

if (flags.h) { 
    console.log(`Lệnh ví dụ:\ndeno run --allow-all '.\B Xử lý dữ liệu và đẩy lên Fibery\main.ts' "bún bò 50k nợn trả chợ @nth @@sdfsd" --ch=gd`)}

function xuấtKếtQuả(
    vậtThểKếtQuả: VậtThểKếtQuảPhânLoại,
    địnhDạngKếtQuả: string,
    câuNhập = Deno.args[0] as CâuNhập,
    kýHiệuCấuHình = flags.ch as KýHiệuCấuHình) {
    const {debug, ...kếtQuảHiểnThị} = vậtThểKếtQuả 
    
    if (địnhDạngKếtQuả === 'json') {
        console.log(JSON.stringify(kếtQuảHiểnThị, null, 2))
    } else if (địnhDạngKếtQuả === 'yaml') {
        console.log(stringify(kếtQuảHiểnThị))
    } else if (địnhDạngKếtQuả === 'json-debug') {
        console.log(JSON.stringify(vậtThểKếtQuả, null, 2))
    } else {
        console.log(`%cCâu nhập: ${câuNhập}`, 'color: olive');
        console.log('');
        console.table(kếtQuảHiểnThị);
        // đẩyLênFibery(câuNhập, kýHiệuCấuHình, kếtQuảHiểnThị) 
        
        console.log('Xử lý xong câu nhập.')
    }

    if (địnhDạngKếtQuả === 'debug') {
        console.log(JSON.stringify(debug.xửLýChiềuĐặcThù, null, 2))
    }
}

async function tạoVậtThểNộiDung(câuNhập = Deno.args[0] as CâuNhập, kýHiệuCấuHình = flags.ch as KýHiệuCấuHình): Promise<VậtThểNộiDung> {
    const dữLiệuCấuHình = (await lấyDữLiệuCấuHình(kýHiệuCấuHình)).dữLiệuCấuHình; 
    return await tạoKếtQuảPhânLoại(câuNhập, dữLiệuCấuHình) 
}

export default tạoVậtThểNộiDung

// debugger