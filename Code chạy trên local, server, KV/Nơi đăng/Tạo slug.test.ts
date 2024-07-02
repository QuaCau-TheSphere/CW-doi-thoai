import { tạoDanhSáchThôngTinCấuHìnhNơiĐăng } from "../H%C3%A0m%20v%C3%A0%20ki%E1%BB%83u%20cho%20c%E1%BA%A5u%20h%C3%ACnh.ts";
import { ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo } from "./Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import { lấySlugTrongTừĐiểnSlug, tạoTừĐiểnSlugNơiĐăng } from "./Tạo slug.ts";

const nơiĐăngList: ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo[] = [
  {
    "Tên nơi đăng": ["Quả Cầu"],
    "Loại nơi đăng": ["Tài khoản"],
    "Tên nền tảng": "Facebook",
    "Loại nền tảng": "Diễn đàn",
    URL: "https://www.facebook.com/qua.cau.the.sphere",
  },
  {
    "Tên nơi đăng": ["Quả Cầu"],
    "Loại nơi đăng": ["Trang"],
    "Tên nền tảng": "Facebook",
    "Loại nền tảng": "Diễn đàn",
    URL: "https://www.facebook.com/quacau.sphere/",
  },
];
const danhSáchThôngTinCấuHìnhNơiĐăng = await tạoDanhSáchThôngTinCấuHìnhNơiĐăng();
for (const vậtThểCấuHình of danhSáchThôngTinCấuHìnhNơiĐăng) {
  if (vậtThểCấuHình.tênCấuHình !== "Quả Cầu") continue;
  const từĐiểnSlugNơiĐăng = await tạoTừĐiểnSlugNơiĐăng(vậtThểCấuHình.cấuHình["Slug"]);
  for (const nơiĐăng of nơiĐăngList) {
    const slug = lấySlugTrongTừĐiểnSlug(nơiĐăng["Tên nơi đăng"], nơiĐăng["URL"], từĐiểnSlugNơiĐăng);
    console.log(slug);
  }
}
