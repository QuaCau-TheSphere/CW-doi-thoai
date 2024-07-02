import {
  CấuHìnhMáyChủ,
  CấuHìnhNơiĐăngChatThôngThường,
  LoạiNơiĐăngChat,
  LoạiNơiĐăngMessengerDiscordTelegram,
  ThôngTinNơiĐăngChưaCóId,
  TênMáyChủ,
  TênNơiĐăng,
  TênNơiĐăngMessengerDiscordTelegram,
  TênNềnTảng,
  TênNềnTảngChat,
} from "./Kiểu cho nơi đăng.ts";
import CấuHìnhNơiĐăng from "../Hàm và kiểu cho cấu hình.ts";
import { táchUrlHoặcEmailĐầuTiênTrongChuỗi } from "../../Code chạy trên client/URL, HTML/Hàm và kiểu cho URL và fetch.ts";

async function lấyDanhSáchMessengerDiscordTelegram(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng): Promise<ThôngTinNơiĐăngChưaCóId[]> {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  const danhSáchMessengerDiscordTelegram: ThôngTinNơiĐăngChưaCóId[] = [];
  if (!cấuHìnhNơiĐăngChat) return [];
  for (const tênNềnTảng of ["Messenger", "Discord", "Telegram"] as const) {
    if (!cấuHìnhNơiĐăngChat[tênNềnTảng]) continue;
    const loạiNơiĐăng = lấyLoạiNơiĐăng(tênNềnTảng);
    // @ts-ignore:
    const danhSáchMáyChủ = cấuHìnhNơiĐăngChat[tênNềnTảng][loạiNơiĐăng[0]];
    if (!danhSáchMáyChủ) continue;
    for (const MáyChủ of danhSáchMáyChủ) {
      for (const [tênMáyChủUrl, cấuHìnhMáyChủ] of Object.entries(MáyChủ) as [TênMáyChủ, CấuHìnhMáyChủ | null][]) {
        if (!cấuHìnhMáyChủ) continue;
        const [tênMáyChủ, urlMáyChủ] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênMáyChủUrl);
        for (const cấuHìnhKênh of cấuHìnhMáyChủ) {
          /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, và không để dấu `:` đằng sau tên kênh */
          if (typeof cấuHìnhKênh === "string") {
            const [kênh, urlKênh] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(cấuHìnhKênh);
            danhSáchMessengerDiscordTelegram.push({
              "Tên nơi đăng": [tênMáyChủ, kênh],
              "Loại nơi đăng": loạiNơiĐăng,
              "Tên nền tảng": tênNềnTảng,
              "Loại nền tảng": "Chat",
              URL: urlKênh || urlMáyChủ,
              "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
            });
          } else {
            for (const [kênhUrl, danhSáchThreadHoặcTopic] of Object.entries(cấuHìnhKênh)) {
              /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, nhưng vẫn để dấu `:` đằng sau tên kênh */
              const [kênh, urlKênh] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(kênhUrl);
              if (danhSáchThreadHoặcTopic === null) {
                danhSáchMessengerDiscordTelegram.push({
                  "Tên nơi đăng": [tênMáyChủ, kênh],
                  "Loại nơi đăng": loạiNơiĐăng,
                  "Tên nền tảng": tênNềnTảng,
                  "Loại nền tảng": "Chat",
                  URL: urlKênh || urlMáyChủ,
                  "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
                });

                /** Trường hợp kênh có thread hoặc topic nhỏ hơn*/
              } else {
                for (const threadHoặcTopicUrl of danhSáchThreadHoặcTopic) {
                  const [threadHoặcTopic, urlThreadHoặcTopic] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(threadHoặcTopicUrl);
                  const tênNơiĐăng = [tênMáyChủ, kênh, threadHoặcTopic] as TênNơiĐăngMessengerDiscordTelegram;
                  danhSáchMessengerDiscordTelegram.push({
                    "Tên nơi đăng": tênNơiĐăng,
                    "Loại nơi đăng": lấyLoạiNơiĐăng(tênNềnTảng, tênNơiĐăng),
                    "Tên nền tảng": tênNềnTảng,
                    "Loại nền tảng": "Chat",
                    URL: urlThreadHoặcTopic || urlKênh || urlMáyChủ,
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
  return danhSáchMessengerDiscordTelegram;
  function lấyLoạiNơiĐăng(
    tênNềnTảng: "Messenger" | "Discord" | "Telegram",
    tênNơiĐăng: TênNơiĐăng | undefined = undefined,
  ): LoạiNơiĐăngMessengerDiscordTelegram {
    switch (tênNềnTảng) {
      case "Messenger":
        if (!tênNơiĐăng) return ["Cộng đồng", "Chat cộng đồng"];
        return ["Cộng đồng", "Chat cộng đồng", "Sidechat"];

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
    /** Loại hết cộng đồng chat trên Messenger, Discord, Telegram để chỉ còn lại loại nơi đăng chat thông thường (tài khoản, cá nhân hoặc nhóm) */
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
  const danhSáchChat: ThôngTinNơiĐăngChưaCóId[] = await lấyDanhSáchMessengerDiscordTelegram(cấuHìnhNơiĐăng);
  if (!cấuHìnhNơiĐăngChat) return [];

  for (const [tênNềnTảng, vậtThểNơiĐăng] of Object.entries(cấuHìnhNơiĐăngChat) as [TênNềnTảngChat, CấuHìnhNơiĐăngChatThôngThường][]) {
    if (!vậtThểNơiĐăng) continue;
    danhSáchChat.push(...await lấyDanhSáchChatKhác(vậtThểNơiĐăng, tênNềnTảng));
  }
  return danhSáchChat;
}
