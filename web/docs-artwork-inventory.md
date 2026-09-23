# Kiểm kê artwork Contemporary Heritage (Phase 8B)

Checkpoint `caaef3a`, ngày 2026-09-24. Nguồn dữ liệu: `LE_LIST` (60 trang lễ), `heritage-assets.ts`, `components/heritage`, `public/heritage`. Danh sách máy đọc: [artwork-manifest.json](artwork-manifest.json) (sinh từ dữ liệu thật, mỗi ảnh một mục). Chưa tạo ảnh, chưa đổi asset hay giao diện.

## Tiến độ

- **Batch A (2026-09-24):** nhận 10 tranh lễ; **đã tích hợp 9** vào `public/heritage/le/` (tet-nguyen-dan, tet-trung-thu, tet-han-thuc, tet-doan-ngo, phat-dan, vu-lan, giang-sinh, ca-thang-tu, tet-thanh-minh); **giữ lại 1** (gio-to-hung-vuong — chờ đối chiếu kiến trúc Đền Hùng, vẫn dùng tranh chung). QA: `mock/contemporary-heritage/qa-phase8b/`.
- Còn thiếu hoặc cần sửa: **69/78**. Chưa hoàn thành toàn bộ danh sách.

## Tổng số ảnh cần làm: 78

| Nhóm | Số ảnh | Ghi chú |
|---|---|---|
| A. Site (hero trang chủ, Ngày lễ, lịch tháng/năm/ngày, làm lại hero Văn khấn) | 6 | 4 slot cần thêm vào code (home, lịch tháng, lịch năm, chi tiết ngày; hero Ngày lễ đã có slot) |
| B. Con giáp | 12 | 6 lỗi bleed (P0), 6 nâng chất lượng (P2) |
| C1. Lễ âm lịch / Tết / Phật giáo / tiết khí | 16 | 12 lễ đang dùng tranh dùng chung |
| C2. Nghỉ lễ | 5 | |
| C3. Kỷ niệm | 16 | |
| C4. Quốc tế | 7 | |
| C5. Anh hùng / nhân vật lịch sử | 16 | 15 có SVG biểu tượng, 1 ảnh thật (Hồ Chí Minh) |
| **Tổng** | **78** | P0: 8, P1: 21, P2: 49 |

Không tính: `hero/tuoi.webp`, `decor/side-left|right.webp`, logo, SVG trang trí (giữ nguyên); 5 tranh nhóm văn khấn và tranh ngày rằm (chỉ là ảnh dùng chung, sẽ được thay dần bằng tranh riêng từng lễ). Ngoài phạm vi lần này: 62 bài văn khấn hiện chưa có ảnh riêng (`/heritage/van-khan/<slug>.webp`, đang dùng ảnh nhóm), đề xuất để phase sau.

## Phát hiện chính

1. **Chưa có file `/heritage/le/*.webp` nào.** Trang lễ hiện dùng 5 tranh văn khấn dùng chung cho 12 lễ; 15 anh hùng dùng SVG biểu tượng; 1 ảnh thật (Hồ Chí Minh); còn lại 32 lễ chưa có ảnh (khối ảnh bị ẩn).
2. **Tranh dùng chung sai chủ đề:** Trung thu, Hạ nguyên, Rằm tháng Chạp, Rằm tháng Giêng đều dùng 'bàn thờ trăng'; Giỗ Tổ Hùng Vương dùng cảnh đình chùa chung, không phải Đền Hùng; Giao thừa trùng tranh Tết Nguyên đán.
3. **Bleed con giáp:** 6/12 tranh còn mảnh tranh cạnh ở mép trái (Sửu, Dần, Mão, Thìn, Tỵ, Dậu), đang che tạm bằng `clip-path` trong `heritage.css`. Cả 12 phóng từ ô gốc ~256×320 lên 800×800, mềm khi phóng to.
4. **Hero:** `hero/le.webp` thiếu (slot có, file không) nên hero Ngày lễ đang trống; `hero/van-khan.webp` lệch spec (1200×560 so với 460) và có dải mờ ở đáy, vệt trắng mép trái; trang chủ, lịch tháng, lịch năm, chi tiết ngày chưa có slot ảnh.
5. **Ảnh Hồ Chí Minh** `/le/ho-chi-minh-1946.jpg` chỉ 282×383, hiển thị hero sẽ mờ. Cần bản gốc lớn hơn từ Wikimedia Commons và xác minh giấy phép.
6. **Phong cách chưa đồng nhất:** con giáp là tranh khắc màu cổ, hero là ink-wash, tranh nhóm văn khấn là ảnh minh họa chân thực (bàn thờ). Cần chốt một style guide cho lô ảnh mới.

