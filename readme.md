# Thử nhanh
Cài đặt Deno và tạo tài khoản trên Deno Deploy.

Khi clone repo này về thì chạy:
```
deno task start
```

# Lấy dữ liệu từ vault, website
## Obsidian, Logseq
Vault của bạn cần có một thư mục thiết lập, và trong đó có một note thiết lập có frontmatter như sau:
```yaml
---
Tên vault: xxx
Mã vault: yyy
Mô tả: zzz
URL: ttt
---
```
## WordPress 
Mở PhPMyAdmin lên và dùng lệnh MySQL này. Nhớ thay `wpd9` bằng tên table của bạn.
```sql
SELECT wpd9_posts.post_title, GROUP_CONCAT(wpd9_terms.name) AS categories
FROM wpd9_posts
LEFT JOIN wpd9_term_relationships ON (wpd9_posts.ID = wpd9_term_relationships.object_id)
LEFT JOIN wpd9_term_taxonomy ON (wpd9_term_relationships.term_taxonomy_id = wpd9_term_taxonomy.term_taxonomy_id)
LEFT JOIN wpd9_terms ON (wpd9_term_taxonomy.term_id = wpd9_terms.term_id)
WHERE wpd9_posts.post_type = 'post' 
AND wpd9_posts.post_status = 'publish'
GROUP BY wpd9_posts.ID
INTO OUTFILE '/path/to/export/posts_categories.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';
```
Copy kết quả vào `./core/A. Cấu hình/wpd9_posts.csv`
# Thiết lập cấu hình
Bắt chước các cấu hình có sẵn trong `./core/A. Cấu hình/Nơi đăng`.

# Tạo biến môi trường
Tạo tập tin `.env` với nội dung như sau:
```env
DENO_KV_ACCESS_TOKEN = XXX
KV_UUID = YYY

ORIGIN = https://localhost:8000
# ORIGIN = https://doi-thoai.deno.dev
```

# Giấy phép
AGPL. Người sử dụng liên kết rút gọn của bạn có quyền tiếp cận và chia sẻ mã nguồn.
