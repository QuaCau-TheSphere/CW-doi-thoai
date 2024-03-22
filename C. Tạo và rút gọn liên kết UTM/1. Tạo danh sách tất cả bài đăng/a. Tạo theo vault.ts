/**
 * Các đường dẫn, thư mục nếu không nói gì thì mặc định là đường dẫn tuyệt đối dạng chuỗi. Để ở dạng chuỗi vì các hàm Deno.readDir(), join() chỉ nhận dạng chuỗi. Nhược điểm là TS không phân biệt được đâu là chuỗi bình thường, đâu là đường dẫn, đâu là đường dẫn tuyệt đối, đâu là đường dẫn tương đối.
 */
import { extract } from "$std/front_matter/yaml.ts";
import { SEPARATOR_PATTERN, basename, extname, join } from "$std/path/mod.ts";
import { buildUrl } from "https://deno.land/x/url_builder/mod.ts";
import { ĐườngDẫnTươngĐối, TênDựÁn, URLString, Vault, BàiĐăng, YAMLCủaGhiChú, type ĐườngDẫnTuyệtĐối } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { THƯ_MỤC_DỰ_ÁN, THƯ_MỤC_THIẾT_LẬP, THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, TẬP_TIN_THIẾT_LẬP } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/H%E1%BA%B1ng.ts";

async function cóThưMụcObsidianBênTrong(thưMục: string) {
    try {
        for await (const dirEntry of Deno.readDir(thưMục)) {
            if (dirEntry.isDirectory && dirEntry.name === '.obsidian') return true
        }
    } catch {
        return false
    }
} 

export async function tạoDanhSáchThôngTinTấtCảCácVault(thưMụcChứaTấtCảCácVault: ĐườngDẫnTuyệtĐối): Promise<Vault[]> {
    const danhSáchThôngTinTấtCảCácVault: Vault[] = [];
    await tìmThưMụcObsidian(thưMụcChứaTấtCảCácVault);
    return danhSáchThôngTinTấtCảCácVault;

    async function tìmThưMụcObsidian(thưMục: ĐườngDẫnTuyệtĐối) {
        for await (const dirEntry of Deno.readDir(thưMục)) {
            const đườngDẫnTớiThưMụcCon = join(thưMục, dirEntry.name)
            if (await cóThưMụcObsidianBênTrong(đườngDẫnTớiThưMụcCon)) {
                const đườngDẫnTớiTậpTinThiếtLập = join(đườngDẫnTớiThưMụcCon, TẬP_TIN_THIẾT_LẬP)
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
            'Mô tả vault': thôngTinThiếtLập['Mô tả vault'],
            URL: thôngTinThiếtLập['URL'],
            'Nơi lưu vault': đườngDẫnTớiThưMụcCon,
        });
    }
} 
/**
 * Bài đăng là những ghi chú được chia sẻ (có `share: true` trên frontmatter)
 * @param đườngDẫnTớiVault Đường dẫn đầy đủ của một vault
 * @returns danh sách đường dẫn đầy đủ tất cả các bài viết được chia sẻ trong vault đó
 */
export async function tạoDanhSáchĐườngDẫnCủaTấtCảCácBàiĐăngTrongVault(đườngDẫnTớiVault: ĐườngDẫnTuyệtĐối): Promise<ĐườngDẫnTuyệtĐối[]> {
    const danhSáchĐườngDẫnCủaTấtCảCácBàiĐăngTrongVault: ĐườngDẫnTuyệtĐối[] = [] 
    async function xétTừngTậpTinVàThưMụcBênTrong(thưMục: ĐườngDẫnTuyệtĐối) {
        for await (const dirEntry of Deno.readDir(thưMục)) {
            /** Loại các thư mục thiết lập (Ξ Thiết lập, .obsidian, .git, .vscode, .stfolder, v.v.) */
            if (dirEntry.name[0] === '.' || dirEntry.name === THƯ_MỤC_THIẾT_LẬP) continue
            
            if (dirEntry.isDirectory) {
                const đườngDẫnTớiThưMụcCon = join(thưMục, dirEntry.name)
                await xétTừngTậpTinVàThưMụcBênTrong(đườngDẫnTớiThưMụcCon);
            } else if (dirEntry.isFile) {
                const đườngDẫnTớiGhiChú = join(thưMục, dirEntry.name)
            
                /** Lọc file markdown */
                if (extname(đườngDẫnTớiGhiChú) === ".md") {
                    const text = await Deno.readTextFile(đườngDẫnTớiGhiChú);
                    
                    /** Lọc file có frontmatter và có share: true*/
                    try {
                        const frontmatter = extract(text).attrs;
                        if (frontmatter.share === true) {
                            danhSáchĐườngDẫnCủaTấtCảCácBàiĐăngTrongVault.push(đườngDẫnTớiGhiChú)
                        }
                    } catch {
                        continue
                    } 
                }
            }
        }
    };

    await xétTừngTậpTinVàThưMụcBênTrong(đườngDẫnTớiVault);
    return danhSáchĐườngDẫnCủaTấtCảCácBàiĐăngTrongVault
}

