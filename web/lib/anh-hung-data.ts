/**
 * Dữ liệu chuyên mục Các anh hùng dân tộc — trích từ các bài Wikipedia tiếng Việt (trường wikiTitle,
 * truy cập 24/9/2026) và dữ liệu trang lễ lib/le.ts. Không thêm niên đại/công trạng ngoài nguồn;
 * điểm sử liệu chưa thống nhất ghi ở ghiChuSuLieu. Công trạng đầu tiên là mốc hiển thị trên dòng thời gian.
 */
import type { AnhHung } from "./anh-hung";

export const ANH_HUNG_DATA: AnhHung[] = [
  {
    slug: "hung-vuong",
    ten: "Hùng Vương",
    tenThat: null,
    tenKhac: ["Vua Hùng", "Quốc tổ Hùng Vương"],
    namSinh: null,
    namMat: null,
    nienDai: "Thời Hồng Bàng (truyền thuyết)",
    queQuan: "Phong Châu, kinh đô nước Văn Lang theo truyền thuyết (vùng Việt Trì, Phú Thọ ngày nay)",
    thoiKy: "hong-bang",
    trieuDai: "Hồng Bàng",
    namMoc: -700,
    tomTat: "Theo truyền thuyết, Hùng Vương là các vị vua nước Văn Lang, truyền 18 đời, được người Việt tôn thờ là Quốc tổ với công lao dựng nước.",
    tieuSu: [
      "Hùng Vương hay vua Hùng là cách gọi các vị vua nước Văn Lang của người Lạc Việt, tồn tại vào khoảng thế kỷ VII đến thế kỷ II trước Công nguyên. Theo truyền thuyết, Hùng Vương có 18 đời vua, đóng đô ở Phong Châu.",
      "Tương truyền Lạc Long Quân và Âu Cơ sinh ra bọc trăm trứng, nở thành trăm người con. Âu Cơ cùng năm mươi người con lên ở Phong Châu, tôn người con trưởng làm vua, hiệu là Hùng Vương. Hùng Vương đặt quốc hiệu Văn Lang, chia nước làm 15 bộ; tướng văn gọi là Lạc hầu, tướng võ là Lạc tướng, con trai vua gọi là Quan lang, con gái vua gọi là Mị nương.",
      "Theo truyền thuyết và Đại Việt sử ký toàn thư, cuối thời Hùng Vương, Thục Phán đem quân đánh Văn Lang; vua Hùng thất thế và nước Văn Lang về tay Thục Phán (An Dương Vương), theo niên đại truyền thuyết là năm 258 trước Công nguyên.",
    ],
    boiCanh: [
      "Thời đại Hùng Vương tương ứng với giai đoạn văn hóa Đông Sơn. Cư dân Văn Lang, khoảng 40 – 50 vạn người, sống chủ yếu ở trung du và hạ du sông Hồng, sông Mã, canh tác lúa nước; vũ khí đồng phát triển, hình thành tầng lớp thủ lĩnh như Lạc hầu, Lạc tướng.",
      "Danh xưng Hùng Vương được chép trong Lĩnh Nam chích quái và Đại Việt sử lược; đến thời Hậu Lê, Đại Việt sử ký toàn thư chính thức đưa Hùng Vương làm quốc tổ. Một số sách cổ Trung Quốc lại chép là Lạc Vương, có thể do hai chữ Hán viết gần giống nhau.",
    ],
    congTrang: [
      "Theo truyền thuyết, lập nước Văn Lang, đóng đô ở Phong Châu và chia nước làm 15 bộ.",
      "Được tôn thờ là Quốc tổ, người có công dựng nước; Đại Việt sử ký toàn thư đưa Hùng Vương làm quốc tổ.",
      "Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ được UNESCO công nhận là di sản văn hóa phi vật thể của nhân loại năm 2012.",
    ],
    suKien: [
      {
        nam: "2524 TCN",
        text: "Theo truyền thuyết, Hùng Vương thứ nhất lên ngôi, đặt quốc hiệu Văn Lang.",
      },
      {
        nam: "thế kỷ VII TCN",
        text: "Khoảng thời gian nước Văn Lang của người Lạc Việt bắt đầu tồn tại (khoảng thế kỷ VII – II TCN).",
      },
      {
        nam: "258 TCN",
        text: "Theo truyền thuyết, Thục Phán (An Dương Vương) chiếm Văn Lang, kết thúc thời Hùng Vương.",
      },
      {
        nam: "1954",
        text: "Chủ tịch Hồ Chí Minh thăm Đền Hùng (19/9/1954), căn dặn: “Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước”.",
      },
      {
        nam: "2001",
        text: "Nghị định 82/2001/NĐ-CP quy định nghi lễ Giỗ Tổ; ngày 10 tháng 3 âm lịch trở thành ngày quốc lễ.",
      },
      {
        nam: "2012",
        text: "UNESCO công nhận Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ là di sản văn hóa phi vật thể của nhân loại.",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích lịch sử Đền Hùng (đền Hạ, đền Trung, đền Thượng, đền Giếng)",
        diaDiem: "Núi Nghĩa Lĩnh, xã Hy Cương, Việt Trì, Phú Thọ",
      },
      {
        ten: "Lăng Hùng Vương (tương truyền là mộ vua Hùng thứ sáu)",
        diaDiem: "Cạnh đền Thượng, đỉnh núi Nghĩa Lĩnh, Phú Thọ",
      },
      {
        ten: "Miếu Lịch Đại Đế Vương (dựng năm 1823)",
        diaDiem: "Xã Dương Xuân, phía nam kinh thành Huế",
      },
    ],
    tuongNiem: [
      "Giỗ Tổ Hùng Vương – Lễ hội Đền Hùng ngày 10 tháng 3 âm lịch tại Đền Hùng (Phú Thọ), là ngày quốc lễ.",
      "Câu ca dao: “Dù ai đi ngược về xuôi, nhớ ngày giỗ Tổ mùng 10 tháng 3”.",
    ],
    ghiChuSuLieu:
      "Các chi tiết về Hùng Vương chủ yếu thuộc truyền thuyết, được ghi chép từ Lĩnh Nam chích quái và Đại Việt sử ký toàn thư; các mốc 2524 và 258 TCN là niên đại truyền thuyết. Con số 18 đời thường được các nhà sử học hiểu là 18 chi hoặc con số ước lệ.",
    wikiTitle: "Hùng Vương",
    leSlug: "gio-to-hung-vuong",
    tieuBieu2013: true,
  },
  {
    slug: "hai-ba-trung",
    ten: "Hai Bà Trưng",
    tenThat: "Trưng Trắc, Trưng Nhị",
    tenKhac: ["Trưng Vương", "Trưng Nữ Vương", "Trưng Thánh vương"],
    namSinh: null,
    namMat: "43",
    nienDai: "? – 43",
    queQuan: "Mê Linh; theo truyền thống, quê nội Hai Bà ở làng Hạ Lôi (Mê Linh, Hà Nội). Vị trí huyện Mê Linh thời Hán còn nhiều thuyết khác nhau",
    thoiKy: "bac-thuoc",
    trieuDai: "Trưng Vương",
    namMoc: 40,
    tomTat: "Hai chị em Trưng Trắc, Trưng Nhị lãnh đạo khởi nghĩa năm 40 chống ách đô hộ nhà Đông Hán; Trưng Trắc xưng vương, đóng đô ở Mê Linh.",
    tieuSu: [
      "Trưng Trắc và Trưng Nhị là con gái Lạc tướng huyện Mê Linh. Trưng Trắc lấy chồng là Thi Sách, con Lạc tướng huyện Chu Diên. Theo truyền thống, quê nội Hai Bà ở làng Hạ Lôi, mẹ Hai Bà là bà Man Thiện.",
      "Bất bình trước sự cai trị hà khắc của Thái thú Giao Chỉ Tô Định, tháng 2 năm 40 Hai Bà phát động khởi nghĩa, đánh chiếm trị sở Luy Lâu, buộc Tô Định chạy về Nam Hải. Các quận Cửu Chân, Nhật Nam, Hợp Phố hưởng ứng; Hai Bà lấy được 65 thành. Trưng Trắc xưng vương, đóng đô ở Mê Linh và cai quản đất Lĩnh Nam trong khoảng ba năm.",
      "Nhà Hán sai Phục Ba tướng quân Mã Viện đem quân sang. Sau trận giao tranh ở Lãng Bạc, Hai Bà lui về giữ Cấm Khê và năm 43 thất thế, hy sinh. Theo truyền thuyết Việt Nam, Hai Bà gieo mình xuống sông Hát tự vẫn; còn Hậu Hán thư chép Hai Bà bị quân Mã Viện bắt và giết.",
    ],
    boiCanh: [
      "Đầu Công nguyên, vùng đất của người Việt nằm dưới sự cai trị của nhà Đông Hán, chia thành các quận Giao Chỉ, Cửu Chân, Nhật Nam; các Lạc tướng người Việt vẫn nắm quyền cai quản cấp huyện. Theo một số học giả, chính sách đồng hóa và bóc lột hà khắc đã khiến các Lạc tướng liên kết chống Hán.",
      "Sau thất bại của Hai Bà, nhà Hán đặt quan lại cai trị đến cấp huyện, quyền lực của các Lạc tướng, Lạc hầu bị thủ tiêu, mở đầu thời kỳ Bắc thuộc lần thứ hai.",
    ],
    congTrang: [
      "Lãnh đạo cuộc khởi nghĩa năm 40, đánh đuổi Thái thú Tô Định, giành lại quyền tự chủ.",
      "Được các quận Cửu Chân, Nhật Nam, Hợp Phố hưởng ứng, thu phục 65 thành ở Lĩnh Nam.",
      "Trưng Trắc xưng vương, đóng đô ở Mê Linh; theo Viện Sử học, Trưng Vương cho dân được miễn thuế hai năm.",
    ],
    suKien: [
      {
        nam: "khoảng 39 – 40",
        text: "Theo một số học giả, Thái thú Tô Định giết Thi Sách, chồng bà Trưng Trắc.",
      },
      {
        nam: "40",
        text: "Tháng 2, Hai Bà phát động khởi nghĩa, hạ trị sở Luy Lâu; Trưng Trắc xưng vương, đóng đô ở Mê Linh.",
      },
      {
        nam: "42",
        text: "Nhà Hán sai Mã Viện, Lưu Long, Đoàn Chí đem quân sang đánh Hai Bà.",
      },
      {
        nam: "43",
        text: "Hai Bà thất thế ở Cấm Khê và hy sinh; nhà Hán lập lại ách cai trị, mở đầu thời kỳ Bắc thuộc lần thứ hai.",
      },
    ],
    diTich: [
      {
        ten: "Đền Hạ Lôi",
        diaDiem: "Thôn Hạ Lôi, huyện Mê Linh, Hà Nội",
      },
      {
        ten: "Đền Đồng Nhân",
        diaDiem: "Quận Hai Bà Trưng, Hà Nội",
      },
      {
        ten: "Đền Hát Môn",
        diaDiem: "Xã Hát Môn, huyện Phúc Thọ, Hà Nội",
      },
    ],
    tuongNiem: ["Giỗ Hai Bà Trưng ngày 6 tháng 2 âm lịch, tổ chức tại các đền thờ Hai Bà như đền Hạ Lôi, đền Đồng Nhân, đền Hát Môn."],
    ghiChuSuLieu:
      "Sử Việt chép Hai Bà tự vẫn ở sông Hát, còn Hậu Hán thư chép Hai Bà bị bắt và giết; vị trí kinh đô Mê Linh cũng còn nhiều ý kiến khác nhau. Năm sinh 14 được ghi chung cho Hai Bà; về năm nhà Hán hạ lệnh xuất quân, có tài liệu ghi năm 41, Hậu Hán thư ghi Mã Viện được sai đi năm 42.",
    wikiTitle: "Hai Bà Trưng",
    leSlug: "gio-hai-ba-trung",
    tieuBieu2013: true,
  },
  {
    slug: "ba-trieu",
    ten: "Bà Triệu",
    tenThat: "Triệu Thị Trinh",
    tenKhac: ["Triệu Ẩu", "Triệu Trinh Nương", "Nhụy Kiều tướng quân", "Lệ Hải Bà Vương"],
    namSinh: "226",
    namMat: "248",
    nienDai: "226 – 248",
    queQuan: "Làng Quan Yên (Quân Yên), quận Cửu Chân; nay thuộc xã Định Tân, huyện Yên Định, Thanh Hóa",
    thoiKy: "bac-thuoc",
    trieuDai: "Bắc thuộc",
    namMoc: 248,
    tomTat: "Nữ thủ lĩnh lãnh đạo khởi nghĩa ở quận Cửu Chân năm 248 chống ách đô hộ nhà Đông Ngô, được tôn là Nhụy Kiều tướng quân.",
    tieuSu: [
      "Triệu Thị Trinh sinh năm 226 ở miền núi Quan Yên, quận Cửu Chân (Thanh Hóa ngày nay). Cha mẹ mất sớm, bà ở với anh là Triệu Quốc Đạt, một hào trưởng ở Quan Yên. Bà có sức khỏe, giỏi võ nghệ; năm 19 tuổi, bà vào núi Nưa, chiêu mộ được hơn một nghìn tráng sĩ.",
      "Mùa xuân năm 248, bà cùng anh khởi binh chống quan lại nhà Đông Ngô, đánh chiếm huyện trị Tư Phố. Khi Triệu Quốc Đạt qua đời, nghĩa quân tôn bà làm chủ tướng. Bà phối hợp với ba anh em họ Lý ở Bồ Điền và lập tuyến phòng thủ đến cửa biển Thần Phù. Khi ra trận, bà mặc áo giáp vàng, cưỡi voi và được tôn là Nhụy Kiều tướng quân.",
      "Nhà Ngô sai Lục Dận sang làm Thứ sử Giao Châu, đem 8.000 quân đàn áp và dùng của cải mua chuộc, chia rẽ nghĩa quân. Căn cứ Bồ Điền bị vây, cầm cự hơn hai tháng rồi thất thủ. Bà tuẫn tiết trên núi Tùng (xã Triệu Lộc, Thanh Hóa) năm 248.",
    ],
    boiCanh: [
      "Thế kỷ III, quận Cửu Chân nằm dưới ách đô hộ của nhà Đông Ngô dưới thời vua Tôn Quyền. Quan lại nhà Ngô tàn ác, dân chúng khổ sở; đó là nguyên nhân Bà Triệu cùng anh khởi binh năm 248.",
      "Cuộc khởi nghĩa được dân chúng hưởng ứng, nhưng do chênh lệch lực lượng và không có sự hỗ trợ của các phong trào khác nên cuối cùng thất bại trước quân của Lục Dận.",
    ],
    congTrang: [
      "Cùng anh là Triệu Quốc Đạt khởi binh năm 248, đánh chiếm huyện trị Tư Phố, căn cứ lớn của nhà Ngô ở Cửu Chân.",
      "Lãnh đạo nghĩa quân sau khi Triệu Quốc Đạt mất, liên kết với ba anh em họ Lý ở Bồ Điền.",
      "Xây dựng tuyến phòng thủ từ Bồ Điền đến cửa biển Thần Phù để chặn viện binh nhà Ngô theo đường biển.",
      "Được sử cũ đánh giá là bậc hùng tài trong nữ giới; tên bà được đặt cho huyện Triệu Sơn và xã Triệu Lộc (Thanh Hóa).",
    ],
    suKien: [
      {
        nam: "226",
        text: "Sinh ngày 2 tháng 10 năm Bính Ngọ ở miền núi Quan Yên, quận Cửu Chân.",
      },
      {
        nam: "248",
        text: "Mùa xuân, cùng anh Triệu Quốc Đạt khởi binh chống nhà Đông Ngô, đánh chiếm huyện trị Tư Phố.",
      },
      {
        nam: "248",
        text: "Triệu Quốc Đạt mất, nghĩa quân tôn bà làm chủ tướng; nhà Ngô sai Lục Dận đem 8.000 quân sang đàn áp.",
      },
      {
        nam: "248",
        text: "Căn cứ Bồ Điền thất thủ sau hơn hai tháng bị vây; bà tuẫn tiết trên núi Tùng.",
      },
    ],
    diTich: [
      {
        ten: "Đền Bà Triệu",
        diaDiem: "Núi Gai, thôn Phú Điền, xã Triệu Lộc, huyện Hậu Lộc, Thanh Hóa",
      },
      {
        ten: "Lăng mộ Bà Triệu",
        diaDiem: "Núi Tùng, xã Triệu Lộc, huyện Hậu Lộc, Thanh Hóa",
      },
      {
        ten: "Lầu Bà Cố Hỷ",
        diaDiem: "Trà Vinh",
      },
    ],
    tuongNiem: ["Lễ giỗ Bà Triệu tổ chức hằng năm vào tháng 2 âm lịch tại đền Bà Triệu (xã Triệu Lộc, Thanh Hóa); có nguồn ghi ngày 21, có nguồn ghi ngày 22."],
    ghiChuSuLieu:
      "Sử cũ gọi bà là Triệu Ẩu; các tên Triệu Thị Trinh, Triệu Trinh Nương được đặt về sau. Giáo sư Lê Mạnh Thát cho rằng bà không thua Lục Dận năm 248, nhưng ý kiến này chưa được giới sử học đồng thuận rộng rãi.",
    wikiTitle: "Bà Triệu",
    leSlug: "gio-ba-trieu",
  },
  {
    slug: "ly-nam-de",
    ten: "Lý Nam Đế",
    tenThat: "Lý Bí",
    tenKhac: ["Lý Bôn", "Nam Việt Đế", "Tiền Lý Nam Đế"],
    namSinh: "503",
    namMat: "548",
    nienDai: "503 – 548",
    queQuan:
      "Có nhiều thuyết: sử cũ ghi Thái Bình, phủ Long Hưng; nhiều nhà nghiên cứu cho là vùng Sơn Tây (Hà Nội); hội thảo khoa học năm 2012 kết luận quê gốc ở thôn Cổ Pháp, xã Tiên Phong, huyện Phổ Yên, Thái Nguyên",
    thoiKy: "bac-thuoc",
    trieuDai: "Tiền Lý",
    namMoc: 544,
    tomTat: "Lý Bí lãnh đạo khởi nghĩa đánh đuổi quân Lương, năm 544 lên ngôi hoàng đế, đặt quốc hiệu Vạn Xuân, mở ra nhà Tiền Lý.",
    tieuSu: [
      "Lý Nam Đế, húy là Lý Bí (có thể đọc là Lý Bôn), sinh năm 503. Tổ tiên ông là người phương Bắc sang Giao Châu lánh nạn từ cuối thời Tây Hán, qua nhiều đời đã thành người Việt. Ông từng được Thứ sử Giao Châu Tiêu Tư nhà Lương mời làm Giám quân ở Đức châu, nhưng bất bình với quan lại đô hộ tàn ác nên bỏ quan về quê chiêu tập binh mã.",
      "Cuối năm 541, Lý Bí khởi binh, Tiêu Tư bỏ chạy về Quảng Châu; ông chiếm thành Long Biên, đánh bại các cuộc phản công của nhà Lương năm 542 và sai Phạm Tu đánh lui quân Lâm Ấp năm 543. Tháng Giêng năm 544, ông lên ngôi, xưng Nam Việt Đế, đặt niên hiệu Thiên Đức, quốc hiệu Vạn Xuân, dựng điện Vạn Thọ ở vùng cửa sông Tô Lịch.",
      "Năm 545, nhà Lương sai Trần Bá Tiên đem quân sang. Lý Nam Đế thua ở Chu Diên và cửa sông Tô Lịch, mất thành Gia Ninh năm 546, rồi thua tiếp ở hồ Điển Triệt. Ông lui về động Khuất Lão, giao quyền cho Triệu Quang Phục, và mất vì bệnh năm 548.",
    ],
    boiCanh: [
      "Đầu thế kỷ VI, nhà Lương đô hộ Giao Châu. Sự tàn ác của quan lại đô hộ khiến nhiều hào kiệt như Triệu Túc, Triệu Quang Phục, Tinh Thiều, Phạm Tu theo về với Lý Bí. Ở phía nam, nước Lâm Ấp cũng nhòm ngó Giao Châu.",
      "Nước Vạn Xuân chỉ tồn tại được vài năm trước cuộc phản công của nhà Lương, nhưng theo Khâm định Việt sử thông giám cương mục, việc Lý Nam Đế tự làm chủ nước mình đã tạo thanh thế và mở đường cho các triều đại về sau.",
    ],
    congTrang: [
      "Lãnh đạo khởi nghĩa cuối năm 541, đánh đuổi Thứ sử Tiêu Tư, làm chủ Giao Châu.",
      "Đánh tan các đợt phản công của nhà Lương năm 542, trong đó có trận ở Hợp Phố.",
      "Sai Phạm Tu đánh lui quân Lâm Ấp xâm lấn ở Cửu Đức năm 543.",
      "Lên ngôi năm 544, đặt quốc hiệu Vạn Xuân, niên hiệu Thiên Đức, lập triều đình với hai ban văn, võ.",
    ],
    suKien: [
      {
        nam: "503",
        text: "Sinh ngày 12 tháng 9 năm Quý Mùi (17/10/503).",
      },
      {
        nam: "541",
        text: "Cuối năm, khởi binh chống nhà Lương; Thứ sử Tiêu Tư bỏ chạy về Quảng Châu.",
      },
      {
        nam: "543",
        text: "Phạm Tu đánh tan quân Lâm Ấp ở Cửu Đức.",
      },
      {
        nam: "544",
        text: "Tháng Giêng, lên ngôi Nam Việt Đế, đặt niên hiệu Thiên Đức, quốc hiệu Vạn Xuân.",
      },
      {
        nam: "546",
        text: "Trần Bá Tiên chiếm thành Gia Ninh; quân Vạn Xuân tan vỡ ở hồ Điển Triệt.",
      },
      {
        nam: "548",
        text: "Mất ngày 20 tháng 3 âm lịch (13/4/548) tại động Khuất Lão.",
      },
    ],
    diTich: [
      {
        ten: "Động Khuất Lão (nơi ông lui giữ và mất)",
        diaDiem: "Xã Văn Lương, huyện Tam Nông, Phú Thọ",
      },
      {
        ten: "Thành Gia Ninh",
        diaDiem: "Xã Thanh Đình, Việt Trì, Phú Thọ",
      },
    ],
    tuongNiem: [],
    ghiChuSuLieu:
      "Quê hương Lý Nam Đế có nhiều thuyết khác nhau. Thời gian trị vì thường ghi là 544 – 548, nhưng cũng có chỗ chép ông ở ngôi năm năm (543 – 548); có thuyết cho rằng ông không mất vì bệnh mà bị người Lạo giết hại.",
    wikiTitle: "Lý Nam Đế",
    tieuBieu2013: true,
  },
  {
    slug: "mai-hac-de",
    ten: "Mai Hắc Đế",
    tenThat: "Mai Thúc Loan",
    tenKhac: ["Vua Mai", "Hắc Đế"],
    namSinh: "670",
    namMat: "723",
    nienDai: "670 – 723",
    queQuan: "Thôn Ngọc Trừng, châu Hoan (vùng Nam Đàn, Nghệ An); Việt sử tiêu án chép là làng Hương Lãm, huyện Nam Đường",
    thoiKy: "bac-thuoc",
    trieuDai: "Bắc thuộc",
    namMoc: 722,
    tomTat: "Mai Thúc Loan lãnh đạo khởi nghĩa Hoan Châu chống ách đô hộ nhà Đường đầu thế kỷ VIII, xưng Mai Hắc Đế và lập kinh đô Vạn An.",
    tieuSu: [
      "Mai Thúc Loan sinh năm 670 ở thôn Ngọc Trừng, châu Hoan (Nghệ An). Năm ông 10 tuổi, mẹ bị hổ vồ, ít lâu sau cha cũng mất; ông được bạn của cha là Đinh Thế nuôi dưỡng và gả con gái là Ngọc Tô. Ông khỏe mạnh, giỏi đô vật, mở lò vật, lập phường săn và kết giao với nhiều hào kiệt.",
      "Ông phát động khởi nghĩa tại Rú Đụn (Hùng Sơn), lên ngôi, lấy hiệu Mai Hắc Đế, xây thành lũy, lập kinh đô Vạn An. Cuộc nổi dậy được hưởng ứng rộng rãi, có liên kết với Lâm Ấp và Chân Lạp. Ông tiến đánh thành Tống Bình, khiến Đô hộ nhà Đường là Quang Sở Khách bỏ thành chạy về nước.",
      "Mùa thu năm 722, nhà Đường huy động khoảng 10 vạn quân do Dương Tư Húc và Quang Sở Khách chỉ huy sang đàn áp. Sau nhiều trận đánh, thành Vạn An thất thủ, nghĩa quân tan vỡ; Mai Hắc Đế rút vào rừng, sau bị ốm rồi mất. Tương truyền con ông là Mai Thúc Huy (Mai Thiếu Đế) tiếp tục chống cự đến năm 723.",
    ],
    boiCanh: [
      "Năm 605, nhà Tùy thiết lập ách đô hộ trên đất Việt; sau đó nhà Đường thay thế, đặt An Nam đô hộ phủ, đóng ở Giao Châu. Các nhà nghiên cứu hiện nay thống nhất rằng sưu cao, thuế nặng là nguyên nhân khiến nhân dân nổi dậy, tiêu biểu là khởi nghĩa Hoan Châu.",
      "Chuyện dân phu gánh vải cống nhà Đường nổi dậy chỉ là truyền thuyết lưu truyền ở vùng Nam Đàn; nhiều nhà nghiên cứu cho rằng việc cống vải từ An Nam không có thật.",
    ],
    congTrang: [
      "Lãnh đạo khởi nghĩa Hoan Châu chống ách đô hộ nhà Đường đầu thế kỷ VIII.",
      "Xưng Mai Hắc Đế, xây thành lũy và lập kinh đô Vạn An.",
      "Đánh chiếm thành Tống Bình, buộc Đô hộ nhà Đường là Quang Sở Khách bỏ chạy về nước.",
      "Liên kết với Lâm Ấp và Chân Lạp, tập hợp lực lượng lớn chống quân Đường.",
    ],
    suKien: [
      {
        nam: "670",
        text: "Sinh năm Canh Ngọ ở thôn Ngọc Trừng, châu Hoan.",
      },
      {
        nam: "713 (còn tranh luận)",
        text: "Mốc khởi nghĩa Hoan Châu theo một số tài liệu; thời điểm bùng nổ chính xác chưa được xác định.",
      },
      {
        nam: "722",
        text: "Mùa thu, nhà Đường sai Dương Tư Húc và Quang Sở Khách đem khoảng 10 vạn quân sang đàn áp; thành Vạn An thất thủ.",
      },
      {
        nam: "723",
        text: "Mai Hắc Đế mất; tương truyền con ông là Mai Thúc Huy tiếp tục chống quân Đường đến năm này.",
      },
      {
        nam: "2013",
        text: "Tỉnh Nghệ An tổ chức lễ kỷ niệm 1300 năm khởi nghĩa Hoan Châu.",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích tưởng niệm Mai Hắc Đế",
        diaDiem: "Thị trấn Nam Đàn, huyện Nam Đàn, Nghệ An",
      },
      {
        ten: "Đền, miếu vua Mai",
        diaDiem: "Xã Vạn An và thung lũng Đụn Sơn, Nam Đàn, Nghệ An",
      },
    ],
    tuongNiem: [
      "Lễ hội đền vua Mai tổ chức vào Rằm tháng Giêng âm lịch; thời Nguyễn từng được coi là quốc lễ.",
      "Rằm tháng Bảy âm lịch, nhân dân Nam Đàn làm lễ giỗ các nghĩa sĩ khởi nghĩa Hoan Châu tử trận, tục gọi là “giỗ trận vong tướng sĩ”.",
    ],
    ghiChuSuLieu:
      "Thời điểm bùng nổ khởi nghĩa còn tranh luận: có ý kiến cho là năm 713, trong khi các bộ chính sử chép cuộc khởi nghĩa bị dập tắt năm 722. Chuyện gánh vải cống nhà Đường là truyền thuyết, không được giới nghiên cứu coi là nguyên nhân thực của cuộc khởi nghĩa.",
    wikiTitle: "Mai Hắc Đế",
  },
  {
    slug: "phung-hung",
    ten: "Phùng Hưng",
    tenThat: null,
    tenKhac: ["Bố Cái Đại Vương", "Bố Cái Phu Hựu Chương Tín Sùng Nghĩa Đại vương"],
    namSinh: null,
    namMat: null,
    nienDai: "Thế kỷ VIII",
    queQuan: "Đường Lâm; theo truyền thống là vùng làng cổ Đường Lâm, Sơn Tây (Hà Nội), nhưng cũng có thuyết cho rằng Đường Lâm xưa ở Thanh Hóa hoặc Hà Tĩnh",
    thoiKy: "bac-thuoc",
    trieuDai: "Bắc thuộc",
    namMoc: 791,
    tomTat: "Phùng Hưng lãnh đạo khởi nghĩa chống ách đô hộ nhà Đường ở An Nam năm 791, được nhân dân tôn là Bố Cái Đại Vương.",
    tieuSu: [
      "Phùng Hưng là thủ lĩnh cuộc khởi nghĩa năm 791 chống ách đô hộ của nhà Đường ở An Nam, thời Bắc thuộc lần thứ ba. Năm sinh và năm mất của ông không rõ. Theo Việt điện u linh tập, ông người Đường Lâm; theo truyền thống, đó là vùng làng cổ Đường Lâm ở Sơn Tây, Hà Nội.",
      "Tư liệu về ông rất ít. Việt điện u linh tập, soạn vào thế kỷ XIV, là tác phẩm sớm nhất nói về Phùng Hưng, dẫn lại từ sách Giao Châu ký thời Đường nay đã thất lạc. Các bộ sử Trung Quốc như Cựu Đường thư, Tân Đường thư, Tư trị thông giám không nhắc tên Phùng Hưng mà chỉ chép về một thủ lĩnh bản địa tên Đỗ Anh Hàn dấy binh.",
      "Theo một số tài liệu, ông mất ở Tống Bình và con là Phùng An kế nhiệm. Ông được tôn là Bố Cái Đại Vương; Việt điện u linh tập giải nghĩa “Bố Cái” là “bố mẹ”, đặt theo tục gọi của người Việt.",
    ],
    boiCanh: [
      "Thời Bắc thuộc lần thứ ba (602 – 905), nhà Đường đặt An Nam đô hộ phủ để cai trị vùng đất người Việt, trị sở ở thành Tống Bình. Trước Phùng Hưng, đầu thế kỷ VIII đã có cuộc khởi nghĩa Hoan Châu do Mai Thúc Loan lãnh đạo.",
    ],
    congTrang: [
      "Lãnh đạo cuộc khởi nghĩa năm 791 chống ách đô hộ của nhà Đường ở An Nam.",
      "Được nhân dân tôn là Bố Cái Đại Vương, một trong những danh hiệu dùng chữ Nôm bản địa cổ nhất còn lưu truyền.",
      "Được thờ phụng lâu đời; lễ tưởng niệm tổ chức hằng năm tại đền thờ ông ở Đường Lâm.",
    ],
    suKien: [
      {
        nam: "791",
        text: "Lãnh đạo khởi nghĩa chống ách đô hộ nhà Đường ở An Nam.",
      },
      {
        nam: "thế kỷ XIV",
        text: "Việt điện u linh tập chép về Phùng Hưng và giải nghĩa tôn hiệu Bố Cái là “bố mẹ”.",
      },
      {
        nam: "1697 – 1859",
        text: "Đại Việt sử ký toàn thư và Khâm định Việt sử thông giám cương mục đều ghi nhận cách giải nghĩa tôn hiệu này.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Phùng Hưng",
        diaDiem: "Đường Lâm, Sơn Tây, Hà Nội",
      },
    ],
    tuongNiem: ["Lễ tưởng niệm Bố Cái Đại Vương ngày mùng 8 tháng Giêng âm lịch tại đền thờ Phùng Hưng ở Đường Lâm."],
    ghiChuSuLieu:
      "Sử Trung Quốc không nhắc tên Phùng Hưng mà chỉ chép về thủ lĩnh Đỗ Anh Hàn. Nghĩa của tôn hiệu “Bố Cái” còn tranh luận: nhiều nguồn hiểu là “bố mẹ”, một số nhà ngôn ngữ học cho là “vua lớn”; quê Đường Lâm của ông cũng có nhiều thuyết.",
    wikiTitle: "Phùng Hưng",
    leSlug: "gio-phung-hung",
  },
  {
    slug: "ngo-quyen",
    ten: "Ngô Quyền",
    tenThat: null,
    tenKhac: ["Tiền Ngô Vương", "Ngô Vương"],
    namSinh: "898",
    namMat: "944",
    nienDai: "898 – 944",
    queQuan: "Đường Lâm, Sơn Tây (Hà Nội) theo thuyết phổ biến; có thuyết khác đặt Đường Lâm xưa ở Thanh Hóa, Hà Tĩnh hoặc vùng núi phía tây nam Hà Nội",
    thoiKy: "the-ky-x",
    trieuDai: "Nhà Ngô",
    namMoc: 938,
    tomTat: "Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng năm 938, kết thúc thời Bắc thuộc; năm 939 xưng vương, lập nhà Ngô, đóng đô ở Cổ Loa.",
    tieuSu: [
      "Ngô Quyền sinh năm 898 trong một dòng họ hào trưởng có thế lực; cha là Ngô Mân, làm châu mục Đường Lâm. Lớn lên, ông làm nha tướng cho Dương Đình Nghệ, được gả con gái và giao cai quản Ái châu (Thanh Hóa ngày nay).",
      "Năm 937, Kiều Công Tiễn giết Dương Đình Nghệ rồi cầu cứu nhà Nam Hán. Mùa thu năm 938, Ngô Quyền kéo quân ra Bắc giết Kiều Công Tiễn. Khi quân Nam Hán do Lưu Hoằng Tháo chỉ huy kéo sang, ông cho đóng cọc lớn đầu bịt sắt ở cửa biển, dụ địch vào lúc triều lên; khi triều rút, thuyền địch mắc cọc, quân Nam Hán thua to, Hoằng Tháo bị giết.",
      "Mùa xuân năm 939, Ngô Quyền xưng vương, lập Dương thị làm hoàng hậu, đặt trăm quan, định triều nghi phẩm phục và đóng đô ở Cổ Loa. Ông mất năm 944; trước khi mất, ông di chúc cho Dương Tam Kha phò tá con là Ngô Xương Ngập.",
    ],
    boiCanh: [
      "Đầu thế kỷ X, nhà Đường sụp đổ (907), Trung Quốc bước vào thời Ngũ đại Thập quốc; ở phía nam, Lưu Nham dựng nước Nam Hán. Tại Tĩnh Hải quân, họ Khúc rồi Dương Đình Nghệ lần lượt giành quyền tự chủ, xưng Tiết độ sứ.",
      "Sau khi Ngô Quyền mất, nhà Ngô suy yếu nhanh, không khống chế được các thế lực cát cứ địa phương, dẫn tới loạn 12 sứ quân; nhà Ngô sụp đổ năm 965.",
    ],
    congTrang: [
      "Lãnh đạo quân dân đánh tan quân Nam Hán trong trận Bạch Đằng năm 938, chấm dứt thời kỳ Bắc thuộc.",
      "Dùng kế đóng cọc lớn đầu bịt sắt ở cửa biển, lợi dụng thủy triều để phá thủy quân Nam Hán.",
      "Xưng vương năm 939, lập nhà Ngô, xây dựng triều đình tự chủ và đóng đô ở Cổ Loa.",
      "Được Phan Bội Châu tôn là vị Tổ Trung hưng của Việt Nam.",
    ],
    suKien: [
      {
        nam: "898",
        text: "Sinh ngày 17/4/898 trong một dòng họ hào trưởng ở Đường Lâm.",
      },
      {
        nam: "937",
        text: "Kiều Công Tiễn giết Dương Đình Nghệ và cầu cứu nhà Nam Hán.",
      },
      {
        nam: "938",
        text: "Mùa thu, Ngô Quyền đem quân từ Ái châu ra Bắc, giết Kiều Công Tiễn.",
      },
      {
        nam: "938",
        text: "Đánh tan quân Nam Hán trên sông Bạch Đằng, giết Lưu Hoằng Tháo.",
      },
      {
        nam: "939",
        text: "Xưng vương (ngày 1/2/939), lập nhà Ngô, đóng đô ở Cổ Loa.",
      },
      {
        nam: "944",
        text: "Mất ngày 14/2/944, di chúc cho Dương Tam Kha phò tá con là Ngô Xương Ngập.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ và lăng Ngô Quyền (Tiền Ngô Vương lăng)",
        diaDiem: "Thôn Cam Lâm, Đường Lâm, Sơn Tây, Hà Nội",
      },
      {
        ten: "Từ Lương Xâm (tương truyền là đại bản doanh của nghĩa quân)",
        diaDiem: "Quận Hải An, Hải Phòng",
      },
      {
        ten: "Đền Chẹo",
        diaDiem: "Xã Nam Cường, huyện Tam Nông, Phú Thọ",
      },
    ],
    tuongNiem: [
      "Giỗ 14/8 âm lịch tại đền và lăng Ngô Quyền (thôn Cam Lâm, Đường Lâm); trước năm 1945, làng tế lớn vào hai ngày 14 và 15 tháng 8 âm lịch.",
      "Tại đền Chẹo (Phú Thọ), lễ tưởng niệm tổ chức ngày 18/4 dương lịch; ở Hải Phòng, một số nơi làm giỗ ngày 16 tháng Giêng âm lịch.",
      "Các đình, miếu quanh hạ lưu sông Bạch Đằng (Hải Phòng) mở hội vào trung tuần tháng 2 âm lịch.",
    ],
    ghiChuSuLieu:
      "Ngày mất chính xác của Ngô Quyền chưa được xác định thống nhất nên ngày giỗ khác nhau giữa các địa phương. Nguồn ghi ngày sinh theo can chi là năm Đinh Tỵ nhưng quy đổi là năm 898, và tuổi thọ được ghi là 45 hoặc 47; quê Đường Lâm cũng có nhiều thuyết.",
    wikiTitle: "Ngô Quyền",
    leSlug: "gio-ngo-quyen",
    tieuBieu2013: true,
  },
  {
    slug: "dinh-tien-hoang",
    ten: "Đinh Tiên Hoàng",
    tenThat: "Đinh Bộ Lĩnh",
    tenKhac: ["Vạn Thắng Vương", "Đại Thắng Minh Hoàng đế", "Tiên Hoàng Đế"],
    namSinh: "924",
    namMat: "979",
    nienDai: "924 – 979",
    queQuan: "Thôn Kim Lư, làng Đại Hữu, châu Đại Hoàng (Gia Viễn, Ninh Bình)",
    thoiKy: "the-ky-x",
    trieuDai: "Nhà Đinh",
    namMoc: 968,
    tomTat: "Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước, năm 968 lên ngôi hoàng đế, đặt quốc hiệu Đại Cồ Việt và đóng đô ở Hoa Lư.",
    tieuSu: [
      "Đinh Bộ Lĩnh sinh năm 924 ở châu Đại Hoàng (Ninh Bình), con của Đinh Công Trứ, nha tướng của Dương Đình Nghệ, giữ chức Thứ sử Hoan Châu. Cha mất sớm, ông theo mẹ về quê ngoại. Tương truyền thuở nhỏ ông cùng trẻ chăn trâu lấy bông lau làm cờ bày trận; trong nhóm bạn có Đinh Điền, Nguyễn Bặc, Lưu Cơ, Trịnh Tú, những người sau này cùng ông lập nghiệp.",
      "Ông không chịu thần phục nhà Hậu Ngô, rồi cùng con là Đinh Liễn đến nương tựa sứ quân Trần Lãm (Trần Minh Công) ở Bố Hải Khẩu. Sau khi Trần Lãm mất, ông thay quyền, đưa quân về Hoa Lư. Kết hợp đánh dẹp và chiêu hàng, trong vài năm ông thắng các sứ quân và được gọi là Vạn Thắng Vương.",
      "Năm 968, ông lên ngôi hoàng đế, đặt quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư; năm 970 đặt niên hiệu Thái Bình. Năm 979, ông cùng con trưởng Đinh Liễn bị hại; chính sử chép thủ phạm là Đỗ Thích. Ông làm vua 12 năm, được táng ở sơn lăng Trường Yên, Hoa Lư.",
    ],
    boiCanh: [
      "Sau khi Ngô Quyền mất (944), nhà Ngô suy yếu. Năm 965, Nam Tấn Vương Ngô Xương Văn tử trận; các hào trưởng nổi dậy chiếm cứ quận ấp, hình thành cục diện 12 sứ quân, đất nước bị chia cắt.",
      "Không lâu sau khi Đinh Bộ Lĩnh thống nhất đất nước, nhà Tống diệt nước Nam Hán (971) và áp sát biên giới Đại Cồ Việt. Năm 975, nhà Tống phong cho ông tước Giao Chỉ quận vương; bên ngoài nhà Đinh giữ lệ triều cống, trong nước vẫn xưng hoàng đế.",
    ],
    congTrang: [
      "Dẹp loạn 12 sứ quân, thống nhất đất nước năm 968.",
      "Lên ngôi hoàng đế, đặt quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư; là người đầu tiên xưng hoàng đế sau thời Bắc thuộc.",
      "Xây dựng triều đình, định phẩm hàm quan văn, quan võ và tổ chức quân đội theo đạo, quân, lữ, tốt, ngũ.",
      "Đặt niên hiệu Thái Bình, cho đúc tiền đồng Thái Bình Hưng Bảo.",
    ],
    suKien: [
      {
        nam: "924",
        text: "Sinh ngày Rằm tháng Hai năm Giáp Thân (22/3/924) ở châu Đại Hoàng.",
      },
      {
        nam: "966",
        text: "Các hào trưởng nổi dậy cát cứ, hình thành loạn 12 sứ quân.",
      },
      {
        nam: "968",
        text: "Dẹp xong các sứ quân, lên ngôi Đại Thắng Minh Hoàng đế, đặt quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư.",
      },
      {
        nam: "970",
        text: "Đặt niên hiệu Thái Bình, cho đúc tiền đồng Thái Bình Hưng Bảo.",
      },
      {
        nam: "975",
        text: "Nhà Tống phong vua làm Giao Chỉ quận vương, phong Đinh Liễn làm Tĩnh Hải quân Tiết độ sứ.",
      },
      {
        nam: "979",
        text: "Vua và con trưởng Đinh Liễn bị hại; vua được táng ở sơn lăng Trường Yên.",
      },
    ],
    diTich: [
      {
        ten: "Đền Vua Đinh Tiên Hoàng",
        diaDiem: "Khu di tích Cố đô Hoa Lư, Ninh Bình",
      },
      {
        ten: "Sơn lăng Trường Yên",
        diaDiem: "Cố đô Hoa Lư, Ninh Bình",
      },
      {
        ten: "Núi Kỳ Lân và đền thờ Đinh Bộ Lĩnh",
        diaDiem: "Đại Hoàng, Gia Viễn, Ninh Bình",
      },
    ],
    tuongNiem: ["Lễ hội Hoa Lư (Ninh Bình) diễn ra đầu tháng Ba âm lịch, chính lễ ngày 10/3, tưởng niệm vua Đinh Tiên Hoàng và vua Lê Đại Hành."],
    ghiChuSuLieu:
      "Có sách chép tên thật của ông là Đinh Hoàn. Thời điểm mất thường ghi là tháng 10 năm 979, nhưng có chỗ chép tháng 11 âm lịch; một số nhà nghiên cứu nghi ngờ việc Đỗ Thích là thủ phạm giết vua.",
    wikiTitle: "Đinh Tiên Hoàng",
    leSlug: "le-hoi-hoa-lu",
    tieuBieu2013: true,
  },
  {
    slug: "le-dai-hanh",
    ten: "Lê Đại Hành",
    tenThat: "Lê Hoàn",
    tenKhac: ["Thập đạo tướng quân", "Đại Hành Hoàng đế"],
    namSinh: "941",
    namMat: "1005",
    nienDai: "941 – 1005",
    queQuan: "Có nhiều thuyết: Trường Châu (Hoa Lư, Ninh Bình), Ái Châu (Thanh Hóa) hoặc Bảo Thái (Thanh Liêm, Hà Nam)",
    thoiKy: "the-ky-x",
    trieuDai: "Tiền Lê",
    namMoc: 981,
    tomTat: "Hoàng đế sáng lập nhà Tiền Lê, trực tiếp chỉ huy quân dân Đại Cồ Việt đánh tan cuộc xâm lược của quân Tống năm 981, giữ vững nền độc lập.",
    tieuSu: [
      "Lê Hoàn sinh năm 941, cha là Lê Mịch, mẹ họ Đặng. Thuở nhỏ ông được viên quan án Lê Đột nhận làm con nuôi. Lớn lên, ông theo giúp Nam Việt vương Đinh Liễn, được Đinh Bộ Lĩnh khen là người trí dũng và giao cai quản một nghìn quân. Năm 971, vua Đinh Tiên Hoàng phong ông làm Thập đạo tướng quân.",
      "Năm 979, vua Đinh Tiên Hoàng và con trưởng Đinh Liễn bị ám hại; Đinh Toàn mới 6 tuổi nối ngôi, Lê Hoàn làm Nhiếp chính, xưng Phó vương. Năm 980, trước nguy cơ quân Tống xâm lược, Thái hậu Dương Vân Nga cùng các tướng tôn ông lên ngôi Hoàng đế, lập nên nhà Tiền Lê, niên hiệu Thiên Phúc.",
      "Sau khi đánh thắng quân Tống, ông đánh Chiêm Thành, dẹp các cuộc nổi dậy, khuyến khích nông nghiệp và cho đào kênh. Ông mất ngày 8 tháng 3 âm lịch năm Ất Tỵ (1005) tại điện Trường Xuân, thọ 65 tuổi, an táng ở Trường Yên (Hoa Lư).",
    ],
    boiCanh: [
      "Cuối thế kỷ X, nhà Đinh vừa thống nhất đất nước thì xảy ra biến cố năm 979: vua Đinh Tiên Hoàng bị giết, vua mới còn nhỏ, một số đại thần dấy binh chống lại nhiếp chính Lê Hoàn. Nhà Tống nhân lúc Đại Cồ Việt rối ren liền chuẩn bị đem quân chinh phạt.",
      "Nhà Tống lấy cớ Lê Hoàn chuyên quyền, nhưng chiếu phát binh của vua Tống cho thấy ý đồ khôi phục sự cai trị đối với nước Việt như thời nhà Đường.",
    ],
    congTrang: [
      "Lên ngôi năm 980, lập nhà Tiền Lê giữa lúc đất nước đứng trước họa ngoại xâm.",
      "Năm 981 trực tiếp cầm quân đánh tan quân Tống, giết tướng Hầu Nhân Bảo, bắt sống Quách Quân Biện, Triệu Phụng Huân.",
      "Năm 982 đem quân đánh Chiêm Thành, chém vua Chiêm tại trận.",
      "Mở đầu lễ cày ruộng Tịch điền (987) để khuyến khích sản xuất nông nghiệp.",
      "Khởi đào sông Nhà Lê, tuyến giao thông thủy nội địa đầu tiên của Việt Nam.",
    ],
    suKien: [
      {
        nam: "979",
        text: "Vua Đinh Tiên Hoàng bị ám hại; Lê Hoàn làm Nhiếp chính, xưng Phó vương",
      },
      {
        nam: "980",
        text: "Lên ngôi Hoàng đế, lập nhà Tiền Lê, niên hiệu Thiên Phúc",
      },
      {
        nam: "981",
        text: "Đánh tan quân Tống xâm lược, bảo toàn nền độc lập",
      },
      {
        nam: "982",
        text: "Thân chinh đánh Chiêm Thành",
      },
      {
        nam: "987",
        text: "Lần đầu cày ruộng Tịch điền ở núi Đọi",
      },
      {
        nam: "1005",
        text: "Mất ngày 8 tháng 3 âm lịch tại điện Trường Xuân, an táng ở Trường Yên",
      },
    ],
    diTich: [
      {
        ten: "Đền vua Lê Đại Hành",
        diaDiem: "Cố đô Hoa Lư, Ninh Bình",
      },
      {
        ten: "Lăng vua Lê Đại Hành (Sơn lăng Trường Yên)",
        diaDiem: "Quần thể di tích Cố đô Hoa Lư, Ninh Bình",
      },
      {
        ten: "Đền thờ Lê Hoàn",
        diaDiem: "Làng Trung Lập, xã Xuân Lập, Thanh Hóa",
      },
      {
        ten: "Đền vua Lê Đại Hành ở Tràng Kênh",
        diaDiem: "Ngã ba sông Bạch Đằng, Hải Phòng",
      },
    ],
    tuongNiem: [
      "Giỗ vua ngày 8 tháng 3 âm lịch, ngày mất của vua",
      "Lễ hội Hoa Lư (Ninh Bình) đầu tháng Ba âm lịch, chính lễ ngày 10, tưởng niệm vua Đinh Tiên Hoàng và vua Lê Đại Hành",
    ],
    ghiChuSuLieu:
      "Quê hương Lê Hoàn còn tranh luận: sử cũ ghi Trường Châu, Ái Châu hoặc Bảo Thái, các hội thảo khoa học chưa quy về một nơi duy nhất. Năm sinh theo Đại Việt sử ký toàn thư là 941, trong khi thần tích địa phương ghi 942. Chuyện mẹ ông mộng thấy hoa sen hay rồng vàng che chở mang màu sắc truyền thuyết. Giả thuyết cho rằng ông chủ mưu vụ ám sát vua Đinh chưa có bằng chứng.",
    wikiTitle: "Lê Đại Hành",
    leSlug: "gio-le-dai-hanh",
    tieuBieu2013: true,
  },
  {
    slug: "ly-thai-to",
    ten: "Lý Thái Tổ",
    tenThat: "Lý Công Uẩn",
    tenKhac: ["Thần Vũ Hoàng đế"],
    namSinh: "974",
    namMat: "1028",
    nienDai: "974 – 1028",
    queQuan: "Châu Cổ Pháp, làng Đình Bảng (Từ Sơn, Bắc Ninh)",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Lý",
    namMoc: 1010,
    tomTat: "Hoàng đế sáng lập nhà Lý, người quyết định dời đô từ Hoa Lư về Đại La năm 1010 và đổi tên thành Thăng Long.",
    tieuSu: [
      "Lý Công Uẩn sinh năm 974 ở châu Cổ Pháp, mẹ họ Phạm, không rõ tên cha. Lên 3 tuổi, ông được nhà sư Lý Khánh Văn nhận nuôi ở chùa Cổ Pháp, sau theo học sư Vạn Hạnh ở chùa Lục Tổ. Trưởng thành, ông phò triều Tiền Lê, làm đến chức Tả thân vệ Điện tiền chỉ huy sứ và có uy tín lớn trong triều.",
      "Năm 1009, vua Lê Long Đĩnh mất, triều thần tôn Lý Công Uẩn lên ngôi Hoàng đế, lập ra nhà Lý, niên hiệu Thuận Thiên. Năm 1010, ông dời đô từ Hoa Lư về Đại La và đổi tên thành Thăng Long, mở đầu lịch sử hơn nghìn năm của kinh đô Thăng Long – Hà Nội.",
      "Trong thời gian trị vì, ông chia lại đơn vị hành chính, định sáu hạng thuế, nhiều lần miễn tô thuế cho dân, dẹp các cuộc nổi loạn và đánh bại quân Đại Lý. Ông mất năm 1028 tại điện Long An, an táng ở Thọ Lăng.",
    ],
    boiCanh: [
      "Sau khi vua Lê Đại Hành mất năm 1005, các hoàng tử nhà Tiền Lê tranh ngôi suốt 8 tháng. Lê Long Đĩnh giành được ngôi nhưng trị vì hà khắc, lòng người ly tán; khi ông mất năm 1009, triều đình đứng trước nguy cơ bất ổn.",
      "Kinh đô Hoa Lư nằm giữa núi đá, thuận lợi cho phòng thủ nhưng chật hẹp. Nhà vua cho rằng Hoa Lư thành hẹp, đất thấp nên quyết định dời đô về vùng đồng bằng rộng mở.",
    ],
    congTrang: [
      "Tự tay viết chiếu dời đô, chuyển kinh đô từ Hoa Lư về Đại La và đặt tên Thăng Long (1010).",
      "Sáng lập nhà Lý, triều đại tồn tại 216 năm.",
      "Định sáu hạng thuế, nhiều lần miễn tô thuế cho dân.",
      "Dẹp các cuộc nổi loạn trong nước, đánh bại quân Đại Lý, giữ quan hệ hòa hiếu với nhà Tống.",
      "Xây dựng cung điện, thành lũy, đặt nền móng cho kinh đô mới.",
    ],
    suKien: [
      {
        nam: "974",
        text: "Sinh ngày 12 tháng 2 âm lịch năm Giáp Tuất tại châu Cổ Pháp",
      },
      {
        nam: "1009",
        text: "Được triều thần tôn lên ngôi, lập nhà Lý, niên hiệu Thuận Thiên",
      },
      {
        nam: "1010",
        text: "Dời đô từ Hoa Lư về Đại La, đổi tên thành Thăng Long",
      },
      {
        nam: "1013",
        text: "Định sáu hạng thuế",
      },
      {
        nam: "1028",
        text: "Mất tại điện Long An, an táng ở Thọ Lăng",
      },
    ],
    diTich: [
      {
        ten: "Đền Đô (đền thờ các vua nhà Lý)",
        diaDiem: "Đình Bảng, Từ Sơn, Bắc Ninh",
      },
      {
        ten: "Khu lăng mộ các vua nhà Lý (Thọ Lăng)",
        diaDiem: "Đình Bảng, Từ Sơn, Bắc Ninh",
      },
      {
        ten: "Tượng đài Lý Thái Tổ",
        diaDiem: "Vườn hoa bên Hồ Hoàn Kiếm, Hà Nội",
      },
    ],
    tuongNiem: [],
    ghiChuSuLieu:
      "Nhiều chi tiết về thân thế và việc lên ngôi, như chuyện mẹ ông gặp thần hay lời sấm trên cây gạo, mang màu sắc truyền thuyết; sử gia Ngô Thì Sĩ cho rằng bài sấm được tạo ra để gây dư luận. Một số sách Trung Quốc chép ông gốc người Mân (Phúc Kiến), điều này vẫn còn tranh cãi. Thời gian trị vì được ghi là 18 hoặc 19 năm tùy cách tính.",
    wikiTitle: "Lý Thái Tổ",
    tieuBieu2013: true,
  },
  {
    slug: "ly-thuong-kiet",
    ten: "Lý Thường Kiệt",
    tenThat: null,
    tenKhac: ["Ngô Tuấn (theo thuyết họ Ngô)", "Quách Tuấn (theo văn bia thời Lý)", "Việt quốc công (tước truy phong)"],
    namSinh: "1019",
    namMat: "1105",
    nienDai: "1019 – 1105",
    queQuan: "Phường Thái Hòa, thành Thăng Long; có thuyết cho quê gốc ở làng An Xá (Cơ Xá, Gia Lâm), Hà Nội",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Lý",
    namMoc: 1076,
    tomTat: "Danh tướng nhà Lý, chỉ huy cuộc tiến công các châu Khâm, Liêm, Ung (1075–1076) và lập phòng tuyến sông Như Nguyệt đánh bại quân Tống xâm lược.",
    tieuSu: [
      "Lý Thường Kiệt tên Tuấn, tự Thường Kiệt; họ gốc là Ngô hay Quách vẫn còn tranh luận, họ Lý là quốc tính được vua ban. Gia đình ông nối đời làm quan. Năm 1041, ông vào hầu vua Lý Thái Tông, về sau giữ nhiều chức vụ quan trọng qua ba triều Thái Tông, Thánh Tông và Nhân Tông.",
      "Năm 1069, ông làm tiên phong theo vua Lý Thánh Tông đánh Chiêm Thành, bắt được vua Chế Củ và nhờ công ấy được ban quốc tính. Khi vua Lý Nhân Tông còn nhỏ, ông giữ vai trò phụ chính. Năm 1075–1076, ông chủ động đem quân đánh các châu Khâm, Liêm, Ung của nhà Tống, rồi lập phòng tuyến sông Như Nguyệt đẩy lùi quân Tống do Quách Quỳ, Triệu Tiết chỉ huy.",
      "Về già, ông trấn trị Thanh Hóa 19 năm, vẫn cầm quân dẹp loạn ở Diễn Châu (1103) và đánh lui quân Chiêm Thành (1104). Ông mất tháng 6 năm Ất Dậu (1105), thọ 86 tuổi, được truy phong Việt quốc công.",
    ],
    boiCanh: [
      "Năm 1075, Vương An Thạch nắm quyền chính ở nhà Tống, cho rằng Đại Việt suy yếu sau chiến tranh với Chiêm Thành nên có thể đánh chiếm. Nhà Tống ngầm luyện quân, đóng thuyền, tập thủy chiến ở vùng biên giới và cấm các châu huyện buôn bán với Đại Việt.",
      "Trước nguy cơ đó, triều Lý chủ động đem quân đánh vào các căn cứ tập kết của quân Tống, rồi chuẩn bị phòng tuyến chờ quân Tống sang.",
    ],
    congTrang: [
      "Lập phòng tuyến sông Như Nguyệt, đẩy lùi cuộc xâm lược của quân Tống do Quách Quỳ, Triệu Tiết chỉ huy.",
      "Năm 1069 làm tiên phong đánh Chiêm Thành, bắt được vua Chế Củ.",
      "Năm 1075–1076 chỉ huy đánh chiếm các châu Khâm, Liêm, Ung, phá căn cứ tập kết quân của nhà Tống.",
      "Chủ động sai sứ nghị hòa để quân Tống rút về, kết thúc chiến tranh.",
      "Bài thơ Nam quốc sơn hà tương truyền gắn với ông trong cuộc chiến ở sông Như Nguyệt.",
    ],
    suKien: [
      {
        nam: "1041",
        text: "Vào hầu vua Lý Thái Tông với chức Hoàng môn Chi hậu",
      },
      {
        nam: "1069",
        text: "Theo vua Lý Thánh Tông đánh Chiêm Thành, được ban quốc tính",
      },
      {
        nam: "1075",
        text: "Đem thủy quân đổ bộ, chiếm thành Khâm Châu, tiếp đó hạ Liêm Châu",
      },
      {
        nam: "1076",
        text: "Hạ thành Ung Châu; lập phòng tuyến sông Như Nguyệt chặn quân Tống",
      },
      {
        nam: "1104",
        text: "Đánh bại quân Chiêm, buộc Chiêm Thành trả lại đất ba châu",
      },
      {
        nam: "1105",
        text: "Mất, được truy phong Việt quốc công",
      },
    ],
    diTich: [
      {
        ten: "Phòng tuyến sông Như Nguyệt",
        diaDiem: "Sông Như Nguyệt (sông Cầu), Yên Phong, Bắc Ninh",
      },
      {
        ten: "Đền thờ Trương Hống, Trương Hát, nơi tương truyền vang lên bài Nam quốc sơn hà",
        diaDiem: "Bên sông Như Nguyệt, Yên Phong, Bắc Ninh",
      },
      {
        ten: "Chùa Phúc Xá, nơi lưu giữ chuông An Xá tự chung ghi đất tổ nghiệp của ông",
        diaDiem: "Bắc Biên, Long Biên, Hà Nội",
      },
    ],
    tuongNiem: [],
    ghiChuSuLieu:
      "Họ gốc của ông có hai thuyết: họ Ngô (dựa trên gia phả và thần phổ soạn muộn thời Nguyễn) và họ Quách (dựa trên hai văn bia thời Lý). Việc ông là hoạn quan cũng còn tranh luận: nhiều bộ sử cũ ghi ông tự hoạn, một số ý kiến hiện nay phủ nhận. Tác giả bài thơ Nam quốc sơn hà chưa được xác định chắc chắn; dân gian và nhiều tài liệu thường gắn bài thơ với ông.",
    wikiTitle: "Lý Thường Kiệt",
    tieuBieu2013: true,
  },
  {
    slug: "tran-hung-dao",
    ten: "Trần Hưng Đạo",
    tenThat: "Trần Quốc Tuấn",
    tenKhac: ["Hưng Đạo đại vương", "Đức Thánh Trần", "Cửu Thiên Vũ Đế"],
    namSinh: null,
    namMat: "1300",
    nienDai: "? – 1300",
    queQuan: "Có nhiều thuyết: sinh tại kinh đô Thăng Long, hoặc tại Tức Mặc, phủ Thiên Trường (Nam Định)",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1288,
    tomTat: "Danh tướng, tôn thất nhà Trần, Quốc công tiết chế thống lĩnh quân đội đánh bại quân Nguyên – Mông, nổi bật với chiến thắng Bạch Đằng năm 1288.",
    tieuSu: [
      "Trần Quốc Tuấn là con An Sinh vương Trần Liễu, gọi vua Trần Thái Tông bằng chú. Năm sinh của ông không được ghi chép chắc chắn. Từ nhỏ ông được người tài giỏi dạy dỗ, sớm thông hiểu văn võ. Tháng 9 âm lịch năm 1257, ông được giao chỉ huy lực lượng giữ biên giới phía Bắc trước cuộc xâm lược của quân Mông Cổ.",
      "Tháng 10 âm lịch năm 1283, ông được phong Quốc công tiết chế, thống lĩnh quân đội cả nước. Ông cùng vua Trần Nhân Tông và Thượng hoàng Trần Thánh Tông lãnh đạo quân dân đánh bại quân Nguyên năm 1285, rồi phá tan cuộc xâm lược năm 1287–1288, đỉnh cao là trận Bạch Đằng tháng 4 âm lịch năm 1288.",
      "Năm 1289, ông được phong Hưng Đạo đại vương rồi lui về thái ấp Vạn Kiếp. Trước khi mất, ông dặn vua Trần Anh Tông phải khoan thư sức dân để làm kế sâu rễ bền gốc. Ông mất năm 1300, được nhân dân tôn thờ là Đức Thánh Trần.",
    ],
    boiCanh: [
      "Thế kỷ XIII, đế quốc Mông Cổ bành trướng mạnh mẽ, năm 1279 tiêu diệt Nam Tống và lập nhà Nguyên. Đại Việt thời Trần ba lần phải đối đầu với các đạo quân xâm lược đông đảo của Mông – Nguyên vào các năm 1258, 1285 và 1287–1288.",
      "Nhà Trần kháng chiến bằng kế thanh dã (vườn không nhà trống), rút lui bảo toàn lực lượng rồi phản công, phối hợp giữa quân triều đình và hương binh các địa phương.",
    ],
    congTrang: [
      "Bày trận cọc ngầm trên sông Bạch Đằng, tiêu diệt thủy quân Nguyên, bắt sống Ô Mã Nhi (1288).",
      "Giữ trọng trách Quốc công tiết chế, thống lĩnh quân đội trong kháng chiến chống quân Nguyên.",
      "Cùng các tướng nhà Trần phản công thắng lợi ở Hàm Tử, Chương Dương, Tây Kết, Vạn Kiếp năm 1285.",
      "Soạn Hịch tướng sĩ và Binh thư yếu lược.",
      "Tiến cử, trọng dụng nhiều nhân tài như Yết Kiêu, Dã Tượng, Phạm Ngũ Lão.",
    ],
    suKien: [
      {
        nam: "1257",
        text: "Được giao chỉ huy quân giữ biên giới phía Bắc chống quân Mông Cổ",
      },
      {
        nam: "1283",
        text: "Được phong Quốc công tiết chế, thống lĩnh quân đội cả nước",
      },
      {
        nam: "1284",
        text: "Duyệt quân ở bến Đông Bộ Đầu, đọc Hịch tướng sĩ",
      },
      {
        nam: "1285",
        text: "Cùng hai vua Trần phản công, đánh đuổi quân Nguyên khỏi Đại Việt",
      },
      {
        nam: "1288",
        text: "Đại thắng trên sông Bạch Đằng, bắt sống tướng Ô Mã Nhi",
      },
      {
        nam: "1300",
        text: "Mất tại Vạn Kiếp",
      },
    ],
    diTich: [
      {
        ten: "Đền Kiếp Bạc",
        diaDiem: "Vạn Kiếp, Chí Linh (Hải Dương)",
      },
      {
        ten: "Đền Trần",
        diaDiem: "Nam Định",
      },
      {
        ten: "Đền Bảo Lộc",
        diaDiem: "Nam Định",
      },
      {
        ten: "Đền Trần Hưng Đạo trong quần thể di tích Bạch Đằng",
        diaDiem: "Quảng Yên, Quảng Ninh",
      },
    ],
    tuongNiem: ["Giỗ Đức Thánh Trần ngày 20 tháng 8 âm lịch", "Dân gian có câu Tháng Tám giỗ Cha, tháng Ba giỗ Mẹ; Cha ở đây là Đức Thánh Trần"],
    ghiChuSuLieu:
      "Năm sinh chưa thống nhất: nhiều tài liệu ghi khoảng 1228, có tài liệu ghi 1221, 1226, 1230 hoặc 1232. Nơi sinh cũng có thuyết khác nhau. Sử chép ông mất ngày 22 tháng 8 âm lịch năm Canh Tý (1300), trong khi ngày giỗ Đức Thánh Trần phổ biến là 20 tháng 8 âm lịch. Vai trò cụ thể của ông trong cuộc kháng chiến năm 1258 không được sử sách ghi chép chi tiết.",
    wikiTitle: "Trần Hưng Đạo",
    leSlug: "gio-duc-thanh-tran",
    tieuBieu2013: true,
  },
  {
    slug: "tran-nhan-tong",
    ten: "Trần Nhân Tông",
    tenThat: "Trần Khâm",
    tenKhac: ["Phật hoàng", "Trúc Lâm Đại sĩ", "Giác hoàng Điều ngự"],
    namSinh: "1258",
    namMat: "1308",
    nienDai: "1258 – 1308",
    queQuan: "Hoàng tộc nhà Trần, đất phát tích ở phủ Thiên Trường (Nam Định); nơi sinh không được ghi rõ",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1285,
    tomTat:
      "Vị vua thứ ba nhà Trần, cùng quân dân Đại Việt hai lần đánh thắng quân Nguyên – Mông (1285, 1287–1288), sau xuất gia và sáng lập Thiền phái Trúc Lâm.",
    tieuSu: [
      "Trần Khâm là con trưởng vua Trần Thánh Tông, sinh năm 1258. Năm 1274, ông được lập làm Hoàng thái tử và được các nho sĩ tài đức dạy dỗ; từ trẻ đã có chí hướng theo đạo Phật. Cuối năm 1278, ông lên ngôi, tức vua Trần Nhân Tông, cùng Thượng hoàng Thánh Tông trị nước.",
      "Trước sức ép của nhà Nguyên, ông kiên quyết không sang chầu, chăm lo kinh tế và sự đoàn kết trong nước. Cùng Thượng hoàng và Quốc công tiết chế Trần Quốc Tuấn, ông lãnh đạo quân dân đánh bại cuộc xâm lược năm 1285 và cuộc xâm lược năm 1287–1288 của quân Nguyên.",
      "Năm 1293, ông nhường ngôi cho Trần Anh Tông, làm Thái thượng hoàng; năm 1299 lên Yên Tử tu hành, hợp nhất các dòng thiền thành Thiền phái Trúc Lâm. Ông viên tịch năm 1308 trên núi Yên Tử.",
    ],
    boiCanh: [
      "Khi Trần Nhân Tông lên ngôi năm 1278, nhà Nguyên đã chinh phục gần hết Nam Tống, liên tục ép vua Trần sang chầu, rồi lấy cớ mượn đường đánh Chiêm Thành để chuẩn bị xâm lược Đại Việt.",
      "Sau chiến tranh, triều Trần vừa khôi phục đất nước, vừa giữ quan hệ ngoại giao mềm dẻo mà cứng rắn với nhà Nguyên; ở phía nam, quan hệ với Chiêm Thành được củng cố qua cuộc hôn nhân của công chúa Huyền Trân.",
    ],
    congTrang: [
      "Cùng Thượng hoàng Thánh Tông và Trần Quốc Tuấn lãnh đạo kháng chiến chống quân Nguyên thắng lợi năm 1285.",
      "Cùng Thượng hoàng đánh thắng ở Trường Yên và Tây Kết (1285), trận Tây Kết chém được tướng Nguyên Toa Đô.",
      "Lãnh đạo cuộc kháng chiến 1287–1288, kết thúc bằng đại thắng Bạch Đằng.",
      "Sáng lập Thiền phái Trúc Lâm, dòng thiền mang bản sắc văn hóa Việt và tinh thần nhập thế.",
      "Mở rộng bờ cõi phía nam với hai châu Ô, Lý qua hôn lễ của công chúa Huyền Trân.",
    ],
    suKien: [
      {
        nam: "1278",
        text: "Lên ngôi Hoàng đế",
      },
      {
        nam: "1285",
        text: "Đánh bại cuộc xâm lược của quân Nguyên do Thoát Hoan chỉ huy",
      },
      {
        nam: "1288",
        text: "Đại thắng Bạch Đằng, kết thúc cuộc kháng chiến 1287–1288",
      },
      {
        nam: "1293",
        text: "Nhường ngôi cho Trần Anh Tông, lên làm Thái thượng hoàng",
      },
      {
        nam: "1299",
        text: "Lên Yên Tử tu hành, về sau sáng lập Thiền phái Trúc Lâm",
      },
      {
        nam: "1308",
        text: "Viên tịch trên đỉnh Ngọa Vân, Yên Tử",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích Yên Tử (chùa Hoa Yên, tháp Huệ Quang)",
        diaDiem: "Quảng Ninh",
      },
      {
        ten: "Am Ngọa Vân",
        diaDiem: "Yên Tử, Quảng Ninh",
      },
      {
        ten: "Chùa Phổ Minh",
        diaDiem: "Phủ Thiên Trường (Nam Định)",
      },
      {
        ten: "Lăng Quy Đức",
        diaDiem: "Phủ Long Hưng (Hưng Yên)",
      },
    ],
    tuongNiem: ["Ngày tưởng niệm Phật hoàng nhập Niết bàn: mùng 1 tháng 11 âm lịch, đại lễ tổ chức tại Yên Tử"],
    ghiChuSuLieu:
      "Về ngày viên tịch, Đại Việt sử ký toàn thư chép ngày 3 tháng 11 âm lịch năm Mậu Thân (1308), còn Tam Tổ thực lục và Thánh đăng ngữ lục ghi ngày 1 tháng 11 âm lịch; ngày tưởng niệm hiện nay theo mốc mùng 1 tháng 11. Một số chuyện về xá lợi của ông được chép trong sách mang tính truyền kỳ.",
    wikiTitle: "Trần Nhân Tông",
    leSlug: "gio-tran-nhan-tong",
    tieuBieu2013: true,
  },
  {
    slug: "le-loi",
    ten: "Lê Lợi (Lê Thái Tổ)",
    tenThat: "Lê Lợi",
    tenKhac: ["Bình Định vương", "Lam Sơn động chủ", "Thái Tổ Cao Hoàng đế"],
    namSinh: "1385",
    namMat: "1433",
    nienDai: "1385 – 1433",
    queQuan: "Lam Sơn, Thanh Hóa (sinh tại làng Chủ Sơn – Thủy Chú, quê mẹ)",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1428,
    tomTat: "Lãnh tụ khởi nghĩa Lam Sơn (1418–1427) đánh đuổi quân Minh, lên ngôi năm 1428, lập nhà Hậu Lê và đặt lại quốc hiệu Đại Việt.",
    tieuSu: [
      "Lê Lợi sinh năm 1385 trong một gia đình nhiều đời làm phụ đạo ở vùng Lam Sơn, Thanh Hóa. Ông lớn lên giữa lúc nhà Hồ thay nhà Trần rồi nhà Minh xâm lược, đô hộ nước ta. Tướng Minh từng dụ ông ra làm quan nhưng ông từ chối, ngầm chiêu tập hào kiệt, chờ thời cơ.",
      "Đầu năm Mậu Tuất 1418, ông dựng cờ khởi nghĩa ở Lam Sơn, xưng Bình Định vương. Sau nhiều năm gian khổ ở vùng núi Thanh Hóa, nghĩa quân tiến vào Nghệ An, Thuận Hóa rồi ra Bắc, thắng lớn ở Tốt Động – Chúc Động (1426) và Chi Lăng – Xương Giang (1427). Cuối năm 1427, quân Minh phải giảng hòa và rút về nước.",
      "Năm 1428, ông lên ngôi Hoàng đế, niên hiệu Thuận Thiên, đặt quốc hiệu Đại Việt, lập nên nhà Hậu Lê, cho xây dựng lại luật lệ, khoa cử, trường học. Ông mất ngày 22 tháng 8 âm lịch năm Quý Sửu (1433), an táng ở Vĩnh Lăng, Lam Sơn.",
    ],
    boiCanh: [
      "Năm 1407, nhà Hồ thất bại trước quân Minh, nước ta rơi vào khoảng 20 năm bị nhà Minh cai trị. Nhà Minh thi hành chính sách hà khắc: thu đốt sách vở, nâng sưu thuế, bắt nộp sản vật, đàn áp các cuộc nổi dậy; nhiều cuộc khởi nghĩa trước đó, như của nhà Hậu Trần, đều thất bại.",
    ],
    congTrang: [
      "Lãnh đạo khởi nghĩa Lam Sơn từ năm 1418 đến thắng lợi cuối năm 1427.",
      "Chỉ đạo đánh tan hai đạo viện binh nhà Minh ở Chi Lăng – Xương Giang (1427).",
      "Chấp thuận Hội thề Đông Quan, cho quân Minh rút về nước, kết thúc chiến tranh.",
      "Lên ngôi năm 1428, lập nhà Hậu Lê, đặt quốc hiệu Đại Việt.",
      "Xây dựng lại luật pháp, khoa cử, mở trường học, thu thập lại sách vở.",
    ],
    suKien: [
      {
        nam: "1418",
        text: "Mùng 2 tháng Giêng năm Mậu Tuất dựng cờ khởi nghĩa Lam Sơn, xưng Bình Định vương",
      },
      {
        nam: "1424",
        text: "Quyết định tiến quân vào Nghệ An, mở rộng địa bàn khởi nghĩa",
      },
      {
        nam: "1426",
        text: "Thắng lớn ở Tốt Động – Chúc Động, bao vây quân Minh ở Đông Quan",
      },
      {
        nam: "1427",
        text: "Đánh tan viện binh Minh ở Chi Lăng – Xương Giang; Hội thề Đông Quan, quân Minh rút về nước",
      },
      {
        nam: "1428",
        text: "Lên ngôi Hoàng đế, niên hiệu Thuận Thiên, lập nhà Hậu Lê",
      },
      {
        nam: "1433",
        text: "Mất ngày 22 tháng 8 âm lịch, an táng ở Vĩnh Lăng, Lam Sơn",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích Lam Kinh (Vĩnh Lăng)",
        diaDiem: "Lam Sơn, Thanh Hóa",
      },
      {
        ten: "Đền thờ Lê Lợi",
        diaDiem: "Làng Năng Cát, xã Trí Nang, Lang Chánh, Thanh Hóa",
      },
      {
        ten: "Hồ Hoàn Kiếm, gắn với truyền thuyết trả gươm",
        diaDiem: "Hà Nội",
      },
    ],
    tuongNiem: ["Giỗ vua ngày 22 tháng 8 âm lịch, ngày chính lễ của Lễ hội Lam Kinh (Thanh Hóa)", "Dân gian có câu Hăm mốt Lê Lai, hăm hai Lê Lợi"],
    ghiChuSuLieu:
      "Truyện gươm thần Thuận Thiên và việc trả gươm cho rùa vàng ở hồ Tả Vọng, từ đó hồ mang tên Hoàn Kiếm, là truyền thuyết dân gian, không phải ghi chép chính sử. Sử cũ ghi khác nhau về quan hệ của ông với nhà Hậu Trần. Việc ông xử tội hai công thần Trần Nguyên Hãn và Phạm Văn Xảo được các sử gia đánh giá khác nhau.",
    wikiTitle: "Lê Thái Tổ",
    leSlug: "gio-le-loi",
    tieuBieu2013: true,
  },
  {
    slug: "le-lai",
    ten: "Lê Lai",
    tenThat: null,
    tenKhac: ["Trung Túc Vương", "Toàn Nghĩa (thụy hiệu)"],
    namSinh: null,
    namMat: "1418",
    nienDai: "? – 1418",
    queQuan: "Làng Tép (thôn Dựng Tú xưa), xã Kiên Thọ, Ngọc Lặc, Thanh Hóa",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1418,
    tomTat: "Tướng của nghĩa quân Lam Sơn, đã mặc áo bào giả làm Lê Lợi, xông vào trận quân Minh và hy sinh để chủ tướng thoát vòng vây năm 1418.",
    tieuSu: [
      "Lê Lai là con thứ của Lê Kiều, gia đình nối đời làm phụ đạo ở vùng Lương Giang, Thanh Hóa. Sử gia Lê Quý Đôn tả ông là người cương trực, chí khí lẫm liệt, lo việc hậu cần cho Lê Lợi rất chu đáo. Năm 1416, ông cùng Lê Lợi và các hào kiệt dự hội thề Lũng Nhai.",
      "Năm 1418, nghĩa quân Lam Sơn còn yếu, bị quân Minh vây ngặt. Khi Lê Lợi hỏi ai dám đổi áo thay mình, Lê Lai nhận lời, khoác áo bào, dẫn 500 quân cùng 2 voi xông vào trận, tự xưng là chủ Lam Sơn. Quân Minh vây bắt và hành hình ông; nhờ đó Lê Lợi cùng nghĩa quân thoát hiểm, có thời gian củng cố lực lượng.",
      "Lê Lợi cho người tìm di hài ông đem về Lam Sơn mai táng. Năm 1428, ông được phong công thần hạng nhất, về sau được gia phong đến Trung Túc Vương. Anh trai và ba con trai ông cũng tham gia khởi nghĩa, nhiều người đã hy sinh.",
    ],
    boiCanh: [
      "Những năm đầu khởi nghĩa Lam Sơn, lực lượng nghĩa quân còn nhỏ, thiếu lương, thường bị quân Minh truy lùng, vây đánh ở vùng núi Thanh Hóa, có lúc rơi vào tình thế hết sức nguy cấp.",
    ],
    congTrang: [
      "Đổi áo giả làm Lê Lợi, xông vào trận và hy sinh để cứu chủ tướng cùng nghĩa quân.",
      "Tham gia hội thề Lũng Nhai (1416), cùng Lê Lợi dựng nghiệp từ buổi đầu.",
      "Lo việc hậu cần chu đáo cho nghĩa quân Lam Sơn.",
      "Được Lê Thái Tổ dặn đời sau làm giỗ trước ngày giỗ vua một ngày để ghi nhớ công lao.",
    ],
    suKien: [
      {
        nam: "1416",
        text: "Dự hội thề Lũng Nhai cùng Lê Lợi",
      },
      {
        nam: "1418",
        text: "Liều mình cứu Lê Lợi, bị quân Minh bắt và hành hình",
      },
      {
        nam: "1428",
        text: "Được truy phong công thần hạng nhất",
      },
      {
        nam: "1429",
        text: "Lê Thái Tổ sai Nguyễn Trãi viết lời thề ghi nhớ công lao Lê Lai",
      },
      {
        nam: "1484",
        text: "Được truy tặng Thái úy Phúc Quốc công, về sau gia phong Trung Túc Vương",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Lê Lai (đền Tép)",
        diaDiem: "Làng Tép, xã Kiên Thọ, Ngọc Lặc, Thanh Hóa",
      },
    ],
    tuongNiem: [
      "Giỗ ngày 21 tháng 8 âm lịch, trước giỗ vua Lê Thái Tổ một ngày, nên có câu Hăm mốt Lê Lai, hăm hai Lê Lợi",
      "Lễ hội đền Tép vào mùng 8 tháng Giêng và 21 tháng 8 âm lịch",
    ],
    ghiChuSuLieu:
      "Năm sinh chưa rõ (có tài liệu ghi 1355). Các sách Lam Sơn thực lục, Việt sử tiêu án, Đại Việt thông sử chép việc đổi áo cứu chúa với chi tiết khác nhau về nơi diễn ra; Đại Việt thông sử ghi ông hy sinh ngày 29 tháng 4 âm lịch năm Mậu Tuất 1418, có tài liệu ghi năm 1419. Đại Việt sử ký toàn thư không chép việc này mà chỉ ghi việc giết một Tư mã Lê Lai năm 1427, nên có giả thuyết ông sống sót; thời Lam Sơn cũng có vài người khác mang tên Lê Lai.",
    wikiTitle: "Lê Lai",
    leSlug: "gio-le-lai",
  },
  {
    slug: "nguyen-trai",
    ten: "Nguyễn Trãi",
    tenThat: "Nguyễn Trãi",
    tenKhac: ["Ức Trai", "Lê Trãi (được ban quốc tính)", "Tán Trù bá (tước truy tặng)", "Tế Văn hầu (tước truy tặng)"],
    namSinh: "1380",
    namMat: "1442",
    nienDai: "1380 – 1442",
    queQuan: "Làng Nhị Khê (Thường Tín, Hà Nội); có tài liệu ghi gốc gác ở làng Chi Ngại (Chí Linh, Hải Dương)",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1427,
    tomTat: "Nhà chính trị, nhà văn hóa lớn, mưu sĩ của khởi nghĩa Lam Sơn, tác giả Bình Ngô đại cáo và nhiều văn thư chiêu dụ quân Minh.",
    tieuSu: [
      "Nguyễn Trãi hiệu Ức Trai, con của Nguyễn Phi Khanh và bà Trần Thị Thái, cháu ngoại Tư đồ Trần Nguyên Đán. Năm 1400, ông đỗ Thái học sinh và làm quan nhà Hồ. Khi quân Minh xâm lược, cha ông bị bắt giải sang Trung Quốc; ông được cha dặn quay về tìm cách rửa nhục cho nước.",
      "Ông tham gia khởi nghĩa Lam Sơn, yết kiến Lê Lợi ở Lỗi Giang, trở thành mưu sĩ, soạn thảo thư từ ngoại giao. Những văn thư chiêu dụ của ông góp phần khiến nhiều thành của quân Minh ra hàng năm 1427. Ông là tác giả Bình Ngô đại cáo, áng văn được coi là bản tuyên ngôn độc lập thứ hai của nước ta.",
      "Dưới triều Lê Thái Tổ và Lê Thái Tông, ông giữ nhiều chức vụ quan trọng, soạn Dư địa chí, về sau lui về Côn Sơn. Năm 1442, sau cái chết đột ngột của vua Lê Thái Tông ở Lệ Chi Viên, ông bị khép tội và bị giết cùng gia tộc. Năm 1464, vua Lê Thánh Tông minh oan cho ông.",
    ],
    boiCanh: [
      "Cuối thế kỷ XIV, nhà Hồ thay nhà Trần; năm 1407 nhà Minh đánh bại nhà Hồ và đặt ách cai trị. Cuộc khởi nghĩa Lam Sơn do Lê Lợi lãnh đạo từ năm 1418 kết hợp đấu tranh quân sự với ngoại giao, chiêu dụ để đánh đuổi quân Minh.",
      "Sau khi nhà Hậu Lê thành lập, trong triều nảy sinh nhiều mâu thuẫn giữa các công thần; vụ án Lệ Chi Viên năm 1442 là một biến cố lớn của thời kỳ này.",
    ],
    congTrang: [
      "Tác giả Bình Ngô đại cáo, được coi là bản tuyên ngôn độc lập thứ hai.",
      "Soạn nhiều thư từ, văn kiện trong khởi nghĩa Lam Sơn, sau được tập hợp trong Quân trung từ mệnh tập.",
      "Góp phần chiêu dụ các thành Nghệ An, Tân Bình, Thuận Hóa, Tam Giang của quân Minh ra hàng (1427).",
      "Soạn Dư địa chí (1435), ghi chép bờ cõi hành chính nước Đại Việt.",
      "Để lại Quốc âm thi tập, Ức Trai thi tập, góp phần lớn cho văn học và tư tưởng Việt Nam.",
    ],
    suKien: [
      {
        nam: "1400",
        text: "Đỗ Thái học sinh, làm quan nhà Hồ",
      },
      {
        nam: "1427",
        text: "Soạn thư từ chiêu dụ quân Minh; được phong Nhập nội Hành khiển, Lại bộ Thượng thư",
      },
      {
        nam: "1428",
        text: "Viết Bình Ngô đại cáo, bố cáo thắng lợi trước quân Minh",
      },
      {
        nam: "1435",
        text: "Dâng sách Dư địa chí lên vua Lê Thái Tông",
      },
      {
        nam: "1442",
        text: "Bị khép tội trong vụ án Lệ Chi Viên, mất ngày 16 tháng 8 âm lịch năm Nhâm Tuất",
      },
      {
        nam: "1464",
        text: "Được vua Lê Thánh Tông minh oan, truy tặng tước Tán Trù bá",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Nguyễn Trãi, Khu di tích Côn Sơn",
        diaDiem: "Chí Linh (Hải Dương)",
      },
      {
        ten: "Đền thờ Nguyễn Trãi ở Nhị Khê",
        diaDiem: "Thường Tín, Hà Nội",
      },
    ],
    tuongNiem: [
      "Giỗ ngày 16 tháng 8 âm lịch, lễ dâng hương tại Côn Sơn trong dịp Lễ hội mùa thu Côn Sơn – Kiếp Bạc",
      "Năm 1980, UNESCO tổ chức kỷ niệm 600 năm ngày sinh Nguyễn Trãi",
    ],
    ghiChuSuLieu:
      "Thời điểm ông gia nhập nghĩa quân Lam Sơn chưa thống nhất: có ý kiến cho từ hội thề Lũng Nhai (1416), trước năm 1418, năm 1420 hoặc muộn hơn; quãng đời 1407–1417 còn nhiều điểm chưa rõ. Đại Việt sử ký toàn thư không ghi rõ tác giả Bình Ngô đại cáo, song nhiều tài liệu chép Lê Lợi giao Nguyễn Trãi soạn. Chuyện viết chữ bằng mỡ lên lá cho kiến ăn thành chữ mang tính truyền kỳ. Việc Lam Sơn thực lục do ông soạn chỉ là phỏng đoán.",
    wikiTitle: "Nguyễn Trãi",
    leSlug: "gio-nguyen-trai",
    tieuBieu2013: true,
  },
  {
    slug: "quang-trung",
    ten: "Quang Trung – Nguyễn Huệ",
    tenThat: "Hồ Thơm",
    tenKhac: ["Nguyễn Huệ", "Nguyễn Văn Huệ", "Bắc Bình Vương", "Đức ông Tám"],
    namSinh: "1753",
    namMat: "1792",
    nienDai: "1753 – 1792",
    queQuan: "Tây Sơn, Quy Nhơn (Bình Định); tổ tiên gốc Hưng Nguyên, Nghệ An",
    thoiKy: "tay-son",
    trieuDai: "Tây Sơn",
    namMoc: 1789,
    tomTat: "Hoàng đế nhà Tây Sơn, lãnh đạo khởi nghĩa Tây Sơn, đánh bại quân Xiêm (1785) và đại phá quân Thanh mùa xuân Kỷ Dậu 1789.",
    tieuSu: [
      "Quang Trung tên khai sinh là Hồ Thơm, sau đổi là Nguyễn Huệ, sinh năm Quý Dậu 1753 ở vùng Tây Sơn, phủ Quy Nhơn; tổ tiên họ Hồ gốc huyện Hưng Nguyên, Nghệ An. Cùng anh là Nguyễn Nhạc và Nguyễn Lữ, ông theo học văn võ với thầy Trương Văn Hiến; ba anh em được gọi là Tây Sơn tam kiệt.",
      "Năm 1771, Nguyễn Nhạc dựng cờ khởi nghĩa ở Tây Sơn, Nguyễn Huệ sớm trở thành tướng chủ chốt. Ông đánh tan quân Xiêm ở Rạch Gầm – Xoài Mút đầu năm 1785, năm 1786 chiếm Phú Xuân rồi tiến ra Thăng Long, chấm dứt quyền lực họ Trịnh. Vua Lê Hiển Tông phong ông làm Nguyên soái Uy Quốc công và gả công chúa Lê Ngọc Hân.",
      "Ngày 25 tháng 11 năm Mậu Thân (22/12/1788), ông lên ngôi Hoàng đế ở núi Bân (Phú Xuân), lấy niên hiệu Quang Trung, rồi tiến quân ra Bắc đánh tan quân Thanh dịp Tết Kỷ Dậu 1789. Sau ba năm trị nước với nhiều cải cách, ông mất đột ngột ngày 29 tháng 7 năm Nhâm Tý (16/9/1792) tại Phú Xuân.",
    ],
    boiCanh: [
      "Giữa thế kỷ 18, đất nước chia cắt giữa vua Lê – chúa Trịnh ở Đàng Ngoài và chúa Nguyễn ở Đàng Trong, lấy sông Gianh làm giới tuyến. Ở Đàng Trong, quyền thần Trương Phúc Loan chuyên quyền khiến dân oán giận, tạo điều kiện cho phong trào Tây Sơn bùng lên.",
      'Cuối năm 1788, vua Lê Chiêu Thống cầu viện nhà Thanh; Tôn Sĩ Nghị đem quân sang chiếm Thăng Long với danh nghĩa "phù Lê", buộc quân Tây Sơn rút về giữ phòng tuyến Tam Điệp – Biện Sơn.',
    ],
    congTrang: [
      "Thần tốc tiến quân ra Bắc, đánh tan quân Thanh ở Ngọc Hồi – Đống Đa dịp Tết Kỷ Dậu 1789.",
      "Cùng anh em Tây Sơn chấm dứt cục diện Trịnh – Nguyễn phân tranh, xóa bỏ ranh giới Đàng Trong – Đàng Ngoài kéo dài hai thế kỷ.",
      "Chỉ huy trận Rạch Gầm – Xoài Mút (1785), tiêu diệt gần như toàn bộ đạo thủy quân Xiêm.",
      "Ban hành nhiều cải cách về kinh tế, giáo dục, quân sự; xuống chiếu cầu hiền, khuyến khích dùng chữ Nôm.",
    ],
    suKien: [
      {
        nam: "1771",
        text: "Anh em Tây Sơn khởi nghĩa, xây dựng căn cứ tại Tây Sơn.",
      },
      {
        nam: "1785",
        text: "Đêm 19 rạng 20/1/1785, đánh tan quân Xiêm ở Rạch Gầm – Xoài Mút.",
      },
      {
        nam: "1786",
        text: "Chiếm Phú Xuân, tiến ra Thăng Long, lật đổ quyền lực họ Trịnh.",
      },
      {
        nam: "1788",
        text: "Ngày 22/12/1788, lên ngôi Hoàng đế ở núi Bân, lấy niên hiệu Quang Trung.",
      },
      {
        nam: "1789",
        text: "Sáng mùng 5 Tết Kỷ Dậu, thắng trận Ngọc Hồi, tiến vào Thăng Long.",
      },
      {
        nam: "1792",
        text: "Mất ngày 29 tháng 7 năm Nhâm Tý (16/9/1792) tại Phú Xuân.",
      },
    ],
    diTich: [
      {
        ten: "Bảo tàng Quang Trung và đền thờ Tây Sơn tam kiệt",
        diaDiem: "Tây Sơn, Bình Định",
      },
      {
        ten: "Gò Đống Đa và khu tượng đài Quang Trung",
        diaDiem: "Đống Đa, Hà Nội",
      },
      {
        ten: "Chùa Bộc (có tượng thờ Quang Trung)",
        diaDiem: "Hà Nội",
      },
      {
        ten: "Phòng tuyến Tam Điệp",
        diaDiem: "Tam Điệp, Ninh Bình",
      },
    ],
    tuongNiem: ["Ngày giỗ: 29 tháng 7 âm lịch", "Mùng 5 Tết âm lịch: hội Gò Đống Đa kỷ niệm chiến thắng Ngọc Hồi – Đống Đa"],
    ghiChuSuLieu:
      "Thứ bậc giữa Nguyễn Huệ và Nguyễn Lữ được các nguồn ghi khác nhau. Tuổi khi mất được ghi là 39 hoặc 40 tuổi. Đại Nam thực lục ghi ông mất tháng 7, Hoàng Lê nhất thống chí ghi tháng 8 âm lịch; theo Hoàng Xuân Hãn, ông mất khoảng 11 giờ đêm ngày cuối tháng 7 nên hai cách ghi chỉ chênh nhau chừng nửa giờ. Nguyên nhân cái chết và vị trí lăng mộ đến nay chưa xác định.",
    wikiTitle: "Quang Trung",
    leSlug: "gio-quang-trung",
    tieuBieu2013: true,
  },
  {
    slug: "truong-dinh",
    ten: "Trương Định",
    tenThat: null,
    tenKhac: ["Trương Công Định", "Trương Đăng Định", "Trương Trường Định", "Bình Tây Đại Nguyên soái"],
    namSinh: "1820",
    namMat: "1864",
    nienDai: "1820 – 1864",
    queQuan: "Làng Tư Cung, phủ Bình Sơn, Quảng Ngãi (nay thuộc Tịnh Khê)",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1862,
    tomTat: "Võ quan triều Nguyễn, thủ lĩnh kháng Pháp ở Nam Kỳ giai đoạn 1859 – 1864, được nhân dân tôn là Bình Tây Đại Nguyên soái.",
    tieuSu: [
      "Trương Định sinh năm 1820 tại làng Tư Cung, phủ Bình Sơn, Quảng Ngãi, con Lãnh binh Trương Cầm. Năm 1844 ông theo cha vào Nam, sau lấy vợ là Lê Thị Thưởng ở Tân Hòa (Gò Công). Hưởng ứng chính sách khẩn hoang của Nguyễn Tri Phương, ông bỏ tiền chiêu mộ dân nghèo lập đồn điền Gia Thuận và được bổ làm Quản cơ.",
      "Năm 1859, khi Pháp đánh Gia Định, ông đem quân phối hợp giữ Đại đồn Chí Hòa; đồn thất thủ, ông lui về Gò Công chiêu binh, mở rộng kháng chiến ra nhiều vùng Nam Kỳ. Sau hòa ước 1862, ông không tuân lệnh bãi binh, từ chối thư dụ hàng của tướng Pháp Bonard và được nghĩa quân, nhân dân tôn làm Bình Tây Đại Nguyên soái.",
      "Ngày 19/8/1864, do Huỳnh Công Tấn phản bội dẫn đường, quân Pháp đánh úp bản doanh Đám Lá Tối Trời; Trương Định bị trọng thương và mất khi 44 tuổi. Năm 1871, vua Tự Đức cho lập đền thờ ông tại Tư Cung. Nhà thơ Nguyễn Đình Chiểu làm 12 bài thơ và một bài văn tế điếu ông.",
    ],
    boiCanh: [
      "Tháng 2 năm 1859, Pháp tấn công Gia Định. Ngày 5/6/1862, triều đình Huế ký hòa ước với Pháp, nhường ba tỉnh miền Đông Nam Kỳ và ra lệnh các lực lượng kháng chiến bãi binh.",
      "Trương Định chọn ở lại cùng nghĩa quân, lấy vùng rừng ngập mặn Gò Công làm căn cứ, trở thành người đứng hàng đầu phong trào kháng Pháp ở Nam Kỳ thời kỳ này.",
    ],
    congTrang: [
      "Chiêu mộ nghĩa binh, lập căn cứ ở Gò Công, tổ chức kháng chiến trên nhiều vùng Nam Kỳ.",
      "Cùng quân triều đình phòng giữ Đại đồn Chí Hòa khi Pháp đánh Gia Định năm 1859.",
      "Không tuân lệnh bãi binh sau hòa ước 1862, tiếp tục lãnh đạo nghĩa quân chống Pháp.",
      "Ngày 16/12/1862, ra lệnh tấn công các vị trí của quân Pháp ở ba tỉnh miền Đông Nam Kỳ.",
    ],
    suKien: [
      {
        nam: "1844",
        text: "Theo cha là Lãnh binh Trương Cầm vào Nam.",
      },
      {
        nam: "1859",
        text: "Đem quân phối hợp với Nguyễn Tri Phương giữ Đại đồn Chí Hòa.",
      },
      {
        nam: "1862",
        text: "Từ chối bãi binh sau hòa ước, được tôn làm Bình Tây Đại Nguyên soái; ngày 16/12 tấn công quân Pháp ở ba tỉnh miền Đông.",
      },
      {
        nam: "1863",
        text: "Ngày 26/2/1863, Pháp chiếm căn cứ Gò Công; ông thoát vòng vây, kéo quân về Biên Hòa.",
      },
      {
        nam: "1864",
        text: "Ngày 19/8/1864, bản doanh Đám Lá Tối Trời bị đánh úp; ông bị trọng thương và mất.",
      },
    ],
    diTich: [
      {
        ten: "Lăng mộ và đền thờ Trương Định",
        diaDiem: "Gò Công, Tiền Giang",
      },
      {
        ten: "Đền thờ Trương Định",
        diaDiem: "Gia Thuận, Gò Công Đông, Tiền Giang",
      },
      {
        ten: "Đền thờ anh hùng dân tộc Trương Định",
        diaDiem: "Tịnh Khê, Quảng Ngãi",
      },
    ],
    tuongNiem: [
      "Quảng Ngãi: lễ giỗ tại Tịnh Khê ngày 17 và 19 tháng 8 âm lịch",
      "Gò Công: lễ hội tưởng niệm ngày 19 và 20 tháng 8 (nguồn ghi không thống nhất âm lịch hay dương lịch)",
    ],
    ghiChuSuLieu:
      "Các nguồn không thống nhất về cái chết: phần lớn cho rằng ông tự sát để khỏi rơi vào tay giặc, Việt sử tân biên của Phạm Văn Sơn lại chép ông cùng 28 tùy tùng bị bắn chết. Năm lập đồn điền Gia Thuận được ghi là 1850 hoặc 1854. Năm lăng mộ ở Gò Công được công nhận di tích quốc gia được ghi là 1987 hoặc 1989. Ngày lễ tưởng niệm ở Gò Công được ghi chỗ là âm lịch, chỗ là dương lịch.",
    wikiTitle: "Trương Định",
  },
  {
    slug: "nguyen-trung-truc",
    ten: "Nguyễn Trung Trực",
    tenThat: "Nguyễn Văn Lịch",
    tenKhac: ["Chơn (Hai Chơn)", "Quản Chơn", "Quản Lịch"],
    namSinh: "1838",
    namMat: "1868",
    nienDai: "1838 – 1868",
    queQuan: "Thôn Bình Nhựt, phủ Tân An, Gia Định (sau thuộc Thạnh Đức, Bến Lức, Long An); nguyên quán Phù Cát, Bình Định",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1861,
    tomTat: "Thủ lĩnh nghĩa quân chống Pháp ở Nam Bộ, nổi tiếng với trận đốt tàu L'Espérance ở Nhựt Tảo (1861) và trận đánh chiếm đồn Kiên Giang (1868).",
    tieuSu: [
      "Nguyễn Trung Trực tên thật là Nguyễn Văn Lịch, thuở nhỏ tên Chơn, sinh năm 1838 tại xóm nghề thôn Bình Nhựt, phủ Tân An, tỉnh Gia Định, trong một gia đình làm nghề chài lưới có nguyên quán ở Phù Cát, Bình Định. Ông học văn võ ở Định Tường và được thầy đặt tên hiệu là Trung Trực.",
      "Khi Pháp đánh Gia Định năm 1859, ông tham gia giữ Đại đồn Chí Hòa, sau đầu quân dưới quyền Trương Định. Ngày 10/12/1861, ông cùng nghĩa quân giả đám cưới phục kích, đốt cháy tàu chiến L'Espérance của Pháp ở vàm Nhựt Tảo. Năm 1867 ông được triều đình phong Hà Tiên thành thủ úy nhưng Hà Tiên đã mất; ông lập căn cứ ở Sân Chim, Hòn Chông để tiếp tục chống Pháp.",
      "Rạng sáng 19/6/1868, ông bất ngờ đánh chiếm đồn Kiên Giang và làm chủ tình hình trong 5 ngày, rồi rút ra Phú Quốc. Bị vây lâu ngày, để cứu nghĩa quân và dân chúng, ông ra nộp mình ngày 19/9/1868. Ngày 27/10/1868, thực dân Pháp hành hình ông tại Rạch Giá khi ông khoảng 30 tuổi.",
    ],
    boiCanh: [
      "Sau Hòa ước Nhâm Tuất 1862, ba tỉnh miền Đông Nam Kỳ thuộc về Pháp; đến năm 1867 Pháp chiếm nốt ba tỉnh miền Tây. Triều đình nhiều lần ra lệnh bãi binh, nhưng các thủ lĩnh như Trương Định và Nguyễn Trung Trực vẫn tiếp tục kháng chiến trong dân gian.",
    ],
    congTrang: [
      "Chỉ huy trận đốt cháy chiến hạm L'Espérance của Pháp tại vàm Nhựt Tảo ngày 10/12/1861.",
      "Đánh chiếm đồn Kiên Giang rạng sáng 19/6/1868, lần đầu nghĩa quân đánh vào trung tâm đầu não của tỉnh.",
      "Kiên trì chống Pháp ở miền Tây Nam Kỳ, Hòn Chông và Phú Quốc dù triều đình ra lệnh rút quân.",
      'Hai chiến công được Huỳnh Mẫn Đạt ca ngợi: "Hỏa hồng Nhựt Tảo oanh thiên địa, Kiếm bạt Kiên Giang khấp quỷ thần".',
    ],
    suKien: [
      {
        nam: "1860",
        text: "Ngày 10 tháng 3 năm Canh Thân, tuyên thệ xuất quân tại Bình Nhựt, đầu quân dưới quyền Trương Định.",
      },
      {
        nam: "1861",
        text: "Ngày 10/12/1861, đốt cháy chiến hạm L'Espérance tại vàm Nhựt Tảo.",
      },
      {
        nam: "1867",
        text: "Được phong Hà Tiên thành thủ úy; Hà Tiên thất thủ, ông lập căn cứ ở Sân Chim, Hòn Chông.",
      },
      {
        nam: "1868",
        text: "Ngày 19/6/1868, đánh chiếm đồn Kiên Giang; sau đó rút ra Phú Quốc.",
      },
      {
        nam: "1868",
        text: "Ngày 19/9/1868, ra nộp mình để cứu nghĩa quân và dân chúng.",
      },
      {
        nam: "1868",
        text: "Ngày 27/10/1868, bị thực dân Pháp hành hình tại Rạch Giá.",
      },
    ],
    diTich: [
      {
        ten: "Đình (đền thờ) và mộ Nguyễn Trung Trực",
        diaDiem: "Rạch Giá, Kiên Giang",
      },
      {
        ten: "Đền tưởng niệm Nguyễn Trung Trực",
        diaDiem: "Vàm Nhựt Tảo, Tân Trụ, Long An",
      },
    ],
    tuongNiem: ["Ngày giỗ: 27 tháng 8 âm lịch", "Lễ hội tại đình Nguyễn Trung Trực, Rạch Giá: từ 26 đến 28 tháng 8 âm lịch"],
    ghiChuSuLieu:
      'Năm sinh thường ghi 1838, dựa trên biên bản hỏi cung năm 1868 cho biết ông "mới được 30 tuổi"; có sách ghi 1837. Nguồn ghi ngày hành hình 27/10/1868 là ngày 12 tháng 9 năm Mậu Thìn. Lý do ông ra nộp mình được giải thích khác nhau: vì cứu nghĩa quân và dân chúng, vì mẹ bị bắt làm con tin, hoặc do bị vây cùng đường.',
    wikiTitle: "Nguyễn Trung Trực",
    leSlug: "gio-nguyen-trung-truc",
  },
  {
    slug: "phan-dinh-phung",
    ten: "Phan Đình Phùng",
    tenThat: null,
    tenKhac: ["Châu Phong", "Tôn Cát"],
    namSinh: "1847",
    namMat: "1895",
    nienDai: "1847 – 1895",
    queQuan: "Làng Đông Thái, huyện La Sơn (nay là xã Tùng Ảnh, Đức Thọ), Hà Tĩnh",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1885,
    tomTat: "Đình nguyên Tiến sĩ, quan Ngự sử cương trực, lãnh đạo khởi nghĩa Hương Khê – cuộc khởi nghĩa lớn nhất, kéo dài nhất trong phong trào Cần Vương.",
    tieuSu: [
      "Phan Đình Phùng, hiệu Châu Phong, tự Tôn Cát, sinh ngày 6/6/1847 tại làng Đông Thái, huyện La Sơn, trong một dòng họ nhiều đời đỗ đạt. Ông đỗ Cử nhân năm 1876 và đỗ đầu kỳ thi Đình, thành Đình nguyên Tiến sĩ năm 1877. Làm quan dưới triều Tự Đức, ông nổi tiếng thanh liêm, cương trực, được giữ chức Ngự sử, thanh tra và vạch tội nhiều quan lại.",
      "Sau khi Tự Đức mất, ông phản đối việc phế lập của Tôn Thất Thuyết nên bị cách chức, bị giam rồi đuổi về quê. Năm 1885, hưởng ứng Chiếu Cần Vương, ông được vua Hàm Nghi phong Tán lý Quân vụ, lập đại bản doanh trên núi Vũ Quang và tổ chức nghĩa quân thành 15 thứ, có kỷ luật và quân phục như quân chính quy.",
      "Cùng trợ thủ Cao Thắng, ông duy trì kháng chiến ở Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Bình, tự chế tạo súng theo mẫu súng Pháp. Cao Thắng tử trận năm 1893. Ngày 17/10/1894, nghĩa quân thắng trận lớn cuối cùng. Bị vây ngặt, ông bị thương nặng rồi mất ngày 28/12/1895; khởi nghĩa Hương Khê tan rã sau đó.",
    ],
    boiCanh: [
      "Năm 1883 vua Tự Đức mất, triều đình Huế rối ren với nhiều lần phế lập vua, trong khi Pháp hoàn tất việc đặt ách đô hộ. Tháng 7 năm 1885, sau cuộc tấn công thất bại ở kinh thành, Tôn Thất Thuyết đưa vua Hàm Nghi ra Tân Sở và ban Chiếu Cần Vương kêu gọi văn thân, nhân dân đứng lên chống Pháp.",
      "Năm 1888 vua Hàm Nghi bị bắt và bị đày sang Algérie, nhưng nghĩa quân Hương Khê vẫn tiếp tục chiến đấu thêm nhiều năm.",
    ],
    congTrang: [
      "Lãnh đạo khởi nghĩa Hương Khê (1885 – 1896), cuộc khởi nghĩa quy mô lớn nhất, kéo dài nhất của phong trào Cần Vương.",
      "Tổ chức nghĩa quân theo lối chính quy, chia 15 thứ quân, có kỷ luật nghiêm và quân phục thống nhất.",
      "Cùng Cao Thắng xây dựng căn cứ, mạng lưới tiếp tế, tự chế tạo súng trường theo mẫu súng Pháp.",
      "Kiên quyết không đầu hàng dù anh trai bị bắt làm con tin và mồ mả tổ tiên bị đe dọa.",
      "Làm Ngự sử thanh liêm dưới triều Tự Đức, vạch tội nhiều quan lại tham nhũng.",
    ],
    suKien: [
      {
        nam: "1847",
        text: "Sinh ngày 6/6/1847 tại làng Đông Thái, huyện La Sơn.",
      },
      {
        nam: "1877",
        text: "Đỗ Đình nguyên Tiến sĩ.",
      },
      {
        nam: "1885",
        text: "Hưởng ứng Chiếu Cần Vương, lập căn cứ trên núi Vũ Quang, mở đầu khởi nghĩa Hương Khê.",
      },
      {
        nam: "1893",
        text: "Trợ thủ đắc lực Cao Thắng tử trận.",
      },
      {
        nam: "1894",
        text: "Ngày 17/10/1894, nghĩa quân thắng một trận lớn – trận thắng cuối cùng.",
      },
      {
        nam: "1895",
        text: "Ngày 28/12/1895, bị thương nặng trong chiến đấu và qua đời.",
      },
    ],
    diTich: [
      {
        ten: "Núi Vũ Quang – đại bản doanh nghĩa quân Hương Khê",
        diaDiem: "Hương Khê, Hà Tĩnh",
      },
    ],
    tuongNiem: [],
    ghiChuSuLieu:
      "Ngày mất không thống nhất: phần tiểu sử ghi ông hy sinh ngày 28/12/1895, trong khi hộp thông tin ghi 21/1/1896. Giai thoại Nguyễn Thân quật mồ, đốt xác, trộn tro vào thuốc súng bắn xuống sông La đã được nhà nghiên cứu Tôn Thất Thọ chứng minh là không có cơ sở; nhiều giai thoại khác từ sách của Đào Trinh Nhất cũng chưa được kiểm chứng.",
    wikiTitle: "Phan Đình Phùng",
  },
  {
    slug: "hoang-hoa-tham",
    ten: "Hoàng Hoa Thám",
    tenThat: "Trương Văn Nghĩa",
    tenKhac: ["Đề Thám", "Đề Dương", "Hùm thiêng Yên Thế", "Trương Văn Thám"],
    namSinh: "1858",
    namMat: "1913",
    nienDai: "1858 – 1913",
    queQuan: "Làng Dị Chế, huyện Tiên Lữ, Hưng Yên",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1892,
    tomTat: 'Thủ lĩnh khởi nghĩa Yên Thế, cuộc khởi nghĩa nông dân chống Pháp kéo dài gần 30 năm (1884 – 1913), được gọi là "Hùm thiêng Yên Thế".',
    tieuSu: [
      "Hoàng Hoa Thám tên thật là Trương Văn Nghĩa, sau đổi thành Trương Văn Thám, theo phần lớn tài liệu sinh năm 1858, quê làng Dị Chế, huyện Tiên Lữ, Hưng Yên; gia đình sau di cư lên Sơn Tây rồi đến Yên Thế (Bắc Giang). Ông từng tham gia khởi nghĩa Đại Trận, nghĩa binh Trần Xuân Soạn và khởi nghĩa Cai Kinh.",
      "Cuối năm 1885, ông về Yên Thế đứng dưới cờ Đề Nắm. Tháng 4 năm 1892 Đề Nắm bị sát hại, ông trở thành thủ lĩnh tối cao của phong trào. Bằng lối đánh du kích, ông buộc Pháp hai lần phải giảng hòa (1894, 1897); trong thời gian hòa hoãn, ông lấy Phồn Xương làm căn cứ, liên hệ với Phan Bội Châu, Phan Châu Trinh và các sĩ phu yêu nước.",
      "Năm 1908, ông chỉ đạo vụ Hà thành đầu độc nhằm vào binh lính Pháp ở Hà Nội. Tháng 1 năm 1909, Pháp huy động lực lượng lớn tổng tấn công Yên Thế; nghĩa quân tổn thất nặng và đến đầu năm 1910 tan rã dần. Theo ghi chép phổ biến, ông bị thủ hạ của Lương Tam Kỳ sát hại ngày 10/2/1913 (mồng 5 Tết Quý Sửu).",
    ],
    boiCanh: [
      "Cuối thế kỷ 19, Yên Thế Thượng là vùng đất hoang vu, nơi nông dân lưu tán đến khai phá và lập các làng chiến đấu tự vệ. Khi Pháp mở rộng chiếm đóng Bắc Kỳ, những toán nghĩa quân ở đây nổi dậy chống Pháp, dựa vào địa thế rừng núi hiểm trở thông sang Tam Đảo, Thái Nguyên.",
      "Khởi nghĩa Yên Thế trải qua bốn giai đoạn (1884 – 1913); từ năm 1892 phong trào được thống nhất dưới sự chỉ huy của Đề Thám.",
    ],
    congTrang: [
      "Lãnh đạo khởi nghĩa Yên Thế, phong trào nông dân chống Pháp kéo dài gần 30 năm.",
      "Tổ chức nhiều trận đánh tiêu biểu như Cao Thượng, Hố Chuối (1890), Đồng Hom (1892).",
      "Buộc thực dân Pháp hai lần phải giảng hòa (1894, 1897), giữ căn cứ Phồn Xương hơn 10 năm.",
      "Liên kết với các sĩ phu yêu nước như Phan Bội Châu, Phan Châu Trinh; chỉ đạo vụ Hà thành đầu độc năm 1908.",
    ],
    suKien: [
      {
        nam: "1885",
        text: "Cuối năm, về Yên Thế đứng dưới cờ Đề Nắm.",
      },
      {
        nam: "1892",
        text: "Tháng 4, Đề Nắm bị sát hại; Đề Thám trở thành thủ lĩnh tối cao của nghĩa quân Yên Thế.",
      },
      {
        nam: "1894",
        text: "Tháng 10, Pháp chấp nhận giảng hòa, để nghĩa quân kiểm soát bốn tổng thuộc Yên Thế.",
      },
      {
        nam: "1897",
        text: "Tháng 12, giảng hòa lần thứ hai; nghĩa quân xây dựng căn cứ Phồn Xương.",
      },
      {
        nam: "1909",
        text: "Ngày 29/1/1909, Pháp tổng tấn công Yên Thế; nghĩa quân suy yếu dần.",
      },
      {
        nam: "1913",
        text: "Ngày 10/2/1913, theo ghi chép phổ biến, ông bị thủ hạ của Lương Tam Kỳ sát hại.",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích khởi nghĩa Yên Thế",
        diaDiem: "Phồn Xương, Yên Thế, Bắc Giang",
      },
    ],
    tuongNiem: [],
    ghiChuSuLieu:
      "Năm sinh phổ biến là 1858; nhà nghiên cứu Khổng Đức Thiêm cho rằng ông sinh năm 1836 và gốc họ Đoàn. Cái chết của ông còn nhiều giả thuyết: có ý kiến cho rằng thủ cấp bị bêu không phải của ông, ông trốn thoát và mất vì bệnh; phần mộ đến nay chưa xác định. Ngày xảy ra vụ Hà thành đầu độc được ghi là 27/6/1908 hoặc 27/7/1908; một số mốc trận đánh cũng lệch tháng giữa các bài.",
    wikiTitle: "Hoàng Hoa Thám",
  },
  {
    slug: "ho-chi-minh",
    ten: "Chủ tịch Hồ Chí Minh",
    tenThat: "Nguyễn Sinh Cung",
    tenKhac: ["Nguyễn Tất Thành", "Nguyễn Ái Quốc", "Văn Ba", "Bác Hồ"],
    namSinh: "1890",
    namMat: "1969",
    nienDai: "1890 – 1969",
    queQuan: "Kim Liên, Nam Đàn, Nghệ An",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1945,
    tomTat:
      "Người sáng lập Đảng Cộng sản Việt Nam, đọc Tuyên ngôn Độc lập ngày 2/9/1945 khai sinh nước Việt Nam Dân chủ Cộng hòa và là Chủ tịch nước đến khi qua đời.",
    tieuSu: [
      "Chủ tịch Hồ Chí Minh tên khai sinh là Nguyễn Sinh Cung, sinh ngày 19/5/1890 tại làng Hoàng Trù (quê ngoại), gần làng Kim Liên (quê nội), huyện Nam Đàn, Nghệ An. Cha là Phó bảng Nguyễn Sinh Sắc, mẹ là bà Hoàng Thị Loan. Khi đi học, ông mang tên Nguyễn Tất Thành.",
      "Ngày 5/6/1911, từ Bến Nhà Rồng, Nguyễn Tất Thành lấy tên Văn Ba, làm phụ bếp trên tàu buôn Đô đốc Latouche-Tréville sang Pháp. Năm 1919, với tên Nguyễn Ái Quốc, ông gửi bản Yêu sách của nhân dân An Nam tới Hội nghị Versailles. Ngày 3/2/1930, ông thống nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam. Ngày 28/1/1941, ông trở về nước, lập căn cứ ở Pác Bó (Cao Bằng).",
      "Ngày 2/9/1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa. Người lãnh đạo đất nước qua các cuộc kháng chiến và mất lúc 9 giờ 47 phút ngày 2/9/1969 tại Hà Nội, hưởng thọ 79 tuổi. Thi hài Người được giữ gìn trong Lăng Chủ tịch Hồ Chí Minh.",
    ],
    boiCanh: [
      "Cuối thế kỷ 19 – đầu thế kỷ 20, Việt Nam nằm dưới ách cai trị của thực dân Pháp; các phong trào yêu nước theo nhiều khuynh hướng lần lượt nổ ra nhưng chưa thành công. Nguyễn Tất Thành ra nước ngoài tìm con đường cứu nước.",
      "Tháng 8 năm 1945, Việt Minh lãnh đạo Cách mạng Tháng Tám giành chính quyền; Đại hội quốc dân Tân Trào cử Ủy ban Dân tộc Giải phóng do Hồ Chí Minh làm Chủ tịch.",
    ],
    congTrang: [
      "Soạn thảo và đọc Tuyên ngôn Độc lập ngày 2/9/1945, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
      "Ngày 3/2/1930, thống nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam.",
      "Chủ trì Hội nghị Trung ương 8 (5/1941) tại Pác Bó, quyết định thành lập Mặt trận Việt Minh.",
      "Lãnh đạo nhân dân qua các cuộc kháng chiến giành độc lập, thống nhất đất nước.",
    ],
    suKien: [
      {
        nam: "1890",
        text: "Sinh ngày 19/5/1890 tại Nam Đàn, Nghệ An.",
      },
      {
        nam: "1911",
        text: "Ngày 5/6/1911, rời Bến Nhà Rồng sang Pháp.",
      },
      {
        nam: "1930",
        text: "Ngày 3/2/1930, thống nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam.",
      },
      {
        nam: "1941",
        text: "Ngày 28/1/1941, trở về Việt Nam, sau đó ở hang Cốc Bó, Pác Bó.",
      },
      {
        nam: "1945",
        text: "Ngày 2/9/1945, đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.",
      },
      {
        nam: "1969",
        text: "Mất ngày 2/9/1969 tại Hà Nội.",
      },
    ],
    diTich: [
      {
        ten: "Lăng Chủ tịch Hồ Chí Minh",
        diaDiem: "Ba Đình, Hà Nội",
      },
      {
        ten: "Khu di tích Phủ Chủ tịch",
        diaDiem: "Ba Đình, Hà Nội",
      },
      {
        ten: "Khu di tích Kim Liên",
        diaDiem: "Nam Đàn, Nghệ An",
      },
      {
        ten: "Bến Nhà Rồng",
        diaDiem: "Thành phố Hồ Chí Minh",
      },
    ],
    tuongNiem: ["19/5 dương lịch: ngày sinh Chủ tịch Hồ Chí Minh", "2/9 dương lịch: ngày mất, trùng ngày Quốc khánh"],
    ghiChuSuLieu:
      "Một số tài liệu ghi tên lúc nhỏ là Nguyễn Sinh Côn. Do hoàn cảnh thời chiến, ngày mất từng được công bố là 3/9/1969, đến năm 1989 mới công bố lại là 2/9.",
    wikiTitle: "Hồ Chí Minh",
    leSlug: "ngay-sinh-bac-ho",
    tieuBieu2013: true,
  },
  {
    slug: "vo-nguyen-giap",
    ten: "Đại tướng Võ Nguyên Giáp",
    tenThat: "Võ Giáp",
    tenKhac: ["Anh Văn", "Tướng Giáp"],
    namSinh: "1911",
    namMat: "2013",
    nienDai: "1911 – 2013",
    queQuan: "Làng An Xá, Lệ Thủy, Quảng Bình",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1954,
    tomTat: "Đại tướng đầu tiên, Tổng Tư lệnh Quân đội nhân dân Việt Nam, người chỉ huy chiến dịch Điện Biên Phủ năm 1954.",
    tieuSu: [
      "Đại tướng Võ Nguyên Giáp tên khai sinh là Võ Giáp, sinh ngày 25/8/1911 tại làng An Xá, huyện Lệ Thủy, Quảng Bình, trong một gia đình nhà nho. Ông học Trường Quốc học Huế, bị đuổi học năm 1927 vì tham gia bãi khóa, sau ra Hà Nội học luật và nhận bằng cử nhân luật năm 1937; từ năm 1939 dạy môn lịch sử tại Trường tư thục Thăng Long.",
      "Ngày 22/12/1944, theo chỉ thị của Hồ Chí Minh, ông thành lập đội Việt Nam Tuyên truyền Giải phóng quân – tiền thân của Quân đội nhân dân Việt Nam. Sau Cách mạng Tháng Tám, ông làm Bộ trưởng Bộ Nội vụ. Năm 1948, ông được phong quân hàm Đại tướng, trở thành Đại tướng đầu tiên của Quân đội nhân dân Việt Nam khi 37 tuổi.",
      "Năm 1954, ông được giao toàn quyền chỉ huy chiến dịch Điện Biên Phủ; sau 56 ngày đêm, quân đội Liên hiệp Pháp bị đánh bại. Ông nhiều năm giữ các cương vị Tổng Tư lệnh, Bộ trưởng Bộ Quốc phòng, Phó Thủ tướng. Đại tướng mất ngày 4/10/2013 tại Hà Nội, thọ 103 tuổi (âm lịch), được an táng tại Vũng Chùa – Đảo Yến, Quảng Bình.",
    ],
    boiCanh: [
      "Sau Cách mạng Tháng Tám 1945, nước Việt Nam Dân chủ Cộng hòa non trẻ phải đối phó với cuộc chiến tranh trở lại của thực dân Pháp. Quân đội nhân dân Việt Nam được xây dựng từ những đơn vị vũ trang nhỏ, dần trưởng thành qua các chiến dịch lớn.",
      "Chiến thắng Điện Biên Phủ năm 1954 dẫn tới Hiệp định Genève về Đông Dương, chấm dứt sự có mặt của Pháp ở Việt Nam.",
    ],
    congTrang: [
      "Chỉ huy chiến dịch Điện Biên Phủ (3 – 5/1954), đánh bại tập đoàn cứ điểm của Liên hiệp Pháp.",
      "Thành lập và chỉ huy đội Việt Nam Tuyên truyền Giải phóng quân (22/12/1944), tiền thân Quân đội nhân dân Việt Nam.",
      "Đại tướng đầu tiên của Quân đội nhân dân Việt Nam (1948), nhiều năm là Tổng Tư lệnh.",
      "Góp phần chỉ đạo cuộc kháng chiến chống Mỹ, cứu nước.",
    ],
    suKien: [
      {
        nam: "1911",
        text: "Sinh ngày 25/8/1911 tại làng An Xá, Lệ Thủy, Quảng Bình.",
      },
      {
        nam: "1944",
        text: "Ngày 22/12/1944, thành lập đội Việt Nam Tuyên truyền Giải phóng quân.",
      },
      {
        nam: "1945",
        text: "Được cử làm Bộ trưởng Bộ Nội vụ trong Chính phủ lâm thời.",
      },
      {
        nam: "1948",
        text: "Được phong quân hàm Đại tướng.",
      },
      {
        nam: "1954",
        text: "Chỉ huy chiến dịch Điện Biên Phủ thắng lợi.",
      },
      {
        nam: "2013",
        text: "Mất ngày 4/10/2013 tại Hà Nội; Quốc tang ngày 12 – 13/10/2013.",
      },
    ],
    diTich: [
      {
        ten: "Khu mộ Đại tướng Võ Nguyên Giáp",
        diaDiem: "Vũng Chùa – Đảo Yến, Quảng Đông, Quảng Trạch, Quảng Bình",
      },
    ],
    tuongNiem: ["25/8 dương lịch: ngày sinh Đại tướng", "4/10 dương lịch: ngày mất"],
    ghiChuSuLieu: null,
    wikiTitle: "Võ Nguyên Giáp",
    leSlug: "ngay-sinh-dai-tuong-vo-nguyen-giap",
  },
  {
    slug: "vo-thi-sau",
    ten: "Võ Thị Sáu",
    tenThat: null,
    tenKhac: ["Chị Sáu"],
    namSinh: "1933",
    namMat: "1952",
    nienDai: "1933 – 1952",
    queQuan: "Có nhiều thuyết: làng Phước Thọ (Đất Đỏ) hoặc làng Long Mỹ (Long Hải), tỉnh Bà Rịa",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1952,
    tomTat:
      "Nữ đội viên Công an xung phong Đất Đỏ trong kháng chiến chống Pháp, hy sinh tại Côn Đảo năm 1952, được truy tặng Anh hùng Lực lượng vũ trang nhân dân.",
    tieuSu: [
      "Võ Thị Sáu sinh năm 1933 ở vùng Đất Đỏ, tỉnh Bà Rịa, trong một gia đình nghèo: cha đánh xe ngựa chở khách, mẹ bán hàng ở chợ Đất Đỏ. Khi Pháp tái chiếm Đất Đỏ cuối năm 1945, các anh trai của chị thoát ly theo kháng chiến; chị bỏ học, ở nhà giúp gia đình và bí mật tiếp tế cho các anh.",
      "Năm 1946, chị theo anh trai vào khu kháng chiến, làm liên lạc cho Đội Công an xung phong Đất Đỏ, năm 1947 chính thức trở thành đội viên khi mới 14 tuổi. Chị tham gia nhiều trận tập kích bằng lựu đạn nhằm vào sĩ quan Pháp và những người cộng tác với Pháp.",
      "Chị bị bắt khoảng cuối năm 1949 hoặc đầu năm 1950, bị giam ở Đất Đỏ, Bà Rịa, Chí Hòa và bị tòa án binh Pháp kết án tử hình khi chưa tròn 18 tuổi. Chị bị đưa ra Côn Đảo và bị xử bắn lúc khoảng 7 giờ sáng ngày 23/1/1952, khi 19 tuổi; thi hài được chôn tại Hàng Dương.",
    ],
    boiCanh: [
      "Sau Cách mạng Tháng Tám, thực dân Pháp quay lại tái chiếm Nam Bộ. Tại Bà Rịa, nhiều thanh niên thoát ly gia đình tham gia các lực lượng kháng chiến địa phương như Chi đội Giải phóng quân tỉnh Bà Rịa và Công an xung phong Đất Đỏ.",
      "Bản án tử hình dành cho một cô gái chưa đủ tuổi thành niên đã gây phản đối mạnh mẽ cả ở Việt Nam và Pháp, khiến chính quyền quân sự Pháp không thể thi hành án công khai.",
    ],
    congTrang: [
      "Trở thành đội viên Công an xung phong Đất Đỏ từ năm 14 tuổi, tham gia nhiều trận tập kích quân Pháp.",
      "Giữ vững khí tiết trước tòa án binh và pháp trường, trở thành biểu tượng nữ anh hùng thời kháng chiến chống Pháp.",
      "Được công nhận liệt sĩ; năm 1993 được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    suKien: [
      {
        nam: "1933",
        text: "Sinh tại vùng Đất Đỏ, tỉnh Bà Rịa.",
      },
      {
        nam: "1946",
        text: "Theo anh trai vào khu kháng chiến, làm liên lạc cho Đội Công an xung phong Đất Đỏ.",
      },
      {
        nam: "1947",
        text: "Chính thức trở thành đội viên Công an xung phong Đất Đỏ khi 14 tuổi.",
      },
      {
        nam: "1950",
        text: "Tháng 4, bị tòa án binh Pháp xét xử và tuyên án tử hình.",
      },
      {
        nam: "1952",
        text: "Ngày 23/1/1952, bị xử bắn tại Côn Đảo.",
      },
      {
        nam: "1993",
        text: "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
      },
    ],
    diTich: [
      {
        ten: "Mộ Võ Thị Sáu, Nghĩa trang Hàng Dương",
        diaDiem: "Côn Đảo",
      },
      {
        ten: "Nhà lưu niệm Võ Thị Sáu (di tích quốc gia năm 1986)",
        diaDiem: "Đất Đỏ, Bà Rịa – Vũng Tàu",
      },
    ],
    tuongNiem: ["23/1 dương lịch: ngày giỗ"],
    ghiChuSuLieu:
      "Nguyên quán được ghi là làng Phước Thọ hoặc làng Long Mỹ. Thời điểm bị bắt được ghi là tháng 12/1949 hoặc tháng 2/1950. Nhiều câu nói và giai thoại về chị được lưu truyền rộng rãi nhưng chưa được kiểm chứng đầy đủ.",
    wikiTitle: "Võ Thị Sáu",
    leSlug: "gio-vo-thi-sau",
  },
];
