//deno-fmt-ignore-file
import { NơiĐăngCóCácLựaChọnVịTrí } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { BàiĐăng } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { lấyCấuHìnhChung } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho cấu hình.ts";
import Main from "../islands/Main.tsx";
import { kvList } from "../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm cho KV.ts";

export default async function App() {
  console.info("%cChương trình được khởi động", "color: green; font-style: italic")
  const danhSáchEntryBàiĐăngVàNơiĐăngTrênKv = await kvList({ start: ["A"], end: ["O"] }, 'index.tsx') as Deno.KvEntry<BàiĐăng|NơiĐăngCóCácLựaChọnVịTrí>[];
  const danhSáchBàiĐăng = danhSáchEntryBàiĐăngVàNơiĐăngTrênKv.filter((entry) => entry.key[0] === 'Bài đăng').map((entry) => entry.value) as BàiĐăng[] 
  const danhSáchNơiĐăng = danhSáchEntryBàiĐăngVàNơiĐăngTrênKv.filter((entry) => entry.key[0] === 'Nơi đăng').map((entry) => entry.value) as NơiĐăngCóCácLựaChọnVịTrí[] 
  const textTrangChủ = await Deno.readTextFile("docs/Trang chủ.md");
  
  return (
    <body class="">
      <Main
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
        cấuHìnhChung={lấyCấuHìnhChung()}
        textTrangChủ={textTrangChủ}
      />
    </body>
  );
}
