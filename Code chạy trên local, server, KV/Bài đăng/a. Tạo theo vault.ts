/**
 * @fileoverview Các đường dẫn, thư mục nếu không nói gì thì mặc định là đường dẫn tuyệt đối dạng chuỗi. Để ở dạng chuỗi vì các hàm Deno.readDir(), join() chỉ nhận dạng chuỗi. Nhược điểm là TS không phân biệt được đâu là chuỗi bình thường, đâu là đường dẫn, đâu là đường dẫn tuyệt đối, đâu là đường dẫn tương đối.
 */
import { extract } from "$std/front_matter/yaml.ts";
import { basename, extname, join, SEPARATOR_PATTERN } from "$std/path/mod.ts";
import { buildUrl } from "https://deno.land/x/url_builder/mod.ts";
import { BàiĐăng, BàiĐăngChưaCóId, TênDựÁn, Vault, YAMLCủaGhiChú } from "./Hàm và kiểu cho vault, dự án, bài đăng.ts";
import {
  THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT,
  THƯ_MỤC_DỰ_ÁN,
  THƯ_MỤC_THIẾT_LẬP,
  TẬP_TIN_THIẾT_LẬP,
  ĐườngDẫnTuyệtĐối,
  ĐườngDẫnTươngĐối,
} from "../ĐƯỜNG_DẪN.ts";
import { UrlChưaChínhTắc } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";

async function cóThưMụcObsidianBênTrong(thưMục: string) {
  try {
    for await (const dirEntry of Deno.readDir(thưMục)) {
      if (dirEntry.isDirectory && dirEntry.name === ".obsidian") return true;
    }
  } catch {
    return false;
  }
}

export async function tạoDanhSáchThôngTinTấtCảCácVault(): Promise<Vault[]> {
  const danhSáchThôngTinTấtCảCácVault: Vault[] = [];
  await tìmThưMụcObsidian(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT);
  return danhSáchThôngTinTấtCảCácVault;

  async function tìmThưMụcObsidian(thưMục: ĐườngDẫnTuyệtĐối) {
    for await (const dirEntry of Deno.readDir(thưMục)) {
      const đườngDẫnTớiThưMụcCon = join(thưMục, dirEntry.name);
      if (await cóThưMụcObsidianBênTrong(đườngDẫnTớiThưMụcCon)) {
        const đườngDẫnTớiTậpTinThiếtLập = join(đườngDẫnTớiThưMụcCon, TẬP_TIN_THIẾT_LẬP);
        try {
          await nạpThiếtLậpCủaVaultVàoDanhSách(đườngDẫnTớiTậpTinThiếtLập, đườngDẫnTớiThưMụcCon);
          continue;
        } catch {
          console.error(`Không tìm thấy thiết lập vault tại ${đườngDẫnTớiThưMụcCon}`);
        }
      } else if (dirEntry.isDirectory) {
        await tìmThưMụcObsidian(đườngDẫnTớiThưMụcCon);
      }
    }
  }

  async function nạpThiếtLậpCủaVaultVàoDanhSách(đườngDẫnTớiTậpTinThiếtLập: string, đườngDẫnTớiThưMụcCon: string) {
    const thôngTinThiếtLập = extract(await Deno.readTextFile(đườngDẫnTớiTậpTinThiếtLập)).attrs as unknown as Vault;
    const tênVault = thôngTinThiếtLập["Tên vault"];
    danhSáchThôngTinTấtCảCácVault.push({
      "Tên vault": tênVault,
      "Mã vault": thôngTinThiếtLập["Mã vault"],
      "Mô tả vault": thôngTinThiếtLập["Mô tả vault"],
      URL: thôngTinThiếtLập["URL"],
      "Nơi lưu vault": đườngDẫnTớiThưMụcCon,
    });
    console.info(`Đã nạp thiết lập vault ${tênVault} tại ${đườngDẫnTớiThưMụcCon}`);
  }
}
/**
 * Bài đăng là những ghi chú được chia sẻ (có `share: true` trên frontmatter)
 * @param đườngDẫnTớiVault Đường dẫn đầy đủ của một vault
 * @returns danh sách đường dẫn đầy đủ tất cả các bài viết được chia sẻ trong vault đó
 */
