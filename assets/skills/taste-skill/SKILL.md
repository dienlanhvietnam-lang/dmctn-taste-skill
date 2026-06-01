---
name: design-taste-frontend
description: Skill chống UI AI rập khuôn cho landing page, portfolio và redesign. Đọc brief, suy ra hướng thiết kế, rồi mới code.
---

# tasteskill VI: Anti-Slop Frontend Skill

Dùng cho landing page, portfolio, marketing site và redesign. Không dùng để biến dashboard dữ liệu thành trang nghệ thuật.

## 0. Đọc phòng trước khi code

Trước khi sửa bất kỳ file nào, phải đọc các tín hiệu:

- loại trang: landing, portfolio, agency, event, blog, redesign
- người dùng mục tiêu: khách mua hàng, chủ doanh nghiệp, dev, designer, công nhân, quản trị viên
- cảm giác thương hiệu: tin cậy, cao cấp, kỹ thuật, gần gũi, mạnh, tối giản, editorial, local-business
- ràng buộc ngành: bảo mật, accessibility, pháp lý, thương mại, tốc độ, mobile
- tài sản có sẵn: logo, màu, font, ảnh thật, UI hiện tại

## 1. Design Read

Bắt buộc trả về một dòng:

> Đọc brief này là: `<loại sản phẩm>` cho `<người dùng>`, cảm giác `<vibe>`, nghiêng về `<design system/phong cách>`.

## 2. Ba nút chỉnh

- `DESIGN_VARIANCE`: 1 an toàn, 10 phá cách
- `MOTION_INTENSITY`: 1 tĩnh, 10 cinematic
- `VISUAL_DENSITY`: 1 rất thoáng, 10 dày đặc

Preset:

| Ngữ cảnh | Variance | Motion | Density |
|---|---:|---:|---:|
| SaaS mainstream | 6-7 | 3-5 | 4-5 |
| Agency/creative | 8-9 | 6-8 | 3-4 |
| Local business Việt Nam | 5-6 | 2-4 | 5-6 |
| Dashboard vận hành | 4-6 | 1-3 | 6-8 |
| Public/trust-first | 3-4 | 1-2 | 4-6 |
| Premium consumer | 7-8 | 4-6 | 3-4 |

## 3. Chọn nền thiết kế

Nếu brief hợp hệ chính thức, dùng đúng package/hệ đó. Nếu không, dùng native CSS/Tailwind/component library có kiểm soát.

- Microsoft/enterprise: Fluent UI
- Google/Material: Material 3
- Shopify: Polaris
- GitHub/devtool: Primer-style
- Government/trust-first: GOV.UK/USWDS-style
- Indie/SaaS/custom: Tailwind + component tự kiểm soát

## 4. Typography

- Không mặc định Inter.
- Font phải hợp ngành và ngữ cảnh.
- Heading cần có nhịp, độ tương phản, khoảng trắng rõ.
- Body text tối đa khoảng 60-75 ký tự/dòng.
- Không dùng quá 2 họ font nếu không có lý do.

## 5. Layout

- Ưu tiên grid có nhịp, không chia cột máy móc.
- Có một điểm nhớ thị giác: hình khối, ảnh thật, biểu đồ, minh hoạ, typography, hoặc interaction.
- Không để mọi section có cùng công thức: title + paragraph + card.
- Desktop và mobile có bố cục riêng, không chỉ co lại.

## 6. Motion

- Motion phải có mục đích: dẫn mắt, phản hồi thao tác, chuyển trạng thái.
- Luôn tôn trọng reduced motion.
- Không animation loop vô hạn nếu không phục vụ hiểu nội dung.

## 7. QA trước khi chốt

PASS khi:

- nhìn 3 giây vẫn phân biệt được thương hiệu/ngữ cảnh
- mobile dùng được bằng một tay
- CTA rõ
- không giống template SaaS mặc định
- loading/empty/error được xử lý
- contrast và focus state đủ dùng

## Quy trình bắt buộc

1. Đọc brief và inventory hiện có.
2. Xác định người dùng thật, không thiết kế theo gu mơ hồ.
3. Chọn cảm giác thương hiệu trước khi chọn màu/component.
4. Đặt ba biến: `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`.
5. Chỉ dùng hiệu ứng nếu nó giúp người dùng hiểu hoặc thao tác tốt hơn.
6. Thiết kế mobile-first, sau đó mới mở rộng desktop.
7. Trả về PASS/FAIL rõ ràng trước khi code.

## Anti-slop mặc định

Không mặc định dùng:

- gradient tím/xanh kiểu AI SaaS
- hero căn giữa + subtitle + 2 CTA + mockup lơ lửng
- 3 feature card ngang giống nhau
- glassmorphism toàn bộ giao diện
- font Inter/slate mặc định khi không có lý do
- icon/emoji lộn xộn
- animation vô hạn gây phân tâm

## Output trước khi làm

```text
DESIGN_READ: ...
DIALS: variance/motion/density = ...
PLAN: ...
ANTI_SLOP_RISKS: ...
VERDICT: PASS_TO_CODE hoặc NEEDS_BRIEF
```
