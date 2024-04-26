import { useEffect, useRef } from "preact/hooks";
import { CSSProperties, JSX } from "preact";
import type {
  ECharts,
  EChartsOption,
  SetOptionOpts,
} from "https://esm.sh/echarts@5.4.3/dist/echarts.min.js?target=es2022";
import {
  getInstanceByDom,
  init,
} from "https://esm.sh/echarts@5.4.3/dist/echarts.min.js?target=es2022";
// import { initThemes } from "./theme.tsx";

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

export default function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  // Initialize themes (optional)
  //   initThemes();

  // Create a reference to the chart container
  const chartRef = useRef<HTMLDivElement>(null);

  // Use useEffect to handle chart initialization and updates
  useEffect(() => {
    // Initialize the chart
    let chart: ECharts | undefined;
    if (chartRef?.current !== null) {
      chart = init(chartRef.current, theme, {
        renderer: "svg",
      });
    }

    // Add chart resize listener
    function resizeChart() {
      chart?.resize();
    }

    globalThis.addEventListener("resize", resizeChart);

    // Cleanup function
    return () => {
      chart?.dispose();
      globalThis.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const echartInstance = getInstanceByDom(chartRef.current);
      echartInstance?.setOption(option, settings);
    }
  }, [option, settings, theme]);

  useEffect(() => {
    if (chartRef.current !== null) {
      const echartInstance = getInstanceByDom(chartRef.current);
      loading === true
        ? echartInstance?.showLoading()
        : echartInstance?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "100px", ...style }} />
  );
}