function xácĐịnhURLCủaGhiChú(đườngDẫnTớiGhiChú: ĐườngDẫnTuyệtĐối, đườngDẫnTớiVault: ĐườngDẫnTuyệtĐối, urlVault: URLString) {
    const đườngDẫnTươngĐốiCủaGhiChúTrongVault: ĐườngDẫnTươngĐối = đườngDẫnTớiGhiChú.replace(đườngDẫnTớiVault, '')
    const tênTậpTin = basename(đườngDẫnTớiGhiChú, ".md")
    const thưMụcMẹTrựcTiếp = đườngDẫnTươngĐốiCủaGhiChúTrongVault.split(SEPARATOR_PATTERN).slice(-1)[0]

    /** Nếu đường dẫn bài viết là a/a.md, thì url là a. Nếu đường dẫn bài viết là a/b.md, thì url là a/b */
    const đườngDẫnTươngĐốiTớiTậpTinHTMLCủaGhiChú: string[] = đườngDẫnTươngĐốiCủaGhiChúTrongVault.split(SEPARATOR_PATTERN)
    if (tênTậpTin !== thưMụcMẹTrựcTiếp) {
        đườngDẫnTươngĐốiTớiTậpTinHTMLCủaGhiChú.push(tênTậpTin);
    } else đườngDẫnTươngĐốiTớiTậpTinHTMLCủaGhiChú.pop();
    const url = buildUrl(urlVault, {
        path: đườngDẫnTươngĐốiTớiTậpTinHTMLCủaGhiChú
    });
    // console.log("Đường dẫn:", đườngDẫnTớiGhiChú);
    // console.log('URL:', url);
    return url;
}

async function xácĐịnhTiêuĐềGhiChú(đườngDẫnTớiGhiChú: ĐườngDẫnTuyệtĐối): Promise<string>{
    const text = await Deno.readTextFile(đườngDẫnTớiGhiChú);
    const frontmatter = extract(text).attrs as YAMLCủaGhiChú
    if (frontmatter.title) {
        return frontmatter.title
    } else {
        return basename(đườngDẫnTớiGhiChú, ".md")
    } 
} 

function xácĐịnhTênDựÁn(đườngDẫnTớiGhiChú: ĐườngDẫnTuyệtĐối, vault: Vault): TênDựÁn {
    if (đườngDẫnTớiGhiChú.includes(THƯ_MỤC_DỰ_ÁN)) {
        const đườngDẫnTớiGhiChúDạngMảng = đườngDẫnTớiGhiChú.split(SEPARATOR_PATTERN) 
        const vịTríCuảThưMụcDựÁnTrongMảng = đườngDẫnTớiGhiChúDạngMảng.indexOf(THƯ_MỤC_DỰ_ÁN) 
        return đườngDẫnTớiGhiChúDạngMảng[vịTríCuảThưMụcDựÁnTrongMảng + 1] //
    } else {
        return vault["Tên vault"]
    } 
}

export default async function tạoDanhSáchVậtThểBàiĐăngTrênVault(thưMụcChứaTấtCảCácVault: ĐườngDẫnTuyệtĐối): Promise<BàiĐăng[]> {
    const danhSáchBàiĐăng: BàiĐăng[] = [] 
    const danhSáchTấtCảCácVault = await tạoDanhSáchThôngTinTấtCảCácVault(thưMụcChứaTấtCảCácVault) 
    for (const vault of danhSáchTấtCảCácVault) {
        /** Bài đăng là những ghi chú được chia sẻ (có `share: true` trên frontmatter) */
        const danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault: ĐườngDẫnTuyệtĐối[] = await tạoDanhSáchĐườngDẫnCủaTấtCảCácBàiĐăngTrongVault(vault["Nơi lưu vault"])
        
        for (const đườngDẫnTớiGhiChú of danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault) {
            const tiêuĐề = await xácĐịnhTiêuĐềGhiChú(đườngDẫnTớiGhiChú) 
            const url = xácĐịnhURLCủaGhiChú(đườngDẫnTớiGhiChú, vault["Nơi lưu vault"], vault.URL);        
            const tênDựÁn: TênDựÁn = xácĐịnhTênDựÁn(đườngDẫnTớiGhiChú, vault) 

            danhSáchBàiĐăng.push({
                'Tiêu đề': tiêuĐề,
                url: url,
                'Dự án': {
                    "Tên dự án": tênDựÁn,
                    "Mã dự án": vault["Mã vault"] //todo
                } 
            })
        } 
    } 
    return danhSáchBàiĐăng
} 

// const danhSáchVậtThểBàiĐăng = await tạoDanhSáchVậtThểBàiĐăng(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT)
// console.log(danhSáchVậtThểBàiĐăng)
// console.log(danhSáchVậtThểBàiĐăng.some(e => e["Tiêu đề"] === "AI là định dạng ảnh mờ của web"))