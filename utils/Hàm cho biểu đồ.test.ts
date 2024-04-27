import { tạoDữLiệuBiểuĐồ } from "./H%C3%A0m%20cho%20bi%E1%BB%83u%20%C4%91%E1%BB%93.ts";
import { DữLiệuTruyCậpCácNăm } from "./Ki%E1%BB%83u%20cho%20web.ts";

const dữLiệuTruyCậpCácNăm: DữLiệuTruyCậpCácNăm = {
  "2024": {
    "Tháng 1": {
      "Ngày 1": {
        "0 giờ": [new Date("2024-05-01T00:00:00")],
        "12 giờ": [
          new Date("2024-05-01T12:00:00"),
          new Date("2024-05-01T12:10:00"),
          new Date("2024-05-01T12:20:00"),
          new Date("2024-05-01T12:30:00"),
        ],
        "23 giờ": [
          new Date("2024-05-01T23:00:00"),
          new Date("2024-05-01T23:10:00"),
          new Date("2024-05-01T23:20:00"),
        ],
      },
    },
  },
};
tạoDữLiệuBiểuĐồ(dữLiệuTruyCậpCácNăm);
