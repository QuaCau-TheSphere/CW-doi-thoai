import { assertEquals, assert } from "https://deno.land/std@0.219.0/assert/mod.ts";
import tạoDanhSáchNơiĐăng from "../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/2.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.219.0/assert/assert_array_includes.ts";
import { parse } from "$std/yaml/parse.ts";
import tạoDanhSáchVậtThểBàiĐăngTrênVault from "../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/a.%20T%E1%BA%A1o%20theo%20vault.ts";
import tạoDanhSáchVậtThểBàiĐăngTrênWordPress from "../B.%20T%E1%BA%A1o%20k%E1%BA%BFt%20qu%E1%BA%A3/1.%20T%E1%BA%A1o%20danh%20s%C3%A1ch%20t%E1%BA%A5t%20c%E1%BA%A3%20b%C3%A0i%20%C4%91%C4%83ng/b.%20L%E1%BA%A5y%20t%E1%BB%AB%20WordPress.ts";
import CấuHìnhNơiĐăng from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT, TÊN_MIỀN_RÚT_GỌN, ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV } from "./H%E1%BA%B1ng.ts";

const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync('./A. Cấu hình/Nơi đăng.yaml')) as CấuHìnhNơiĐăng
const danhSáchVậtThểBàiĐăng = (await tạoDanhSáchVậtThểBàiĐăngTrênVault(THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT)).concat(await tạoDanhSáchVậtThểBàiĐăngTrênWordPress(ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV)) 
const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng)

Deno.test("tạoDanhSáchNơiĐăng", () => {
    assert(danhSáchNơiĐăng.some(e=>e["Tên nơi đăng"] === "Một đám mây chim sáo") ) 
    assert(danhSáchNơiĐăng.some(e=>e["Tên nơi đăng"] === "Ảnh bìa Quả Cầu") ) 
})
Deno.test("danhSáchVậtThểBàiĐăng", () => {
    assert(danhSáchVậtThểBàiĐăng.some(e => e["Tiêu đề"] === "AI là định dạng ảnh mờ của web")) 
})

