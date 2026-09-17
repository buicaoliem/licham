export type VanKhanNhom = "Trong nhà" | "Lễ tết" | "Việc lớn" | "Cầu an";

export const VAN_KHAN_NHOM_LIST: readonly VanKhanNhom[] = ["Trong nhà", "Lễ tết", "Việc lớn", "Cầu an"] as const;

export interface BaiKhanPhan {
  /** Tiêu đề riêng khi một bài có nhiều phần, ví dụ "Bài khấn thần linh" và "Bài khấn gia tiên". */
  tieuDe?: string;
  /** Mỗi phần tử là một đoạn văn; xuống dòng trong cùng đoạn dùng "\n". */
  doanVan: readonly string[];
}

export interface VanKhanBai {
  slug: string;
  ten: string;
  nhom: VanKhanNhom;
  moTa: string;
  samLe: readonly string[];
  luuY: readonly string[];
  baiKhan: readonly BaiKhanPhan[];
}

export const VAN_KHAN_LIST: readonly VanKhanBai[] = [
  {
    slug: "mung-mot-ngay-ram",
    ten: "Văn khấn mùng một và ngày rằm",
    nhom: "Trong nhà",
    moTa: "Bài khấn thần linh và gia tiên trong nhà, đọc vào ngày mùng một và ngày rằm hằng tháng.",
    samLe: ["Hương: ba nén hoặc năm nén", "Hoa tươi: một lọ", "Trầu cau: một quả cau ba lá trầu", "Nước sạch: ba chén", "Mâm lễ: chay hoặc mặn tùy nhà"],
    luuY: ["Giờ nên khấn: sáng sớm hoặc chiều tối", "Khấn thần linh trước, gia tiên sau", "Trang phục chỉnh tề, sạch sẽ", "Thành tâm là chính, không cần thuộc lòng"],
    baiKhan: [
      {
        tieuDe: "Bài khấn thần linh",
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy các ngài Ngũ phương, Ngũ thổ, Phúc đức Tôn thần.\nCon kính lạy các vị Tôn thần cai quản trong khu vực này.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sửa biện hương hoa lễ vật, kim ngân trà quả, đốt nén hương thơm dâng lên trước án.",
          "Chúng con thành tâm kính mời các ngài giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật. Cúi xin các ngài thương xót tín chủ, phù hộ độ trì cho gia đình chúng con toàn gia an lạc, mọi việc hanh thông, người người được chữ bình an, tài lộc tăng tiến, tâm đạo mở mang, sở cầu tất ứng, sở nguyện tòng tâm.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
      {
        tieuDe: "Bài khấn gia tiên",
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, nhân ngày {mùng một hoặc ngày rằm}, chúng con thành tâm sắm sửa hương hoa lễ vật, trà quả, thắp nén tâm hương dâng lên trước án.",
          "Chúng con kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, bá thúc huynh đệ, cô di tỷ muội, và tất cả hương hồn trong nội tộc ngoại tộc của họ {họ}, cúi xin thương xót con cháu, linh thiêng giáng về linh sàng, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin các vị phù hộ độ trì cho con cháu mạnh khỏe, gia đạo hưng long, làm ăn thuận lợi, con cháu học hành tấn tới.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "gia-tien-ngay-gio",
    ten: "Văn khấn gia tiên ngày giỗ",
    nhom: "Trong nhà",
    moTa: "Bài khấn ngày giỗ ông bà cha mẹ, dùng cho giỗ đầu, giỗ hết và giỗ thường.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm cơm cúng: món người đã khuất lúc sinh thời ưa thích", "Rượu, nước, trà", "Vàng mã tùy tâm"],
    luuY: ["Cúng vào buổi sáng hoặc trưa ngày giỗ", "Trước ngày giỗ chính thường có lễ cáo giỗ vào chiều hôm trước", "Khấn thần linh trước, sau mới khấn người được giỗ"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Táo quân, Thổ Địa, Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, chính ngày húy nhật của {quan hệ và tên người được giỗ}.",
          "Chúng con cùng toàn thể con cháu trong nhà thành tâm sắm sửa hương hoa lễ vật, cơm canh trà quả, thắp nén tâm hương dâng lên trước án.",
          "Chúng con kính mời hương linh {tên người được giỗ} giáng về linh sàng, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin hương linh thương xót con cháu, phù hộ độ trì cho toàn gia mạnh khỏe bình an, công việc hanh thông, con cháu hiếu thuận, gia đạo êm ấm.",
          "Chúng con cũng kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị hương linh nội ngoại, cùng về hâm hưởng.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "than-tai-tho-dia",
    ten: "Văn khấn Thần Tài Thổ Địa",
    nhom: "Trong nhà",
    moTa: "Bài khấn ban Thần Tài Thổ Địa, đọc hằng ngày hoặc vào ngày vía Thần Tài mùng mười tháng Giêng.",
    samLe: [
      "Hương, hoa tươi",
      "Nước sạch, rượu",
      "Trái cây, bánh kẹo",
      "Ngày vía Thần Tài thêm: bộ tam sên gồm miếng thịt luộc, trứng luộc, tôm hoặc cua luộc",
      "Cá lóc nướng nếu theo tục miền Nam",
    ],
    luuY: ["Thắp hương buổi sáng sớm, thường trước khi mở cửa hàng", "Lau dọn ban thờ sạch sẽ trước khi khấn", "Ngày vía Thần Tài là mùng mười tháng Giêng âm lịch"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy ngài Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.\nCon kính lạy ngài Thần Tài vị tiền.\nCon kính lạy các ngài Thần linh Thổ Địa cai quản trong xứ này.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sửa biện hương hoa, lễ vật, kim ngân trà quả và các thứ cúng dâng, bày ra trước án kính mời ngài Thần Tài tiền vị.",
          "Cúi xin ngài thương xót tín chủ, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật, phù trì tín chủ chúng con an ninh khang thái, vạn sự tốt lành, gia đạo hưng long thịnh vượng, lộc tài tăng tiến, tâm đạo mở mang, sở cầu tất ứng, sở nguyện tòng tâm.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "ong-cong-ong-tao",
    ten: "Văn khấn ông Công ông Táo",
    nhom: "Lễ tết",
    moTa: "Bài khấn tiễn Táo quân về trời, đọc ngày 23 tháng Chạp.",
    samLe: [
      "Ba bộ mũ áo Táo quân: hai mũ đàn ông có cánh chuồn, một mũ đàn bà không cánh chuồn",
      "Cá chép: ba con sống để phóng sinh, hoặc cá chép giấy",
      "Hương, hoa, trầu cau, rượu, trà",
      "Mâm cỗ mặn hoặc chay tùy nhà",
      "Vàng mã",
    ],
    luuY: [
      "Cúng trước giờ Ngọ ngày 23 tháng Chạp, tức trước 12 giờ trưa",
      "Cá chép sống thả ở sông hồ sạch, thả nhẹ tay, không ném cả túi",
      "Bát hương và ban thờ lau dọn sau khi cúng xong",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày 23 tháng Chạp năm {năm}, tín chủ chúng con thành tâm sắm sửa hương hoa phẩm vật, xiêm hài áo mũ, kính dâng Tôn thần. Thắp nén tâm hương tín chủ con thành tâm kính bái.",
          "Chúng con kính mời ngài Đông Trù Tư mệnh Táo phủ Thần quân hiển linh trước án thụ hưởng lễ vật.",
          "Cúi xin Tôn thần gia ân xá tội cho mọi lỗi lầm trong năm qua mà gia chủ chúng con đã sai phạm. Xin Tôn thần ban phước lộc, phù hộ cho toàn gia chúng con, trai gái, già trẻ sức khỏe dồi dào, an khang thịnh vượng, vạn sự tốt lành.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "giao-thua-trong-nha",
    ten: "Văn khấn giao thừa trong nhà",
    nhom: "Lễ tết",
    moTa: "Bài khấn gia tiên vào thời khắc giao thừa, cúng trong nhà.",
    samLe: ["Hương, hoa, đèn nến", "Mâm ngũ quả", "Bánh chưng, mứt kẹo", "Trầu cau, rượu, trà", "Mâm cỗ mặn hoặc chay"],
    luuY: ["Cúng đúng thời khắc chuyển giao năm cũ sang năm mới", "Cúng ngoài trời trước, trong nhà sau", "Sau khi cúng xong mới bắt đầu chúc tết trong nhà"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Đương lai hạ sinh Di Lặc Tôn Phật.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy các cụ tổ tiên nội ngoại chư vị tiên linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Phút giao thừa năm cũ {năm cũ} qua, năm mới {năm mới} đến. Chúng con thành tâm sửa biện hương hoa phẩm vật, nghi lễ cung trần, dâng lên trước án.",
          "Chúng con kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị hương linh gia tiên nội ngoại họ {họ}, cúi xin thương xót con cháu, linh thiêng giáng về linh sàng, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Nguyện cầu năm mới toàn gia được bình an, mạnh khỏe, công việc hanh thông, con cháu học hành tấn tới, gia đạo hưng long.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "giao-thua-ngoai-troi",
    ten: "Văn khấn giao thừa ngoài trời",
    nhom: "Lễ tết",
    moTa: "Bài khấn tiễn quan Hành khiển năm cũ, đón quan Hành khiển năm mới, cúng ngoài sân.",
    samLe: ["Hương, đèn nến, hoa tươi", "Trầu cau, rượu, trà, nước sạch", "Bánh chưng, mứt kẹo, mâm ngũ quả", "Gà luộc hoặc mâm chay", "Vàng mã, quần áo mũ nón thần linh"],
    luuY: ["Bày mâm ngoài sân hoặc trước cửa, quay mặt ra ngoài", "Cúng đúng thời khắc giao thừa", "Cúng ngoài trời trước rồi mới vào trong nhà"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Đương lai hạ sinh Di Lặc Tôn Phật.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Cựu niên Đương cai Hành khiển.\nCon kính lạy ngài Tân niên Đương cai Hành khiển, Phán quan, Chi thần.\nCon kính lạy các ngài Ngũ phương Ngũ thổ Long mạch Tài thần, chư vị Bản gia Táo quân và chư vị Thần linh cai quản ở trong xứ này.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Nay là phút giao thừa năm {năm cũ} chuyển sang năm {năm mới}, chúng con thành tâm sửa biện hương hoa phẩm vật, nghi lễ cung trần, dâng lên trước án, cúng dâng Phật Thánh, dâng hiến Tôn thần, đốt nén tâm hương dốc lòng bái thỉnh.",
          "Chúng con kính mời ngài Cựu niên Đương cai, ngài Tân niên Đương cai, cùng chư vị Tôn thần giáng lâm trước án, thụ hưởng lễ vật.",
          "Cúi xin chư vị phù hộ độ trì cho toàn gia chúng con năm mới bình an, mọi sự tốt lành, người người khỏe mạnh, làm ăn thuận lợi.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "tat-nien",
    ten: "Văn khấn tất niên",
    nhom: "Lễ tết",
    moTa: "Bài khấn bữa cơm cuối năm, mời gia tiên về ăn tết cùng con cháu.",
    samLe: ["Hương, hoa, đèn nến", "Mâm ngũ quả", "Trầu cau, rượu, trà", "Mâm cỗ tất niên"],
    luuY: ["Thường cúng chiều ngày 30 tháng Chạp, nhà nào tháng thiếu thì ngày 29", "Cúng xong cả nhà quây quần ăn bữa cơm tất niên", "Nhiều nhà kết hợp lễ này với việc dọn dẹp ban thờ đón tết"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng Chạp năm {năm}, gặp tiết cuối năm, chúng con thành tâm sửa biện hương hoa phẩm vật, cơm canh trà quả, dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần, cùng các cụ tổ tiên nội ngoại, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật, về vui đón tết cùng con cháu.",
          "Cúi xin chư vị phù hộ độ trì cho toàn gia sang năm mới được mạnh khỏe bình an, làm ăn thuận lợi, gia đạo êm ấm.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "hoa-vang",
    ten: "Văn khấn hóa vàng",
    nhom: "Lễ tết",
    moTa: "Bài khấn tiễn gia tiên sau tết, thường làm mùng ba hoặc mùng bốn tháng Giêng.",
    samLe: ["Hương, hoa, trầu cau", "Mâm cỗ mặn hoặc chay", "Vàng mã, quần áo giấy", "Hai cây mía để làm gậy cho các cụ chống"],
    luuY: ["Thường làm từ mùng ba đến mùng bảy tháng Giêng, tùy nhà", "Hóa vàng của gia thần trước, gia tiên sau", "Hóa xong vẩy chút rượu vào tro"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Táo quân, Thổ Địa, Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng Giêng năm {năm}, tín chủ con thành tâm sắm sửa hương hoa phẩm vật, phù lưu thanh chước, lễ nghi cung trần, dâng lên trước án.",
          "Tiệc xuân đã mãn, lễ tạ kính dâng, nay xin thiêu hóa kim ngân, lễ tạ Tôn thần, rước tiễn tiên linh trở về âm giới.",
          "Cúi xin chư vị phù hộ độ trì cho toàn gia một năm mới bình an, mọi việc hanh thông, làm ăn phát đạt.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "ram-thang-gieng",
    ten: "Văn khấn rằm tháng Giêng",
    nhom: "Lễ tết",
    moTa: "Bài khấn Tết Nguyên tiêu, rằm đầu tiên của năm mới.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm ngũ quả", "Bánh trôi nước", "Mâm cỗ chay hoặc mặn tùy nhà"],
    luuY: ["Cúng đúng ngày rằm tháng Giêng, tức 15 tháng Giêng âm lịch", "Nhiều nhà cúng vào giờ Ngọ, tức khoảng 11 giờ đến 13 giờ", "Dân gian có câu cúng cả năm không bằng rằm tháng Giêng"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày rằm tháng Giêng năm {năm}, gặp tiết Nguyên tiêu, tín chủ con thành tâm sửa biện hương hoa lễ vật, trà quả, dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần cùng các cụ tổ tiên nội ngoại giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị phù hộ độ trì cho toàn gia một năm mới mạnh khỏe bình an, công việc hanh thông, gia đạo hưng long.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "ram-thang-bay",
    ten: "Văn khấn rằm tháng Bảy",
    nhom: "Lễ tết",
    moTa: "Bài khấn gia tiên ngày rằm tháng Bảy, mùa Vu lan báo hiếu.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm cơm chay hoặc mặn", "Trà, rượu, nước", "Vàng mã, quần áo giấy"],
    luuY: ["Cúng gia tiên ban ngày, cúng cô hồn để chiều tối", "Nhiều nhà cúng từ mùng hai đến ngày rằm tháng Bảy", "Lễ này gắn với đạo hiếu, nên làm thành tâm hơn là làm to"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày rằm tháng Bảy năm {năm}, nhân tiết Vu lan, chúng con nhớ đến công ơn sinh thành dưỡng dục của tổ tiên ông bà cha mẹ, thành tâm sắm sửa hương hoa lễ vật, cơm canh trà quả, dâng lên trước án.",
          "Chúng con kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị hương linh nội ngoại, giáng về linh sàng, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị phù hộ độ trì cho con cháu mạnh khỏe, gia đạo bình an, mọi sự tốt lành.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cung-co-hon",
    ten: "Văn khấn cúng cô hồn",
    nhom: "Lễ tết",
    moTa: "Bài khấn chúng sinh, thường làm chiều tối rằm tháng Bảy hoặc mùng hai, mười sáu hằng tháng.",
    samLe: [
      "Cháo trắng loãng múc ra nhiều chén nhỏ",
      "Bỏng ngô, khoai luộc, ngô luộc, bánh kẹo",
      "Muối gạo để rắc sau khi cúng",
      "Nước, hương, nến",
      "Tiền vàng, quần áo giấy",
    ],
    luuY: [
      "Cúng NGOÀI TRỜI, trước cửa nhà hoặc ngoài sân, không cúng trong nhà",
      "Cúng vào chiều tối",
      "Cúng xong rắc muối gạo ra bốn phương tám hướng",
      "Không mang đồ cúng cô hồn vào lại trong nhà",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Phật A Di Đà.\nCon kính lạy Đức Địa Tạng Vương Bồ Tát.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa, cháo muối gạo, bánh kẹo cùng các thứ lễ vật, bày ra trước án.",
          "Chúng con thành tâm kính mời các vong linh không nơi nương tựa, không người thờ cúng, các cô hồn phiêu bạt gần xa, về đây thụ hưởng lễ vật.",
          "Nguyện cầu các vong linh được siêu sinh tịnh độ, sớm về cõi an lành, không quấy nhiễu dương gian.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "ram-thang-tam",
    ten: "Văn khấn rằm tháng Tám",
    nhom: "Lễ tết",
    moTa: "Bài khấn Tết Trung thu, cúng gia tiên và trông trăng.",
    samLe: ["Bánh nướng, bánh dẻo", "Mâm ngũ quả, thường có bưởi, hồng, na, chuối", "Hương, hoa tươi, trà", "Đèn ông sao, đèn lồng cho trẻ nhỏ"],
    luuY: ["Cúng vào tối ngày rằm tháng Tám", "Mâm cỗ trông trăng bày ngoài sân hoặc nơi thoáng", "Đây là tết của trẻ con, nên làm vui là chính"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày rằm tháng Tám năm {năm}, gặp tiết Trung thu, tín chủ con thành tâm sắm sửa hương hoa lễ vật, bánh trái trà quả, dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần cùng các cụ tổ tiên nội ngoại giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị phù hộ độ trì cho toàn gia mạnh khỏe bình an, con cháu chăm ngoan học giỏi, gia đạo êm ấm.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "dong-tho",
    ten: "Văn khấn động thổ",
    nhom: "Việc lớn",
    moTa: "Bài khấn xin phép thổ thần trước khi khởi công đào móng xây nhà.",
    samLe: [
      "Mâm ngũ quả, hoa tươi, hương, đèn nến",
      "Trầu cau, rượu, trà, nước",
      "Gà luộc hoặc heo quay tùy điều kiện",
      "Xôi, bánh chưng",
      "Vàng mã, quần áo thần linh",
      "Ba hũ nhỏ đựng muối, gạo, nước",
    ],
    luuY: [
      "Chọn ngày giờ hợp tuổi gia chủ",
      "Gia chủ tự cuốc nhát đất đầu tiên sau khi khấn xong",
      "Tuổi gia chủ phạm Kim lâu, Hoang ốc, Tam tai thì thường mượn tuổi người khác",
      "Ba hũ muối gạo nước cất đi, khi nhập trạch đem đặt nơi bếp",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy Quan Đương niên.\nCon kính lạy các Tôn thần bản xứ.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm lễ, quả cau lá trầu, hương hoa trà quả, thắp nén tâm hương dâng lên trước án, có lời thưa rằng:",
          "Tín chủ con xin phép được khởi công động thổ xây dựng {công trình} tại {địa chỉ công trình}.",
          "Chúng con kính mời ngài Kim Niên Đương cai Thái tuế chí đức Tôn thần, ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Định phúc Táo quân, các ngài Địa chúa Long Mạch Tôn thần và tất cả các vị Thần linh cai quản trong khu vực này, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị độ cho công trình được thuận lợi, thợ thuyền bình an, mọi việc hanh thông, nhà cửa sớm thành, gia đạo hưng vượng.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "nhap-trach",
    ten: "Văn khấn nhập trạch",
    nhom: "Việc lớn",
    moTa: "Bài khấn khi dọn về nhà mới, xin phép thần linh và mời gia tiên về ngự.",
    samLe: ["Mâm ngũ quả, hoa tươi, hương", "Trầu cau, rượu, trà, nước", "Xôi, gà luộc hoặc mâm chay", "Bếp than đặt giữa cửa chính", "Chiếu hoặc đệm đang dùng, chổi mới, muối gạo"],
    luuY: [
      "Chọn ngày giờ hợp tuổi gia chủ",
      "Gia chủ bước qua bếp than vào nhà trước, tay cầm bát hương và bài vị",
      "Người trong nhà theo sau, mỗi người cầm một món đồ, không ai đi tay không",
      "Khấn thần linh trước, gia tiên sau",
      "Đêm đầu tiên nên ngủ lại nhà mới",
      "Khấn thần linh trước, sau đó mới khấn gia tiên.",
    ],
    baiKhan: [
      {
        tieuDe: "Bài khấn thần linh",
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy các vị Thần linh cai quản trong khu vực này.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm lễ, hương hoa trà quả, thắp nén tâm hương dâng lên trước án, kính cẩn thưa rằng:",
          "Gia đình chúng con vừa xây cất xong ngôi nhà tại {địa chỉ nhà mới}. Nay chọn được ngày lành tháng tốt, kính cẩn làm lễ nhập trạch, dọn về ở.",
          "Chúng con kính mời chư vị Tôn thần giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật, cho phép chúng con được rước vong linh gia tiên về nơi ở mới để thờ phụng.",
          "Cúi xin chư vị phù hộ độ trì cho gia đình chúng con an cư lạc nghiệp, người người mạnh khỏe, làm ăn thuận lợi, gia đạo hưng long.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
      {
        tieuDe: "Bài khấn gia tiên",
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, gia đình chúng con dọn về ngôi nhà mới tại {địa chỉ nhà mới}.",
          "Chúng con đã kính cáo chư vị Tôn thần, nay thành tâm sắm sửa hương hoa lễ vật, cơm canh trà quả, kính dâng lên trước án, cúi xin được rước chư vị hương linh tổ tiên về nơi ở mới để con cháu sớm hôm thờ phụng.",
          "Chúng con kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, bá thúc huynh đệ, cô di tỷ muội cùng toàn thể hương linh nội ngoại họ {họ}, cúi xin thương xót con cháu, linh thiêng giáng về, an ngự nơi bàn thờ mới, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin tổ tiên phù hộ độ trì cho gia đình chúng con tại nơi ở mới được an cư lạc nghiệp, người người mạnh khỏe, trên thuận dưới hòa, làm ăn thuận lợi, gia đạo hưng long.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "khai-truong",
    ten: "Văn khấn khai trương",
    nhom: "Việc lớn",
    moTa: "Bài khấn ngày mở cửa hàng, mở công ty, hoặc mở hàng đầu năm.",
    samLe: ["Mâm ngũ quả, hoa tươi, hương, đèn nến", "Trầu cau, rượu, trà, nước", "Xôi, gà luộc hoặc heo quay tùy quy mô", "Bánh kẹo, thuốc lá, chè", "Vàng mã"],
    luuY: [
      "Chọn ngày giờ hợp tuổi chủ cơ sở",
      "Bày lễ ngoài cửa hoặc trước cửa hàng",
      "Sau khi khấn xong mới chính thức mở cửa đón khách",
      "Khách đầu tiên thường chọn người hợp tuổi, vui vẻ",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Quan Đương niên Hành khiển Thái tuế chí đức Tôn thần.\nCon kính lạy các ngài Bản cảnh Thành hoàng chư vị Đại vương.\nCon kính lạy các ngài Ngũ phương, Ngũ thổ, Long Mạch, Tài thần, Định phúc Táo quân, chư vị Tôn thần.\nCon kính lạy các Thần linh cai quản trong khu vực này.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa lễ vật, quả cau lá trầu, hương hoa trà quả, thắp nén tâm hương dâng lên trước án, lòng thành tâu rằng:",
          "Tín chủ con xây cất, thuê được {cửa hàng, cơ sở} tại {địa chỉ}, nay muốn khai trương khởi đầu việc kinh doanh phục vụ nhân sinh.",
          "Chúng con kính mời chư vị Tôn thần giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật, độ cho chúng con buôn bán thuận lợi, khách đến đông vui, tài lộc dồi dào, làm ăn phát đạt, gặp nhiều may mắn.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cung-xe",
    ten: "Văn khấn cúng xe",
    nhom: "Việc lớn",
    moTa: "Bài khấn khi mua xe mới, hoặc cúng xe định kỳ mùng hai và mười sáu hằng tháng.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm ngũ quả", "Rượu, nước, trà", "Gà luộc hoặc heo quay, xôi", "Vàng mã, bộ giấy cúng xe"],
    luuY: ["Bày lễ trước đầu xe, nơi thoáng sạch", "Xe mới thì cúng trước khi chạy chuyến đầu", "Nhiều người cúng định kỳ mùng hai và mười sáu âm lịch hằng tháng"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.\nCon kính lạy chư vị Thần linh cai quản đường sá.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật, trà quả, dâng lên trước án.",
          "Tín chủ con có chiếc xe mang biển số {biển số}, nay làm lễ dâng cúng, kính mời chư vị Tôn thần chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị phù hộ độ trì cho xe cộ đi lại bình an, thượng lộ bình an, tránh mọi tai ương, người ngồi trên xe được mạnh khỏe, công việc hanh thông.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cau-an-dau-nam",
    ten: "Văn khấn cầu an đầu năm",
    nhom: "Cầu an",
    moTa: "Bài khấn cầu bình an cho cả gia đình, thường làm đầu năm hoặc khi đi lễ chùa.",
    samLe: ["Hương, hoa tươi", "Trái cây, bánh kẹo", "Nước sạch", "Lễ chay, không dùng đồ mặn khi lễ Phật"],
    luuY: ["Lễ Phật dùng đồ chay, không dâng đồ mặn và vàng mã lên ban Tam Bảo", "Trang phục kín đáo, đi nhẹ nói khẽ", "Thành tâm là chính, lễ nhiều không bằng lòng thành"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Phật Thích Ca Mâu Ni.\nCon kính lạy Đức Phật A Di Đà.\nCon kính lạy Đức Quán Thế Âm Bồ Tát.\nCon kính lạy chư vị Bồ Tát, chư Hiền Thánh Tăng.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật, dâng lên trước án.",
          "Chúng con thành tâm kính lễ, cúi xin chư Phật chư Bồ Tát từ bi gia hộ cho gia đình chúng con một năm mới được mạnh khỏe bình an, tai qua nạn khỏi, công việc hanh thông, con cháu học hành tấn tới, trong nhà trên thuận dưới hòa.",
          "Chúng con nguyện làm điều lành, tránh điều dữ, sống có đạo đức, giúp người giúp đời.",
          "Chúng con lễ bạc tâm thành, cúi xin chư Phật chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cung-day-thang",
    ten: "Văn khấn cúng đầy tháng",
    nhom: "Trong nhà",
    moTa: "Bài khấn lễ đầy tháng cho trẻ sơ sinh, tạ ơn Mười hai Bà Mụ.",
    samLe: [
      "Mười hai chén chè nhỏ và một chén chè lớn",
      "Mười hai đĩa xôi nhỏ và một đĩa xôi lớn",
      "Gà luộc hoặc vịt luộc",
      "Hương, hoa tươi, trầu cau",
      "Bộ đồ hình thế, mười hai đôi hài giấy",
    ],
    luuY: [
      "Con gái tính lùi hai ngày, con trai lùi một ngày so với ngày tròn tháng, theo tục gái lùi hai trai lùi một",
      "Cúng vào buổi sáng sớm hoặc chiều tối",
      "Sau khi cúng làm lễ khai hoa, còn gọi là bắt miếng",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đệ nhất Thiên tỷ đại tiên chúa.\nCon kính lạy Đệ nhị Thiên đế đại tiên chúa.\nCon kính lạy Đệ tam Thiên Mụ đại tiên chúa.\nCon kính lạy Tam thập lục cung chư vị Tiên nương.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, nhân ngày đầy tháng của cháu {tên cháu}, sinh ngày {ngày sinh}.",
          "Chúng con thành tâm sắm sửa hương hoa lễ vật, chè xôi trà quả, dâng lên trước án, kính dâng lên chư vị Tiên nương.",
          "Cúi xin chư vị thương xót, chứng giám lòng thành, thụ hưởng lễ vật, phù hộ độ trì cho cháu {tên cháu} hay ăn chóng lớn, mạnh khỏe bình an, thân mệnh bình yên, cường tráng, kiếp kiếp được hưởng vinh hoa phú quý.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cung-thoi-noi",
    ten: "Văn khấn cúng thôi nôi",
    nhom: "Trong nhà",
    moTa: "Bài khấn lễ thôi nôi khi trẻ tròn một tuổi.",
    samLe: [
      "Mười hai chén chè nhỏ và một chén chè lớn",
      "Mười hai đĩa xôi nhỏ và một đĩa xôi lớn",
      "Gà luộc hoặc vịt luộc, heo quay tùy điều kiện",
      "Hương, hoa tươi, trầu cau",
      "Mâm đồ cho bé chọn: bút, sách, tiền, gương, lược, đồ chơi",
    ],
    luuY: ["Tính ngày như lễ đầy tháng, gái lùi hai trai lùi một", "Sau khi cúng bày mâm đồ cho bé bốc, gọi là lễ bốc đồ", "Lễ này nặng phần vui, không nên đặt nặng chuyện bé bốc trúng món nào"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đệ nhất Thiên tỷ đại tiên chúa.\nCon kính lạy Đệ nhị Thiên đế đại tiên chúa.\nCon kính lạy Đệ tam Thiên Mụ đại tiên chúa.\nCon kính lạy Tam thập lục cung chư vị Tiên nương.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, nhân ngày thôi nôi của cháu {tên cháu}, tròn một tuổi.",
          "Chúng con thành tâm sắm sửa hương hoa lễ vật, chè xôi trà quả, dâng lên trước án.",
          "Cúi xin chư vị Tiên nương cùng tổ tiên nội ngoại chứng giám lòng thành, thụ hưởng lễ vật, phù hộ độ trì cho cháu {tên cháu} thân mệnh bình yên, hay ăn chóng lớn, thông minh sáng dạ, sau này nên người có ích.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cat-noc",
    ten: "Văn khấn cất nóc",
    nhom: "Việc lớn",
    moTa: "Bài khấn lễ cất nóc, tức lễ thượng lương, khi đổ mái hoặc gác đòn dông.",
    samLe: ["Mâm ngũ quả, hoa tươi, hương, đèn nến", "Trầu cau, rượu, trà, nước", "Gà luộc, xôi, bánh chưng", "Muối, gạo", "Vàng mã, quần áo thần linh"],
    luuY: ["Chọn ngày giờ hợp tuổi gia chủ", "Nếu mượn tuổi làm nhà thì người được mượn tuổi đứng khấn", "Lễ làm trước khi đổ mái hoặc gác đòn dông"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy Quan Đương niên.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Định phúc Táo quân.\nCon kính lạy các Tôn thần bản xứ.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm lễ, hương hoa trà quả, thắp nén tâm hương dâng lên trước án, có lời thưa rằng:",
          "Tín chủ con xin phép được làm lễ cất nóc ngôi nhà tại {địa chỉ công trình}.",
          "Chúng con kính mời chư vị Tôn thần giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị độ cho việc cất nóc được thuận lợi, thợ thuyền bình an, nhà cửa vững bền, gia đạo hưng vượng, muôn sự tốt lành.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
] as const;

export function vanKhanBySlug(slug: string): VanKhanBai | undefined {
  return VAN_KHAN_LIST.find((v) => v.slug === slug);
}

export function vanKhanByNhom(nhom: VanKhanNhom): VanKhanBai[] {
  return VAN_KHAN_LIST.filter((v) => v.nhom === nhom);
}

/** Tách văn bản thành các đoạn tách bởi chỗ người dùng tự điền {…}, để tô màu riêng. */
export function splitFillIns(text: string): { text: string; isFillIn: boolean }[] {
  return text.split(/(\{[^}]+\})/g).map((part) => ({ text: part, isFillIn: part.startsWith("{") && part.endsWith("}") }));
}
