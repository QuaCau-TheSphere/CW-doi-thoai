import { useEffect, useState } from "preact/hooks";
import { BàiĐăngChưaCóId } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho đường dẫn, vault, bài đăng, dự án.ts";
import { queryBàiĐăng } from "../Tìm bài đăng hoặc nơi đăng/Signal tìm bài đăng hoặc nơi đăng.ts";
import { PhảnHồiTừCORSProxy } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";

/** Các dữ liệu người dùng nhập trong form */
export default function ModalBàiĐăng() {
  const [bàiĐăng, setBàiĐăng] = useState<BàiĐăngChưaCóId | undefined>();
  /**
   * Các state dưới đây cần để kiểu là string vì chúng là do người dùng nhập vào
   * Cái nào không có undefined nghĩa là cái đó bắt buộc phải có
   */
  const [url, setUrl] = useState(queryBàiĐăng.value);
  const [tiêuĐề, setTiêuĐề] = useState("");
  const [slug, setSlug] = useState<string | undefined>();
  const [môTảBàiĐăng, setMôTảBàiĐăng] = useState<string | undefined>();
  const [tênDựÁn, setTênDựÁn] = useState<string | undefined>();

  useEffect(() => {
    setUrl(url);
    async function lấyThôngTinTừUrl() {
      try {
        new URL(url);
      } catch {
        return;
      }
      const corsProxyUrl = `${origin}/api/cors-proxy/${url}`;
      const phảnHồiTừCORSProxy = await (await fetch(corsProxyUrl)).json() as PhảnHồiTừCORSProxy;
      console.log("Kết quả lấy dữ liệu từ URL được nhập vào bài đăng:", phảnHồiTừCORSProxy);
      setBàiĐăng(phảnHồiTừCORSProxy?.["Nếu là bài đăng"]);
    }
    lấyThôngTinTừUrl();
  }, [url]);

  useEffect(() => {
    setBàiĐăng({
      ...bàiĐăng as BàiĐăngChưaCóId,
      "Tiêu đề": tiêuĐề,
      "Nội dung bài đăng": {
        "Mô tả bài đăng": môTảBàiĐăng,
      },
      "Dự án": {
        "Tên dự án": tênDựÁn,
      },
      Slug: slug,
    });
  }, [tiêuĐề, môTảBàiĐăng, tênDựÁn, slug]);

  useEffect(() => {
    const {
      URL: url,
      "Tiêu đề": tiêuĐề,
      "Nội dung bài đăng": nộiDungBàiĐăng,
      "Dự án": dựÁn,
      Slug: slug,
    } = bàiĐăng || {};
    setUrl(url as string);
    setTiêuĐề(tiêuĐề || "");
    setMôTảBàiĐăng(nộiDungBàiĐăng?.["Mô tả bài đăng"] || undefined);
    setTênDựÁn(dựÁn?.["Tên dự án"]);
    setSlug(slug);
  }, [bàiĐăng]);

  return (
    <>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">URL</span>
        </div>
        <input
          class="input input-bordered w-full max-w-xs"
          id="URL"
          type="url"
          name="URL"
          required
          value={url}
          onInput={(e: InputEvent) => setUrl((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tiêu đề</span>
        </div>
        <input
          class="input input-bordered w-full max-w-xs"
          id="tiêu-đề"
          type="text"
          required
          name="Tiêu đề"
          value={tiêuĐề}
          onInput={(e: InputEvent) => setTiêuĐề((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Slug</span>
        </div>
        <input
          class="input input-bordered w-full max-w-xs"
          id="slug"
          type="text"
          name="Slug"
          value={slug}
          onInput={(e: InputEvent) => setSlug((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Mô tả bài đăng</span>
        </div>
        <input
          class="input input-bordered w-full max-w-xs"
          id="mô-tả"
          type="text"
          name="Mô tả bài đăng"
          value={môTảBàiĐăng}
          onInput={(e: InputEvent) => setMôTảBàiĐăng((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tên dự án</span>
        </div>
        <input
          class="input input-bordered w-full max-w-xs"
          id="tên-dự-án"
          type="text"
          name="Tên dự án"
          placeholder="Dự án hoặc chiến dịch của việc đăng bài này"
          value={tênDựÁn || ""}
          onInput={(e: InputEvent) => setTênDựÁn((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <details>
        <summary>Nâng cao</summary>
        <textarea
          class="textarea textarea-bordered"
          rows={15}
          style="width:100%"
          name="Nâng cao"
          id="nâng-cao"
          value={JSON.stringify(bàiĐăng, null, 2)}
          onChange={(e: InputEvent) => setBàiĐăng(JSON.parse((e.target as HTMLTextAreaElement).value))}
        >
        </textarea>
      </details>
    </>
  );
}
