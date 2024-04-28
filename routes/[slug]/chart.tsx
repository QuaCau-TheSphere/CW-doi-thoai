import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  DữLiệuTruyCậpCácNăm,
  VậtThểTiếpThị,
} from "../../utils/Kiểu cho web.ts";
import ReactECharts from "../../islands/Bi%E1%BB%83u%20%C4%91%E1%BB%93/echart.tsx";
import { dữLiệuTruyCậpCácNămTest } from "../../utils/Hàm cho biểu đồ.test.ts";
import { tạoDữLiệuBiểuĐồ } from "../../utils/H%C3%A0m%20cho%20bi%E1%BB%83u%20%C4%91%E1%BB%93.ts";
import KếtQuảĐượcChọn from "../../components/Kết quả được chọn.tsx";

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

export function chartOption(dữLiệuTruyCậpCácNăm: DữLiệuTruyCậpCácNăm) {
  // const data = tạoDữLiệuBiểuĐồ(dữLiệuTruyCậpCácNăm).giờ; //todo;
  const data = tạoDữLiệuBiểuĐồ(dữLiệuTruyCậpCácNămTest).giờ; //todo;
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
function lấyGiờVN(date: Date) {
  console.log(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(date.toJSON());
  // const ngày = date.toLocaleDateString("vi-VN", options);
  // const giờ = date.toLocaleTimeString("vi-VN");
  // return `${ngày} ${giờ}`;
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
    "Các lần truy cập": dữLiệuTruyCậpCácNăm,
    "Đuôi rút gọn": đuôiRútGọn,
  } = vậtThểTiếpThị;

  const chartData = chartOption(dữLiệuTruyCậpCácNăm);
  const khác = {
    "Thời điểm tạo": lấyGiờVN(thờiĐiểmTạo),
    "Đuôi rút gọn": đuôiRútGọn,
  };
  return (
    <>
      <Head>
        <title>Biểu đồ cho {đuôiRútGọn}</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <ReactECharts
          option={chartData}
        />
        <div class="grid grid-cols-2 gap-4">
          <KếtQuảĐượcChọn mụcĐượcChọn={bàiĐăng} tênDanhSách="bài đăng" />
          <KếtQuảĐượcChọn mụcĐượcChọn={nơiĐăng} tênDanhSách="nơi đăng" />
          <KếtQuảĐượcChọn mụcĐượcChọn={thamSốUTM} tênDanhSách="tham số UTM" />
          <KếtQuảĐượcChọn mụcĐượcChọn={khác} tênDanhSách="thông tin khác" />
        </div>
      </div>
    </>
  );
}
