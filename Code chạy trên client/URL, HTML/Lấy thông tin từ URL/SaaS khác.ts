import { kiểuKebab, viếtHoa } from "../../Chuỗi, slug/Hàm xử lý chuỗi.ts";
import { lấySubdomain, MetaTagUrlVàDocument } from "../Hàm cho việc tạo bài đăng hoặc nơi đăng từ URL.ts";

export interface CơSởDữLiệuNotion {
  tên: string;
  username: string;
  slug: string;
}
export interface WorkspaceNotion {
  username: string;
}
interface Notion {
  "Cơ sở dữ liệu"?: CơSởDữLiệuNotion;
  "Workspace"?: WorkspaceNotion;
}
export function thôngTinUrlNotion({ url }: MetaTagUrlVàDocument): Notion {
  const { pathname, hostname } = url;
  const username = lấySubdomain(hostname);
  const temp = pathname.slice(1).split("-");
  temp.pop();
  const tênCơSởDữLiệu = temp.join(" ");
  if (tênCơSởDữLiệu) {
    return {
      "Cơ sở dữ liệu": {
        tên: tênCơSởDữLiệu,
        username: username,
        slug: temp.join("-"),
      },
    };
  }
  return {
    "Workspace": {
      username: username,
    },
  };
}

interface GoogleBase {
  tiêuĐề: string;
  môTả: string;
  slug: string;
}
type Google = Record<string, GoogleBase | Record<string | number | symbol, never>>;
export function thôngTinUrlGoogle({ url, meta }: MetaTagUrlVàDocument): Google {
  const { pathname } = url;
  if (!meta.og) {
    return {
      File: {},
    };
  }

  const { title, description } = meta.og;
  const googleBase: GoogleBase = {
    tiêuĐề: title!,
    môTả: description!,
    slug: kiểuKebab(title),
  };

  const service = viếtHoa(pathname.split("/")[1]);
  return { [service]: googleBase };
}
