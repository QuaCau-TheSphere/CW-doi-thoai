// deno-fmt-ignore-file
import { assert } from "$std/assert/assert.ts";
type ĐơnVị = 'hour'|'day'|'week'|'month'|'year'
type DữLiệuĐồThị = {
  đơnVị: ĐơnVị
  dữLiệu: {datetime: Date, hit: number}[] 
} 

function addLeadingZero(number: number | string): string{
  if (Number(number) < 10) return `0${number}`
  return number.toString()
} 

function byHour(): DữLiệuĐồThị {
  const dữLiệu: {datetime: Date, hit: number}[] = [] 
  for (const [year, monthData] of Object.entries(yearData) as [Year, MonthData][]) {
    for (const [month, dayData] of Object.entries(monthData) as [Month, DayData][]) {
      for (const [day, hourData] of Object.entries(dayData) as [Day, HourData][]) {
        for (const [hour, hitsEachHour] of Object.entries(hourData) as [Hour, Date[]][] ) {
          const dateString = Date.parse(`${year}-${addLeadingZero(month)}-${addLeadingZero(day)}T${addLeadingZero(hour)}:59:59.999+07:00`) 
          dữLiệu.push({
            datetime: new Date(dateString),
            hit: hitsEachHour.length
          })
        }
      }
    }
  }
  return {đơnVị: 'hour', dữLiệu: dữLiệu} 
} 

function thêmThờiGian(startDate: Date|string|number, sốLượng: number, đơnVị: ĐơnVị) {
  let date: Date
  typeof startDate === 'string' || typeof startDate === 'number' ? date = new Date(startDate) : date = startDate
  switch (đơnVị) {
    case "hour":
      return new Date(date.setHours(date.getHours() + sốLượng));
    case "day":
      return new Date(date.setDate(date.getDate() + sốLượng));
    case "week":
      return new Date(date.setDate(date.getDate() + 7 * sốLượng));
    case "month":
      return new Date(date.setMonth(date.getMonth() + sốLượng));
    case "year":
      return new Date(date.setFullYear(date.getFullYear() + sốLượng));
  }
}

/**
 * Fills missing hours in a series of date-hit entries.
 *
 * Example input:
 * ```js
 * const rawData = [
 *   {datetime: 3, hit: 3},
 *   {datetime: 5, hit: 9},
 *   {datetime: 10, hit: 5},
 * ]
 * ```
 * Example output:
 * ```js
 * const processedData = [
 *   { datetime: 3, hit: 3 },
 *   { datetime: 4, hit: 0 },
 *   { datetime: 5, hit: 9 },
 *   { datetime: 6, hit: 0 },
 *   { datetime: 7, hit: 0 },
 *   { datetime: 8, hit: 0 },
 *   { datetime: 9, hit: 0 },
 *   { datetime: 10, hit: 5 }
 * ]
 * ```
 * [Fill missing data in between available data with default value](https://codereview.stackexchange.com/q/291782/255326)
 */
export function điềnDữLiệuTrống({ đơnVị, dữLiệu }: DữLiệuĐồThị): DữLiệuĐồThị {
  const result = [];
  const danhSáchDate = dữLiệu.map((i) => i.datetime.getTime());
  const minDate = Math.min(...danhSáchDate)
  const maxDate = Math.max(...danhSáchDate)

  let i = minDate
  while (i <= maxDate) {
    if (danhSáchDate.includes(i)) {
      const a = dữLiệu.filter((j) => j.datetime.getTime() === i);
      assert(a.length === 1);
      result.push(a[0])
    } else {
      result.push({
        datetime: new Date(i),
        hit: 0,
      });
    }
    i = thêmThờiGian(i, 1, đơnVị).getTime()
  }
  return { đơnVị: đơnVị, dữLiệu: result };
}