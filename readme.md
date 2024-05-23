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
Mở PhPMyAdmin lên và dùng lệnh MySQL này. Nhớ thay `wp` bằng tên table của bạn.
```sql
SELECT wp_posts.post_title, GROUP_CONCAT(wp_terms.name) AS categories
FROM wp_posts
LEFT JOIN wp_term_relationships ON (wp_posts.ID = wp_term_relationships.object_id)
LEFT JOIN wp_term_taxonomy ON (wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id)
LEFT JOIN wp_terms ON (wp_term_taxonomy.term_id = wp_terms.term_id)
WHERE wp_posts.post_type = 'post' 
AND wp_posts.post_status = 'publish'
GROUP BY wp_posts.ID
INTO OUTFILE '/path/to/export/posts_categories.csv'
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';
```
Copy kết quả vào `./core/A. Cấu hình/wp_posts.csv`
# Thiết lập cấu hình
Bắt chước các cấu hình có sẵn trong `./core/A. Cấu hình/Nơi đăng`.

# Tạo biến môi trường
Tạo tập tin `.env` với nội dung như sau:
```env
THU_MUC_DU_AN = 📐 Dự án
THU_MUC_THIET_LAP = Ξ Thiết lập
TAP_TIN_THIET_LAP = Ξ Thiết lập\\Ξ Thiết lập.md
THU_MUC_CHUA_TAT_CA_CAC_VAULT = D:\\QC supplements\\Vaults

DUONG_DAN_DEN_TAP_TIN_CSV = ./core/A. Cấu hình/wp_posts.csv
THU_MUC_CAU_HINH_NOI_DANG = ./core/A. Cấu hình/Nơi đăng
DUONG_DAN_DEN_CAU_HINH_CHUNG = ./core/A. Cấu hình/Nơi đăng/Cấu hình chung.yaml
```

# Giấy phép
AGPL. Người sử dụng liên kết rút gọn của bạn có quyền tiếp cận và chia sẻ mã nguồn.
