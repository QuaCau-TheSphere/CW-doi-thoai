import { NơiĐăngCóCácLựaChọnVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.ts";
import { BàiĐăng } from "../core/Code hỗ trợ/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { lấyCấuHìnhViếtTắt } from "../core/Code hỗ trợ/Hàm và kiểu cho cấu hình.ts";
import Main from "../islands/Main.tsx";

export default async function App() {
  const kv = await Deno.openKv();

  const danhSáchEntryBàiĐăngTrênKv = await Array.fromAsync(kv.list({ prefix: ["Bài đăng"] })) as Deno.KvEntry<BàiĐăng>[];
  const danhSáchBàiĐăng = danhSáchEntryBàiĐăngTrênKv.map((entry) => entry.value);

  const danhSáchEntryNơiĐăngTrênKv = await Array.fromAsync(kv.list({ prefix: ["Nơi đăng"] })) as Deno.KvEntry<NơiĐăngCóCácLựaChọnVịTrí>[];
  const danhSáchNơiĐăng = danhSáchEntryNơiĐăngTrênKv.map((entry) => entry.value);

  const textTrangChủ = await Deno.readTextFile("docs/Trang chủ.md");
  return (
    <body class="">
      <Main
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
        cấuHìnhViếtTắt={lấyCấuHìnhViếtTắt()}
        textTrangChủ={textTrangChủ}
      />
    </body>
  );
}
