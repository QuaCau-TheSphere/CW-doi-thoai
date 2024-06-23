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