## Kích thước và quy ước

- Ảnh lễ: `/heritage/le/<slug>.webp`, 4:3, 1600×1200, RGB, ≤ 250 KB. Code đã ưu tiên file này (`leImage()`), nên thả file là hiển thị, kể cả thay SVG anh hùng (`leArt()` ưu tiên ảnh trước SVG). Cần chạy `pnpm --filter @licham/web assets:scan` sau khi thêm file.
- Hero: 1200×460, mờ dần sang trái (khuyến nghị vẽ 2400×920). Con giáp: 1024×1024 RGBA nền trong suốt, không viền/mảnh tranh khác.
- Crop hero và thẻ cho ảnh lễ chưa kiểm tra trên giao diện, cần xem lại khi tích hợp.

## Quy tắc tranh nhân vật lịch sử

- Không tạo chân dung khuôn mặt cụ thể rồi trình bày như ảnh/tranh lịch sử xác thực. Với các vị vua, anh hùng cổ (Hai Bà Trưng, Bà Triệu, Ngô Quyền, Đinh Tiên Hoàng, Lê Đại Hành, Lê Lợi, Lê Lai, Quang Trung, Nguyễn Trãi, Trần Hưng Đạo, Trần Nhân Tông, Nguyễn Trung Trực, Phùng Hưng) không có chân dung đương thời đáng tin: dùng biểu tượng, cảnh, di tích, hiện vật, có chú thích 'Tranh minh họa của licham.app'.
- Nhân vật hiện đại: chỉ dùng ảnh thật khi xác minh được nguồn và giấy phép (Hồ Chí Minh: ảnh 1946 Wikimedia, phạm vi công cộng). Võ Nguyên Giáp, Võ Thị Sáu: chưa xác minh bản quyền ảnh nên dùng tranh biểu tượng, không vẽ lại khuôn mặt.
- Mỗi mục anh hùng trong manifest có `figure`, `reference_to_verify` (tư liệu tạo hình cần đối chiếu) và `portrait_policy`. Cột đó là gợi ý phạm vi tra cứu, cần người kiểm chứng nguồn cụ thể trước khi vẽ.

## Manifest

Trạng thái: 'tạm' là đang dùng tranh dùng chung; 'thiếu slot' cần thêm code sau. P0 = lỗi hiển thị/không có; P1 = trang phổ biến hoặc sai chủ đề; P2 = còn lại.

### A. Trang chủ, hero danh mục, lịch (site)

