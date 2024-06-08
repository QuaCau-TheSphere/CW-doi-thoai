import _ from "npm:lodash";
import { assertEquals } from "$std/assert/mod.ts";
import { BàiĐăngChưaCóIdVàPhươngThứTạo } from "../T%E1%BA%A1o%20b%C3%A0i%20%C4%91%C4%83ng%20v%C3%A0%20n%C6%A1i%20%C4%91%C4%83ng/Code%20h%E1%BB%97%20tr%E1%BB%A3%20cho%20server/H%C3%A0m%20v%C3%A0%20ki%E1%BB%83u%20cho%20vault,%20d%E1%BB%B1%20%C3%A1n,%20b%C3%A0i%20%C4%91%C4%83ng.ts";
import { tạoBàiĐăngTừURL } from "./T%E1%BA%A1o%20b%C3%A0i%20%C4%91%C4%83ng%20ho%E1%BA%B7c%20n%C6%A1i%20%C4%91%C4%83ng%20t%E1%BB%AB%20URL.ts";
import { assertObjectMatch } from "https://deno.land/std@0.216.0/assert/assert_object_match.ts";
import punycode from "npm:punycode";
import { lấyMetaTagVàTạoDocument } from "./H%C3%A0m%20v%C3%A0%20ki%E1%BB%83u%20cho%20URL.ts";

const tests: [string, BàiĐăngChưaCóIdVàPhươngThứTạo][] = [
  [
    "https://xn--qucu-hr5aza.cc",
    {
      "Tiêu đề": "Quả Cầu – Lan tỏa và bảo vệ các tinh thần phản tư, tò mò, dũng cảm, trân trọng người khác",
      URL: "https://Quảcầu.cc",
      "Ngày cập nhật": undefined,
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng": "Dự án Quả Cầu được lập ra để lan tỏa tinh thần:",
      },
      "Slug": "quảcầu",
      "Tác giả": undefined,
    },
  ],

  [
    "https://lậptrình.xn--qucu-hr5aza.cc",
    {
      "Tiêu đề": "Nơi này là nơi nào - Tiếp thị số, xử lý dữ liệu và lập trình",
      URL: "https://xn--lptrnh-zva6402d.xn--qucu-hr5aza.cc/",
      "Ngày cập nhật": undefined,
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng":
          "Đây là vault bổ sung cho Obsidian, quản lý dự án và công cụ nghĩ, tập trung vào việc xử lý dữ liệu và lập trình. Nó được sinh ra trong quá trình bọn mình viết Trấn Kỳ, và cũng được sử dụng như tài liệu hướng dẫn cho nó. Nếu bạn muốn tìm một nguồn tài liệu để học một cách bài bản thì không nên vào đây. Nhưng nếu mục tiêu của bạn là làm xong những công việc khác, mà để làm được chúng trôi chảy bạn phải học lập trình, và bạn muốn tìm những bài viết thật ngắn nhưng đủ để hiểu khái niệm để còn làm việc được tiếp (như khi bọn mình cần phải học để còn viết xong Trấn Kỳ), thì có thể một số thứ trong đây sẽ hữu ích cho bạn.",
      },
      "Slug": "quảcầu",
      // "Slug": "lậptrình.quảcầu",
      "Tác giả": undefined,
    },
  ],

  [
    "https://doi-thoai.deno.dev",
    {
      "Tiêu đề": "đối ⊷ thoại",
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
    "https://www.inkandswitch.com/local-first",
    {
      "Ngày cập nhật": new Date("2019-04-01T00:00:00.000Z"),
      "Ngày tạo": undefined,
      "Nội dung bài đăng": {
        "Mô tả bài đăng":
          "Cloud apps like Google Docs and Trello are popular because they enable real-time collaboration with colleagues, and they make it easy for us to access our work from all of our devices. However, by centralizing data storage on servers, cloud apps also take away ownership and agency from users. If a service shuts down, the software stops functioning, and data created with that software is lost.",
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

  ["https://docs.google.com/forms/d/e/1FAIpQLSeIYwh8-76fFxqDROZo3lLWC2KBp3xlT72VRokR4KJf0E7dew/viewform"],
];

for (const test of tests) {
  if (tests.indexOf(test) !== 4) continue;
  const a = await lấyMetaTagVàTạoDocument(test[0]);
  console.log(a);
  console.log(await tạoBàiĐăngTừURL(test[0]));
  // assertObjectMatch(await tạoBàiĐăngTừURL(test[0]), test[1]);
}

console.info("Không bị lỗi");
debugger;
