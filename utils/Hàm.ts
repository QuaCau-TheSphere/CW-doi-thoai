import { TênDanhSách } from "./Kiểu cho web.ts";

export function viếtHoa(tênDanhSách: TênDanhSách) {
  return tênDanhSách.replace(/^(.)/g, (x) => x.toUpperCase());
}

export function kebabCase(tênDanhSách: TênDanhSách) {
  return tênDanhSách.replace(" ", "-");
}
