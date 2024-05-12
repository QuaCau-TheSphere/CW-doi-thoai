import CấuHìnhNơiĐăng, {
  CấuHìnhMáyChủ,
  CấuHìnhNơiĐăngChatThôngThường,
  LoạiNơiĐăngChat,
  LoạiNơiĐăngMessengerDiscordTelegram,
  ThôngTinNơiĐăng,
  TênMáyChủ,
  TênNềnTảng,
  TênNềnTảngChat,
  TênThreadHoặcTopic,
} from "../../Code hỗ trợ/Kiểu cho nơi đăng.ts";

function lấyNơiĐăngTừMessengerDiscordTelegram(
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
  danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăng[],
) {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  if (!cấuHìnhNơiĐăngChat) return;
  for (const tênNềnTảng of ["Messenger", "Discord", "Telegram"] as const) {
    if (!cấuHìnhNơiĐăngChat[tênNềnTảng]) continue;
    const loạiNơiĐăng = lấyLoạiNơiĐăng(tênNềnTảng);
    // @ts-ignore:
    const danhSáchMáyChủ = cấuHìnhNơiĐăngChat[tênNềnTảng][loạiNơiĐăng[0]];
    if (!danhSáchMáyChủ) continue;

    for (const MáyChủ of danhSáchMáyChủ) {
      for (
        const [tênMáyChủ, cấuHìnhMáyChủ] of Object.entries(MáyChủ) as [
          TênMáyChủ,
          CấuHìnhMáyChủ | null,
        ][]
      ) {
        if (!cấuHìnhMáyChủ) continue;
        for (const kênh of cấuHìnhMáyChủ) {
          /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, và không để dấu `:` đằng sau tên kênh */
          if (typeof kênh === "string") {
            danhSáchThôngTinNơiĐăng.push({
              "Tên nơi đăng": [tênMáyChủ, kênh],
              "Loại nơi đăng": loạiNơiĐăng,
              "Tên nền tảng": tênNềnTảng,
              "Loại nền tảng": "Chat",
            });
          } else {
            for (
              const [tênKênh, danhSáchThreadHoặcTopic] of Object.entries(
                kênh,
              )
            ) {
              /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, nhưng vẫn để dấu `:` đằng sau tên kênh */
              if (danhSáchThreadHoặcTopic === null) {
                danhSáchThôngTinNơiĐăng.push({
                  "Tên nơi đăng": [tênMáyChủ, tênKênh],
                  "Loại nơi đăng": loạiNơiĐăng,
                  "Tên nền tảng": tênNềnTảng,
                  "Loại nền tảng": "Chat",
                });

                /** Trường hợp kênh có thread hoặc topic nhỏ hơn*/
              } else {
                for (const tênThreadHoặcTopic of danhSáchThreadHoặcTopic) {
                  danhSáchThôngTinNơiĐăng.push({
                    "Tên nơi đăng": [
                      tênMáyChủ,
                      tênKênh,
                      tênThreadHoặcTopic,
                    ],
                    "Loại nơi đăng": lấyLoạiNơiĐăng(
                      tênNềnTảng,
                      tênThreadHoặcTopic,
                    ),
                    "Tên nền tảng": tênNềnTảng,
                    "Loại nền tảng": "Chat",
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
        if (
          cấuHìnhNơiĐăng["Kênh forum Discord"]?.includes(tênThreadHoặcTopic)
        ) {
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
  danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăng[],
) {
  for (
    const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(
      vậtThểNơiĐăng,
    ) as [LoạiNơiĐăngChat[0], string[]][]
  ) {
    /** Loại hết cộng đồng chat trên Messenger, Discord, Telegram để chỉ còn lại loại nơi đăng chat thông thường (tài khoản, cá nhân hoặc nhóm) */
    if (
      loạiNơiĐăng === "Máy chủ" || loạiNơiĐăng === "Cộng đồng" ||
      tênNềnTảng === "Telegram" && loạiNơiĐăng === "Nhóm" ||
      !danhSáchTênNơiĐăng
    ) continue;

    for (const tênNơiĐăng of danhSáchTênNơiĐăng) {
      danhSáchThôngTinNơiĐăng.push({
        "Tên nơi đăng": [tênNơiĐăng],
        "Loại nơi đăng": [loạiNơiĐăng],
        "Tên nền tảng": tênNềnTảng,
        "Loại nền tảng": "Chat",
      });
    }
  }
}

export default function tạoDanhSáchChat(
  cấuHìnhNơiĐăng: CấuHìnhNơiĐăng,
  danhSáchThôngTinNơiĐăng: ThôngTinNơiĐăng[],
) {
  const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
  if (!cấuHìnhNơiĐăngChat) return;

  for (
    const [tênNềnTảng, vậtThểNơiĐăng] of Object.entries(
      cấuHìnhNơiĐăngChat,
    ) as [TênNềnTảngChat, CấuHìnhNơiĐăngChatThôngThường][]
  ) {
    if (!vậtThểNơiĐăng) continue;
    lấyNơiĐăngTừMessengerDiscordTelegram(
      cấuHìnhNơiĐăng,
      danhSáchThôngTinNơiĐăng,
    );
    lấyNơiĐăngTừNềnTảngChatKhác(
      vậtThểNơiĐăng,
      tênNềnTảng,
      danhSáchThôngTinNơiĐăng,
    );
  }
}