export async function tạoDanhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault(đườngDẫnTớiVault: ĐườngDẫnTuyệtĐối): Promise<ĐườngDẫnTuyệtĐối[]> {
  const danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault: ĐườngDẫnTuyệtĐối[] = [];
  async function xétTừngTậpTinVàThưMụcBênTrong(thưMục: ĐườngDẫnTuyệtĐối) {
    for await (const dirEntry of Deno.readDir(thưMục)) {
      /** Loại các thư mục thiết lập (Ξ Thiết lập, .obsidian, .git, .vscode, .stfolder, v.v.) */
      if (dirEntry.name[0] === "." || dirEntry.name === THƯ_MỤC_THIẾT_LẬP) continue;

      if (dirEntry.isDirectory) {
        const đườngDẫnTớiThưMụcCon = join(thưMục, dirEntry.name);
        await xétTừngTậpTinVàThưMụcBênTrong(đườngDẫnTớiThưMụcCon);
      } else if (dirEntry.isFile) {
        const đườngDẫnTớiGhiChú = join(thưMục, dirEntry.name);

        /** Lọc file markdown */
        if (extname(đườngDẫnTớiGhiChú) === ".md") {
          const text = await Deno.readTextFile(đườngDẫnTớiGhiChú);

          /** Lọc file có frontmatter và có share: true*/
          try {
            const frontmatter = extract(text).attrs;
            if (frontmatter.share === true) {
              // if (frontmatter.filename) {
              //   //todo
              // } else {
              //   danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault.push(đườngDẫnTớiGhiChú)
              // }
              danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault.push(đườngDẫnTớiGhiChú);
            }
          } catch {
            continue;
          }
        }
      }
    }
  }

  await xétTừngTậpTinVàThưMụcBênTrong(đườngDẫnTớiVault);
  return danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault;
}

/**
 * Nếu đường dẫn tới ghi chú là `a/a.md`, thì đường dẫn tới tệp HTML được tạo ra từ ghi chú là `a`.
 * Nếu đường dẫn tới ghi chú là `a/b.md`, thì đường dẫn tới tệp HTML được tạo ra từ ghi chú là `a/b`.
 */
function tạoĐườngDẫnTớiTệpHtml(đườngDẫnTớiGhiChú: ĐườngDẫnTuyệtĐối, đườngDẫnTớiVault: ĐườngDẫnTuyệtĐối): string[] {
  const đườngDẫnTrongKho: ĐườngDẫnTươngĐối = đườngDẫnTớiGhiChú.replace(đườngDẫnTớiVault, "");
  const tênTậpTin = basename(đườngDẫnTớiGhiChú, ".md");
  const thưMụcMẹTrựcTiếp = đườngDẫnTrongKho.split(SEPARATOR_PATTERN).slice(-2)[0];

  const đườngDẫnTớiTệpHtml: string[] = đườngDẫnTrongKho.split(SEPARATOR_PATTERN);
  const làTệpIndex = tênTậpTin === thưMụcMẹTrựcTiếp;
  if (!làTệpIndex) {
    đườngDẫnTớiTệpHtml.pop();
    đườngDẫnTớiTệpHtml.push(tênTậpTin);
  } else đườngDẫnTớiTệpHtml.pop();
  return đườngDẫnTớiTệpHtml;
}

function xácĐịnhUrlCủaGhiChú(
  đườngDẫnTớiGhiChú: ĐườngDẫnTuyệtĐối,
  đườngDẫnTớiVault: ĐườngDẫnTuyệtĐối,
  urlVault: UrlChưaChínhTắc,
) {
  const đườngDẫnTớiTệpHtml: string[] = tạoĐườngDẫnTớiTệpHtml(đườngDẫnTớiGhiChú, đườngDẫnTớiVault);
  if (typeof urlVault === "object" && urlVault) urlVault = urlVault.href;
  const url = buildUrl(urlVault || "", { path: đườngDẫnTớiTệpHtml });
  // console.log("Đường dẫn:", đườngDẫnTớiGhiChú);
  // console.log('URL:', url);
  return url;
}

