# Kiểm chứng nội dung 24 tiết khí (`web/lib/tiet-khi.ts`)

Ngày: 25/9/2026 · Nhánh `content/tiet-khi-kiem-chung` (từ `main` @ `fccbea0`).

## Nguồn đã dùng

- Đài Thiên văn Hồng Kông (HKO), [The 24 Solar Terms](https://www.hko.gov.hk/en/gts/time/24solarterms.htm) — tên, kinh độ Mặt Trời, phân loại tiết/trung khí, ghi chú hệ tiết khí phản ánh khí hậu trung nguyên Trung Quốc thời cổ.
- Wikipedia tiếng Việt: bài [Tiết khí](https://vi.wikipedia.org/wiki/Ti%E1%BA%BFt_kh%C3%AD) và 24 bài riêng từng tiết — ngày thường gặp, ý nghĩa “đối với vùng Trung Hoa cổ đại”, liên hệ miền Bắc Việt Nam; mục “Tiểu tuyết, Đại tuyết tại Việt Nam”.
- Wikipedia tiếng Việt: [Khí hậu Việt Nam](https://vi.wikipedia.org/wiki/Kh%C3%AD_h%E1%BA%ADu_Vi%E1%BB%87t_Nam) — gió mùa đông bắc, mưa phùn nửa sau mùa đông, miền Nam hai mùa, bão Biển Đông.

## Kết quả đối chiếu phần đã đúng

- Tên gọi, thứ tự (bắt đầu Lập xuân 315°), kinh độ 24 tiết: **đúng**, khớp HKO và Wikipedia.
- Phân loại trung khí (kinh độ chia hết cho 30°) / tiết: **đúng** (HKO: 12 major + 12 minor).
- Ngày bắt đầu: tính từ lõi lịch, không thay đổi. Thuật toán, artwork, giao diện chung không sửa.

## Thay đổi cấu trúc

- `moTa` (trộn lịch pháp + mùa vụ, nhiều câu không nguồn) tách thành `dongA` (ý nghĩa theo lịch pháp Đông Á) và `vietNam` (chỉ khi có nguồn, nêu rõ vùng).
- Thêm `han` (chữ Hán), `tenAnh` (tên HKO), `nguon` (danh sách nguồn từng tiết).
- Trang `/tiet-khi/<slug>/`: hiển thị chữ Hán + tên tiếng Anh, hai đoạn “Theo lịch pháp Đông Á” / “Ở Việt Nam”, khối “Lưu ý về khí hậu”, mục “Nguồn tham khảo”.

## Bảng kiểm kê 24 tiết

| # | Tiết | Chữ Hán · HKO | Kinh độ | Nội dung cũ (moTa) | Nội dung mới | Thay đổi |
|---|---|---|---|---|---|---|
| 1 | Lập xuân | 立春 · Spring Commences | 315° | Tiết đầu tiên của năm theo nông lịch, thường rơi quanh Tết Nguyên đán. Trời còn lạnh nhưng ấm dần, cây cối đâm chồi, nhà nông chuẩn bị vụ chiêm xuân. | Bắt đầu mùa xuân. Trong hệ tiết khí, mỗi mùa mở đầu bằng một tiết có chữ “Lập” (Lập xuân, Lập hạ, Lập thu, Lập đông). **VN:** Ở miền Bắc (từ đèo Hải Vân trở ra), từ khoảng thời gian này thường bắt đầu có mưa phùn do giao thời giữa gió đông bắc và gió đông nam, độ ẩm tăng cao, dễ gây hiện tượng nồm. | Bỏ “thường rơi quanh Tết Nguyên đán”, “nhà nông chuẩn bị vụ chiêm xuân” (không có nguồn). Thêm mưa phùn, nồm ở miền Bắc (Wikipedia: Lập xuân). |
| 2 | Vũ thủy | 雨水 · Spring Showers | 330° | Mưa phùn, độ ẩm cao; ruộng được cày bừa, gieo mạ và cấy lúa chiêm xuân. | Mưa ẩm. **VN:** Ở miền Bắc, nửa sau mùa đông thường có nhiều ngày nhiều mây và mưa phùn. | Bỏ lịch cày bừa, gieo mạ, cấy lúa (không có nguồn); giữ mưa phùn, ghi rõ miền Bắc (Khí hậu Việt Nam). |
| 3 | Kinh trập | 驚蟄 · Insects Waken | 345° | Bắt đầu có sấm xuân, côn trùng và sâu bệnh hoạt động trở lại; cần chăm sóc, phòng trừ sâu cho lúa và hoa màu. | Sâu nở — côn trùng ngủ đông thức giấc. | Bỏ “bắt đầu có sấm xuân” và lời khuyên phòng sâu (không có nguồn); giữ nghĩa “sâu nở” (Wikipedia, HKO: Insects Waken). |
| 4 | Xuân phân | 春分 · Vernal Equinox | 0° | Mặt Trời qua điểm xuân phân (kinh độ 0°). Thời tiết ấm áp, cây cối xanh tốt. | Mặt Trời qua điểm xuân phân (kinh độ 0°); ngày và đêm dài bằng nhau. Kinh độ của các tiết khác được tính từ điểm này. | Bỏ “thời tiết ấm áp, cây cối xanh tốt” (khái quát không nguồn); thêm ngày = đêm (HKO). |
| 5 | Thanh minh | 清明 · Bright and Clear | 15° | Khí trời mát mẻ, trong lành. Đây cũng là dịp tảo mộ, sửa sang mồ mả tổ tiên (Tết Thanh minh). | Trời trong sáng. Tiết này gắn với Tết Thanh minh, dịp tảo mộ và đi đạp thanh. **VN:** Ở miền Bắc, gió mùa đông bắc đã yếu, gió đông nam mạnh dần lên và mưa phùn gần như chấm dứt. | Giữ tảo mộ (Wikipedia: Thanh minh); thêm diễn biến gió mùa, mưa phùn chấm dứt ở miền Bắc. |
| 6 | Cốc vũ | 穀雨 · Corn Rain | 30° | Mưa nhiều hơn, thuận lợi cho lúa chiêm xuân đẻ nhánh và hoa màu phát triển. | Mưa rào — mưa có lợi cho ngũ cốc. | Bỏ lúa đẻ nhánh (không nguồn). |
| 7 | Lập hạ | 立夏 · Summer Commences | 45° | Nắng nóng tăng dần, sen bắt đầu nở; lúa chiêm xuân vào giai đoạn làm đòng. | Bắt đầu mùa hè theo lịch pháp. | Bỏ “sen bắt đầu nở”, “lúa làm đòng” (không nguồn). |
| 8 | Tiểu mãn | 小滿 · Corn Forms | 60° | Nắng nóng, mưa rào mùa hạ bắt đầu; lúa chiêm xuân chắc hạt dần, chuẩn bị thu hoạch. | Hạt ngũ cốc bắt đầu hình thành. Wikipedia tiếng Việt giải nghĩa tiết này là “lũ nhỏ, duối vàng”. | Bỏ lịch thu hoạch lúa (không nguồn); nêu cả nghĩa HKO (Corn Forms) và cách giải nghĩa “lũ nhỏ, duối vàng” của Wikipedia tiếng Việt. |
| 9 | Mang chủng | 芒種 · Corn on Ear | 75° | Thu hoạch lúa chiêm xuân và chuẩn bị gieo mạ, cấy vụ mùa. | Ngũ cốc trổ bông. **VN:** Theo kinh nghiệm của nhà nông Việt Nam, đây còn là lúc thấy chòm sao Tua Rua (trong chòm Kim Ngưu) mọc. | Bỏ lịch gặt/cấy (không nguồn); thêm nghĩa “ngũ cốc trổ bông” và kinh nghiệm chòm sao Tua Rua (Wikipedia). |
| 10 | Hạ chí | 夏至 · Summer Solstice | 90° | Mặt Trời ở kinh độ 90°, ban ngày dài nhất. Nắng nóng gay gắt xen mưa rào. | Mặt Trời ở kinh độ 90°; ở Bắc bán cầu, đây là ngày có ban ngày dài nhất năm. | Bỏ “nắng nóng gay gắt xen mưa rào” (khái quát không nguồn). |
| 11 | Tiểu thử | 小暑 · Moderate Heat | 105° | Trời nóng bức, nhiều mưa dông; ruộng vụ mùa được cấy và chăm sóc. | Nóng nhẹ. | Bỏ mưa dông, cấy vụ mùa (không nguồn). |
| 12 | Đại thử | 大暑 · Great Heat | 120° | Nắng nóng đỉnh điểm, mưa lớn và bão bắt đầu nhiều; cần giữ nước và phòng úng cho lúa mùa. | Nóng oi — theo lịch pháp là thời kỳ nóng nhất năm. **VN:** Theo thống kê khí hậu, trung bình mỗi mùa hè có khoảng 11 cơn bão và áp thấp nhiệt đới phát triển trên Biển Đông. | “Thời kỳ nóng nhất năm” ghi rõ là theo lịch pháp; thay “bão bắt đầu nhiều”, “phòng úng lúa mùa” bằng số liệu bão Biển Đông (Khí hậu Việt Nam). |
| 13 | Lập thu | 立秋 · Autumn Commences | 135° | Nắng dịu dần, sáng sớm và chiều tối mát hơn, nhưng vẫn có thể còn mưa bão. | Bắt đầu mùa thu theo lịch pháp. | Bỏ “vẫn có thể còn mưa bão” (không nguồn). |
| 14 | Xử thử | 處暑 · End of Heat | 150° | Cái nóng mùa hè lui dần, tiết trời chuyển sang thu; lúa mùa đứng cái, làm đòng. | Hết nóng bức — cái nóng mùa hè lui dần. | Bỏ “lúa mùa đứng cái, làm đòng” (không nguồn). |
| 15 | Bạch lộ | 白露 · White Dew | 165° | Sáng sớm có sương, trời hanh mát; lúa mùa trổ bông. | Sáng sớm xuất hiện sương móc. Wikipedia tiếng Việt giải nghĩa tiết này là “nắng nhạt”. | Bỏ “lúa mùa trổ bông” (không nguồn); nêu thêm cách giải nghĩa “nắng nhạt” của Wikipedia. |
| 16 | Thu phân | 秋分 · Autumnal Equinox | 180° | Mặt Trời qua điểm thu phân (kinh độ 180°). Tiết trời mát mẻ, lúa mùa vào chắc. | Mặt Trời qua điểm thu phân (kinh độ 180°); ngày và đêm dài bằng nhau. | Bỏ “lúa mùa vào chắc” (không nguồn). |
| 17 | Hàn lộ | 寒露 · Cold Dew | 195° | Trời se lạnh về sáng và đêm; lúa mùa chín, bắt đầu gặt. | Sương lạnh, trời mát mẻ. | Bỏ “lúa mùa chín, bắt đầu gặt” (không nguồn). |
| 18 | Sương giáng | 霜降 · Frost | 210° | Cuối thu, trời lạnh dần; thu hoạch lúa mùa và chuẩn bị gieo trồng cây vụ đông. | Ở vùng Trung Hoa cổ đại, sương giá bắt đầu xuất hiện. Wikipedia tiếng Việt giải nghĩa là “sương mù xuất hiện”. | Bỏ khẳng định “sương muối bắt đầu xuất hiện” (không đúng cho phần lớn Việt Nam); ghi rõ là khí hậu Trung Hoa cổ. |
| 19 | Lập đông | 立冬 · Winter Commences | 225° | Gió mùa đông bắc về, trời lạnh hơn; ruộng sau gặt được trồng cây vụ đông. | Bắt đầu mùa đông theo lịch pháp. **VN:** Mùa đông ở miền Bắc chịu ảnh hưởng mạnh của gió mùa đông bắc; miền Nam chỉ có mùa mưa và mùa khô. | Bỏ “trồng cây vụ đông” (không nguồn); thêm gió mùa đông bắc miền Bắc, miền Nam hai mùa (Khí hậu Việt Nam). |
| 20 | Tiểu tuyết | 小雪 · Light Snow | 240° | Trời hanh khô, lạnh dần; vùng núi cao phía Bắc có thể có sương muối. | Tuyết bắt đầu xuất hiện ở vùng Trung Hoa cổ đại. **VN:** Gần như toàn bộ lãnh thổ Việt Nam không có tuyết trong thời kỳ này. Tuyết chỉ hiếm hoi xuất hiện trên một số đỉnh núi cao phía Bắc như Fansipan, Mẫu Sơn, và thường rơi vào các tiết Tiểu hàn – Đại hàn. | Sửa: trước ghi “vùng núi cao phía Bắc có thể có sương muối”; nay nêu rõ Việt Nam gần như không có tuyết, tuyết hiếm ở đỉnh núi cao, thường vào Tiểu hàn – Đại hàn (Wikipedia: Tiết khí). |
| 21 | Đại tuyết | 大雪 · Heavy Snow | 255° | Gió mùa đông bắc mạnh, rét; cần giữ ấm cho người, gia súc và cây trồng. | Tuyết dày ở vùng Trung Hoa cổ đại. **VN:** Tên gọi không phản ánh thời tiết Việt Nam: gần như cả nước không có tuyết; chỉ một số đỉnh núi cao phía Bắc hiếm hoi có tuyết, thường vào Tiểu hàn – Đại hàn. | Sửa: bỏ “nhiều sương muối”, “gió mùa đông bắc mạnh” áp cho chung; nêu rõ tên gọi không phản ánh thời tiết Việt Nam. |
| 22 | Đông chí | 冬至 · Winter Solstice | 270° | Mặt Trời ở kinh độ 270°. Trời lạnh, nhiều nơi có tục làm lễ cúng Đông chí. | Mặt Trời ở kinh độ 270°; ở Bắc bán cầu, đây là ngày có ban ngày ngắn nhất năm. | Bỏ “nhiều nơi có tục cúng Đông chí” (không tìm được nguồn). |
| 23 | Tiểu hàn | 小寒 · Moderate Cold | 285° | Rét đậm bắt đầu; chuẩn bị mạ, làm đất cho vụ chiêm xuân. | Rét nhẹ. **VN:** Tuyết, nếu có, thường chỉ hiếm hoi xuất hiện trên các đỉnh núi cao phía Bắc (như Fansipan, Mẫu Sơn) vào khoảng Tiểu hàn – Đại hàn. | Bỏ “rét đậm bắt đầu; chuẩn bị mạ” (không nguồn); thêm ghi chú tuyết hiếm ở núi cao. |
| 24 | Đại hàn | 大寒 · Severe Cold | 300° | Rét đậm, rét hại có thể kéo dài; cần che chắn mạ non và giữ ấm cho gia súc. Sau Đại hàn là Lập xuân. | Thường là thời kỳ lạnh nhất năm ở vùng Trung Hoa cổ đại; tuy vậy, nếu Tiểu hàn đã rất lạnh thì Đại hàn thường không lạnh lắm. **VN:** Ở miền Bắc (từ đèo Hải Vân trở ra), gió mùa đông bắc khô lạnh còn mạnh; nhà nông chú ý tiết này để bảo vệ cây trồng khỏi rét đậm, rét hại. | Giữ rét đậm, rét hại nhưng giới hạn miền Bắc (từ đèo Hải Vân trở ra); thêm nhận xét Tiểu hàn/Đại hàn (Wikipedia: Đại hàn). |
