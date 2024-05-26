import CấuHìnhNơiĐăng, {
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
import { táchUrlTrongChuỗi } from "../../Code hỗ trợ cho server/Code hỗ trợ.ts";

function lấyNơiĐăngTừMessengerDiscordTelegram(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
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
        const [tênMáyChủ, urlMáyChủ] = táchUrlTrongChuỗi(tênMáyChủUrl);
        for (const cấuHìnhKênh of cấuHìnhMáyChủ) {
          /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, và không để dấu `:` đằng sau tên kênh */
          if (typeof cấuHìnhKênh === "string") {
            const [kênh, urlKênh] = táchUrlTrongChuỗi(cấuHìnhKênh);
            danhSáchThôngTinNơiĐăng.push({
              "Tên nơi đăng": [tênMáyChủ, kênh],
              "Loại nơi đăng": loạiNơiĐăng,
              "Tên nền tảng": tênNềnTảng,
              "Loại nền tảng": "Chat",
              URL: urlKênh || urlMáyChủ,
            });
          } else {
            for (const [kênhUrl, danhSáchThreadHoặcTopic] of Object.entries(cấuHìnhKênh)) {
              /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, nhưng vẫn để dấu `:` đằng sau tên kênh */
              const [kênh, urlKênh] = táchUrlTrongChuỗi(kênhUrl);
              if (danhSáchThreadHoặcTopic === null) {
                danhSáchThôngTinNơiĐăng.push({
                  "Tên nơi đăng": [tênMáyChủ, kênh],
                  "Loại nơi đăng": loạiNơiĐăng,
                  "Tên nền tảng": tênNềnTảng,
                  "Loại nền tảng": "Chat",
                  URL: urlKênh || urlMáyChủ,
                });

                /** Trường hợp kênh có thread hoặc topic nhỏ hơn*/
              } else {
                for (const threadHoặcTopicUrl of danhSáchThreadHoặcTopic) {
                  const [threadHoặcTopic, urlThreadHoặcTopic] = táchUrlTrongChuỗi(threadHoặcTopicUrl);
                  danhSáchThôngTinNơiĐăng.push({
                    "Tên nơi đăng": [tênMáyChủ, kênh, threadHoặcTopic],
                    "Loại nơi đăng": lấyLoạiNơiĐăng(tênNềnTảng, threadHoặcTopic),
                    "Tên nền tảng": tênNềnTảng,
                    "Loại nền tảng": "Chat",
                    URL: urlThreadHoặcTopic || urlKênh || urlMáyChủ,
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

function lấyNơiĐăngTừNềnTảngChatKhác(
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
      const [tênNơiĐăng, url] = táchUrlTrongChuỗi(tênNơiĐăngUrl);
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [loạiNơiĐăng],
        "Tên nền tảng": tênNềnTảng,
        "Loại nền tảng": "Chat",
        URL: url,
      });
    }
  }
}

export default function tạoDanhSáchChat(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăngChưaCóId[]) {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  if (!cấuHìnhNơiĐăngChat) return;

  for (const [tênNềnTảng, vậtThểNơiĐăng] of Object.entries(cấuHìnhNơiĐăngChat) as [TênNềnTảngChat, CấuHìnhNơiĐăngChatThôngThường][]) {
    if (!vậtThểNơiĐăng) continue;
    lấyNơiĐăngTừMessengerDiscordTelegram(cấuHìnhNơiĐăng, danhSáchThôngTinNơiĐăng);
    lấyNơiĐăngTừNềnTảngChatKhác(vậtThểNơiĐăng, tênNềnTảng, danhSáchThôngTinNơiĐăng);
  }
}
