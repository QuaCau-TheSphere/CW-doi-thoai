import { Head } from "$fresh/runtime.ts";
import { ChartColors } from "$fresh_charts/utils.ts";
import Chart from "../../islands/chart.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DữLiệuTruyCậpTừngNăm,
  VậtThểTiếpThị,
} from "../../utils/Kiểu cho web.ts";

const kv = await Deno.openKv();
export const handler: Handlers = {
  async GET(req, ctx) {
    const đuôiRútGọn = ctx.params.slug;
    const serverGet = await kv.get(["Đuôi rút gọn", đuôiRútGọn]);
    const vậtThểTiếpThị = serverGet.value as VậtThểTiếpThị;

    if (vậtThểTiếpThị) {
      return ctx.render({ vậtThểTiếpThị: vậtThểTiếpThị });
    } else {
      return ctx.renderNotFound();
    }
  },
};
const data = [
  { x: Date.parse("2016-12-26"), y: 20 },
  { x: Date.parse("2017-12-26"), y: 20 },
  { x: Date.parse("2020-12-26"), y: 20 },
  { x: Date.parse("2024-12-26"), y: 20 },
];
export default function ChartPage(
  props: PageProps<{ vậtThểTiếpThị: VậtThểTiếpThị }>,
) {
  const { vậtThểTiếpThị } = props.data;
  const {
    "Bài đăng": bàiĐăng,
    "Nơi đăng": nơiĐăng,
    "Tham số UTM": thamSốUTM,
    "Thời điểm tạo": thờiĐiểmTạo,
    "Các lần truy cập": cácLầnTruyCập,
    "Đuôi rút gọn": đuôiRútGọn,
  } = vậtThểTiếpThị;

  // const danhSáchĐiểmTrụcHoành = cácLầnTruyCập[0][]
  return (
    <>
      <Head>
        <title>{đuôiRútGọn} Chart</title>
      </Head>
      {JSON.stringify(bàiĐăng, null, 2)}
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart
          type="line"
          options={{
            scales: {
              x: {
                type: "time",
                // time: {
                //   "unit": "year",
                // },
                // displayFormats: {
                //   "year": "YYYY",
                // },
              },
              y: { beginAtZero: true },
            },
          }}
          data={{
            datasets: [
              {
                label: "Users",
                data: data,
                borderColor: ChartColors.Blue,
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </>
  );
}
