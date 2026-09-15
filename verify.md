# Bảng đối chiếu — cần Liêm soi tay

Tài liệu này liệt kê các kết quả mà chương trình tính ra, để Liêm đối chiếu với lịch giấy / nguồn quen dùng. Hai bảng dưới đây được in ra tự động bằng lệnh:

```bash
pnpm run verify
```

(chạy trong thư mục `core`)

## 1. Các tháng nhuận chương trình tính ra, giai đoạn 1990–2000

Còn thiếu xác nhận riêng cho năm 1995 (xem ghi chú bên dưới bảng).

| Ngày dương lịch bắt đầu | Tháng âm lịch nhuận |
|---|---|
| 23/06/1990 | Tháng 5 nhuận năm 1990 |
| 22/04/1993 | Tháng 3 nhuận năm 1993 |
| 24/09/1995 | Tháng 8 nhuận năm 1995 |
| 24/06/1998 | Tháng 5 nhuận năm 1998 |

**Ghi chú riêng cho 1995:** chương trình tính ngày mùng 1 tháng 8 nhuận là 24/09/1995. Đáp án cũ trong bộ kiểm thử ghi là 25/09/1995. Chưa xác nhận được bên nào đúng — nghi do thời điểm trăng mới rơi sát nửa đêm, lệch nhau giữa giờ Việt Nam và giờ Trung Quốc. Cần Liêm đối chiếu với lịch giấy/nguồn quen dùng rồi báo lại.

## 2. Giờ hoàng đạo theo từng chi ngày

Chương trình đang áp dụng quy tắc "Mão Dậu gia Dần" (xem chú thích trong mã nguồn). Chưa xác nhận được với nguồn ngoài — cần Liêm soi tay bảng dưới đây.

| Chi ngày | Giờ hoàng đạo (6 giờ tốt trong ngày) |
|---|---|
| Tý | Tý, Sửu, Mão, Ngọ, Thân, Dậu |
| Sửu | Dần, Mão, Tỵ, Thân, Tuất, Hợi |
| Dần | Tý, Sửu, Thìn, Tỵ, Mùi, Tuất |
| Mão | Tý, Dần, Mão, Ngọ, Mùi, Dậu |
| Thìn | Dần, Thìn, Tỵ, Thân, Dậu, Hợi |
| Tỵ | Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi |
| Ngọ | Tý, Sửu, Mão, Ngọ, Thân, Dậu |
| Mùi | Dần, Mão, Tỵ, Thân, Tuất, Hợi |
| Thân | Tý, Sửu, Thìn, Tỵ, Mùi, Tuất |
| Dậu | Tý, Dần, Mão, Ngọ, Mùi, Dậu |
| Tuất | Dần, Thìn, Tỵ, Thân, Dậu, Hợi |
| Hợi | Sửu, Thìn, Ngọ, Mùi, Tuất, Hợi |

## Việc cần Liêm làm

Đối chiếu 2 bảng trên với nguồn quen dùng, rồi báo lại kết quả (đúng/sai và đáp án đúng nếu sai) để cập nhật bộ kiểm thử tương ứng.
