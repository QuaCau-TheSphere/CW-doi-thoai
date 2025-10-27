## Tính năng
- [4] Thêm nơi đăng mới không cần url. Nếu không có url thì chỉnh sửa trong khai báo yaml luôn
- [ ] Thêm url fb chỉ dành cho friend 
- [ ] Tạo cơ sở dữ liệu cho các dự án, tổ chức. (Tên dự án dùng để làm campaign) 
- [1] Thêm WhatsApp 
  - [ ] Khi thêm một nền tảng chat mới thì chỉ cần thêm một lần là xong
- [ ] Các cách rút gọn: ngắn tối đa, chỉ có tên bài đăng/tên nơi đăng, có cả tên bài đăng và tên kho 
- [ ] Cá nhân, tài khoản là như nhau
- [ ] Thay đổi vài chữ trong bài theo cách xưng hô hoặc ví dụ cụ thể mà bối cảnh đang nói đến chứ không phải là một ví dụ chung chung
- [1] Tuỳ chỉnh output text dựa vào nơi đăng: chỉ cần link, plain text, markdown, html
- [ ] Dùng AI để tạo tiêu đề cho những bài đăng không có tiêu đề

## DX
- [1] YAML schema
- [1] Tự động tạo danh sách bài đăng và nơi đăng mới mỗi khi cấu hình thay đổi. Mỗi lần push thì cào lại vault một lần rồi chạy mod.ts trên github 
- [1] Tự lấy url trên WordPress 
- [ ] Đọc filename
- [ ] Tự lấy thread trong discord
- [ ] Tự lấy repo trên github
- [ ] Title không dùng h1
- [ ] Dùng lib utils
- [ ] Tạo trang chủ mới không cần tại cấu hình nơi đăng

- [ ] Cấu trúc lại thư mục "Nơi đăng"
- [ ] Không cần phải cào web nếu không cần
- [1] Tự động redirect khi thay đổi đường dẫn
- [ ] cache và api trả về chỉ cần là thông tin url chứ không phải toàn bộ html
- [ ] kết quả tổng hợp của một nơi đăng, bài đăng
- [ ] Tạo vị trí nơi đăng dễ quản lý hơn
- [ ] Debugger Facebook 
- [ ] Nếu nơi đăng là vault thì vị trí đăng ghi thêm đường dẫn cụ thể
- [ ] tạo utm với những link trong kết quả bài đăng được chọn
- [ ] Nếu discord chỉ có link mời tham gia máy chủ thì vẫn lấy được ở nơi đăng
- [ ] Test web local 
- [ ] Slug dùng luôn source?

## Lỗi
- [ ] Xử lý trường hợp url trả về undefined (những comment //todo) 
- [1] Lỗi malform URI khi trong url có %
- [ ] fetch 'https://doi-thoai.deno.dev/blog/NhiềuNềnTảng' bị lỗi Recursive requests to the same deployment cannot be processed.
- [ ] không hiểu sao để component echart.tsx trong routes/[slug] thì bị lỗi, phải comment bỏ đi
- [ ] Vị trí thành phần đầu tiên không lấy được

# Cả hệ thống/plugin Obsidian
- [ ] Chỉ cần trigger là push ở cả vault
- [ ] Tạo nội dung cho WordPress 
- [ ] Tự gắn UTM trong vault
- [ ] Link mà nếu bên vault kia rename thì vẫn redirect được

# Plugin trình duyệt
- [ ] Thêm bài đăng, nơi đăng, liên kết ngay trong lúc duyệt web

# SSG
## Lume
- [ ] % trong filename
- [ ] og title, social card không dùng h1
- [ ] callout