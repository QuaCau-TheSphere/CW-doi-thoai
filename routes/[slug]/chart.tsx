import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DữLiệuTruyCậpCácNăm,
  VậtThểTiếpThị,
} from "../../utils/Kiểu cho web.ts";
import ReactECharts from "../../islands/Bi%E1%BB%83u%20%C4%91%E1%BB%93/echart.tsx";

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

export function chartOption(dữLiệuTruyCậpTừngNăm: DữLiệuTruyCậpCácNăm) {
  const data = [
    { datetime: "2024-01-31T00", hit: 1 },
    { datetime: "2024-01-31T01", hit: 4 },
    { datetime: "2024-01-31T02", hit: 3 },
    { datetime: "2024-01-31T05", hit: 1 },
    { datetime: "2024-01-31T06", hit: 4 },
    { datetime: "2024-01-31T10", hit: 3 },
    { datetime: "2024-01-31T20", hit: 1 },
    { datetime: "2024-01-31T23", hit: 3 },
  ];
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    dataset: {
      source: data,
      sourceHeader: false,
    },
    xAxis: { type: "time" },
    // xAxis: { type: "category" },
    yAxis: { gridIndex: 0 },
    dataZoom: [
      // {
      //     type: 'inside',
      //     start: 50,
      //     end: 100
      // },
      {
        show: true,
        type: "slider",
        top: "90%",
        start: 50,
        end: 100,
      },
    ],
    series: [
      {
        type: "line",
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
    ],
  };
}
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

  const chartData = chartOption(cácLầnTruyCập);
  return (
    <>
      <Head>
        <title>{đuôiRútGọn} Chart</title>
      </Head>
      {JSON.stringify(bàiĐăng, null, 2)}
      <div class="p-4 mx-auto max-w-screen-md">
        <ReactECharts
          option={chartData}
        />
      </div>
    </>
  );
}
