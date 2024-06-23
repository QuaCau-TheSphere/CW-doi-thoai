import { MetaTagUrlVàDocument } from "../Hàm cho việc tạo bài đăng hoặc nơi đăng từ URL.ts";

export interface MáyChủDiscord {
  tên: string | undefined;
}
export function thôngTinUrlDiscord({ document }: MetaTagUrlVàDocument): { "Máy chủ"?: MáyChủDiscord } {
  return {
    "Máy chủ": {
      tên: document.querySelector("title")?.textContent,
    },
  };
}
