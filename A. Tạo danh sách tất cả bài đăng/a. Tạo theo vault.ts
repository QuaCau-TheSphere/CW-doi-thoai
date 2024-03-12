import { extract } from "$std/front_matter/yaml.ts";
import { ParsedPath, SEPARATOR_PATTERN, format, join, parse } from "$std/path/mod.ts";
import { buildUrl } from "https://deno.land/x/url_builder/mod.ts";
import { TênDựÁn, URLString, Vault, BàiĐăng, YAMLAttributes } from "../Ki%E1%BB%83u.ts";


async function cóThưMụcObsidianBênTrong(thưMục: string) {
    try {
        for await (const dirEntry of Deno.readDir(thưMục)) {
            if (dirEntry.isDirectory && dirEntry.name === '.obsidian') return true
        }
    } catch {
        return false
    }
} 

export async function tạoDanhSáchThôngTinTấtCảCácVault(thưMụcChứaTấtCảCácVault: string): Promise<Vault[]> {
    const danhSáchThôngTinTấtCảCácVault: Vault[] = [];
    await tìmThưMụcObsidian(thưMụcChứaTấtCảCácVault);
    return danhSáchThôngTinTấtCảCácVault;

    async function tìmThưMụcObsidian(thưMục: string) {
        for await (const dirEntry of Deno.readDir(thưMục)) {
            const đườngDẫnTớiThưMụcCon = join(thưMục, dirEntry.name)
            if (await cóThưMụcObsidianBênTrong(đườngDẫnTớiThưMụcCon)) {
                const đườngDẫnTớiTậpTinThiếtLập = join(đườngDẫnTớiThưMụcCon, 'Ξ Thiết lập/Ξ Thiết lập.md')
                try {
                    await nạpThiếtLậpCủaVaultVàoDanhSách(đườngDẫnTớiTậpTinThiếtLập, đườngDẫnTớiThưMụcCon); 
                    continue
                } catch {
                    console.error(`Không tìm thấy thiết lập vault tại ${đườngDẫnTớiThưMụcCon}`) 
                    // throw error
                }
            } else if (dirEntry.isDirectory) {
                await tìmThưMụcObsidian(đườngDẫnTớiThưMụcCon);
            } 
        }
    };

    async function nạpThiếtLậpCủaVaultVàoDanhSách(đườngDẫnTớiTậpTinThiếtLập: string, đườngDẫnTớiThưMụcCon: string) {
        const thôngTinThiếtLập = extract((await Deno.readTextFile(đườngDẫnTớiTậpTinThiếtLập))).attrs as unknown as Vault;
        danhSáchThôngTinTấtCảCácVault.push({
            'Tên vault': thôngTinThiếtLập['Tên vault'],
            'Mã vault': thôngTinThiếtLập['Mã vault'],
            'Mô tả': thôngTinThiếtLập['Mô tả'],
            URL: thôngTinThiếtLập['URL'],
            'Nơi lưu': đườngDẫnTớiThưMụcCon,
        });
    }
} 
/**
 * 
 * @param đườngDẫnTớiVault Đường dẫn đầy đủ của một vault
 * @returns danh sách đường dẫn đầy đủ tất cả các bài viết được chia sẻ trong vault đó
 */
export async function tạoDanhSáchĐườngDẫnTấtCảCácGhiChúĐượcChiaSẻTrongVault(đườngDẫnTớiVault: string): Promise<ParsedPath[]> {
    const danhSáchĐườngDẫnTấtCảCácGhiChúĐượcChiaSẻTrongVault: ParsedPath[] = [] 
    async function getFiles(thưMục: string) {
        for await (const dirEntry of Deno.readDir(thưMục)) {
            /** Loại các thư mục thiết lập cho các chương trình (.obsidian, .git, .vscode, .stfolder, v.v.) */
            if (dirEntry.name[0] === '.' || dirEntry.name === 'Ξ Thiết lập') continue
            
            if (dirEntry.isDirectory) {
                await getFiles(join(thưMục, dirEntry.name));
            } else if (dirEntry.isFile) {
                const đườngDẫnTuyệtĐốiTớiGhiChú = join(thưMục, dirEntry.name)
                const parsedPath = parse(đườngDẫnTuyệtĐốiTớiGhiChú)
            
                /** Lọc file markdown */
                if (parsedPath.ext === ".md") {
                    const text = await Deno.readTextFile(đườngDẫnTuyệtĐốiTớiGhiChú);
                    
                    /** Lọc file có frontmatter và có share: true*/
                    try {
                        const frontmatter = extract(text).attrs;
                        if (frontmatter.share === true) {
                            danhSáchĐườngDẫnTấtCảCácGhiChúĐượcChiaSẻTrongVault.push(parsedPath)
                        }
                    } catch {
                        continue
                    } 
                }
            }
        }
    };

    await getFiles(đườngDẫnTớiVault);
    return danhSáchĐườngDẫnTấtCảCácGhiChúĐượcChiaSẻTrongVault
}

