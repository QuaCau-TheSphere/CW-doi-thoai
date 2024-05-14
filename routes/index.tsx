// deno-fmt-ignore-file
import { parse } from "$std/yaml/mod.ts";
import tạoDanhSáchNơiĐăngCXĐVT from "../core/B. Tạo kết quả/2. Tạo danh sách nơi đăng từ cấu hình/mod.ts";
import { NơiĐăngChưaXácĐịnhVịTrí } from "../core/Code hỗ trợ/Hàm và kiểu cho vị trí.tsx";
import { BàiĐăng } from "../core/Code hỗ trợ/Kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import CấuHìnhNơiĐăng from "../core/Code hỗ trợ/Kiểu cho nơi đăng.ts";
import Main from "../islands/Main.tsx";

export default async function App() {
  const kv = await Deno.openKv();

  const iterBàiĐăng = kv.list({ prefix: ["Bài đăng"] });
  const danhSáchBàiĐăngNgườiDùngTạoThêm: BàiĐăng[] = [];
  for await (const res of iterBàiĐăng) {danhSáchBàiĐăngNgườiDùngTạoThêm.push(res.value as BàiĐăng)}
  const danhSáchBàiĐăngLấyTừVault = JSON.parse(await Deno.readTextFile("core/A. Cấu hình/Danh sách tất cả bài đăng.json")) as BàiĐăng[];
  const danhSáchBàiĐăng = [...danhSáchBàiĐăngLấyTừVault, ...danhSáchBàiĐăngNgườiDùngTạoThêm];

  const iterNơiĐăng = kv.list({ prefix: ["Nơi đăng"] });
  const danhSáchNơiĐăngNgườiDùngTạoThêm: NơiĐăngChưaXácĐịnhVịTrí[] = [];
  for await (const res of iterNơiĐăng) {danhSáchNơiĐăngNgườiDùngTạoThêm.push(res.value as NơiĐăngChưaXácĐịnhVịTrí)}
  const cấuHìnhNơiĐăng = parse(await Deno.readTextFile("core/A. Cấu hình/Nơi đăng/Quả Cầu.yaml")) as CấuHìnhNơiĐăng;
  const danhSáchNơiĐăngCXĐVT = tạoDanhSáchNơiĐăngCXĐVT(cấuHìnhNơiĐăng) as NơiĐăngChưaXácĐịnhVịTrí[];
  const danhSáchNơiĐăng = [...danhSáchNơiĐăngCXĐVT, ...danhSáchNơiĐăngNgườiDùngTạoThêm];

  const textTrangChủ = Deno.readTextFileSync("docs/Trang chủ.md");

  return (
    <body class="bg-base-100">
      <Main
        danhSáchBàiĐăng={danhSáchBàiĐăng}
        danhSáchNơiĐăng={danhSáchNơiĐăng}
        cấuHìnhNơiĐăngProp={cấuHìnhNơiĐăng}
        textTrangChủ={textTrangChủ} 
      />
    </body>
  );
}
