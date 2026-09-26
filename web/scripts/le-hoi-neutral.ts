/**
 * Giọng văn trung lập, bách khoa cho tóm tắt lễ hội (slug → tóm tắt). Giữ nguyên mọi sự kiện, tên, số, ngày;
 * chỉ bỏ từ ngữ ca ngợi, cảm thán, sắc thái. File CSV nguồn giữ nguyên; import-van-hoa.ts áp bảng này rồi báo danh sách dòng đổi.
 */
export const NEUTRAL_LE_HOI_SUMMARY: Record<string, string> = {
  "hoi-giong-den-soc":
    "Lễ hội tưởng niệm Thánh Gióng, nhân vật thần thoại đánh giặc Ân. Đỉnh núi Sóc được tin là nơi Thánh Gióng cởi áo giáp sắt bay về trời sau khi dẹp xong giặc. Nội dung lễ hội gắn với lòng yêu nước, tinh thần thượng võ và lời cầu mưa thuận gió hòa cho mùa màng.",
  "le-hoi-chua-huong":
    "Lễ hội khởi phát từ thế kỷ XVII tại vùng danh thắng hang động Hương Sơn. Đây là cuộc hành hương Phật giáo kết hợp tín ngưỡng thờ Mẫu, thuộc loại có quy mô lớn ở Bắc Bộ. Lễ hội hướng tới sự lương thiện, lòng từ bi và ý thức tôn trọng thiên nhiên.",
  "le-hoi-yen-tu":
    "Lễ hội gắn với sự ra đời của Thiền phái Trúc Lâm Yên Tử thời Trần. Nội dung lễ hội nhắc tới tư tưởng nhập thế, sự gắn bó giữa con người với núi Yên Tử và đạo lý tri ân tiền nhân.",
  "le-hoi-lang-dong-ky":
    "Lễ hội tái hiện sự tích Thiên Cương Đế Thịnh phát lệnh xuất quân dẹp giặc Xích Quỷ bằng hiệu lệnh pháo. Sau chỉ thị cấm pháo năm 1995, dân làng chuyển sang rước mô hình pháo gỗ chạm khắc, sơn son thếp vàng. Lễ hội gắn với tinh thần thượng võ, sự gắn kết trong làng và lời cầu may mắn đầu năm.",
  "le-hoi-go-dong-da":
    "Lễ hội kỷ niệm chiến thắng Ngọc Hồi - Đống Đa mùa xuân Kỷ Dậu (1789), khi quân Tây Sơn đánh bại khoảng 29 vạn quân Thanh. Lễ hội nhắc lại chiến thắng, cách đánh thần tốc và sự đoàn kết của nhân dân thời đó.",
  "le-hoi-tien-cong":
    "Lễ hội nhớ các bậc tiền bối thế kỷ XV đắp đê lấn biển, biến bãi bồi cửa sông Bạch Đằng thành đồng bằng canh tác. Nét riêng của lễ hội là tục \"rước người\": gia đình rước các cụ thọ 80, 90, 100 tuổi lên miếu lễ tổ tiên. Lễ hội gắn với đạo hiếu, truyền thống kính lão và sự liên kết dòng tộc, xóm làng.",
  "hoi-lim":
    "Lễ hội bắt nguồn từ hội chùa và hội ca của tổng Nội Duệ, được Quận công Nguyễn Đình Diễn mở rộng quy mô từ thế kỷ XVIII. Hội Lim là nơi bảo tồn và truyền dạy dân ca Quan họ Kinh Bắc, với sự tham gia của các làng quan họ kết chạ.",
  "le-hoi-tro-tram":
    "Lễ hội cổ của vùng Đất Tổ, còn giữ dấu vết tục thờ sinh thực khí nguyên thủy. Lễ hội thể hiện ước vọng sinh sôi của con người và cây trồng. Các trò diễn mô phỏng những nghề sản xuất của cư dân nông nghiệp lúa nước.",
  "le-hoi-nhay-lua-cua-nguoi-pa-then":
    "Lễ hội có từ lâu đời trong đời sống tinh thần của người Pà Thẻn ở vùng biên giới cực Bắc. Nghi thức nhảy lửa mang ý nghĩa xua đuổi tai ương, tà khí. Ngọn lửa tượng trưng cho ánh sáng, hơi ấm và lời chúc cho một mùa nương rẫy tốt.",
  "le-hoi-den-va":
    "Lễ hội tưởng nhớ công đức Đức Thánh Tản Viên trong việc khai hoang, dạy dân trồng trọt và lãnh đạo nhân dân trị thủy sông Hồng. Đây là lễ hội chung của các làng hai bên tả ngạn và hữu ngạn sông Hồng (Hà Nội và Vĩnh Phúc), gắn với ước vọng chống lũ lụt và đoàn kết liên làng.",
  "le-hoi-den-thuong":
    "Lễ hội gắn với việc Hưng Đạo Đại vương lập tiền đồn giữ vùng biên ải phía Bắc trong kháng chiến chống Nguyên Mông. Lễ hội thể hiện truyền thống \"Uống nước nhớ nguồn\" và ý thức bảo vệ chủ quyền lãnh thổ. Đây cũng là dịp gắn kết các dân tộc vùng cao.",
  "le-hoi-con-son-mua-xuan":
    "Lễ hội tưởng niệm ngày viên tịch của Thiền sư Huyền Quang (ngày 23 tháng Giêng) tại chùa Côn Sơn. Lễ hội kết hợp tư tưởng Phật giáo Trúc Lâm với các giá trị văn hóa, triết học gắn với danh nhân Nguyễn Trãi, và gắn với cảnh quan núi non nơi đây.",
  "le-hoi-den-cua-ong-mua-xuan":
    "Lễ hội nhớ công lao của tướng Trần Quốc Tảng trong việc giữ vùng biển Đông Bắc thế kỷ XIII. Lễ hội nhắc tới chủ quyền biển đảo và tinh thần yêu nước, gắn với cộng đồng thợ mỏ và dân vùng duyên hải. Đền nằm trên đồi cao nhìn ra vịnh Bái Tử Long.",
  "le-hoi-nu-tuong-le-chan":
    "Lễ hội tưởng nhớ công đức Nữ tướng Lê Chân, người khai hoang lập trang An Biên xưa (nay thuộc Hải Phòng) và tham gia đánh giặc. Lễ hội gắn với lòng tự hào về cội nguồn miền cửa biển và hình tượng người phụ nữ Việt Nam; đây là biểu tượng văn hóa cội nguồn của người dân thành phố cảng.",
  "le-hoi-tay-thien":
    "Lễ hội nhớ công đức Quốc mẫu Tây Thiên, người theo truyền thuyết phò Vua Hùng dẹp giặc, mở mang bờ cõi và dạy dân trồng lúa nước, dệt tơ lụa. Quần thể kết hợp tín ngưỡng thờ Mẫu bản địa với trung tâm Phật giáo cổ. Lễ hội thể hiện đạo lý nhớ ơn nguồn cội và sự hòa hợp với thiên nhiên.",
  "le-hoi-quan-the-am-ngu-hanh-son":
    "Lễ hội khởi phát từ năm 1957, nhân ngày khánh thành tôn tượng Quan Âm trong động Hoa Nghiêm thuộc danh thắng Ngũ Hành Sơn. Lễ hội kết hợp sinh hoạt Phật giáo với các giá trị văn hóa dân gian bản địa, hướng tới lòng từ bi, sự hướng thiện và lời cầu quốc thái dân an, thế giới hòa bình.",
  "le-hoi-ky-yen-o-dinh-gia-loc":
    "Lễ hội nhớ công lao của quan Cai đội Đặng Văn Trước, người chiêu dân lập ấp, mở mang đất đai và bảo vệ xóm làng thế kỷ XIX. Lễ Kỳ yên thể hiện đạo lý tri ân tiền hiền khai khẩn, hậu hiền khai cơ và tính cố kết cộng đồng Nam Bộ. Lễ hội gửi gắm ước mong mưa thuận gió hòa, làm ăn thuận lợi và xóm giềng yên vui.",
  "le-hoi-den-cuong":
    "Lễ hội tưởng nhớ Vua An Dương Vương, người theo truyền thuyết xây thành Cổ Loa, chế nỏ thần giữ nước và tự vẫn tại chân núi Mộ Dạ. Lễ hội gợi bài học về tinh thần cảnh giác giữ nước và đạo lý tri ân tiền nhân. Đền nằm giữa rừng thông, hướng ra biển Đông.",
  "le-hoi-chua-thay":
    "Lễ hội tưởng niệm ngày viên tịch và hóa thân của Thiền sư Từ Đạo Hạnh tại vùng núi Sài Sơn. Lễ hội kết hợp Phật giáo Mật tông với tín ngưỡng nông nghiệp dân gian thờ thần núi sông. Lễ hội còn gắn với nghệ thuật rối nước và lòng tự hào của người xứ Đoài.",
  "le-hoi-chua-tay-phuong":
    "Lễ hội gắn với nghệ thuật điêu khắc gỗ Phật giáo cổ truyền thời Tây Sơn ở chùa Tây Phương. Lễ hội mang ý nghĩa hướng thiện và chiêm bái hệ thống tượng cổ. Quần thể chùa trên đồi Câu Lậu là nơi hội tụ phật tử và du khách các nơi.",
  "le-hoi-phu-day":
    "Lễ hội tưởng niệm ngày mất của Thánh Mẫu Liễu Hạnh, hình tượng gắn với lòng nhân ái, sự che chở và khát vọng tự do của người phụ nữ. Đây là trung tâm thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt, gửi gắm lời cầu tài lộc và bình an gia đạo. Lễ hội có nhiều hình thức diễn xướng dân gian, kết nối cộng đồng cư dân châu thổ.",
  "gio-to-hung-vuong":
    "Lễ hội bắt nguồn từ truyền thống nhớ ơn tổ tiên thời cổ, nay là ngày Quốc giỗ chung của cả nước. Lễ hội củng cố ý thức cội nguồn \"đồng bào\" sinh ra từ bọc trăm trứng và tinh thần đại đoàn kết dân tộc, đồng thời gắn với lòng tự tôn và ý chí độc lập.",
  "le-hoi-co-do-hoa-lu":
    "Lễ hội tưởng nhớ Đinh Tiên Hoàng, người dẹp loạn 12 sứ quân và lập nhà nước Đại Cồ Việt năm 968, cùng Vua Lê Đại Hành giữ yên bờ cõi. Lễ hội nhắc tới truyền thống độc lập, tự chủ, xây dựng nhà nước quân chủ và đạo lý nhớ ơn người khai nghiệp.",
  "le-hoi-den-do":
    "Lễ hội kỷ niệm ngày Vua Lý Thái Tổ lên ngôi lập nên triều Lý và ban Chiếu dời đô về Thăng Long năm 1010. Lễ hội nhắc tới truyền thống văn hiến, tinh thần độc lập tự cường và lòng biết ơn các vị vua có công xây nền thịnh trị.",
  "le-khao-le-the-linh-hoang-sa":
    "Nghi lễ ra đời từ thế kỷ XVII, khi triều đình cử dân binh Lý Sơn đi thuyền câu ra Hoàng Sa, Trường Sa cắm mốc chủ quyền và đo đạc hải trình. Nhiều người đã hy sinh giữa bão biển; các tộc họ làm lễ tế thế lính bằng hình nhân bột gạo để cầu bình an và tạ ơn người đã mất. Nghi lễ gắn với chủ quyền lãnh hải lịch sử của Việt Nam trên Biển Đông.",
  "le-hoi-thap-ba-ponagar-nha-trang":
    "Lễ hội nhớ Nữ thần theo tín ngưỡng đã tạo ra đất đai, giống lúa, cây thuốc và dạy dân cày cấy, dệt vải. Lễ hội phản ánh sự giao lưu và dung hợp tín ngưỡng giữa người Việt và người Chăm ở Nam Trung Bộ, thể hiện lòng biết ơn Mẹ Xứ Sở che chở cuộc sống no ấm.",
  "le-hoi-den-ba-trieu":
    "Lễ hội tưởng niệm cuộc khởi nghĩa chống chính quyền đô hộ Đông Ngô năm 248. Lễ hội nhắc tới tinh thần yêu nước và hình tượng người phụ nữ Việt Nam trong việc giữ gìn đất nước, gắn với quê hương xứ Thanh.",
  "hoi-giong-den-phu-dong":
    "Lễ hội tái hiện một cách tượng trưng trận đánh đuổi giặc Ân của Thánh Gióng, người anh hùng làng Gióng. Lễ hội thể hiện tinh thần yêu nước, sự khoan dung với quân địch và khát vọng thái bình. Nghi lễ được tổ chức chặt chẽ, mang bản sắc văn hóa lúa nước vùng đồng bằng Bắc Bộ.",
  "le-hoi-via-ba-chua-xu-nui-sam":
    "Lễ hội hình thành đầu thế kỷ XIX, khi pho tượng cổ được cung thỉnh từ đỉnh núi Sam xuống lập miếu thờ. Đây là trung tâm thực hành tín ngưỡng Mẫu lớn ở phương Nam, có sự tham gia của các dân tộc Kinh, Khmer, Hoa, Chăm. Lễ hội thể hiện lòng tri ân vị thần nữ che chở cuộc sống nơi biên giới.",
  "le-hoi-vat-cau-nuoc-lang-van":
    "Lễ hội khởi nguồn từ sự tích hai vị tướng dẹp loài thủy quái quấy nhiễu xóm làng ven sông Như Nguyệt. Trò tranh quả cầu gỗ trên bãi bùn tượng trưng cho sự vận hành của mặt trời, cầu âm dương hòa hợp và mùa vụ tốt. Lễ hội đề cao sức khỏe, sự bền bỉ và tinh thần gắn bó của trai làng ven sông.",
  "le-hoi-dinh-binh-thuy-thuong-dien":
    "Đình được lập từ giữa thế kỷ XIX; vua Tự Đức ban sắc phong Bổn Cảnh Thành Hoàng năm Nhâm Tý (1852). Lễ Thượng điền là lễ hội nông nghiệp tạ ơn thần linh phù hộ cho vụ xuống giống bình yên. Lễ hội cũng nhớ công lao khai hoang mở đất và củng cố nghĩa tình láng giềng miền sông nước.",
  "le-hoi-banh-chung-banh-giay-sam-son":
    "Lễ hội xuất phát từ kỳ tế Đảo Vũ (cầu mưa giải hạn) cổ truyền của cư dân làng biển, dâng lên thần Độc Cước hộ quốc an dân. Lễ hội kết hợp yếu tố nông nghiệp lúa nước với tín ngưỡng của cộng đồng người đi biển, thể hiện ước vọng mưa thuận gió hòa.",
  "le-hoi-dinh-chem":
    "Lễ hội nhớ danh tướng Lý Ông Trọng thời Vua Hùng thứ 18 và An Dương Vương, người theo truyền thuyết giúp trừ giặc phương Bắc, bảo vệ bờ cõi. Lễ hội còn giữ nhiều nghi lễ cổ bên bờ sông Hồng, gắn với đạo lý uống nước nhớ nguồn và niềm tự hào dân tộc.",
  "le-hoi-dinh-tra-co":
    "Lễ hội tái hiện sự tích các bậc tiền hiền vượt biển từ Đồ Sơn ra khai hoang vùng cửa biển Đông Bắc, được nhắc trong câu \"Người Trà Cổ, tổ Đồ Sơn\". Lễ hội gắn với ký ức khai phá vùng biên giới biển và ý chí bám biển giữ làng của người dân nơi cực Đông Bắc.",
  "le-hoi-xa-ma-ruoc-kieu-dinh-hoang-chau":
    "Lễ hội tái hiện chiến công của quân dân An Đồng - Hoàng Châu chặn thủy binh Nguyên Mông năm 1288. Hình tượng ngựa gỗ trắng hồng biểu trưng cho lòng dũng cảm, sự mưu trí và tinh thần yêu nước của người dân miền đảo. Lễ hội cũng gắn với sự đoàn kết của xóm chài.",
  "le-hoi-quan-lan":
    "Lễ hội tái hiện chiến thắng đánh chìm đoàn thuyền lương của quân Nguyên Mông trên sông Mang năm 1288. Lễ hội nhắc tới hào khí Đông A và chủ quyền vùng biển đảo. Tục \"Khóa làng\" thể hiện tính kỷ luật và sự đoàn kết của người dân xã đảo.",
  "le-hoi-den-lanh-giang":
    "Theo truyền thuyết, ba vị tướng phò Vua Hùng dẹp giặc và gắn với chuyện tình Tiên Dung - Chử Đồng Tử. Lễ hội thể hiện tín ngưỡng thờ nguồn nước, cầu trị thủy đê điều vững và mùa vụ no ấm. Đây cũng là nơi diễn ra hầu đồng, hát Chầu văn vùng châu thổ sông Hồng.",
  "le-hoi-dien-hue-nam":
    "Lễ hội gắn với sự dung hợp giữa tín ngưỡng thờ Nữ thần của người Chăm và Đạo Mẫu Tam Phủ của người Việt xứ Đàng Trong. Lễ hội mang ý nghĩa tri ân Mẹ Xứ Sở, thể hiện đời sống tâm linh của cố đô Huế, với các màn diễn xướng và đoàn thuyền cờ hoa trên sông Hương.",
  "le-hoi-den-bao-ha":
    "Lễ hội nhớ danh tướng Hoàng Bảy, người theo truyền thuyết chiêu tập nhân dân dẹp giặc cướp phương Bắc, giữ yên vùng biên giới Tây Bắc. Lễ hội gắn với sự đoàn kết các dân tộc Tày, Dao, Mông, Kinh, tinh thần bảo vệ đất nước, và lời cầu công danh, làm ăn thuận lợi, bình an gia đạo.",
  "le-hoi-khu-cu-te-cua-nguoi-la-chi":
    "Đây là lễ hội lớn nhất trong năm của người La Chí sống trên vùng ruộng bậc thang. Lễ hội tạ ơn tổ tiên phù hộ cho lúa ngô, cầu cho gia súc khỏe mạnh, bệnh tật tiêu trừ, đồng thời gắn kết dòng họ và truyền giữ nét văn hóa riêng qua các thế hệ.",
  "le-hoi-den-cua-ong-mua-thu":
    "Lễ hội tưởng niệm ngày mất của Hưng Nhượng Vương Trần Quốc Tảng, danh tướng giữ bờ cõi phía Đông Bắc. Lễ hội mùa thu tri ân công tích hộ quốc an dân và nhắc ý thức về biển đảo. Đây cũng là nơi sinh hoạt tâm linh của công nhân mỏ than và người dân miền duyên hải.",
  "le-hoi-kiep-bac-mua-thu":
    "Lễ hội tưởng niệm ngày mất của Trần Hưng Đạo (ngày 20 tháng Tám năm Canh Tý 1300). Lễ hội nhắc tới tài thao lược quân sự và tư tưởng \"khoan thư sức dân\" làm gốc dựng nước của người xưa, cùng lòng tự hào lịch sử và sự gắn kết non sông.",
  "le-hoi-den-tran-mua-thu":
    "Lễ hội diễn ra vào dịp kỵ nhật của Đức Thánh Trần tại vùng đất phát tích của nhà Trần, để ghi nhớ công ơn đánh đuổi quân ngoại xâm. Lễ hội nhắc đạo lý yêu nước, tự cường và xây dựng xã hội hòa mục. Nhân dân các nơi về thắp hương tri ân tiên tổ.",
  "le-hoi-den-tran-thuong":
    "Đền tọa lạc tại nơi Hưng Đạo Vương đặt 6 kho lương dự trữ phục vụ kháng chiến chống quân Mông Cổ lần thứ hai (1285). Lễ hội nhắc tới tài năng hậu cần quân sự và bài học tích trữ lương thực phòng thủ của người xưa, gắn với ý thức bảo đảm an ninh lương thực và chủ động phòng ngừa khó khăn.",
  "le-hoi-lam-kinh":
    "Lễ hội tưởng niệm ngày mất của Vua Lê Thái Tổ và thắng lợi sau 10 năm gian khổ đánh quân Minh, giành lại đất nước. Dân gian lưu truyền câu ca: \"Hăm mốt Lê Lai, hăm hai Lê Lợi\" để ghi nhớ sự hy sinh của tướng sĩ. Lễ hội nhắc tới hào khí Lam Sơn, ý chí tự lực tự cường và lòng tự hào dân tộc.",
  "le-hoi-chua-keo":
    "Lễ hội tưởng niệm 100 ngày mất của Thiền sư Dương Không Lộ (ngày 14 tháng Chín). Lễ hội kết hợp Phật giáo với tín ngưỡng dân gian thờ Thánh, gắn với gác chuông gỗ nổi tiếng của chùa Keo. Lễ hội thể hiện ước nguyện mùa màng bội thu, nhân dân bình an và làng nghề thủ công phát triển.",
  "le-hoi-chua-co-le":
    "Lễ hội nhớ công chữa bệnh cho vua Lý Thần Tông và việc đúc tượng đồng Tứ đại khí của Thiền sư Minh Không. Lễ hội chùa Cổ Lễ thể hiện tinh thần \"đạo pháp đồng hành cùng dân tộc\" của người dân vùng châu thổ sông Hồng. Chùa có phong cách kiến trúc pha ảnh hưởng phương Tây.",
  "le-hoi-dinh-thay-thim":
    "Lễ hội nhớ công ơn vợ chồng người đạo sĩ vào rừng Tam Tân chữa bệnh cứu người và đóng thuyền giúp dân nghèo. Lễ hội thể hiện đạo nghĩa tương thân tương ái và lối sống thiện lành của người dân phương Nam. Đây là điểm hành hương lớn gắn với cảnh quan rừng và biển.",
  "le-hoi-kate-cua-nguoi-cham":
    "Đây là lễ hội cổ truyền lớn nhất trong năm của người Chăm Bàlamôn. Katê là dịp tạ ơn các vị vua đã dạy dân đào mương đắp đập làm ruộng lúa nước và tri ân tổ tiên dòng họ. Lễ hội củng cố tình đoàn kết cộng đồng và trao truyền bản sắc Chăm.",
  "le-hoi-trung-cuu":
    "Lễ hội nhớ công khai khẩn đất mặn, giữ thuần phong mỹ tục và răn dạy đạo lý \"Tứ ân hiếu nghĩa\" của Ông Trần cuối thế kỷ XIX. Lễ hội phản ánh lối sống hòa với thiên nhiên, đề cao đạo đức nhân nghĩa, lối sống giản dị và tự lực. Đây là sinh hoạt tín ngưỡng riêng của cư dân thôn đảo.",
  "le-hoi-dua-bo-bay-nui":
    "Lễ hội xuất phát từ tục cày bừa đất giúp việc chùa của các thanh niên Khmer trước vụ gieo lúa; về sau các đôi bò khỏe được đem ra đua thành hội. Lễ hội thể hiện tinh thần yêu lao động, lòng tri ân vật nuôi gắn bó với đồng ruộng và sự gắn bó của phum sóc. Đây vừa là sinh hoạt thể thao dân tộc, vừa mang bản sắc tâm linh vùng Bảy Núi.",
  "le-hoi-den-quan-hoang-muoi":
    "Lễ hội nhớ vị danh tướng có công giúp dân đắp đê ngăn mặn sông Lam, mở làng xóm và giữ yên bờ cõi phía Nam thời Lê. Lễ hội mang ý nghĩa cầu công danh tấn tới, mùa vụ đủ đầy, gia đình hòa thuận và buôn bán thuận lợi. Nhân vật này được nhìn nhận là hình tượng văn võ song toàn trong tâm thức Đạo Mẫu của người Việt.",
  "le-hoi-ok-om-bok":
    "Lễ hội tổ chức vào đêm trăng tròn tháng Mười, khi khép lại chu kỳ canh tác năm cũ và chuẩn bị gặt lúa mùa. Lễ hội tạ ơn Mặt Trăng đã ban nguồn nước mát và khí hậu thuận lợi, cầu phum sóc bình an, mùa vụ đủ đầy. Đây là sinh hoạt văn hóa nhiều màu sắc của người Khmer Nam Bộ.",
  "le-cap-sac-cua-nguoi-dao":
    "Đây là nghi lễ vòng đời quan trọng, đánh dấu sự trưởng thành của người đàn ông Dao và sự công nhận của cộng đồng. Lễ cấp sắc răn dạy đạo lý hiếu thảo, chính trực, không làm điều ác và có trách nhiệm bảo vệ bản làng. Lễ còn lưu giữ chữ Nôm Dao cổ, bài khấn và tranh thờ.",
  "le-hoi-go-thap":
    "Lễ hội tưởng niệm hai vị lãnh đạo nghĩa quân giương cờ khởi nghĩa chống thực dân Pháp tại căn cứ Đồng Tháp Mười (1862 - 1866). Lễ hội nhắc tới tinh thần yêu nước và ý chí giữ đất của nhân dân miền Nam. Hằng năm có hàng vạn người từ khắp đồng bằng sông Cửu Long về viếng.",
  "le-hoi-den-trang-trinh-nguyen-binh-khiem":
    "Lễ hội tưởng niệm ngày mất của Trạng Trình Nguyễn Bỉnh Khiêm (1491 - 1585), nhà trí thức có tầm nhìn chiến lược về hòa bình dân tộc. Lễ hội nhắc tới truyền thống hiếu học, khuyến học của vùng đất học Hải Phòng, và là dịp giáo dục đạo lý nhân nghĩa, trọng tri thức cho thế hệ trẻ.",
  "le-hoi-banh-day-dinh-luc-giap":
    "Lễ hội có từ lâu đời, gắn với tập quán dâng bánh nông nghiệp tạ ơn Thần hoàng cuối năm. Chiếc bánh dày tròn trắng tượng trưng cho bầu trời che chở, gửi gắm mong ước mùa màng sau đủ đầy. Lễ hội gắn kết tình làng nghĩa xóm và nhắc tới sự cần cù, khéo tay của người nông dân.",
  "le-hoi-aza-koo":
    "Đây là tết mừng cơm mới quan trọng nhất trong năm của người Pa Cô, Tà Ôi vùng phía tây cố đô Huế. Lễ hội tạ ơn trời đất đã cho lúa đầy bồ, gia đình khỏe mạnh, tránh thú dữ. Lễ hội thể hiện tinh thần sẻ chia và tình gắn bó giữa các dòng họ.",
};

/** Từ ngữ mang sắc thái cần tránh — còn sót thì script báo. */
export const LOADED_LE_HOI = ["dã man", "tay sai", "bè lũ", "anh dũng", "oanh liệt", "tàn bạo", "đẫm máu", "kiên cường", "quật cường", "bất khuất", "thiêng liêng", "hào hùng", "kiệt xuất", "tuyệt đẹp", "độc nhất vô nhị", "kỳ vĩ", "bậc nhất", "phi thường", "quý báu", "cao quý"];
