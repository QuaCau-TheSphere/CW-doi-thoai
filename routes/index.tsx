import Main, { DanhSáchBàiĐăngVàNơiĐăng } from "../islands/Main.tsx";
import { NơiĐăngCóCácLựaChọnVịTrí } from "../Code chạy trên client/Hàm và kiểu cho vị trí.ts";
import { BàiĐăng } from "../Code chạy trên local, server, KV/Bài đăng/Hàm và kiểu cho vault, dự án, bài đăng.ts";
import { lấyCấuHìnhChung, tạoDanhSáchThôngTinCấuHìnhNơiĐăng, đọcJSON } from "../Code chạy trên local, server, KV/Hàm và kiểu cho cấu hình.ts";
import { kvList } from "../Code chạy trên local, server, KV/Hàm cho KV.ts";
import {
  cậpNhậtSốLượngBàiĐăng,
  cậpNhậtSốLượngNơiĐăng,
  lấySốLượngDữLiệu,
  SốLượngBàiĐăng,
  SốLượngNơiĐăng,
} from "../Code chạy trên local, server, KV/Hàm và kiểu cho id và số lượng dữ liệu.ts";
import { TẬP_TIN_DANH_SÁCH_BÀI_ĐĂNG, TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG } from "../Code chạy trên local, server, KV/ĐƯỜNG_DẪN.ts";
import HeadVàMeta from "../components/Meta.tsx";

async function cậpNhậtSốLượngDữLiệu({ dsBàiĐăng, dsNơiĐăng }: DanhSáchBàiĐăngVàNơiĐăng) {
  const phânLoạiBàiĐăng = Object.groupBy(dsBàiĐăng, ({ "Phương thức tạo": phươngThứcTạo }) => phươngThứcTạo);
  const sốLượngBàiĐăng = Object.fromEntries(Object.entries(phânLoạiBàiĐăng).map(([k, v]) => [k, v.length])) as SốLượngBàiĐăng;
  console.log("Số lượng bài đăng:", sốLượngBàiĐăng);
  await cậpNhậtSốLượngBàiĐăng(sốLượngBàiĐăng);

  const phânLoạiNơiĐăng = Object.groupBy(dsNơiĐăng, ({ "Phương thức tạo": phươngThứcTạo }) => phươngThứcTạo);
  const sốLượngNơiĐăng = Object.fromEntries(Object.entries(phânLoạiNơiĐăng).map(([k, v]) => [k, v.length])) as SốLượngNơiĐăng;
  console.log("Số lượng nơi đăng:", sốLượngNơiĐăng);
  await cậpNhậtSốLượngNơiĐăng(sốLượngNơiĐăng);

  const sốLượngĐuôiRútGọn = await lấySốLượngDữLiệu("Đuôi rút gọn");
  console.log("Số lượng đuôi rút gọn:", sốLượngĐuôiRútGọn);
}

async function tạoDanhSáchBàiĐăngVàNơiĐăng() {
  const dsTrênKv = await kvList({ start: ["A"], end: ["O"] }) as Deno.KvEntry<BàiĐăng | NơiĐăngCóCácLựaChọnVịTrí>[];
  const dsBàiĐăngTrênKv = dsTrênKv.filter((entry) => entry.key[0] === "Bài đăng").map((entry) => entry.value) as BàiĐăng[];
  const dsNơiĐăngTrênKv = dsTrênKv.filter((entry) => entry.key[0] === "Nơi đăng").map((entry) => entry.value) as NơiĐăngCóCácLựaChọnVịTrí[];

  const dsBàiĐăngTừJSON = await đọcJSON(TẬP_TIN_DANH_SÁCH_BÀI_ĐĂNG) as BàiĐăng[];
  const dsNơiĐăngTừJSON = await đọcJSON(TẬP_TIN_DANH_SÁCH_NƠI_ĐĂNG) as NơiĐăngCóCácLựaChọnVịTrí[];

  const dsBàiĐăng = [...dsBàiĐăngTừJSON, ...dsBàiĐăngTrênKv];
  const dsNơiĐăng = [...dsNơiĐăngTừJSON, ...dsNơiĐăngTrênKv];
  return { dsBàiĐăng, dsNơiĐăng };
}

export default async function App() {
  console.info("%cChương trình được khởi động", "color: green; font-style: italic");
  const dsBàiĐăngVàNơiĐăng = await tạoDanhSáchBàiĐăngVàNơiĐăng();
  await cậpNhậtSốLượngDữLiệu(dsBàiĐăngVàNơiĐăng);
  const textTrangChủ = await Deno.readTextFile("docs/Trang chủ.html");
  // const textTrangChủ = await Deno.readTextFile("docs/Trang chủ.md");

  return (
    <>
      <HeadVàMeta imageUrl="Linh Rab.jpg" />
      <body class="">
        <Main
          dsBàiĐăngVàNơiĐăng={dsBàiĐăngVàNơiĐăng}
          danhSáchThôngTinCấuHìnhNơiĐăng={await tạoDanhSáchThôngTinCấuHìnhNơiĐăng()}
          cấuHìnhChung={lấyCấuHìnhChung()}
          textTrangChủ={textTrangChủ}
        />
      </body>
    </>
  );
}