function xácĐịnhURLCủaGhiChú(đườngDẫnTuyệtĐốiTớiGhiChú: ParsedPath, đườngDẫnTuyệtĐốiTớiVault: string, urlVault: URLString) {
    const đườngDẫnTươngĐốiCủaGhiChúTrongVault: string[] = đườngDẫnTuyệtĐốiTớiGhiChú.dir.replace(đườngDẫnTuyệtĐốiTớiVault, '').split(SEPARATOR_PATTERN);
    const tênTậpTin = đườngDẫnTuyệtĐốiTớiGhiChú.name
    const thưMụcMẹTrựcTiếp = đườngDẫnTươngĐốiCủaGhiChúTrongVault.slice(-1)[0]

    /** Nếu đường dẫn bài viết là a/a.md, thì url là a. Nếu đường dẫn bài viết là a/b.md, thì url là a/b */
    if (tênTậpTin !== thưMụcMẹTrựcTiếp) {
        đườngDẫnTươngĐốiCủaGhiChúTrongVault.push(tênTậpTin);
    } else đườngDẫnTươngĐốiCủaGhiChúTrongVault.pop();
    const url = buildUrl(urlVault, {
        path: đườngDẫnTươngĐốiCủaGhiChúTrongVault
    });
    // console.log("Đường dẫn:", format(đườngDẫnTuyệtĐốiTớiGhiChú));
    // console.log('URL:', url);
    return url;
}

async function xácĐịnhTiêuĐềGhiChú(đườngDẫnTớiGhiChú: ParsedPath): Promise<ParsedPath["name"]>{
    const text = await Deno.readTextFile(format(đườngDẫnTớiGhiChú));
    const frontmatter = extract(text).attrs as YAMLAttributes
    if (frontmatter.title) {
        return frontmatter.title
    } else {
        return đườngDẫnTớiGhiChú.name
    } 
} 

export default async function tạoDanhSáchVậtThểBàiĐăng(thưMụcChứaTấtCảCácVault: string): Promise<BàiĐăng[]> {
    const danhSáchBàiĐăng: BàiĐăng[] = [] 
    const danhSáchTấtCảCácVault = await tạoDanhSáchThôngTinTấtCảCácVault(thưMụcChứaTấtCảCácVault) 
    for (const vault of danhSáchTấtCảCácVault) {
        const danhSáchĐườngDẫnTấtCảCácGhiChúĐượcChiaSẻTrongVault = await tạoDanhSáchĐườngDẫnTấtCảCácGhiChúĐượcChiaSẻTrongVault(vault["Nơi lưu"]) 
        const tênDựÁn: TênDựÁn = vault["Mã vault"] + ' ' + vault["Tên vault"]
        
        for (const đườngDẫnTớiGhiChú of danhSáchĐườngDẫnTấtCảCácGhiChúĐượcChiaSẻTrongVault) {
            const url = xácĐịnhURLCủaGhiChú(đườngDẫnTớiGhiChú, vault["Nơi lưu"], vault.URL);        
            const tiêuĐề = await xácĐịnhTiêuĐềGhiChú(đườngDẫnTớiGhiChú) 
            danhSáchBàiĐăng.push({
                title: tiêuĐề,
                url: url,
                'Dự án': tênDựÁn
            })
        } 
    } 
    return danhSáchBàiĐăng
} 

// const thưMụcChứaTấtCảCácVault = "D:\\QC supplements\\Vaults"
// const danhSáchVậtThểBàiĐăng = await tạoDanhSáchVậtThểBàiĐăng(thưMụcChứaTấtCảCácVault)
// console.log(danhSáchVậtThểBàiĐăng)
// console.log(danhSáchVậtThểBàiĐăng.some(e => e.title === "AI là định dạng ảnh mờ của web"))