# Phase 9 — Lá số Tử Vi Đẩu Số và Bản đồ sao chiêm tinh

Hai công cụ mới, chạy hoàn toàn trên trình duyệt (không gửi ngày sinh lên máy chủ):

| Trang | Route | Engine | Giao diện |
| --- | --- | --- | --- |
| Lập lá số Tử Vi | `/la-so-tu-vi/` | `lib/tu-vi-dau-so/` | `components/tu-vi-dau-so/` |
| Bản đồ sao | `/chiem-tinh/` | `lib/chiem-tinh/` | `components/chiem-tinh/` |
| Dùng chung | — | `lib/birth/` (múi giờ, nơi sinh) | `components/birth/BirthFields.tsx` |

CSS riêng: `app/la-so.css` (tiền tố `bf-`, `ls-`, `ct-`), dùng token của `heritage.css`.
Engine được tải động (`bundle.ts`) nên JS đầu trang chỉ ~11 kB; `astronomy-engine` chỉ nằm trong chunk của `/chiem-tinh/`.

Trước Phase 9 repo **không có** module Tử Vi Đẩu Số hay chiêm tinh nào (`/tu-vi/` là tử vi hằng ngày theo con giáp, Gemini viết). Cả hai được xây mới trên engine lịch âm `@licham/core`.

## 1. Thời gian sinh (`lib/birth/time.ts`)

- Giờ đồng hồ → UTC theo cơ sở dữ liệu IANA của `Intl` (Node 22: tzdata 2026a).
- Xử lý giờ không tồn tại (nhảy giờ mùa hè, `gap`) và giờ lặp (lùi giờ, `ambiguous` → chọn lần đầu).
- Giờ chuẩn = độ lệch thấp nhất xuất hiện ở cả 12 tháng trước và 12 tháng sau (quy tắc theo mùa); việc đổi hẳn múi giờ (VN 13/6/1975) không bị coi là DST.
- Việt Nam: tzdata `Asia/Ho_Chi_Minh` theo đồng hồ Sài Gòn (+8 giai đoạn 1943–3/1945, 4/1947–7/1955, 1/1960–13/6/1975). Nơi sinh ở vĩ độ ≥ 17° Bắc trong 1/1/1960–13/6/1975 được hiệu chỉnh về +7 (miền Bắc). Giai đoạn 1947–1955 giữ theo tzdata (+8) — vùng kiểm soát khác nhau, chưa hiệu chỉnh.

## 2. Tử Vi Đẩu Số — Nam phái

Theo hệ thống Thái Thứ Lang (*Tử Vi Đẩu Số Tân Biên*, 1956). Không trộn trường phái.

**Chuẩn hóa ngày giờ** (`birth.ts`): sinh ở VN quy về UTC+7; nước ngoài dùng giờ chuẩn địa phương (bỏ DST). Tý 23:00–00:59; từ 23:00 là giờ Tý **ngày hôm sau** (cả ngày âm). Năm tính từ Tết. Tháng nhuận an như tháng chính. Không hiệu chỉnh giờ mặt trời thực.

**An sao** (`engine.ts`): Mệnh/Thân, can cung (Ngũ Hổ Độn), cục (nạp âm cung Mệnh), 14 chính tinh, Tả Hữu, Xương Khúc, Khôi Việt, Lộc Tồn, Kình Đà, Thiên Mã, Hỏa Linh, Không Kiếp, Tứ Hóa, Tuần, Triệt, vòng Tràng Sinh, Bác Sĩ, Thái Tuế (12 sao Nam phái), 35 phụ tinh khác, Mệnh chủ, Thân chủ, đại hạn, tiểu hạn.

**Vận hạn** (`van-han.ts`): tuổi mụ, đại hạn, tiểu hạn, Lưu Thái Tuế, Lưu Tang Môn, Lưu Bạch Hổ, Lưu Khốc/Hư, Lưu Lộc Tồn, Lưu Kình/Đà, Lưu Thiên Mã, Tứ Hóa theo can năm xem.

**Điểm Nam phái khác sách Trung Hoa** (ghi trong `stars.ts`):

| Sao | Nam phái (dùng ở đây) | Sách Trung Hoa / iztro |
| --- | --- | --- |
| Hỏa Tinh, Linh Tinh | Dương Nam/Âm Nữ: Hỏa thuận, Linh nghịch; Âm Nam/Dương Nữ ngược lại | cả hai thuận |
| Thiên Khôi, Thiên Việt năm Canh | Khôi Ngọ, Việt Dần | Khôi Sửu, Việt Mùi |
| Tứ Hóa năm Nhâm | Thiên Phủ hóa Khoa | Tả Phù hóa Khoa |
| Thiên Quý | từ Văn Khúc đếm **nghịch** tới ngày, lùi 1 | đếm thuận |
| Thiên Y, Thiên Giải, Địa Giải, Thiên La, Địa Võng | có | không có / an khác |

