import CấuHìnhNơiĐăng, {
  LoạiNơiĐăngDiễnĐàn,
  MáyChủ,
  NơiĐăng,
  TênDiễnĐàn,
  TênNềnTảngChat,
  VậtThểNơiĐăngChat,
  VậtThểNơiĐăngDiễnĐàn,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
import {
  LoạiNơiĐăngChat,
  LoạiNơiĐăngKhác,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

/**
 * Lấy dữ liệu từ `Nơi đăng.yaml`
 */
export default function tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng) {
  const danhSáchNơiĐăng: NơiĐăng[] = [];

  if (cấuHìnhNơiĐăng["Diễn đàn"]) tạoDanhSáchNơiĐăngDiễnĐàn();
  if (cấuHìnhNơiĐăng.Chat) tạoDanhSáchNơiĐăngTrênChat();
  if (cấuHìnhNơiĐăng.Khác) tạoDanhSáchNơiĐăngKhác();

  return danhSáchNơiĐăng;

  function tạoDanhSáchNơiĐăngDiễnĐàn() {
    for (
      const [tênDiễnĐàn, vậtThểNơiĐăngDiễnĐàn] of Object.entries(
        cấuHìnhNơiĐăng["Diễn đàn"],
      ) as [TênDiễnĐàn, VậtThểNơiĐăngDiễnĐàn][]
    ) {
      for (
        const [loạiNơiĐăngDiễnĐàn, danhSáchNơiĐăngDiễnĐàn] of Object.entries(
          vậtThểNơiĐăngDiễnĐàn,
        )
      ) {
        if (!danhSáchNơiĐăngDiễnĐàn) continue;
        for (const nơiĐăngDiễnĐàn of danhSáchNơiĐăngDiễnĐàn) {
          /** Trường hợp người dùng chỉ khai báo tên tài khoản/trang/nhóm chứ không khai báo thành phần nhỏ hơn, và không để dấu `:` đằng sau tên tên tài khoản/trang/nhóm */
          if (typeof nơiĐăngDiễnĐàn === "string") {
            danhSáchNơiĐăng.push({
              "Tên nơi đăng": nơiĐăngDiễnĐàn,
              "Loại nơi đăng": loạiNơiĐăngDiễnĐàn as LoạiNơiĐăngDiễnĐàn,
              "Tên nền tảng": tênDiễnĐàn,
              "Loại nền tảng": "Diễn đàn",
            });
          } else {
            for (
              const [tênTàiKhoảnHoặcTrangHoặcNhóm, danhSáchThànhPhần] of Object
                .entries(nơiĐăngDiễnĐàn)
            ) {
              /** Trường hợp người dùng chỉ khai báo tên tài khoản/trang/nhóm chứ không khai báo thành phần nhỏ hơn, nhưng vẫn để dấu `:` đằng sau tên tên tài khoản/trang/nhóm */
              if (!danhSáchThànhPhần) {
                danhSáchNơiĐăng.push({
                  "Tên nơi đăng": tênTàiKhoảnHoặcTrangHoặcNhóm,
                  "Loại nơi đăng": loạiNơiĐăngDiễnĐàn as LoạiNơiĐăngDiễnĐàn,
                  "Tên nền tảng": tênDiễnĐàn,
                  "Loại nền tảng": "Diễn đàn",
                });
                /** Trường hợp tài khoản/trang/nhóm có thành phần nhỏ hơn */
              } else {
                for (const thànhPhần of danhSáchThànhPhần) {
                  danhSáchNơiĐăng.push({
                    "Tên nơi đăng":
                      `${thànhPhần} ${tênTàiKhoảnHoặcTrangHoặcNhóm}`,
                    "Loại nơi đăng": loạiNơiĐăngDiễnĐàn as LoạiNơiĐăngDiễnĐàn,
                    "Tên nền tảng": tênDiễnĐàn,
                    "Loại nền tảng": "Diễn đàn",
                  });
                }
              }
            }
          }
        }
      }
    }
  }
  function tạoDanhSáchNơiĐăngTrênChat() {
    for (
      const [tênNềnTảngChat, vậtThểNơiĐăngChat] of Object.entries(
        cấuHìnhNơiĐăng.Chat,
      ) as [TênNềnTảngChat, VậtThểNơiĐăngChat][]
    ) {
      if (!vậtThểNơiĐăngChat) continue;
      /** Cộng đồng trên Discord, Messenger, Telegram */
      lấyNơiĐăngTừCộngĐồngChat("Discord");
      lấyNơiĐăngTừCộngĐồngChat("Messenger");
      lấyNơiĐăngTừCộngĐồngChat("Telegram");

      /** Nền tảng chat khác */
      for (
        const [loạiNơiĐăngChat, danhSáchNơiĐăngChat] of Object.entries(
          vậtThểNơiĐăngChat,
        ) as [LoạiNơiĐăngChat, string[]][]
      ) {
        /** Loại hết cộng đồng chat để chỉ còn giữ danh sách cá nhân hoặc nhóm */
        if (
          tênNềnTảngChat === "Discord" && loạiNơiĐăngChat === "Máy chủ" ||
          tênNềnTảngChat === "Messenger" && loạiNơiĐăngChat === "Cộng đồng" ||
          tênNềnTảngChat === "Telegram" && loạiNơiĐăngChat === "Nhóm" ||
          !danhSáchNơiĐăngChat
        ) continue;

        for (const tênNơiĐăngChat of danhSáchNơiĐăngChat) {
          danhSáchNơiĐăng.push({
            "Tên nơi đăng": tênNơiĐăngChat,
            "Loại nơi đăng": loạiNơiĐăngChat,
            "Tên nền tảng": tênNềnTảngChat,
            "Loại nền tảng": "Chat",
          });
        }
      }
    }

    /**
     * Cấu trúc của cộng đồng chat trong `Nơi đăng.yaml` có dạng:
     * ```yaml
     * - Tên cộng đồng 1       # Kiểu `string`
     * - Tên máy chủ:          # Kiểu `Record<string, string[]>`
     *   - Kênh 1                   # Kiểu `string`
     *   - Kênh 2:                  # Kiểu `Record<TênKênh, TênThreadHoặcTopic[]>`
     *     - Thread 1
     *   - Kênh 3:                  # Kiểu `Record<TênKênh, null>`
     * - Tên cộng đồng 2:      # Kiểu `Record<string, null>
     * ```
     *
     * Về mặt phân cấp thì Messenger và Discord là như nhau. Chỉ khác nhau ở cái tên. Không gom chung lại thành cùng một tên biến để sau này debug cho dễ, đỡ phải nhớ nhiều tên biến
     * | Discord                    | Messenger      | Telegram |
     * | -------------------------- | -------------- | -------- |
     * | Server                     | Community      | Group    |
     * | Text Channel/Forum Channel | Community Chat | Topic    |
     * | Channel Thread/Forum Post  | Sidechat       | ❌       |
     */
    function lấyNơiĐăngTừCộngĐồngChat(
      tênNềnTảng: "Discord" | "Messenger" | "Telegram",
    ) {
      let loạiNơiĐăng: "Cộng đồng" | "Máy chủ" | "Nhóm";
      let danhSáchMáyChủ: MáyChủ[];

      if (tênNềnTảng === "Messenger") {
        loạiNơiĐăng = "Cộng đồng";
        danhSáchMáyChủ = cấuHìnhNơiĐăng.Chat.Messenger["Cộng đồng"];
      } else if (tênNềnTảng === "Discord") {
        loạiNơiĐăng = "Máy chủ";
        danhSáchMáyChủ = cấuHìnhNơiĐăng.Chat.Discord["Máy chủ"];
      } else if (tênNềnTảng === "Telegram") {
        loạiNơiĐăng = "Nhóm";
        danhSáchMáyChủ = cấuHìnhNơiĐăng.Chat.Telegram.Nhóm;
      } else {
        console.error(
          "Không phải là máy chủ Discord, Messenger cộng đồng hoặc nhóm Telegram",
        );
        return;
      }
      for (const MáyChủ of danhSáchMáyChủ) {
        for (const [tênMáyChủ, danhSáchKênh] of Object.entries(MáyChủ)) {
          if (!danhSáchKênh) continue;
          for (const kênh of danhSáchKênh) {
            /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, và không để dấu `:` đằng sau tên kênh */
            if (typeof kênh === "string") {
              danhSáchNơiĐăng.push({
                "Tên nơi đăng": kênh,
                "Tên cộng đồng": tênMáyChủ,
                "Loại nơi đăng": loạiNơiĐăng,
                "Tên nền tảng": tênNềnTảng,
                "Loại nền tảng": "Chat",
              });
            } else {
              for (
                const [tênKênh, danhSáchThreadHoặcTopic] of Object.entries(kênh)
              ) {
                /** Trường hợp người dùng chỉ khai báo kênh chứ không khai báo thread hoặc topic nhỏ hơn, nhưng vẫn để dấu `:` đằng sau tên kênh */
                if (danhSáchThreadHoặcTopic === null) {
                  danhSáchNơiĐăng.push({
                    "Tên nơi đăng": tênKênh,
                    "Tên cộng đồng": tênMáyChủ,
                    "Loại nơi đăng": loạiNơiĐăng,
                    "Tên nền tảng": tênNềnTảng,
                    "Loại nền tảng": "Chat",
                  });

                  /** Trường hợp kênh có thread hoặc topic nhỏ hơn*/
                } else {
                  for (const threadHoặcTopic of danhSáchThreadHoặcTopic) {
                    danhSáchNơiĐăng.push({
                      "Tên nơi đăng": `${threadHoặcTopic} (${tênKênh})`,
                      "Tên cộng đồng": tênMáyChủ,
                      "Loại nơi đăng": loạiNơiĐăng,
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
  }
  function tạoDanhSáchNơiĐăngKhác() {
    for (
      const [loạiNơiĐăngKhác, danhSáchNơiĐăngKhác] of Object.entries(
        cấuHìnhNơiĐăng.Khác,
      ) as [LoạiNơiĐăngKhác, string[]][]
    ) {
      if (!danhSáchNơiĐăngKhác) continue;
      for (const tênNơiĐăngKhác of danhSáchNơiĐăngKhác) {
        danhSáchNơiĐăng.push({
          "Tên nơi đăng": tênNơiĐăngKhác,
          "Loại nơi đăng": loạiNơiĐăngKhác,
          "Tên nền tảng": loạiNơiĐăngKhác,
          "Loại nền tảng": "Khác",
        });
      }
    }
  }
}

// import { parse } from "$std/yaml/mod.ts";
// const cấuHìnhNơiĐăng = parse(Deno.readTextFileSync('./core/A. Cấu hình/Nơi đăng.yaml')) as CấuHìnhNơiĐăng
// const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng)
// console.log(JSON.stringify(danhSáchNơiĐăng, null, 2))
// console.log(JSON.stringify(danhSáchNơiĐăng[0], null, 2))
