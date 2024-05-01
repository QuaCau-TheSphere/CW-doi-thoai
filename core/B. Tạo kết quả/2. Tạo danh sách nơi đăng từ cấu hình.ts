import CấuHìnhNơiĐăng, {
  danhSáchLoạiNơiĐăngKhác,
  LoạiNơiĐăngChat,
  LoạiNơiĐăngDiễnĐàn,
  MáyChủ,
  NơiĐăng,
  TênNềnTảngChat,
  VậtThểNơiĐăngChat,
} from "../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";

/**
 * Lấy dữ liệu từ `Nơi đăng.yaml`
 */
export default function tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng: CấuHìnhNơiĐăng) {
  const danhSáchNơiĐăng: NơiĐăng[] = [];

  tạoDanhSáchDiễnĐàn();
  tạoDanhSáchChat();
  tạoDanhSáchKhác();
  return danhSáchNơiĐăng;

  function tạoDanhSáchDiễnĐàn() {
    const cấuHìnhNơiĐăngDiễnĐàn = cấuHìnhNơiĐăng["Diễn đàn"];
    if (!cấuHìnhNơiĐăngDiễnĐàn) return;
    for (
      const [tênDiễnĐàn, vậtThểLàmGiáTrịChoTênDiễnĐàn] of Object.entries(
        cấuHìnhNơiĐăngDiễnĐàn,
      ) as [TênDiễnĐàn, VậtThểLàmGiáTrịChoTênDiễnĐàn][]
    ) {
      if (!vậtThểLàmGiáTrịChoTênDiễnĐàn) continue;
      for (
        const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(
          vậtThểLàmGiáTrịChoTênDiễnĐàn,
        ) as [LoạiNơiĐăngDiễnĐàn, string[]][]
      ) {
        if (!danhSáchTênNơiĐăng) continue;
        for (const tênNơiĐăng of danhSáchTênNơiĐăng) {
          danhSáchNơiĐăng.push({
            "Tên nơi đăng": tênNơiĐăng,
            "Loại nơi đăng": loạiNơiĐăng,
            "Tên nền tảng": tênDiễnĐàn,
            "Loại nền tảng": "Diễn đàn",
            "Tên cộng đồng": tênNơiĐăng, //todo
          });
        }
      }
    }
  }
  function tạoDanhSáchChat() {
    const cấuHìnhNơiĐăngChat = cấuHìnhNơiĐăng.Chat;
    if (!cấuHìnhNơiĐăngChat) return;

    for (
      const [tênNềnTảng, vậtThểNơiĐăng] of Object.entries(
        cấuHìnhNơiĐăngChat,
      ) as [TênNềnTảngChat, VậtThểNơiĐăngChat][]
    ) {
      if (!vậtThểNơiĐăng) continue;
      lấyNơiĐăngTừMessengerDiscordTelegram();

      /** Nền tảng chat khác */
      lấyNơiĐăngTừNềnTảngChatKhác(vậtThểNơiĐăng, tênNềnTảng);
    }

    function lấyNơiĐăngTừNềnTảngChatKhác(
      vậtThểNơiĐăng: VậtThểNơiĐăngChat,
      tênNềnTảng: string,
    ) {
      for (
        const [loạiNơiĐăng, danhSáchTênNơiĐăng] of Object.entries(
          vậtThểNơiĐăng,
        ) as [LoạiNơiĐăngChat, string[]][]
      ) {
        /** Loại hết cộng đồng chat để chỉ còn giữ danh sách cá nhân hoặc nhóm */
        if (
          tênNềnTảng === "Discord" && loạiNơiĐăng === "Máy chủ" ||
          tênNềnTảng === "Messenger" && loạiNơiĐăng === "Cộng đồng" ||
          tênNềnTảng === "Telegram" && loạiNơiĐăng === "Nhóm" ||
          !danhSáchTênNơiĐăng
        ) continue;

        for (const tênNơiĐăng of danhSáchTênNơiĐăng) {
          danhSáchNơiĐăng.push({
            "Tên nơi đăng": tênNơiĐăng,
            "Loại nơi đăng": loạiNơiĐăng,
            "Tên nền tảng": tênNềnTảng,
            "Loại nền tảng": "Chat",
            "Tên cộng đồng": tênNơiĐăng,
          });
        }
      }
    }

    /**
     * Cấu trúc của cộng đồng Messenger, Discord, Telegram có dạng:
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
     * Về mặt phân cấp thì Messenger và Discord là như nhau. Chỉ khác nhau ở cái tên. Không gom chung lại thành cùng một tên biến để sau này debug cho dễ, đỡ phải đặt ra một tên biến tổng quát và phải nhớ là nó có nghĩa là gì
     * | Discord                    | Messenger      | Telegram |
     * | -------------------------- | -------------- | -------- |
     * | Server                     | Community      | Group    |
     * | Text Channel/Forum Channel | Community Chat | Topic    |
     * | Channel Thread/Forum Post  | Sidechat       | ❌       |
     */

    function lấyNơiĐăngTừMessengerDiscordTelegram() {
      if (!cấuHìnhNơiĐăngChat) return;
      for (const tênNềnTảng of ["Messenger", "Discord", "Telegram"] as const) {
        if (!cấuHìnhNơiĐăngChat[tênNềnTảng]) continue;
        const loạiNơiĐăng = lấyLoạiNơiĐăng(tênNềnTảng);
        // @ts-ignore:
        const danhSáchMáyChủ = cấuHìnhNơiĐăngChat[tênNềnTảng][loạiNơiĐăng];
        if (!danhSáchMáyChủ) continue;

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
                  const [tênKênh, danhSáchThreadHoặcTopic] of Object.entries(
                    kênh,
                  )
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
      function lấyLoạiNơiĐăng(
        tênNềnTảng: "Messenger" | "Discord" | "Telegram",
      ) {
        switch (tênNềnTảng) {
          case "Discord":
            return "Máy chủ";
          case "Telegram":
            return "Nhóm";
          case "Messenger":
          default:
            return "Cộng đồng";
        }
      }
    }
  }
  function tạoDanhSáchKhác() {
    for (const loạiNơiĐăngKhác of danhSáchLoạiNơiĐăngKhác) {
      const cấuHìnhLoạiNơiĐăngKhác = cấuHìnhNơiĐăng[loạiNơiĐăngKhác];
      if (!cấuHìnhLoạiNơiĐăngKhác) continue;
      for (const tênNơiĐăngKhác of Object.values(cấuHìnhLoạiNơiĐăngKhác)) {
        danhSáchNơiĐăng.push({
          "Tên nơi đăng": tênNơiĐăngKhác,
          "Loại nơi đăng": loạiNơiĐăngKhác,
          "Tên nền tảng": loạiNơiĐăngKhác,
          "Loại nền tảng": loạiNơiĐăngKhác,
        });
      }
    }
  }
}

import { parse } from "$std/yaml/mod.ts";
import { TênDiễnĐàn } from "../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { VậtThểLàmGiáTrịChoTênDiễnĐàn } from "../Code hỗ trợ/Kiểu cho nơi đăng.ts";
import { join } from "$std/path/join.ts";

const folder = "./core/A. Cấu hình/Nơi đăng";
for (const file of Deno.readDirSync(folder)) {
  if (!file.isFile) continue;
  const đơnVịQuảnLý = file.name;
  const fullPath = join(folder, file.name);
  const cấuHìnhNơiĐăng = parse(
    Deno.readTextFileSync(fullPath),
  ) as CấuHìnhNơiĐăng;
  const danhSáchNơiĐăng = tạoDanhSáchNơiĐăng(cấuHìnhNơiĐăng);
  console.log(JSON.stringify(danhSáchNơiĐăng, null, 2));

  const a = danhSáchNơiĐăng.filter((i) => i["Tên nền tảng"] === "GitHub");
  console.log(JSON.stringify(a, null, 2));
}
