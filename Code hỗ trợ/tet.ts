// const url =
//   "https://quacau.deno.dev/kv?key=%C4%90u%C3%B4i+r%C3%BAt+g%E1%BB%8Dn%2CC2hxK3";
// //   "http://localhost:8000/kv?key=%C4%90u%C3%B4i+r%C3%BAt+g%E1%BB%8Dn%2CC1OnM3";
// const body = {
//   "Bài đăng": {
//     "Tiêu đề":
//       "git add -A làm cho index giống như ở working directory. git commit -am chỉ áp dụng cho những file đã có sẵn trong index",
//     "url":
//       "https://lậptrình.quảcầu.cc/📊Tổ chức dữ liệu. Phân tích dữ liệu/Tổ chức dữ liệu/Git/Stage, index, cache/git add -A làm cho index giống như ở working directory. git commit -am chỉ áp dụng cho những file đã có sẵn trong index",
//     "Vault": "Tiếp thị số, xử lý dữ liệu và lập trình",
//     "Dự án": {
//       "Tên dự án": "Tiếp thị số, xử lý dữ liệu và lập trình",
//       "Mã dự án": "C2",
//     },
//   },
//   "Nơi đăng": {
//     "Tên nơi đăng": "#tiếng-việt",
//     "Tên cộng đồng": "Obsidian",
//     "Loại nơi đăng": "Máy chủ",
//     "Tên nền tảng": "Discord",
//     "Loại nền tảng": "Chat",
//   },
//   "Thời điểm tạo": "2024-04-03T10:28:39.573Z",
//   "Tham số UTM": {
//     "source": "D Sv #tiếng-việt",
//     "medium": "chat",
//     "campaign": "C2 Tiếp thị số, xử lý dữ liệu và lập trình",
//   },
//   "Liên kết UTM":
//     "https://xn--lptrnh-zva6402d.xn--qucu-hr5aza.cc/%F0%9F%93%8AT%E1%BB%95%20ch%E1%BB%A9c%20d%E1%BB%AF%20li%E1%BB%87u.%20Ph%C3%A2n%20t%C3%ADch%20d%E1%BB%AF%20li%E1%BB%87u/T%E1%BB%95%20ch%E1%BB%A9c%20d%E1%BB%AF%20li%E1%BB%87u/Git/Stage,%20index,%20cache/git%20add%20-A%20l%C3%A0m%20cho%20index%20gi%E1%BB%91ng%20nh%C6%B0%20%E1%BB%9F%20working%20directory.%20git%20commit%20-am%20ch%E1%BB%89%20%C3%A1p%20d%E1%BB%A5ng%20cho%20nh%E1%BB%AFng%20file%20%C4%91%C3%A3%20c%C3%B3%20s%E1%BA%B5n%20trong%20index?utm_source=D+Sv+%23ti%E1%BA%BFng-vi%E1%BB%87t&utm_medium=chat&utm_campaign=C2+Ti%E1%BA%BFp+th%E1%BB%8B+s%E1%BB%91%2C+x%E1%BB%AD+l%C3%BD+d%E1%BB%AF+li%E1%BB%87u+v%C3%A0+l%E1%BA%ADp+tr%C3%ACnh",
//   "Đuôi rút gọn": "C2hxK3",
// };
// const post = await fetch(url, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(body, null, 2),
// });
// console.log(JSON.stringify(await post.json(), null, 2));

// const resFetch = await fetch(url);
// console.log(JSON.stringify(await resFetch.json(), null, 2));

const kv = await Deno.openKv("/kv.db");
await kv.set(["key1", "key2"], "value");

const url = "http://localhost:8000/kv?key=key1,key2";
const resFetch = await fetch(url);
const clientGet = await resFetch.json();
console.log("clientGet:", clientGet.value);

const serverGet = await kv.get(["key1", "key2"]);
console.log("serverGet:", serverGet.value);
