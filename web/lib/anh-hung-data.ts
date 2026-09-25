/**
 * Dữ liệu chuyên mục Các anh hùng dân tộc — trích từ các bài Wikipedia tiếng Việt (trường wikiTitle,
 * truy cập 24/9/2026) và dữ liệu trang lễ lib/le.ts. Không thêm niên đại/công trạng ngoài nguồn;
 * điểm sử liệu chưa thống nhất ghi ở ghiChuSuLieu. 17 nhân vật lượt 1 (cuối mảng) trích từ hồ sơ khảo cứu, nguồn ở trường nguon. Công trạng đầu tiên là mốc hiển thị trên dòng thời gian.
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
  // Lượt 1 (26/9/2026): 17 nhân vật trích từ hồ sơ khảo cứu artwork-inbox/vanhoa/research/luot-1.docx; nguồn ghi ở trường nguon.
  {
    slug: "an-duong-vuong",
    ten: "An Dương Vương",
    tenThat: "Thục Phán",
    tenKhac: ["Thục An Dương Vương"],
    namSinh: null,
    namMat: null,
    nienDai: "Thế kỷ III – II TCN",
    queQuan: "Sử cũ chép gốc nước Thục; sử học hiện đại cho là thủ lĩnh người Âu Việt vùng Nam Cương (vùng Cao Bằng và giáp ranh Quảng Tây)",
    thoiKy: "hong-bang",
    trieuDai: "Nhà Thục (Âu Lạc)",
    namMoc: -257,
    tomTat: "Thục Phán thống nhất người Âu Việt và Lạc Việt, lập nước Âu Lạc, chống quân Tần và xây thành Cổ Loa.",
    tieuSu: [
      "An Dương Vương, tên thật là Thục Phán, là vị vua lập nước Âu Lạc. Sử cũ quy nguồn gốc ông về nước Thục (vùng Tứ Xuyên, Trung Quốc), nhưng các học giả hiện đại bác bỏ thuyết này vì khoảng cách địa lý quá xa, và xác định ông là thủ lĩnh người Âu Việt thuộc liên minh bộ lạc Nam Cương.",
      "Ông thống nhất hai khối cư dân Âu Việt và Lạc Việt, lập nên nước Âu Lạc. Khi quân Tần tiến xuống phương Nam, quân dân Âu Lạc rút vào rừng núi, tiêu hao sinh lực địch rồi phản công, giết chủ tướng Đồ Thư. Sau đó ông dời đô xuống vùng đồng bằng Phong Khê, xây thành Cổ Loa hình xoắn ốc, chế tạo nỏ liên châu bắn nhiều mũi tên một lúc và xây dựng thủy binh.",
      "Tương truyền, thần Kim Quy giúp vua trừ yêu để xây xong thành Cổ Loa và cho một chiếc móng làm lẫy nỏ thần. Cũng tương truyền, con gái vua là Mỵ Châu bị Trọng Thủy lừa lấy lẫy nỏ, thành Cổ Loa thất thủ; An Dương Vương chém Mỵ Châu rồi cầm sừng tê bảy tấc rẽ nước xuống biển.",
    ],
    boiCanh: [
      "Cuối thế kỷ III TCN, đế chế Tần mở cuộc nam tiến xuống vùng đất của người Việt cổ. Việc hợp nhất Âu Việt và Lạc Việt tạo ra nhà nước Âu Lạc, nhà nước thứ hai trong lịch sử Việt Nam, đủ sức đương đầu với quân Tần.",
    ],
    congTrang: [
      "Thống nhất cư dân Âu Việt và Lạc Việt, lập nước Âu Lạc.",
      "Lãnh đạo quân dân đánh quân Tần, giết chủ tướng Đồ Thư.",
      "Dời đô về Phong Khê, xây thành Cổ Loa với cấu trúc phòng ngự hình xoắn ốc.",
      "Phát triển nỏ liên châu và lực lượng thủy binh.",
    ],
    suKien: [
      {
        nam: "257 TCN",
        text: "Theo Đại Việt sử ký toàn thư và Khâm định Việt sử thông giám cương mục, bắt đầu trị vì nước Âu Lạc.",
      },
      {
        nam: "208 TCN",
        text: "Theo các bộ sử cũ, nước Âu Lạc mất; theo nhiều nhà sử học hiện đại, đây là năm Âu Lạc mới được thành lập.",
      },
      {
        nam: "179 TCN",
        text: "Theo cách đối chiếu với Sử ký của Tư Mã Thiên, Âu Lạc kết thúc sau khoảng 30 năm tồn tại.",
      },
    ],
    diTich: [
      {
        ten: "Đền An Dương Vương (Đền Thượng), Khu di tích quốc gia đặc biệt Cổ Loa",
        diaDiem: "Xã Cổ Loa, huyện Đông Anh, Hà Nội",
      },
    ],
    tuongNiem: [
      "Lễ hội đền Cổ Loa (di sản văn hóa phi vật thể quốc gia) ngày mùng 6 tháng Giêng âm lịch, kỷ niệm ngày vua lên ngôi.",
      "Lễ cầu phúc ngày mùng 7 tháng 3 âm lịch tại đền Cổ Loa.",
    ],
    ghiChuSuLieu:
      "Niên đại còn tranh luận: sử cũ chép An Dương Vương trị vì khoảng 50 năm (257 – 208 TCN), trong khi sử học hiện đại đối chiếu với Sử ký cho rằng Âu Lạc chỉ tồn tại khoảng 30 năm (208 – 179 TCN). Các sử gia triều Nguyễn trong Cương mục từng nghi ngờ gốc gác “nhà Thục”. Chuyện nỏ thần, Mỵ Châu – Trọng Thủy thuộc truyền thuyết.",
    wikiTitle: "An Dương Vương",
    nguon: [
      "Đại Việt sử ký toàn thư; Khâm định Việt sử thông giám cương mục.",
      "Ban quản lý Khu di tích Cổ Loa, “Nguồn gốc Thục Phán và sự thành lập nước Âu Lạc” (thanhcoloa.vn).",
      "Báo Đại biểu Nhân dân, “Lễ dâng hương tưởng niệm Đức Vua An Dương Vương”.",
    ],
  },
  {
    slug: "trieu-quang-phuc",
    ten: "Triệu Quang Phục",
    tenThat: null,
    tenKhac: ["Triệu Việt Vương", "Dạ Trạch Vương"],
    namSinh: "524",
    namMat: "571",
    nienDai: "524 – 571",
    queQuan: "Huyện Chu Diên, Giao Châu theo Đại Việt sử ký toàn thư; tương ứng vùng huyện Khoái Châu, Hưng Yên",
    thoiKy: "bac-thuoc",
    trieuDai: "Tiền Lý",
    namMoc: 550,
    tomTat: "Tướng của Lý Nam Đế, lập căn cứ ở đầm Dạ Trạch đánh quân Lương, năm 550 giành lại nước Vạn Xuân và xưng Triệu Việt Vương.",
    tieuSu: [
      "Triệu Quang Phục sinh năm 524. Năm 541, ông cùng cha là Triệu Túc theo Lý Nam Đế khởi nghĩa chống nhà Lương, được phong Tả tướng quân.",
      "Năm 548, Lý Nam Đế bệnh nặng, giao binh quyền cho ông. Trước quân Lương do Trần Bá Tiên chỉ huy, ông rút về đầm Dạ Trạch, ngày ẩn trong lau sậy, đêm dùng thuyền độc mộc tập kích doanh trại địch. Năm 550, nhân nhà Lương có biến loạn, ông phản công đuổi quân Lương, lên ngôi xưng Triệu Việt Vương.",
      "Ông chia đất cho Lý Phật Tử cai quản miền Tây. Tương truyền, con gái ông là Cảo Nương lấy Nhã Lang (con Lý Phật Tử); Nhã Lang đánh tráo mũ đâu mâu cắm móng rồng, khiến Triệu Việt Vương thất thế trước quân Lý Phật Tử. Năm 571, ông tự vẫn ở cửa biển Đại Nha.",
    ],
    boiCanh: [
      "Nước Vạn Xuân do Lý Nam Đế lập năm 544 bị nhà Lương phản công ngay sau đó. Cuộc kháng chiến ở Dạ Trạch giữ được nền độc lập, nhưng việc chia quyền với Lý Phật Tử dẫn tới nội chiến và làm suy yếu nhà nước Vạn Xuân.",
    ],
    congTrang: [
      "Cùng cha là Triệu Túc hưởng ứng khởi nghĩa Lý Nam Đế năm 541, được phong Tả tướng quân.",
      "Lập căn cứ đầm Dạ Trạch, đánh du kích làm thất bại kế hoạch đánh nhanh của quân Lương.",
      "Năm 550 phản công đuổi quân Lương, khôi phục nước Vạn Xuân.",
    ],
    suKien: [
      {
        nam: "541",
        text: "Cùng cha là Triệu Túc theo Lý Nam Đế khởi nghĩa chống nhà Lương.",
      },
      {
        nam: "548",
        text: "Được Lý Nam Đế giao binh quyền, rút quân về đầm Dạ Trạch.",
      },
      {
        nam: "550",
        text: "Phản công đuổi quân Lương, lên ngôi xưng Triệu Việt Vương.",
      },
      {
        nam: "571",
        text: "Thất thế trước Lý Phật Tử, tự vẫn ở cửa biển Đại Nha.",
      },
    ],
    diTich: [
      {
        ten: "Đền Hóa Dạ Trạch (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Dạ Trạch, huyện Khoái Châu, Hưng Yên",
      },
    ],
    tuongNiem: ["Lễ hội đền Hóa Dạ Trạch (di sản văn hóa phi vật thể quốc gia) từ ngày 10 đến 12 tháng 8 âm lịch."],
    ghiChuSuLieu:
      "Chuyện thần Chử Đồng Tử trao móng rồng và chuyện Nhã Lang đánh tráo mũ đâu mâu thuộc truyền thuyết. Việc chia đất cho Lý Phật Tử được nhiều sử gia đánh giá là nhượng bộ thiếu tính toán, dẫn đến nội chiến.",
    wikiTitle: "Triệu Việt Vương",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Vietnamdefence, “Triệu Quang Phục (? – 571) – người kế thừa xuất sắc sự nghiệp của Lý Bôn”.",
      "Báo Dân Việt, “Triệu Việt Vương lên ngôi vua nước Vạn Xuân năm bao nhiêu”.",
    ],
  },
  {
    slug: "khuc-thua-du",
    ten: "Khúc Thừa Dụ",
    tenThat: null,
    tenKhac: ["Khúc Tiên Chúa"],
    namSinh: null,
    namMat: "907",
    nienDai: "? – 907",
    queQuan: "Xứ Cúc Bồ, Hồng Châu; nay thuộc xã Kiến Quốc, huyện Ninh Giang, Hải Dương",
    thoiKy: "the-ky-x",
    trieuDai: "Thời tự chủ",
    namMoc: 905,
    tomTat: "Hào trưởng họ Khúc nổi dậy chiếm thành Tống Bình năm 905, tự xưng Tiết độ sứ, mở đầu thời kỳ tự chủ của người Việt.",
    tieuSu: [
      "Khúc Thừa Dụ xuất thân từ một hào tộc lớn lâu đời ở Cúc Bồ, Hồng Châu. Sử sách không ghi năm sinh của ông. Tương truyền ông tính khoan hòa, thương người nên được nhân dân suy tôn làm thủ lĩnh trong thời loạn.",
      "Năm 905, nhân lúc nhà Đường suy yếu, ông lãnh đạo nhân dân nổi dậy, đánh chiếm phủ thành Tống Bình (Đại La). Năm 906, ông tự xưng Tiết độ sứ; nhà Đường buộc phải công nhận chính quyền tự chủ của người Việt. Ông mất năm 907, con là Khúc Hạo nối nghiệp.",
    ],
    boiCanh: [
      "Cuối thế kỷ IX, nhà Đường suy yếu và hỗn loạn. Bằng cách giữ danh xưng Tiết độ sứ của phương Bắc thay vì xưng vương, xưng đế, họ Khúc tránh được sự trả đũa trong khi thực chất tự quyết việc cai trị.",
    ],
    congTrang: [
      "Năm 905 lãnh đạo nhân dân nổi dậy, chiếm thành Tống Bình, đuổi chính quyền đô hộ nhà Đường.",
      "Tự xưng Tiết độ sứ năm 906, buộc nhà Đường công nhận chính quyền tự chủ.",
      "Đặt cơ sở cho nền độc lập mà không phải đổ nhiều xương máu.",
    ],
    suKien: [
      {
        nam: "905",
        text: "Nổi dậy, chiếm phủ thành Tống Bình (Đại La).",
      },
      {
        nam: "906",
        text: "Tự xưng Tiết độ sứ; nhà Đường phải công nhận.",
      },
      {
        nam: "907",
        text: "Mất ngày 23 tháng 7 năm Đinh Mão; con là Khúc Hạo nối nghiệp.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Khúc Thừa Dụ (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Kiến Quốc, huyện Ninh Giang, Hải Dương",
      },
    ],
    tuongNiem: ["Lễ giỗ ngày 23 tháng 7 âm lịch tại đền thờ Khúc Thừa Dụ ở quê nhà."],
    ghiChuSuLieu:
      "Việt giám thông khảo tổng luận và Khâm định Việt sử thông giám cương mục cho rằng dù mang danh xưng quan lại Trung Hoa, chính quyền do Khúc Thừa Dụ lập ra thực chất mang dáng dấp một vương triều độc lập. Năm sinh của ông không được ghi lại.",
    wikiTitle: "Khúc Thừa Dụ",
    nguon: [
      "Khâm định Việt sử thông giám cương mục.",
      "Ban quản lý di tích, “Lý lịch di tích đền thờ Khúc Thừa Dụ”.",
      "Báo Mới, “Tưởng niệm 1.117 năm ngày mất anh hùng dân tộc Khúc Thừa Dụ”.",
    ],
  },
  {
    slug: "khuc-hao",
    ten: "Khúc Hạo",
    tenThat: null,
    tenKhac: ["Khúc Trung Chúa"],
    namSinh: null,
    namMat: "917",
    nienDai: "? – 917",
    queQuan: "Xứ Cúc Bồ, Hồng Châu; nay thuộc xã Kiến Quốc, huyện Ninh Giang, Hải Dương",
    thoiKy: "the-ky-x",
    trieuDai: "Thời tự chủ",
    namMoc: 907,
    tomTat: "Con Khúc Thừa Dụ, kế vị Tiết độ sứ năm 907, cải cách hành chính và thuế khóa, củng cố nền tự chủ.",
    tieuSu: [
      "Khúc Hạo là con Khúc Thừa Dụ, quê ở Cúc Bồ, Hồng Châu. Năm 907, ông kế vị chức Tiết độ sứ và đảm đương việc nước trong khoảng mười năm, đến khi mất năm 917.",
      "Ông chia đất nước thành các cấp lộ, phủ, châu, giáp, xã; bãi bỏ các thứ lao dịch nặng nề thời Đường, lập lại sổ hộ khẩu và sửa đổi chế độ điền tô. Phương châm trị nước của ông được sử chép là “chính sự cốt chuộng khoan dung giản dị, nhân dân đều được yên vui”.",
    ],
    boiCanh: [
      "Trong khi phương Bắc rơi vào loạn Ngũ Đại Thập Quốc, họ Khúc tranh thủ xây dựng bộ máy cai trị riêng, biến Giao Châu từ vùng bị đô hộ thành một thực thể có tổ chức nhà nước.",
    ],
    congTrang: [
      "Kế vị Tiết độ sứ năm 907, tiếp tục giữ vững nền tự chủ.",
      "Cải cách hành chính, chia đất nước thành các cấp lộ, phủ, châu, giáp, xã.",
      "Bãi bỏ lao dịch thời Đường, lập lại sổ hộ khẩu, sửa đổi chế độ điền tô thuế khóa.",
    ],
    suKien: [
      {
        nam: "907",
        text: "Kế vị Khúc Thừa Dụ làm Tiết độ sứ.",
      },
      {
        nam: "907 – 917",
        text: "Tiến hành cải cách hành chính, hộ khẩu và thuế khóa.",
      },
      {
        nam: "917",
        text: "Mất; được tưởng nhớ cùng dòng họ Khúc tại đền thờ Khúc Thừa Dụ.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Khúc Thừa Dụ (phối thờ Khúc Hạo)",
        diaDiem: "Xã Kiến Quốc, huyện Ninh Giang, Hải Dương",
      },
    ],
    tuongNiem: ["Được tưởng nhớ cùng dòng họ Khúc trong lễ hội đền Khúc Thừa Dụ ngày 23 tháng 7 âm lịch."],
    ghiChuSuLieu:
      "Năm sinh của Khúc Hạo không được ghi lại. Giới nghiên cứu hiện nay thường đánh giá ông là nhà cải cách đầu tiên của thời quân chủ Việt Nam; sử sách về ông không có yếu tố truyền thuyết.",
    wikiTitle: "Khúc Hạo",
    nguon: [
      "Người Kể Sử, “Khúc Thừa Dụ”.",
      "Ban quản lý di tích, “Lý lịch di tích đền thờ Khúc Thừa Dụ”.",
    ],
  },
  {
    slug: "duong-dinh-nghe",
    ten: "Dương Đình Nghệ",
    tenThat: null,
    tenKhac: ["Dương Diên Nghệ"],
    namSinh: "874",
    namMat: "937",
    nienDai: "874 – 937",
    queQuan: "Làng Giàng, Ái Châu; nay thuộc phường Thiệu Dương, thành phố Thanh Hóa",
    thoiKy: "the-ky-x",
    trieuDai: "Thời tự chủ",
    namMoc: 931,
    tomTat: "Hào trưởng Ái Châu đánh đuổi quân Nam Hán khỏi thành Đại La năm 931, tự xưng Tiết độ sứ, nối tiếp nền tự chủ của họ Khúc.",
    tieuSu: [
      "Dương Đình Nghệ sinh ngày 22 tháng 11 năm 874 ở làng Giàng, Ái Châu, là một hào trưởng có thế lực. Khi nhà Nam Hán đánh bại Khúc Thừa Mỹ và chiếm Đại La, ông xây dựng lực lượng ở Ái Châu, nuôi 3.000 “giả tử” (con nuôi), trong đó có Ngô Quyền.",
      "Năm 931, ông đem quân từ Ái Châu ra Bắc, vây thành Đại La, đuổi Thứ sử Nam Hán là Lý Tiến, rồi đánh bại viện binh Nam Hán, chém tướng Trần Bảo. Ông tự xưng Tiết độ sứ, cai quản đất nước sáu năm.",
      "Tháng 3 năm 937, ông bị nha tướng Kiều Công Tiễn ám sát để đoạt quyền.",
    ],
    boiCanh: [
      "Sau họ Khúc, nhà Nam Hán ở phương Bắc tìm cách đặt lại ách đô hộ. Cuộc khởi binh của Dương Đình Nghệ khôi phục quyền tự chủ và chuẩn bị lực lượng cho chiến thắng Bạch Đằng của Ngô Quyền năm 938.",
    ],
    congTrang: [
      "Năm 931 đánh chiếm thành Đại La, đuổi Thứ sử Nam Hán Lý Tiến.",
      "Đánh bại viện binh Nam Hán, chém tướng Trần Bảo.",
      "Tự xưng Tiết độ sứ, khôi phục quyền tự chủ; nuôi dưỡng lớp tướng lĩnh như Ngô Quyền.",
    ],
    suKien: [
      {
        nam: "874",
        text: "Sinh ngày 22 tháng 11 ở làng Giàng, Ái Châu.",
      },
      {
        nam: "931",
        text: "Đánh chiếm Đại La, đánh bại viện binh Nam Hán, tự xưng Tiết độ sứ.",
      },
      {
        nam: "937",
        text: "Tháng 3, bị Kiều Công Tiễn ám sát.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Dương Đình Nghệ (di tích lịch sử cấp tỉnh)",
        diaDiem: "Làng Giàng, phường Thiệu Dương, thành phố Thanh Hóa",
      },
    ],
    tuongNiem: ["Không có ngày giỗ quốc gia được ấn định; lễ hội tưởng nhớ ông thường tổ chức vào tháng 3 âm lịch tại quê hương Thanh Hóa."],
    ghiChuSuLieu:
      "Một số thư tịch chép tên ông là Dương Diên Nghệ. Tương truyền đội quân 3.000 giả tử trung thành tuyệt đối với chủ tướng. Giới nghiên cứu cho rằng vụ ám sát của Kiều Công Tiễn còn phản ánh xung đột giữa các thế lực hào trưởng châu Phong và châu Ái.",
    wikiTitle: "Dương Đình Nghệ",
    nguon: [
      "Đại Việt sử ký toàn thư; Ngô Thì Sĩ, Việt sử tiêu án.",
      "Bảo tàng Lịch sử Quốc gia, “Võ tướng Dương Đình Nghệ – người khởi binh đánh đuổi quân Nam Hán”.",
      "Báo Dân Việt, “Dương Đình Nghệ, thủ lĩnh tài năng và cái chết oan nghiệt”.",
    ],
  },
  {
    slug: "duong-van-nga",
    ten: "Dương Vân Nga",
    tenThat: null,
    tenKhac: ["Đại Thắng Minh Hoàng hậu", "Thái hậu Dương Vân Nga"],
    namSinh: "khoảng 952",
    namMat: "1000",
    nienDai: "khoảng 952 – 1000",
    queQuan: "Chưa thống nhất: dã sử liên hệ với vùng Nho Quan, Ninh Bình; có giả thuyết cho là dòng họ Dương ở Ái Châu (Thanh Hóa)",
    thoiKy: "the-ky-x",
    trieuDai: "Nhà Đinh",
    namMoc: 980,
    tomTat: "Hoàng hậu nhà Đinh, năm 980 trao áo long cổn cho Lê Hoàn trước nguy cơ quân Tống xâm lược, tạo tiền đề cho chiến thắng năm 981.",
    tieuSu: [
      "Chính sử chỉ chép tước hiệu của bà là Đại Thắng Minh Hoàng hậu, sau là Hoàng thái hậu; tên Dương Vân Nga do dân gian và dã sử lưu truyền. Bà là hoàng hậu của Đinh Tiên Hoàng.",
      "Năm 979, Đinh Tiên Hoàng và Đinh Liễn bị ám sát; bà nhiếp chính, phò Đinh Toàn mới 6 tuổi lên ngôi giữa lúc triều đình rối ren. Khi quân Tống chuẩn bị sang xâm lược, năm 980 bà trao áo long cổn, nhường ngôi cho Thập đạo tướng quân Lê Hoàn, quy tụ sức mạnh cho cuộc kháng chiến chống Tống năm 981.",
      "Bà sau đó là hoàng hậu của Lê Đại Hành và mất năm 1000.",
    ],
    boiCanh: [
      "Cái chết đột ngột của Đinh Tiên Hoàng năm 979 để lại một ấu chúa và một triều đình chia rẽ, trong khi nhà Tống ở phương Bắc lăm le xâm lược Đại Cồ Việt.",
    ],
    congTrang: [
      "Nhiếp chính sau biến cố năm 979, giữ ổn định triều đình nhà Đinh.",
      "Năm 980 trao ngôi cho Lê Hoàn, dập tắt mưu đồ chia rẽ nội bộ trước nguy cơ ngoại xâm.",
      "Tạo tiền đề cho chiến thắng chống Tống năm 981.",
    ],
    suKien: [
      {
        nam: "979",
        text: "Đinh Tiên Hoàng và Đinh Liễn bị ám sát; bà nhiếp chính, phò Đinh Toàn lên ngôi.",
      },
      {
        nam: "980",
        text: "Trao áo long cổn, nhường ngôi cho Lê Hoàn.",
      },
      {
        nam: "981",
        text: "Đại Cồ Việt đánh thắng quân Tống xâm lược.",
      },
      {
        nam: "1000",
        text: "Bà mất.",
      },
    ],
    diTich: [
      {
        ten: "Đền Vua Lê Đại Hành (phối thờ Dương Vân Nga), khu di tích quốc gia đặc biệt Cố đô Hoa Lư",
        diaDiem: "Xã Trường Yên, huyện Hoa Lư, Ninh Bình",
      },
    ],
    tuongNiem: ["Được tôn vinh trong Lễ hội Hoa Lư (di sản văn hóa phi vật thể quốc gia) từ ngày 8 đến 10 tháng 3 âm lịch."],
    ghiChuSuLieu:
      "Tên thật của bà chưa thống nhất: có nguồn gọi là Lê Khiết Nương hoặc Dương Ngọc Vân; năm sinh 952 chỉ là ước tính. Ngô Sĩ Liên trong Đại Việt sử ký toàn thư chỉ trích việc Lê Hoàn lấy bà là trái đạo quân thần, còn giới sử học đương đại đề cao đức hy sinh của bà. Tương truyền tượng thờ bà được sơn mặt hồng; các chuyện về nhan sắc và hoa quỳnh Cúc Phương thuộc truyền thuyết.",
    wikiTitle: "Dương Vân Nga",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Người Kể Sử, “Dương Vân Nga”.",
      "Câu chuyện lịch sử, “Dương Vân Nga và mối tình hai triều đại Đinh – Lê”.",
    ],
  },
  {
    slug: "dinh-lien",
    ten: "Đinh Liễn",
    tenThat: null,
    tenKhac: ["Đinh Khuông Liễn", "Nam Việt Vương"],
    namSinh: null,
    namMat: "979",
    nienDai: "? – 979",
    queQuan: "Động Hoa Lư, châu Đại Hoàng; nay thuộc huyện Gia Viễn, Ninh Bình",
    thoiKy: "the-ky-x",
    trieuDai: "Nhà Đinh",
    namMoc: 973,
    tomTat: "Con trưởng Đinh Tiên Hoàng, cùng cha dẹp 12 sứ quân, đi sứ nhà Tống năm 973 và cho dựng các cột kinh Phật bằng đá ở Hoa Lư.",
    tieuSu: [
      "Đinh Liễn là con trưởng của Đinh Bộ Lĩnh, được phong Nam Việt Vương. Ông theo cha nhiều năm trong cuộc dẹp loạn 12 sứ quân, góp phần thống nhất đất nước.",
      "Năm 973, ông đi sứ nhà Tống, lập quan hệ bang giao và được vua Tống phong Tĩnh Hải quân Tiết độ sứ, Đặc tiến Kiểm hiệu Thái sư. Ông cho dựng 100 cột kinh Phật bằng đá ở Hoa Lư, khắc kinh Phật đỉnh Tôn thắng Đà la ni.",
      "Tháng 11 năm 979, ông cùng vua cha Đinh Tiên Hoàng bị Đỗ Thích ám sát.",
    ],
    boiCanh: [
      "Sau khi dẹp xong 12 sứ quân, nhà Đinh lập nước Đại Cồ Việt và cần giữ quan hệ hòa hiếu với nhà Tống để bảo vệ nền độc lập non trẻ.",
    ],
    congTrang: [
      "Đi sứ nhà Tống năm 973, thiết lập quan hệ bang giao, được nhà Tống sắc phong.",
      "Cùng Đinh Tiên Hoàng dẹp loạn 12 sứ quân, thống nhất đất nước.",
      "Cho dựng các cột kinh Phật bằng đá ở Hoa Lư, được xem là bộ bi ký sớm nhất thời tự chủ.",
    ],
    suKien: [
      {
        nam: "thế kỷ X",
        text: "Theo cha đánh dẹp 12 sứ quân.",
      },
      {
        nam: "973",
        text: "Đi sứ nhà Tống, được phong Tĩnh Hải quân Tiết độ sứ.",
      },
      {
        nam: "979",
        text: "Tháng 11, bị Đỗ Thích ám sát cùng Đinh Tiên Hoàng.",
      },
      {
        nam: "2024",
        text: "Sưu tập cột kinh Phật thời Đinh được công nhận là Bảo vật quốc gia.",
      },
    ],
    diTich: [
      {
        ten: "Đền Vua Đinh Tiên Hoàng (tượng Đinh Liễn đặt ở gian bên trái Bái đường)",
        diaDiem: "Xã Trường Yên, huyện Hoa Lư, Ninh Bình",
      },
    ],
    tuongNiem: ["Được tưởng nhớ trong Lễ hội Hoa Lư vào tháng 3 âm lịch hằng năm."],
    ghiChuSuLieu:
      "Năm sinh chưa được xác định. Tương truyền thuở nhỏ ông bị sứ quân họ Ngô bắt làm con tin; cũng tương truyền ông sai giết em là Hạng Lang khi Hạng Lang được lập làm Thái tử, rồi dựng cột kinh để sám hối. Giới nghiên cứu cho rằng việc dựng kinh tràng còn nhằm củng cố tính chính danh của ông.",
    wikiTitle: "Đinh Liễn",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Sở Văn hóa Ninh Bình, “Những giá trị nổi bật của Bảo vật quốc gia sưu tập cột kinh Phật thời Đinh”.",
      "Tư liệu Phật giáo, “Cột kinh Phật năm 973 phát hiện ở Hoa Lư”.",
    ],
  },
  {
    slug: "ly-thanh-tong",
    ten: "Lý Thánh Tông",
    tenThat: "Lý Nhật Tôn",
    tenKhac: [],
    namSinh: "1023",
    namMat: "1072",
    nienDai: "1023 – 1072",
    queQuan: "Hương Cổ Pháp (quê nhà Lý); nay thuộc phường Đình Bảng, thành phố Từ Sơn, Bắc Ninh",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Lý",
    namMoc: 1054,
    tomTat: "Vua thứ ba nhà Lý, đổi quốc hiệu thành Đại Việt năm 1054, lập Văn Miếu năm 1070 và đánh Chiêm Thành năm 1069.",
    tieuSu: [
      "Lý Thánh Tông tên thật là Lý Nhật Tôn, sinh ngày 30 tháng 3 năm 1023. Năm 1054 lên ngôi, ông đổi quốc hiệu từ Đại Cồ Việt thành Đại Việt.",
      "Năm 1069, ông thân chinh đánh Chiêm Thành, bắt vua Chế Củ; Chiêm Thành phải dâng ba châu Địa Lý, Ma Linh, Bố Chính. Năm 1070, ông cho dựng Văn Miếu ở Thăng Long thờ Khổng Tử và Chu Công. Ông sùng Phật giáo, cho đúc chuông Quy Điền, xây tháp Báo Thiên, và được xem là tổ thứ hai của Thiền phái Thảo Đường.",
      "Ông nổi tiếng nhân từ: sử chép ông ban chăn chiếu và hai bữa ăn mỗi ngày cho tù nhân trong những đợt rét đậm. Ông mất ngày 1 tháng 2 năm 1072.",
    ],
    boiCanh: [
      "Giữa thế kỷ XI, nhà Lý đã ổn định việc trị nước; phía bắc nhà Tống thường khiêu khích ở biên giới, phía nam Chiêm Thành nhiều lần quấy nhiễu.",
    ],
    congTrang: [
      "Đổi quốc hiệu thành Đại Việt năm 1054.",
      "Thân chinh đánh Chiêm Thành năm 1069, mở thêm ba châu Địa Lý, Ma Linh, Bố Chính.",
      "Cho dựng Văn Miếu ở Thăng Long năm 1070.",
      "Ban chăn chiếu và cơm ăn cho tù nhân trong mùa rét.",
    ],
    suKien: [
      {
        nam: "1023",
        text: "Sinh ngày 30 tháng 3.",
      },
      {
        nam: "1054",
        text: "Lên ngôi, đổi quốc hiệu thành Đại Việt.",
      },
      {
        nam: "1059",
        text: "Cho quân đánh Khâm Châu (đất Tống) để răn đe.",
      },
      {
        nam: "1069",
        text: "Đánh Chiêm Thành, bắt vua Chế Củ.",
      },
      {
        nam: "1070",
        text: "Dựng Văn Miếu ở Thăng Long.",
      },
    ],
    diTich: [
      {
        ten: "Đền Đô (Thái miếu nhà Lý), di tích quốc gia đặc biệt",
        diaDiem: "Phường Đình Bảng, thành phố Từ Sơn, Bắc Ninh",
      },
    ],
    tuongNiem: ["Lễ hội Đền Đô (di sản văn hóa phi vật thể quốc gia) từ ngày 14 đến 16 tháng 3 âm lịch."],
    ghiChuSuLieu:
      "Tương truyền ông nói lời thương xót tù nhân khi trời rét, và gặp Ỷ Lan khi bà đứng tựa gốc cây lan lúc vua đi cầu tự. Việc đánh Khâm Châu năm 1059 được các sử gia xem là bước chuyển từ phòng thủ sang răn đe.",
    wikiTitle: "Lý Thánh Tông",
    nguon: [
      "Đại Việt sử ký toàn thư; Khâm định Việt sử thông giám cương mục.",
      "Người Kể Sử, “Lý Thánh Tông”.",
      "Tạp chí Nghiên cứu Phật học, “Vua Lý Thánh Tông: anh hùng cứu nước, nhân từ, thương dân”.",
    ],
  },
  {
    slug: "y-lan",
    ten: "Ỷ Lan",
    tenThat: "Lê Thị Yến",
    tenKhac: ["Nguyên phi Ỷ Lan", "Linh Nhân Hoàng thái hậu"],
    namSinh: "1044",
    namMat: "1117",
    nienDai: "1044 – 1117",
    queQuan: "Hương Thổ Lỗi (làng Sủi), sau đổi là Siêu Loại; nay thuộc xã Dương Xá, huyện Gia Lâm, Hà Nội",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Lý",
    namMoc: 1069,
    tomTat: "Nguyên phi của Lý Thánh Tông, hai lần nhiếp chính, lo hậu phương cho cuộc kháng chiến chống Tống và ban nhiều chính sách thương dân.",
    tieuSu: [
      "Ỷ Lan tên thật là Lê Thị Yến (dã sử chép là Lê Thị Khiết), sinh ngày 7 tháng 4 năm 1044, xuất thân là cô gái hái dâu ở hương Thổ Lỗi. Bà được Lý Thánh Tông đưa vào cung, phong Ỷ Lan phu nhân, sau là Nguyên phi.",
      "Năm 1069, khi vua thân chinh đánh Chiêm Thành, bà ở lại Thăng Long lo việc nội trị, giữ yên lòng dân. Từ năm 1072, khi Lý Nhân Tông còn nhỏ, bà nhiếp chính lần thứ hai, lo quân lương giúp Lý Thường Kiệt đánh quân Tống.",
      "Bà ban luật trị tội trộm cắp trâu bò, xuất tiền kho để chuộc người và gả cho những người đàn ông góa vợ, nghèo khó không có tiền cưới. Là Phật tử, bà cho xây nhiều chùa tháp và để lại bài kệ Sắc không. Bà mất ngày 25 tháng 7 năm 1117.",
    ],
    boiCanh: [
      "Nửa sau thế kỷ XI, Đại Việt phải lo cả mặt trận phía nam với Chiêm Thành lẫn cuộc kháng chiến chống Tống (1075 – 1077) khi vua còn nhỏ tuổi.",
    ],
    congTrang: [
      "Lo việc nội trị năm 1069 khi Lý Thánh Tông đánh Chiêm Thành.",
      "Nhiếp chính từ năm 1072, lo hậu phương và quân lương cho cuộc kháng chiến chống Tống.",
      "Ban luật bảo vệ trâu bò, chuộc người nghèo khổ, dựng nhiều chùa tháp.",
    ],
    suKien: [
      {
        nam: "1044",
        text: "Sinh ngày 7 tháng 4 ở hương Thổ Lỗi.",
      },
      {
        nam: "1069",
        text: "Lo việc nội trị khi vua thân chinh đánh Chiêm Thành.",
      },
      {
        nam: "1072",
        text: "Lý Nhân Tông lên ngôi; bà nhiếp chính lần thứ hai.",
      },
      {
        nam: "1117",
        text: "Mất ngày 25 tháng 7.",
      },
    ],
    diTich: [
      {
        ten: "Đền Nguyên phi Ỷ Lan (đền Bà Tấm), di tích quốc gia đặc biệt",
        diaDiem: "Xã Dương Xá, huyện Gia Lâm, Hà Nội",
      },
    ],
    tuongNiem: [
      "Lễ hội đền Bà Tấm (di sản văn hóa phi vật thể quốc gia) từ ngày 19 đến 21 tháng 2 âm lịch.",
      "Lễ giỗ ngày 25 tháng 7 âm lịch.",
    ],
    ghiChuSuLieu:
      "Đại Việt sử ký toàn thư chép việc bà bức tử Thượng Dương Hoàng hậu và các cung nữ; các sử thần Nho giáo phê phán gay gắt việc này. Tương truyền về cuối đời bà xây nhiều chùa để sám hối; chuyện bà đứng tựa gốc lan khi gặp vua và chuyện thái giám Nguyễn Bông thuộc truyền thuyết.",
    wikiTitle: "Ỷ Lan",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Bảo tàng Lịch sử Quốc gia, “Nguyên phi Ỷ Lan: từ chính sử đến thần tích, cổ tích”.",
      "Báo Quân đội nhân dân, “Nguyên phi Ỷ Lan, người phụ nữ có tài kinh bang tế thế”.",
    ],
  },
  {
    slug: "ly-nhan-tong",
    ten: "Lý Nhân Tông",
    tenThat: "Lý Càn Đức",
    tenKhac: [],
    namSinh: "1066",
    namMat: "1128",
    nienDai: "1066 – 1128",
    queQuan: "Dòng dõi hương Cổ Pháp (Bắc Ninh), sinh ở kinh thành Thăng Long",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Lý",
    namMoc: 1075,
    tomTat: "Vua trị vì lâu nhất lịch sử Việt Nam (56 năm), thời kỳ đánh thắng quân Tống, mở khoa thi đầu tiên và lập Quốc Tử Giám.",
    tieuSu: [
      "Lý Nhân Tông tên thật là Lý Càn Đức, sinh ngày 22 tháng 2 năm 1066 ở kinh thành Thăng Long, con của Lý Thánh Tông và Ỷ Lan. Ông lên ngôi năm 1072 khi còn nhỏ, có Thái hậu Ỷ Lan nhiếp chính và Thái úy Lý Thường Kiệt phò tá.",
      "Dưới triều ông, Đại Việt đánh thắng cuộc xâm lược của nhà Tống (1075 – 1077) trên phòng tuyến sông Như Nguyệt. Năm 1075, triều đình mở khoa thi Nho học đầu tiên (khoa Minh kinh bác học); năm 1076 lập Quốc Tử Giám.",
      "Ông hai lần xuống chiếu cấm giết mổ trâu bò bừa bãi để bảo vệ sức kéo nông nghiệp. Ông mất ngày 15 tháng 1 năm 1128, sau 56 năm trị vì.",
    ],
    boiCanh: [
      "Cuối thế kỷ XI, nhà Tống chuẩn bị xâm lược Đại Việt. Triều Lý chủ động đánh phủ đầu sang đất Tống rồi lập phòng tuyến Như Nguyệt, đồng thời đẩy mạnh giáo dục và pháp luật trong nước.",
    ],
    congTrang: [
      "Lãnh đạo triều đình trong cuộc kháng chiến chống Tống (1075 – 1077).",
      "Mở khoa thi Nho học đầu tiên năm 1075 và lập Quốc Tử Giám năm 1076.",
      "Ban chiếu cấm giết mổ trâu bò, bảo vệ sản xuất nông nghiệp.",
    ],
    suKien: [
      {
        nam: "1066",
        text: "Sinh ngày 22 tháng 2 ở Thăng Long.",
      },
      {
        nam: "1072",
        text: "Lên ngôi.",
      },
      {
        nam: "1075",
        text: "Mở khoa thi Minh kinh bác học, khoa thi Nho học đầu tiên.",
      },
      {
        nam: "1076",
        text: "Lập Quốc Tử Giám.",
      },
      {
        nam: "1077",
        text: "Quân Tống thất bại trên phòng tuyến sông Như Nguyệt.",
      },
      {
        nam: "1128",
        text: "Mất ngày 15 tháng 1, sau 56 năm trị vì.",
      },
    ],
    diTich: [
      {
        ten: "Đền Đô (Thái miếu nhà Lý), di tích quốc gia đặc biệt",
        diaDiem: "Phường Đình Bảng, thành phố Từ Sơn, Bắc Ninh",
      },
    ],
    tuongNiem: ["Được tưởng nhớ cùng các vua nhà Lý trong Lễ hội Đền Đô vào giữa tháng 3 âm lịch."],
    ghiChuSuLieu:
      "Tương truyền bài thơ Nam quốc sơn hà được đọc vang lên từ đền thờ Trương Hống, Trương Hát trong trận Như Nguyệt. Vụ bức tử Thượng Dương Hoàng hậu và các cung nữ xảy ra khi ông mới 7 tuổi, do Ỷ Lan chủ mưu; sử gia Nho giáo về sau vẫn đặt câu hỏi về trách nhiệm của nhà vua.",
    wikiTitle: "Lý Nhân Tông",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Bảo tàng Lịch sử Quốc gia, “Lý Nhân Tông – ông vua có nhiều kỷ lục”.",
      "Người Kể Sử, “Lý Nhân Tông”.",
    ],
  },
  {
    slug: "tong-dan",
    ten: "Tông Đản",
    tenThat: null,
    tenKhac: ["Tôn Đản"],
    namSinh: null,
    namMat: null,
    nienDai: "Thế kỷ XI",
    queQuan: "Vùng biên giới phía Bắc, nay tương ứng địa bàn Cao Bằng, Lạng Sơn",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Lý",
    namMoc: 1075,
    tomTat: "Danh tướng người Nùng thời Lý, chỉ huy cánh quân bộ đánh sang đất Tống năm 1075 – 1076, hạ thành Ung Châu.",
    tieuSu: [
      "Tông Đản là danh tướng người Nùng thời Lý, hậu thế thường gọi chệch là Tôn Đản. Năm sinh, năm mất của ông không được ghi chép đầy đủ.",
      "Trong kế hoạch “tiên phát chế nhân” (đánh phủ đầu) của Thái úy Lý Thường Kiệt năm 1075 – 1076, ông chỉ huy cánh quân bộ tiến từ Vĩnh Bình sang đất Tống. Cánh quân của ông vây thành Ung Châu hơn 40 ngày; trước sự chống trả của Tri châu Tô Giám, quân Đại Việt chất bao đất sát chân thành làm bậc leo lên. Thành bị hạ, kho lương bị đốt, Tô Giám tự thiêu.",
    ],
    boiCanh: [
      "Nhà Tống ráo riết lập căn cứ hậu cần ở các châu biên giới để chuẩn bị đánh Đại Việt. Cuộc tấn công phủ đầu phá hủy các căn cứ này, tạo lợi thế cho Đại Việt trong cuộc kháng chiến 1075 – 1077.",
    ],
    congTrang: [
      "Chỉ huy cánh quân bộ tiến sang đất Tống trong kế hoạch đánh phủ đầu của Lý Thường Kiệt.",
      "Vây và hạ thành Ung Châu sau hơn 40 ngày, đốt phá kho lương của quân Tống.",
      "Góp phần triệt khả năng hậu cần của quân Tống trước cuộc xâm lược Đại Việt.",
    ],
    suKien: [
      {
        nam: "1075",
        text: "Chỉ huy cánh quân bộ tiến từ Vĩnh Bình sang đất Tống.",
      },
      {
        nam: "1075 – 1076",
        text: "Vây thành Ung Châu hơn 40 ngày; thành bị hạ, Tri châu Tô Giám tự thiêu.",
      },
      {
        nam: "1077",
        text: "Đại Việt đánh thắng quân Tống xâm lược trên phòng tuyến sông Như Nguyệt.",
      },
    ],
    diTich: [],
    tuongNiem: ["Không có ngày giỗ, lễ hội hay đền thờ quy mô quốc gia; tên ông được đặt cho nhiều đường phố (phố Tôn Đản) ở các thành phố lớn."],
    ghiChuSuLieu:
      "Tên ông thường bị gọi chệch là Tôn Đản. Việc quân Đại Việt tàn sát nhiều quân lính và dân chúng khi hạ thành Ung Châu được giới sử học nhìn nhận là tàn khốc nhưng mang tính sống còn trong chiến tranh thời trung đại. Năm sinh, năm mất không rõ.",
    wikiTitle: "Tông Đản",
    nguon: [
      "Đại Việt sử ký toàn thư; Việt sử lược.",
      "Vietnamdefence, “Tông Đản (? – ?)”.",
      "Báo Dân Việt, “Danh tướng giúp Lý Thường Kiệt đánh 3 châu của nhà Tống là Tông Đản”.",
    ],
  },
  {
    slug: "to-hien-thanh",
    ten: "Tô Hiến Thành",
    tenThat: null,
    tenKhac: ["Thái úy Tô Hiến Thành"],
    namSinh: "1102",
    namMat: "1179",
    nienDai: "1102 – 1179",
    queQuan: "Làng Hạ Mỗ; nay thuộc xã Hạ Mỗ, huyện Đan Phượng, Hà Nội",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Lý",
    namMoc: 1141,
    tomTat: "Thái úy thời Lý Anh Tông và Lý Cao Tông, dẹp loạn, giữ yên biên giới và nổi tiếng trung thực, liêm chính.",
    tieuSu: [
      "Tô Hiến Thành sinh năm 1102 ở làng Hạ Mỗ. Năm 1141, ông dẹp cuộc nổi loạn lớn của Thân Lợi ở vùng Thái Nguyên. Ông chấn chỉnh quân đội, đi dẹp quân Ngưu Hống, tuần tra biên giới tây nam (1161) và đánh Chiêm Thành (1167); thời bình, ông cho khẩn hoang vùng ven biển.",
      "Ông giữ chức Thái úy, được phong tước Vương dù không mang họ Lý. Khi Lý Anh Tông mất, Chiêu Linh Thái hậu đút lót vàng bạc để ép ông phế ấu chúa Lý Cao Tông, lập Long Xưởng; ông cự tuyệt: “Làm việc bất nghĩa mà được giàu sang, kẻ trung thần nghĩa sĩ há chịu làm?”. Ông mất năm 1179.",
    ],
    boiCanh: [
      "Giữa thế kỷ XII, triều Lý bắt đầu có dấu hiệu suy yếu với các cuộc nổi loạn trong nước và tranh giành ngôi vua trong hoàng tộc.",
    ],
    congTrang: [
      "Dẹp cuộc nổi loạn của Thân Lợi năm 1141.",
      "Chấn chỉnh quân đội, tuần tra biên giới năm 1161 và đánh Chiêm Thành năm 1167.",
      "Giữ đúng di chiếu, bảo vệ ngôi vua của Lý Cao Tông trước sức ép của Chiêu Linh Thái hậu.",
    ],
    suKien: [
      {
        nam: "1102",
        text: "Sinh ở làng Hạ Mỗ.",
      },
      {
        nam: "1141",
        text: "Dẹp cuộc nổi loạn của Thân Lợi.",
      },
      {
        nam: "1161",
        text: "Tuần tra biên giới tây nam.",
      },
      {
        nam: "1167",
        text: "Đem quân đánh Chiêm Thành.",
      },
      {
        nam: "1179",
        text: "Mất; trước khi mất tiến cử Trần Trung Tá thay mình.",
      },
    ],
    diTich: [
      {
        ten: "Đền Văn Hiến (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Hạ Mỗ, huyện Đan Phượng, Hà Nội",
      },
    ],
    tuongNiem: ["Lễ giỗ ngày 12 tháng 6 âm lịch trong Lễ hội đền Văn Hiến (Đan Phượng, Hà Nội)."],
    ghiChuSuLieu:
      "Tương truyền khi ông ốm nặng, Đỗ Thái hậu hỏi người thay thế, ông tiến cử Trần Trung Tá thay vì Vũ Tán Đường, người hầu hạ ông: “hỏi người hầu dưỡng thì phi Tán Đường còn ai nữa, còn hỏi người trị nước thì phải là Trung Tá”. Có giả thuyết cho rằng ông thăng tiến nhờ quan hệ họ hàng với Tô Thị (vợ Đỗ Anh Vũ), nhưng Đại Việt sử ký toàn thư ghi nhận năng lực và sự liêm chính của ông.",
    wikiTitle: "Tô Hiến Thành",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Tạp chí Người Hà Nội, “Tô Hiến Thành – nhà chính trị tài năng”.",
      "Báo Đại Đoàn Kết, “Tô Hiến Thành: liêm chính công tâm”.",
    ],
  },
  {
    slug: "tran-thu-do",
    ten: "Trần Thủ Độ",
    tenThat: null,
    tenKhac: ["Quốc thượng phụ", "Thái sư Trung Vũ Đại vương"],
    namSinh: "1194",
    namMat: "1264",
    nienDai: "1194 – 1264",
    queQuan: "Làng Lưu Xá, phủ Ngự Thiên; nay thuộc huyện Hưng Hà, Thái Bình",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1225,
    tomTat: "Người sắp đặt cuộc chuyển giao ngôi vua từ nhà Lý sang nhà Trần năm 1225, Thái sư nắm quyền điều hành và giữ vững ý chí kháng chiến chống Mông Cổ năm 1258.",
    tieuSu: [
      "Trần Thủ Độ sinh năm 1194 ở làng Lưu Xá. Năm 1225, ông sắp đặt cuộc chuyển giao ngôi vua từ Lý Chiêu Hoàng sang Trần Cảnh (Trần Thái Tông), mở ra nhà Trần. Ông nắm quyền điều hành, dẹp các thế lực cát cứ, thanh trừng những mối đe dọa với ngôi vua non trẻ và xây dựng nền tảng quân sự, pháp luật.",
      "Năm 1258, khi quân Mông Cổ áp sát Thăng Long, vua Trần Thái Tông hỏi ý ông; ông trả lời: “Đầu thần chưa rơi xuống đất, xin bệ hạ chớ có lo”. Ông được tôn là Quốc thượng phụ, mất năm 1264, được truy tặng Thượng phụ Thống quốc Thái sư Trung Vũ Đại vương.",
    ],
    boiCanh: [
      "Cuối triều Lý, triều chính suy yếu, các thế lực cát cứ nổi lên. Việc họ Trần thay họ Lý và củng cố quyền lực trung ương giúp Đại Việt đủ sức chống cuộc xâm lược của Mông Cổ năm 1258.",
    ],
    congTrang: [
      "Sắp đặt cuộc chuyển giao ngôi vua từ nhà Lý sang nhà Trần năm 1225.",
      "Dẹp các thế lực cát cứ, xây dựng nền tảng quân sự và pháp luật cho triều Trần.",
      "Giữ vững ý chí kháng chiến trong cuộc chống Mông Cổ lần thứ nhất năm 1258.",
    ],
    suKien: [
      {
        nam: "1194",
        text: "Sinh ở làng Lưu Xá, phủ Ngự Thiên.",
      },
      {
        nam: "1225",
        text: "Sắp đặt việc Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh.",
      },
      {
        nam: "1258",
        text: "Kháng chiến chống Mông Cổ lần thứ nhất; nói câu “Đầu thần chưa rơi xuống đất”.",
      },
      {
        nam: "1264",
        text: "Mất.",
      },
    ],
    diTich: [
      {
        ten: "Khu lăng mộ và đền thờ Thái sư Trần Thủ Độ (di tích quốc gia)",
        diaDiem: "Xã Liên Hiệp, huyện Hưng Hà, Thái Bình",
      },
    ],
    tuongNiem: ["Lễ dâng hương tưởng nhớ ông ngày 7 tháng 7 âm lịch tại Thái Bình."],
    ghiChuSuLieu:
      "Trần Thủ Độ là nhân vật gây tranh cãi: các nhà Nho lên án việc bức tử Lý Huệ Tông, ép Trần Cảnh lấy chị dâu và thanh trừng tàn bạo, trong khi sử gia hiện đại xem ông là đại công thần. Tương truyền ông nói “nhổ cỏ thì phải nhổ cả rễ” khi gặp Lý Huệ Tông, và thưởng cho người lính dám bắt vợ ông xuống kiệu ở thềm cấm.",
    wikiTitle: "Trần Thủ Độ",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Vietnamdefence, “Trần Thủ Độ (1194 – 1264)”.",
      "Tạp chí Người Hà Nội, “Thái sư Trần Thủ Độ – nhà chính trị kiệt xuất, người kiến lập triều Trần”.",
    ],
  },
  {
    slug: "tran-thai-tong",
    ten: "Trần Thái Tông",
    tenThat: "Trần Cảnh",
    tenKhac: [],
    namSinh: "1218",
    namMat: "1277",
    nienDai: "1218 – 1277",
    queQuan: "Làng Tức Mặc, phủ Thiên Trường; nay thuộc phường Lộc Vượng, thành phố Nam Định",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1225,
    tomTat: "Vua đầu tiên nhà Trần, trực tiếp cầm quân đánh thắng quân Mông Cổ năm 1258, lập lệ Thái thượng hoàng và là tác giả Khóa hư lục.",
    tieuSu: [
      "Trần Thái Tông tên thật là Trần Cảnh, sinh ngày 16 tháng 6 năm Mậu Dần (1218). Năm 1225, ông lên ngôi sau khi Lý Chiêu Hoàng nhường ngôi, mở ra nhà Trần. Ông tổ chức lại bộ máy nhà nước, phát triển kinh tế điền trang thái ấp và mở lại các khoa thi Nho học.",
      "Năm 1258, ông trực tiếp cầm quân cùng các tướng đánh bại cuộc xâm lược của quân Mông Cổ lần thứ nhất, qua các trận Bình Lệ Nguyên và Đông Bộ Đầu. Ông lập lệ nhường ngôi sớm cho con để làm Thái thượng hoàng cùng điều hành việc nước.",
      "Ông là một thiền sư, tác giả Khóa hư lục, đặt nền tảng cho Phật giáo thời Trần. Ông mất ngày 1 tháng 4 năm Đinh Sửu (1277).",
    ],
    boiCanh: [
      "Nhà Trần ra đời trong lúc đế chế Mông Cổ bành trướng khắp lục địa Á – Âu. Cuộc xâm lược năm 1258 là thử thách đầu tiên của triều đại mới.",
    ],
    congTrang: [
      "Lập nhà Trần, tổ chức lại bộ máy nhà nước và mở lại khoa thi Nho học.",
      "Trực tiếp cầm quân đánh thắng quân Mông Cổ năm 1258.",
      "Lập lệ Thái thượng hoàng, giúp chuyển giao ngôi vua êm thấm.",
      "Tác giả Khóa hư lục, đặt nền tảng cho Thiền học thời Trần.",
    ],
    suKien: [
      {
        nam: "1218",
        text: "Sinh ngày 16 tháng 6 năm Mậu Dần.",
      },
      {
        nam: "1225",
        text: "Lên ngôi, mở ra nhà Trần.",
      },
      {
        nam: "1236",
        text: "Tương truyền bỏ lên núi Yên Tử xin đi tu, rồi được Trần Thủ Độ đón về.",
      },
      {
        nam: "1258",
        text: "Đánh thắng quân Mông Cổ ở Bình Lệ Nguyên, Đông Bộ Đầu.",
      },
      {
        nam: "1277",
        text: "Mất ngày 1 tháng 4 năm Đinh Sửu.",
      },
    ],
    diTich: [
      {
        ten: "Đền Thiên Trường (Đền Thượng), Khu di tích quốc gia đặc biệt Đền Trần",
        diaDiem: "Phường Lộc Vượng, thành phố Nam Định",
      },
    ],
    tuongNiem: [
      "Lễ Khai ấn đền Trần ngày 14 – 15 tháng Giêng âm lịch và Hội đền Trần từ ngày 15 đến 20 tháng 8 âm lịch (di sản văn hóa phi vật thể quốc gia).",
    ],
    ghiChuSuLieu:
      "Đại Việt sử ký toàn thư chép việc Trần Thủ Độ ép vua bỏ Lý Chiêu Hoàng để lấy chị dâu là Thuận Thiên; giới Nho học chỉ trích gay gắt, còn các nhà nghiên cứu hiện đại xem đó là bi kịch cá nhân của nhà vua. Chuyện vua lên Yên Tử và câu “xa giá ở đâu tức là triều đình ở đó” của Trần Thủ Độ được lưu truyền qua giai thoại.",
    wikiTitle: "Trần Thái Tông",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Đại học Văn Hiến, “Thiền sư – thi sĩ Trần Thái Tông (1218 – 1277)”.",
      "Ban quản lý di tích, “Từ phủ Thiên Trường xưa đến Nam Định ngày nay”.",
    ],
  },
  {
    slug: "tran-thanh-tong",
    ten: "Trần Thánh Tông",
    tenThat: "Trần Hoảng",
    tenKhac: ["Trần Uy Hoảng"],
    namSinh: "1240",
    namMat: "1290",
    nienDai: "1240 – 1290",
    queQuan: "Người Tức Mặc, phủ Thiên Trường (Nam Định); sinh và lớn lên ở kinh thành Thăng Long",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1258,
    tomTat: "Vua thứ hai nhà Trần, khuyến khích khai hoang, sau làm Thái thượng hoàng cùng Trần Nhân Tông lãnh đạo hai cuộc kháng chiến chống Nguyên Mông.",
    tieuSu: [
      "Trần Thánh Tông tên thật là Trần Hoảng, sinh ngày 12 tháng 10 năm 1240, con của Trần Thái Tông. Ông làm vua 20 năm và làm Thái thượng hoàng 12 năm.",
      "Ông khuyến khích vương hầu, quý tộc khai khẩn đất hoang, mở rộng điền trang thái ấp. Khi làm Thái thượng hoàng, ông cùng con là Trần Nhân Tông lãnh đạo hai cuộc kháng chiến chống Nguyên Mông năm 1285 và 1288, tổ chức Hội nghị Bình Than với vương hầu và Hội nghị Diên Hồng với các bô lão.",
      "Ông cũng là thiền sư, tác giả các sách Di hậu lục, Cơ cừu lục. Ông mất ngày 25 tháng 5 năm Canh Dần (3/7/1290).",
    ],
    boiCanh: [
      "Nửa sau thế kỷ XIII, nhà Nguyên liên tiếp đem quân xâm lược Đại Việt. Việc tập hợp vương hầu và dân chúng là yếu tố then chốt để nhà Trần chiến thắng.",
    ],
    congTrang: [
      "Khuyến khích khai hoang, mở rộng điền trang thái ấp, tạo tiềm lực cho đất nước.",
      "Cùng Trần Nhân Tông lãnh đạo hai cuộc kháng chiến chống Nguyên Mông (1285, 1288).",
      "Tổ chức Hội nghị Bình Than và Hội nghị Diên Hồng.",
    ],
    suKien: [
      {
        nam: "1240",
        text: "Sinh ngày 12 tháng 10.",
      },
      {
        nam: "1258",
        text: "Lên ngôi vua.",
      },
      {
        nam: "1285",
        text: "Cùng Trần Nhân Tông đánh thắng quân Nguyên Mông lần thứ hai.",
      },
      {
        nam: "1288",
        text: "Đánh thắng quân Nguyên Mông lần thứ ba.",
      },
      {
        nam: "1290",
        text: "Mất ngày 25 tháng 5 năm Canh Dần.",
      },
    ],
    diTich: [
      {
        ten: "Đền Thiên Trường, Khu di tích quốc gia đặc biệt Đền Trần",
        diaDiem: "Phường Lộc Vượng, thành phố Nam Định",
      },
    ],
    tuongNiem: ["Được tôn vinh trong Lễ Khai ấn đền Trần tháng Giêng và Hội đền Trần tháng 8 âm lịch."],
    ghiChuSuLieu:
      "Tương truyền sau kháng chiến, Thượng hoàng cho đốt tráp biểu xin hàng của các quan lại để giữ đoàn kết. Dựa vào Đại Việt sử ký toàn thư, các sử gia nhận định quyền quyết định chiến lược trong kháng chiến phần lớn thuộc về Thượng hoàng Trần Thánh Tông, dù Trần Nhân Tông là vua và trực tiếp chỉ huy.",
    wikiTitle: "Trần Thánh Tông",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Tạp chí Người Hà Nội, “Trần Thánh Tông – hoàng đế đánh giặc và tu thiền”.",
      "Thư viện Hoa Sen, “Trần Thánh Tông – một ngôi sao sáng của thiền học đời Trần”.",
    ],
  },
  {
    slug: "tran-quang-khai",
    ten: "Trần Quang Khải",
    tenThat: null,
    tenKhac: ["Chiêu Minh Đại vương", "Thượng tướng Thái sư"],
    namSinh: "1241",
    namMat: "1294",
    nienDai: "1241 – 1294",
    queQuan: "Người Tức Mặc, phủ Thiên Trường (Nam Định); lớn lên ở kinh thành Thăng Long",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1285,
    tomTat: "Thượng tướng Thái sư nhà Trần, chỉ huy trận Chương Dương năm 1285 giải phóng Thăng Long, tác giả bài thơ Tụng giá hoàn kinh sư.",
    tieuSu: [
      "Trần Quang Khải sinh tháng 10 năm Tân Sửu (1241), con của Trần Thái Tông, được phong Chiêu Minh Đại vương. Dưới triều Trần Nhân Tông, ông giữ chức Thượng tướng Thái sư, điều hành việc quân, việc nước.",
      "Trong kháng chiến chống Nguyên Mông năm 1285, ông chỉ huy trận tập kích ở bến Chương Dương, đánh tan thủy quân địch, giải phóng kinh thành Thăng Long. Ông để lại bài thơ Tụng giá hoàn kinh sư (“Đoạt sáo Chương Dương độ…”).",
      "Ông mất ngày mùng 3 tháng 7 năm Giáp Ngọ (1294).",
    ],
    boiCanh: [
      "Hai cuộc kháng chiến chống Nguyên Mông năm 1285 và 1288 huy động toàn bộ vương hầu nhà Trần; Trần Quang Khải phụ trách triều chính bên cạnh Tiết chế Trần Hưng Đạo.",
    ],
    congTrang: [
      "Giữ chức Thượng tướng Thái sư, điều hành việc quân quốc dưới triều Trần Nhân Tông.",
      "Chỉ huy trận Chương Dương năm 1285, góp phần giải phóng Thăng Long.",
      "Tham gia hai cuộc kháng chiến chống Nguyên Mông (1285, 1288).",
      "Tác giả bài thơ Tụng giá hoàn kinh sư.",
    ],
    suKien: [
      {
        nam: "1241",
        text: "Sinh tháng 10 năm Tân Sửu.",
      },
      {
        nam: "1285",
        text: "Chỉ huy trận Chương Dương, giải phóng Thăng Long.",
      },
      {
        nam: "1288",
        text: "Tham gia kháng chiến chống Nguyên Mông lần thứ ba.",
      },
      {
        nam: "1294",
        text: "Mất ngày mùng 3 tháng 7 năm Giáp Ngọ.",
      },
    ],
    diTich: [
      {
        ten: "Đền Cao Đài",
        diaDiem: "Xã Mỹ Thành, Nam Định",
      },
    ],
    tuongNiem: ["Lễ tưởng niệm Chiêu Minh Đại vương ngày 3 tháng 7 âm lịch tại đền Cao Đài (Nam Định)."],
    ghiChuSuLieu:
      "Tương truyền, do hiềm khích từ đời cha (Trần Thái Tông và Trần Liễu), quan hệ giữa Trần Quang Khải và Trần Hưng Đạo từng có rạn nứt; Trần Hưng Đạo đã tự tay tắm cho Trần Quang Khải để hàn gắn. Phần giai thoại này trong hồ sơ khảo cứu bị lỗi văn bản, chỉ giữ ý chính.",
    wikiTitle: "Trần Quang Khải",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Báo Đại Đoàn Kết, “Thượng tướng Thái sư Trần Quang Khải: danh tiếng muôn đời”.",
      "Hội đồng Lý luận Trung ương (scov.gov.vn), “Thái sư Trần Quang Khải”.",
    ],
  },
  {
    slug: "chu-van-an",
    ten: "Chu Văn An",
    tenThat: "Chu An",
    tenKhac: ["Tiều Ẩn", "Văn Trinh Công", "Vạn thế sư biểu"],
    namSinh: "1292",
    namMat: "1370",
    nienDai: "1292 – 1370",
    queQuan: "Làng Văn Thôn, xã Quang Liệt, huyện Thanh Đàm; nay thuộc xã Thanh Liệt, huyện Thanh Trì, Hà Nội",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1292,
    tomTat: "Nhà giáo thời Trần, Tư nghiệp Quốc Tử Giám, dâng Thất trảm sớ xin chém bảy nịnh thần rồi cáo quan về ở ẩn, được tôn là “Vạn thế sư biểu”.",
    tieuSu: [
      "Chu Văn An tên là Chu An, tên chữ Linh Triệt, hiệu Tiều Ẩn, sinh ngày 25 tháng 8 năm Nhâm Thìn (1292). Đỗ đạt nhưng không ra làm quan, ông mở trường dạy học ở làng Huỳnh Cung, đào tạo nhiều học trò nổi tiếng như Phạm Sư Mạnh, Lê Quát.",
      "Vua Trần Minh Tông mời ông làm Tư nghiệp Quốc Tử Giám, dạy Thái tử Trần Vượng. Dưới triều Trần Dụ Tông, thấy quyền thần lộng hành, ông dâng Thất trảm sớ xin chém bảy tên nịnh thần. Vua không nghe, ông treo mũ ở cửa Huyền Vũ, cáo quan về ở ẩn tại núi Phượng Hoàng (Chí Linh, Hải Dương).",
      "Ông mất ngày 26 tháng 11 năm Canh Tuất (1370), được ban thụy Văn Trinh Công và được thờ ở Văn Miếu – Quốc Tử Giám.",
    ],
    boiCanh: [
      "Giữa thế kỷ XIV, nhà Trần bắt đầu suy thoái, triều chính rối ren dưới thời Trần Dụ Tông, quyền thần lộng hành.",
    ],
    congTrang: [
      "Mở trường dạy học ở Huỳnh Cung, đào tạo nhiều nhân tài cho đất nước.",
      "Làm Tư nghiệp Quốc Tử Giám, dạy Thái tử.",
      "Dâng Thất trảm sớ, nêu tấm gương cương trực của kẻ sĩ.",
    ],
    suKien: [
      {
        nam: "1292",
        text: "Sinh ngày 25 tháng 8 năm Nhâm Thìn.",
      },
      {
        nam: "thời Trần Minh Tông",
        text: "Được mời làm Tư nghiệp Quốc Tử Giám, dạy Thái tử Trần Vượng.",
      },
      {
        nam: "thời Trần Dụ Tông",
        text: "Dâng Thất trảm sớ; không được chấp thuận, cáo quan về núi Phượng Hoàng.",
      },
      {
        nam: "1370",
        text: "Mất ngày 26 tháng 11 năm Canh Tuất.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Chu Văn An trên núi Phượng Hoàng (di tích quốc gia đặc biệt)",
        diaDiem: "Phường Văn An, thành phố Chí Linh, Hải Dương",
      },
      {
        ten: "Văn Miếu – Quốc Tử Giám (phối thờ)",
        diaDiem: "Quận Đống Đa, Hà Nội",
      },
      {
        ten: "Đình Thanh Liệt",
        diaDiem: "Xã Thanh Liệt, huyện Thanh Trì, Hà Nội",
      },
    ],
    tuongNiem: [
      "Lễ tưởng niệm ngày mất 26 tháng 11 âm lịch.",
      "Lễ hội Khai bút đầu xuân tại đền Chu Văn An (Chí Linh) từ mùng 1 đến mùng 9 tháng Giêng.",
    ],
    ghiChuSuLieu:
      "Đại Việt sử ký toàn thư không ghi tên bảy nịnh thần trong Thất trảm sớ. Chuyện học trò là Thủy thần làm mưa rồi bị trời phạt, tạo nên Đầm Mực, là truyền thuyết.",
    wikiTitle: "Chu Văn An",
    nguon: [
      "Đại Việt sử ký toàn thư.",
      "Báo VietNamNet, “Chu Văn An: thầy giáo có đức nghiệp mẫu mực của muôn đời”.",
      "HĐND tỉnh Hải Dương, “Ấn tượng lễ khai bút ở đền thờ Chu Văn An”.",
    ],
  },
  {
    slug: "tran-nhat-duat",
    ten: "Trần Nhật Duật",
    tenThat: null,
    tenKhac: ["Chiêu Văn vương", "Tá thánh Thái sư Chiêu Văn Đại vương"],
    namSinh: "1255",
    namMat: "1330",
    nienDai: "1255 – 1330",
    queQuan: "Người Tức Mặc, phủ Thiên Trường (nay phường Lộc Vượng, thành phố Nam Định); thái ấp ở chân núi Văn Trinh, xã Quảng Hợp, huyện Quảng Xương, Thanh Hóa",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1285,
    tomTat: "Hoàng thân nhà Trần, chỉ huy trận Hàm Tử năm 1285 đánh tan cánh quân Toa Đô, làm đại thần qua nhiều triều vua và được truy tặng Tá thánh Thái sư.",
    tieuSu: [
      "Trần Nhật Duật được phong Chiêu Văn vương từ thời trẻ. Theo Đại Việt sử ký toàn thư, ông sinh tháng 4 năm Ất Mão (1255). Năm 1280, ông một mình vào doanh trại thu phục thủ lĩnh Trịnh Giác Mật ở đạo Đà Giang mà không tổn hao xương máu, nhờ am hiểu phong tục và ngôn ngữ của đồng bào nơi đây.",
      "Tháng 5 năm 1285, ông làm chủ tướng trận thủy chiến Hàm Tử quan, đập tan cánh quân tinh nhuệ của Toa Đô, làm xoay chuyển cục diện cuộc kháng chiến chống Nguyên Mông lần thứ hai. Năm 1288, ông tiếp tục chặn các hướng tiến công ven biển và phong tỏa đường rút lui của địch.",
      "Từ năm 1302 đến 1330, trên cương vị Thái úy Quốc công rồi Tá thánh Thái sư, ông giữ ổn định triều đình qua các đời Trần Anh Tông, Trần Minh Tông và phụ chính đầu triều Trần Hiến Tông. Ông mất tháng 8 năm Canh Ngọ (1330).",
    ],
    boiCanh: [
      "Nhà Trần ở thời hưng thịnh phải ba lần đương đầu với quân Nguyên Mông; việc giữ yên các vùng biên viễn và miền núi có ý nghĩa sống còn với cuộc kháng chiến.",
    ],
    congTrang: [
      "Thu phục thủ lĩnh Trịnh Giác Mật ở đạo Đà Giang năm 1280 mà không phải dùng binh.",
      "Chỉ huy trận Hàm Tử năm 1285, đánh tan cánh quân Toa Đô.",
      "Chặn các hướng tiến công ven biển và phong tỏa đường rút của địch năm 1288.",
      "Khai hoang lập ấp vùng duyên hải Quảng Xương (Thanh Hóa); được coi là người bảo trợ lối Hát nhà trò (tiền thân ca trù).",
    ],
    suKien: [
      {
        nam: "1255",
        text: "Sinh tháng 4 năm Ất Mão (theo Đại Việt sử ký toàn thư).",
      },
      {
        nam: "1280",
        text: "Thu phục thủ lĩnh Trịnh Giác Mật ở đạo Đà Giang.",
      },
      {
        nam: "1285",
        text: "Chỉ huy trận Hàm Tử quan, đánh tan cánh quân Toa Đô.",
      },
      {
        nam: "1330",
        text: "Mất tháng 8 năm Canh Ngọ.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Tá thánh Thái sư Chiêu Văn Đại vương Trần Nhật Duật, chân núi Văn Trinh (di tích cấp tỉnh, 2004)",
        diaDiem: "Thôn Linh Hưng, xã Quảng Hợp, huyện Quảng Xương, Thanh Hóa",
      },
      {
        ten: "Đền Cửa Ông (phối thờ)",
        diaDiem: "Quảng Ninh",
      },
      {
        ten: "Đền Sơn Hải (phối thờ)",
        diaDiem: "Hà Nội",
      },
    ],
    tuongNiem: [
      "Lễ giỗ chính kỵ ngày mùng 8 tháng 8 âm lịch tại xã Quảng Hợp (Quảng Xương, Thanh Hóa).",
      "Lễ hội đền thờ Trần Nhật Duật vào dịp giỗ và đầu xuân (tháng Giêng), có diễn xướng Hát nhà trò Văn Trinh.",
    ],
    ghiChuSuLieu:
      "Năm sinh có hai ý kiến: chính sử ghi 1255, văn bia và truyền thống dòng họ ở Thanh Hóa ghi 1254 (Giáp Dần). Việc tôn ông là ông tổ Hát nhà trò xứ Thanh được xem là sự hòa quyện giữa nhạc cung đình và làn điệu bản địa hơn là sáng tạo riêng. Tương truyền, trên ngón tay ông khi sinh ra có đường chỉ hiện dấu chữ “Chiêu Văn hoàng tử”; dân gian Đà Giang kể ông ăn bốc, uống rượu bằng mũi để lấy lòng các tù trưởng.",
    wikiTitle: "Trần Nhật Duật",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 5, 6); Khâm định Việt sử thông giám cương mục (Chính biên quyển 7, 8).",
      "Cổng thông tin điện tử huyện Quảng Xương, tỉnh Thanh Hóa.",
      "Báo Thanh Hóa, chuyên trang Văn hóa – Đời sống.",
    ],
  },
  {
    slug: "tran-quoc-toan",
    ten: "Trần Quốc Toản",
    tenThat: null,
    tenKhac: ["Hoài Văn hầu", "Hoài Văn vương"],
    namSinh: "khoảng 1267",
    namMat: "1285",
    nienDai: "khoảng 1267 – 1285",
    queQuan: "Người Tức Mặc, phủ Thiên Trường (nay phường Lộc Vượng, thành phố Nam Định)",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1282,
    tomTat: "Thiếu niên hoàng tộc nhà Trần bóp nát quả cam khi không được dự bàn việc nước, tự chiêu mộ quân dưới lá cờ “Phá cường địch, báo hoàng ân” và hy sinh trong kháng chiến chống Nguyên Mông năm 1285.",
    tieuSu: [
      "Trần Quốc Toản được phong Hoài Văn hầu. Chính sử không ghi năm sinh; căn cứ việc ông “mới khoảng 15, 16 tuổi” khi diễn ra Hội nghị Bình Than (tháng 10 năm 1282), giới nghiên cứu cho là ông sinh khoảng năm 1267.",
      "Vì còn nhỏ tuổi, ông không được dự bàn việc quân ở Bình Than, ôm hận bóp nát quả cam trong tay. Trở về, ông tự bỏ gia sản chiêu mộ hơn một nghìn tráng đinh và gia nô, đóng chiến thuyền, rèn vũ khí, thêu lá cờ sáu chữ vàng “Phá cường địch, báo hoàng ân”.",
      "Năm 1285, đạo quân của ông chặn đánh quân Thoát Hoan ở vùng Lạng Sơn, rồi tham gia đánh tan cứ điểm Tây Kết, giải phóng Thăng Long. Tháng 6 năm 1285, khi truy kích tàn quân Nguyên, ông hy sinh giữa trận tiền; vua Trần Nhân Tông thương tiếc, truy phong Hoài Văn vương.",
    ],
    boiCanh: [
      "Năm 1282, trước nguy cơ quân Nguyên Mông xâm lược lần thứ hai, nhà Trần họp vương hầu ở Bình Than bàn kế đánh giữ.",
    ],
    congTrang: [
      "Tự chiêu mộ và trang bị hơn một nghìn quân, lập đạo quân cờ thêu sáu chữ vàng.",
      "Chặn đánh quân Thoát Hoan ở vùng Lạng Sơn năm 1285.",
      "Tham gia trận Tây Kết và giải phóng Thăng Long năm 1285.",
      "Hy sinh khi truy kích quân Nguyên, trở thành biểu tượng lòng yêu nước của tuổi trẻ.",
    ],
    suKien: [
      {
        nam: "1282",
        text: "Không được dự Hội nghị Bình Than, bóp nát quả cam; về chiêu mộ quân.",
      },
      {
        nam: "1285",
        text: "Chặn đánh quân Nguyên ở Lạng Sơn, tham gia trận Tây Kết và giải phóng Thăng Long.",
      },
      {
        nam: "1285",
        text: "Hy sinh khi truy kích quân Nguyên (khoảng tháng 5 – 6 âm lịch); được truy phong Hoài Văn vương.",
      },
    ],
    diTich: [
      {
        ten: "Đền Án Triều",
        diaDiem: "Xã Nam Triều, huyện Phú Xuyên, Hà Nội",
      },
      {
        ten: "Đền Cửa Ông (phối thờ, di tích quốc gia đặc biệt)",
        diaDiem: "Thành phố Cẩm Phả, Quảng Ninh",
      },
      {
        ten: "Đền Trần (phối thờ)",
        diaDiem: "Thành phố Nam Định, Nam Định",
      },
    ],
    tuongNiem: [
      "Ngày kỵ ngày 12 tháng 6 âm lịch, theo ghi nhận của các đền miếu và dòng họ Trần.",
      "Không có lễ hội riêng mang tên ông; ông được phụng tế trong các kỳ đại lễ của triều Trần.",
    ],
    ghiChuSuLieu:
      "Nơi và thời điểm hy sinh chưa thống nhất: Toàn thư chỉ chép vắn tắt việc ông tử trận và triều đình làm văn tế, còn An Nam chí lược của Lê Tắc chép Hoài Văn hầu bị quân Thoát Hoan vây giết ở bến sông Như Nguyệt. Chuyện bóp nát quả cam được lưu truyền như biểu tượng; chuyện ông liên kết với người Mán của Nguyễn Thế Lộc chỉ có trong truyện dã sử.",
    wikiTitle: "Trần Quốc Toản",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 5); Khâm định Việt sử thông giám cương mục (Chính biên quyển 7).",
      "Lê Tắc, An Nam chí lược.",
      "Cổng thông tin Di tích quốc gia đặc biệt Đền Cửa Ông.",
    ],
  },
  {
    slug: "tran-binh-trong",
    ten: "Trần Bình Trọng",
    tenThat: "Lê Bình Trọng",
    tenKhac: ["Bảo Nghĩa hầu", "Bảo Nghĩa vương"],
    namSinh: "1259",
    namMat: "1285",
    nienDai: "1259 – 1285",
    queQuan: "Xã Bảo Thái, huyện Thanh Liêm; nay thuộc xã Liêm Cần, huyện Thanh Liêm, Hà Nam",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1285,
    tomTat: "Danh tướng nhà Trần, chặn giặc ở bãi Đà Mạc năm 1285 để hai vua rút lui an toàn; bị bắt vẫn khẳng khái: “Ta thà làm ma nước Nam, chứ không thèm làm vương đất Bắc”.",
    tieuSu: [
      "Trần Bình Trọng vốn họ Lê, dòng dõi vua Lê Đại Hành; do cha có công phò tá nên được ban quốc tính họ Trần. Ông sinh năm Kỷ Mùi (1259), mang tước Bảo Nghĩa hầu, được giao thống lĩnh cấm quân Thánh Dực và được gả Công chúa Thụy Bảo, con gái vua Trần Thái Tông.",
      "Tháng 1 năm 1285, trước thế tiến công mạnh của quân Nguyên, ông chỉ huy một đạo quân chặn giặc ở bãi Đà Mạc (vùng sông Thiên Mạc) để hai vua và triều đình rút về Thanh Hóa. Trận chiến không cân sức kéo dài nhiều ngày, cầm chân đại quân Thoát Hoan, bảo toàn đầu não kháng chiến.",
      "Bị bắt, trước lời dụ phong vương, ông khẳng khái: “Ta thà làm ma nước Nam, chứ không thèm làm vương đất Bắc”, rồi hy sinh ngày 21 tháng Giêng năm Ất Dậu (1285). Vua Trần Nhân Tông truy phong ông Bảo Nghĩa vương.",
    ],
    boiCanh: [
      "Đầu năm 1285, quân Nguyên Mông do Thoát Hoan chỉ huy tràn xuống, triều Trần phải tạm rời kinh đô để bảo toàn lực lượng.",
    ],
    congTrang: [
      "Thống lĩnh cấm quân Thánh Dực.",
      "Chỉ huy trận đánh chặn ở bãi Đà Mạc, bảo vệ hai vua và triều đình rút lui an toàn.",
      "Nêu tấm gương trung dũng, không khuất phục trước kẻ thù.",
    ],
    suKien: [
      {
        nam: "1259",
        text: "Sinh năm Kỷ Mùi.",
      },
      {
        nam: "1285",
        text: "Chỉ huy trận đánh chặn quân Nguyên ở bãi Đà Mạc.",
      },
      {
        nam: "1285",
        text: "Hy sinh ngày 21 tháng Giêng năm Ất Dậu; được truy phong Bảo Nghĩa vương.",
      },
    ],
    diTich: [
      {
        ten: "Đền Lăng (di tích lịch sử cấp quốc gia, 1999)",
        diaDiem: "Thôn Bảo Thái, xã Liêm Cần, huyện Thanh Liêm, Hà Nam",
      },
      {
        ten: "Miếu thờ Bảo Nghĩa vương ở bãi Đà Mạc",
        diaDiem: "Huyện Khoái Châu, Hưng Yên",
      },
      {
        ten: "Đền Cửa Ông (phối thờ)",
        diaDiem: "Quảng Ninh",
      },
    ],
    tuongNiem: [
      "Ngày giỗ chính ngày 21 tháng Giêng âm lịch.",
      "Lễ hội đền Lăng (thờ vua Lê Đại Hành, phối tế Trần Bình Trọng) từ mùng 6 đến mùng 8 tháng 3 âm lịch tại huyện Thanh Liêm, Hà Nam.",
    ],
    ghiChuSuLieu:
      "Đại Việt sử ký toàn thư chép tổng thuật việc này vào tháng 2 âm lịch. Chính sử nhà Trần và Hậu Lê chỉ ghi ông là dòng dõi Lê Đại Hành; thuyết cha ông là Lê Phụ Trần và mẹ là Lý Chiêu Hoàng (theo văn bia Cổ Mai bi ký) chưa có chứng cứ vững chắc ngoài bia ký dòng họ đời Hậu Lê và Nguyễn. Tương truyền, khi ông bị hành quyết, mắt vẫn mở trừng nhìn về phương Bắc.",
    wikiTitle: "Trần Bình Trọng",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 5); Khâm định Việt sử thông giám cương mục (Chính biên quyển 7).",
      "Bảo tàng Lịch sử Quốc gia, thông tin danh nhân.",
      "Báo Dân Việt.",
    ],
  },
  {
    slug: "tran-khanh-du",
    ten: "Trần Khánh Dư",
    tenThat: null,
    tenKhac: ["Nhân Huệ vương", "Thượng vị hầu"],
    namSinh: "khoảng 1240",
    namMat: "1340",
    nienDai: "khoảng 1240 – 1340",
    queQuan: "Xã Chí Linh, huyện Nam Sách, phủ Tân Hưng; nay thuộc vùng thành phố Chí Linh và huyện Nam Sách, Hải Dương",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1288,
    tomTat: "Danh tướng nhà Trần, chỉ huy trận phục kích Vân Đồn cuối năm 1287 đầu năm 1288, đánh đắm đoàn thuyền lương của Trương Văn Hổ, bẻ gãy hậu cần quân Nguyên Mông.",
    tieuSu: [
      "Trần Khánh Dư được phong Nhân Huệ vương, giữ chức Phiêu kỵ Đại tướng quân, Phó Đô tướng. Ông phụng sự năm đời vua Trần, từ Trần Thánh Tông đến Trần Hiến Tông.",
      "Năm 1285, trên cương vị Phó Đô tướng, ông chỉ huy đánh lui các mũi tiến công của quân Nguyên ở phòng tuyến Lạng Sơn và vùng duyên hải. Cuối năm 1287 đầu năm 1288, ông tổ chức trận phục kích ở Vân Đồn, đánh đắm và thu toàn bộ đoàn thuyền chở 17 vạn thạch lương của Trương Văn Hổ. Tháng 4 năm 1288, ông chỉ huy cánh thủy quân phối hợp bắt sống tướng Ô Mã Nhi và Phàn Tiếp trên sông Bạch Đằng.",
      "Năm 1312, ông theo vua Trần Anh Tông đánh Chiêm Thành. Ông còn viết bài tựa cho binh thư Vạn Kiếp tông bí truyền thư của Hưng Đạo vương. Theo Đại Việt sử ký toàn thư, ông mất tháng 3 năm Canh Thìn (1340).",
    ],
    boiCanh: [
      "Trong cuộc kháng chiến chống Nguyên Mông lần thứ ba, quân Nguyên phụ thuộc lớn vào đoàn thuyền lương vượt biển; cắt đứt đường tiếp tế là then chốt để buộc địch rút lui.",
    ],
    congTrang: [
      "Đánh lui quân Nguyên ở phòng tuyến Lạng Sơn và vùng duyên hải năm 1285.",
      "Chỉ huy trận phục kích Vân Đồn, tiêu diệt đoàn thuyền lương của Trương Văn Hổ.",
      "Phối hợp bắt sống Ô Mã Nhi, Phàn Tiếp trên sông Bạch Đằng năm 1288.",
      "Theo vua Trần Anh Tông đánh Chiêm Thành năm 1312.",
      "Viết bài tựa cho Vạn Kiếp tông bí truyền thư.",
    ],
    suKien: [
      {
        nam: "1285",
        text: "Chỉ huy đánh lui quân Nguyên ở Lạng Sơn và vùng duyên hải.",
      },
      {
        nam: "1287 – 1288",
        text: "Phục kích ở Vân Đồn, đánh đắm đoàn thuyền lương của Trương Văn Hổ.",
      },
      {
        nam: "1288",
        text: "Phối hợp bắt sống Ô Mã Nhi và Phàn Tiếp trên sông Bạch Đằng.",
      },
      {
        nam: "1312",
        text: "Theo vua Trần Anh Tông đánh Chiêm Thành.",
      },
      {
        nam: "1340",
        text: "Mất tháng 3 năm Canh Thìn, dưới triều Trần Hiến Tông.",
      },
    ],
    diTich: [
      {
        ten: "Nghè Quan Lạn, thuộc Cụm di tích Đình – Chùa – Miếu – Nghè Quan Lạn (di tích cấp quốc gia, 1990)",
        diaDiem: "Thôn Thái Hòa, xã Quan Lạn, huyện Vân Đồn, Quảng Ninh",
      },
      {
        ten: "Đền Cửa Ông (phối thờ)",
        diaDiem: "Quảng Ninh",
      },
    ],
    tuongNiem: [
      "Ngày giỗ ngày 18 tháng 6 âm lịch.",
      "Lễ hội Quan Lạn (hội bơi chèo) từ ngày 16 đến 20 tháng 6 âm lịch, chính hội ngày 18, tái hiện chiến thắng Vân Đồn; di sản văn hóa phi vật thể quốc gia (2019).",
    ],
    ghiChuSuLieu:
      "Năm sinh chỉ là phỏng đoán. Sử cũ bình phẩm gay gắt về tính cách ông: Ngô Sĩ Liên trong Toàn thư chê tính hà khắc, tham tài và đời tư phóng túng, tương phản với tài thao lược. Tương truyền, thời trẻ vì phạm lỗi bị tịch thu gia sản, ông về bến Bình Than bán than, khi thuyền vua đi qua đã ứng đối việc nước khiến vua thán phục mà tha tội.",
    wikiTitle: "Trần Khánh Dư",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 5, 6); Khâm định Việt sử thông giám cương mục (Chính biên quyển 7, 8, 9).",
      "Cổng thông tin điện tử Cục Di sản Văn hóa.",
      "Báo Quảng Ninh.",
    ],
  },
  {
    slug: "pham-ngu-lao",
    ten: "Phạm Ngũ Lão",
    tenThat: null,
    tenKhac: ["Điện súy Thượng tướng quân", "Quan nội hầu"],
    namSinh: "1255",
    namMat: "1320",
    nienDai: "1255 – 1320",
    queQuan: "Làng Phù Ủng, huyện Đường Hào, phủ Thượng Hồng; nay thuộc huyện Ân Thi, Hưng Yên",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1285,
    tomTat: "Danh tướng nhà Trần, môn khách rồi con rể Hưng Đạo vương, lập công trong hai cuộc kháng chiến chống Nguyên Mông, dẹp yên biên giới Tây Bắc và là tác giả bài thơ Thuật hoài.",
    tieuSu: [
      "Phạm Ngũ Lão sinh năm Ất Mão (1255). Tương truyền, thời hàn vi ông ngồi đan sọt bên đường mải nghĩ binh thư, quân lính mở đường lấy giáo đâm vào đùi chảy máu mà không hay biết; Trần Hưng Đạo thấy người có chí lớn, thu nhận làm môn khách và gả con gái nuôi.",
      "Năm 1285, ông chỉ huy quân Thánh Dực phục kích giặc ở ải Chi Lăng và chém tướng Lý Quán ở Tây Kết. Năm 1288, trong cuộc phản công Bạch Đằng, ông mai phục ở ải Nội Bàng, chặn đường tháo chạy của Thoát Hoan. Các năm 1294, 1297 và 1301, ông cầm quân dẹp yên biên giới Tây Bắc, chặn các cuộc xâm lấn của quân Ai Lao; năm 1312 dẫn quân tiên phong đánh Chiêm Thành.",
      "Ông mất tháng 11 năm Canh Thân (1320); vua Trần Minh Tông bãi triều 5 ngày để tỏ lòng thương tiếc, truy tặng Kim tử Vinh lộc đại phu. Bài thơ Thuật hoài (Tỏ lòng) của ông tiêu biểu cho hào khí Đông A.",
    ],
    boiCanh: [
      "Thời Trần, bên cạnh ba lần kháng chiến chống Nguyên Mông, triều đình còn phải giữ yên biên giới phía tây và phía nam trước các cuộc xâm lấn của Ai Lao và Chiêm Thành.",
    ],
    congTrang: [
      "Phục kích quân Nguyên ở ải Chi Lăng, chém tướng Lý Quán năm 1285.",
      "Mai phục ở ải Nội Bàng, chặn đường rút của Thoát Hoan năm 1288.",
      "Dẹp yên biên giới Tây Bắc các năm 1294, 1297, 1301.",
      "Dẫn quân tiên phong đánh Chiêm Thành năm 1312.",
      "Tác giả bài thơ Thuật hoài.",
    ],
    suKien: [
      {
        nam: "1255",
        text: "Sinh năm Ất Mão.",
      },
      {
        nam: "1285",
        text: "Phục kích ở ải Chi Lăng, chém tướng Lý Quán.",
      },
      {
        nam: "1288",
        text: "Mai phục ở ải Nội Bàng trong cuộc phản công Bạch Đằng.",
      },
      {
        nam: "1294 – 1301",
        text: "Nhiều lần cầm quân dẹp yên biên giới Tây Bắc.",
      },
      {
        nam: "1320",
        text: "Mất tháng 11 năm Canh Thân; vua bãi triều 5 ngày.",
      },
    ],
    diTich: [
      {
        ten: "Đền Phù Ủng (di tích lịch sử – văn hóa cấp quốc gia, 1988)",
        diaDiem: "Làng Phù Ủng, huyện Ân Thi, Hưng Yên",
      },
      {
        ten: "Đền Phù Ủng (di tích lịch sử cấp quốc gia)",
        diaDiem: "Số 25 phố Lý Quốc Sư, phường Hàng Trống, quận Hoàn Kiếm, Hà Nội",
      },
    ],
    tuongNiem: [
      "Ngày giỗ chính ngày mùng 1 tháng 11 âm lịch.",
      "Lễ hội đền Phù Ủng (Ân Thi, Hưng Yên) từ ngày 11 đến 15 tháng Giêng âm lịch, kỷ niệm ngày xuất quân; di sản văn hóa phi vật thể quốc gia (2020).",
    ],
    ghiChuSuLieu:
      "Có ý kiến cho rằng chuyện xuất thân nghèo ngồi đan sọt là huyền thoại hóa, thực tế ông có thể thuộc dòng hào trưởng có thế lực. Người con gái Hưng Đạo vương gả cho ông có nơi chép là Anh Nguyên quận chúa, có nơi ghi Tĩnh Huệ công chúa.",
    wikiTitle: "Phạm Ngũ Lão",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 5, 6); Khâm định Việt sử thông giám cương mục (Chính biên quyển 7, 8, 9).",
      "Cổng thông tin Du lịch Hưng Yên.",
      "Báo điện tử VOV; Di sản văn hóa Hà Nội.",
    ],
  },
  {
    slug: "yet-kieu",
    ten: "Yết Kiêu",
    tenThat: "Phạm Hữu Thế (theo thần tích)",
    tenKhac: ["Hữu Bật Đại vương", "Trần triều Đệ nhất Đô soái Thủy quân"],
    namSinh: "1242",
    namMat: "1303",
    nienDai: "1242 – 1303 (theo thần tích)",
    queQuan: "Làng Hạ Bì, tổng Vạn Bằng, huyện Gia Lộc; nay là thôn Hạ Bì, xã Yết Kiêu, huyện Gia Lộc, Hải Dương",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1285,
    tomTat: "Gia tướng thân tín của Trần Hưng Đạo, giữ thuyền cứu chủ tướng năm 1285 và chỉ huy đội thủy binh lặn đục thuyền giặc trong kháng chiến chống Nguyên Mông.",
    tieuSu: [
      "Chính sử chỉ ghi tên ông là Yết Kiêu; thần tích làng Hạ Bì chép tên thật là Phạm Hữu Thế, sinh năm Nhâm Tý (1242). Ông là gia tướng kiên trung bậc nhất dưới trướng Quốc công Tiết chế Trần Hưng Đạo.",
      "Đầu năm 1285, khi thủy quân triều đình tan vỡ, ông một mực giữ thuyền đợi chủ tướng ở bãi Tân, giúp Trần Hưng Đạo thoát hiểm. Ông huấn luyện và chỉ huy đội thủy binh lặn đục thủng thuyền giặc, phá thế phối hợp thủy bộ của quân Nguyên; năm 1288 tham gia trận Bạch Đằng.",
      "Cùng Dã Tượng, ông khuyên Hưng Đạo vương gác lại hiềm khích gia tộc để dốc lòng vì việc nước. Theo thần tích đền Quát, ông mất ngày 28 tháng Chạp năm Quý Mão (1303).",
    ],
    boiCanh: [
      "Chiến tranh chống Nguyên Mông diễn ra nhiều trên sông nước; thủy binh thiện chiến là thế mạnh của quân đội Đại Việt.",
    ],
    congTrang: [
      "Giữ thuyền ở bãi Tân, giúp Trần Hưng Đạo thoát hiểm năm 1285.",
      "Huấn luyện và chỉ huy đội thủy binh lặn đục thuyền giặc.",
      "Tham gia trận Bạch Đằng năm 1288.",
    ],
    suKien: [
      {
        nam: "1242",
        text: "Sinh năm Nhâm Tý (theo thần tích đền Quát).",
      },
      {
        nam: "1285",
        text: "Giữ thuyền đợi và cứu Trần Hưng Đạo ở bãi Tân.",
      },
      {
        nam: "1288",
        text: "Tham gia trận Bạch Đằng.",
      },
      {
        nam: "1303",
        text: "Mất ngày 28 tháng Chạp năm Quý Mão (theo thần tích).",
      },
    ],
    diTich: [
      {
        ten: "Đền Quát (đền Hạ Bì), di tích lịch sử cấp quốc gia (1989)",
        diaDiem: "Thôn Hạ Bì, xã Yết Kiêu, huyện Gia Lộc, Hải Dương",
      },
      {
        ten: "Đền Kiếp Bạc (phối thờ)",
        diaDiem: "Hải Dương",
      },
      {
        ten: "Đền Cửa Ông (phối thờ)",
        diaDiem: "Quảng Ninh",
      },
    ],
    tuongNiem: [
      "Lễ giỗ chính kỵ ngày 28 tháng Chạp âm lịch.",
      "Lễ hội đền Quát mở hai kỳ: hội xuân từ 14 đến 16 tháng Giêng, hội thu từ 15 đến 18 tháng 8 âm lịch; di sản văn hóa phi vật thể quốc gia (2020).",
    ],
    ghiChuSuLieu:
      "Các bộ chính sử không ghi năm sinh, năm mất; niên đại chỉ theo thần tích. Chính sử ghi ông xuất thân gia nô, tên Yết Kiêu vốn là tên một giống chó săn nhỏ; tư liệu Hán Nôm và thần phả đời sau nâng ông thành gia tướng, hào kiệt họ Phạm. Tương truyền, ông nuốt phải bọt của hai con trâu trắng thần nên bơi lặn tài tình, ở dưới nước nhiều ngày như trên cạn.",
    wikiTitle: "Yết Kiêu",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 5); Khâm định Việt sử thông giám cương mục (Chính biên quyển 7, 8).",
      "Bảo tàng Lịch sử Quốc gia.",
      "Báo Hải Phòng.",
    ],
  },
  {
    slug: "da-tuong",
    ten: "Dã Tượng",
    tenThat: null,
    tenKhac: [],
    namSinh: null,
    namMat: null,
    nienDai: "Thế kỷ XIII",
    queQuan: "Không được sử sách ghi lại; dã sử cho là người vùng rừng núi Đông Bắc (khu vực Chí Linh hoặc Lục Nam)",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Trần",
    namMoc: 1285,
    tomTat: "Gia tướng tâm phúc của Trần Hưng Đạo, người huấn luyện và chỉ huy đội tượng binh trong hai cuộc kháng chiến chống Nguyên Mông.",
    tieuSu: [
      "Dã Tượng (chữ Hán nghĩa là “voi rừng”) là gia tướng trung thành và tâm phúc của Quốc công Tiết chế Trần Hưng Đạo. Chính sử không ghi năm sinh, năm mất và quê quán của ông; thần tích một số nơi gắn ông với họ Trương hoặc họ Trần.",
      "Ông có tài thuần dưỡng và huấn luyện voi chiến, tổ chức đội tượng binh thành lực lượng đột kích chống kỵ binh Mông Cổ. Năm 1285, ông chỉ huy tượng binh chặn đánh kỵ binh giặc ở Vạn Kiếp, hộ vệ Hưng Đạo vương, rồi tham gia các trận đánh cánh quân Toa Đô và Ô Mã Nhi.",
      "Cùng Yết Kiêu, ông khuyên Hưng Đạo vương giữ trọn đạo bề tôi, không theo lời trăng trối tranh ngôi của thân phụ là Trần Liễu.",
    ],
    boiCanh: [
      "Kỵ binh Mông Cổ là lực lượng mạnh nhất của quân Nguyên; Đại Việt dùng tượng binh và địa hình để khắc chế.",
    ],
    congTrang: [
      "Huấn luyện và chỉ huy đội tượng binh Đại Việt.",
      "Chặn đánh kỵ binh Nguyên ở Vạn Kiếp, hộ vệ Hưng Đạo vương năm 1285.",
      "Tham gia các trận đánh cánh quân Toa Đô và Ô Mã Nhi.",
    ],
    suKien: [
      {
        nam: "1285",
        text: "Chỉ huy tượng binh chặn kỵ binh Nguyên ở Vạn Kiếp.",
      },
      {
        nam: "1285 – 1288",
        text: "Tham gia hai cuộc kháng chiến chống Nguyên Mông dưới trướng Trần Hưng Đạo.",
      },
      {
        nam: "thời kháng chiến",
        text: "Cùng Yết Kiêu khuyên Hưng Đạo vương giữ trọn đạo bề tôi.",
      },
    ],
    diTich: [
      {
        ten: "Đền Kiếp Bạc (phối thờ, di tích quốc gia đặc biệt)",
        diaDiem: "Xã Hưng Đạo, thành phố Chí Linh, Hải Dương",
      },
      {
        ten: "Đền Cửa Ông (phối thờ, di tích quốc gia đặc biệt)",
        diaDiem: "Quảng Ninh",
      },
      {
        ten: "Đền thờ Đức Thánh Trần (phối thờ)",
        diaDiem: "Quận 1, TP Hồ Chí Minh",
      },
    ],
    tuongNiem: [
      "Không có ngày giỗ riêng được lưu truyền; ông được phụng tế cùng đại lễ kỵ nhật Đức Thánh Trần ngày 20 tháng 8 âm lịch tại đền Kiếp Bạc.",
    ],
    ghiChuSuLieu:
      "Chưa rõ “Dã Tượng” là tên riêng hay danh xưng gắn với nghề chỉ huy voi chiến; thân thế ông là người miền núi phía Bắc hay người đồng bằng cũng chưa thống nhất. Tương truyền, ông một mình thu phục cả bầy voi rừng dữ để luyện thành voi trận.",
    wikiTitle: "Dã Tượng",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 5); Khâm định Việt sử thông giám cương mục (Chính biên quyển 7, 8).",
      "Bảo tàng Lịch sử Quốc gia.",
    ],
  },
  {
    slug: "dang-dung",
    ten: "Đặng Dung",
    tenThat: null,
    tenKhac: ["Dung Quốc công"],
    namSinh: "khoảng 1373",
    namMat: "1414",
    nienDai: "khoảng 1373 – 1414",
    queQuan: "Xã Mỹ Tho, huyện Thiên Lộc, trấn Nghệ An; nay thuộc xã Tùng Lộc, huyện Can Lộc, Hà Tĩnh",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Hậu Trần",
    namMoc: 1413,
    tomTat: "Tể tướng, Tiết chế quân sự nhà Hậu Trần, tôn phò Trùng Quang Đế kháng chiến chống quân Minh, tác giả bài thơ Cảm hoài, tuẫn tiết năm 1414.",
    tieuSu: [
      "Đặng Dung là con của danh tướng Đặng Tất, theo gia phả sinh khoảng năm Quý Sửu (1373). Ông giúp cha giữ đất Hóa Châu chống quân Minh xâm lược.",
      "Năm 1409, sau khi cha bị Giản Định Đế giết oan, ông cùng Nguyễn Cảnh Dị tôn Trần Quý Khoáng lên ngôi (Trùng Quang Đế) để tiếp tục kháng chiến. Giữ chức Đồng bình chương sự, Tiết chế quân sự, ông chỉ huy các trận đánh ở Thanh Hóa, Nghệ An, Hóa Châu từ năm 1409 đến 1413.",
      "Tháng 9 năm 1413, ông chỉ huy trận tập kích đêm, xông lên thuyền chỉ huy của quân Minh khiến Trương Phụ phải nhảy sang thuyền nhỏ chạy thoát. Tháng 4 năm 1414, bị bắt giải sang Trung Quốc cùng vua, ông gieo mình xuống sông tuẫn tiết. Ông để lại bài thơ Cảm hoài bi tráng.",
    ],
    boiCanh: [
      "Quân Minh xâm lược Đại Việt; các vua nhà Hậu Trần là Giản Định Đế rồi Trùng Quang Đế tiếp tục kháng chiến trong điều kiện thiếu thốn lương thảo.",
    ],
    congTrang: [
      "Cùng cha giữ đất Hóa Châu chống quân Minh.",
      "Tôn phò Trùng Quang Đế, duy trì cuộc kháng chiến sau khi Đặng Tất bị hại.",
      "Chỉ huy quân Hậu Trần ở Thanh Hóa, Nghệ An, Hóa Châu (1409 – 1413).",
      "Chỉ huy trận tập kích đêm năm 1413 suýt bắt được Trương Phụ.",
      "Tác giả bài thơ Cảm hoài.",
    ],
    suKien: [
      {
        nam: "1409",
        text: "Cùng Nguyễn Cảnh Dị tôn Trần Quý Khoáng lên ngôi.",
      },
      {
        nam: "1409 – 1413",
        text: "Chỉ huy kháng chiến ở Thanh Hóa, Nghệ An, Hóa Châu.",
      },
      {
        nam: "1413",
        text: "Tháng 9, tập kích đêm vào thuyền quân Minh, Trương Phụ phải chạy thoát.",
      },
      {
        nam: "1414",
        text: "Tháng 4, bị bắt giải sang Trung Quốc, gieo mình xuống sông tuẫn tiết.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Đặng Tất – Đặng Dung (di tích lịch sử cấp quốc gia, 1992)",
        diaDiem: "Xã Tùng Lộc, huyện Can Lộc, Hà Tĩnh",
      },
      {
        ten: "Đền Ngọc Chấn (phối thờ)",
        diaDiem: "Xã Yên Đồng, huyện Ý Yên, Nam Định",
      },
    ],
    tuongNiem: [
      "Dòng họ và nhân dân địa phương cúng tế vào ngày Rằm tháng Giêng (lễ tế tổ mùa xuân) và ngày 12 tháng 4 âm lịch (ngày tuẫn tiết).",
    ],
    ghiChuSuLieu:
      "Năm sinh chỉ dựa theo gia phả. Sử chép trong trận tập kích năm 1413, vì đêm tối không nhận ra mặt chủ tướng giặc nên để Trương Phụ trốn thoát, từ đó thế trận chuyển sang bất lợi. Tương truyền, ông đêm đêm mài gươm dưới trăng làm lõm cả phiến đá.",
    wikiTitle: "Đặng Dung",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 9); Khâm định Việt sử thông giám cương mục (Chính biên quyển 12).",
      "Báo Hà Tĩnh.",
      "Cổng thông tin điện tử huyện Can Lộc.",
    ],
  },
  {
    slug: "tran-quy-khoang",
    ten: "Trần Quý Khoáng",
    tenThat: null,
    tenKhac: ["Trùng Quang Đế", "Trần Quý Khoách"],
    namSinh: null,
    namMat: "1414",
    nienDai: "? – 1414 (ở ngôi 1409 – 1414)",
    queQuan: "Hoàng tộc gốc Tức Mặc, phủ Thiên Trường (nay phường Lộc Vượng, thành phố Nam Định); dấy binh ở Chi La, nay là huyện Đức Thọ, Hà Tĩnh",
    thoiKy: "ly-tran",
    trieuDai: "Nhà Hậu Trần",
    namMoc: 1409,
    tomTat: "Hoàng đế nhà Hậu Trần với niên hiệu Trùng Quang, lãnh đạo năm năm kháng chiến chống quân Minh (1409 – 1414).",
    tieuSu: [
      "Trần Quý Khoáng là con Trang Định vương Trần Ngạc, cháu nội vua Trần Nghệ Tông; chính sử không ghi năm sinh. Ngày 17 tháng 3 âm lịch năm 1409, ông lên ngôi Hoàng đế ở Chi La (Hà Tĩnh), lấy niên hiệu Trùng Quang, giương cao ngọn cờ khôi phục Đại Việt.",
      "Để hóa giải bất hòa trong hàng ngũ kháng chiến, ông đón Giản Định Đế về tôn làm Thái thượng hoàng. Ông lãnh đạo cuộc kháng chiến kéo dài năm năm trong cảnh thiếu thốn lương thảo trước đại quân Trương Phụ, và cử sứ thần Nguyễn Biểu sang trại giặc đàm phán.",
      "Năm 1414, ông bị quân Minh bắt; sử Việt chép trên đường bị giải sang phương Bắc, ông nhảy xuống nước tuẫn tiết.",
    ],
    boiCanh: [
      "Nhà Hậu Trần là lực lượng kháng chiến chống quân Minh xâm lược trước khi khởi nghĩa Lam Sơn nổ ra.",
    ],
    congTrang: [
      "Lên ngôi ở Chi La, tiếp tục ngọn cờ kháng chiến chống quân Minh.",
      "Đón Giản Định Đế về làm Thái thượng hoàng, hàn gắn nội bộ kháng chiến.",
      "Lãnh đạo năm năm kháng chiến trước đại quân Trương Phụ.",
    ],
    suKien: [
      {
        nam: "1409",
        text: "Lên ngôi Hoàng đế ở Chi La ngày 17 tháng 3 âm lịch, niên hiệu Trùng Quang.",
      },
      {
        nam: "1409 – 1413",
        text: "Lãnh đạo kháng chiến chống quân Minh; cử Nguyễn Biểu sang trại giặc đàm phán.",
      },
      {
        nam: "1414",
        text: "Bị quân Minh bắt; theo sử Việt, nhảy xuống nước tuẫn tiết trên đường bị giải đi.",
      },
    ],
    diTich: [
      {
        ten: "Đền Hậu Trần (đền La), di tích lịch sử cấp quốc gia",
        diaDiem: "Thôn La, xã Yên Thành, huyện Yên Mô, Ninh Bình",
      },
      {
        ten: "Đền Trung và khu lăng mộ",
        diaDiem: "Xóm Đức Thịnh, xã Hưng Lộc, thành phố Vinh, Nghệ An",
      },
    ],
    tuongNiem: [
      "Không có ngày giỗ riêng phổ biến; ông được phụng tế trong Lễ hội đền La từ ngày 12 đến 13 tháng 3 âm lịch tại huyện Yên Mô, Ninh Bình.",
    ],
    ghiChuSuLieu:
      "Cách mất còn khác nhau: sử Việt chép ông nhảy xuống nước tuẫn tiết trên đường bị giải đi, còn Minh thực lục chép ông bị giải về kinh đô nhà Minh và bị xử trảm ngày 16 tháng 8 năm 1414. Đền Trung (Vinh) từng bị rút bằng công nhận di tích quốc gia năm 2010 do tranh chấp đất đai. Tương truyền, khi ông bị bắt ở bờ biển Thiên Cầm, núi đá nơi đây vang lên như tiếng đàn tiễn biệt.",
    wikiTitle: "Trùng Quang Đế",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 9); Khâm định Việt sử thông giám cương mục (Chính biên quyển 12).",
      "Minh thực lục.",
      "Báo Nghệ An.",
    ],
  },
  {
    slug: "le-thanh-tong",
    ten: "Lê Thánh Tông",
    tenThat: "Lê Tư Thành",
    tenKhac: ["Lê Hạo", "Bình Nguyên vương"],
    namSinh: "1442",
    namMat: "1497",
    nienDai: "1442 – 1497",
    queQuan: "Gốc hương Lam Sơn (nay thị trấn Lam Sơn, huyện Thọ Xuân, Thanh Hóa); sinh ở chùa Huy Văn, Thăng Long (nay quận Đống Đa, Hà Nội)",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1442,
    tomTat: "Hoàng đế nhà Lê sơ trị vì 38 năm (1460 – 1497), ban hành Luật Hồng Đức, cải cách hành chính và giáo dục, đưa Đại Việt đến thời cực thịnh.",
    tieuSu: [
      "Lê Thánh Tông tên thật là Lê Tư Thành, sinh ngày 20 tháng 7 năm Nhâm Tuất (1442), thời trẻ được phong Bình Nguyên vương. Năm 1460, ông được các đại thần đứng đầu là Nguyễn Xí đón lên ngôi, lần lượt đặt niên hiệu Quang Thuận (1460 – 1469) và Hồng Đức (1470 – 1497).",
      "Ông ban hành Quốc triều hình luật (Luật Hồng Đức) với nhiều điều khoản tiến bộ, bảo vệ quyền lợi phụ nữ; chia đất nước thành 13 đạo thừa tuyên, cho vẽ bản đồ Hồng Đức. Ông chấn hưng khoa cử, khởi xướng dựng bia tiến sĩ ở Văn Miếu từ năm 1484. Năm 1464, ông minh oan và phục hồi danh dự cho Nguyễn Trãi.",
      "Năm 1471, ông thân chinh đánh Chiêm Thành, mở cõi đến núi Thạch Bi. Ông lập Hội Tao Đàn, tự làm Đô nguyên súy, để lại nhiều thơ văn. Ông mất ngày 30 tháng Giêng năm Đinh Tỵ (1497).",
    ],
    boiCanh: [
      "Sau những biến loạn trong cung đình nửa đầu thế kỷ XV, triều Lê sơ dưới thời Lê Thánh Tông đạt đỉnh cao về thể chế, luật pháp, giáo dục và văn hóa.",
    ],
    congTrang: [
      "Ban hành Quốc triều hình luật (Luật Hồng Đức).",
      "Cải cách hành chính, chia 13 đạo thừa tuyên, vẽ bản đồ Hồng Đức.",
      "Chấn hưng giáo dục, khoa cử; dựng bia tiến sĩ ở Văn Miếu từ năm 1484.",
      "Thân chinh đánh Chiêm Thành năm 1471, mở rộng lãnh thổ.",
      "Minh oan cho Nguyễn Trãi (1464); lập Hội Tao Đàn.",
    ],
    suKien: [
      {
        nam: "1442",
        text: "Sinh ngày 20 tháng 7 năm Nhâm Tuất.",
      },
      {
        nam: "1460",
        text: "Lên ngôi, niên hiệu Quang Thuận.",
      },
      {
        nam: "1464",
        text: "Ban chiếu minh oan cho Nguyễn Trãi.",
      },
      {
        nam: "1470",
        text: "Đổi niên hiệu Hồng Đức.",
      },
      {
        nam: "1471",
        text: "Thân chinh đánh Chiêm Thành.",
      },
      {
        nam: "1484",
        text: "Dựng bia tiến sĩ ở Văn Miếu.",
      },
      {
        nam: "1497",
        text: "Mất ngày 30 tháng Giêng năm Đinh Tỵ.",
      },
    ],
    diTich: [
      {
        ten: "Chiêu Lăng và điện Lam Kinh, Khu di tích quốc gia đặc biệt Lam Kinh",
        diaDiem: "Thị trấn Lam Sơn, huyện Thọ Xuân, Thanh Hóa",
      },
      {
        ten: "Chùa Huy Văn và điện Dục Anh (di tích lịch sử cấp quốc gia)",
        diaDiem: "Quận Đống Đa, Hà Nội",
      },
    ],
    tuongNiem: [
      "Lễ giỗ ngày 30 tháng Giêng âm lịch.",
      "Phối tế trong Lễ hội Lam Kinh (di sản văn hóa phi vật thể quốc gia) ngày 22 tháng 8 âm lịch.",
    ],
    ghiChuSuLieu:
      "Về cái chết năm 1497, sử cũ ghi vua mắc bệnh nặng, còn một số dã sử lưu truyền nghi án bị Trường Lạc Hoàng hậu đầu độc. Chuyện hào quang khi ông ra đời ở chùa Huy Văn và các giai thoại vua cải trang vi hành là truyền thuyết, giai thoại dân gian.",
    wikiTitle: "Lê Thánh Tông",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ thực lục quyển 12, 13).",
      "Phan Huy Chú, Lịch triều hiến chương loại chí.",
      "Ban Quản lý Di tích quốc gia đặc biệt Lam Kinh.",
    ],
  },
  {
    slug: "nguyen-chich",
    ten: "Nguyễn Chích",
    tenThat: null,
    tenKhac: ["Lê Chích", "Đình thượng hầu", "Đông Hương hầu"],
    namSinh: "1382",
    namMat: "1448",
    nienDai: "1382 – 1448",
    queQuan: "Làng Vạn Lộc, huyện Đông Sơn, trấn Thanh Hóa; nay là thôn Vạn Lộc, xã Đông Ninh, huyện Đông Sơn, Thanh Hóa",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1424,
    tomTat: "Khai quốc công thần nhà Lê sơ, người hiến kế tiến vào Nghệ An năm 1424, bước ngoặt chiến lược của khởi nghĩa Lam Sơn.",
    tieuSu: [
      "Nguyễn Chích sinh năm Nhâm Tuất (1382), sau được ban quốc tính nên còn gọi là Lê Chích. Ông tự dựng cờ khởi nghĩa, lập căn cứ Hoàng – Nghiêu hiểm trở đánh quân Minh trước khi hợp với Lam Sơn.",
      "Cuối năm 1420, ông đem toàn bộ nghĩa binh về với Lê Lợi. Năm 1424, ông hiến kế tạm rời miền núi Thanh Hóa, bất ngờ tiến đánh giải phóng Nghệ An làm căn cứ rồi mới tiến ra Đông Đô. Ông trực tiếp chỉ huy các chiến dịch mở rộng vùng giải phóng vào Tân Bình, Thuận Hóa.",
      "Ông phụng sự ba đời vua Lê Thái Tổ, Lê Thái Tông, Lê Nhân Tông, mất ngày 26 tháng 11 năm Mậu Thìn (1448), được truy tặng Thái phó.",
    ],
    boiCanh: [
      "Những năm đầu, nghĩa quân Lam Sơn nhiều lần bị vây hãm ở miền núi Thanh Hóa; việc chuyển hướng vào Nghệ An đã mở ra thế chủ động cho cuộc khởi nghĩa.",
    ],
    congTrang: [
      "Tự lập căn cứ Hoàng – Nghiêu đánh quân Minh.",
      "Đưa nghĩa binh gia nhập Lam Sơn năm 1420.",
      "Hiến kế tiến vào Nghệ An năm 1424.",
      "Chỉ huy mở rộng vùng giải phóng vào Tân Bình, Thuận Hóa.",
    ],
    suKien: [
      {
        nam: "1382",
        text: "Sinh năm Nhâm Tuất (theo văn bia).",
      },
      {
        nam: "1420",
        text: "Đem nghĩa binh gia nhập khởi nghĩa Lam Sơn.",
      },
      {
        nam: "1424",
        text: "Hiến kế tiến đánh, giải phóng Nghệ An.",
      },
      {
        nam: "1448",
        text: "Mất ngày 26 tháng 11 năm Mậu Thìn.",
      },
    ],
    diTich: [
      {
        ten: "Quần thể lăng mộ, bia ký và đền thờ Nguyễn Chích (di tích lịch sử cấp quốc gia)",
        diaDiem: "Làng Vạn Lộc, xã Đông Ninh, huyện Đông Sơn, Thanh Hóa",
      },
      {
        ten: "Di tích Phủ Bà – đền thờ Nguyễn Chích",
        diaDiem: "Thành phố Thanh Hóa, Thanh Hóa",
      },
    ],
    tuongNiem: [
      "Lễ giỗ chính ngày 26 tháng 11 âm lịch tại đền Vạn Lộc.",
      "Lễ hội di tích Phủ Bà – đền thờ Nguyễn Chích ngày mùng 2 tháng 3 âm lịch.",
    ],
    ghiChuSuLieu:
      "Việc ông từng bị thu hồi một phần binh quyền sau ngày thái bình được các nhà nghiên cứu giải thích do sự nghi kỵ giữa võ tướng địa phương và quan văn trong triều. Tương truyền, ông nuôi đàn bồ câu đưa thư mật giữa các đạo quân; dã sử còn kể chuyện ông kết duyên với một nữ tướng cải trang nam giới.",
    wikiTitle: "Nguyễn Chích",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 10); Lam Sơn thực lục; Đại Nam nhất thống chí.",
      "Báo Thanh Hóa, chuyên đề Lịch sử.",
      "Báo Bình Phước.",
    ],
  },
  {
    slug: "dinh-le",
    ten: "Đinh Lễ",
    tenThat: null,
    tenKhac: ["Lê Lễ", "Bân Quốc công", "Hiển Khánh vương"],
    namSinh: null,
    namMat: "1427",
    nienDai: "? – 1427",
    queQuan: "Sách Thùy Cối, hương Lam Sơn, huyện Lôi Dương; nay thuộc vùng huyện Thọ Xuân – Ngọc Lặc, Thanh Hóa",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1426,
    tomTat: "Danh tướng khởi nghĩa Lam Sơn, cháu gọi Lê Lợi bằng cậu, cùng Lý Triện lập đại thắng Tốt Động – Chúc Động năm 1426.",
    tieuSu: [
      "Đinh Lễ là cháu gọi Lê Lợi bằng cậu ruột, sau được ban quốc tính nên còn gọi là Lê Lễ; chính sử không ghi năm sinh. Ông làm cận vệ trung kiên cho Lê Lợi từ ngày dấy nghĩa, cùng chịu cảnh tuyệt lương trên núi Chí Linh.",
      "Tháng Chạp năm 1424, ông đi đầu đánh tan quân Minh ở trận Bồ Ải. Tháng 10 năm 1426, ông phục kích phá tiền quân giặc ở Ninh Kiều, rồi cùng Lý Triện chỉ huy đại thắng Tốt Động – Chúc Động, làm sụp đổ thế phản công của Vương Thông.",
      "Tháng 3 năm 1427, dẫn quân tiếp viện ở My Động, voi chiến sa lầy, ông bị bắt giải vào thành Đông Quan và hy sinh vì kiên quyết không đầu hàng. Năm 1484, ông được truy tặng Thái sư, tước Bân Quốc công.",
    ],
    boiCanh: [
      "Cuối năm 1426, Vương Thông đem đại quân phản công hòng xoay chuyển cục diện; chiến thắng Tốt Động – Chúc Động làm sụp đổ thế phản công đó.",
    ],
    congTrang: [
      "Làm cận vệ trung kiên của Lê Lợi từ ngày đầu khởi nghĩa.",
      "Đi đầu đánh tan quân Minh ở trận Bồ Ải năm 1424.",
      "Cùng Lý Triện chỉ huy đại thắng Tốt Động – Chúc Động năm 1426.",
    ],
    suKien: [
      {
        nam: "1424",
        text: "Đánh tan quân Minh ở trận Bồ Ải.",
      },
      {
        nam: "1426",
        text: "Phục kích ở Ninh Kiều; cùng Lý Triện lập đại thắng Tốt Động – Chúc Động.",
      },
      {
        nam: "1427",
        text: "Bị bắt ở My Động, hy sinh vì không chịu đầu hàng.",
      },
      {
        nam: "1484",
        text: "Được truy tặng Thái sư, tước Bân Quốc công.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Đinh Lễ (di tích lịch sử cấp quốc gia, 1994)",
        diaDiem: "Thị trấn Thiệu Hóa (trước là thị trấn Vạn Hà), huyện Thiệu Hóa, Thanh Hóa",
      },
      {
        ten: "Đền Linh Cảm Đại Vương (di tích cấp quốc gia)",
        diaDiem: "Tùng Ảnh, huyện Đức Thọ, Hà Tĩnh",
      },
      {
        ten: "Đền Mỹ Lâm (di tích cấp tỉnh)",
        diaDiem: "Thôn Phúc Long, xã Minh Tiến, huyện Ngọc Lặc, Thanh Hóa",
      },
    ],
    tuongNiem: [
      "Ngày kỵ trong tháng 3 âm lịch.",
      "Hội tế tổ và dâng hương dòng họ Đinh vào trung tuần tháng Giêng.",
    ],
    ghiChuSuLieu:
      "Năm sinh không được ghi lại; quê gốc theo lời truyền đan xen giữa sách Thùy Cối (Thọ Xuân) và trang Mỹ Lâm (Ngọc Lặc) do địa bàn tụ nghĩa thay đổi. Tương truyền, voi chiến của ông không rời xác chủ; dấu tích còn lại là “Đống Mồ Voi” và “Cầu Voi” ở Mai Động (Hoàng Mai, Hà Nội).",
    wikiTitle: "Đinh Lễ",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 10); Khâm định Việt sử thông giám cương mục (Chính biên quyển 13, 14).",
      "Báo Người Hà Nội.",
    ],
  },
  {
    slug: "nguyen-xi",
    ten: "Nguyễn Xí",
    tenThat: null,
    tenKhac: ["Lê Xí", "Cương Quốc công"],
    namSinh: "1397",
    namMat: "1465",
    nienDai: "1397 – 1465",
    queQuan: "Làng Thượng Xá, huyện Chân Phúc, trấn Nghệ An; nay thuộc xã Khánh Hợp (trước là xã Nghi Hợp), huyện Nghi Lộc, Nghệ An",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1426,
    tomTat: "Khai quốc công thần nhà Lê sơ, theo khởi nghĩa Lam Sơn từ nhỏ, về sau đứng đầu cuộc chính biến năm 1460 đưa Lê Thánh Tông lên ngôi.",
    tieuSu: [
      "Nguyễn Xí sinh năm Đinh Sửu (1397), sau được ban quốc tính nên còn gọi là Lê Xí. Ông theo khởi nghĩa Lam Sơn từ thuở nhỏ, lập nhiều chiến công giải phóng Nghệ An và Tân Bình – Thuận Hóa.",
      "Tháng 10 năm 1426, ông cùng Đinh Lễ chỉ huy quân mai phục đánh tan quân Minh ở Tốt Động – Chúc Động. Năm 1427, ông bị giặc bắt ở My Động nhưng khoét ngục trốn thoát, về chỉ huy vây thành Đông Quan.",
      "Năm 1460, ông đứng đầu cuộc chính biến lật đổ Lê Nghi Dân, đón Lê Tư Thành lên ngôi (Lê Thánh Tông), rồi giữ chức Thái sư đầu triều. Ông phụng sự bốn đời vua, mất ngày 30 tháng 10 năm Ất Dậu (1465).",
    ],
    boiCanh: [
      "Sau khởi nghĩa Lam Sơn, triều Lê sơ trải qua nhiều biến động cung đình, trong đó có việc Lê Nghi Dân thoán đoạt ngôi vua.",
    ],
    congTrang: [
      "Tham gia giải phóng Nghệ An, Tân Bình – Thuận Hóa.",
      "Cùng Đinh Lễ chỉ huy trận Tốt Động – Chúc Động năm 1426.",
      "Trốn thoát khỏi ngục giặc, chỉ huy vây thành Đông Quan năm 1427.",
      "Đứng đầu cuộc chính biến năm 1460, đón Lê Thánh Tông lên ngôi.",
    ],
    suKien: [
      {
        nam: "1397",
        text: "Sinh năm Đinh Sửu (theo gia phả).",
      },
      {
        nam: "1426",
        text: "Cùng Đinh Lễ đánh tan quân Minh ở Tốt Động – Chúc Động.",
      },
      {
        nam: "1427",
        text: "Bị bắt ở My Động, trốn thoát, về chỉ huy vây thành Đông Quan.",
      },
      {
        nam: "1460",
        text: "Lật đổ Lê Nghi Dân, đón Lê Thánh Tông lên ngôi.",
      },
      {
        nam: "1465",
        text: "Mất ngày 30 tháng 10 năm Ất Dậu.",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích đền thờ và lăng mộ Nguyễn Xí (di tích quốc gia đặc biệt, 2020)",
        diaDiem: "Xã Khánh Hợp, huyện Nghi Lộc, Nghệ An",
      },
    ],
    tuongNiem: [
      "Lễ giỗ chính ngày 30 tháng 10 âm lịch tại xã Khánh Hợp.",
      "Lễ hội đền thờ Nguyễn Xí từ ngày 29 tháng 2 đến mùng 2 tháng 3 âm lịch; di sản văn hóa phi vật thể quốc gia (2020).",
    ],
    ghiChuSuLieu:
      "Tương truyền, ông có đội quân khuyển hàng trăm con, luồn rừng đưa tin qua vòng vây giặc và quấy rối doanh trại quân Minh ban đêm; chưa rõ đây là hình ảnh dân gian hay một lực lượng có thật.",
    wikiTitle: "Nguyễn Xí",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 10, 11, 12); Khâm định Việt sử thông giám cương mục.",
      "Cổng thông tin điện tử huyện Nghi Lộc.",
      "Báo Nghệ An.",
    ],
  },
  {
    slug: "le-van-linh",
    ten: "Lê Văn Linh",
    tenThat: null,
    tenKhac: ["Bảo Chính vương", "Trung Hiến"],
    namSinh: "khoảng 1377",
    namMat: "1448",
    nienDai: "khoảng 1377 – 1448",
    queQuan: "Thôn Hải Lịch, xã Bảo Đà, huyện Lôi Dương, trấn Thanh Hóa; nay là làng Hải Lịch, xã Thọ Hải, huyện Thọ Xuân, Thanh Hóa",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1416,
    tomTat: "Khai quốc công thần nhà Lê sơ, một trong hai quan văn dự Hội thề Lũng Nhai, lo việc cơ mật và văn thư trong mười năm khởi nghĩa Lam Sơn.",
    tieuSu: [
      "Lê Văn Linh sinh khoảng năm 1376 – 1377, vốn gốc họ Trần. Năm 1416, ông là một trong hai quan văn (cùng Bùi Quốc Hưng) dự Hội thề Lũng Nhai.",
      "Trong mười năm kháng chiến Lam Sơn, ông phụ trách việc cơ mật quân cơ, khởi thảo nhiều văn kiện quân sự, chính trị và ngoại giao. Năm 1429, dưới triều Lê Thái Tổ, ông được giao mang kim sách trong lễ sách lập.",
      "Giữ chức Thái phó, ông dám can gián vua về việc chuyên quyền của Lê Sát. Ông phụng sự ba đời vua Lê Thái Tổ, Lê Thái Tông, Lê Nhân Tông và mất năm Mậu Thìn (1448).",
    ],
    boiCanh: [
      "Bên cạnh các võ tướng, khởi nghĩa Lam Sơn cần những người lo việc văn thư, cơ mật và ngoại giao để tập hợp lực lượng và giao thiệp với đối phương.",
    ],
    congTrang: [
      "Dự Hội thề Lũng Nhai năm 1416.",
      "Phụ trách cơ mật, khởi thảo văn kiện trong khởi nghĩa Lam Sơn.",
      "Can gián vua về việc chuyên quyền của Lê Sát.",
    ],
    suKien: [
      {
        nam: "1416",
        text: "Dự Hội thề Lũng Nhai.",
      },
      {
        nam: "thời khởi nghĩa Lam Sơn",
        text: "Lo việc cơ mật, văn thư trong khởi nghĩa Lam Sơn.",
      },
      {
        nam: "1429",
        text: "Mang kim sách trong lễ sách lập dưới triều Lê Thái Tổ.",
      },
      {
        nam: "1448",
        text: "Mất năm Mậu Thìn.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Bảo Chính vương Lê Văn Linh (di tích lịch sử – văn hóa cấp tỉnh)",
        diaDiem: "Làng Hải Lịch, xã Thọ Hải, huyện Thọ Xuân, Thanh Hóa",
      },
    ],
    tuongNiem: [
      "Ngày kỵ theo bi ký là ngày 16 tháng 10 âm lịch; lễ tế tổ mùa xuân tại quê nhà.",
    ],
    ghiChuSuLieu:
      "Ngô Sĩ Liên trong Toàn thư khen ông thẳng thắn khi can gián nhưng cũng chê ông thích nhận quà biếu và lúc cuối đời chỉ chuyên lễ Phật. Tương truyền, vùng trang ấp của ông có hổ dữ, ông viết thư dán lên gốc cây quở trách, đàn hổ bỏ đi.",
    wikiTitle: "Lê Văn Linh",
    nguon: [
      "Đại Việt sử ký toàn thư (Bản kỷ quyển 10, 11); Khâm định Việt sử thông giám cương mục.",
      "Bia hộp thời Lê sơ phát hiện tại xã Thọ Hải, Thanh Hóa.",
    ],
  },
  {
    slug: "ngo-si-lien",
    ten: "Ngô Sĩ Liên",
    tenThat: null,
    tenKhac: ["Quang Hiền", "Chúc Lý Cư Sĩ", "Lê Sĩ Liên"],
    namSinh: "khoảng 1400",
    namMat: "cuối thế kỷ XV",
    nienDai: "khoảng 1400 – cuối thế kỷ XV",
    queQuan: "Làng Chúc Lý, huyện Chương Đức, phủ Ứng Thiên; nay là thôn Chúc Lý, thị trấn Chúc Sơn, huyện Chương Mỹ, Hà Nội",
    thoiKy: "le-so",
    trieuDai: "Hậu Lê",
    namMoc: 1479,
    tomTat: "Sử gia thời Lê sơ, người biên soạn bộ quốc sử Đại Việt sử ký toàn thư (1479) theo lệnh vua Lê Thánh Tông.",
    tieuSu: [
      "Ngô Sĩ Liên, tự Quang Hiền, hiệu Chúc Lý Cư Sĩ, sinh khoảng năm 1400. Thời trẻ ông theo nghĩa quân Lam Sơn; năm 1442 đỗ Tiến sĩ, làm quan qua các triều Lê Thái Tông, Lê Nhân Tông, Lê Thánh Tông, giữ các chức Hàn lâm viện Thị độc kiêm Sử quán Tu soạn, Đô ngự sử.",
      "Năm 1479, vâng lệnh vua Lê Thánh Tông, ông hoàn thành bộ Đại Việt sử ký toàn thư gồm 15 quyển. Ông đưa kỷ Hồng Bàng vào phần mở đầu quốc sử và viết nhiều lời bình đề cao đạo lý và lòng yêu nước.",
      "Ông sống rất thọ (98 hoặc 99 tuổi theo các nguồn) và mất vào những năm cuối thế kỷ XV.",
    ],
    boiCanh: [
      "Thời Lê Thánh Tông, nhà nước chú trọng biên soạn sử sách, luật pháp và địa chí để khẳng định nền văn hiến độc lập của Đại Việt.",
    ],
    congTrang: [
      "Biên soạn Đại Việt sử ký toàn thư (1479).",
      "Đưa kỷ Hồng Bàng vào mở đầu quốc sử.",
      "Viết nhiều lời bình sử đề cao đạo lý và lòng yêu nước.",
    ],
    suKien: [
      {
        nam: "khoảng 1400",
        text: "Sinh ở làng Chúc Lý.",
      },
      {
        nam: "thời trẻ",
        text: "Theo nghĩa quân Lam Sơn.",
      },
      {
        nam: "1442",
        text: "Đỗ Tiến sĩ khoa Nhâm Tuất.",
      },
      {
        nam: "1479",
        text: "Hoàn thành Đại Việt sử ký toàn thư.",
      },
    ],
    diTich: [
      {
        ten: "Nhà thờ họ Ngô – đền thờ Ngô Sĩ Liên (di tích lịch sử cấp thành phố)",
        diaDiem: "Thôn Chúc Lý, thị trấn Chúc Sơn, huyện Chương Mỹ, Hà Nội",
      },
    ],
    tuongNiem: [
      "Ngày kỵ được làng cúng tế ngày 20 tháng 8 âm lịch.",
      "Lễ hội làng Chúc Lý ngày 12 tháng Hai âm lịch.",
    ],
    ghiChuSuLieu:
      "Năm sinh, năm mất còn sai lệch vài năm giữa các nguồn (Đại Việt lịch triều đăng khoa lục ghi thọ 98 tuổi, văn bia đình Chúc Lý ghi thọ 99 tuổi). Tính huyền thoại và niên đại của kỷ Hồng Bàng do ông đưa vào quốc sử từng được giới sử học tranh luận nhiều.",
    wikiTitle: "Ngô Sĩ Liên",
    nguon: [
      "Lời tựa Đại Việt sử ký toàn thư (năm Hồng Đức thứ 10 – 1479).",
      "Đại Việt lịch triều đăng khoa lục.",
      "Sở Văn hóa và Thể thao Hà Nội.",
    ],
  },
  {
    slug: "nguyen-nhac",
    ten: "Nguyễn Nhạc",
    tenThat: null,
    tenKhac: ["Hồ Nhạc", "Biện Nhạc", "Hai Trầu", "Thái Đức Hoàng đế"],
    namSinh: "1743",
    namMat: "1793",
    nienDai: "1743 – 1793",
    queQuan: "Thôn Kiên Mỹ, ấp Kiên Thành, huyện Tuy Viễn, phủ Quy Nhơn (gốc Hưng Nguyên, Nghệ An); nay là làng Kiên Mỹ, thị trấn Phú Phong, huyện Tây Sơn, Bình Định",
    thoiKy: "tay-son",
    trieuDai: "Tây Sơn",
    namMoc: 1771,
    tomTat: "Người anh cả trong ba anh em Tây Sơn, dựng cờ khởi nghĩa năm 1771 và lên ngôi Hoàng đế năm 1778, mở đầu vương triều Tây Sơn.",
    tieuSu: [
      "Nguyễn Nhạc vốn gốc họ Hồ, tục gọi Biện Nhạc, anh Hai Trầu, sinh năm Quý Hợi (1743). Năm 1771, ông cùng hai em là Nguyễn Huệ, Nguyễn Lữ dựng cờ khởi nghĩa ở Tây Sơn thượng đạo, chống ách quyền thần Trương Phúc Loan.",
      "Năm 1773, ông giả bị bắt, ngồi trong cũi trá hàng để đánh chiếm thành Quy Nhơn. Năm 1778, ông lên ngôi Hoàng đế, niên hiệu Thái Đức, xây thành Hoàng Đế, mở ra vương triều Tây Sơn; ông lãnh đạo các chiến dịch lật đổ cơ nghiệp chúa Nguyễn ở Đàng Trong.",
      "Năm 1786, ông cùng Nguyễn Huệ đem quân ra Thăng Long lật đổ chúa Trịnh, mở đầu việc xóa bỏ ranh giới Đàng Trong – Đàng Ngoài. Ông mất năm Quý Dậu (1793).",
    ],
    boiCanh: [
      "Giữa thế kỷ XVIII, đất nước chia cắt Đàng Trong – Đàng Ngoài; ở Đàng Trong, quyền thần Trương Phúc Loan lộng hành khiến đời sống nông dân cùng cực.",
    ],
    congTrang: [
      "Khởi xướng và lãnh đạo phong trào Tây Sơn từ năm 1771.",
      "Đánh chiếm thành Quy Nhơn năm 1773.",
      "Lên ngôi Hoàng đế năm 1778, lập vương triều Tây Sơn.",
      "Lật đổ chính quyền chúa Nguyễn ở Đàng Trong; cùng Nguyễn Huệ lật đổ chúa Trịnh năm 1786.",
    ],
    suKien: [
      {
        nam: "1743",
        text: "Sinh năm Quý Hợi.",
      },
      {
        nam: "1771",
        text: "Dựng cờ khởi nghĩa ở Tây Sơn thượng đạo.",
      },
      {
        nam: "1773",
        text: "Trá hàng, đánh chiếm thành Quy Nhơn.",
      },
      {
        nam: "1778",
        text: "Lên ngôi Hoàng đế, niên hiệu Thái Đức.",
      },
      {
        nam: "1786",
        text: "Cùng Nguyễn Huệ ra Thăng Long lật đổ chúa Trịnh.",
      },
      {
        nam: "1793",
        text: "Mất năm Quý Dậu.",
      },
    ],
    diTich: [
      {
        ten: "Điện thờ Tây Sơn Tam Kiệt, Bảo tàng Quang Trung (Quần thể di tích Khởi nghĩa Tây Sơn, di tích quốc gia đặc biệt)",
        diaDiem: "Thị trấn Phú Phong, huyện Tây Sơn, Bình Định",
      },
      {
        ten: "Quần thể di tích Tây Sơn thượng đạo (di tích quốc gia đặc biệt)",
        diaDiem: "Thị xã An Khê, Gia Lai",
      },
    ],
    tuongNiem: [
      "Được phối tế trong Lễ giỗ Tây Sơn Tam Kiệt ngày 29 tháng 7 âm lịch tại Bảo tàng Quang Trung.",
      "Lễ hội Đống Đa – Tây Sơn (di sản văn hóa phi vật thể quốc gia) ngày mùng 5 tháng Giêng âm lịch.",
    ],
    ghiChuSuLieu:
      "Năm 1787, xung đột giữa ông và Nguyễn Huệ dẫn đến việc Nguyễn Huệ vây thành Quy Nhơn. Sử học còn đánh giá việc ông dừng ở miền Trung, không truy quét triệt để lực lượng Nguyễn Ánh ở Nam Hà. Khẩu hiệu “Tây khởi nghĩa, Bắc thu công” và chuyện ông được ngựa quý, bảo kiếm ở Tây Sơn thượng đạo là truyền thuyết.",
    wikiTitle: "Nguyễn Nhạc",
    nguon: [
      "Đại Nam thực lục (Chính biên – Liệt truyện); Tây Sơn thuật lược; Khâm định Việt sử thông giám cương mục.",
      "Bảo tàng Quang Trung (Bình Định).",
    ],
  },
  {
    slug: "nguyen-lu",
    ten: "Nguyễn Lữ",
    tenThat: null,
    tenKhac: ["Thầy Tư Lữ", "Đông Định vương"],
    namSinh: "khoảng 1754",
    namMat: "khoảng 1787",
    nienDai: "khoảng 1754 – 1787",
    queQuan: "Thôn Kiên Mỹ, phủ Quy Nhơn (gốc Hưng Nguyên, Nghệ An); nay là làng Kiên Mỹ, thị trấn Phú Phong, huyện Tây Sơn, Bình Định",
    thoiKy: "tay-son",
    trieuDai: "Tây Sơn",
    namMoc: 1776,
    tomTat: "Người em út trong ba anh em Tây Sơn, chỉ huy thủy quân đánh chiếm Gia Định năm 1776 và được phong Đông Định vương trấn giữ đất Gia Định.",
    tieuSu: [
      "Nguyễn Lữ vốn gốc họ Hồ, tục gọi Thầy Tư Lữ, sinh khoảng năm Giáp Tuất (1754). Năm 1771, ông cùng hai anh Nguyễn Nhạc, Nguyễn Huệ khởi xướng phong trào Tây Sơn.",
      "Năm 1776, ông chỉ huy thủy quân đánh chiếm thành Gia Định lần thứ nhất, thu kho tàng bổ sung quân lương. Năm 1783, ông cùng Nguyễn Huệ đánh tan lực lượng của Nguyễn Ánh ở Nam Bộ. Năm 1786, ông được phong Đông Định vương, trấn giữ vùng Gia Định.",
      "Năm 1787, khi Nguyễn Ánh phản công, ông rút khỏi Gia Định về Quy Nhơn và mất không lâu sau đó (cuối năm 1787 hoặc đầu năm 1788).",
    ],
    boiCanh: [
      "Trong những năm 1776 – 1787, vùng Gia Định nhiều lần đổi chủ giữa quân Tây Sơn và lực lượng Nguyễn Ánh.",
    ],
    congTrang: [
      "Cùng hai anh khởi xướng phong trào Tây Sơn năm 1771.",
      "Chỉ huy thủy quân đánh chiếm Gia Định năm 1776.",
      "Cùng Nguyễn Huệ đánh tan lực lượng Nguyễn Ánh ở Nam Bộ năm 1783.",
    ],
    suKien: [
      {
        nam: "1771",
        text: "Cùng hai anh khởi nghĩa Tây Sơn.",
      },
      {
        nam: "1776",
        text: "Chỉ huy thủy quân chiếm thành Gia Định lần thứ nhất.",
      },
      {
        nam: "1783",
        text: "Cùng Nguyễn Huệ đánh tan lực lượng Nguyễn Ánh ở Nam Bộ.",
      },
      {
        nam: "1786",
        text: "Được phong Đông Định vương, trấn giữ Gia Định.",
      },
      {
        nam: "1787",
        text: "Rút khỏi Gia Định về Quy Nhơn; mất cuối năm 1787 hoặc đầu năm 1788.",
      },
    ],
    diTich: [
      {
        ten: "Điện thờ Tây Sơn Tam Kiệt, Bảo tàng Quang Trung (di tích quốc gia đặc biệt)",
        diaDiem: "Thị trấn Phú Phong, huyện Tây Sơn, Bình Định",
      },
    ],
    tuongNiem: [
      "Không có ngày giỗ riêng; ông được phối tế trong Lễ giỗ Tây Sơn Tam Kiệt ngày 29 tháng 7 âm lịch tại Bảo tàng Quang Trung.",
      "Phối hưởng tại Lễ hội Đống Đa – Tây Sơn ngày mùng 5 tháng Giêng âm lịch.",
    ],
    ghiChuSuLieu:
      "Năm mất dao động giữa cuối 1787 và đầu 1788. Sử sách đánh giá ông yếu nhất về quân sự trong ba anh em, tính thiên về tu hành; việc bỏ Gia Định năm 1787 khiến ông chịu nhiều phê phán. Tương truyền, ông theo Minh giáo, dùng thảo dược chữa bệnh cho dân nghèo, và sáng tạo bài Hùng Kê Quyền của võ cổ truyền Bình Định sau khi xem gà chọi.",
    wikiTitle: "Nguyễn Lữ",
    nguon: [
      "Đại Nam thực lục.",
      "Nguyễn Khắc Thuần, Danh tướng Việt Nam.",
      "Quách Tấn, Quách Giao, Tây Sơn tam kiệt.",
      "Bảo tàng Quang Trung (Bình Định).",
    ],
  },
  {
    slug: "bui-thi-xuan",
    ten: "Bùi Thị Xuân",
    tenThat: null,
    tenKhac: ["Đô đốc Bùi Thị Xuân"],
    namSinh: "khoảng 1752",
    namMat: "1802",
    nienDai: "khoảng 1752 – 1802",
    queQuan: "Thôn Xuân Hòa, tổng An Nhơn, huyện Tuy Viễn, phủ Quy Nhơn; nay thuộc xã Tây Xuân, huyện Tây Sơn, Bình Định",
    thoiKy: "tay-son",
    trieuDai: "Tây Sơn",
    namMoc: 1785,
    tomTat: "Nữ tướng triều Tây Sơn, giữ chức Đô đốc, huấn luyện đội tượng binh và cùng chồng là Trần Quang Diệu chiến đấu chống quân Nguyễn Ánh đến khi bị bắt năm 1802.",
    tieuSu: [
      "Bùi Thị Xuân quê ở thôn Xuân Hòa, huyện Tuy Viễn, phủ Quy Nhơn; thuyết phổ biến ghi bà sinh khoảng năm 1752. Bà giữ chức Đô đốc dưới triều Tây Sơn và được dân gian suy tôn đứng đầu hàng “Tây Sơn ngũ phụng thư”.",
      "Bà trực tiếp huấn luyện đội tượng binh của nghĩa quân Tây Sơn, tham gia chiến dịch Rạch Gầm – Xoài Mút năm 1785 và chỉ huy một cánh quân tượng binh trong trận đại phá quân Thanh ở Ngọc Hồi – Đống Đa năm 1789.",
      "Những năm cuối triều Tây Sơn, bà tham gia chỉ huy trận Trấn Ninh (1801), rồi cùng chồng là Trần Quang Diệu chiến đấu chống quân Nguyễn Ánh ở Nghệ An. Năm 1802, bà bị bắt và bị Nguyễn Ánh xử voi giày vào tháng 11 năm ấy.",
    ],
    boiCanh: [
      "Bà hoạt động trong phong trào Tây Sơn từ thời Thái Đức (Nguyễn Nhạc) đến thời Cảnh Thịnh (Nguyễn Quang Toản), giai đoạn quân Tây Sơn giao tranh với lực lượng Nguyễn Ánh.",
    ],
    congTrang: [
      "Tham gia chiến dịch Rạch Gầm – Xoài Mút đánh tan liên quân Xiêm – Nguyễn Ánh năm 1785.",
      "Trực tiếp huấn luyện đội tượng binh của nghĩa quân Tây Sơn.",
      "Chỉ huy một cánh quân tượng binh trong trận Ngọc Hồi – Đống Đa năm 1789.",
      "Tham gia chỉ huy trận Trấn Ninh năm 1801; cùng Trần Quang Diệu chiến đấu chống quân Nguyễn Ánh ở Nghệ An năm 1802.",
    ],
    suKien: [
      {
        nam: "khoảng 1752",
        text: "Sinh ở thôn Xuân Hòa, phủ Quy Nhơn (theo thuyết phổ biến).",
      },
      {
        nam: "1785",
        text: "Tham gia chiến dịch Rạch Gầm – Xoài Mút.",
      },
      {
        nam: "1789",
        text: "Chỉ huy một cánh quân tượng binh ở Ngọc Hồi – Đống Đa.",
      },
      {
        nam: "1801",
        text: "Tham gia chỉ huy trận Trấn Ninh.",
      },
      {
        nam: "1802",
        text: "Chiến đấu ở Nghệ An, bị bắt và bị xử voi giày vào tháng 11.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Đô đốc Bùi Thị Xuân (di tích lịch sử cấp tỉnh)",
        diaDiem: "Thôn Xuân Hòa, xã Tây Xuân, huyện Tây Sơn, Bình Định",
      },
      {
        ten: "Bảo tàng Quang Trung (di tích quốc gia đặc biệt)",
        diaDiem: "Thị trấn Phú Phong, huyện Tây Sơn, Bình Định",
      },
    ],
    tuongNiem: [
      "Giỗ dân gian ngày mùng 5 tháng 5 âm lịch.",
      "Được phối thờ trong lễ kỷ niệm Chiến thắng Ngọc Hồi – Đống Đa mùng 4 – 5 tháng Giêng âm lịch tại huyện Tây Sơn, Bình Định (lễ hội cấp quốc gia).",
    ],
    ghiChuSuLieu:
      "Năm sinh chưa có văn bản chính sử khẳng định; 1752 là thuyết phổ biến. Tương truyền bà có nhan sắc, võ nghệ cao cường, từng múa kiếm giết hổ dữ cứu tráng sĩ Trần Quang Diệu ở rừng An Khê rồi kết duyên vợ chồng; các chiến tích võ nghệ cá nhân và chuyện chém hổ phần nhiều xuất phát từ dã sử, văn nghệ dân gian.",
    wikiTitle: "Bùi Thị Xuân",
    nguon: ["Đại Nam thực lục; Đại Nam chính biên liệt truyện.", "Cổng thông tin điện tử Sở Văn hóa và Thể thao tỉnh Bình Định."],
  },
  {
    slug: "tran-quang-dieu",
    ten: "Trần Quang Diệu",
    tenThat: null,
    tenKhac: ["Thiếu phó Trần Quang Diệu"],
    namSinh: "khoảng 1760",
    namMat: "1802",
    nienDai: "khoảng 1760 – 1802",
    queQuan: "Làng Nam Lãng, huyện Mộ Hoa (sau là Mộ Đức), phủ Tư Nghĩa; nay thuộc xã Đức Hòa, huyện Mộ Đức, Quảng Ngãi",
    thoiKy: "tay-son",
    trieuDai: "Tây Sơn",
    namMoc: 1789,
    tomTat: "Danh tướng triều Tây Sơn, một trong “Tây Sơn thất hổ tướng”, thống lĩnh trung quân năm 1789, vây thành Quy Nhơn năm 1800 – 1801 và giữ khí tiết đến khi bị xử tử năm 1802.",
    tieuSu: [
      "Trần Quang Diệu quê làng Nam Lãng, huyện Mộ Hoa, phủ Tư Nghĩa (Quảng Ngãi), sinh khoảng năm 1760. Ông là một trong “Tây Sơn thất hổ tướng”, lần lượt giữ các chức Đô đốc, Đại đô đốc, Thiếu phó.",
      "Năm 1789, với chức Đô đốc, ông thống lĩnh trung quân Tây Sơn trong chiến dịch thần tốc tiến ra Thăng Long. Từ năm 1792, dưới triều Cảnh Thịnh, ông giữ chức Thiếu phó, Phụ chính đại thần, tìm cách hòa giải mâu thuẫn giữa các phe phái trong triều.",
      "Năm 1800 – 1801, ông cùng Võ Văn Dũng vây thành Quy Nhơn do Võ Tánh cố thủ suốt hơn một năm. Năm 1802, sau khi Quy Nhơn thất thủ, ông tìm đường hội quân cứu Thăng Long thì bị quân Nguyễn bắt; ông không khuất phục Gia Long và bị xử tử cùng năm.",
    ],
    boiCanh: [
      "Dưới triều Cảnh Thịnh (từ năm 1792), nội bộ triều Tây Sơn có mâu thuẫn giữa các phe phái, trong khi lực lượng Nguyễn Ánh giao tranh với quân Tây Sơn ở Quy Nhơn.",
    ],
    congTrang: [
      "Thống lĩnh trung quân Tây Sơn trong chiến dịch tiến ra Thăng Long năm 1789.",
      "Làm Thiếu phó, Phụ chính đại thần triều Cảnh Thịnh, hòa giải mâu thuẫn nội bộ (1792 – 1800).",
      "Cùng Võ Văn Dũng vây thành Quy Nhơn hơn một năm (1800 – 1801).",
      "Bị bắt năm 1802, giữ khí tiết, không khuất phục Gia Long.",
    ],
    suKien: [
      {
        nam: "khoảng 1760",
        text: "Sinh ở làng Nam Lãng, huyện Mộ Hoa.",
      },
      {
        nam: "1789",
        text: "Thống lĩnh trung quân trong chiến dịch tiến ra Thăng Long.",
      },
      {
        nam: "1792",
        text: "Làm Thiếu phó, Phụ chính đại thần triều Cảnh Thịnh.",
      },
      {
        nam: "1800",
        text: "Cùng Võ Văn Dũng vây thành Quy Nhơn do Võ Tánh cố thủ.",
      },
      {
        nam: "1802",
        text: "Bị quân Nguyễn bắt và bị xử tử.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Trần Quang Diệu (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Đức Hòa, huyện Mộ Đức, Quảng Ngãi",
      },
      {
        ten: "Điện Tây Sơn (di tích quốc gia đặc biệt)",
        diaDiem: "Huyện Tây Sơn, Bình Định",
      },
    ],
    tuongNiem: ["Phối giỗ cùng Bùi Thị Xuân ngày mùng 5 tháng 5 âm lịch.", "Giỗ ngày mùng 10 tháng 8 âm lịch tại Quảng Ngãi."],
    ghiChuSuLieu:
      "Về quê quán, có thuyết cho rằng gốc ông ở làng An Lương, huyện Hoài Ân (Bình Định), sau mới di cư vào Quảng Ngãi. Tương truyền ông là kiếm khách giỏi song kiếm, khi bị thương nặng ở rừng Tuy Viễn được nữ tướng Bùi Thị Xuân cứu sống.",
    wikiTitle: "Trần Quang Diệu",
    nguon: ["Đại Nam liệt truyện tiền biên; Đại Nam thực lục.", "Cổng thông tin điện tử tỉnh Quảng Ngãi."],
  },
  {
    slug: "ngo-thi-nham",
    ten: "Ngô Thì Nhậm",
    tenThat: null,
    tenKhac: ["Ngô Thời Nhiệm", "Hy Doãn", "Đạt Hiên", "Tĩnh Phái hầu"],
    namSinh: "1746",
    namMat: "1803",
    nienDai: "1746 – 1803",
    queQuan: "Làng Tả Thanh Oai (làng Tó), huyện Thanh Oai, trấn Sơn Nam Thượng; nay thuộc xã Tả Thanh Oai, huyện Thanh Trì, Hà Nội",
    thoiKy: "tay-son",
    trieuDai: "Tây Sơn",
    namMoc: 1788,
    tomTat: "Nhà nho đỗ Tiến sĩ thời Lê – Trịnh, sau phò Tây Sơn, giữ chức Binh bộ Thượng thư, đề xuất việc lui quân về Tam Điệp – Biện Sơn năm 1788 và phụ trách bang giao với nhà Thanh.",
    tieuSu: [
      "Ngô Thì Nhậm (thường đọc là Ngô Thời Nhiệm), tự Hy Doãn, hiệu Đạt Hiên, sinh năm 1746 ở làng Tả Thanh Oai (làng Tó). Ông đỗ Tiến sĩ khoa Ất Mùi (1775) và từng làm Đốc đồng Thái Nguyên thời Lê – Trịnh.",
      "Năm 1788, ông được Nguyễn Huệ trọng dụng, phong Lại bộ Tả thị lang, sau thăng Binh bộ Thượng thư, tước Tĩnh Phái hầu. Khi quân Thanh kéo sang, ông đề xuất rút quân về lập phòng tuyến Tam Điệp – Biện Sơn, bảo toàn lực lượng chờ đại quân Quang Trung ra phản công.",
      "Từ năm 1789 đến 1792, ông phụ trách công việc bang giao với nhà Thanh, góp phần để vua Càn Long công nhận triều Tây Sơn. Năm 1803, sau khi bị Đặng Trần Thường cho đánh đòn tại Văn Miếu, ông mất ngày 15 tháng 2 năm Quý Hợi.",
    ],
    boiCanh: [
      "Cuối thế kỷ XVIII, khi quân Thanh kéo sang (1788), quân Tây Sơn ở Bắc Hà lui về lập phòng tuyến Tam Điệp – Biện Sơn theo kế sách do ông đề xuất.",
    ],
    congTrang: [
      "Được Nguyễn Huệ trọng dụng năm 1788, giữ chức Lại bộ Tả thị lang rồi Binh bộ Thượng thư.",
      "Đề xuất lui quân về phòng tuyến Tam Điệp – Biện Sơn (1788 – 1789), bảo toàn lực lượng chờ đại quân phản công.",
      "Phụ trách bang giao với nhà Thanh (1789 – 1792), góp phần để vua Càn Long công nhận triều Tây Sơn.",
    ],
    suKien: [
      {
        nam: "1746",
        text: "Sinh ở làng Tả Thanh Oai.",
      },
      {
        nam: "1775",
        text: "Đỗ Tiến sĩ khoa Ất Mùi.",
      },
      {
        nam: "1788",
        text: "Được Nguyễn Huệ trọng dụng; đề xuất lui quân về Tam Điệp – Biện Sơn.",
      },
      {
        nam: "1789",
        text: "Bắt đầu phụ trách bang giao với nhà Thanh.",
      },
      {
        nam: "1803",
        text: "Mất ngày 15 tháng 2 năm Quý Hợi, sau trận đòn tại Văn Miếu.",
      },
    ],
    diTich: [
      {
        ten: "Nhà thờ dòng họ Ngô Thì (di tích lịch sử – văn hóa cấp quốc gia)",
        diaDiem: "Thôn Tả Thanh Oai, xã Tả Thanh Oai, huyện Thanh Trì, Hà Nội",
      },
    ],
    tuongNiem: ["Giỗ ngày 15 tháng 2 âm lịch hằng năm tại nhà thờ dòng họ Ngô Thì (Tả Thanh Oai)."],
    ghiChuSuLieu:
      "Còn tranh luận về trách nhiệm thực sự của ông trong vụ án Đặng Thị Huệ – Trịnh Tông năm Canh Tý (1780), và về nguyên nhân ông mất: do đòn roi tẩm độc hay do bệnh lao phổi tái phát sau trận đòn. Tương truyền tại sân Văn Miếu, Đặng Trần Thường ra vế đối “Ai công hầu, ai khanh tướng, trong trần ai, ai dễ biết ai”, ông đối lại “Thế chiến quốc, thế Xuân Thu, gặp thời thế, thế nào phải thế”.",
    wikiTitle: "Ngô Thì Nhậm",
    nguon: ["Khâm định Việt sử thông giám cương mục; Đại Nam chính biên liệt truyện; Ngô gia văn phái lục.", "Cổng thông tin điện tử huyện Thanh Trì."],
  },
  {
    slug: "nguyen-tri-phuong",
    ten: "Nguyễn Tri Phương",
    tenThat: "Nguyễn Văn Chương",
    tenKhac: ["Hàm Trinh", "Đồng Xuyên", "Tráng Liệt Vũ công"],
    namSinh: "1800",
    namMat: "1873",
    nienDai: "1800 – 1873",
    queQuan: "Làng Đường Long, tổng Trung Lộc, huyện Phong Điền, phủ Thừa Thiên; nay thuộc xã Phong Hiền, huyện Phong Điền, Thừa Thiên Huế",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1858,
    tomTat: "Đại thần triều Nguyễn, chỉ huy chống liên quân Pháp – Tây Ban Nha ở Đà Nẵng (1858 – 1859), xây đại đồn Chí Hòa ở Gia Định và tuẫn tiết sau khi thành Hà Nội thất thủ năm 1873.",
    tieuSu: [
      "Nguyễn Tri Phương tên thật là Nguyễn Văn Chương, được vua Tự Đức đổi tên; tự Hàm Trinh, hiệu Đồng Xuyên. Ông sinh năm 1800, làm quan qua ba triều Minh Mạng, Thiệu Trị, Tự Đức, giữ các chức Hiệp biện Đại học sĩ, Kinh lược sứ.",
      "Từ năm 1845 đến 1853, ông lo việc tiễu phỉ ở biên giới Tây Nam, mở mang đồn điền và ổn định hành chính Nam Kỳ. Năm 1858 – 1859, ông chỉ huy quân dân chống liên quân Pháp – Tây Ban Nha ở mặt trận Đà Nẵng bằng chiến thuật vây hãm, đẩy lùi chiến lược “đánh nhanh thắng nhanh” của đối phương; năm 1860 – 1861, ông xây dựng đại đồn Chí Hòa ở Gia Định.",
      "Năm 1873, với chức Tổng đốc quân vụ Bắc Kỳ, ông chỉ huy phòng thủ thành Hà Nội trước cuộc tấn công của Francis Garnier ngày 20/11/1873. Ông bị trọng thương, tuyệt thực, không chịu chữa trị và mất ngày 20/12/1873 (mùng 1 tháng 11 năm Quý Dậu).",
    ],
    boiCanh: ["Từ năm 1858, liên quân Pháp – Tây Ban Nha nổ súng ở Đà Nẵng rồi đánh vào Gia Định; năm 1873, Francis Garnier đem quân đánh thành Hà Nội."],
    congTrang: [
      "Chỉ huy quân dân chống liên quân Pháp – Tây Ban Nha ở mặt trận Đà Nẵng (1858 – 1859).",
      "Tiễu phỉ ở biên giới Tây Nam, mở mang đồn điền, ổn định hành chính Nam Kỳ (1845 – 1853).",
      "Xây dựng đại đồn Chí Hòa ở Gia Định (1860 – 1861).",
      "Chỉ huy phòng thủ thành Hà Nội năm 1873; bị thương, tuyệt thực và tuẫn tiết.",
    ],
    suKien: [
      {
        nam: "1800",
        text: "Sinh ở làng Đường Long, huyện Phong Điền.",
      },
      {
        nam: "1845",
        text: "Tiễu phỉ, mở mang đồn điền ở Nam Kỳ (đến năm 1853).",
      },
      {
        nam: "1858",
        text: "Chỉ huy chống liên quân Pháp – Tây Ban Nha ở Đà Nẵng.",
      },
      {
        nam: "1860",
        text: "Xây dựng đại đồn Chí Hòa ở Gia Định.",
      },
      {
        nam: "1873",
        text: "Giữ thành Hà Nội trước cuộc tấn công của Garnier (20/11); bị thương, tuyệt thực và mất ngày 20/12.",
      },
    ],
    diTich: [
      {
        ten: "Đền Trung Liệt",
        diaDiem: "Gò Đống Đa, Hà Nội",
      },
      {
        ten: "Nhà thờ họ Nguyễn Tri (di tích lịch sử cấp quốc gia)",
        diaDiem: "Thôn Đường Long, xã Phong Hiền, huyện Phong Điền, Thừa Thiên Huế",
      },
    ],
    tuongNiem: ["Giỗ ngày mùng 1 tháng 11 âm lịch hằng năm tại Huế và Hà Nội.", "Được thờ tại đền Trung Liệt (gò Đống Đa, Hà Nội)."],
    ghiChuSuLieu:
      "Một số nhận định cho rằng chiến thuật phòng thủ công sự ở đại đồn Chí Hòa còn thụ động, và việc bố phòng thành Hà Nội năm 1873 bị động. Tương truyền khi Garnier cho thầy thuốc đến chữa vết thương và ép ăn uống, ông gạt đi và nói: “Bây giờ nếu ta chỉ gắng gượng kéo dài hơi tàn, thì chẳng qua cũng như con chó sống mà thôi, sao bằng chết vì nước!”.",
    wikiTitle: "Nguyễn Tri Phương",
    nguon: ["Đại Nam thực lục; Đại Nam chính biên liệt truyện.", "Cổng thông tin điện tử tỉnh Thừa Thiên Huế."],
  },
  {
    slug: "hoang-dieu",
    ten: "Hoàng Diệu",
    tenThat: "Hoàng Kim Tích",
    tenKhac: ["Quang Viễn", "Tĩnh Trai"],
    namSinh: "1829",
    namMat: "1882",
    nienDai: "1829 – 1882",
    queQuan: "Làng Xuân Đài, tổng Hạ Nông, huyện Diên Phước, phủ Điện Bàn, Quảng Nam; nay thuộc xã Điện Quang, thị xã Điện Bàn, Quảng Nam",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1882,
    tomTat: "Tổng đốc Hà Ninh thời Tự Đức, chỉ huy giữ thành Hà Nội khi Henri Rivière tấn công ngày 25/4/1882 và tuẫn tiết khi thành thất thủ.",
    tieuSu: [
      "Hoàng Diệu tên cũ là Hoàng Kim Tích, tự Quang Viễn, hiệu Tĩnh Trai, sinh năm 1829. Ông đỗ Phó bảng năm Tự Đức thứ 6 (1853), làm quan thanh liêm, kinh qua nhiều chức vụ ở Nam Định, Bắc Ninh, Quảng Nam.",
      "Từ năm 1880, giữ chức Tổng đốc Hà Ninh (Hà Nội – Ninh Bình), ông củng cố công sự, chỉnh đốn binh bị. Ngày 25/4/1882, khi Henri Rivière nổ súng đánh thành Hà Nội, ông lên mặt thành chỉ huy binh lính chiến đấu suốt buổi sáng.",
      "Khi kho thuốc súng bị nội gián làm nổ và thành thất thủ, ông vào hành cung viết di biểu tạ tội gửi vua Tự Đức rồi thắt cổ tự vẫn trước Võ Miếu, ngày mùng 8 tháng 3 năm Nhâm Ngọ.",
    ],
    boiCanh: ["Đầu thập niên 1880, thực dân Pháp chuẩn bị đánh chiếm Bắc Kỳ; năm 1882, Henri Rivière đem quân tấn công thành Hà Nội."],
    congTrang: [
      "Chỉ huy giữ thành Hà Nội trước cuộc tấn công của Henri Rivière ngày 25/4/1882.",
      "Củng cố công sự, chỉnh đốn binh bị ở Hà Ninh (1880 – 1882).",
      "Làm quan thanh liêm ở Nam Định, Bắc Ninh, Quảng Nam.",
      "Tuẫn tiết trước Võ Miếu khi thành thất thủ.",
    ],
    suKien: [
      {
        nam: "1829",
        text: "Sinh ở làng Xuân Đài, huyện Diên Phước.",
      },
      {
        nam: "1853",
        text: "Đỗ Phó bảng năm Tự Đức thứ 6.",
      },
      {
        nam: "1880",
        text: "Giữ chức Tổng đốc Hà Ninh.",
      },
      {
        nam: "1882",
        text: "Chỉ huy giữ thành Hà Nội ngày 25/4; thành thất thủ, ông tuẫn tiết.",
      },
    ],
    diTich: [
      {
        ten: "Cửa Bắc (Bắc Môn), thuộc Khu trung tâm Hoàng thành Thăng Long (di tích quốc gia đặc biệt)",
        diaDiem: "Hà Nội",
      },
      {
        ten: "Nhà lưu niệm Hoàng Diệu (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Điện Quang, thị xã Điện Bàn, Quảng Nam",
      },
    ],
    tuongNiem: ["Giỗ ngày mùng 8 tháng 3 âm lịch hằng năm tại Cửa Bắc (Hà Nội) và Điện Bàn (Quảng Nam)."],
    ghiChuSuLieu:
      "Còn bàn luận về trách nhiệm của các võ quan dưới quyền bỏ trốn hoặc thông đồng với Pháp gây nổ kho đạn. Tương truyền ông cắn ngón tay lấy máu viết huyết thư tạ tội trước khi tuẫn tiết; thực tế bản di biểu được thảo bằng bút mực.",
    wikiTitle: "Hoàng Diệu",
    nguon: ["Đại Nam thực lục; Quốc triều chánh biên toát yếu.", "Ban Quản lý Di tích Hoàng thành Thăng Long."],
  },
  {
    slug: "ton-that-thuyet",
    ten: "Tôn Thất Thuyết",
    tenThat: null,
    tenKhac: ["Đàm Nhân"],
    namSinh: "1839",
    namMat: "1913",
    nienDai: "1839 – 1913",
    queQuan: "Làng Phú Mộng, huyện Hương Trà, phủ Thừa Thiên; nay thuộc phường Kim Long, thành phố Huế, Thừa Thiên Huế",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1885,
    tomTat: "Phụ chính đại thần, Binh bộ Thượng thư triều Nguyễn, đứng đầu phái chủ chiến, chỉ huy cuộc tấn công quân Pháp ở kinh thành Huế năm 1885 và nhân danh vua Hàm Nghi ban Chiếu Cần Vương.",
    tieuSu: [
      "Tôn Thất Thuyết, tự Đàm Nhân, sinh ngày 12/5/1839 ở làng Phú Mộng (Huế). Trong thập niên 1870, ông dẹp các nhóm thổ phỉ tàn dư Thái Bình Thiên Quốc (giặc Cờ Vàng, Cờ Trắng) ở biên giới phía Bắc.",
      "Giữ chức Phụ chính đại thần, Binh bộ Thượng thư, ông đứng đầu phái chủ chiến trong triều đình Huế, chống lại các hòa ước với Pháp. Đêm 4 rạng sáng 5/7/1885, ông chỉ huy cuộc tập kích đồn Mang Cá và Tòa Khâm sứ Pháp ở kinh thành Huế.",
      "Ngày 13/7/1885, ở căn cứ Tân Sở (Quảng Trị), ông nhân danh vua Hàm Nghi ban Chiếu Cần Vương, mở đầu phong trào Cần Vương trong cả nước. Năm 1886, ông sang Trung Quốc cầu viện và mất năm 1913 tại Long Châu (có thuyết ghi Thiều Châu), Trung Quốc.",
    ],
    boiCanh: ["Sau Hiệp ước Giáp Thân (1884), triều đình Huế chia thành phái chủ hòa và phái chủ chiến trước sức ép của thực dân Pháp."],
    congTrang: [
      "Chỉ huy cuộc tập kích đồn Mang Cá và Tòa Khâm sứ Pháp ở kinh thành Huế đêm 4 rạng sáng 5/7/1885.",
      "Dẹp các nhóm thổ phỉ Cờ Vàng, Cờ Trắng ở biên giới phía Bắc (thập niên 1870).",
      "Đứng đầu phái chủ chiến trong triều đình Huế.",
      "Đưa vua Hàm Nghi ra Tân Sở, nhân danh nhà vua ban Chiếu Cần Vương ngày 13/7/1885.",
    ],
    suKien: [
      {
        nam: "1839",
        text: "Sinh ngày 12/5 ở làng Phú Mộng.",
      },
      {
        nam: "Thập niên 1870",
        text: "Dẹp thổ phỉ Cờ Vàng, Cờ Trắng ở biên giới phía Bắc.",
      },
      {
        nam: "1885",
        text: "Đêm 4 rạng sáng 5/7 tập kích quân Pháp ở kinh thành Huế; ngày 13/7 ban Chiếu Cần Vương ở Tân Sở.",
      },
      {
        nam: "1886",
        text: "Sang Trung Quốc cầu viện.",
      },
      {
        nam: "1913",
        text: "Mất tại Long Châu (có thuyết ghi Thiều Châu), Trung Quốc.",
      },
    ],
    diTich: [
      {
        ten: "Nhà thờ phủ Tôn Thất Thuyết",
        diaDiem: "Phường Kim Long, thành phố Huế, Thừa Thiên Huế",
      },
      {
        ten: "Di tích Căn cứ Tân Sở (phối thờ)",
        diaDiem: "Xã Cam Chính, huyện Cam Lộ, Quảng Trị",
      },
    ],
    tuongNiem: ["Giỗ ngày 22 tháng 3 âm lịch (theo gia phả Tôn Thất tộc ở Huế).", "Được phối thờ tại di tích Căn cứ Tân Sở (Quảng Trị)."],
    ghiChuSuLieu:
      "Việc phế truất và bức tử liên tiếp ba vua Dục Đức, Hiệp Hòa, Kiến Phúc trong chưa đầy một năm, và việc ông sang Trung Quốc cầu viện năm 1886, để lại lực lượng kháng chiến trong nước, là những điểm còn nhiều tranh luận. Tương truyền ông tính khí dữ dằn, quyền uy phế lập khiến người đương thời khiếp sợ.",
    wikiTitle: "Tôn Thất Thuyết",
    nguon: ["Đại Nam thực lục; Đại Nam thực lục chính biên đệ lục kỷ phụ biên.", "Việt Nam sử lược."],
  },
  {
    slug: "ham-nghi",
    ten: "Hàm Nghi",
    tenThat: "Nguyễn Phúc Ưng Lịch",
    tenKhac: ["Nguyễn Phúc Minh", "Vua Hàm Nghi"],
    namSinh: "1871",
    namMat: "1944",
    nienDai: "1871 – 1944",
    queQuan: "Sinh tại phủ đệ ở làng Xuân Hòa, phủ Thừa Thiên; nay thuộc phường Hương Long, thành phố Huế, Thừa Thiên Huế",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1885,
    tomTat: "Hoàng đế thứ tám triều Nguyễn (1884 – 1885), rời kinh thành ban Chiếu Cần Vương năm 1885, bị bắt năm 1888 và sống lưu đày ở Algérie đến khi mất.",
    tieuSu: [
      "Hàm Nghi tên thật là Nguyễn Phúc Ưng Lịch, khi lên ngôi đổi là Nguyễn Phúc Minh, sinh năm 1871. Tháng 8/1884, ông được phái chủ chiến đưa lên ngôi, là hoàng đế thứ tám của triều Nguyễn, và giữ thái độ không thuần phục Tòa Khâm sứ Pháp.",
      "Ngày 13/7/1885, ông rời kinh thành, xuống Chiếu Cần Vương kêu gọi văn thân, sĩ phu và nhân dân cả nước đứng lên kháng chiến. Hơn ba năm sau đó (1885 – 1888), ông cùng phong trào Cần Vương hoạt động ở vùng núi Quảng Trị, Quảng Bình, Hà Tĩnh.",
      "Tháng 11/1888, ông bị Trương Quang Ngọc chỉ điểm và bị bắt. Ông từ chối hợp tác với Pháp, bị đày sang Algérie và sống lưu đày 56 năm, mất ngày 14/1/1944 tại Algiers.",
    ],
    boiCanh: ["Sau Hiệp ước Giáp Thân (1884), phái chủ chiến trong triều đình Huế do Tôn Thất Thuyết đứng đầu tìm cách kháng cự thực dân Pháp."],
    congTrang: [
      "Ban Chiếu Cần Vương ngày 13/7/1885, kêu gọi cả nước kháng chiến.",
      "Không thuần phục Tòa Khâm sứ Pháp khi ở ngôi (1884 – 1885).",
      "Cùng phong trào Cần Vương hoạt động ở vùng núi Quảng Trị, Quảng Bình, Hà Tĩnh (1885 – 1888).",
      "Từ chối hợp tác với Pháp sau khi bị bắt, chịu lưu đày ở Algérie.",
    ],
    suKien: [
      {
        nam: "1871",
        text: "Sinh ở Huế.",
      },
      {
        nam: "1884",
        text: "Được phái chủ chiến đưa lên ngôi (tháng 8).",
      },
      {
        nam: "1885",
        text: "Rời kinh thành, ban Chiếu Cần Vương ngày 13/7.",
      },
      {
        nam: "1888",
        text: "Bị bắt (tháng 11) và bị đày sang Algérie.",
      },
      {
        nam: "1944",
        text: "Mất ngày 14/1 tại Algiers.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ vua Hàm Nghi và các tướng sĩ Cần Vương, Khu căn cứ Tân Sở (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Cam Chính, huyện Cam Lộ, Quảng Trị",
      },
      {
        ten: "Thế Tổ Miếu (Đại Nội Huế)",
        diaDiem: "Thành phố Huế, Thừa Thiên Huế",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 14 tháng 1 dương lịch (ngày mất) hoặc ngày 28 tháng 11 âm lịch tại Căn cứ Tân Sở."],
    ghiChuSuLieu:
      "Còn bàn luận về mức độ tự quyết chính trị của vị vua trẻ so với ảnh hưởng của Tôn Thất Thuyết. Việc đưa di cốt ông từ làng Thonac (Dordogne, Pháp) về Việt Nam đến nay chưa thực hiện được. Tương truyền khi Trương Quang Ngọc xông vào bắt, ông nói: “Mày giết tao đi còn hơn là nộp tao cho Tây!”; khi viên quan Pháp chào “Tâu Hoàng thượng”, ông đáp: “Ta chỉ là một bề tôi trung thành của vua Hàm Nghi mà thôi”.",
    wikiTitle: "Hàm Nghi",
    nguon: ["Đại Nam thực lục chính biên đệ lục kỷ.", "Trung tâm Bảo tồn Di tích Cố đô Huế; Bảo tàng Lịch sử Quốc gia."],
  },
  {
    slug: "duy-tan",
    ten: "Duy Tân",
    tenThat: "Nguyễn Phúc Vĩnh San",
    tenKhac: ["Vua Duy Tân"],
    namSinh: "1900",
    namMat: "1945",
    nienDai: "1900 – 1945",
    queQuan: "Sinh tại Kinh thành Huế; nay thuộc thành phố Huế, Thừa Thiên Huế",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1916,
    tomTat: "Hoàng đế thứ mười một triều Nguyễn (1907 – 1916); năm 1916 cùng các lãnh tụ Việt Nam Quang Phục Hội chuẩn bị khởi nghĩa ở miền Trung, kế hoạch bại lộ, ông bị Pháp đày sang đảo Réunion.",
    tieuSu: [
      "Duy Tân tên thật là Nguyễn Phúc Vĩnh San, con thứ năm của vua Thành Thái, sinh năm 1900. Ông lên ngôi năm 1907 khi mới 7 tuổi, là hoàng đế thứ mười một của triều Nguyễn, và sớm tỏ ra không chịu sự giám sát chặt chẽ của Toàn quyền Pháp.",
      "Năm 1916, ông bí mật liên hệ với các lãnh tụ Việt Nam Quang Phục Hội là Thái Phiên, Trần Cao Vân để chuẩn bị một cuộc khởi nghĩa vũ trang ở miền Trung. Đêm 3/5/1916, ông rời Tử Cấm Thành ra căn cứ ngoài kinh thành để phát lệnh khởi nghĩa.",
      "Kế hoạch bại lộ, ông bị Pháp bắt. Ông từ chối trở lại ngai vàng và bị đày sang đảo Réunion (Ấn Độ Dương). Ông mất ngày 26/12/1945 trong một tai nạn máy bay ở Bangui (Cộng hòa Trung Phi); năm 1987, hài cốt ông được đưa từ Pháp về cải táng tại Huế.",
    ],
    boiCanh: ["Đầu thế kỷ XX, triều Nguyễn đặt dưới quyền bảo hộ của Pháp; ở miền Trung, Việt Nam Quang Phục Hội chuẩn bị khởi nghĩa vũ trang."],
    congTrang: [
      "Cùng Thái Phiên, Trần Cao Vân (Việt Nam Quang Phục Hội) chuẩn bị khởi nghĩa ở miền Trung năm 1916.",
      "Rời Tử Cấm Thành đêm 3/5/1916 để phát lệnh khởi nghĩa.",
      "Từ chối trở lại ngai vàng sau khi bị bắt, chịu lưu đày ở đảo Réunion.",
    ],
    suKien: [
      {
        nam: "1900",
        text: "Sinh tại Kinh thành Huế.",
      },
      {
        nam: "1907",
        text: "Lên ngôi khi 7 tuổi.",
      },
      {
        nam: "1916",
        text: "Đêm 3/5 rời Tử Cấm Thành để phát lệnh khởi nghĩa; kế hoạch bại lộ, ông bị bắt và bị đày sang đảo Réunion.",
      },
      {
        nam: "1945",
        text: "Mất ngày 26/12 trong một tai nạn máy bay ở Bangui.",
      },
      {
        nam: "1987",
        text: "Hài cốt được đưa từ Pháp về cải táng tại An Lăng (Huế).",
      },
    ],
    diTich: [
      {
        ten: "An Lăng (lăng Dục Đức), nơi cải táng hài cốt ông năm 1987 (thuộc Quần thể di tích Cố đô Huế, di tích quốc gia đặc biệt)",
        diaDiem: "Phường An Cựu, thành phố Huế, Thừa Thiên Huế",
      },
    ],
    tuongNiem: ["Giỗ ngày 23 tháng 11 âm lịch (hoặc 26/12 dương lịch) tại Huế."],
    ghiChuSuLieu:
      "Vụ tai nạn máy bay ngày 26/12/1945 là tai nạn hàng không thuần túy hay một vụ ám sát có chủ đích (khi tướng Charles de Gaulle có ý định đưa ông trở lại Việt Nam) đến nay vẫn còn tranh luận. Tương truyền lúc nhỏ, khi một viên quan Pháp hỏi “Nước bẩn thì lấy gì rửa?”, ông đáp: “Nước bẩn thì lấy máu mà rửa!”.",
    wikiTitle: "Duy Tân",
    nguon: ["Đại Nam thực lục chính biên đệ lục kỷ phụ biên.", "Tư liệu Hội đồng Hoàng tộc Nguyễn Phước tộc; Tạp chí Xưa & Nay."],
  },
  {
    slug: "thu-khoa-huan",
    ten: "Thủ Khoa Huân",
    tenThat: "Nguyễn Hữu Huân",
    tenKhac: ["Tảo Tư", "Trúc Khê"],
    namSinh: "1830",
    namMat: "1875",
    nienDai: "1830 – 1875",
    queQuan: "Làng Tịnh Hà, tổng Hưng Nhượng, huyện Kiến Hưng, phủ Kiến An, tỉnh Định Tường; nay thuộc xã Mỹ Tịnh An, huyện Chợ Gạo, Tiền Giang",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1861,
    tomTat: "Nhà nho đỗ Thủ khoa thi Hương năm 1852, ba lần dấy binh chống Pháp ở Định Tường; bị bắt và bị xử chém năm 1875.",
    tieuSu: [
      "Nguyễn Hữu Huân, tự Tảo Tư, hiệu Trúc Khê, sinh năm 1830 ở làng Tịnh Hà (Định Tường). Ông đỗ Thủ khoa kỳ thi Hương năm Nhâm Tý (1852) ở Gia Định nên thường được gọi tôn kính là Thủ Khoa Huân.",
      "Năm 1861, khi Pháp đánh chiếm Định Tường, ông bỏ chức Giáo thụ, mộ nghĩa binh đánh Pháp. Năm 1864, ông bị bắt và bị đày sang Guyane (Nam Mỹ); được ân xá trở về năm 1869, ông tiếp tục liên lạc với văn thân yêu nước để dấy binh.",
      "Từ năm 1872 đến 1875, ông lãnh đạo cuộc khởi nghĩa Bình Cách – Định Tường, đánh phá nhiều đồn bốt. Năm 1875, ông bị phản bội và bị bắt, không chịu quy hàng, bị xử chém ở ngã ba sông Chợ Gạo ngày 15 tháng 4 năm Ất Hợi (19/5/1875).",
    ],
    boiCanh: ["Từ năm 1861, thực dân Pháp đánh chiếm Định Tường; nhiều văn thân, sĩ phu Nam Kỳ đứng lên mộ quân kháng chiến."],
    congTrang: [
      "Bỏ chức Giáo thụ, mộ nghĩa binh đánh Pháp khi Định Tường bị chiếm (1861).",
      "Ba lần dấy binh khởi nghĩa, kể cả sau khi bị đày sang Guyane và được ân xá trở về (1869).",
      "Lãnh đạo khởi nghĩa Bình Cách – Định Tường (1872 – 1875), đánh phá nhiều đồn bốt.",
      "Không chịu quy hàng khi bị bắt năm 1875.",
    ],
    suKien: [
      {
        nam: "1830",
        text: "Sinh ở làng Tịnh Hà, tỉnh Định Tường.",
      },
      {
        nam: "1852",
        text: "Đỗ Thủ khoa kỳ thi Hương ở Gia Định.",
      },
      {
        nam: "1861",
        text: "Bỏ chức Giáo thụ, mộ nghĩa binh đánh Pháp.",
      },
      {
        nam: "1864",
        text: "Bị bắt, bị đày sang Guyane.",
      },
      {
        nam: "1869",
        text: "Được ân xá trở về, tiếp tục dấy binh.",
      },
      {
        nam: "1872",
        text: "Lãnh đạo khởi nghĩa Bình Cách – Định Tường.",
      },
      {
        nam: "1875",
        text: "Bị bắt, bị xử chém ngày 15 tháng 4 năm Ất Hợi.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ và mộ Thủ Khoa Huân (di tích lịch sử cấp quốc gia, công nhận năm 1987)",
        diaDiem: "Xã Hòa Tịnh, huyện Chợ Gạo, Tiền Giang",
      },
    ],
    tuongNiem: ["Lễ giỗ ngày 14 – 15 tháng 4 âm lịch hằng năm tại huyện Chợ Gạo, Tiền Giang (lễ hội truyền thống cấp tỉnh)."],
    ghiChuSuLieu:
      "Thời gian ông bị giam lỏng tại nhà Đỗ Hữu Phương ở Chợ Lớn trước khi trốn ra lãnh đạo cuộc khởi nghĩa lần thứ ba từng khiến một số sĩ phu đương thời hoài nghi về lập trường của ông. Tương truyền trước khi chịu chém, ông ung dung uống rượu, ngâm bài thơ tuyệt mệnh chữ Hán rồi thọ hình, khiến những người chứng kiến phải kính phục.",
    wikiTitle: "Nguyễn Hữu Huân",
    nguon: ["Đại Nam thực lục.", "Hợp tuyển thơ văn yêu nước Nam Bộ.", "Cổng thông tin điện tử tỉnh Tiền Giang."],
  },
  {
    slug: "thien-ho-duong",
    ten: "Thiên Hộ Dương",
    tenThat: "Võ Duy Dương",
    tenKhac: [],
    namSinh: "1827",
    namMat: "1866",
    nienDai: "1827 – 1866",
    queQuan: "Thôn Cù Lâm Tây, huyện Tuy Phước, phủ Quy Nhơn; nay thuộc thôn Nam Tượng 1, xã Nhơn Tân, thị xã An Nhơn, Bình Định",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1862,
    tomTat: "Thủ lĩnh kháng Pháp ở Nam Kỳ, xây dựng căn cứ Đồng Tháp Mười với đại bản doanh Gò Tháp những năm 1862 – 1866.",
    tieuSu: [
      "Võ Duy Dương sinh năm 1827 ở thôn Cù Lâm Tây, huyện Tuy Phước (Bình Định); do giữ chức Thiên hộ nên thường được gọi là Thiên Hộ Dương. Năm 1859, hưởng ứng hịch chiêu mộ nghĩa dũng, ông đem quân vào Nam Kỳ sát cánh cùng Trương Định đánh Pháp ở Gia Định.",
      "Từ năm 1862, ông xây dựng căn cứ Đồng Tháp Mười với đại bản doanh ở Gò Tháp, tổ chức quân ngũ kỷ luật nghiêm, đánh theo lối du kích đầm lầy và tự chế tạo súng. Ông nhận chiếu chỉ triều đình làm Khâm sai Tiết chế, Chánh Đề đốc, liên kết nghĩa hào ba tỉnh miền Tây Nam Kỳ.",
      "Tháng 4/1866, nghĩa quân của ông chống trả nhiều cuộc tấn công lớn của quân viễn chinh Pháp vào Đồng Tháp Mười. Theo chính sử, ông mất năm 1866 khi thuyền gặp bão hoặc bị cướp biển sát hại ở mũi Cần Giờ.",
    ],
    boiCanh: ["Sau khi Pháp chiếm các tỉnh miền Đông Nam Kỳ, vùng đầm lầy Đồng Tháp Mười trở thành căn cứ của nghĩa quân kháng Pháp."],
    congTrang: [
      "Xây dựng căn cứ Đồng Tháp Mười, đại bản doanh Gò Tháp (1862 – 1866).",
      "Đem quân vào Nam Kỳ cùng Trương Định đánh Pháp ở Gia Định (1859).",
      "Đánh du kích đầm lầy, tự chế tạo súng, chống trả nhiều cuộc tấn công lớn của quân Pháp tháng 4/1866.",
      "Làm Khâm sai Tiết chế, liên kết nghĩa hào ba tỉnh miền Tây Nam Kỳ.",
    ],
    suKien: [
      {
        nam: "1827",
        text: "Sinh ở thôn Cù Lâm Tây, huyện Tuy Phước.",
      },
      {
        nam: "1859",
        text: "Đem quân vào Nam Kỳ cùng Trương Định đánh Pháp.",
      },
      {
        nam: "1862",
        text: "Xây dựng căn cứ Đồng Tháp Mười, đại bản doanh Gò Tháp.",
      },
      {
        nam: "1866",
        text: "Tháng 4 chống trả các cuộc tấn công lớn của quân Pháp; ông mất cùng năm ở mũi Cần Giờ (theo chính sử).",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Thiên Hộ Dương, Khu di tích Gò Tháp (di tích quốc gia đặc biệt)",
        diaDiem: "Xã Tân Kiều, huyện Tháp Mười, Đồng Tháp",
      },
    ],
    tuongNiem: ["Lễ giỗ ngày 14 – 16 tháng 11 âm lịch hằng năm tại Khu di tích Gò Tháp (di sản văn hóa phi vật thể cấp quốc gia)."],
    ghiChuSuLieu:
      "Hoàn cảnh ông mất năm 1866 chưa thống nhất: có tài liệu ghi ông bị cướp biển sát hại ngoài khơi Cần Giờ khi vượt biển ra kinh đô; có thuyết cho rằng ông thoát được rồi bệnh mất hoặc lui về ở ẩn vùng biên giới Campuchia. Tương truyền ông có sức khỏe nâng được cối đá ngàn cân, huấn luyện cả ong vò vẽ và cá sấu đầm lầy để đánh lính Pháp.",
    wikiTitle: "Võ Duy Dương",
    nguon: ["Đại Nam thực lục.", "Ban Quản lý Khu di tích Gò Tháp; Báo Đồng Tháp điện tử."],
  },
  {
    slug: "dinh-cong-trang",
    ten: "Đinh Công Tráng",
    tenThat: null,
    tenKhac: [],
    namSinh: "1842",
    namMat: "1887",
    nienDai: "1842 – 1887",
    queQuan: "Làng Trinh Xá, huyện Thanh Liêm, phủ Lý Nhân, tỉnh Hà Nội; nay thuộc xã Thanh Tân, huyện Thanh Liêm, Hà Nam",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1886,
    tomTat: "Lãnh tụ khởi nghĩa Ba Đình trong phong trào Cần Vương, chỉ huy nghĩa quân giữ chiến lũy Ba Đình (Nga Sơn, Thanh Hóa) trước các đợt tấn công lớn của quân Pháp năm 1886 – 1887.",
    tieuSu: [
      "Đinh Công Tráng sinh năm 1842 ở làng Trinh Xá, huyện Thanh Liêm. Những năm 1882 – 1883, ông tham gia đánh Pháp ở Hà Nội dưới quyền Hoàng Tá Viêm.",
      "Hưởng ứng phong trào Cần Vương, năm 1886 – 1887 ông cùng Phạm Bành, Hoàng Bật Đạt xây dựng chiến lũy Ba Đình (Nga Sơn, Thanh Hóa), biến ba làng Thượng Thọ, Mậu Thịnh, Mỹ Khê thành cụm cứ điểm liên hoàn. Ông chỉ huy nghĩa quân đẩy lùi các đợt tấn công lớn của hơn 1.500 quân Pháp có đại bác vào tháng 12/1886 và tháng 1/1887.",
      "Đêm 20/1/1887, ông chỉ huy mở đường máu phá vây, rút quân về Mã Cao; sau đó vào Nghệ An gây dựng cơ sở và chiến đấu đến khi hy sinh tháng 10/1887.",
    ],
    boiCanh: ["Sau Chiếu Cần Vương (1885), văn thân, sĩ phu nhiều nơi dựng căn cứ kháng Pháp, trong đó có chiến lũy Ba Đình ở Nga Sơn, Thanh Hóa."],
    congTrang: [
      "Cùng Phạm Bành, Hoàng Bật Đạt xây dựng chiến lũy Ba Đình (1886 – 1887).",
      "Tham gia đánh Pháp ở Hà Nội dưới quyền Hoàng Tá Viêm (1882 – 1883).",
      "Chỉ huy nghĩa quân đẩy lùi các đợt tấn công lớn của quân Pháp vào Ba Đình (12/1886, 1/1887).",
      "Mở đường máu phá vây đêm 20/1/1887, tiếp tục chiến đấu ở Nghệ An.",
    ],
    suKien: [
      {
        nam: "1842",
        text: "Sinh ở làng Trinh Xá, huyện Thanh Liêm.",
      },
      {
        nam: "1882",
        text: "Tham gia đánh Pháp ở Hà Nội dưới quyền Hoàng Tá Viêm.",
      },
      {
        nam: "1886",
        text: "Xây dựng chiến lũy Ba Đình; đẩy lùi đợt tấn công lớn của quân Pháp tháng 12.",
      },
      {
        nam: "1887",
        text: "Đêm 20/1 phá vây rút về Mã Cao; hy sinh ở Nghệ An tháng 10.",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Đinh Công Tráng (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Thanh Tân, huyện Thanh Liêm, Hà Nam",
      },
      {
        ten: "Khu di tích Chiến khu Ba Đình (di tích lịch sử cấp quốc gia)",
        diaDiem: "Huyện Nga Sơn, Thanh Hóa",
      },
    ],
    tuongNiem: ["Giỗ ngày 19 tháng 8 âm lịch hằng năm tại huyện Thanh Liêm (Hà Nam) và huyện Nga Sơn (Thanh Hóa)."],
    ghiChuSuLieu:
      "Ngày và nơi hy sinh chưa thống nhất: tài liệu Pháp ghi ngày 5/10/1887 tại làng Trung Tân (Nghệ An), có tài liệu ghi ở Đô Lương (Nghệ An), gia phả dòng họ Đinh ở Hà Nam ghi khác. Tương truyền chiến lũy Ba Đình được đắp bằng lũy tre dày chèn rơm trộn bùn, đạn đại bác bắn vào chỉ lún chứ không nổ.",
    wikiTitle: "Đinh Công Tráng",
    nguon: ["Lịch sử cận đại Việt Nam.", "Cổng thông tin điện tử tỉnh Thanh Hóa và tỉnh Hà Nam."],
  },
  {
    slug: "nguyen-thien-thuat",
    ten: "Nguyễn Thiện Thuật",
    tenThat: null,
    tenKhac: ["Tán Thuật"],
    namSinh: "1844",
    namMat: "1926",
    nienDai: "1844 – 1926",
    queQuan: "Làng Xuân Dục, tổng Bạch Sam, huyện Đường Hào, phủ Thượng Hồng, tỉnh Hải Dương; nay thuộc xã Xuân Dục, thị xã Mỹ Hào, Hưng Yên",
    thoiKy: "chong-phap",
    trieuDai: "Nhà Nguyễn",
    namMoc: 1885,
    tomTat: "Thủ lĩnh khởi nghĩa Bãi Sậy (1885 – 1889) trong phong trào Cần Vương, được vua Hàm Nghi phong Bắc Kỳ Hiệp thống Quân vụ đại thần.",
    tieuSu: [
      "Nguyễn Thiện Thuật, thường gọi là Tán Thuật, sinh năm 1844 ở làng Xuân Dục (tỉnh Hải Dương thời Nguyễn). Ông đỗ Cử nhân năm 1876, từng làm Tuần phủ Hải Dương, và từ quan, không chấp nhận đầu hàng sau Hiệp ước Giáp Thân (1884).",
      "Năm 1885, hưởng ứng Chiếu Cần Vương, ông được phong Bắc Kỳ Hiệp thống Quân vụ đại thần, lãnh đạo kháng chiến ở vùng đồng bằng Bắc Bộ. Từ năm 1885 đến 1889, ông chỉ huy khởi nghĩa Bãi Sậy, đánh du kích trong vùng lau sậy đầm lầy, gây nhiều tổn thất cho quân Pháp.",
      "Năm 1889, ông sang Trung Quốc và sống ở đó đến khi mất ngày 25/5/1926 tại Nam Ninh (Quảng Tây). Năm 2005, di hài ông được đưa về an táng tại quê nhà Xuân Dục.",
    ],
    boiCanh: ["Sau Chiếu Cần Vương (1885), nhiều cuộc khởi nghĩa nổ ra ở đồng bằng Bắc Bộ; vùng lau sậy, đầm lầy Bãi Sậy thuận lợi cho lối đánh du kích."],
    congTrang: [
      "Lãnh đạo khởi nghĩa Bãi Sậy (1885 – 1889).",
      "Từ quan, không chấp nhận đầu hàng sau Hiệp ước Giáp Thân (1884).",
      "Được phong Bắc Kỳ Hiệp thống Quân vụ đại thần, lãnh đạo kháng chiến vùng đồng bằng Bắc Bộ.",
      "Phát triển lối đánh du kích trong vùng lau sậy, đầm lầy.",
    ],
    suKien: [
      {
        nam: "1844",
        text: "Sinh ở làng Xuân Dục.",
      },
      {
        nam: "1876",
        text: "Đỗ Cử nhân.",
      },
      {
        nam: "1884",
        text: "Từ quan sau Hiệp ước Giáp Thân.",
      },
      {
        nam: "1885",
        text: "Hưởng ứng Chiếu Cần Vương, lãnh đạo khởi nghĩa Bãi Sậy.",
      },
      {
        nam: "1889",
        text: "Sang Trung Quốc.",
      },
      {
        nam: "1926",
        text: "Mất ngày 25/5 tại Nam Ninh (Quảng Tây).",
      },
      {
        nam: "2005",
        text: "Di hài được đưa về an táng tại Xuân Dục.",
      },
    ],
    diTich: [
      {
        ten: "Khu lăng mộ và đền thờ Nguyễn Thiện Thuật (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Xuân Dục, thị xã Mỹ Hào, Hưng Yên",
      },
    ],
    tuongNiem: ["Giỗ ngày 14 tháng 4 âm lịch hằng năm tại thị xã Mỹ Hào, Hưng Yên."],
    ghiChuSuLieu:
      "Còn bàn luận về nguyên nhân ông sang Trung Quốc năm 1889: là kế rút lui để bảo toàn lực lượng hay do phong trào Bãi Sậy đã bị bao vây, cô lập. Dân gian coi ông như “thần đầm lầy”; tương truyền ông thoắt ẩn thoắt hiện trên thuyền nan giữa lau sậy để phục kích đồn giặc.",
    wikiTitle: "Nguyễn Thiện Thuật",
    nguon: ["Kỷ yếu Hội thảo khoa học Tán lý Nguyễn Thiện Thuật.", "Cổng thông tin điện tử tỉnh Hưng Yên; Báo Quân đội Nhân dân."],
  },
  {
    slug: "phan-boi-chau",
    ten: "Phan Bội Châu",
    tenThat: "Phan Văn San",
    tenKhac: ["Sào Nam", "Thị Hán", "Ông già Bến Ngự"],
    namSinh: "1867",
    namMat: "1940",
    nienDai: "1867 – 1940",
    queQuan: "Làng Đan Nhiễm, xã Nam Hòa, huyện Nam Đàn, Nghệ An; nay thuộc xã Xuân Hòa, huyện Nam Đàn, Nghệ An",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1905,
    tomTat: "Nhà yêu nước đầu thế kỷ XX, sáng lập Duy Tân Hội (1904), khởi xướng phong trào Đông Du (1905 – 1908) và lập Việt Nam Quang Phục Hội (1912).",
    tieuSu: [
      "Phan Bội Châu tên thật là Phan Văn San, vì kỵ húy vua Duy Tân (Vĩnh San) nên đổi là Bội Châu; hiệu Sào Nam, Thị Hán. Ông sinh ngày 26/12/1867 ở làng Đan Nhiễm, huyện Nam Đàn, đỗ Giải nguyên năm 1900.",
      "Năm 1904, ông sáng lập Duy Tân Hội, chủ trương dùng vũ trang giành độc lập. Từ năm 1905 đến 1908, ông khởi xướng và tổ chức phong trào Đông Du, đưa hàng trăm thanh niên sang Nhật Bản học chính trị, quân sự. Năm 1912, ông lập Việt Nam Quang Phục Hội ở Quảng Châu (Trung Quốc), hướng tới xây dựng một nhà nước cộng hòa.",
      "Năm 1925, ông bị Pháp bắt ở Thượng Hải. Trước phong trào đòi ân xá của nhân dân cả nước, Pháp phải giảm án và đưa ông về giam lỏng ở Huế; ông sống ở Bến Ngự, được gọi là “Ông già Bến Ngự”, và mất ngày 29/10/1940 (29 tháng 9 năm Canh Thìn).",
    ],
    boiCanh: ["Đầu thế kỷ XX, một lớp sĩ phu yêu nước tìm con đường giành độc lập mới, hướng ra nước ngoài để học hỏi, tiêu biểu là phong trào Đông Du sang Nhật Bản."],
    congTrang: [
      "Khởi xướng và tổ chức phong trào Đông Du (1905 – 1908), đưa hàng trăm thanh niên sang Nhật Bản học tập.",
      "Sáng lập Duy Tân Hội năm 1904.",
      "Thành lập Việt Nam Quang Phục Hội ở Quảng Châu năm 1912.",
      "Tác giả “Hải ngoại huyết thư”, “Phan Bội Châu niên biểu”, “Tự phán”.",
    ],
    suKien: [
      {
        nam: "1867",
        text: "Sinh ngày 26/12 ở làng Đan Nhiễm, huyện Nam Đàn.",
      },
      {
        nam: "1900",
        text: "Đỗ Giải nguyên.",
      },
      {
        nam: "1904",
        text: "Sáng lập Duy Tân Hội.",
      },
      {
        nam: "1905",
        text: "Khởi xướng phong trào Đông Du (đến năm 1908).",
      },
      {
        nam: "1912",
        text: "Lập Việt Nam Quang Phục Hội ở Quảng Châu.",
      },
      {
        nam: "1925",
        text: "Bị Pháp bắt ở Thượng Hải, sau bị giam lỏng ở Huế.",
      },
      {
        nam: "1940",
        text: "Mất ngày 29/10 tại Huế.",
      },
    ],
    diTich: [
      {
        ten: "Khu lưu niệm Phan Bội Châu tại Bến Ngự",
        diaDiem: "Phường Trường An, thành phố Huế, Thừa Thiên Huế",
      },
      {
        ten: "Khu lưu niệm Phan Bội Châu",
        diaDiem: "Huyện Nam Đàn, Nghệ An",
      },
    ],
    tuongNiem: ["Giỗ ngày 29 tháng 9 âm lịch hằng năm tại Huế và Nghệ An."],
    ghiChuSuLieu:
      "Chủ trương dựa vào Nhật Bản thời Đông Du về sau bị nhìn nhận là có hạn chế — Nguyễn Ái Quốc ví là “đuổi hổ cửa trước, rước beo cửa sau”; các vụ ném bom, ám sát cá nhân do Việt Nam Quang Phục Hội tiến hành cũng còn nhiều tranh luận. Tương truyền thuở nhỏ ông có trí nhớ hơn người, đọc sách một lượt là thuộc.",
    wikiTitle: "Phan Bội Châu",
    nguon: ["Phan Bội Châu niên biểu; Tự phán.", "Bảo tàng Lịch sử Quốc gia; Cổng thông tin điện tử tỉnh Thừa Thiên Huế."],
  },
  {
    slug: "phan-chau-trinh",
    ten: "Phan Châu Trinh",
    tenThat: null,
    tenKhac: ["Phan Chu Trinh", "Tử Cán", "Tây Hồ", "Hy Mã"],
    namSinh: "1872",
    namMat: "1926",
    nienDai: "1872 – 1926",
    queQuan: "Làng Tây Lộc, huyện Hà Đông, phủ Thăng Bình, Quảng Nam; nay thuộc xã Tam Phước, huyện Phú Ninh, Quảng Nam",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1906,
    tomTat: "Nhà yêu nước đầu thế kỷ XX, khởi xướng phong trào Duy Tân (1906 – 1908) với tôn chỉ “Khai dân trí, chấn dân khí, hậu dân sinh”, chủ trương canh tân đất nước bằng con đường cải cách ôn hòa.",
    tieuSu: [
      "Phan Châu Trinh (còn viết Phan Chu Trinh), tự Tử Cán, hiệu Tây Hồ, biệt hiệu Hy Mã, sinh ngày 9/9/1872 ở làng Tây Lộc (Quảng Nam). Ông đỗ Phó bảng năm 1901, rồi từ quan để theo con đường canh tân đất nước.",
      "Từ năm 1906 đến 1908, ông khởi xướng phong trào Duy Tân với tôn chỉ “Khai dân trí, chấn dân khí, hậu dân sinh”: mở trường dạy chữ Quốc ngữ, bài trừ hủ tục, chấn hưng kinh tế thực nghiệp. Năm 1908, sau phong trào chống sưu thuế ở Trung Kỳ, ông bị Pháp bắt đày ra Côn Đảo; năm 1910, ông được trả tự do nhờ Hội Nhân quyền Pháp can thiệp. Bài thơ “Đập đá ở Côn Lôn” tương truyền được ông làm trong thời gian này.",
      "Từ năm 1911, ông sang Pháp hoạt động chính trị, viết “Thất điều thư” phê phán vua Khải Định. Năm 1925, ông về nước diễn thuyết, cổ vũ tinh thần độc lập dân tộc; ông mất ngày 24/3/1926 (11 tháng 2 năm Bính Dần), và đám tang của ông trở thành một sự kiện chính trị có quy mô cả nước.",
    ],
    boiCanh: ["Đầu thế kỷ XX, các sĩ phu yêu nước theo hai khuynh hướng chính: bạo động vũ trang (Phan Bội Châu) và cải cách ôn hòa (Phan Châu Trinh)."],
    congTrang: [
      "Khởi xướng phong trào Duy Tân (1906 – 1908) với tôn chỉ “Khai dân trí, chấn dân khí, hậu dân sinh”.",
      "Mở trường dạy chữ Quốc ngữ, bài trừ hủ tục, chấn hưng kinh tế thực nghiệp.",
      "Hoạt động ở Pháp (1911 – 1925), viết “Thất điều thư” gửi vua Khải Định.",
      "Về nước năm 1925 diễn thuyết, cổ vũ tinh thần độc lập dân tộc.",
    ],
    suKien: [
      {
        nam: "1872",
        text: "Sinh ngày 9/9 ở làng Tây Lộc, Quảng Nam.",
      },
      {
        nam: "1901",
        text: "Đỗ Phó bảng.",
      },
      {
        nam: "1906",
        text: "Khởi xướng phong trào Duy Tân.",
      },
      {
        nam: "1908",
        text: "Bị bắt đày ra Côn Đảo sau phong trào chống sưu thuế Trung Kỳ.",
      },
      {
        nam: "1910",
        text: "Được trả tự do nhờ Hội Nhân quyền Pháp can thiệp.",
      },
      {
        nam: "1911",
        text: "Sang Pháp hoạt động.",
      },
      {
        nam: "1925",
        text: "Về nước diễn thuyết.",
      },
      {
        nam: "1926",
        text: "Mất ngày 24/3.",
      },
    ],
    diTich: [
      {
        ten: "Khu mộ và đền thờ Phan Châu Trinh (di tích lịch sử cấp quốc gia)",
        diaDiem: "Số 9 Phan Thúc Duyện, phường 4, quận Tân Bình, TP. Hồ Chí Minh",
      },
      {
        ten: "Nhà lưu niệm Phan Châu Trinh (di tích quốc gia)",
        diaDiem: "Xã Tam Phước, huyện Phú Ninh, Quảng Nam",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 24 tháng 3 dương lịch (hoặc 11 tháng 2 âm lịch) tại TP. Hồ Chí Minh và Quảng Nam."],
    ghiChuSuLieu:
      "Con đường cải cách bất bạo động, dựa vào Pháp để khai hóa dân trí của Phan Châu Trinh khác với đường lối bạo động vũ trang của Phan Bội Châu; sự khác biệt về phương pháp đấu tranh này vẫn là chủ đề được bàn luận.",
    wikiTitle: "Phan Châu Trinh",
    nguon: ["Phan Châu Trinh toàn tập.", "Cổng thông tin Sở Văn hóa và Thể thao TP. Hồ Chí Minh; Báo Quảng Nam."],
  },
  {
    slug: "luong-van-can",
    ten: "Lương Văn Can",
    tenThat: null,
    tenKhac: ["Ôn Như", "Sơn Lão"],
    namSinh: "1854",
    namMat: "1927",
    nienDai: "1854 – 1927",
    queQuan: "Làng Nhị Khê, huyện Thượng Phúc, phủ Thường Tín, tỉnh Hà Nội; nay thuộc xã Nhị Khê, huyện Thường Tín, Hà Nội",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1907,
    tomTat: "Nhà nho, nhà giáo yêu nước, Thục trưởng trường Đông Kinh Nghĩa Thục (1907) ở Hà Nội, người đề xướng tư tưởng kinh doanh có đạo đức qua các sách “Kim cổ cách ngôn”, “Thương học phương châm”.",
    tieuSu: [
      "Lương Văn Can, tự Ôn Như, hiệu Sơn Lão, sinh năm 1854 ở làng Nhị Khê (Thường Tín). Ông đỗ Cử nhân khoa Giáp Tuất (1874) nhưng không ra làm quan, ở lại Hà Nội mở trường dạy học.",
      "Tháng 3/1907, ông cùng các sĩ phu sáng lập trường Đông Kinh Nghĩa Thục ở phố Hàng Đào (Hà Nội) và giữ cương vị Thục trưởng. Trường biên soạn sách giáo khoa Quốc ngữ mới, truyền bá kiến thức khoa học thường thức và dạy học không lấy tiền.",
      "Qua các sách “Kim cổ cách ngôn”, “Thương học phương châm”, ông đề xướng tư tưởng kinh doanh có đạo đức. Năm 1914, ông bị Pháp bắt đày sang Phnôm Pênh (Campuchia); năm 1921, ông trở về Hà Nội tiếp tục dạy học, viết sách, và mất ngày 13/6/1927 (14 tháng 5 năm Đinh Mão).",
    ],
    boiCanh: ["Đầu thế kỷ XX, cuộc vận động Duy Tân lan ra Bắc Kỳ; ở Hà Nội, các sĩ phu mở trường Đông Kinh Nghĩa Thục để truyền bá tư tưởng mới."],
    congTrang: [
      "Cùng các sĩ phu sáng lập trường Đông Kinh Nghĩa Thục (3/1907), giữ cương vị Thục trưởng.",
      "Mở trường dạy học ở Hà Nội sau khi đỗ Cử nhân (1874), không ra làm quan.",
      "Biên soạn sách giáo khoa Quốc ngữ mới, truyền bá kiến thức khoa học thường thức, dạy học không lấy tiền.",
      "Đề xướng tư tưởng kinh doanh có đạo đức qua “Kim cổ cách ngôn”, “Thương học phương châm”.",
    ],
    suKien: [
      {
        nam: "1854",
        text: "Sinh ở làng Nhị Khê.",
      },
      {
        nam: "1874",
        text: "Đỗ Cử nhân khoa Giáp Tuất.",
      },
      {
        nam: "1907",
        text: "Cùng các sĩ phu sáng lập Đông Kinh Nghĩa Thục (tháng 3).",
      },
      {
        nam: "1914",
        text: "Bị Pháp bắt đày sang Phnôm Pênh.",
      },
      {
        nam: "1921",
        text: "Trở về Hà Nội.",
      },
      {
        nam: "1927",
        text: "Mất ngày 13/6.",
      },
    ],
    diTich: [
      {
        ten: "Nhà lưu niệm danh nhân Lương Văn Can (di tích lịch sử – văn hóa cấp quốc gia)",
        diaDiem: "Thôn Nhị Khê, xã Nhị Khê, huyện Thường Tín, Hà Nội",
      },
    ],
    tuongNiem: [
      "Giỗ ngày 14 tháng 5 âm lịch hằng năm tại xã Nhị Khê (huyện Thường Tín) và phố Hàng Đào (quận Hoàn Kiếm, Hà Nội).",
      "Giới thương nhân phố cổ Hà Nội tôn kính gọi ông là “người thầy của đạo làm giàu chân chính”.",
    ],
    ghiChuSuLieu:
      "Mức độ liên quan thực tế của ông với vụ Hà Thành đầu độc năm 1908, mà chính quyền thực dân viện dẫn để kết án lưu đày ông, vẫn còn bàn luận.",
    wikiTitle: "Lương Văn Can",
    nguon: ["Kỷ yếu Hội thảo 100 năm phong trào Đông Kinh Nghĩa Thục.", "Báo Hà Nội Mới; Cổng thông tin điện tử huyện Thường Tín."],
  },
  {
    slug: "nguyen-thai-hoc",
    ten: "Nguyễn Thái Học",
    tenThat: null,
    tenKhac: [],
    namSinh: "1902",
    namMat: "1930",
    nienDai: "1902 – 1930",
    queQuan: "Làng Thổ Tang, tổng Lương Điền, phủ Vĩnh Tường, tỉnh Vĩnh Yên; nay thuộc thị trấn Thổ Tang, huyện Vĩnh Tường, Vĩnh Phúc",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1927,
    tomTat: "Người sáng lập và Chủ tịch Việt Nam Quốc Dân Đảng (1927), lãnh đạo Khởi nghĩa Yên Bái năm 1930; bị Pháp xử chém ngày 17/6/1930 tại Yên Bái.",
    tieuSu: [
      "Nguyễn Thái Học sinh ngày 1/12/1902 ở làng Thổ Tang, phủ Vĩnh Tường (tỉnh Vĩnh Yên). Ông từng học trường Cao đẳng Thương mại Hà Nội và gửi nhiều bản kiến nghị cải cách lên Toàn quyền Pháp nhưng đều bị bác bỏ.",
      "Ngày 25/12/1927, ông thành lập Việt Nam Quốc Dân Đảng ở Hà Nội và được bầu làm Chủ tịch Tổng bộ, chuẩn bị khởi nghĩa vũ trang nhằm lật đổ chính quyền thực dân, lập nên một nhà nước cộng hòa. Đêm 9/2/1930, Khởi nghĩa Yên Bái nổ ra ở Yên Bái, Phú Thọ, Hải Dương, Thái Bình với phương châm “Không thành công cũng thành nhân”.",
      "Ngày 20/2/1930, ông bị mật thám Pháp bắt ở ấp Cổ Vịt (Hải Dương). Ngày 17/6/1930, ông cùng 12 đồng chí bị đưa lên máy chém ở Yên Bái; trước khi hy sinh, các ông hô “Việt Nam vạn tuế”.",
    ],
    boiCanh: ["Cuối thập niên 1920, nhiều tổ chức yêu nước mới ra đời; Việt Nam Quốc Dân Đảng chủ trương khởi nghĩa vũ trang chống chính quyền thực dân Pháp."],
    congTrang: [
      "Thành lập Việt Nam Quốc Dân Đảng ngày 25/12/1927, làm Chủ tịch Tổng bộ.",
      "Lãnh đạo việc chuẩn bị khởi nghĩa vũ trang chống chính quyền thực dân.",
      "Phát động Khởi nghĩa Yên Bái đêm 9/2/1930 ở Yên Bái, Phú Thọ, Hải Dương, Thái Bình.",
    ],
    suKien: [
      {
        nam: "1902",
        text: "Sinh ngày 1/12 ở làng Thổ Tang.",
      },
      {
        nam: "1927",
        text: "Thành lập Việt Nam Quốc Dân Đảng ngày 25/12.",
      },
      {
        nam: "1930",
        text: "Đêm 9/2 Khởi nghĩa Yên Bái nổ ra; ngày 20/2 ông bị bắt ở ấp Cổ Vịt; ngày 17/6 bị xử chém ở Yên Bái.",
      },
    ],
    diTich: [
      {
        ten: "Khu lăng mộ và tượng đài Nguyễn Thái Học, Công viên Yên Hòa (di tích lịch sử cấp quốc gia)",
        diaDiem: "Thành phố Yên Bái, Yên Bái",
      },
      {
        ten: "Đền thờ Nguyễn Thái Học",
        diaDiem: "Thị trấn Thổ Tang, huyện Vĩnh Tường, Vĩnh Phúc",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 17 tháng 6 dương lịch hằng năm tại Khu di tích lịch sử Nguyễn Thái Học (thành phố Yên Bái)."],
    ghiChuSuLieu:
      "Thời điểm phát động Khởi nghĩa Yên Bái, khi lực lượng chưa chuẩn bị chín muồi sau vụ ám sát Bazin (người chuyên mộ phu), là điểm còn tranh luận. Tương truyền khi bước lên máy chém, ông bình thản đọc hai câu thơ tiếng Pháp: “Mourir pour sa patrie / C'est le sort le plus beau, le plus digne d'envie” (Chết vì Tổ quốc là số phận đẹp nhất, đáng ghen tị nhất).",
    wikiTitle: "Nguyễn Thái Học",
    nguon: ["Hồ sơ lưu trữ Tòa án Đề hình Yên Bái 1930.", "Cổng thông tin điện tử tỉnh Yên Bái; Bảo tàng Lịch sử Quốc gia."],
  },
  {
    slug: "co-giang",
    ten: "Cô Giang",
    tenThat: "Nguyễn Thị Giang",
    tenKhac: [],
    namSinh: "1906",
    namMat: "1930",
    nienDai: "1906 – 1930",
    queQuan: "Làng Đạo Mỗ, huyện Võ Giàng, tỉnh Bắc Ninh; nay thuộc phường Đa Mai, thành phố Bắc Giang, Bắc Giang",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1930,
    tomTat:
      "Thành viên Việt Nam Quốc Dân Đảng từ năm 1927, phụ trách liên lạc, gây quỹ và tiếp tế vũ khí chuẩn bị Khởi nghĩa Yên Bái; bạn đời của Nguyễn Thái Học, mất ngày 18/6/1930.",
    tieuSu: [
      "Nguyễn Thị Giang, thường gọi là Cô Giang, sinh năm 1906; em gái bà là Nguyễn Thị Bắc (Cô Bắc). Năm 1927, bà gia nhập Việt Nam Quốc Dân Đảng, phụ trách công tác liên lạc, gây quỹ và tiếp tế vũ khí.",
      "Bà là bạn đời và đồng chí của Chủ tịch Việt Nam Quốc Dân Đảng Nguyễn Thái Học, trực tiếp tham gia vận chuyển bom đạn và xây dựng cơ sở chuẩn bị cho Khởi nghĩa Yên Bái (tháng 2/1930).",
      "Sau khi khởi nghĩa thất bại, bà theo dõi phiên tòa và có mặt ở Yên Bái sáng 17/6/1930, khi Nguyễn Thái Học cùng các đồng chí bị xử chém. Ngày hôm sau, 18/6/1930, bà tự sát bằng súng lục tại làng Đồng Vệ (Vĩnh Tường, Vĩnh Phúc), quê của Nguyễn Thái Học.",
    ],
    boiCanh: ["Việt Nam Quốc Dân Đảng chủ trương khởi nghĩa vũ trang chống chính quyền thực dân Pháp; Khởi nghĩa Yên Bái nổ ra tháng 2/1930 và thất bại."],
    congTrang: [
      "Gia nhập Việt Nam Quốc Dân Đảng năm 1927, phụ trách liên lạc, gây quỹ và tiếp tế vũ khí.",
      "Tham gia vận chuyển bom đạn, xây dựng cơ sở chuẩn bị Khởi nghĩa Yên Bái (tháng 2/1930).",
      "Là bạn đời và đồng chí của Nguyễn Thái Học trong Việt Nam Quốc Dân Đảng.",
    ],
    suKien: [
      {
        nam: "1906",
        text: "Sinh năm 1906.",
      },
      {
        nam: "1927",
        text: "Gia nhập Việt Nam Quốc Dân Đảng.",
      },
      {
        nam: "1930",
        text: "Tháng 2 Khởi nghĩa Yên Bái nổ ra; sáng 17/6 bà có mặt ở Yên Bái khi Nguyễn Thái Học bị xử chém; ngày 18/6 bà tự sát tại làng Đồng Vệ.",
      },
    ],
    diTich: [
      {
        ten: "Khu mộ Cô Giang",
        diaDiem: "Thôn Đồng Vệ, xã Vĩnh Tân (gần thị trấn Thổ Tang), huyện Vĩnh Tường, Vĩnh Phúc",
      },
      {
        ten: "Nhà tưởng niệm Cô Giang – Cô Bắc",
        diaDiem: "Phường Đa Mai, thành phố Bắc Giang, Bắc Giang",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 18 tháng 6 dương lịch (có nơi theo ngày 22 tháng 5 âm lịch) tại huyện Vĩnh Tường (Vĩnh Phúc) và thành phố Bắc Giang."],
    ghiChuSuLieu:
      "Quan hệ hôn nhân với Nguyễn Thái Học là lễ thành hôn chính thức hay hôn lễ kết nghĩa trước Đảng kỳ vẫn còn những cách hiểu khác nhau. Tương truyền bà để lại thư tuyệt mệnh viết: “Đời tôi không sống được thì xin lấy cái chết để đền nợ nước và trọn nghĩa với chàng”.",
    wikiTitle: "Nguyễn Thị Giang",
    nguon: ["Cổng thông tin điện tử tỉnh Vĩnh Phúc; Báo Bắc Giang.", "Bảo tàng Lịch sử Quốc gia."],
  },
  {
    slug: "ly-tu-trong",
    ten: "Lý Tự Trọng",
    tenThat: "Lê Hữu Trọng",
    tenKhac: ["Lê Văn Trọng", "Huy"],
    namSinh: "1914",
    namMat: "1931",
    nienDai: "1914 – 1931",
    queQuan:
      "Làng Việt Xuyên, tổng Việt Yên, huyện Thạch Hà, tỉnh Hà Tĩnh; nay thuộc xã Việt Xuyên, huyện Thạch Hà, Hà Tĩnh (sinh tại Bản Mạy, tỉnh Nakhon Phanom, Thái Lan)",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1931,
    tomTat:
      "Được Nguyễn Ái Quốc chọn sang Quảng Châu đào tạo năm 1926, về nước làm giao liên cho Xứ ủy Nam Kỳ; bị bắt năm 1931 và bị xử tử tại Khám Lớn Sài Gòn ngày 21/11/1931, khi 17 tuổi.",
    tieuSu: [
      "Lý Tự Trọng tên thật là Lê Hữu Trọng (còn gọi Lê Văn Trọng), sinh ngày 20/10/1914 tại Bản Mạy, tỉnh Nakhon Phanom (Thái Lan), trong một gia đình Việt kiều quê làng Việt Xuyên, huyện Thạch Hà, Hà Tĩnh. Năm 1926, ông được Nguyễn Ái Quốc chọn vào nhóm thiếu niên sang Quảng Châu (Trung Quốc) đào tạo.",
      "Năm 1929, ông về nước hoạt động ở Sài Gòn – Chợ Lớn, phụ trách đường dây giao liên của Xứ ủy Nam Kỳ và Trung ương Đảng.",
      "Ngày 9/2/1931, tại một cuộc diễn thuyết ở Sài Gòn, ông bắn chết viên mật thám Legrand để bảo vệ người diễn thuyết là Phan Bôi, rồi bị bắt. Tòa án thực dân kết án tử hình; ông bị xử tử tại Khám Lớn Sài Gòn rạng sáng 21/11/1931, khi 17 tuổi.",
    ],
    boiCanh: ["Lý Tự Trọng hoạt động trong thời kỳ vận động thành lập Đảng và phong trào Xô viết Nghệ Tĩnh (1926–1931)."],
    congTrang: [
      "Làm giao liên cho Xứ ủy Nam Kỳ và Trung ương Đảng ở Sài Gòn – Chợ Lớn từ năm 1929.",
      "Được Nguyễn Ái Quốc chọn vào nhóm thiếu niên sang Quảng Châu đào tạo (1926).",
      "Ngày 9/2/1931, bắn viên mật thám Legrand để bảo vệ người diễn thuyết Phan Bôi.",
    ],
    suKien: [
      {
        nam: "1914",
        text: "Sinh ngày 20/10 tại Bản Mạy (Thái Lan).",
      },
      {
        nam: "1926",
        text: "Sang Quảng Châu (Trung Quốc) học tập.",
      },
      {
        nam: "1929",
        text: "Về nước, làm giao liên ở Sài Gòn – Chợ Lớn.",
      },
      {
        nam: "1931",
        text: "Ngày 9/2 bắn mật thám Legrand và bị bắt; rạng sáng 21/11 bị xử tử tại Khám Lớn Sài Gòn.",
      },
    ],
    diTich: [
      {
        ten: "Khu tưởng niệm Lý Tự Trọng (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Việt Xuyên, huyện Thạch Hà, Hà Tĩnh",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 21 tháng 11 dương lịch (có nơi theo ngày 12 tháng 10 âm lịch)."],
    ghiChuSuLieu:
      "Nơi chôn cất sau khi ông bị xử tử từng thất lạc nhiều năm; theo hồ sơ khảo cứu, hài cốt được tìm thấy tại khu đất công viên Lê Thị Riêng (khu nghĩa địa Chí Hòa cũ, TP. Hồ Chí Minh) và được quy tập về an táng tại khu tưởng niệm ở Việt Xuyên năm 2011.",
    wikiTitle: "Lý Tự Trọng",
    nguon: ["Hồ sơ Trung ương Đoàn TNCS Hồ Chí Minh; Cổng thông tin điện tử tỉnh Hà Tĩnh.", "Bảo tàng Lịch sử Quốc gia."],
  },
  {
    slug: "tran-phu",
    ten: "Trần Phú",
    tenThat: null,
    tenKhac: ["Nam", "Hàn Phong", "Năm Tự"],
    namSinh: "1904",
    namMat: "1931",
    nienDai: "1904 – 1931",
    queQuan:
      "Làng Tùng Ảnh, huyện Đức Thọ, phủ Đức Quang, tỉnh Hà Tĩnh; nay thuộc xã Tùng Ảnh, huyện Đức Thọ, Hà Tĩnh (sinh tại huyện Tuy An, tỉnh Phú Yên, nơi cha ông làm quan)",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1930,
    tomTat:
      "Tổng Bí thư đầu tiên của Đảng Cộng sản Đông Dương (tháng 10/1930), người khởi thảo Luận cương chính trị năm 1930; bị bắt ngày 18/4/1931 và mất ngày 6/9/1931 tại Nhà thương Chợ Quán, Sài Gòn.",
    tieuSu: [
      "Trần Phú sinh ngày 1/5/1904 tại huyện Tuy An, tỉnh Phú Yên, nơi cha ông làm quan; quê làng Tùng Ảnh, huyện Đức Thọ, Hà Tĩnh. Ông tham gia Hội Phục Việt (Tân Việt) và năm 1926 gia nhập Hội Việt Nam Cách mạng Thanh niên ở Quảng Châu.",
      "Từ năm 1927 đến 1929, ông học tại Đại học Phương Đông (Moskva). Tháng 4/1930, ông về nước và được bổ sung vào Ban Chấp hành Trung ương lâm thời. Tháng 10/1930, ông khởi thảo Luận cương chính trị và tại Hội nghị Trung ương được bầu làm Tổng Bí thư đầu tiên của Đảng Cộng sản Đông Dương.",
      "Ngày 18/4/1931, ông bị mật thám Pháp bắt ở Sài Gòn. Bị tra tấn trong thời gian giam giữ, ông mắc lao phổi nặng và mất ngày 6/9/1931 tại Nhà thương Chợ Quán, Sài Gòn.",
    ],
    boiCanh: ["Trần Phú hoạt động trong phong trào cách mạng giải phóng dân tộc giai đoạn 1925–1931, khi các tổ chức cộng sản trong nước được thống nhất (năm 1930)."],
    congTrang: [
      "Được bầu làm Tổng Bí thư đầu tiên của Đảng Cộng sản Đông Dương tại Hội nghị Trung ương tháng 10/1930.",
      "Khởi thảo Luận cương chính trị (tháng 10/1930).",
      "Gia nhập Hội Việt Nam Cách mạng Thanh niên (1926); học tại Đại học Phương Đông, Moskva (1927–1929).",
    ],
    suKien: [
      {
        nam: "1904",
        text: "Sinh ngày 1/5 tại huyện Tuy An, Phú Yên.",
      },
      {
        nam: "1926",
        text: "Gia nhập Hội Việt Nam Cách mạng Thanh niên ở Quảng Châu.",
      },
      {
        nam: "1930",
        text: "Tháng 4 về nước; tháng 10 khởi thảo Luận cương chính trị và được bầu làm Tổng Bí thư.",
      },
      {
        nam: "1931",
        text: "Ngày 18/4 bị bắt ở Sài Gòn; ngày 6/9 mất tại Nhà thương Chợ Quán.",
      },
    ],
    diTich: [
      {
        ten: "Khu mộ và Nhà lưu niệm Tổng Bí thư Trần Phú (di tích lịch sử – văn hóa cấp quốc gia)",
        diaDiem: "Xã Tùng Ảnh, huyện Đức Thọ, Hà Tĩnh",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 6 tháng 9 dương lịch hằng năm tại xã Tùng Ảnh, huyện Đức Thọ, Hà Tĩnh."],
    ghiChuSuLieu:
      "Các nghiên cứu lịch sử Đảng thường đối chiếu Luận cương chính trị tháng 10/1930 (nhấn mạnh đấu tranh giai cấp) với Chính cương vắn tắt tháng 2/1930 của Nguyễn Ái Quốc (đặt giải phóng dân tộc lên hàng đầu).",
    wikiTitle: "Trần Phú",
    nguon: ["Lịch sử Đảng Cộng sản Việt Nam, NXB Chính trị Quốc gia Sự thật.", "Cổng thông tin điện tử Tỉnh ủy Hà Tĩnh."],
  },
  {
    slug: "le-hong-phong",
    ten: "Lê Hồng Phong",
    tenThat: "Lê Huy Doãn",
    tenKhac: ["Hải An", "Litvinov"],
    namSinh: "1902",
    namMat: "1942",
    nienDai: "1902 – 1942",
    queQuan: "Làng Đông Thôn, tổng Thông Lãng, phủ Hưng Nguyên, tỉnh Nghệ An; nay thuộc xã Hưng Thông, huyện Hưng Nguyên, Nghệ An",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1935,
    tomTat:
      "Tổng Bí thư Đảng Cộng sản Đông Dương (1935–1936), chủ trì Đại hội lần thứ I của Đảng tại Ma Cao năm 1935; bị bắt năm 1939, bị đày ra Côn Đảo và mất tại đây ngày 6/9/1942.",
    tieuSu: [
      "Lê Hồng Phong tên thật là Lê Huy Doãn, sinh năm 1902 ở làng Đông Thôn, phủ Hưng Nguyên, Nghệ An. Ông được cử sang Liên Xô học tại Trường Không quân Leningrad và Đại học Phương Đông (Moskva).",
      "Năm 1935, ông chủ trì Đại hội lần thứ I của Đảng tại Ma Cao và được bầu làm Tổng Bí thư Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương. Cùng năm, ông dự Đại hội VII Quốc tế Cộng sản và được bầu làm Ủy viên Ban Chấp hành Quốc tế Cộng sản.",
      "Năm 1939, ông bị mật thám bắt ở Sài Gòn, sau đó bị đày ra Côn Đảo và mất tại nhà tù Côn Đảo ngày 6/9/1942.",
    ],
    boiCanh: ["Sau giai đoạn thoái trào 1930–1931, Đảng Cộng sản Đông Dương khôi phục hệ thống tổ chức; Đại hội lần thứ I của Đảng họp tại Ma Cao năm 1935."],
    congTrang: [
      "Chủ trì Đại hội lần thứ I của Đảng tại Ma Cao (1935), được bầu làm Tổng Bí thư.",
      "Dự Đại hội VII Quốc tế Cộng sản (1935), được bầu làm Ủy viên Ban Chấp hành Quốc tế Cộng sản.",
      "Học tại Trường Không quân Leningrad và Đại học Phương Đông, Moskva.",
    ],
    suKien: [
      {
        nam: "1902",
        text: "Sinh ở làng Đông Thôn, Hưng Nguyên, Nghệ An.",
      },
      {
        nam: "1935",
        text: "Chủ trì Đại hội lần thứ I ở Ma Cao; dự Đại hội VII Quốc tế Cộng sản.",
      },
      {
        nam: "1939",
        text: "Bị bắt ở Sài Gòn, sau đó bị đày ra Côn Đảo.",
      },
      {
        nam: "1942",
        text: "Ngày 6/9, mất tại nhà tù Côn Đảo.",
      },
    ],
    diTich: [
      {
        ten: "Khu lưu niệm Tổng Bí thư Lê Hồng Phong (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Hưng Thông, huyện Hưng Nguyên, Nghệ An",
      },
      {
        ten: "Phần mộ tại Nghĩa trang Hàng Dương (di tích quốc gia đặc biệt)",
        diaDiem: "Côn Đảo, Bà Rịa – Vũng Tàu",
      },
    ],
    tuongNiem: ["Ngày mất 6/9 (dương lịch) hằng năm.", "Được tưởng niệm tại Khu lưu niệm ở Hưng Nguyên (Nghệ An) và tại Nghĩa trang Hàng Dương (Côn Đảo)."],
    ghiChuSuLieu:
      "Một số tài liệu cũ ghi năm sinh là 1900; về sau Viện Lịch sử Đảng và gia phả dòng họ thống nhất năm sinh 1902. Ngày mất 6/9/1942 tại Côn Đảo.",
    wikiTitle: "Lê Hồng Phong",
    nguon: ["Tiểu sử Lê Hồng Phong, NXB Chính trị Quốc gia Sự thật.", "Ban Quản lý Di tích Côn Đảo."],
  },
  {
    slug: "nguyen-thi-minh-khai",
    ten: "Nguyễn Thị Minh Khai",
    tenThat: "Nguyễn Thị Vịnh",
    tenKhac: ["Cô Duyệt", "Kim Dung"],
    namSinh: "1910",
    namMat: "1941",
    nienDai: "1910 – 1941",
    queQuan: "Làng Vĩnh Yên, tổng Thông Lãng, huyện Hưng Nguyên, tỉnh Nghệ An; nay thuộc phường Quang Trung, thành phố Vinh, Nghệ An",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1935,
    tomTat:
      "Một trong những nữ đảng viên đầu tiên của Đảng Cộng sản Đông Dương, đại biểu dự Đại hội VII Quốc tế Cộng sản (1935), Bí thư Thành ủy Sài Gòn – Chợ Lớn; bị bắt ngày 30/7/1940 và bị xử bắn tại Hóc Môn ngày 28/8/1941.",
    tieuSu: [
      "Nguyễn Thị Minh Khai tên thật là Nguyễn Thị Vịnh, sinh ngày 1/11/1910 ở làng Vĩnh Yên, huyện Hưng Nguyên, Nghệ An. Năm 1927, bà gia nhập Tân Việt Cách mạng Đảng; năm 1930 trở thành một trong những nữ đảng viên đầu tiên của Đảng Cộng sản Đông Dương.",
      "Năm 1935, bà là đại biểu của Đảng dự Đại hội VII Quốc tế Cộng sản tại Moskva và phát biểu về vấn đề phụ nữ ở các xứ thuộc địa. Từ năm 1937 đến 1940, bà giữ chức Bí thư Thành ủy Sài Gòn – Chợ Lớn, lãnh đạo phong trào đấu tranh chính trị và tham gia chuẩn bị khởi nghĩa vũ trang.",
      "Ngày 30/7/1940, trước Khởi nghĩa Nam Kỳ, bà bị bắt. Sáng 28/8/1941, bà bị xử bắn tại Ngã Ba Giồng, Hóc Môn, cùng với Hà Huy Tập và Võ Văn Tần.",
    ],
    boiCanh: ["Bà hoạt động trong thời kỳ Mặt trận Dân chủ, khi Đảng hoạt động nửa công khai, và giai đoạn chuẩn bị Khởi nghĩa Nam Kỳ (1940)."],
    congTrang: [
      "Bí thư Thành ủy Sài Gòn – Chợ Lớn (1937–1940), lãnh đạo phong trào đấu tranh chính trị.",
      "Đại biểu của Đảng dự Đại hội VII Quốc tế Cộng sản tại Moskva (1935).",
      "Gia nhập Tân Việt Cách mạng Đảng (1927), là một trong những nữ đảng viên đầu tiên của Đảng Cộng sản Đông Dương (1930).",
    ],
    suKien: [
      {
        nam: "1910",
        text: "Sinh ngày 1/11 ở làng Vĩnh Yên, Nghệ An.",
      },
      {
        nam: "1935",
        text: "Dự Đại hội VII Quốc tế Cộng sản tại Moskva.",
      },
      {
        nam: "1937 – 1940",
        text: "Bí thư Thành ủy Sài Gòn – Chợ Lớn.",
      },
      {
        nam: "1940",
        text: "Bị bắt ngày 30/7, trước Khởi nghĩa Nam Kỳ.",
      },
      {
        nam: "1941",
        text: "Bị xử bắn sáng 28/8 tại Ngã Ba Giồng, Hóc Môn.",
      },
    ],
    diTich: [
      {
        ten: "Khu tưởng niệm Liệt sĩ Ngã Ba Giồng (di tích lịch sử cấp quốc gia)",
        diaDiem: "Xã Xuân Thới Thượng, huyện Hóc Môn, TP. Hồ Chí Minh",
      },
      {
        ten: "Nhà lưu niệm Nguyễn Thị Minh Khai",
        diaDiem: "Thành phố Vinh, Nghệ An",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 28 tháng 8 dương lịch (có nơi theo ngày 7 tháng 7 âm lịch) tại Hóc Môn (TP. Hồ Chí Minh) và thành phố Vinh (Nghệ An)."],
    ghiChuSuLieu:
      "Theo hồ sơ khảo cứu, hài cốt sau khi bà bị xử bắn bị vùi lấp tại bãi bắn Hóc Môn, sau được quy tập về Nghĩa trang Liệt sĩ Ngã Ba Giồng. Tương truyền trong thời gian bị giam, bà viết thơ lên tường nhà giam.",
    wikiTitle: "Nguyễn Thị Minh Khai",
    nguon: ["Hội Liên hiệp Phụ nữ Việt Nam; Cổng thông tin điện tử TP. Hồ Chí Minh.", "Bảo tàng Xô viết Nghệ Tĩnh."],
  },
  {
    slug: "ha-huy-tap",
    ten: "Hà Huy Tập",
    tenThat: null,
    tenKhac: ["Sinichkin", "Nhược Ái", "Ba"],
    namSinh: "1906",
    namMat: "1941",
    nienDai: "1906 – 1941",
    queQuan: "Làng Kim Nặc, tổng Lạc Thiện, huyện Cẩm Xuyên, tỉnh Hà Tĩnh; nay thuộc xã Cẩm Hưng, huyện Cẩm Xuyên, Hà Tĩnh",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1936,
    tomTat:
      "Tổng Bí thư Đảng Cộng sản Đông Dương (1936–1938), tác giả Sơ thảo lịch sử phong trào cộng sản ở Đông Dương (1933); bị bắt năm 1938 và bị xử bắn tại Hóc Môn ngày 28/8/1941.",
    tieuSu: [
      "Hà Huy Tập sinh ngày 24/4/1906 ở làng Kim Nặc, huyện Cẩm Xuyên, Hà Tĩnh. Năm 1932, ông tốt nghiệp Đại học Phương Đông (Moskva), rồi tham gia khôi phục cơ quan lãnh đạo của Đảng sau giai đoạn thoái trào 1930–1931.",
      "Năm 1933, ông viết Sơ thảo lịch sử phong trào cộng sản ở Đông Dương, cuốn sách lịch sử Đảng đầu tiên. Từ năm 1936 đến 1938, ông giữ chức Tổng Bí thư Ban Chấp hành Trung ương, chỉ đạo chuyển hướng đưa Đảng ra hoạt động nửa công khai trong thời kỳ Mặt trận Dân chủ.",
      "Năm 1938, ông bị Pháp bắt; sau Khởi nghĩa Nam Kỳ, ông bị kết án tử hình và bị xử bắn sáng 28/8/1941 tại Hóc Môn.",
    ],
    boiCanh: ["Sau giai đoạn thoái trào 1930–1931, hệ thống tổ chức của Đảng được khôi phục; trong thời kỳ Mặt trận Dân chủ, Đảng chuyển sang hoạt động nửa công khai."],
    congTrang: [
      "Tổng Bí thư Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương (1936–1938).",
      "Tác giả Sơ thảo lịch sử phong trào cộng sản ở Đông Dương (1933), cuốn sách lịch sử Đảng đầu tiên.",
      "Tham gia khôi phục cơ quan lãnh đạo của Đảng sau giai đoạn 1930–1931.",
    ],
    suKien: [
      {
        nam: "1906",
        text: "Sinh ngày 24/4 ở làng Kim Nặc, Hà Tĩnh.",
      },
      {
        nam: "1932",
        text: "Tốt nghiệp Đại học Phương Đông (Moskva).",
      },
      {
        nam: "1936 – 1938",
        text: "Giữ chức Tổng Bí thư.",
      },
      {
        nam: "1938",
        text: "Bị Pháp bắt.",
      },
      {
        nam: "1941",
        text: "Bị xử bắn sáng 28/8 tại Hóc Môn.",
      },
    ],
    diTich: [
      {
        ten: "Khu lưu niệm và Mộ Tổng Bí thư Hà Huy Tập (di tích lịch sử cấp quốc gia)",
        diaDiem: "Thôn Hưng Thắng, xã Cẩm Hưng, huyện Cẩm Xuyên, Hà Tĩnh",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 28 tháng 8 dương lịch hằng năm tại huyện Cẩm Xuyên, Hà Tĩnh."],
    ghiChuSuLieu:
      "Theo hồ sơ khảo cứu, việc tìm kiếm di hài kéo dài gần 70 năm; đến cuối năm 2009, di hài được tìm thấy tại Hóc Môn và đưa về an táng tại quê hương Hà Tĩnh.",
    wikiTitle: "Hà Huy Tập",
    nguon: ["Hà Huy Tập – Tiểu sử, NXB Chính trị Quốc gia Sự thật.", "Cổng thông tin điện tử tỉnh Hà Tĩnh."],
  },
  {
    slug: "nguyen-van-cu",
    ten: "Nguyễn Văn Cừ",
    tenThat: null,
    tenKhac: ["Phùng", "Trí Con", "Thắng"],
    namSinh: "1912",
    namMat: "1941",
    nienDai: "1912 – 1941",
    queQuan: "Làng Phù Khê, tổng Nghĩa Lập, phủ Từ Sơn, tỉnh Bắc Ninh; nay thuộc phường Phù Khê, thành phố Từ Sơn, Bắc Ninh",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1938,
    tomTat:
      "Tổng Bí thư Đảng Cộng sản Đông Dương (1938–1940), tác giả Tự chỉ trích (1939), chủ trì Hội nghị Trung ương 6 (tháng 11/1939); bị bắt ngày 18/1/1940 và bị xử bắn tại Hóc Môn ngày 28/8/1941.",
    tieuSu: [
      "Nguyễn Văn Cừ sinh ngày 9/7/1912 ở làng Phù Khê, phủ Từ Sơn, Bắc Ninh. Năm 1928, ông tham gia phong trào “vô sản hóa”, làm việc ở mỏ than Mạo Khê, Vàng Danh (Quảng Ninh).",
      "Tháng 3/1938, ông được bầu làm Tổng Bí thư Ban Chấp hành Trung ương khi 26 tuổi. Tháng 7/1939, ông viết tác phẩm Tự chỉ trích về phê bình và tự phê bình trong sinh hoạt Đảng. Tháng 11/1939, ông chủ trì Hội nghị Trung ương 6 tại Bà Điểm (Hóc Môn), quyết định đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.",
      "Ngày 18/1/1940, ông bị mật thám bắt ở Sài Gòn và bị xử bắn sáng 28/8/1941 tại Hóc Môn.",
    ],
    boiCanh: ["Cuối thập niên 1930, Đảng Cộng sản Đông Dương chuyển hướng chỉ đạo chiến lược, đặt nhiệm vụ giải phóng dân tộc lên trên hết (Hội nghị Trung ương 6, tháng 11/1939)."],
    congTrang: [
      "Được bầu làm Tổng Bí thư Ban Chấp hành Trung ương tháng 3/1938, khi 26 tuổi.",
      "Chủ trì Hội nghị Trung ương 6 (tháng 11/1939) tại Bà Điểm, Hóc Môn.",
      "Viết tác phẩm Tự chỉ trích (tháng 7/1939).",
    ],
    suKien: [
      {
        nam: "1912",
        text: "Sinh ngày 9/7 ở làng Phù Khê, Bắc Ninh.",
      },
      {
        nam: "1928",
        text: "Tham gia phong trào “vô sản hóa” ở vùng mỏ Quảng Ninh.",
      },
      {
        nam: "1938",
        text: "Được bầu làm Tổng Bí thư (tháng 3).",
      },
      {
        nam: "1939",
        text: "Tháng 7 viết Tự chỉ trích; tháng 11 chủ trì Hội nghị Trung ương 6.",
      },
      {
        nam: "1940 – 1941",
        text: "Bị bắt ngày 18/1/1940 ở Sài Gòn; bị xử bắn sáng 28/8/1941 tại Hóc Môn.",
      },
    ],
    diTich: [
      {
        ten: "Khu lưu niệm Tổng Bí thư Nguyễn Văn Cừ (di tích quốc gia đặc biệt)",
        diaDiem: "Phường Phù Khê, thành phố Từ Sơn, Bắc Ninh",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 28 tháng 8 dương lịch (có nơi theo ngày 7 tháng 7 âm lịch) tại Bắc Ninh và Hóc Môn (TP. Hồ Chí Minh)."],
    ghiChuSuLieu: "Một số tài liệu trước đây ghi năm sinh 1913; ngày sinh chính thức hiện được thống nhất là 9/7/1912.",
    wikiTitle: "Nguyễn Văn Cừ",
    nguon: ["Viện Lịch sử Đảng; Báo Nhân Dân.", "Cổng thông tin điện tử tỉnh Bắc Ninh."],
  },
  {
    slug: "kim-dong",
    ten: "Kim Đồng",
    tenThat: "Nông Văn Dền",
    tenKhac: [],
    namSinh: "1929",
    namMat: "1943",
    nienDai: "1929 – 1943",
    queQuan: "Làng Nà Mạ, huyện Hà Quảng, tỉnh Cao Bằng; nay thuộc xã Trường Hà, huyện Hà Quảng, Cao Bằng",
    thoiKy: "chong-phap",
    trieuDai: "Thời Pháp thuộc",
    namMoc: 1941,
    tomTat:
      "Người dân tộc Tày, đội trưởng đầu tiên của Đội Nhi đồng Cứu quốc (15/5/1941) ở Pác Bó, làm liên lạc cho cán bộ cách mạng; mất ngày 15/2/1943 khi 14 tuổi, được truy tặng Anh hùng Lực lượng vũ trang nhân dân năm 1997.",
    tieuSu: [
      "Kim Đồng tên thật là Nông Văn Dền, người dân tộc Tày, sinh năm 1929 ở làng Nà Mạ, huyện Hà Quảng, Cao Bằng. Ngày 15/5/1941, ông được bầu làm đội trưởng Đội Nhi đồng Cứu quốc (tiền thân của Đội Thiếu niên Tiền phong Hồ Chí Minh), gồm 5 đội viên đầu tiên, ở Pác Bó.",
      "Ông làm nhiệm vụ liên lạc, dẫn đường và chuyển công văn bí mật cho cán bộ Trung ương Đảng.",
      "Sáng 15/2/1943 (ngày 11 tháng Giêng năm Quý Mùi), phát hiện có quân phục kích gần nơi cán bộ họp, ông chạy tạo tiếng động để thu hút hỏa lực về phía mình, bị trúng đạn và mất bên bờ suối Lê-nin khi 14 tuổi. Năm 1997, ông được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    boiCanh: ["Đầu năm 1941, Nguyễn Ái Quốc về nước và lập căn cứ ở Pác Bó (Cao Bằng); tại đây Đội Nhi đồng Cứu quốc được thành lập ngày 15/5/1941."],
    congTrang: [
      "Đội trưởng đầu tiên của Đội Nhi đồng Cứu quốc, thành lập ngày 15/5/1941 ở Pác Bó.",
      "Làm liên lạc, dẫn đường, chuyển công văn bí mật cho cán bộ Trung ương Đảng.",
      "Sáng 15/2/1943, đánh lạc hướng toán quân phục kích để bảo vệ cuộc họp của cán bộ.",
    ],
    suKien: [
      {
        nam: "1929",
        text: "Sinh ở làng Nà Mạ, Hà Quảng, Cao Bằng.",
      },
      {
        nam: "1941",
        text: "Ngày 15/5 được bầu làm đội trưởng Đội Nhi đồng Cứu quốc.",
      },
      {
        nam: "1943",
        text: "Mất sáng 15/2 bên bờ suối Lê-nin.",
      },
      {
        nam: "1997",
        text: "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích lịch sử Kim Đồng (thuộc quần thể di tích quốc gia đặc biệt Pác Bó)",
        diaDiem: "Làng Nà Mạ, xã Trường Hà, huyện Hà Quảng, Cao Bằng",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 15 tháng 2 dương lịch (có nơi theo ngày 11 tháng Giêng âm lịch) tại Hà Quảng, Cao Bằng."],
    ghiChuSuLieu: "Tên khai sinh có tài liệu phiên âm là Nông Văn Thần; tên chính thức được xác nhận là Nông Văn Dền.",
    wikiTitle: "Kim Đồng",
    nguon: ["Hội đồng Đội Trung ương.", "Ban Quản lý Di tích quốc gia đặc biệt Pác Bó, tỉnh Cao Bằng."],
  },
  {
    slug: "phan-dinh-giot",
    ten: "Phan Đình Giót",
    tenThat: null,
    tenKhac: [],
    namSinh: "1922",
    namMat: "1954",
    nienDai: "1922 – 1954",
    queQuan: "Thôn Vĩnh Yên, xã Cẩm Quan, huyện Cẩm Xuyên, tỉnh Hà Tĩnh; nay thuộc xã Nam Phúc Thăng, huyện Cẩm Xuyên, Hà Tĩnh",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1954,
    tomTat:
      "Tiểu đội phó bộc phá thuộc Đại đoàn 312; tử trận ngày 13/3/1954 trong trận Him Lam mở màn Chiến dịch Điện Biên Phủ, khi dùng thân mình lấp lỗ châu mai; được truy tặng Anh hùng Lực lượng vũ trang nhân dân năm 1955.",
    tieuSu: [
      "Phan Đình Giót sinh năm 1922 ở thôn Vĩnh Yên, xã Cẩm Quan, huyện Cẩm Xuyên, Hà Tĩnh. Nhập ngũ năm 1950, ông tham gia các chiến dịch Trung Du, Hòa Bình, Tây Bắc và Thượng Lào.",
      "Ông là tiểu đội phó bộc phá thuộc Đại đội 58, Tiểu đoàn 428, Trung đoàn 102, Đại đoàn 312.",
      "Chiều tối 13/3/1954, trong trận tấn công cụm cứ điểm Him Lam mở màn Chiến dịch Điện Biên Phủ, một hỏa điểm của quân Pháp chặn đường tiến công. Dù đã bị thương, ông trườn lên dùng thân mình lấp lỗ châu mai, mở đường cho đơn vị xung phong, và tử trận tại chỗ. Ngày 31/3/1955, ông được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    boiCanh: ["Trận tấn công cụm cứ điểm Him Lam ngày 13/3/1954 mở màn Chiến dịch Điện Biên Phủ trong kháng chiến chống thực dân Pháp."],
    congTrang: [
      "Ngày 13/3/1954, dùng thân mình lấp lỗ châu mai ở Him Lam, mở đường cho đơn vị xung phong.",
      "Tham gia các chiến dịch Trung Du, Hòa Bình, Tây Bắc, Thượng Lào.",
      "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân ngày 31/3/1955.",
    ],
    suKien: [
      {
        nam: "1922",
        text: "Sinh ở xã Cẩm Quan, huyện Cẩm Xuyên, Hà Tĩnh.",
      },
      {
        nam: "1950",
        text: "Nhập ngũ.",
      },
      {
        nam: "1954",
        text: "Tử trận chiều tối 13/3 trong trận Him Lam, Điện Biên Phủ.",
      },
      {
        nam: "1955",
        text: "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân (31/3).",
      },
    ],
    diTich: [
      {
        ten: "Khu tưởng niệm Anh hùng Phan Đình Giót",
        diaDiem: "Xã Nam Phúc Thăng, huyện Cẩm Xuyên, Hà Tĩnh",
      },
      {
        ten: "Phần mộ tại Nghĩa trang Liệt sĩ A1 (di tích quốc gia đặc biệt)",
        diaDiem: "Thành phố Điện Biên Phủ, Điện Biên",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 13 tháng 3 dương lịch hằng năm tại huyện Cẩm Xuyên (Hà Tĩnh) và thành phố Điện Biên Phủ."],
    ghiChuSuLieu: "Năm 2020, xã Cẩm Quan được sáp nhập với Cẩm Nam và Cẩm Thăng thành xã Nam Phúc Thăng.",
    wikiTitle: "Phan Đình Giót",
    nguon: ["Bảo tàng Lịch sử Quân sự Việt Nam; Báo Quân đội Nhân dân.", "Cổng thông tin điện tử tỉnh Hà Tĩnh."],
  },
  {
    slug: "to-vinh-dien",
    ten: "Tô Vĩnh Diện",
    tenThat: null,
    tenKhac: [],
    namSinh: "1924",
    namMat: "1954",
    nienDai: "1924 – 1954",
    queQuan: "Làng Nông Xương, tổng Lương Xá, huyện Nông Cống, tỉnh Thanh Hóa; nay thuộc xã Nông Trường, huyện Triệu Sơn, Thanh Hóa",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1954,
    tomTat:
      "Trung đội phó pháo cao xạ thuộc Trung đoàn 367; mất đêm 1/2/1954 trên đường kéo pháo ở Điện Biên Phủ khi lao vào chèn bánh một khẩu pháo bị tuột dốc; được truy tặng Anh hùng Lực lượng vũ trang nhân dân năm 1955.",
    tieuSu: [
      "Tô Vĩnh Diện sinh năm 1924 ở làng Nông Xương, huyện Nông Cống, Thanh Hóa. Nhập ngũ năm 1949, ông là trung đội phó pháo cao xạ thuộc Đại đội 827, Tiểu đoàn 394, Trung đoàn 367.",
      "Tháng 1/1954, đơn vị ông kéo pháo cao xạ 37 mm nặng 2,4 tấn bằng tay qua các dãy núi vào lòng chảo Mường Thanh.",
      "Đêm 1/2/1954, khi đơn vị thực hiện lệnh kéo pháo ra vị trí an toàn theo phương châm “đánh chắc, tiến chắc”, dây tời bị đứt và khẩu pháo trôi xuống dốc Bản Chuối. Ông lao vào chèn bánh pháo, giữ khẩu pháo dừng lại bên bờ vực, và mất tại đó. Ngày 7/5/1955, ông được truy tặng Huân chương Quân công hạng Nhì và danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    boiCanh: ["Trong Chiến dịch Điện Biên Phủ, pháo được kéo bằng tay vào trận địa quanh lòng chảo Mường Thanh; sau khi phương châm tác chiến chuyển sang “đánh chắc, tiến chắc”, pháo được kéo ra vị trí an toàn."],
    congTrang: [
      "Đêm 1/2/1954, lao vào chèn bánh khẩu pháo bị đứt dây tời, giữ pháo dừng lại bên bờ vực.",
      "Cùng đơn vị kéo pháo cao xạ 37 mm bằng tay vào lòng chảo Mường Thanh (tháng 1/1954).",
      "Được truy tặng Huân chương Quân công hạng Nhì và danh hiệu Anh hùng Lực lượng vũ trang nhân dân (7/5/1955).",
    ],
    suKien: [
      {
        nam: "1924",
        text: "Sinh ở làng Nông Xương, Thanh Hóa.",
      },
      {
        nam: "1949",
        text: "Nhập ngũ.",
      },
      {
        nam: "1954",
        text: "Tháng 1 kéo pháo vào Mường Thanh; đêm 1/2 mất khi chèn bánh pháo trên dốc Bản Chuối.",
      },
      {
        nam: "1955",
        text: "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân (7/5).",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Anh hùng Tô Vĩnh Diện",
        diaDiem: "Xã Nông Trường, huyện Triệu Sơn, Thanh Hóa",
      },
      {
        ten: "Phần mộ tại Nghĩa trang Liệt sĩ A1 (di tích quốc gia đặc biệt)",
        diaDiem: "Thành phố Điện Biên Phủ, Điện Biên",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 1 tháng 2 dương lịch hằng năm tại huyện Triệu Sơn, Thanh Hóa."],
    ghiChuSuLieu:
      "Quê gốc thuộc huyện Nông Cống; năm 1964 huyện Triệu Sơn được tách lập nên nay thuộc địa giới Triệu Sơn. Tương truyền câu nói cuối cùng của ông là “Pháo có việc gì không các cậu?”.",
    wikiTitle: "Tô Vĩnh Diện",
    nguon: ["Bảo tàng Phòng không – Không quân; Báo Quân đội Nhân dân.", "Cổng thông tin điện tử tỉnh Thanh Hóa."],
  },
  {
    slug: "be-van-dan",
    ten: "Bế Văn Đàn",
    tenThat: null,
    tenKhac: [],
    namSinh: "1931",
    namMat: "1953",
    nienDai: "1931 – 1953",
    queQuan: "Bản Buổng, xã Triệu Ẩu, huyện Phục Hòa, tỉnh Cao Bằng; nay thuộc xã Bế Văn Đàn, huyện Quảng Hòa, Cao Bằng",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1953,
    tomTat:
      "Người dân tộc Tày, tiểu đội phó liên lạc thuộc Đại đoàn 316; tử trận ngày 12/12/1953 ở Mường Pồn khi dùng vai làm giá đỡ khẩu trung liên cho đồng đội bắn; được truy tặng Anh hùng Lực lượng vũ trang nhân dân năm 1955.",
    tieuSu: [
      "Bế Văn Đàn, người dân tộc Tày, sinh năm 1931 ở bản Buổng, xã Triệu Ẩu, huyện Phục Hòa, Cao Bằng. Nhập ngũ năm 1948, ông là đảng viên, tiểu đội phó liên lạc thuộc Đại đội 674, Tiểu đoàn 251, Trung đoàn 174, Đại đoàn 316.",
      "Tháng 12/1953, đơn vị ông tham gia chiến dịch giải phóng Lai Châu, chặn đánh quân Pháp tại Mường Pồn. Ngày 12/12/1953, khi khẩu trung liên của đồng đội Chu Văn Pù không có chỗ tì trên địa hình trống trải, ông đặt hai càng súng lên vai mình để đồng đội bắn, rồi trúng đạn và tử trận.",
      "Ngày 31/8/1955, ông được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    boiCanh: ["Trong Chiến dịch Đông Xuân 1953–1954, bộ đội tiến công giải phóng Lai Châu; trận Mường Pồn diễn ra tháng 12/1953."],
    congTrang: [
      "Ngày 12/12/1953 ở Mường Pồn, dùng vai làm giá đỡ khẩu trung liên cho đồng đội bắn.",
      "Tham gia chiến dịch giải phóng Lai Châu (tháng 12/1953).",
      "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân (31/8/1955).",
    ],
    suKien: [
      {
        nam: "1931",
        text: "Sinh ở bản Buổng, Cao Bằng.",
      },
      {
        nam: "1948",
        text: "Nhập ngũ.",
      },
      {
        nam: "1953",
        text: "Tử trận ngày 12/12 trong trận Mường Pồn.",
      },
      {
        nam: "1955",
        text: "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân (31/8).",
      },
    ],
    diTich: [
      {
        ten: "Khu di tích lịch sử Chiến thắng Mường Pồn (di tích quốc gia)",
        diaDiem: "Xã Mường Pồn, huyện Điện Biên, Điện Biên",
      },
      {
        ten: "Nhà lưu niệm Anh hùng Bế Văn Đàn",
        diaDiem: "Xã Bế Văn Đàn, huyện Quảng Hòa, Cao Bằng",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 12 tháng 12 dương lịch hằng năm tại huyện Điện Biên (Điện Biên) và huyện Quảng Hòa (Cao Bằng)."],
    ghiChuSuLieu:
      "Xã quê ông trước đây là Triệu Ẩu (huyện Phục Hòa), sau được đổi tên thành xã Bế Văn Đàn; năm 2020, huyện Phục Hòa và Quảng Uyên sáp nhập thành huyện Quảng Hòa. Hình ảnh “lấy thân mình làm giá súng” được đưa vào nhiều bài thơ, bài hát.",
    wikiTitle: "Bế Văn Đàn",
    nguon: ["Bảo tàng Lịch sử Quân sự Việt Nam; Báo Quân đội Nhân dân.", "Cổng thông tin điện tử tỉnh Cao Bằng."],
  },
  {
    slug: "la-van-cau",
    ten: "La Văn Cầu",
    tenThat: "Sầm Phúc Hướng",
    tenKhac: [],
    namSinh: null,
    namMat: "2026",
    nienDai: "1931 – 2026",
    queQuan: "Xã Phong Nặm, huyện Trùng Khánh, tỉnh Cao Bằng",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1950,
    tomTat:
      "Người dân tộc Tày, chiến sĩ Trung đoàn 174; trong trận Đông Khê đêm 16/9/1950 mở màn Chiến dịch Biên giới, bị thương mất cánh tay phải vẫn tiếp tục đánh bộc phá lô cốt; được phong Anh hùng Lực lượng vũ trang nhân dân năm 1952.",
    tieuSu: [
      "La Văn Cầu tên khai sinh là Sầm Phúc Hướng, người dân tộc Tày, quê xã Phong Nặm, huyện Trùng Khánh, Cao Bằng; khi nhập ngũ năm 1948, ông đổi tên là La Văn Cầu. Ông là chiến sĩ Trung đoàn 174, tham gia 16 trận đánh lớn.",
      "Đêm 16/9/1950, trong trận đánh đồn Đông Khê mở màn Chiến dịch Biên giới Thu Đông 1950, ông được giao ôm bộc phá phá lô cốt. Cánh tay phải bị thương nặng, ông đề nghị đồng đội cắt bỏ phần tay bị thương rồi tiếp tục ôm khối bộc phá 12 kg lên đánh sập lô cốt số 3.",
      "Năm 1952, tại Đại hội Chiến sĩ thi đua toàn quốc lần thứ nhất, ông được phong danh hiệu Anh hùng Lực lượng vũ trang nhân dân, là một trong 7 anh hùng đầu tiên của Quân đội. Ông từ trần ngày 24/6/2026, hưởng thọ 94 tuổi.",
    ],
    boiCanh: ["Chiến dịch Biên giới Thu Đông 1950 mở màn bằng trận tiến công cứ điểm Đông Khê (Cao Bằng) đêm 16/9/1950."],
    congTrang: [
      "Đêm 16/9/1950, đánh sập lô cốt số 3 ở đồn Đông Khê dù bị thương mất cánh tay phải.",
      "Chiến sĩ Trung đoàn 174, tham gia 16 trận đánh lớn.",
      "Được phong danh hiệu Anh hùng Lực lượng vũ trang nhân dân năm 1952, một trong 7 anh hùng đầu tiên của Quân đội.",
    ],
    suKien: [
      {
        nam: "1931",
        text: "Sinh ở xã Phong Nặm, Cao Bằng (có nguồn ghi năm 1932).",
      },
      {
        nam: "1948",
        text: "Nhập ngũ, đổi tên là La Văn Cầu.",
      },
      {
        nam: "1950",
        text: "Đêm 16/9 đánh lô cốt ở đồn Đông Khê, mở màn Chiến dịch Biên giới.",
      },
      {
        nam: "1952",
        text: "Được phong danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
      },
      {
        nam: "2026",
        text: "Từ trần ngày 24/6/2026, hưởng thọ 94 tuổi.",
      },
    ],
    diTich: [],
    tuongNiem: [],
    ghiChuSuLieu:
      "Năm sinh được các nguồn ghi là 1931 hoặc 1932. Ông từ trần ngày 24/6/2026 (94 tuổi); hiện vật và tượng của ông được trưng bày tại Bảo tàng Lịch sử Quân sự Việt Nam và Bảo tàng Chiến thắng Đông Khê (Cao Bằng).",
    wikiTitle: "La Văn Cầu",
    nguon: ["Cổng thông tin điện tử Bộ Quốc phòng; Báo Nhân Dân.", "Bảo tàng Lịch sử Quân sự Việt Nam."],
  },
  {
    slug: "nguyen-viet-xuan",
    ten: "Nguyễn Viết Xuân",
    tenThat: null,
    tenKhac: [],
    namSinh: "1933",
    namMat: "1964",
    nienDai: "1933 – 1964",
    queQuan: "Làng Thượng Lãng, xã Ngũ Kiên, huyện Vĩnh Tường, tỉnh Vĩnh Phúc",
    thoiKy: "hien-dai",
    trieuDai: "Kháng chiến chống Mỹ",
    namMoc: 1964,
    tomTat:
      "Thiếu úy, Chính trị viên Đại đội 3, Tiểu đoàn 14 pháo cao xạ; mất ngày 18/11/1964 khi chỉ huy đơn vị chiến đấu với máy bay Mỹ ở miền Tây Quảng Bình; được truy tặng Anh hùng Lực lượng vũ trang nhân dân năm 1967.",
    tieuSu: [
      "Nguyễn Viết Xuân sinh năm 1933 ở làng Thượng Lãng, xã Ngũ Kiên, huyện Vĩnh Tường, Vĩnh Phúc. Nhập ngũ năm 1952, ông phục vụ Chiến dịch Điện Biên Phủ trong lực lượng phòng không.",
      "Năm 1964, ông là thiếu úy, Chính trị viên Đại đội 3, Tiểu đoàn 14 pháo cao xạ thuộc Sư đoàn 325, bảo vệ vùng trời miền Tây Quảng Bình.",
      "Ngày 18/11/1964, trong trận đánh tốp máy bay F-100 và F-105 của Mỹ ở khu vực Cha Lo, ông bị thương nặng ở đùi phải nhưng tiếp tục chỉ huy đơn vị, và mất trong ngày. Ngày 1/1/1967, ông được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    boiCanh: ["Nguyễn Viết Xuân chiến đấu trong giai đoạn đầu của cuộc kháng chiến chống Mỹ, khi không quân Mỹ đánh phá miền Bắc; đơn vị ông bảo vệ vùng trời miền Tây Quảng Bình."],
    congTrang: [
      "Ngày 18/11/1964, bị thương nặng vẫn tiếp tục chỉ huy đơn vị pháo cao xạ chiến đấu ở Cha Lo.",
      "Phục vụ Chiến dịch Điện Biên Phủ trong lực lượng phòng không.",
      "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân (1/1/1967).",
    ],
    suKien: [
      {
        nam: "1933",
        text: "Sinh ở làng Thượng Lãng, Vĩnh Phúc.",
      },
      {
        nam: "1952",
        text: "Nhập ngũ.",
      },
      {
        nam: "1964",
        text: "Mất ngày 18/11 trong trận đánh máy bay Mỹ ở Cha Lo, Quảng Bình.",
      },
      {
        nam: "1967",
        text: "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân (1/1).",
      },
    ],
    diTich: [
      {
        ten: "Nhà tưởng niệm Anh hùng liệt sĩ Nguyễn Viết Xuân (di tích lịch sử cấp tỉnh)",
        diaDiem: "Xã Ngũ Kiên, huyện Vĩnh Tường, Vĩnh Phúc",
      },
      {
        ten: "Nghĩa trang Liệt sĩ huyện Minh Hóa",
        diaDiem: "Huyện Minh Hóa, Quảng Bình",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 18 tháng 11 dương lịch (có nơi theo ngày 15 tháng 10 âm lịch)."],
    ghiChuSuLieu:
      "Trận đánh ngày 18/11/1964 diễn ra ở đồi Cha Lo, xã Dân Hóa, huyện Minh Hóa, Quảng Bình. Khẩu lệnh “Nhằm thẳng quân thù, bắn!” gắn với tên ông.",
    wikiTitle: "Nguyễn Viết Xuân",
    nguon: ["Báo Quân đội Nhân dân; Bảo tàng Phòng không – Không quân.", "Cổng thông tin điện tử tỉnh Vĩnh Phúc."],
  },
  {
    slug: "nguyen-van-troi",
    ten: "Nguyễn Văn Trỗi",
    tenThat: null,
    tenKhac: [],
    namSinh: "1940",
    namMat: "1964",
    nienDai: "1940 – 1964",
    queQuan: "Làng Thanh Quýt, xã Điện Thắng, huyện Điện Bàn, tỉnh Quảng Nam; nay thuộc phường Điện Thắng Trung, thị xã Điện Bàn, Quảng Nam",
    thoiKy: "hien-dai",
    trieuDai: "Kháng chiến chống Mỹ",
    namMoc: 1964,
    tomTat:
      "Thành viên lực lượng Biệt động Sài Gòn; bị bắt ngày 9/5/1964 khi đặt mìn ở cầu Công Lý nhằm vào phái đoàn của Bộ trưởng Quốc phòng Mỹ Robert McNamara, và bị xử bắn tại Khám Chí Hòa ngày 15/10/1964.",
    tieuSu: [
      "Nguyễn Văn Trỗi sinh ngày 1/2/1940 ở làng Thanh Quýt, huyện Điện Bàn, Quảng Nam. Ông tham gia lực lượng Biệt động Sài Gòn, thuộc Đại đội Quyết tử 65 cánh Tây Nam.",
      "Tháng 5/1964, ông nhận nhiệm vụ đặt mìn tại cầu Công Lý (Sài Gòn) nhằm vào phái đoàn quân sự cấp cao của Mỹ do Bộ trưởng Quốc phòng Robert McNamara dẫn đầu. Kế hoạch bị lộ, ông bị bắt ngày 9/5/1964 và không khai báo cơ sở trong thời gian bị giam.",
      "Rạng sáng 15/10/1964, ông bị xử bắn tại Khám Chí Hòa, Sài Gòn; vụ xử bắn được báo chí quốc tế ghi hình. Ngày 17/10/1964, Mặt trận Dân tộc Giải phóng miền Nam Việt Nam truy tặng ông Huân chương Thành đồng hạng Nhất và danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    boiCanh: ["Năm 1964, trong thời kỳ Chiến tranh đặc biệt ở miền Nam, lực lượng Biệt động hoạt động trong đô thị Sài Gòn chống sự can thiệp quân sự của Mỹ."],
    congTrang: [
      "Tháng 5/1964, nhận nhiệm vụ đặt mìn ở cầu Công Lý nhằm vào phái đoàn quân sự cấp cao của Mỹ.",
      "Thành viên Biệt động Sài Gòn, Đại đội Quyết tử 65 cánh Tây Nam.",
      "Không khai báo cơ sở trong thời gian bị giam (tháng 5 – tháng 10/1964).",
    ],
    suKien: [
      {
        nam: "1940",
        text: "Sinh ngày 1/2 ở làng Thanh Quýt, Quảng Nam.",
      },
      {
        nam: "Tháng 5/1964",
        text: "Đặt mìn ở cầu Công Lý; bị bắt ngày 9/5.",
      },
      {
        nam: "Tháng 10/1964",
        text: "Bị xử bắn rạng sáng 15/10 tại Khám Chí Hòa; ngày 17/10 được truy tặng danh hiệu Anh hùng.",
      },
    ],
    diTich: [
      {
        ten: "Nhà lưu niệm Anh hùng liệt sĩ Nguyễn Văn Trỗi (di tích lịch sử cấp quốc gia)",
        diaDiem: "Phường Điện Thắng Trung, thị xã Điện Bàn, Quảng Nam",
      },
      {
        ten: "Phần mộ tại Nghĩa trang Liệt sĩ TP. Hồ Chí Minh",
        diaDiem: "TP. Hồ Chí Minh",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 15 tháng 10 dương lịch hằng năm tại Điện Bàn (Quảng Nam) và TP. Hồ Chí Minh."],
    ghiChuSuLieu:
      "Cuộc đời ông được kể lại trong bút ký Sống như Anh của nhà văn Trần Đình Vân. Theo hồ sơ khảo cứu, vụ việc gây chú ý quốc tế: du kích ở Venezuela đã bắt giữ Trung tá Mỹ Smolen để đòi trao đổi lấy ông.",
    wikiTitle: "Nguyễn Văn Trỗi",
    nguon: ["Cổng thông tin điện tử tỉnh Quảng Nam; Bảo tàng Chứng tích Chiến tranh.", "NXB Quân đội Nhân dân."],
  },
  {
    slug: "mac-thi-buoi",
    ten: "Mạc Thị Bưởi",
    tenThat: null,
    tenKhac: [],
    namSinh: "1927",
    namMat: "1951",
    nienDai: "1927 – 1951",
    queQuan: "Làng Long Động, xã Nam Tân, huyện Nam Sách, tỉnh Hải Dương",
    thoiKy: "hien-dai",
    trieuDai: "Việt Nam Dân chủ Cộng hòa",
    namMoc: 1951,
    tomTat:
      "Du kích, liên lạc viên ở Nam Sách (Hải Dương) trong kháng chiến chống thực dân Pháp; bị bắt khi vận chuyển vũ khí và mất ngày 23/4/1951; được truy tặng Anh hùng Lực lượng vũ trang nhân dân năm 1955.",
    tieuSu: [
      "Mạc Thị Bưởi sinh năm 1927 ở làng Long Động, huyện Nam Sách, Hải Dương. Từ năm 1946, bà hoạt động du kích bí mật trong vùng quân Pháp kiểm soát ở Nam Sách, làm liên lạc viên.",
      "Bà xây dựng cơ sở kháng chiến trong vùng địch hậu, tổ chức tiếp tế lương thực, thuốc men qua sông Kinh Thầy về căn cứ, và nhiều lần vào đồn Pháp nắm tình hình.",
      "Tháng 4/1951, khi vận chuyển vũ khí phục vụ Chiến dịch Hoàng Hoa Thám, bà bị bắt, không khai báo và mất ngày 23/4/1951 (ngày 18 tháng 3 năm Tân Mão). Ngày 31/8/1955, Chủ tịch Hồ Chí Minh ký sắc lệnh truy tặng bà danh hiệu Anh hùng Lực lượng vũ trang nhân dân.",
    ],
    boiCanh: ["Trong kháng chiến chống thực dân Pháp, huyện Nam Sách (Hải Dương) nằm trong vùng quân Pháp kiểm soát; lực lượng du kích hoạt động bí mật tại đây."],
    congTrang: [
      "Hoạt động du kích, làm liên lạc viên trong vùng quân Pháp kiểm soát ở Nam Sách từ năm 1946.",
      "Xây dựng cơ sở kháng chiến, tổ chức tiếp tế lương thực, thuốc men qua sông Kinh Thầy.",
      "Vận chuyển vũ khí phục vụ Chiến dịch Hoàng Hoa Thám (tháng 4/1951).",
    ],
    suKien: [
      {
        nam: "1927",
        text: "Sinh ở làng Long Động, Nam Sách, Hải Dương.",
      },
      {
        nam: "1946",
        text: "Bắt đầu hoạt động du kích bí mật ở Nam Sách.",
      },
      {
        nam: "1951",
        text: "Bị bắt khi vận chuyển vũ khí; mất ngày 23/4.",
      },
      {
        nam: "1955",
        text: "Được truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân (31/8).",
      },
    ],
    diTich: [
      {
        ten: "Đền thờ Anh hùng liệt sĩ Mạc Thị Bưởi (di tích lịch sử cấp quốc gia)",
        diaDiem: "Thôn Long Động, xã Nam Tân, huyện Nam Sách, Hải Dương",
      },
    ],
    tuongNiem: ["Tưởng niệm ngày 23 tháng 4 dương lịch (có nơi theo ngày 18 tháng 3 âm lịch) tại xã Nam Tân, huyện Nam Sách, Hải Dương."],
    ghiChuSuLieu:
      "Hồ sơ khảo cứu ghi bà là nữ Anh hùng Lực lượng vũ trang nhân dân đầu tiên của Quân đội nhân dân Việt Nam. Thôn Long Động, quê bà, cũng là đất phát tích của nhà Mạc.",
    wikiTitle: "Mạc Thị Bưởi",
    nguon: ["Cổng thông tin điện tử tỉnh Hải Dương; Bảo tàng Phụ nữ Việt Nam.", "Bảo tàng Lịch sử Quốc gia."],
  },
];
