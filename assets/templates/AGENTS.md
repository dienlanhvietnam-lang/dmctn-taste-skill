# AGENTS.md - DMCTN Taste Gate

Trước khi code UI/frontend, agent phải chạy Taste Gate.

## 1. Design Read bắt buộc

Trả về 1 dòng:

> Đọc brief này là: `<loại trang/app>` cho `<người dùng mục tiêu>`, cảm giác `<vibe>`, nghiêng về `<hệ thiết kế/phong cách>`.

Không code trước khi có dòng này.

## 2. Ba nút chỉnh thiết kế

Đặt 3 biến:

- `DESIGN_VARIANCE`: 1 = rất an toàn/đối xứng, 10 = phá cách/mạnh
- `MOTION_INTENSITY`: 1 = gần như tĩnh, 10 = nhiều chuyển động điện ảnh
- `VISUAL_DENSITY`: 1 = rất thoáng, 10 = dày đặc dữ liệu

Mặc định sản phẩm DMCTN/ứng dụng thực dụng:

```text
DESIGN_VARIANCE: 5-7
MOTION_INTENSITY: 2-4
VISUAL_DENSITY: 5-7
```

## 3. Luật chống giao diện AI rập khuôn

FAIL nếu:

- hero section căn giữa giống SaaS template mà không có lý do
- 3 card feature đặt ngang theo mẫu quá quen
- gradient tím/xanh mặc định
- glassmorphism phủ toàn giao diện
- CTA phát sáng vô nghĩa
- dùng Inter/slate mặc định khi không cần
- icon/emoji lộn xộn
- animation chỉ để khoe
- desktop đẹp nhưng mobile khó dùng
- thiếu trạng thái loading/empty/error

## 4. Luật dành cho sản phẩm thật

Mọi UI phải có:

- mobile-first
- trạng thái loading/empty/error/success
- semantic heading rõ
- keyboard/focus state
- contrast đủ đọc
- không layout shift lớn
- không che nội dung chính
- không phụ thuộc hiệu ứng để hiểu chức năng

## 5. Với dự án công khai/web bán hàng

Bắt buộc thêm:

- metadata title/description
- canonical URL khi có route public
- Open Graph cơ bản
- sitemap/robots khi phù hợp
- heading H1/H2/H3 đúng nghĩa
- ảnh có alt text
- tốc độ tải nhẹ

## 6. Với dự án có login/dữ liệu

Bắt buộc thêm:

- input validation
- CSRF/session safety nếu có form/auth
- không log secret/token
- rate limit endpoint nhạy cảm
- audit log cho thao tác quan trọng
- không lưu mật khẩu raw
- không expose key trong frontend

## 7. Output trước khi code

Agent phải in:

```text
DESIGN_READ: ...
TASTE_GATE:
- Audience: ...
- Brand feeling: ...
- Layout direction: ...
- Anti-slop risks: ...
- Mobile plan: ...
- SEO/Security notes: ...
VERDICT: PASS_TO_CODE hoặc NEEDS_BRIEF
```
