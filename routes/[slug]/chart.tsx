import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { VậtThểTiếpThị } from "../../Code chạy trên client/Hàm và kiểu cho vật thể tiếp thị.ts";
import ReactECharts from "../../islands/Biểu đồ/echart.tsx";
import { dữLiệuTruyCậpCácNămTest } from "../../Code chạy trên client/Hàm cho biểu đồ.test.ts";
import { DữLiệuTruyCậpCácNăm, tạoDữLiệuBiểuĐồ } from "../../Code chạy trên client/Hàm và kiểu cho biểu đồ.ts";
import ThôngTinVậtThểTiếpThị from "../../components/Thông tin vật thể tiếp thị.tsx";
import HeadVàMeta from "../../components/Meta.tsx";
import { kvGet } from "../../Code chạy trên local, server, KV/Hàm cho KV.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const slug = ctx.params.slug;
    const đuôiRútGọn = decodeURIComponent(slug);
    console.log("Đuôi rút gọn được truy cập:", đuôiRútGọn);
    const key = ["Đuôi rút gọn", đuôiRútGọn];
    const serverGet = await kvGet(key, "GET hander trong chart.tsx");
    const vậtThểTiếpThị = serverGet.value as VậtThểTiếpThị;

    if (vậtThểTiếpThị) {
      return ctx.render({ vậtThểTiếpThị: vậtThểTiếpThị });
    } else {
      return ctx.renderNotFound();
    }
  },
};

export function chartOption(dữLiệuTruyCậpCácNăm: DữLiệuTruyCậpCácNăm) {
  const data = tạoDữLiệuBiểuĐồ(dữLiệuTruyCậpCácNăm).giờ; //todo;
  // const data = tạoDữLiệuBiểuĐồ(dữLiệuTruyCậpCácNămTest).giờ; //todo;
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    dataset: {
      source: data,
      sourceHeader: false,
    },
    xAxis: { type: "time" },
    yAxis: { gridIndex: 0 },
    dataZoom: [
      {
        show: true,
        type: "inside",
        start: 50,
        end: 100,
      },
      {
        show: true,
        type: "slider",
        // top: "90%",
        start: 0,
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

export default function ChartPage(props: PageProps<{ vậtThểTiếpThị: VậtThểTiếpThị }>) {
  const { vậtThểTiếpThị } = props.data;
  const {
    "Các lần truy cập": dữLiệuTruyCậpCácNăm,
    "Đuôi rút gọn": đuôiRútGọn,
  } = vậtThểTiếpThị;
  const chartData = chartOption(dữLiệuTruyCậpCácNăm);

  return (
    <>
      <HeadVàMeta title={`Lượt truy cập vào ${đuôiRútGọn}`} imageUrl="Linh Rab.jpg" />
      <main>
        <div class="p-4 mx-auto max-w-screen-md">
          <ReactECharts option={chartData} />
          <ThôngTinVậtThểTiếpThị vậtThểTiếpThị={vậtThểTiếpThị} />
        </div>
      </main>
    </>
  );
}
