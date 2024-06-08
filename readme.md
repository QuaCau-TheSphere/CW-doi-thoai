---
share: true
created: 2023-10-30T14:29
updated: 2024-06-01T12:34
---
# Thử nhanh
Cài đặt Git, Deno.

Sau khi clone repo này về thì chạy lệnh sau trên terminal:
```
deno task start
```

# Lấy dữ liệu từ vault, website của bạn
## Chuẩn bị dữ liệu
### Obsidian, Logseq
Vault của bạn cần có một thư mục thiết lập, và trong đó có một note thiết lập có frontmatter như sau:
```yaml
---
Tên vault: xxx
Mã vault: yyy
Mô tả: zzz
URL: ttt
---
```

### WordPress 
[Mở PhPMyAdmin lên và chạy truy vấn SQL](https://youtu.be/VnBdOBKwPes?si=6XjJZ3hsX-WR15jT) dưới đây. Nhớ thay `wp` bằng tên table của bạn.
```sql
SELECT wp_posts.post_title, GROUP_CONCAT(wp_terms.name) AS categories, wp_posts.post_name, wp_posts.post_author, wp_posts.post_excerpt, wp_posts.post_date, wp_posts.post_modified
FROM wp_posts
LEFT JOIN wp_term_relationships ON (wp_posts.ID = wp_term_relationships.object_id)
LEFT JOIN wp_term_taxonomy ON (wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id)
LEFT JOIN wp_terms ON (wp_term_taxonomy.term_id = wp_terms.term_id)
WHERE wp_posts.post_type = 'post' 
AND wp_posts.post_status = 'publish'
GROUP BY wp_posts.ID
```
Xuất kết quả dưới dạng csv.

## Thiết lập cấu hình
Bắt chước các cấu hình có sẵn trong `./core/A. Cấu hình` và chỉnh sửa các đường dẫn trong `./ĐƯỜNG_DẪN.ts` cho đúng.

## Tạo biến môi trường
Tạo tập tin `.env` với nội dung như sau:
```env
DENO_KV_ACCESS_TOKEN = XXX
KV_UUID = YYY

ORIGIN = https://localhost:8000
## ORIGIN = https://doi-thoai.deno.dev
```

## Chạy
```
deno task start
```

## Deploy
Dùng Deno Deploy

# Giấy phép
AGPL. Người sử dụng liên kết rút gọn của bạn có quyền tiếp cận và chia sẻ mã nguồn.
