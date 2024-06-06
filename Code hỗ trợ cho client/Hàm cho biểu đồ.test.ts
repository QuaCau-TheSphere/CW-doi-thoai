import { tạoDữLiệuBiểuĐồ } from "./Hàm và kiểu cho biểu đồ.ts";
import { DữLiệuTruyCậpCácNăm } from "./Hàm và kiểu cho vật thể tiếp thị.ts";

export const dữLiệuTruyCậpCácNămTest: DữLiệuTruyCậpCácNăm = {
  "2024": {
    "Tháng 1": {
      "Ngày 1": {
        "0 giờ": [{ "Thời điểm": new Date("2024-05-01T00:00:00") }],
        "12 giờ": [
          { "Thời điểm": new Date("2024-05-01T12:00:00") },
          { "Thời điểm": new Date("2024-05-01T12:10:00") },
          { "Thời điểm": new Date("2024-05-01T12:20:00") },
          { "Thời điểm": new Date("2024-05-01T12:30:00") },
        ],
        "23 giờ": [
          { "Thời điểm": new Date("2024-05-01T23:00:00") },
          { "Thời điểm": new Date("2024-05-01T23:10:00") },
          { "Thời điểm": new Date("2024-05-01T23:20:00") },
        ],
      },
      "Ngày 15": {
        "0 giờ": [{ "Thời điểm": new Date("2024-05-15T00:00:00") }],
        "12 giờ": [
          { "Thời điểm": new Date("2024-05-15T12:00:00") },
          { "Thời điểm": new Date("2024-05-15T12:10:00") },
          { "Thời điểm": new Date("2024-05-15T12:20:00") },
          { "Thời điểm": new Date("2024-05-15T12:30:00") },
        ],
        "23 giờ": [
          { "Thời điểm": new Date("2024-05-15T23:00:00") },
          { "Thời điểm": new Date("2024-05-15T23:10:00") },
          { "Thời điểm": new Date("2024-05-15T23:20:00") },
        ],
      },
    },
  },
};
// const a = tạoDữLiệuBiểuĐồ(dữLiệuTruyCậpCácNămTest);
// console.log(a);
debugger;
