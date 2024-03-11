import { extract } from "$std/front_matter/yaml.ts";
import { extname, parse } from "$std/path/mod.ts";
import { buildUrl } from "https://deno.land/x/url_builder/mod.ts";
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir/mod.ts";
import { VậtThểBàiViết } from "../Ki%E1%BB%83u.ts";

type ĐườngDẫnVault = string
type TênDựÁn = string

async function tạoDanhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault(đườngDẫnVault: ĐườngDẫnVault) {
    const danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault: string[] = [] 
    const đườngDẫnĐếnTấtCảCácFileTrongVault = await recursiveReaddir(đườngDẫnVault);
    for (const đườngDẫnFile of đườngDẫnĐếnTấtCảCácFileTrongVault) {
        
        /** Lọc file markdown */
        if (extname(đườngDẫnFile) === ".md") {
            const text = await Deno.readTextFile(đườngDẫnFile);
            
            /** Lọc file có frontmatter và có share: true*/
            try {
                const frontmatter = extract(text).attrs;
                if (frontmatter.share === true) {
                    danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault.push(đườngDẫnFile)
                }
            } catch {
                continue
            } 
        }
    }
    return danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault
}

interface YAMLAttributes {
    title?: string,
    description?: string,
    alias?: string | string[]
    created?: string
    updated?: string
    share?: boolean
} 

function tạoURL(đườngDẫnTệp: string, đườngDẫnVault: ĐườngDẫnVault, urlVault: string) {
    const đườngDẫnTệpTrongVault = đườngDẫnTệp.replace(đườngDẫnVault, '').split('\\');
    const tênFile = đườngDẫnTệpTrongVault[đườngDẫnTệpTrongVault.length - 1];
    const folderNhỏNhất = đườngDẫnTệpTrongVault[đườngDẫnTệpTrongVault.length - 2];

    đườngDẫnTệpTrongVault.pop();
    if (tênFile !== folderNhỏNhất + '.md') {
        đườngDẫnTệpTrongVault.push(tênFile.replace('.md', ''));
    }
    const đườngDẫnTrênLink = đườngDẫnTệpTrongVault;
    const url = buildUrl(urlVault, {
        path: đườngDẫnTrênLink
    });
    console.log("Đường dẫn tệp:", đườngDẫnTệp);
    console.log('URL:', url);
    return url;
}

async function xácĐịnhTiêuĐềBàiViết(đườngDẫnTệp: string): Promise<string>{
    const text = await Deno.readTextFile(đườngDẫnTệp);
    const frontmatter = extract(text).attrs as YAMLAttributes
    if (frontmatter.title) {
        return frontmatter.title as string
    } else {
        return parse(đườngDẫnTệp).name
    } 
} 
export default async function tạoDanhSáchVậtThểBàiViết(đườngDẫnVault: ĐườngDẫnVault, urlVault: string): Promise<VậtThểBàiViết[]> {
    const danhSáchVậtThểBàiViết: VậtThểBàiViết[] = [] 
    const danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault = await tạoDanhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault(đườngDẫnVault) 
    const tênDựÁn = đườngDẫnVault.split('\\').slice(-1)[0] 

    for (const đườngDẫnTệp of danhSáchĐườngDẫnTấtCảCácSharedFiledTrongVault) {
        const url = tạoURL(đườngDẫnTệp, đườngDẫnVault, urlVault);        
        const tiêuĐề = await xácĐịnhTiêuĐềBàiViết(đườngDẫnTệp) 
        danhSáchVậtThểBàiViết.push({
            title: tiêuĐề,
            url: url,
            'Dự án': tênDựÁn
        })
    } 
    return danhSáchVậtThểBàiViết
} 

// await tìmĐườngDẫnTấtCảCácSharedFiledTrongVault("D:\\QC supplements\\Vaults\\C Obsidian, quản lý dự án và công cụ nghĩ");
tạoDanhSáchVậtThểBàiViết("D:\\QC supplements\\Vaults\\C Obsidian, quản lý dự án và công cụ nghĩ", 'https://obsidian.quảcầu.cc') 