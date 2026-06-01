---
name: redesign-existing-projects
description: Audit và redesign dự án hiện có mà không phá chức năng cũ.
---

# Redesign Skill VI

Dùng khi dự án đã có UI và cần nâng cấp.

## Luật quan trọng

Không code ngay. Phải audit trước.

## Audit

- route/screen hiện có
- chức năng đang chạy
- lỗi thị giác
- lỗi UX
- lỗi mobile
- lỗi accessibility
- lỗi performance
- điểm không được phá

## Redesign mode

- `preserve`: giữ cấu trúc, nâng typography/spacing/color
- `refresh`: giữ flow, đổi layout vừa phải
- `overhaul`: làm lại mạnh, chỉ khi user yêu cầu rõ

## PASS/FAIL

FAIL nếu redesign làm mất chức năng, mất dữ liệu, phá route, xoá trạng thái quan trọng hoặc chỉ “sơn màu mới” mà không cải thiện hierarchy.

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
