import {
  CấuHìnhMáyChủ,
  CấuHìnhNơiĐăngChatThôngThường,
  LoạiNơiĐăngChat,
  LoạiNơiĐăngMessengerDiscordTelegram,
  ThôngTinNơiĐăngChưaCóId,
  TênMáyChủ,
  TênNềnTảng,
  TênNềnTảngChat,
  TênThreadHoặcTopic,
} from "../../Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import CấuHìnhNơiĐăng from "../../Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import { táchUrlHoặcEmailĐầuTiênTrongChuỗi } from "../../../Code hỗ trợ cho client/Chuỗi, URL, slug/Hàm và kiểu cho URL.ts";

async function lấyNơiĐăngTừMessengerDiscordTelegram(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  if (!cấuHìnhNơiĐăngChat) return;
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
            danhSáchThôngTinNơiĐăng.push({
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
                danhSáchThôngTinNơiĐăng.push({
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
                  danhSáchThôngTinNơiĐăng.push({
                    "Tên nơi đăng": [tênMáyChủ, kênh, threadHoặcTopic],
                    "Loại nơi đăng": lấyLoạiNơiĐăng(tênNềnTảng, threadHoặcTopic),
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
  function lấyLoạiNơiĐăng(
    tênNềnTảng: "Messenger" | "Discord" | "Telegram",
    tênThreadHoặcTopic: TênThreadHoặcTopic | undefined = undefined,
  ): LoạiNơiĐăngMessengerDiscordTelegram {
    switch (tênNềnTảng) {
      case "Messenger":
        if (!tênThreadHoặcTopic) return ["Cộng đồng", "Chat cộng đồng"];
        return ["Cộng đồng", "Chat cộng đồng", "Sidechat"];

      case "Discord":
        if (!tênThreadHoặcTopic) return ["Máy chủ", "Kênh thường"];
        if (cấuHìnhNơiĐăng["Kênh forum Discord"]?.includes(tênThreadHoặcTopic)) {
          return ["Máy chủ", "Kênh diễn đàn", "Bài diễn đàn"];
        }
        return ["Máy chủ", "Kênh thường", "Thread"];

      case "Telegram":
        if (!tênThreadHoặcTopic) return ["Nhóm"];
        return ["Nhóm", "Chủ đề"];
    }
  }
}

async function lấyNơiĐăngTừNềnTảngChatKhác(
  vậtThểNơiĐăng: CấuHìnhNơiĐăngChatThôngThường,
  tênNềnTảng: TênNềnTảng,
  danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[],
) {
  for (const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(vậtThểNơiĐăng) as [LoạiNơiĐăngChat[0], string[]][]) {
    /** Loại hết cộng đồng chat trên Messenger, Discord, Telegram để chỉ còn lại loại nơi đăng chat thông thường (tài khoản, cá nhân hoặc nhóm) */
    if (
      loạiNơiĐăng === "Máy chủ" || loạiNơiĐăng === "Cộng đồng" ||
      tênNềnTảng === "Telegram" && loạiNơiĐăng === "Nhóm" ||
      !danhSáchTênNơiĐăng
    ) continue;

    for (const tênNơiĐăngUrl of danhSáchTênNơiĐăng) {
      const [tênNơiĐăng, url] = await táchUrlHoặcEmailĐầuTiênTrongChuỗi(tênNơiĐăngUrl);
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [loạiNơiĐăng],
        "Tên nền tảng": tênNềnTảng,
        "Loại nền tảng": "Chat",
        URL: url,
        "Phương thức tạo": "Lấy trong cấu hình nơi đăng",
      });
    }
  }
}

export default async function tạoDanhSáchChat(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  if (!cấuHìnhNơiĐăngChat) return;

  for (const [tênNềnTảng, vậtThểNơiĐăng] of Object.entries(cấuHìnhNơiĐăngChat) as [TênNềnTảngChat, CấuHìnhNơiĐăngChatThôngThường][]) {
    if (!vậtThểNơiĐăng) continue;
    await lấyNơiĐăngTừMessengerDiscordTelegram(cấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng);
    await lấyNơiĐăngTừNềnTảngChatKhác(vậtThểNơiĐăng, tênNềnTảng, danhSáchThôngTinNơiĐăng);
  }
}
