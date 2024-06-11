import { tạoSlugNơiĐăng, tạoTừĐiểnSlugNơiĐăng } from "./T%E1%BA%A1o%20slug.ts";

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
  const từĐiểnSlugNơiĐăng = tạoTừĐiểnSlugNơiĐăng(vậtThểCấuHình.cấuHình["Slug"]);
  for (const nơiĐăng of nơiĐăngList) {
    const slug = tạoSlugNơiĐăng(nơiĐăng, từĐiểnSlugNơiĐăng);
    console.log(slug);
  }
}