/** Nếu có title trong frontmatter thì lấy làm tiêu đề, còn không thì lấy filename */
function xácĐịnhTiêuĐềGhiChú(đườngDẫnTớiGhiChú: ĐườngDẫnTuyệtĐối, frontmatter: YAMLCủaGhiChú): string {
  if (frontmatter.title) return frontmatter.title;
  return basename(đườngDẫnTớiGhiChú, ".md");
}

function xácĐịnhTênDựÁn(đườngDẫnTớiGhiChú: ĐườngDẫnTuyệtĐối): TênDựÁn {
  if (đườngDẫnTớiGhiChú.includes(THƯ_MỤC_DỰ_ÁN)) {
    const đườngDẫnTớiGhiChúDạngMảng = đườngDẫnTớiGhiChú.split(SEPARATOR_PATTERN);
    const vịTríCuảThưMụcDựÁnTrongMảng = đườngDẫnTớiGhiChúDạngMảng.indexOf(THƯ_MỤC_DỰ_ÁN);
    return đườngDẫnTớiGhiChúDạngMảng[vịTríCuảThưMụcDựÁnTrongMảng + 1];
  }
  return undefined;
}

export default async function tạoDanhSáchBàiĐăngTrênVault(): Promise<BàiĐăngChưaCóId[]> {
  const danhSáchBàiĐăng: Omit<BàiĐăng, "id">[] = [];
  const danhSáchTấtCảCácVault = await tạoDanhSáchThôngTinTấtCảCácVault();
  for (const vault of danhSáchTấtCảCácVault) {
    if (!vault.URL) continue;

    /** Bài đăng là những ghi chú được chia sẻ (có `share: true` trên frontmatter) */
    const danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault: ĐườngDẫnTuyệtĐối[] = await tạoDanhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault(vault["Nơi lưu vault"]);

    for (const đườngDẫnTớiGhiChú of danhSáchĐườngDẫnTấtCảCácBàiĐăngTrongVault) {
      const text = extract(await Deno.readTextFile(đườngDẫnTớiGhiChú));
      const frontmatter = text.attrs as YAMLCủaGhiChú;

      danhSáchBàiĐăng.push({
        "Tiêu đề": xácĐịnhTiêuĐềGhiChú(đườngDẫnTớiGhiChú, frontmatter),
        URL: xácĐịnhUrlCủaGhiChú(đườngDẫnTớiGhiChú, vault["Nơi lưu vault"], vault.URL),
        "Kho thông tin": vault["Tên vault"],
        "Dự án": {
          "Tên dự án": xácĐịnhTênDựÁn(đườngDẫnTớiGhiChú),
          "Mã dự án": vault["Mã vault"],
        },
        Slug: frontmatter.slug,
        "Nội dung bài đăng": {
          "Mô tả bài đăng": frontmatter.description,
          "Toàn bộ nội dung": text.body.slice(0, 10000),
          "Định dạng nội dung": "md",
        },
        "Phương thức tạo": "Cào vault",
        "Ngày tạo": frontmatter.created ? new Date(frontmatter.created) : undefined,
        "Ngày cập nhật": frontmatter.updated ? new Date(frontmatter.updated) : undefined,
      });
    }
  }
  return danhSáchBàiĐăng;
}

// const danhSáchVậtThểBàiĐăng = await tạoDanhSáchVậtThểBàiĐăngTrênVault(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT)
// console.log(danhSáchVậtThểBàiĐăng)
// console.log(danhSáchVậtThểBàiĐăng.some(e => e["Tiêu đề"] === "AI là định dạng ảnh mờ của web"))
