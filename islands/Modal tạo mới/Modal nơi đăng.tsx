import { useEffect, useState } from "preact/hooks";
import { NơiĐăngCóCácLựaChọnVịTríChưaCóId } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { queryNơiĐăngSignal } from "../Tìm bài đăng hoặc nơi đăng/Signal tìm bài đăng hoặc nơi đăng.ts";
import { ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo, TênNơiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";
import { tạoNơiĐăngTừURL } from "../../Code hỗ trợ cho client/Tạo bài đăng hoặc nơi đăng từ URL.ts";
import * as linkify from "npm:linkifyjs";
import { tạoNơiĐăngCóCácLựaChọnVịTrí } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";

/** Các dữ liệu người dùng nhập trong form */
export default function ModalNơiĐăng() {
  const [nơiĐăng, setNơiĐăng] = useState<NơiĐăngCóCácLựaChọnVịTríChưaCóId | undefined>();

  /**
   * Các state dưới đây cần để kiểu là string vì chúng là do người dùng nhập vào
   * Cái nào không có undefined nghĩa là cái đó bắt buộc phải có
   */
  const [urlHoặcEmail, setUrlHoặcEmail] = useState(queryNơiĐăngSignal.value);
  const [tênNơiĐăng, setTênNơiĐăng] = useState("");
  const [slug, setSlug] = useState<string | undefined>();
  const [môTảNơiĐăng, setMôTảNơiĐăng] = useState<string | undefined | null>();
  const [lĩnhVực, setLĩnhVực] = useState<string | undefined>();
  const [đơnVịQuảnLý, setĐơnVịQuảnLý] = useState<string | undefined>();

  useEffect(() => {
    console.log("🚀", urlHoặcEmail);
    setUrlHoặcEmail(urlHoặcEmail);
    console.log("🚀", urlHoặcEmail);
    async function tạoNơiĐăngTừUrlHoặcEmail() {
      const linkĐầuTiên = urlHoặcEmail ? linkify.find(urlHoặcEmail)[0] : undefined;
      if (linkĐầuTiên === undefined) return;

      const type = linkĐầuTiên.type;
      if (type === "url" && !linkĐầuTiên?.value.startsWith("mailto:")) {
        const url = linkĐầuTiên.href;
        const corsProxyUrl = `${origin}/api/cors-proxy/${url}`;
        const html = await (await fetch(corsProxyUrl)).text();
        setNơiĐăng({
          ...await tạoNơiĐăngTừURL(url, undefined, html),
          "Phương thức tạo": "Nhập tay trên web",
        });
      } else if (type === "email" || linkĐầuTiên?.value.startsWith("mailto:")) {
        const email = linkĐầuTiên.value.replace("mailto:", "");
        const thôngTinNơiĐăngChưaCóId = {
          "Tên nền tảng": "Email",
          "Loại nền tảng": "Email",
          "Tên nơi đăng": [email],
          "Loại nơi đăng": ["Email"],
          URL: linkĐầuTiên.href,
        } satisfies ThôngTinNơiĐăngChưaCóIdVàPhươngThứcTạo;
        setNơiĐăng({
          ...tạoNơiĐăngCóCácLựaChọnVịTrí(thôngTinNơiĐăngChưaCóId),
          "Phương thức tạo": "Nhập tay trên web",
        });
      }
    }
    tạoNơiĐăngTừUrlHoặcEmail();
  }, [urlHoặcEmail]);

  useEffect(() => {
    setNơiĐăng({
      ...nơiĐăng as NơiĐăngCóCácLựaChọnVịTríChưaCóId,
      "Tên nơi đăng": tênNơiĐăng.split(", ") as TênNơiĐăng,
      Slug: slug,
      "Mô tả nơi đăng": môTảNơiĐăng,
    });
  }, [tênNơiĐăng, slug, môTảNơiĐăng]);

  useEffect(() => {
    if (nơiĐăng) {
      const {
        URL: urlHoặcEmail,
        "Tên nơi đăng": tênNơiĐăng,
        Slug: slug,
        "Mô tả nơi đăng": môTảNơiĐăng,
      } = nơiĐăng;
      setUrlHoặcEmail(urlHoặcEmail?.toString());
      setTênNơiĐăng(tênNơiĐăng?.join(", "));
      setSlug(slug);
      setMôTảNơiĐăng(môTảNơiĐăng);
    }
  }, [nơiĐăng]);

  return (
    <>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Liên kết</span>
        </div>
        <input
          name="URL"
          type="text"
          class="input input-bordered w-full max-w-xs"
          required
          id="URL"
          value={urlHoặcEmail}
          placeholder="URL hoặc email"
          onInput={(e: InputEvent) => setUrlHoặcEmail((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Tên nơi đăng</span>
        </div>
        <input
          name="Tên nơi đăng"
          type="text"
          class="input input-bordered w-full max-w-xs"
          required
          id="tên"
          value={tênNơiĐăng}
          placeholder="Phân cách các thành phần trong tên nơi đăng bằng dấu phẩy"
          onInput={(e: InputEvent) => setTênNơiĐăng((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Slug</span>
        </div>
        <input
          name="Slug"
          type="text"
          class="input input-bordered w-full max-w-xs"
          id="slug"
          value={slug}
          onInput={(e: InputEvent) => setSlug((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Mô tả nơi đăng</span>
        </div>
        <input
          name="Mô tả nơi đăng"
          type="text"
          class="input input-bordered w-full max-w-xs"
          id="mô-tả"
          value={môTảNơiĐăng || ""}
          onInput={(e: InputEvent) => setMôTảNơiĐăng((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Lĩnh vực</span>
        </div>
        <input
          name="Lĩnh vực"
          type="text"
          class="input input-bordered w-full max-w-xs"
          id="lĩnh-vực"
          value={lĩnhVực}
          placeholder="Phân cách các lĩnh vực của nơi đăng bằng dấu phẩy"
          onInput={(e: InputEvent) => setLĩnhVực((e.target as HTMLTextAreaElement).value)}
        />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">Đơn vị quản lý</span>
        </div>
        <input
          name="Đơn vị quản lý"
          type="text"
          class="input input-bordered w-full max-w-xs"
          id="đơn-vị-quản-lý"
          value={đơnVịQuảnLý}
          onInput={(e: InputEvent) => setĐơnVịQuảnLý((e.target as HTMLTextAreaElement).value)}
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
          value={JSON.stringify(nơiĐăng, null, 2)}
          onChange={(e: InputEvent) => setNơiĐăng(JSON.parse((e.target as HTMLTextAreaElement).value))}
        >
        </textarea>
      </details>
    </>
  );
}
