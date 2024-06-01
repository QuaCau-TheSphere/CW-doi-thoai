import { useEffect, useState } from "preact/hooks";
import { NơiĐăngCóCácLựaChọnVịTríChưaCóId } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Hàm và kiểu cho vị trí.ts";
import { queryNơiĐăng } from "../Tìm bài đăng hoặc nơi đăng/Signal tìm bài đăng hoặc nơi đăng.ts";
import { PhảnHồiTừCORSProxy } from "../../Code hỗ trợ cho client/Hàm và kiểu cho API server.ts";
import { TênNơiĐăng } from "../../Tạo bài đăng và nơi đăng/Code hỗ trợ cho server/Kiểu cho nơi đăng.ts";

export default function ModalNơiĐăng() {
  /** Tạo dữ liệu lấy từ CORS proxy (LTCP) */
  const [nơiĐăngLTCP, setNơiĐăngLTCP] = useState<NơiĐăngCóCácLựaChọnVịTríChưaCóId | undefined>();
  const [urlNDNTF, setUrlNDNTF] = useState<string>(queryNơiĐăng.value);
  const [tênNơiĐăngLTCP, setTênNơiĐăngLTCP] = useState<TênNơiĐăng | undefined>();
  const [slugLTCP, setSlugLTCP] = useState<string | undefined>();
  const [môTảNơiĐăngLTCP, setMôTảNơiĐăngLTCP] = useState<string | undefined | null>();
  useEffect(() => {
    setUrlNDNTF(urlNDNTF);
    async function lấyThôngTinTừUrl() {
      try {
        new URL(urlNDNTF);
      } catch {
        return;
      }
      const corsProxyUrl = `${origin}/api/cors-proxy/${urlNDNTF}`;
      const phảnHồiTừCORSProxy = await (await fetch(corsProxyUrl)).json() as PhảnHồiTừCORSProxy;
      console.log("Kết quả lấy dữ liệu từ URL được nhập vào nơi đăng:", phảnHồiTừCORSProxy);

      const nơiĐăng = phảnHồiTừCORSProxy?.["Nếu là nơi đăng"];
      setMôTảNơiĐăngLTCP("sdfsdf");
      setNơiĐăngLTCP(nơiĐăng);
      // setTênNơiĐăngLTCP(nơiĐăng?.["Tên nơi đăng"]);
      // setMôTảNơiĐăngLTCP(nơiĐăng?.["Mô tả nơi đăng"]);
      // setSlugLTCP(nơiĐăng.Slug);
    }
    lấyThôngTinTừUrl();
  }, [urlNDNTF]);

  console.log("🚀 ~ ModalNơiĐăng ~ tênNơiĐăngLTCP:", tênNơiĐăngLTCP);
  console.log("🚀 ~ ModalNơiĐăng ~ slugLTCP:", slugLTCP);
  console.log("🚀 ~ ModalNơiĐăng ~ môTảNơiĐăngLTCP:", môTảNơiĐăngLTCP);
  /** Tạo dữ liệu người dùng nhập trong form (NDNTF) */
  const [nơiĐăngNDNTF, setNơiĐăngNDNTF] = useState<NơiĐăngCóCácLựaChọnVịTríChưaCóId | undefined>();
  const [tênNơiĐăngNDNTF, setTênNơiĐăngNDNTF] = useState(tênNơiĐăngLTCP?.join(", "));
  const [slugNDNTF, setSlugNDNTF] = useState<string | undefined>(slugLTCP);
  const [môTảNơiĐăngNDNTF, setMôTảNơiĐăngNDNTF] = useState(JSON.stringify(môTảNơiĐăngLTCP));
  const [lĩnhVựcNDNTF, setLĩnhVựcNDNTF] = useState<string | undefined>();
  const [đơnVịQuảnLýNDNTF, setĐơnVịQuảnLýNDNTF] = useState<string | undefined>();

  useEffect(() => {
    console.log("🚀 nơiĐăngLTCP:", nơiĐăngLTCP);
    setNơiĐăngNDNTF({
      ...nơiĐăngLTCP as NơiĐăngCóCácLựaChọnVịTríChưaCóId,
      "Tên nơi đăng": tênNơiĐăngNDNTF?.split(", ") as TênNơiĐăng,
      Slug: slugNDNTF,
      "Mô tả nơi đăng": môTảNơiĐăngNDNTF,
      "Lĩnh vực": lĩnhVựcNDNTF?.split(", "),
      "Đơn vị quản lý": đơnVịQuảnLýNDNTF,
    });
  }, [nơiĐăngLTCP, tênNơiĐăngNDNTF, môTảNơiĐăngNDNTF, lĩnhVựcNDNTF, đơnVịQuảnLýNDNTF]);

  return (
    <>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text font-bold">URL</span>
        </div>
        <input
          name="URL"
          style="width:100%"
          class="input input-bordered w-full max-w-xs"
          type="url"
          required
          id="URL"
          value={urlNDNTF}
          onInput={(e: InputEvent) => setUrlNDNTF((e.target as HTMLTextAreaElement).value)}
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
          value={tênNơiĐăngNDNTF}
          placeholder="Phân cách các thành phần trong tên nơi đăng bằng dấu phẩy"
          onInput={(e: InputEvent) => setTênNơiĐăngNDNTF((e.target as HTMLTextAreaElement).value)}
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
          required
          id="slug"
          value={slugNDNTF}
          onInput={(e: InputEvent) => setSlugNDNTF((e.target as HTMLTextAreaElement).value)}
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
          value={môTảNơiĐăngNDNTF || ""}
          onInput={(e: InputEvent) => setMôTảNơiĐăngNDNTF((e.target as HTMLTextAreaElement).value)}
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
          required
          value={lĩnhVựcNDNTF}
          placeholder="Phân cách các lĩnh vực của nơi đăng bằng dấu phẩy"
          onInput={(e: InputEvent) => setLĩnhVựcNDNTF((e.target as HTMLTextAreaElement).value)}
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
          required
          value={đơnVịQuảnLýNDNTF}
          onInput={(e: InputEvent) => setĐơnVịQuảnLýNDNTF((e.target as HTMLTextAreaElement).value)}
        />
      </label>
      {JSON.stringify(nơiĐăngNDNTF, null, 2)}
      <details>
        <summary>Nâng cao</summary>
        <textarea
          class="textarea textarea-bordered"
          rows={15}
          style="width:100%"
          name="Nâng cao"
          id="nâng-cao"
          value={JSON.stringify(nơiĐăngNDNTF, null, 2)}
          onInput={(e: InputEvent) => setNơiĐăngNDNTF(JSON.parse((e.target as HTMLTextAreaElement).value))}
        >
        </textarea>
      </details>
    </>
  );
}
