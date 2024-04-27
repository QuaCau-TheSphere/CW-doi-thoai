type Hour =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | 23;
type Day =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | 31;
type Month =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | 12;
type Year =
  | "2024"
  | "2025"
  | "2026"
  | "2027"
  | "2028"
  | "2029"
  | "2030"
  | "2031"
  | "2032"
  | "2033"
  | "2034"
  | "2035"
  | "2036"
  | "2037"
  | "2038"
  | "2039"
  | "2040"
  | "2041"
  | "2042"
  | "2043"
  | "2044"
  | "2045"
  | "2046"
  | "2047"
  | "2048"
  | "2049"
  | "2050";

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type HourData = PartialRecord<Hour, Date[]>;
export type DayData = PartialRecord<Day, HourData>;
export type MonthData = PartialRecord<Month, DayData>;
export type YearData = PartialRecord<Year, MonthData>;

const h1: HourData = {
  "0": [new Date()],
  "13": [new Date(), new Date(), new Date(), new Date()],
  "23": [new Date(), new Date(), new Date()],
};
const d1: DayData = {
  "1": h1,
  // '31': h1
};
const m1: MonthData = {
  "1": d1,
  // '12': d1,
};
const yearData: YearData = {
  "2033": m1,
  // '2034': m1,
};

const rawData: DữLiệuĐồThị = {
  dữLiệu: [
    { datetime: new Date(), hit: 3 },
    { datetime: new Date((new Date()).getTime() + 18000000), hit: 45 },
    { datetime: new Date((new Date()).getTime() + 36000000), hit: 534 },
  ],
  đơnVị: "hour",
};

type Data = { date: Date; value: number }[];
type Unit = "hour" | "day" | "week" | "month" | "year";

function addTime(
  startDate: Date | string | number,
  quantity: number,
  unit: Unit,
) {
  let date: Date;
  typeof startDate === "string" || typeof startDate === "number"
    ? date = new Date(startDate)
    : date = startDate;
  switch (unit) {
    case "hour":
      return new Date(date.setHours(date.getHours() + quantity));
    case "day":
      return new Date(date.setDate(date.getDate() + quantity));
    case "week":
      return new Date(date.setDate(date.getDate() + 7 * quantity));
    case "month":
      return new Date(date.setMonth(date.getMonth() + quantity));
    case "year":
      return new Date(date.setFullYear(date.getFullYear() + quantity));
  }
}

export function addMissingData(data: Data, unit: Unit) {
  const result = [];
  const dates = data.map((i) => i.date.getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);

  let i = minDate;
  while (i <= maxDate) {
    if (dates.includes(i)) {
      const a = data.filter((j) => j.date.getTime() === i);
      console.assert(a.length === 1);
      result.push(a[0]);
    } else {
      result.push({
        date: new Date(i),
        hit: 0,
      });
    }
    i = addTime(i, 1, unit).getTime();
  }
  return result;
}