| Slug | Chủ đề | Nội dung tranh | Đường dẫn đích | Kích thước | Hiện tại | Ưu tiên |
|---|---|---|---|---|---|---|
| `home` | Trang chủ | Hero trang chủ: núi, chùa, mặt trời đỏ, ink-wash, chừa trống bên trái cho chữ | `/heritage/hero/home.webp` | 1200×460 (≈2.6:1), RGB, mờ dần sang trái; khuyến nghị vẽ 2400×920 | thiếu slot: trang chủ chưa có art, cần thêm HERITAGE_SLOTS.heroHome | P0 |
| `le` | Hero danh mục Ngày lễ & tiết khí | Đèn lồng, sen, núi (đúng mô tả slot heroLe) | `/heritage/hero/le.webp` | 1200×460 (≈2.6:1), RGB, mờ dần sang trái; khuyến nghị vẽ 2400×920 | thiếu file (slot heroLe đã có trong code nên khối hero đang bị ẩn) | P0 |
| `lich-thang` | Lịch tháng | Trăng khuyết và hoa, ink-wash nền nhạt; một ảnh dùng chung cho mọi tháng | `/heritage/hero/lich-thang.webp` | 1200×460 (≈2.6:1), RGB, mờ dần sang trái; khuyến nghị vẽ 2400×920 | thiếu slot | P1 |
| `lich-nam` | Lịch năm | Vòng thời gian, mặt trời đỏ, ink-wash; không lặp tranh riêng từng con giáp | `/heritage/hero/lich-nam.webp` | 1200×460 (≈2.6:1), RGB, mờ dần sang trái; khuyến nghị vẽ 2400×920 | thiếu slot | P1 |
| `lich-ngay` | Chi tiết ngày | Tờ lịch bóc, bàn thờ nhỏ, nắng sớm — nhẹ, không chiếm chỗ nội dung | `/heritage/hero/lich-ngay.webp` | 1200×460 (≈2.6:1), RGB, mờ dần sang trái; khuyến nghị vẽ 2400×920 | thiếu slot | P1 |
| `van-khan` | Hero danh mục Văn khấn | Đình, tùng, núi, sen (đang có) | `/heritage/hero/van-khan.webp` | spec 1200×460, file thực 1200×560; đáy ảnh có dải mờ bệt, mép trái có vệt trắng | có nhưng lệch spec và lỗi mép/đáy — nên làm lại | P2 |
| `tuoi` | Hero danh mục Xem tuổi | Núi, chùa, sen hoa đỏ (đang có) | `/heritage/hero/tuoi.webp` | 1200×460 RGB | đã có, đúng chủ đề | — |
| `side-left` | Tranh lề trái (mọi trang ChShell) | Đình, tùng | `/heritage/decor/side-left.webp` | 480×1600 RGBA | đã có | — |
| `side-right` | Tranh lề phải | Núi, sen, hạc | `/heritage/decor/side-right.webp` | 480×1600 RGBA | đã có | — |

### B. Con giáp (12)

| Slug | Chủ đề | Nội dung tranh | Đường dẫn đích | Kích thước | Hiện tại | Ưu tiên |
|---|---|---|---|---|---|---|
| `ty` | Tý — Chuột | Chuột, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/ty.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | dùng được nhưng độ phân giải gốc thấp (cắt từ bảng tranh), mềm khi phóng to | P2 |
| `suu` | Sửu — Trâu | Trâu, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/suu.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | lỗi bleed: còn mảnh tranh bên cạnh ở mép trái, đang che tạm bằng clip-path | P0 |
| `dan` | Dần — Hổ | Hổ, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/dan.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | lỗi bleed: còn mảnh tranh bên cạnh ở mép trái, đang che tạm bằng clip-path | P0 |
| `mao` | Mão — Mèo | Mèo, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/mao.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | lỗi bleed: còn mảnh tranh bên cạnh ở mép trái, đang che tạm bằng clip-path | P0 |
| `thin` | Thìn — Rồng | Rồng, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/thin.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | lỗi bleed: còn mảnh tranh bên cạnh ở mép trái, đang che tạm bằng clip-path | P0 |
| `ty-ran` | Tỵ — Rắn | Rắn, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/ty-ran.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | lỗi bleed: còn mảnh tranh bên cạnh ở mép trái, đang che tạm bằng clip-path | P0 |
| `ngo` | Ngọ — Ngựa | Ngựa, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/ngo.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | dùng được nhưng độ phân giải gốc thấp (cắt từ bảng tranh), mềm khi phóng to | P2 |
| `mui` | Mùi — Dê | Dê, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/mui.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | dùng được nhưng độ phân giải gốc thấp (cắt từ bảng tranh), mềm khi phóng to | P2 |
| `than` | Thân — Khỉ | Khỉ, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/than.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | dùng được nhưng độ phân giải gốc thấp (cắt từ bảng tranh), mềm khi phóng to | P2 |
| `dau` | Dậu — Gà | Gà, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/dau.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | lỗi bleed: còn mảnh tranh bên cạnh ở mép trái, đang che tạm bằng clip-path | P0 |
| `tuat` | Tuất — Chó | Chó, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/tuat.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | dùng được nhưng độ phân giải gốc thấp (cắt từ bảng tranh), mềm khi phóng to | P2 |
| `hoi` | Hợi — Lợn | Lợn, tranh khắc màu cổ (mặt trời đỏ sau lưng, đá, cây theo con vật), cùng bộ với các tranh còn lại | `/heritage/con-giap/hoi.webp` | 1024×1024 vẽ gốc, RGBA nền trong suốt (hiện 800×800 phóng từ ô gốc ~256×320) | dùng được nhưng độ phân giải gốc thấp (cắt từ bảng tranh), mềm khi phóng to | P2 |

