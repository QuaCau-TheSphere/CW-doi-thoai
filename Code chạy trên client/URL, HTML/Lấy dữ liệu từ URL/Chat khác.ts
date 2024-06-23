import { MetaTagUrlVàDocument } from "../Hàm và kiểu cho dữ liệu meta.ts";

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
