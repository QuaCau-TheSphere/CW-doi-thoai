import { lấyTênMiềnCấpNhỏ, MetaTagUrlVàDocument } from "../Hàm và kiểu cho dữ liệu meta.ts";

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
  const username = lấyTênMiềnCấpNhỏ(hostname);
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