### C1. Lễ âm lịch, Tết, Phật giáo, tiết khí (16)

| Slug | Chủ đề | Nội dung tranh | Đường dẫn đích | Kích thước | Hiện tại | Ưu tiên |
|---|---|---|---|---|---|---|
| `tet-nguyen-dan` | Tết Nguyên đán | Bàn thờ ngày Tết: mâm ngũ quả, cành đào/mai, bánh chưng, câu đối đỏ, khói hương | `/heritage/le/tet-nguyen-dan.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P1 |
| `giao-thua` | Giao thừa | Khoảnh khắc giao thừa: cảnh đêm, mâm cúng ngoài trời, pháo hoa xa, đèn đỏ — khác cảnh Tết ngày | `/heritage/le/giao-thua.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | tạm: đang dùng tranh dùng chung /heritage/van-khan/nhom/le-tet.webp, chưa có tranh riêng | P1 |
| `via-than-tai` | Ngày vía Thần Tài | Bàn thờ Thần Tài – Thổ Địa nhỏ, vàng, hoa, trái cây, đèn — không vẽ chân dung người thật | `/heritage/le/via-than-tai.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | tạm: đang dùng tranh dùng chung /heritage/van-khan/nhom/trong-nha.webp, chưa có tranh riêng | P1 |
| `ram-thang-gieng` | Rằm tháng Giêng | Rằm tháng Giêng (Nguyên tiêu): trăng tròn đầu năm, đèn hoa đăng, mâm cúng, chùa | `/heritage/le/ram-thang-gieng.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | tạm: đang dùng tranh dùng chung /heritage/van-khan/mung-mot-ngay-ram.webp, chưa có tranh riêng | P1 |
| `via-quan-am` | Vía Quan Thế Âm Bồ Tát | Quan Thế Âm Bồ Tát: bàn thờ/tượng theo mẫu tượng thờ Việt, bình dương liễu, sen — không tự bịa tôn tượng | `/heritage/le/via-quan-am.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | tạm: đang dùng tranh dùng chung /heritage/van-khan/nhom/cau-an.webp, chưa có tranh riêng | P2 |
| `tet-han-thuc` | Tết Hàn thực | Tết Hàn thực: bánh trôi, bánh chay trên mâm nhỏ, nền xuân nhạt | `/heritage/le/tet-han-thuc.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P2 |
| `gio-to-hung-vuong` | Giỗ Tổ Hùng Vương | Đền Hùng: núi Nghĩa Lĩnh, bậc thang, cổng đền, mâm bánh chưng – bánh giầy | `/heritage/le/gio-to-hung-vuong.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | cần sửa: có tranh Batch A nhưng GIỮ LẠI chờ đối chiếu kiến trúc Đền Hùng; chưa đưa lên site, vẫn dùng tranh chung di-le | P1 |
| `phat-dan` | Lễ Phật đản | Lễ Phật đản: sen, đèn hoa đăng, chùa, lễ tắm Phật — không tự bịa tôn tượng | `/heritage/le/phat-dan.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P1 |
| `tet-doan-ngo` | Tết Đoan ngọ | Tết Đoan ngọ: rượu nếp, bánh tro, trái cây mùa hè, lá ngải | `/heritage/le/tet-doan-ngo.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P2 |
| `vu-lan` | Lễ Vu Lan (Rằm tháng Bảy) | Vu Lan: bông hồng cài áo, chùa, đèn lồng, mâm cúng chay, hoa sen — chủ đề báo hiếu | `/heritage/le/vu-lan.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24); cần hoàn thiện chi tiết bông hồng | P1 |
| `tet-trung-thu` | Tết Trung thu | Trung thu: đèn ông sao, đèn kéo quân, bánh nướng – bánh dẻo, trăng rằm, mâm cỗ | `/heritage/le/tet-trung-thu.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P1 |
| `tet-trung-cuu` | Tết Trùng cửu | Trùng cửu: hoa cúc, rượu cúc, lên núi cao, bánh cúc | `/heritage/le/tet-trung-cuu.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `tet-ha-nguyen` | Tết Hạ nguyên (Rằm tháng Mười) | Rằm tháng Mười: ruộng lúa sau gặt, mâm cơm mới, trăng, bàn thờ tạ mùa | `/heritage/le/tet-ha-nguyen.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | tạm: đang dùng tranh dùng chung /heritage/van-khan/mung-mot-ngay-ram.webp, chưa có tranh riêng | P2 |
| `ram-thang-chap` | Rằm tháng Chạp | Rằm tháng Chạp: cuối năm, bàn thờ chuẩn bị Tết, hoa quả, trăng | `/heritage/le/ram-thang-chap.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | tạm: đang dùng tranh dùng chung /heritage/van-khan/mung-mot-ngay-ram.webp, chưa có tranh riêng | P2 |
| `ong-cong-ong-tao` | Ông Công ông Táo | Ông Công ông Táo: cá chép cưỡi mây, mũ ba chiếc, bếp, ban thờ Táo quân — theo tranh dân gian, không vẽ chân dung | `/heritage/le/ong-cong-ong-tao.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | tạm: đang dùng tranh dùng chung /heritage/van-khan/nhom/trong-nha.webp, chưa có tranh riêng | P1 |
| `tet-thanh-minh` | Tết Thanh minh | Thanh minh: tảo mộ, hoa cúc, nén hương, đồng xanh đầu xuân — trang nghiêm, không có người thật | `/heritage/le/tet-thanh-minh.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P2 |

