import { extract } from "$std/front_matter/yaml.ts";
import { test } from "$std/front_matter/mod.ts";
import { join, extname, basename, parse } from "$std/path/mod.ts";
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir/mod.ts";
import { VậtThểBàiViết } from "../Ki%E1%BB%83u.ts";
import { JSDocFunctionType } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";

type TênVault = string

async function tìmĐườngDẫnTấtCảCácSharedFiledTrongVault(tênVault: TênVault) {
    const danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault: string[] = [] 
    const đườngDẫnĐếnTấtCảCácFileTrongVault = await recursiveReaddir(tênVault);
    for (const đườngDẫn of đườngDẫnĐếnTấtCảCácFileTrongVault) {
        
        /** Lọc file markdown */
        if (extname(đườngDẫn) === ".md") {
            const text = await Deno.readTextFile(đườngDẫn);
            
            /** Lọc file có frontmatter */
            if (test(text)) {
                const { attrs } = extract(text);
                
                /** Lọc file được share */
                if (attrs.share === true) {
                    console.log(basename(đườngDẫn))
                    danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault.push(đườngDẫn)
                }
            }
        }
    }
    return danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault
}

async function tìmTiêuĐềBàiViết(đườngDẫnBàiViết: string): Promise<string>{
    const text = await Deno.readTextFile(đườngDẫnBàiViết);
    const { attrs } = extract(text) 
    if (attrs.title) {
        return attrs.title as string
    } else {
        return parse(đườngDẫnBàiViết).name
    } 
} 

export default async function tạoDanhSáchVậtThểBàiViết(tênVault: TênVault, urlVault: string): Promise<VậtThểBàiViết[]> {
    const danhSáchVậtThểBàiViết: VậtThểBàiViết[]  = [] 
    const danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault = await tìmĐườngDẫnTấtCảCácSharedFiledTrongVault(tênVault) 
    for (const đườngDẫn of danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault) {
        const title = await tìmTiêuĐềBàiViết(đườngDẫn) 
        const đườngDẫnTrongVault = parse(đườngDẫn).dir.split(tênVault)[1]
        // const url = urlVault + '/' + đườngDẫnTrongVault
        const url = join(urlVault, đườngDẫnTrongVault)
        console.log(đườngDẫnTrongVault, url)
        danhSáchVậtThểBàiViết.push({
            title: title,
            url: url
        })
    } 
    return danhSáchVậtThểBàiViết
} 

// await tìmĐườngDẫnTấtCảCácSharedFiledTrongVault("D:\\QC supplements\\Vaults\\C Obsidian, quản lý dự án và công cụ nghĩ");
// tạoDanhSáchVậtThểBàiViết("D:\\QC supplements\\Vaults\\C Obsidian, quản lý dự án và công cụ nghĩ", 'https://obsidian.quảcầu.cc') 