import {
  CấuHìnhCấp1,
  CấuHìnhNơiĐăngChatThôngThường,
  LoạiNơiĐăngChat,
  LoạiNơiĐăngChatĐaCấp,
  ThôngTinNơiĐăngChưaCóId,
  TênCấp1,
  TênNơiĐăng,
  TênNơiĐăngChatĐaCấp,
  TênNềnTảng,
  TênNềnTảngChat,
} from "./Kiểu cho nơi đăng.ts";
import CấuHìnhNơiĐăng from "../Hàm và kiểu cho cấu hình.ts";
import { táchUrlHoặcEmailĐầuTiênTrongChuỗi } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";

async function lấyDanhSáchChatĐaCấp(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  const danhSáchChatĐaCấp: ThôngTinNơiĐăngChưaCóId[] = [];
  if (!cấuHìnhNơiĐăngChat) return [];
  for (const tênNềnTảng of ["Messenger", "Discord", "Telegram", "WhatsApp"] as const) {
    if (!cấuHìnhNơiĐăngChat[tênNềnTảng]) continue;
    const loạiNơiĐăng = lấyLoạiNơiĐăng(tênNềnTảng);
    // @ts-ignore:
    const danhSáchCấp1 = cấuHìnhNơiĐăngChat[tênNềnTảng][loạiNơiĐăng[0]];
    if (!danhSáchCấp1) continue;
    for (const cấp1 of danhSáchCấp1) {
      for (const [tênCấp1Url, cấuHìnhCấp1] of Object.entries(cấp1) as [TênCấp1, CấuHìnhCấp1 | null][]) {
        if (!cấuHìnhCấp1) continue;
        const [tênCấp1, urlCấp1] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênCấp1Url);
        for (const cấuHìnhCấp2 of cấuHìnhCấp1) {
          /** Trường hợp người dùng chỉ khai báo cấp 2 chứ không khai báo cấp 3, và không để dấu `:` đằng sau tên cấp 2 */
          if (typeof cấuHìnhCấp2 === "string") {
            const [cấp2, urlCấp2] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(cấuHìnhCấp2);
            danhSáchChatĐaCấp.push({
              "Tên nơi đăng": [tênCấp1, cấp2],
              "Loại nơi đăng": loạiNơiĐăng,
              "Tên nền tảng": tênNềnTảng,
              "Loại nền tảng": "Chat",
              URL: urlCấp2 || urlCấp1,
              "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
            });
          } else {
            for (const [cấp2Url, danhSáchCấp3] of Object.entries(cấuHìnhCấp2)) {
              /** Trường hợp người dùng chỉ khai báo cấp 2 chứ không khai báo cấp 3, nhưng vẫn để dấu `:` đằng sau tên cấp 2 */
              const [cấp2, urlCấp2] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(cấp2Url);
              if (danhSáchCấp3 === null) {
                danhSáchChatĐaCấp.push({
                  "Tên nơi đăng": [tênCấp1, cấp2],
                  "Loại nơi đăng": loạiNơiĐăng,
                  "Tên nền tảng": tênNềnTảng,
                  "Loại nền tảng": "Chat",
                  URL: urlCấp2 || urlCấp1,
                  "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
                });

                /** Trường hợp cấp 2 có cấp 3*/
              } else {
                for (const cấp3Url of danhSáchCấp3) {
                  const [cấp3, urlCấp3] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(cấp3Url);
                  const tênNơiĐăng = [tênCấp1, cấp2, cấp3] as TênNơiĐăngChatĐaCấp;
                  danhSáchChatĐaCấp.push({
                    "Tên nơi đăng": tênNơiĐăng,
                    "Loại nơi đăng": lấyLoạiNơiĐăng(tênNềnTảng, tênNơiĐăng),
                    "Tên nền tảng": tênNềnTảng,
                    "Loại nền tảng": "Chat",
                    URL: urlCấp3 || urlCấp2 || urlCấp1,
                    "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
                  });
                }
              }
            }
          }
        }
      }
    }
  }
  return danhSáchChatĐaCấp;
  function lấyLoạiNơiĐăng(
    tênNềnTảng: "Messenger" | "Discord" | "Telegram" | "WhatsApp",
    tênNơiĐăng: TênNơiĐăng | undefined = undefined,
  ): LoạiNơiĐăngChatĐaCấp {
    switch (tênNềnTảng) {
      case "Messenger":
        if (!tênNơiĐăng) return ["Cộng đồng", "Chat cộng đồng"];
        return ["Cộng đồng", "Chat cộng đồng", "Sidechat"];

      case "WhatsApp":
        if (!tênNơiĐăng) return ["Cộng đồng", "Nhóm"];
        return ["Cộng đồng", "Nhóm"];

      case "Discord":
        if (!tênNơiĐăng) return ["Máy chủ", "Kênh thường"];
        for (const tênNơiĐăngThànhPhần of tênNơiĐăng.slice(0, -1).toReversed()) {
          if (cấuHìnhNơiĐăng["Kênh diễn đàn Discord"]?.includes(tênNơiĐăngThànhPhần)) {
            return ["Máy chủ", "Kênh diễn đàn", "Bài diễn đàn"];
          }
        }
        return ["Máy chủ", "Kênh thường", "Thread"];

      case "Telegram":
        if (!tênNơiĐăng) return ["Nhóm"];
        return ["Nhóm", "Chủ đề"];
    }
  }
}

async function lấyDanhSáchChatKhác(
  vậtThểNơiĐăng: CấuHìnhNơiĐăngChatThôngThường,
  tênNềnTảng: TênNềnTảng,
): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const danhSáchChatKhác: ThôngTinNơiĐăngChưaCóId[] = [];
  for (const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(vậtThểNơiĐăng) as [LoạiNơiĐăngChat[0], string[]][]) {
    /** Loại hết cộng đồng chat trên chat đa cấp để chỉ còn lại loại nơi đăng chat thông thường (tài khoản, cá nhân hoặc nhóm) */
    if (
      loạiNơiĐăng === "Máy chủ" || loạiNơiĐăng === "Cộng đồng" ||
      tênNềnTảng === "Telegram" && loạiNơiĐăng === "Nhóm" ||
      !danhSáchTênNơiĐăng
    ) continue;

    for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
      const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
      danhSáchChatKhác.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [loạiNơiĐăng],
        "Tên nền tảng": tênNềnTảng,
        "Loại nền tảng": "Chat",
        URL: url,
        "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
      });
    }
  }
  return danhSáchChatKhác;
}

export default async function tạoDanhSáchChat(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  const danhSáchChat: ThôngTinNơiĐăngChưaCóId[] = await lấyDanhSáchChatĐaCấp(cấuHìnhNơiĐăng);
  if (!cấuHìnhNơiĐăngChat) return [];

  for (const [tênNềnTảng, vậtThểNơiĐăng] of Object.entries(cấuHìnhNơiĐăngChat) as [TênNềnTảngChat, CấuHìnhNơiĐăngChatThôngThường][]) {
    if (!vậtThểNơiĐăng) continue;
    danhSáchChat.push(...await lấyDanhSáchChatKhác(vậtThểNơiĐăng, tênNềnTảng));
  }
  return danhSáchChat;
}