### C2. Ngày nghỉ lễ, Tết dương lịch (5)

| Slug | Chủ đề | Nội dung tranh | Đường dẫn đích | Kích thước | Hiện tại | Ưu tiên |
|---|---|---|---|---|---|---|
| `tet-duong-lich` | Tết Dương lịch | Đầu năm dương lịch: pháo hoa nhẹ, lịch tờ, hoa, đô thị Việt Nam về đêm | `/heritage/le/tet-duong-lich.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P1 |
| `ngay-giai-phong-mien-nam` | Ngày Giải phóng miền Nam, thống nhất đất nước | 30/4: biểu tượng hòa bình – thống nhất: cờ Tổ quốc, hoa, bản đồ chữ S; không dựng cảnh chiến sự như ảnh lịch sử | `/heritage/le/ngay-giai-phong-mien-nam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P1 |
| `quoc-te-lao-dong` | Ngày Quốc tế Lao động | 1/5: bàn tay lao động, bánh răng, lúa, công trường — tranh biểu tượng | `/heritage/le/quoc-te-lao-dong.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P1 |
| `quoc-khanh` | Quốc khánh nước Cộng hòa xã hội chủ nghĩa Việt Nam | 2/9: Quảng trường Ba Đình, cờ đỏ sao vàng, hoa sen; không vẽ lại chân dung Bác | `/heritage/le/quoc-khanh.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P1 |
| `ngay-van-hoa-viet-nam` | Ngày Văn hóa Việt Nam | 24/11: hoa văn trống đồng, Văn Miếu, áo dài, nhạc cụ dân tộc | `/heritage/le/ngay-van-hoa-viet-nam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |

### C3. Ngày kỷ niệm (16)

| Slug | Chủ đề | Nội dung tranh | Đường dẫn đích | Kích thước | Hiện tại | Ưu tiên |
|---|---|---|---|---|---|---|
| `ngay-hoc-sinh-sinh-vien` | Ngày truyền thống học sinh, sinh viên Việt Nam | 9/1: sách, bút, cổng trường, học sinh cách điệu | `/heritage/le/ngay-hoc-sinh-sinh-vien.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `thanh-lap-dang` | Ngày thành lập Đảng Cộng sản Việt Nam | 3/2: cờ Đảng, hoa, biểu tượng theo mẫu chính thức | `/heritage/le/thanh-lap-dang.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `thay-thuoc-viet-nam` | Ngày Thầy thuốc Việt Nam | 27/2: gậy rắn y học, áo blouse, thảo dược, ống nghe | `/heritage/le/thay-thuoc-viet-nam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `quoc-te-phu-nu` | Ngày Quốc tế Phụ nữ | 8/3: hoa hồng/mimosa, áo dài, phụ nữ nhiều thế hệ cách điệu | `/heritage/le/quoc-te-phu-nu.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `thanh-lap-doan` | Ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh | 26/3: cờ Đoàn, thanh niên tình nguyện, áo xanh | `/heritage/le/thanh-lap-doan.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `chien-thang-dien-bien-phu` | Ngày Chiến thắng Điện Biên Phủ | 7/5: cánh đồng Mường Thanh, đồi A1, cờ chiến thắng — dựng theo địa hình/tư liệu, không giả ảnh chiến trường | `/heritage/le/chien-thang-dien-bien-phu.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `quoc-te-thieu-nhi` | Ngày Quốc tế Thiếu nhi | 1/6: trẻ em, diều, bóng bay, đèn lồng | `/heritage/le/quoc-te-thieu-nhi.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `bao-chi-cach-mang` | Ngày Báo chí Cách mạng Việt Nam | 21/6: máy chữ, tờ báo, bút, máy ảnh | `/heritage/le/bao-chi-cach-mang.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `gia-dinh-viet-nam` | Ngày Gia đình Việt Nam | 28/6: bữa cơm gia đình ba thế hệ, mái nhà, bàn thờ | `/heritage/le/gia-dinh-viet-nam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `thuong-binh-liet-si` | Ngày Thương binh – Liệt sĩ | 27/7: nghĩa trang liệt sĩ, nén hương, hoa cúc trắng, cờ — trang nghiêm | `/heritage/le/thuong-binh-liet-si.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `cach-mang-thang-tam` | Ngày Cách mạng tháng Tám thành công | 19/8: cờ đỏ sao vàng, phố Hà Nội mùa thu, hoa sữa — biểu tượng | `/heritage/le/cach-mang-thang-tam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `giai-phong-thu-do` | Ngày Giải phóng Thủ đô | 10/10: Cửa Ô/Hồ Gươm/Cột cờ Hà Nội, hoa cúc, cờ | `/heritage/le/giai-phong-thu-do.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `doanh-nhan-viet-nam` | Ngày Doanh nhân Việt Nam | 13/10: tòa nhà cách điệu, bản đồ, chiếc cặp — tranh biểu tượng | `/heritage/le/doanh-nhan-viet-nam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `phu-nu-viet-nam` | Ngày Phụ nữ Việt Nam | 20/10: hoa sen, áo dài, phụ nữ Việt cách điệu | `/heritage/le/phu-nu-viet-nam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `nha-giao-viet-nam` | Ngày Nhà giáo Việt Nam | 20/11: bảng đen, hoa, sách, thầy trò — tranh biểu tượng | `/heritage/le/nha-giao-viet-nam.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `quan-doi-nhan-dan` | Ngày thành lập Quân đội nhân dân Việt Nam | 22/12: mũ cối, ngôi sao, hoa, cờ — biểu tượng | `/heritage/le/quan-doi-nhan-dan.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |

### C4. Ngày quốc tế, Giáng sinh, Valentine, Cá tháng Tư, Halloween (7)

| Slug | Chủ đề | Nội dung tranh | Đường dẫn đích | Kích thước | Hiện tại | Ưu tiên |
|---|---|---|---|---|---|---|
| `valentine` | Ngày Valentine | 14/2: hoa hồng, socola, thiệp, ánh đèn ấm | `/heritage/le/valentine.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P1 |
| `valentine-trang` | Ngày Valentine Trắng | 14/3: kẹo/bánh trắng, hoa trắng, hộp quà | `/heritage/le/valentine-trang.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `ca-thang-tu` | Ngày Cá tháng Tư | 1/4: mặt nạ hài hước, hộp quà bất ngờ, cá giấy — phong cách vui | `/heritage/le/ca-thang-tu.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P2 |
| `ngay-cua-me` | Ngày của Mẹ | Chủ nhật thứ 2 tháng 5: hoa cẩm chướng, mẹ và con, thiệp | `/heritage/le/ngay-cua-me.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P1 |
| `ngay-cua-cha` | Ngày của Cha | Chủ nhật thứ 3 tháng 6: cha và con, cà vạt/đồng hồ, thiệp | `/heritage/le/ngay-cua-cha.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P2 |
| `halloween` | Lễ hội Halloween | 31/10: bí ngô, đèn lồng, mèo đen, nền tối — vui, an toàn cho trẻ em | `/heritage/le/halloween.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | chưa có tranh, khối ảnh đang ẩn | P1 |
| `giang-sinh` | Lễ Giáng sinh | 25/12: cây thông, ngôi sao, quà, tuyết nhẹ, đèn — Giáng sinh ở Việt Nam | `/heritage/le/giang-sinh.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | đã tích hợp (Batch A, 2026-09-24) | P1 |

