//deno-fmt-ignore-file
import FlexSearch from "npm:flexsearch";
// import Document from "./node_modules/.deno/flexsearch@0.7.43/node_modules/flexsearch/dist/module/document.js";
const danhSáchBàiĐăng = JSON.parse(Deno.readTextFileSync("core\\A. Cấu hình\\Danh sách tất cả bài đăng.json"));
const index = new FlexSearch.Document({
  document: {
    id: "id",
    index: ["Tiêu đề", "URL", "Vault", "Dự án"],
    store: true,
    context: true,
  },
});

for (const bàiĐăng of danhSáchBàiĐăng) {
  index.add(bàiĐăng);
}
console.log(index.get())
const searchResults = index.search("hai", {context: true, index: ["Tiêu đề"]});
console.log("🚀 ~ searchResults:", searchResults)

searchResults.forEach((result) => {
  console.log(result.field);
  result.result.forEach((resultId) => {
    console.log(index.get(resultId)['Tiêu đề']);
    console.log()
  });
});