import { FIXTURE_SLUG, SHOW_FIXTURES, type SuKien } from "../types";

/**
 * Dữ liệu thật. Mỗi bài đối chiếu nhiều nguồn (cơ quan quản lý di tích, chính quyền địa phương, báo chí uy tín);
 * điểm sử liệu/khảo cổ còn khác nhau ghi ở `disputed`, không tự chọn một phương án làm "sự thật".
 */
const REAL: readonly SuKien[] = [
  {
    slug: "bach-dang-938",
    title: "Trận Bạch Đằng năm 938",
    label: "chinh-su",
    summary:
      "Ngô Quyền cho đóng cọc gỗ đầu bịt sắt ở lòng sông Bạch Đằng, lợi dụng thủy triều đánh tan thủy quân Nam Hán do Lưu Hoằng Tháo chỉ huy, mở ra thời kỳ độc lập tự chủ sau hơn một nghìn năm Bắc thuộc.",
    lunar: { day: null, month: 10, year: 938 },
    lunarText: "Mùa đông năm Mậu Tuất (938) — các bộ sử không ghi ngày cụ thể và không thống nhất về tháng, xem mục “Các nguồn chưa thống nhất”",
    solarDateSource: "computed",
    dynasty: "nha-ngo",
    boiCanh: [
      "Năm 937, hào trưởng Kiều Công Tiễn giết chủ tướng Dương Đình Nghệ — người mà Ngô Quyền làm nha tướng và là con rể — để đoạt quyền Tiết độ sứ Tĩnh Hải quân, rồi cầu cứu nhà Nam Hán khi thế cô. Ngô Quyền, lúc đó đang trấn giữ Ái châu (Thanh Hóa), đem quân ra Bắc trị tội Kiều Công Tiễn trước khi quân Nam Hán kịp sang.",
      "Vua Nam Hán Lưu Cung nhân cớ đó sai con là Lưu Hoằng Tháo đem thủy quân theo đường biển vào cửa sông Bạch Đằng để tiếp ứng và mưu chiếm lại Tĩnh Hải quân; bản thân Lưu Cung đóng đại bản doanh ở biên giới để tiếp ứng.",
    ],
    dienBien: [
      "Biết quân Nam Hán sẽ theo cửa sông Bạch Đằng tiến vào, Ngô Quyền cho quân và dân đẵn gỗ, đẽo nhọn, bịt sắt rồi đóng thành bãi cọc ngầm dưới lòng sông ở khu vực cửa sông, lợi dụng mức nước triều lên xuống để che giấu bãi cọc.",
      "Khi thủy triều lên, bãi cọc chìm dưới mặt nước; Ngô Quyền cho thuyền nhẹ ra khiêu chiến rồi giả thua, dẫn dụ đoàn thuyền của Lưu Hoằng Tháo tiến sâu vào phía trong bãi cọc.",
      "Chờ nước triều rút, ông tung quân mai phục ra đánh. Thuyền Nam Hán tháo chạy ra biển vướng phải bãi cọc, vỡ và đắm rất nhiều; quân Nam Hán chết quá nửa, Lưu Hoằng Tháo tử trận. Lưu Cung được tin, thương khóc, thu quân về, bỏ hẳn mưu đồ giành lại Tĩnh Hải quân.",
    ],
    yNghia: [
      "Chiến thắng Bạch Đằng 938 chấm dứt thời kỳ Bắc thuộc kéo dài hơn một nghìn năm, mở ra thời kỳ độc lập, tự chủ liên tục của các triều đại người Việt. Mùa xuân năm 939, Ngô Quyền xưng vương, đóng đô ở Cổ Loa, lập nhà Ngô.",
      "Sử gia Lê Văn Hưu (Đại Việt sử ký, thế kỷ XIII) đánh giá đây là công lao mở nước, dựng nghiệp tự chủ của Ngô Quyền; nhà nghiên cứu Phan Bội Châu sau này tôn ông là “vị Tổ Trung hưng” của dân tộc.",
    ],
    disputed:
      "Ngày tháng: Đại Việt sử ký toàn thư ghi chiến thắng vào khoảng tháng 10 âm lịch năm Mậu Tuất; Khâm định Việt sử thông giám cương mục lại ghi tháng 9. Không bộ sử nào ghi ngày cụ thể, nên trang này chỉ nêu tháng theo Toàn thư và không quy đổi ra một ngày dương lịch xác định — số liệu \"mùa đông năm 938\" hay \"cuối thu năm 938\" trên các bài phổ biến chỉ là suy đoán từ hai mốc tháng khác nhau. Địa điểm: vị trí chính xác của bãi cọc trận 938 chưa được khảo cổ xác định; các bãi cọc từng khai quật ở lưu vực Bạch Đằng (Yên Giang, Vạn Muối, Má Ngựa ở Quảng Yên — Quảng Ninh; Cao Quỳ, Đầm Thượng ở Thủy Nguyên — Hải Phòng) đều được giới nghiên cứu gắn với chiến dịch chống Nguyên Mông năm 1288, không phải trận 938; xem thêm bài Trận Bạch Đằng năm 1288.",
    relatedPeople: ["ngo-quyen"],
    relatedEvents: ["bach-dang-1288"],
    updatedAt: "2026-09-28",
    sources: [
      { text: "Cục Di sản văn hóa (Bộ Văn hóa, Thể thao và Du lịch), “Di tích lịch sử Bạch Đằng”", url: "https://dsvh.gov.vn/di-tich-lich-su-bach-dang-2960" },
      {
        text: "Thành đoàn Hải Phòng, “Cụm di tích lịch sử quốc gia đặc biệt Từ Lương Xâm — căn cứ bản doanh của Ngô Quyền năm 938”",
        url: "https://thanhdoanhaiphong.gov.vn/tu-luong-xam-di-tich-lich-su-vinh-danh-va-tho-phung-vua-ngo-quyen-nd22861.html",
      },
      { text: "Báo Hải Phòng, “Từ Lương Xâm — đại bản doanh của Đức Vương Ngô Quyền”", url: "https://baohaiphong.vn/tu-luong-xam-dai-ban-doanh-cua-duc-vuong-ngo-quyen-545175.html" },
      { text: "Báo Dân trí, “Căn cứ bản doanh của Ngô Quyền được xếp hạng Di tích quốc gia đặc biệt” (13/2/2025)", url: "https://dantri.com.vn/thoi-su/can-cu-ban-doanh-cua-ngo-quyen-duoc-xep-hang-di-tich-quoc-gia-dac-biet-20250213065306215.htm" },
      {
        text: "VietnamNet, “Phát hiện bãi cọc lớn nhất từ trước tới nay” (bãi cọc Cao Quỳ, Thủy Nguyên, Hải Phòng — giới nghiên cứu gắn với chiến dịch 1288, không phải 938)",
        url: "https://vietnamnet.vn/phat-hien-bai-coc-lon-nhat-tu-truoc-toi-nay-mang-lai-niem-phan-khoi-tu-hao-cho-nhan-dan-hai-phong-815960.html",
      },
    ],
  },
  {
    slug: "bach-dang-1288",
    title: "Trận Bạch Đằng năm 1288",
    label: "chinh-su",
    summary:
      "Trần Hưng Đạo bày trận địa cọc trên sông Bạch Đằng, đánh tan đoàn thuyền rút lui của quân Nguyên do Ô Mã Nhi chỉ huy ngày 8 tháng 3 âm lịch năm Mậu Tý, kết thúc cuộc kháng chiến chống Nguyên Mông lần thứ ba.",
    lunar: { day: 8, month: 3, year: 1288 },
    lunarText: "Ngày 8 tháng 3 năm Mậu Tý (1288)",
    solarDateSource: "computed",
    dynasty: "nha-tran",
    boiCanh: [
      "Cuối năm 1287, quân Nguyên do Thoát Hoan chỉ huy tiến sang xâm lược Đại Việt lần thứ ba; đoàn thuyền lương do Trương Văn Hổ hộ tống bị thủy quân Trần chặn đánh và phá hủy phần lớn ở Vân Đồn (Quảng Ninh), khiến quân Nguyên ở Thăng Long lâm vào cảnh thiếu lương.",
      "Đầu năm 1288, trước nguy cơ bị vây, Thoát Hoan quyết định rút quân về nước theo hai đường: bộ binh theo đường Lạng Sơn, thủy quân do Ô Mã Nhi chỉ huy rút theo sông Bạch Đằng ra biển để hộ tống đoàn thuyền — vì cho rằng đường sông có thể sơ hở hơn đường biển đã bị thủy quân Trần vây chặt.",
      "Biết trước ý đồ rút lui của Ô Mã Nhi, Trần Hưng Đạo — Quốc công tiết chế thống lĩnh quân đội — huy động quân dân đẵn gỗ lim, gỗ táu ở vùng thượng nguồn, đẽo nhọn, đóng thành bãi cọc lớn ở các luồng lạch sông Bạch Đằng, bố trí quân mai phục hai bên bờ và ở thượng lưu.",
    ],
    dienBien: [
      "Sáng 8 tháng 3 âm lịch năm Mậu Tý (9/4/1288 theo cách quy đổi mà Cục Di sản văn hóa dùng để đặt tên ngày kỷ niệm — xem ghi chú), đoàn thuyền Ô Mã Nhi tiến vào sông Bạch Đằng đúng lúc nước triều lên. Tướng Nguyễn Khoái dẫn một cánh quân ra khiêu chiến rồi giả thua, rút dần vào phía trong bãi cọc để nhử địch.",
      "Ô Mã Nhi mắc mưu, cho thuyền đuổi theo vào sâu trong sông. Khi nước triều xuống nhanh, quân Trần từ nhiều hướng đổ ra đánh, dùng cả hỏa công. Thuyền Nguyên vướng bãi cọc, vỡ, đắm hoặc bị đốt cháy hàng loạt; đến chiều cùng ngày phần lớn đoàn thuyền bị tiêu diệt.",
      "Ô Mã Nhi cùng nhiều tướng lĩnh — trong đó có Phàn Tiếp, Tích Lệ Cơ — bị bắt sống; hơn 400 chiến thuyền bị thu hoặc phá hủy. Cánh bộ binh của Thoát Hoan rút theo đường Lạng Sơn cũng bị quân Trần truy kích, tổn thất nặng.",
    ],
    yNghia: [
      "Trận Bạch Đằng 1288 là trận quyết chiến kết thúc thắng lợi cuộc kháng chiến chống quân Nguyên Mông lần thứ ba, buộc nhà Nguyên từ bỏ hẳn mưu đồ xâm lược Đại Việt sau ba lần thất bại liên tiếp (1258, 1285, 1287–1288).",
      "Chiến thắng gắn liền tên tuổi Trần Hưng Đạo với việc kế thừa và phát triển kế đóng cọc từng được Ngô Quyền dùng ở cùng con sông 350 năm trước, dù đây là hai trận đánh độc lập, khác quy mô, khác lực lượng và khác vị trí bãi cọc.",
    ],
    disputed:
      "Ngày quy đổi dương lịch: nguồn của Cục Di sản văn hóa và một số báo dùng mốc 9/4/1288 cho ngày 8/3 âm lịch; đây là quy đổi lịch, không phải ngày ghi trực tiếp bằng dương lịch trong sử liệu gốc, nên có thể lệch 1–2 ngày tùy thuật toán quy đổi — trang này tính lại bằng thuật toán lịch âm dương hiện hành của licham.app, kết quả có thể không trùng khớp tuyệt đối với mốc 9/4 nói trên. Bãi cọc: khu di tích quốc gia đặc biệt Bạch Đằng (Quảng Yên, Uông Bí — Quảng Ninh, xếp hạng theo Quyết định 1419/QĐ-TTg ngày 27/9/2012) và bãi cọc Cao Quỳ (Thủy Nguyên, Hải Phòng, phát hiện cuối 2019) đều được giới nghiên cứu gắn với chiến dịch 1288; đây là các di tích khác, không nên nhầm với đền Từ Lương Xâm — nơi gắn với trận 938 của Ngô Quyền.",
    relatedPeople: ["tran-hung-dao"],
    relatedEvents: ["bach-dang-938"],
    relatedFestivals: ["le-hoi-kiep-bac-mua-thu"],
    updatedAt: "2026-09-28",
    sources: [
      { text: "Cục Di sản văn hóa (Bộ Văn hóa, Thể thao và Du lịch), “Di tích lịch sử Bạch Đằng”", url: "https://dsvh.gov.vn/di-tich-lich-su-bach-dang-2960" },
      { text: "Báo Quảng Ninh, “Nâng tầm Di tích lịch sử Quốc gia đặc biệt Bạch Đằng”", url: "https://baoquangninh.vn/nang-tam-di-tich-lich-su-quoc-gia-dac-biet-bach-dang-3163173.html" },
      {
        text: "VietnamPlus / TTXVN, “Khu bảo tồn bãi cọc Cao Quỳ: Góc nhìn mới về lịch sử Việt Nam”",
        url: "https://www.vietnamplus.vn/khu-bao-ton-bai-coc-cao-quy-goc-nhin-moi-ve-lich-su-viet-nam-post679287.vnp",
      },
      { text: "Znews, “Trận Bạch Đằng chấn động thế giới năm 1288 diễn ra như thế nào?”", url: "https://znews.vn/tran-bach-dang-chan-dong-the-gioi-nam-1288-dien-ra-nhu-the-nao-post1028359.html" },
      { text: "Sở Văn hóa, Thể thao và Du lịch / cổng thông tin lễ hội Côn Sơn – Kiếp Bạc, lịch tổ chức lễ hội mùa thu (giỗ Đức Thánh Trần 20 tháng 8 âm lịch, tại đền Kiếp Bạc)", url: "https://hdnd.haiduong.gov.vn/phong-tuc---le-hoi/le-hoi-truyen-thong-con-son-kiep-bac---net-dep-van-hoa-xu-dong-n199.html" },
    ],
  },
  {
    slug: "khoi-nghia-lam-son",
    title: "Khởi nghĩa Lam Sơn (1418–1428)",
    label: "chinh-su",
    summary:
      "Suốt mười năm, từ khi Lê Lợi dựng cờ ở Lam Sơn (1418) đến khi quân Minh rút về nước và Bình Ngô đại cáo ra đời (1428), cuộc khởi nghĩa đi từ một lực lượng nhỏ bị vây khốn ở núi rừng Thanh Hóa thành đội quân đánh bại cả một đạo quân đô hộ.",
    lunar: { day: 2, month: 1, year: 1418 },
    lunarText: "Mùng 2 tháng Giêng năm Mậu Tuất (1418) — ngày Lê Lợi dựng cờ khởi nghĩa tại Lam Sơn; cuộc khởi nghĩa kéo dài đến cuối năm Đinh Mùi (1427) và Bình Ngô đại cáo công bố đầu năm Mậu Thân (1428)",
    solarDateSource: "computed",
    dynasty: "le-so",
    boiCanh: [
      "Năm 1407, nhà Hồ thất bại trước quân Minh; nước ta rơi vào khoảng 20 năm bị nhà Minh cai trị trực tiếp, đổi tên thành quận Giao Chỉ. Nhà Minh thi hành chính sách hà khắc: thu đốt sách vở, tăng sưu thuế, bắt phu dịch, đàn áp các cuộc nổi dậy — trong đó có phong trào Hậu Trần (1407–1414) cũng đã thất bại.",
      "Lê Lợi là phụ đạo (thủ lĩnh địa phương) có thế lực ở vùng Lam Sơn, Thanh Hóa. Ông từ chối lời dụ ra làm quan của nhà Minh, ngầm chiêu tập hào kiệt nhiều năm trước khi dấy binh; Nguyễn Trãi và nhiều hào kiệt khác cùng dự Hội thề Lũng Nhai năm 1416, thề cùng nhau đánh đuổi quân Minh.",
    ],
    dienBien: [
      "Mùng 2 tháng Giêng năm Mậu Tuất (1418), Lê Lợi dựng cờ khởi nghĩa tại Lam Sơn, xưng Bình Định vương. Giai đoạn đầu cực kỳ khó khăn: nghĩa quân nhiều lần bị quân Minh vây đánh ở vùng núi Thanh Hóa, phải rút lui liên tục. Cuối năm 1418 (có tài liệu ghi 1419), nghĩa quân bị vây ngặt ở núi Chí Linh, tướng Lê Lai liều mình đóng giả Lê Lợi để nhử địch, giúp chủ tướng và lực lượng chính thoát hiểm.",
      "Năm 1424, theo kế của Nguyễn Chích, nghĩa quân chuyển hướng vào Nghệ An — vùng đất rộng, dân đông, xa trung tâm cai trị của quân Minh — làm bàn đạp mở rộng lực lượng. Từ Nghệ An, nghĩa quân đánh chiếm Diễn Châu, Thanh Hóa rồi Tân Bình, Thuận Hóa, kiểm soát một dải đất rộng lớn từ Thanh Hóa vào đến Thuận Hóa.",
      "Năm 1426, nghĩa quân tiến ra Bắc, đánh tan quân Minh trong trận Tốt Động – Chúc Động (Chương Mỹ, Hà Nội ngày nay), rồi vây chặt thành Đông Quan (Thăng Long). Đầu năm 1427, hai đạo viện binh nhà Minh do Liễu Thăng và Mộc Thạnh chỉ huy sang cứu viện đều bị đánh tan ở Chi Lăng – Xương Giang; Liễu Thăng tử trận.",
      "Cuối năm 1427, tổng binh Minh Vương Thông ở Đông Quan xin giảng hòa. Hội thề Đông Quan được tổ chức, quân Minh cam kết rút quân về nước; đầu năm 1428, đạo quân cuối cùng rời khỏi Đại Việt. Nguyễn Trãi thay Lê Lợi soạn Bình Ngô đại cáo, bố cáo thắng lợi và tuyên bố nền độc lập. Lê Lợi lên ngôi Hoàng đế, đặt niên hiệu Thuận Thiên, lập nhà Hậu Lê.",
    ],
    yNghia: [
      "Khởi nghĩa Lam Sơn chấm dứt 20 năm Bắc thuộc dưới ách nhà Minh, khôi phục nền độc lập và mở ra gần 360 năm tồn tại của nhà Hậu Lê (kể cả giai đoạn Lê trung hưng). Bình Ngô đại cáo, văn kiện tổng kết cuộc kháng chiến, được xem là một trong những áng văn lập quốc quan trọng nhất của lịch sử Việt Nam.",
      "Cuộc khởi nghĩa cũng để lại một mô hình kết hợp đấu tranh quân sự với chiêu dụ, ngoại giao — nhiều thành của quân Minh ra hàng nhờ thư từ chiêu dụ của Nguyễn Trãi thay vì phải công phá bằng vũ lực.",
    ],
    disputed:
      "Năm xảy ra sự việc Lê Lai liều mình cứu chúa: một số sách ghi 1418 (ngay sau khi dựng cờ), Đại Việt thông sử ghi ông hy sinh ngày 29 tháng 4 âm lịch năm Mậu Tuất 1418, trong khi một số tài liệu phổ biến khác ghi năm 1419; Đại Việt sử ký toàn thư không chép trực tiếp sự việc này. Đây là điểm các nguồn không thống nhất, xem thêm bài “Lê Lai cứu chúa: sử liệu ghi gì?”. Cơ chế hành quân, số trận đánh nhỏ trong giai đoạn 1424–1426 cũng được các sách chép với mức chi tiết khác nhau tùy nguồn (Lam Sơn thực lục so với Đại Việt sử ký toàn thư).",
    relatedPeople: ["le-loi", "nguyen-trai", "le-lai"],
    relatedEvents: [],
    updatedAt: "2026-09-29",
    sources: [
      { text: "Ngô Sĩ Liên và sử quan triều Hậu Lê, Đại Việt Sử Ký Toàn Thư, bản kỷ nhà Lê." },
      { text: "Lam Sơn thực lục (tương truyền biên soạn theo lời kể của Lê Lợi và các khai quốc công thần)." },
      { text: "Nguyễn Trãi, Bình Ngô đại cáo." },
      { text: "Viện Sử học, Lịch sử Việt Nam, tập 3 (khởi nghĩa Lam Sơn và thời Lê sơ)." },
    ],
  },
  {
    slug: "ngoc-hoi-dong-da",
    title: "Chiến dịch Ngọc Hồi – Đống Đa (1789)",
    label: "chinh-su",
    summary:
      "Cuối tháng Chạp năm Mậu Thân, Nguyễn Huệ lên ngôi hoàng đế rồi lập tức đưa quân từ Phú Xuân ra Bắc, hành quân thần tốc giữa mùa Tết để đánh úp 29 vạn quân Thanh đang đóng ở Thăng Long — đỉnh điểm là loạt trận Hà Hồi, Ngọc Hồi, Đống Đa trong ba ngày mùng 3–5 Tết Kỷ Dậu.",
    lunar: { day: 5, month: 1, year: 1789 },
    lunarText: "Mùng 5 tháng Giêng năm Kỷ Dậu (1789) — ngày quyết chiến ở Ngọc Hồi và Đống Đa, kết thúc chiến dịch xuất quân từ cuối tháng Chạp năm Mậu Thân (1788)",
    solarDateSource: "computed",
    dynasty: "tay-son",
    boiCanh: [
      "Tháng 11 năm Mậu Thân (1788), vua Lê Chiêu Thống cầu viện nhà Thanh để chống lại quân Tây Sơn. Tôn Sĩ Nghị đem 29 vạn quân (gồm cả dân phu) tiến vào chiếm Thăng Long gần như không gặp kháng cự đáng kể; quân Tây Sơn dưới quyền Ngô Văn Sở chủ động rút về giữ phòng tuyến Tam Điệp – Biện Sơn theo mưu kế của Ngô Thì Nhậm, tránh giao chiến sớm.",
      "Được tin báo, ngày 25 tháng 11 năm Mậu Thân, Nguyễn Huệ lên ngôi Hoàng đế tại núi Bân (Phú Xuân), lấy niên hiệu Quang Trung, rồi lập tức xuất quân ra Bắc — tuyển thêm quân dọc đường ở Nghệ An, Thanh Hóa, đến Tam Điệp hợp cùng lực lượng đã rút lui trước đó.",
    ],
    dienBien: [
      "Theo truyền tụng được nhiều sử gia dẫn lại, Nguyễn Huệ cho quân ăn Tết sớm tại Tam Điệp hoặc Nghệ An (tùy bản kể) vào ngày 30 tháng Chạp, hẹn ngày mùng 7 tháng Giêng sẽ vào Thăng Long ăn Tết lại, rồi chia quân thành nhiều đạo tiến ra Bắc trong đêm.",
      "Đêm mùng 3 Tết, quân Tây Sơn bất ngờ vây đồn Hà Hồi (Thường Tín), quân Thanh trong đồn phải đầu hàng không kịp kháng cự. Rạng sáng mùng 5 Tết, đạo quân chủ lực do đích thân Quang Trung chỉ huy công phá đồn Ngọc Hồi — cứ điểm phòng thủ kiên cố nhất phía nam Thăng Long — cùng lúc một đạo quân khác đánh đồn Khương Thượng, nơi tướng Sầm Nghi Đống đóng quân, gần gò Đống Đa.",
      "Sầm Nghi Đống thắt cổ tự vẫn; quân Thanh ở Khương Thượng và Đống Đa tan vỡ. Tôn Sĩ Nghị nghe tin từ Thăng Long, hoảng loạn bỏ chạy về phương Bắc, dẫm đạp lên nhau qua cầu phao sông Hồng khiến cầu sập, nhiều quân Thanh chết đuối. Trưa mùng 5 Tết, quân Tây Sơn tiến vào Thăng Long — sớm hơn hai ngày so với lời hẹn mùng 7 mà Quang Trung đã tuyên bố trước khi xuất quân.",
    ],
    yNghia: [
      "Chiến dịch Ngọc Hồi – Đống Đa đánh bại đạo quân xâm lược lớn nhất mà nhà Thanh từng đưa sang Đại Việt, buộc nhà Thanh từ bỏ hẳn ý đồ can thiệp và sau đó phải công nhận Quang Trung. Chiến thắng gắn liền với hình ảnh cuộc hành quân thần tốc — từ Phú Xuân ra đến Thăng Long trong thời gian rất ngắn giữa mùa đông.",
      "Gò Đống Đa, nơi chôn cất xác quân Thanh sau trận đánh, về sau trở thành nơi tổ chức lễ hội kỷ niệm chiến thắng vào mùng 5 Tết âm lịch hằng năm.",
    ],
    disputed:
      "Cách gọi “trận Ngọc Hồi – Đống Đa” gộp chung nhiều mũi tấn công diễn ra gần như đồng thời ở các địa điểm khác nhau quanh Thăng Long (Hà Hồi, Ngọc Hồi, Khương Thượng – Đống Đa) trong cùng một chiến dịch, không phải một trận đánh tại một địa điểm duy nhất — cần phân biệt rõ khi đọc các bài tường thuật gọn. Cơ chế hành quân thần tốc (có dùng cáng khiêng luân phiên quân sĩ hay không, tốc độ chính xác từng chặng) được Hoàng Lê nhất thống chí và một số sử liệu triều Nguyễn mô tả với chi tiết không hoàn toàn thống nhất; đây thuộc loại chi tiết kỹ thuật quân sự chưa có đồng thuận tuyệt đối giữa các nguồn.",
    relatedPeople: ["quang-trung"],
    relatedEvents: [],
    updatedAt: "2026-09-29",
    sources: [
      { text: "Ngô gia văn phái, Hoàng Lê nhất thống chí." },
      { text: "Quốc sử quán triều Nguyễn, Khâm định Việt sử thông giám cương mục." },
      { text: "Viện Sử học, Lịch sử Việt Nam, tập 4 (phong trào Tây Sơn)." },
    ],
  },
];

const FIXTURE: SuKien = {
  slug: FIXTURE_SLUG,
  title: "Sự kiện mẫu (chỉ dev)",
  label: "chinh-su",
  summary: "[Dữ liệu mẫu để xem bố cục] Một câu mô tả ngắn về sự kiện.",
  lunar: { day: 12, month: 8, year: 1428 },
  solarDateSource: "computed",
  dynasty: "le-so",
  boiCanh: ["[Mẫu] Đoạn bối cảnh thứ nhất.", "[Mẫu] Đoạn bối cảnh thứ hai."],
  dienBien: ["[Mẫu] Đoạn diễn biến."],
  yNghia: ["[Mẫu] Đoạn ý nghĩa."],
  disputed: "[Mẫu] Nguồn A ghi ngày khác với nguồn B; trang này theo nguồn A.",
  relatedNhanVat: [FIXTURE_SLUG],
  updatedAt: "2026-09-25",
  sources: [{ text: "[Nguồn mẫu — thay bằng nguồn thật]" }],
};

export const SU_KIEN: readonly SuKien[] = SHOW_FIXTURES ? [...REAL, FIXTURE] : REAL;
export const suKienBySlug = (slug: string) => SU_KIEN.find((n) => n.slug === slug);