### C5. Anh hùng dân tộc và nhân vật lịch sử (16)

| Slug | Chủ đề | Nội dung tranh | Đường dẫn đích | Kích thước | Hiện tại | Ưu tiên |
|---|---|---|---|---|---|---|
| `gio-hai-ba-trung` | Hai Bà Trưng | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: voi chiến, cờ khởi nghĩa, cảnh Mê Linh/đền Hạ Lôi | `/heritage/le/gio-hai-ba-trung.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-ba-trieu` | Bà Triệu | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: voi, núi Nưa (Thanh Hóa), áo giáp vàng theo truyền thuyết | `/heritage/le/gio-ba-trieu.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-ngo-quyen` | Ngô Quyền | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: cọc gỗ ngầm sông Bạch Đằng năm 938, thuyền, thủy triều | `/heritage/le/gio-ngo-quyen.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-phung-hung` | Phùng Hưng | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Đường Lâm, đền thờ, cờ khởi nghĩa | `/heritage/le/gio-phung-hung.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `le-hoi-hoa-lu` | Vua Đinh Tiên Hoàng | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: cố đô Hoa Lư, núi đá vôi, đền vua Đinh, cờ lau | `/heritage/le/le-hoi-hoa-lu.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-le-dai-hanh` | Vua Lê Đại Hành | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: cảnh Hoa Lư, thuyền chiến, đền vua Lê | `/heritage/le/gio-le-dai-hanh.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-quang-trung` | Hoàng đế Quang Trung | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Gò Đống Đa, voi trận, cờ áo đỏ, mùa xuân 1789 | `/heritage/le/gio-quang-trung.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-nguyen-trai` | Nguyễn Trãi | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Bình Ngô đại cáo (cuộn thư), Côn Sơn, tùng | `/heritage/le/gio-nguyen-trai.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-duc-thanh-tran` | Trần Hưng Đạo | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Bạch Đằng, thuyền, cờ, đền Kiếp Bạc | `/heritage/le/gio-duc-thanh-tran.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-le-lai` | Trung Túc Vương Lê Lai | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Lam Sơn, áo bào thế thân, trống trận | `/heritage/le/gio-le-lai.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-le-loi` | Vua Lê Thái Tổ (Lê Lợi) | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Lam Sơn, kiếm, hồ Hoàn Kiếm truyền thuyết, cờ nghĩa | `/heritage/le/gio-le-loi.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-nguyen-trung-truc` | Nguyễn Trung Trực | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: sông nước Nam Bộ, đốt tàu Esperance 1861 (Nhật Tảo), Rạch Giá | `/heritage/le/gio-nguyen-trung-truc.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-tran-nhan-tong` | Phật hoàng Trần Nhân Tông | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Yên Tử, chùa, rừng trúc, tháp | `/heritage/le/gio-tran-nhan-tong.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `ngay-sinh-bac-ho` | Chủ tịch Hồ Chí Minh | Giữ ảnh thật; tìm bản gốc độ phân giải cao. Nếu không có nguồn hợp lệ: tranh biểu tượng (Quảng trường Ba Đình, hoa sen, Nhà sàn), không vẽ lại chân dung | `/heritage/le/ngay-sinh-bac-ho.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | ảnh thật 1946 độ phân giải thấp (282×383), phóng lớn sẽ mờ | P1 |
| `ngay-sinh-dai-tuong-vo-nguyen-giap` | Đại tướng Võ Nguyên Giáp | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: đồi núi Điện Biên Phủ, kéo pháo, cờ | `/heritage/le/ngay-sinh-dai-tuong-vo-nguyen-giap.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |
| `gio-vo-thi-sau` | Anh hùng Võ Thị Sáu | Tranh minh họa biểu tượng/cảnh, không vẽ chân dung như ảnh thật: Côn Đảo, hoa, biển, đất Đất Đỏ (Bà Rịa) | `/heritage/le/gio-vo-thi-sau.webp` | 1600×1200 (4:3), RGB, webp ≤ 250 KB | có minh họa SVG biểu tượng (components/LeIllustration.tsx), chưa có tranh | P2 |

