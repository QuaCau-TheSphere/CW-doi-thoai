import { useEffect, useState } from "preact/hooks";
import Fuse from "https://deno.land/x/fuse/dist/fuse.esm.js";
import { script } from "./script.tsx";

export default function SearchBar({ danhSách }: any) {
  const [từKhoá, setKeyword] = useState("");
  const fuse = new Fuse(danhSách, {
    minMatchCharLength: 3,
    ignoreLocation: true,
    keys: ["Tiêu đề", "Mô tả bài đăng"],
  });
  useEffect(() => {
    script("list");
  });
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Nhập tên bài viết"
        value={từKhoá}
        onInput={(e) => setKeyword((e.target as HTMLTextAreaElement).value)}
      />
      <br />
      {từKhoá}
      <ul id="list">
        {fuse.search(từKhoá).slice(0, 10).map(
          (kếtQuả: any) => <li>{kếtQuả.item["Tiêu đề"]}</li>,
        )}
      </ul>
      <div>
        Your selected item is :<span id="result"></span>
      </div>
    </div>
  );
}
