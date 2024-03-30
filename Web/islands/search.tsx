import { useEffect, useState } from "preact/hooks";
import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.js";
import {} from "https://deno.land/x/fuse@v6.4.1/dist/fuse.d.ts";
import { script } from "./script.tsx";
import { json } from "$std/yaml/schema/json.ts";
import { BàiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20%C4%91%C6%B0%E1%BB%9Dng%20d%E1%BA%ABn,%20vault,%20b%C3%A0i%20%C4%91%C4%83ng,%20d%E1%BB%B1%20%C3%A1n.ts";
import { NơiĐăng } from "../../Code%20h%E1%BB%97%20tr%E1%BB%A3/Ki%E1%BB%83u%20cho%20n%C6%A1i%20%C4%91%C4%83ng.ts";
interface danhSáchProp {
  danhSách: BàiĐăng[] | NơiĐăng[];
  làBàiĐăng?: boolean;
}
export default function SearchBar(
  { danhSách, làBàiĐăng = false }: danhSáchProp,
) {
  const [từKhoáBàiĐăng, nhậpTừKhoáBàiĐăng] = useState("");
  const [từKhoáNơiĐăng, nhậpTừKhoáNơiĐăng] = useState("");
  let fuse;
  if (làBàiĐăng) {
    fuse = new Fuse(danhSách, {
      minMatchCharLength: 3,
      ignoreLocation: true,
      keys: [{
        name: "Tiêu đề",
        weight: 2,
      }, "Mô tả bài đăng"],
    });

    return (
      <div className="search-bar-container">
        <input
          type="text"
          placeholder={`Nhập bài đăng`}
          value={từKhoáBàiĐăng}
          onInput={(e) => {
            nhậpTừKhoáBàiĐăng((e.target as HTMLTextAreaElement).value);
            script("bài đăng");
          }}
        />
        <br />
        {từKhoáBàiĐăng}
        <ul id={`Danh sách bài đăng`}>
          {fuse.search(từKhoáBàiĐăng).slice(0, 10).map(
            (kếtQuả: any) => <li>{kếtQuả.item["Tiêu đề"]}</li>,
          )}
        </ul>
        <div>
          Your selected item is :<span id="Kết quả chọn bài đăng"></span>
        </div>
      </div>
    );
  } else {
    fuse = new Fuse(danhSách, {
      minMatchCharLength: 2,
      ignoreLocation: true,
      keys: [
        "Tên nơi đăng",
        "Tên cộng đồng",
        "Loại nơi đăng",
        "Tên nền tảng",
        "Loại nền tảng",
      ],
    });
    return (
      <div className="search-bar-container">
        <input
          type="text"
          placeholder={`Nhập nơi đăng`}
          value={từKhoáNơiĐăng}
          onInput={(e) => {
            nhậpTừKhoáNơiĐăng((e.target as HTMLTextAreaElement).value);
            script("nơi đăng");
          }}
        />
        <br />
        {từKhoáNơiĐăng}
        <ul id={`Danh sách nơi đăng`}>
          {fuse.search(từKhoáNơiĐăng).slice(0, 10).map(
            (kếtQuả: any) => <li>{kếtQuả.item["Tên nơi đăng"]}</li>,
          )}
        </ul>
        <div>
          Your selected item is :<span id="Kết quả chọn nơi đăng"></span>
        </div>
      </div>
    );
  }
}