Tư liệu đối chiếu và chính sách chân dung:

| Nhân vật | Tư liệu cần đối chiếu | Chính sách |
|---|---|---|
| Trưng Trắc, Trưng Nhị | Đại Việt sử ký toàn thư; Hậu Hán thư; kiến trúc đền Hạ Lôi, đền Đồng Nhân | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Triệu Thị Trinh (Bà Triệu) | Đại Việt sử ký toàn thư; tư liệu di tích núi Nưa, đền Bà Triệu | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Ngô Quyền | Đại Việt sử ký toàn thư; kết quả khảo cổ bãi cọc Bạch Đằng | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Phùng Hưng (Bố Cái Đại Vương) | Đại Việt sử ký toàn thư; tư liệu đền Đường Lâm | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Vua Đinh Tiên Hoàng | Đại Việt sử ký toàn thư; kiến trúc/khảo cổ Hoa Lư | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Vua Lê Đại Hành | Đại Việt sử ký toàn thư; tư liệu đền Lê (Ninh Bình) | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Hoàng đế Quang Trung (Nguyễn Huệ) | Sử liệu Tây Sơn; tư liệu Gò Đống Đa; bảo tàng Quang Trung | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Nguyễn Trãi | Đại Việt sử ký toàn thư; Bình Ngô đại cáo; di tích Côn Sơn | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Trần Hưng Đạo (Hưng Đạo Đại Vương) | Đại Việt sử ký toàn thư; Hịch tướng sĩ; kiến trúc đền Kiếp Bạc | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Lê Lai | Đại Việt sử ký toàn thư; tư liệu Lam Sơn (Thanh Hóa) | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Vua Lê Thái Tổ (Lê Lợi) | Đại Việt sử ký toàn thư; Lam Sơn thực lục; di tích Lam Kinh | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Nguyễn Trung Trực | Sử liệu khởi nghĩa Nhật Tảo; di tích đền Nguyễn Trung Trực (Kiên Giang) | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Phật hoàng Trần Nhân Tông | Đại Việt sử ký toàn thư; tư liệu Thiền phái Trúc Lâm; di tích Yên Tử | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Chủ tịch Hồ Chí Minh | Wikimedia Commons: tìm bản gốc độ phân giải cao, xác minh giấy phép/nguồn, ghi công đầy đủ | Ảnh thật; không AI, không vẽ lại khuôn mặt |
| Đại tướng Võ Nguyên Giáp | Tư liệu chiến dịch Điện Biên Phủ; không dùng ảnh khi chưa xác minh bản quyền | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |
| Anh hùng Võ Thị Sáu | Tư liệu Bảo tàng Bà Rịa–Vũng Tàu, di tích Côn Đảo; không dùng ảnh khi chưa xác minh bản quyền | Không tạo khuôn mặt cụ thể trình bày như xác thực; chỉ biểu tượng, cảnh, di tích |

