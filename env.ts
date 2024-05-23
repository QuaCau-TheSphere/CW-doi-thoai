import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();

export const THƯ_MỤC_DỰ_ÁN = env["THU_MUC_DU_AN"];
export const THƯ_MỤC_THIẾT_LẬP = env["THU_MUC_THIET_LAP"];
export const TẬP_TIN_THIẾT_LẬP = env["TAP_TIN_THIET_LAP"];
export const THƯ_MỤC_CHỨA_TẤT_CẢ_CÁC_VAULT = env["THU_MUC_CHUA_TAT_CA_CAC_VAULT"];

export const ĐƯỜNG_DẪN_ĐẾN_TẬP_TIN_CSV = env["DUONG_DAN_DEN_TAP_TIN_CSV"];
export const ĐƯỜNG_DẪN_ĐẾN_CẤU_HÌNH_CHUNG = env["DUONG_DAN_DEN_CAU_HINH_CHUNG"];

export const THƯ_MỤC_CẤU_HÌNH_NƠI_ĐĂNG = env["THU_MUC_CAU_HINH_NOI_DANG"];

export const ORIGIN = env["ORIGIN"];
export const kv = await Deno.openKv();

// Deno.env.set("DENO_KV_ACCESS_TOKEN", "ddp_jr4lpd8nxcyHuD2CVETVD2AhDZw2oN0qPMFf");
// export const kv = env["kv" ]
