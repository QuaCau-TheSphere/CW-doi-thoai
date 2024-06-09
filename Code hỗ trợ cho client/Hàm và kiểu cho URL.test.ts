import { assert } from "$std/assert/assert.ts";
import { appendSlashToUrlIfIsPossible, táchUrlHoặcEmailTrongChuỗi } from "./Hàm và kiểu cho URL.ts";

const testsappendSlashToUrlIfIsPossible: string[] = [
  "https://quảcầu.com",
  "https://example.com/path",
  "https://example.com/path/",
  "https://example.com/path?",
  "https://example.com/path?#",
  "https://example.com/path/?#",
  "https://example.com/path/?parameter#",
  "https://example.com/path/?parameter#fragment",
  "https://example.com/path/file.pdf",
  "https://example.com/path/file.pdf?",
  "https://example.com/path/path.with.dot",
];

const testtáchUrlHoặcEmailTrongChuỗi: string[] = [
  "https://quảcầu.com",
  "sdf https://example.com/path",
  "https://example.com/path/",
  "https://example.com/path?#",
  "https://example.com/path/?#",
  "https://example.com/path/path.with.dot",
];

for (const chuỗi of testtáchUrlHoặcEmailTrongChuỗi) {
  console.log(táchUrlHoặcEmailTrongChuỗi(chuỗi));
  console.log();
}
// appendSlashToUrlIfIsPossible_test();

function appendSlashToUrlIfIsPossible_test() {
  for (const url of testsappendSlashToUrlIfIsPossible) {
    console.log(appendSlashToUrlIfIsPossible(url));
  }
}
