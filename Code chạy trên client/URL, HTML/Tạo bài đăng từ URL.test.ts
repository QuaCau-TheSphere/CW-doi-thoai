import { tạoBàiĐăngTừURL, tạoNơiĐăngTừURL } from "./Tạo bài đăng hoặc nơi đăng từ URL.ts";
import { assertObjectMatch } from "https://deno.land/std@0.216.0/assert/assert_object_match.ts";
import { lấyMetaTagVàTạoDocument } from "./Hàm và kiểu cho dữ liệu meta.ts";
import { ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo } from "../../Code chạy trên local, server, KV/Nơi đăng/Kiểu cho nơi đăng.ts";
import { assertEquals } from "https://deno.land/std@0.216.0/assert/assert_equals.ts";
import { BàiĐăngChưaCóIdVàPhươngThứcTạo } from "../../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";

const tests: [string, BàiĐăngChưaCóIdVàPhươngThứcTạo | ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo][] = [
  [
    "https://quảcầu.cc",
    {
      "Tiêu đề": "Trang chủ Quả Cầu",
      URL: "https://xn--qucu-hr5aza.cc/",
      "Ngày cập nhật": undefined,
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng": "Lan tỏa và bảo vệ các tinh thần phản tư, tò mò, dũng cảm, trân trọng người khác",
      },
      "Slug": "quảcầu",
      "Tác giả": undefined,
    },
  ],

  [
    "https://lậptrình.xn--qucu-hr5aza.cc",
    {
      "Tiêu đề": "Trang chủ Tiếp thị số, xử lý dữ liệu và lập trình",
      URL: "https://xn--lptrnh-zva6402d.xn--qucu-hr5aza.cc/",
      "Ngày cập nhật": undefined,
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng": "Những thứ giúp xây dựng mental model khi phải code một cái gì đó",
      },
      "Slug": "quảcầu",
      // "Slug": "lậptrình.quảcầu",
      "Tác giả": undefined,
    },
  ],

  [
    "https://doi-thoai.deno.dev",
    {
      "Tiêu đề": "Trang chủ đối ⊷ thoại",
      URL: "https://doi-thoai.deno.dev/",
      "Ngày cập nhật": undefined,
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng": "Nhanh chóng tìm lại các cuộc thảo luận đã từng có trước đây và nắm được mức độ quan tâm của các bên liên quan",
      },
      "Slug": "doi-thoai",
      "Tác giả": undefined,
    },
  ],

  [
    "https://worrydream.com/LadderOfAbstraction/",
    {
      "Tiêu đề": "Up and Down the Ladder of Abstraction",
      URL: "https://worrydream.com/LadderOfAbstraction/",
      "Ngày cập nhật": undefined,
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng":
          '"In science, if you know what you are doing, you should not be doing it.  In engineering, if you do not know what you are doing, you should not be doing it.  Of course, you seldom, if ever, see either pure state."',
      },
      "Slug": "LadderOfAbstraction",
      "Tác giả": undefined,
    },
  ],

  [
    "https://www.inkandswitch.com/local-first/",
    {
      "Ngày cập nhật": new Date("2019-04-01T00:00:00.000Z"),
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng": "A new generation of collaborative software that allows users to retain ownership of their data.",
      },
      "Tiêu đề": "Local-first software: You own your data, in spite of the cloud",
      "Tác giả": undefined,
      Slug: "local-first",
      URL: "https://www.inkandswitch.com/local-first/",
    },
  ],

  ["https://github.com/QuaCau-TheSphere/CW-doi-thoai", {
    "Tiêu đề": "GitHub - QuaCau-TheSphere/CW-doi-thoai",
    URL: "https://github.com/QuaCau-TheSphere/CW-doi-thoai",
    "Nội dung bài đăng": {
      "Mô tả bài đăng": "Contribute to QuaCau-TheSphere/CW-doi-thoai development by creating an account on GitHub.",
    },
  }],

  ["https://docs.google.com/forms/d/e/1FAIpQLSeIYwh8-76fFxqDROZo3lLWC2KBp3xlT72VRokR4KJf0E7dew/viewform", {
    "Tiêu đề": "ĐƠN ĐĂNG KÝ THAM GIA TRƯỜNG HỌC V.GEN VỀ ĐA DẠNG, CÔNG BẰNG, DUNG HỢP VÀ TIẾP CẬN 2024 💫🔥",
    URL: "https://docs.google.com/forms/d/e/1FAIpQLSeIYwh8-76fFxqDROZo3lLWC2KBp3xlT72VRokR4KJf0E7dew/viewform",
    "Nội dung bài đăng": {
      "Mô tả bài đăng":
        "V.Gen Network for Vietnam là một tổ chức cộng đồng phi lợi nhuận hoạt động trong lĩnh vực Giáo dục và Phát triển thanh niên được duy trì từ 2018 đến nay. V.Gen được tạo ra với mục đích xây dựng một môi trường trao đổi học thuật cho giới trẻ Việt Nam và các đối tượng đa dạng khác trên cả nước với các chuyên gia có tác động tích cực đến sự vận động phát triển của xã hội Việt Nam. Dự án góp phần nâng cao nhận thức của giới trẻ về các vấn đề xã hội Việt Nam và Thế giới, phát triển tư duy phản biện, đa chiều, tư duy nghiên cứu khoa học để giải thích và tìm giải pháp cho các vấn đề xã hội, đặc biệt trong lĩnh vực khoa học xã hội và nhân văn.\n" +
        "Trường học V.Gen về Đa dạng, Công bằng, Dung hợp và Tiếp cận (Diversity, Equity, Inclusion and Accessibility - DEIA) được tổ chức bởi V.Gen Network for Vietnam với sự tài trợ của Tổng Lãnh sự quán Hoa Kỳ tại Thành phố Hồ Chí Minh.\n" +
        "📣 Thời gian diễn ra chương trình: 02/7 - 06/7/2024 (2 buổi sáng, chiều từ 8:00 - 17:00) \n" + "✔ Hình thức tổ chức: Học trực tiếp \n" +
        "✔ Địa điểm tổ chức: Trung tâm TP. Hồ Chí Minh\n" +
        "✔ Đối tượng tham gia: Sinh viên, người đi làm và các nhóm đa dạng từ 18 tuổi trở lên trên cả nước\n" +
        "✔ Chương trình KHÔNG thu phí; CÓ hỗ trợ tài chính trong một số trường hợp đặc biệt cần thiết.\n" +
        "✔ Người học tự túc chi phí di chuyển, chỗ ở.\n" + "✔ Người tham dự cam kết học tối thiểu 80% thời lượng chương trình. \n" + "\n" +
        "📌 Quy trình tuyển chọn người tham dự gồm 01 vòng, đăng kí qua đơn bên dưới.\n" +
        "📝 Thời gian đóng đơn đăng ký: 23:59 Thứ 7 ngày 15/6/2024 (không gia hạn) \n" + "\n" +
        "Lưu ý: Các câu hỏi của V.Gen cần ít nhất 3 ngày để chuẩn bị, vì vậy V.Gen khuyến khích các bạn dành thời gian đọc trước Form đăng ký để có thể hoàn thành một cách trọn vẹn nhất. \n" +
        "\n" + "Thông tin liên hệ:\n" + "Facebook: https://www.facebook.com/V.GenNetwork \n" + "📩 Email: Vgennetwork@gmail.com\n" +
        "📱Hotline: 0345 644 146 (Thùy Trang)",
    },
    Slug: undefined,
    "Tác giả": undefined,
    "Ngày tạo": undefined,
    "Ngày cập nhật": undefined,
  }],

  [
    "https://discord.gg/jWTk4EHFK2",
    {
      "Tiêu đề": "Liên kết mời tham gia Discord Quả Cầu",
      URL: "https://discord.gg/jWTk4EHFK2",
      "Nội dung bài đăng": { "Mô tả bài đăng": undefined },
      Slug: undefined,
      "Tác giả": undefined,
      "Ngày tạo": undefined,
      "Ngày cập nhật": undefined,
    },
  ],

  ["https://duyphong1204.notion.site", {}],
  ["https://duyphong1204.notion.site/M-nh-c-a-hi-n-t-i-aeb41d0ef8e841489ce618c39af5b6ac?pvs=73", {}],
  ["https://duyphong1204.notion.site/Brand-New-Cherry-Flavor-c3ac54c3ad9244cfb24b4c7f208b1330?pvs=73", {}],
];

for (const test of tests) {
  if (tests.indexOf(test) < 8) continue;
  const a = await lấyMetaTagVàTạoDocument(test[0]);
  // console.log(lấyURLChínhTắc(a));
  // console.log(a);
  console.log(await tạoBàiĐăngTừURL(test[0]));
  // assertObjectMatch(await tạoBàiĐăngTừURL(test[0]), test[1]);
}
console.info("Không bị lỗi");
debugger;