### Đã có và giữ nguyên

- `/heritage/hero/tuoi.webp`: Hero danh mục Xem tuổi (/heritage/hero/tuoi.webp 1200×460 149 KB)
- `/heritage/decor/side-left.webp`: Tranh lề trái (mọi trang ChShell) (475 KB)
- `/heritage/decor/side-right.webp`: Tranh lề phải (379 KB)
- `/heritage/brand/logo-seal.svg`, `/heritage/decor/scripture-corner.svg`, 5 tranh `van-khan/nhom/*.webp` và `van-khan/mung-mot-ngay-ram.webp` (1600×1200): ảnh dùng chung của văn khấn, giữ.

## Thứ tự làm đề xuất

1. P0 (8): 6 con giáp bị bleed, hero Ngày lễ, hero trang chủ.
2. P1 (21): hero lịch tháng/năm/ngày; 9 lễ Tết–Phật giáo–dân gian đang dùng tranh chung sai/nhạt; 4 nghỉ lễ lớn (Tết dương, 30/4, 1/5, 2/9); Giáng sinh, Valentine, Halloween, Ngày của Mẹ; ảnh Hồ Chí Minh độ phân giải cao.
3. P2 (49): con giáp còn lại (nâng chất lượng), hero Văn khấn, 7 lễ âm lịch còn lại, Ngày Văn hóa, 16 kỷ niệm, 3 quốc tế, 15 anh hùng.

Mỗi lô nên duyệt thử 4–6 ảnh để chốt style trước khi làm hàng loạt.