**Chưa làm** (giới hạn đã biết): độ sáng miếu/vượng/đắc/hãm (bảng Nam phái và Trung Hoa khác nhau nhiều, chưa có nguồn đối chiếu độc lập); lưu nguyệt, lưu nhật; Lưu Hà, Thiên Trù, Quốc Ấn, Đường Phù, Đẩu Quân; tùy chọn chia tháng nhuận ở ngày 15; giờ mặt trời thực.

## 3. Chiêm tinh phương Tây

- `astronomy-engine` 2.1.19 (MIT): kinh độ hoàng đạo biểu kiến (quang sai, chương động) trên hoàng đạo thật của ngày, địa tâm, hoàng đạo nhiệt đới.
- 10 thiên thể; Nút Bắc thực (quỹ đạo tức thời) trên bản đồ, Nút trung bình (Meeus 47.7) trong chi tiết.
- ASC/MC từ GAST + độ nghiêng thật; hệ nhà Placidus (lặp tới 1e-9°), Whole Sign, Equal, Porphyry. Placidus không xác định ở vùng cực → chuyển Porphyry và báo lý do.
- Góc hợp: 5 góc chính; orb 8/5/7/7/8, +2° khi có Mặt Trời/Mặt Trăng, tối đa 5° với Nút/ASC/MC; tụ/tách theo tốc độ.
- Không rõ giờ: tính theo 12:00 trưa địa phương, bỏ ASC/MC/nhà, cảnh báo sai số Mặt Trăng.
- **Chưa làm**: Chiron, Lilith, tiểu hành tinh, Fortune; góc phụ; Koch, Regiomontanus; sidereal.

## 4. Kiểm chứng

| Hạng mục | Nguồn đối chiếu | Kết quả |
| --- | --- | --- |
| An sao Tử Vi (mọi sao cùng quy tắc) | iztro 2.6.1 (MIT) — đưa thẳng ngày âm vào `byLunar` để tách khỏi khác biệt lịch VN/TQ | 300 lá số ngẫu nhiên + quét 60 hoa giáp × 12 tháng + 200 năm xem hạn trong bộ test thường; bản đầy đủ `TUVI_FULL=1` (5.000 ngẫu nhiên, 25.920 lá số quét 60 hoa giáp × 12 tháng × 12 giờ × ngày 1/15/29, 2.000 năm xem hạn) chạy 24/9/2026: 12/12 test đạt, 0 sai lệch (28,6 phút) |
| Quy tắc Nam phái khác biệt | bảng tay trong `engine.test.ts` | khớp |
| Mặt Trời, Mặt Trăng, Sao Kim, GAST | Meeus, *Astronomical Algorithms* ví dụ 25.b, 47.a, 33.a, 12.a | ≤ 0,001–0,005° |
| 10 hành tinh, ASC, MC, Nút TB | circular-natal-horoscope-js 1.1.0 (Moshier) — 300 bản đồ 1900–2100 | ≤ 0,02° (Mặt Trăng sau 2050 ≤ 0,05° do ΔT; ASC/MC ≤ 0,05°) |
| Placidus | định nghĩa hình học giải bằng chia đôi | ≤ 0,0001° (thư viện đối chiếu chỉ lặp tới 0,01 rad nên không dùng làm chuẩn cho nhà) |
| Múi giờ, DST, giờ Tý, tháng nhuận, giao thừa | test biên `birth.test.ts` | khớp |

## 5. Đồng bộ sang app Flutter

- **Fixture oracle**: `web/fixtures/tu-vi-dau-so-oracle.json` (307 lá số, gồm 7 ca biên) và `chiem-tinh-oracle.json` (80 bản đồ). Sinh lại: `pnpm --filter @licham/web run export:la-so-fixtures`.
- **Port thẳng sang Dart (thuần tính toán, không phụ thuộc)**: `lib/tu-vi-dau-so/engine.ts`, `stars.ts`, `van-han.ts`, `birth.ts` (dùng bộ đổi lịch âm sẵn có của app), `lib/chiem-tinh/engine.ts` phần hình học (ASC, MC, nhà, góc hợp).
- **Dữ liệu dùng lại nguyên văn**: `lib/tu-vi-dau-so/giai-nghia.ts`, `lib/chiem-tinh/giai-nghia.ts` (nội dung tự biên soạn), `lib/birth/places.ts` (tọa độ + múi giờ IANA).
- **Cần thay thế**: `Intl` → package `timezone` (tzdata) trong Dart; `astronomy-engine` không có bản Dart — port phần VSOP87/Mặt Trăng cần thiết sang Dart, hoặc gọi native qua FFI/kênh nền tảng (astronomy-engine có bản chính thức C, C#, Python, Kotlin).
