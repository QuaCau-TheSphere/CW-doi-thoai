import { load } from "$std/dotenv/mod.ts";
import { lấyURLChínhTắc } from "./Hàm và kiểu cho dữ liệu meta.ts";

const env = await load();
const url = "https://www.facebook.com/groups/562933844569060/";
const urlChínhTắc = await lấyURLChínhTắc(url);
console.log("🚀 ~ urlChínhTắc:", urlChínhTắc);
