// deno-fmt-ignore-file
import type { IntRange } from "https://deno.land/x/fest@4.13.2";

type Hour = IntRange<0, 23>;
type Day = IntRange<1, 31>;
type Month = IntRange<1, 12>;
type Year = IntRange<2024, 2050>;

export type HourData = Record<Hour, Date[]>;
export type DayData = Record<Day, HourData>;
export type MonthData = Record<Month, DayData>;
export type YearData = Record<Year, MonthData>;

const h1: HourData = {
  0: [new Date()],
  13: [new Date(), new Date(), new Date(), new Date()],
  23: [new Date(), new Date(), new Date()],
};
const d1: DayData = {
  1: h1,
  31: h1
} 
const m1: MonthData = {
  1: d1,
  12: d1,
};
const data: YearData = {
  2033: m1,
  2034: m1,
};
function addLeadingZero(number: number | string): string{
  if (Number(number) < 10) return `0${number}`
  return number.toString()
} 
let chartData = [] 
for (const [year, monthData] of Object.entries(data)) {
  for (const [month, dayData] of Object.entries(monthData)) {
    for (const [day, hourData]  of Object.entries(dayData)) {
      for (const [hour, hitsEachHour] of Object.entries(hourData)) {
        chartData.push({
          x: `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}T${addLeadingZero(hour)}:59:00.000+07:00`,
          y: hitsEachHour.length
        })
        // for (const hit of hitsEachHour) {
        // } 
      }
    }
  }
}
console.log(chartData)
