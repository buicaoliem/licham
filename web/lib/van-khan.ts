export type VanKhanNhom = "Trong nhà" | "Lễ tết" | "Việc lớn" | "Cầu an" | "Đi lễ";

export const VAN_KHAN_NHOM_LIST: readonly VanKhanNhom[] = ["Trong nhà", "Lễ tết", "Việc lớn", "Cầu an", "Đi lễ"] as const;

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
    slug: "tho-cong",
    ten: "Văn khấn Thổ Công",
    nhom: "Trong nhà",
    moTa: "Bài khấn vị thần cai quản đất đai nhà ở, đọc khi cúng trong nhà.",
    samLe: ["Hương, hoa tươi, trầu cau, nước sạch, mâm lễ chay hoặc mặn tùy nhà"],
    luuY: ["Khấn Thổ Công trước khi khấn gia tiên", "Ban Thổ Công thường đặt cùng ban thờ gia tiên, ở vị trí chính giữa", "Cúng vào mùng một, ngày rằm, hoặc khi có việc trong nhà"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy các ngài Ngũ phương, Ngũ thổ, Phúc đức chính thần.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật, trà quả, thắp nén tâm hương dâng lên trước án.",
          "Chúng con kính mời ngài Thổ Công cùng chư vị Tôn thần giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin các ngài thương xót tín chủ, phù hộ cho gia đạo bình an, đất ở yên ổn, người người mạnh khỏe, làm ăn thuận lợi.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
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
    slug: "bao-sai-ban-tho",
    ten: "Văn khấn bao sái ban thờ",
    nhom: "Trong nhà",
    moTa: "Bài khấn xin phép trước khi lau dọn ban thờ, thường làm cuối năm.",
    samLe: ["Hương, hoa tươi, trái cây, nước sạch. Chuẩn bị nước gừng rượu và khăn sạch riêng để lau."],
    luuY: [
      "Khấn xin phép TRƯỚC khi lau dọn, không lau trước rồi khấn sau",
      "Khăn và chậu dùng riêng cho ban thờ, không dùng chung",
      "Bát hương hạn chế xê dịch; nếu phải nhấc thì làm nhẹ tay",
      "Thường làm ngày 23 tháng Chạp sau khi tiễn Táo quân",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Táo quân, Thổ Địa, Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con nhận thấy ban thờ đã lâu chưa được lau dọn, nay xin phép chư vị cho được bao sái, lau chùi sạch sẽ, sắp xếp tươm tất.",
          "Cúi xin chư vị Tôn thần cùng chư vị tổ tiên tạm lánh sang một bên, cho con cháu được làm việc này, có gì sơ suất xin lượng thứ cho.",
          "Sau khi hoàn tất, kính mời chư vị an vị trở lại như cũ.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "bon-chin-ngay",
    ten: "Văn khấn 49 ngày",
    nhom: "Trong nhà",
    moTa: "Bài khấn lễ chung thất, tức 49 ngày sau khi người thân qua đời.",
    samLe: ["Hương, hoa tươi, trầu cau, mâm cơm cúng, rượu, nước, tiền vàng, quần áo giấy"],
    luuY: [
      "Tính từ ngày mất, đủ 49 ngày",
      "Nhiều nhà làm lễ chay trong 49 ngày đầu",
      "Sau lễ này thường coi là kết thúc giai đoạn tang nặng nhất",
      "Lễ 100 ngày dùng cùng bài khấn này, chỉ đổi tên lễ",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Phật A Di Đà.\nCon kính lạy Đức Địa Tạng Vương Bồ Tát.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy hương linh {quan hệ và tên người đã khuất}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, đúng {49 ngày hoặc 100 ngày} kể từ ngày {tên người đã khuất} về cõi vĩnh hằng.",
          "Chúng con cùng toàn thể con cháu trong nhà thành tâm sắm sửa hương hoa lễ vật, cơm canh trà quả, dâng lên trước án.",
          "Kính mời hương linh {tên người đã khuất} về đây chứng giám lòng thành của con cháu, thụ hưởng lễ vật.",
          "Nguyện cầu hương linh sớm được siêu sinh về cõi an lành, buông bỏ mọi vướng bận cõi trần.",
          "Cúi xin hương linh phù hộ cho con cháu mạnh khỏe bình an, gia đạo êm ấm.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "gio-dau",
    ten: "Văn khấn giỗ đầu",
    nhom: "Trong nhà",
    moTa: "Bài khấn lễ giỗ đầu, tức tròn một năm sau ngày người thân mất.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm cơm cúng, xôi, gà", "Rượu, trà, trái cây, nước sạch", "Tiền vàng, quần áo giấy nếu gia đình có lệ"],
    luuY: ["Ngày lễ tính theo ngày mất âm lịch, tròn một năm", "Giỗ đầu vẫn còn trong tang, con cháu thường mặc đồ tối màu", "Nên khấn xin thần linh trước khi khấn hương linh"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Phật A Di Đà.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy hương linh {quan hệ và tên người đã khuất}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tròn một năm ngày {tên người đã khuất} về cõi vĩnh hằng. Chúng con cùng toàn thể con cháu thành tâm sắm sửa hương hoa lễ vật, cơm canh trà quả, dâng lên trước án.",
          "Thương nhớ người đã khuất, một năm qua con cháu không nguôi. Kính mời hương linh {tên người đã khuất} về đây chứng giám lòng thành, thụ hưởng lễ vật.",
          "Nguyện cầu hương linh sớm được siêu thoát, an nghỉ nơi cõi lành.",
          "Cúi xin phù hộ cho con cháu mạnh khỏe, gia đình êm ấm, làm ăn thuận lợi.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "gio-het",
    ten: "Văn khấn giỗ hết (lễ Đại tường)",
    nhom: "Trong nhà",
    moTa: "Bài khấn lễ giỗ thứ hai sau ngày mất, đánh dấu con cháu mãn tang.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm cơm cúng, xôi, gà", "Rượu, trà, trái cây, nước sạch", "Tiền vàng, quần áo giấy nếu gia đình có lệ"],
    luuY: ["Tính theo ngày mất âm lịch, tròn hai năm", "Sau lễ này con cháu hết tang, các giỗ sau là giỗ thường", "Một số nơi làm lễ trừ phục riêng, tùy phong tục từng vùng"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Phật A Di Đà.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy hương linh {quan hệ và tên người đã khuất}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, ngày giỗ hết của {tên người đã khuất}. Chúng con cùng toàn thể con cháu thành tâm sắm sửa hương hoa lễ vật, cơm canh trà quả dâng lên trước án.",
          "Hai năm tang chế đã tròn, con cháu xin làm lễ mãn tang. Kính mời hương linh {tên người đã khuất} về đây chứng giám lòng thành, thụ hưởng lễ vật.",
          "Nguyện cầu hương linh an vui nơi cõi lành, cùng tổ tiên phù hộ cho con cháu.",
          "Cúi xin phù hộ cho cả nhà mạnh khỏe bình an, con cháu thuận hòa, gia đạo hưng long.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "tien-thuong",
    ten: "Văn khấn tiên thường (trước ngày giỗ)",
    nhom: "Trong nhà",
    moTa: "Bài khấn chiều hôm trước ngày giỗ, báo cáo tổ tiên và mời hương linh về dự lễ.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm cơm hoặc lễ nhẹ: trà, rượu, trái cây", "Nước sạch"],
    luuY: ["Làm vào chiều tối hôm trước ngày giỗ chính", "Khấn thần linh xin phép trước, rồi mới khấn gia tiên", "Ngày giỗ chính dùng bài văn khấn ngày giỗ"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}. Ngày mai là ngày giỗ của {quan hệ và tên người đã khuất}, chúng con thành tâm sắm sửa hương hoa lễ vật, làm lễ tiên thường.",
          "Chúng con kính xin chư vị Tôn thần cho phép hương linh {tên người đã khuất} được về dự lễ. Kính mời tổ tiên nội ngoại cùng về chứng giám.",
          "Cúi xin phù hộ cho con cháu làm lễ chu toàn, gia đình bình an, mọi việc thuận lợi.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "chuyen-ban-tho",
    ten: "Văn khấn xin dời bàn thờ",
    nhom: "Trong nhà",
    moTa: "Bài khấn trước khi di chuyển, sửa sang hoặc thay mới bàn thờ gia tiên trong nhà.",
    samLe: ["Hương, hoa tươi, trầu cau", "Trà, rượu, trái cây, nước sạch", "Tiền vàng"],
    luuY: [
      "Nên chọn ngày tốt trước khi dời",
      "Khấn xin trước, dọn dẹp và di chuyển sau",
      "Đặt bàn thờ vào chỗ mới xong thì thắp hương khấn báo lần nữa",
      "Việc bốc bát hương dùng bài riêng",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án.",
          "Nay vì {lý do: sửa nhà, chuyển phòng, thay bàn thờ mới}, chúng con xin phép được dời bàn thờ đến {vị trí mới}. Việc làm vì chăm lo nơi thờ tự được sạch đẹp, chu đáo hơn, cúi xin chư vị Tôn thần và tổ tiên chấp thuận, không trách tội.",
          "Cúi xin phù hộ cho việc dời chuyển được suôn sẻ, gia đình bình an.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "sua-bep",
    ten: "Văn khấn sửa bếp, làm bếp mới",
    nhom: "Trong nhà",
    moTa: "Bài khấn Táo quân trước khi sửa, dời hoặc làm lại bếp.",
    samLe: ["Hương, hoa tươi, trầu cau", "Trà, rượu, trái cây, nước sạch", "Tiền vàng"],
    luuY: ["Nên chọn ngày tốt để khởi công", "Đặt lễ ngay tại khu bếp", "Làm xong bếp mới nên khấn báo và đỏ lửa lần đầu"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án.",
          "Nay gian bếp đã cũ, chúng con xin phép được {sửa sang hoặc làm mới} nơi đặt bếp. Cúi xin ngài Táo quân chấp thuận, tạm dời chỗ ngự trong thời gian sửa, khi xong xin mời ngài về an vị.",
          "Cúi xin phù hộ cho việc sửa chữa được thuận lợi, người làm an toàn, bếp mới giữ lửa ấm cho gia đình.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
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
    slug: "mung-mot-tet",
    ten: "Văn khấn mùng một Tết",
    nhom: "Lễ tết",
    moTa: "Bài khấn sáng mùng một Tết Nguyên đán.",
    samLe: ["Hương, hoa tươi, mâm ngũ quả, bánh chưng, mứt kẹo, trầu cau, rượu, trà, mâm cỗ"],
    luuY: ["Cúng vào sáng sớm mùng một", "Cúng xong cả nhà mới ăn bữa đầu năm", "Nhiều nhà giữ tục xuất hành và chọn hướng sau lễ này"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Đương lai hạ sinh Di Lặc Tôn Phật.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày mùng một tháng Giêng năm {năm}, gặp tiết Nguyên đán đầu xuân, tín chủ con cùng toàn gia thành tâm sắm sửa hương hoa lễ vật, bánh trái trà quả, dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần cùng các cụ tổ tiên nội ngoại giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật, cùng con cháu đón xuân mới.",
          "Cúi xin chư vị phù hộ độ trì cho toàn gia một năm mới an khang thịnh vượng, người người mạnh khỏe, làm ăn thuận lợi, con cháu học hành tấn tới, gia đạo hưng long.",
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
    slug: "cung-ram-thang-chap",
    ten: "Văn khấn rằm tháng Chạp",
    nhom: "Lễ tết",
    moTa: "Bài khấn ngày rằm cuối cùng của năm âm lịch.",
    samLe: ["Hương, hoa tươi, trầu cau, mâm ngũ quả, mâm cỗ chay hoặc mặn"],
    luuY: ["Đây là rằm cuối năm, nhiều nhà làm chu đáo hơn rằm thường", "Cúng trước ngày 23 tháng Chạp, tức trước lễ tiễn Táo quân", "Sau lễ này thường bắt đầu dọn dẹp đón Tết"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày rằm tháng Chạp năm {năm}, ngày rằm cuối cùng của năm, tín chủ con thành tâm sắm sửa hương hoa lễ vật, trà quả, dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần cùng các cụ tổ tiên nội ngoại giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Nhìn lại một năm đã qua, chúng con xin tạ ơn chư vị đã che chở cho gia đình. Có điều gì sơ suất, cúi xin lượng thứ.",
          "Cúi xin chư vị tiếp tục phù hộ độ trì cho toàn gia qua năm mới được bình an, mọi sự tốt lành.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "tha-ca-chep",
    ten: "Văn khấn thả cá chép",
    nhom: "Lễ tết",
    moTa: "Bài khấn ngắn khi thả cá chép tiễn Táo quân ngày 23 tháng Chạp.",
    samLe: ["Ba con cá chép sống, khỏe mạnh"],
    luuY: [
      "Thả ở sông hồ nước sạch, tránh nơi ô nhiễm",
      "Thả nhẹ tay sát mặt nước, KHÔNG ném cả túi nilon xuống",
      "Mang túi nilon về bỏ đúng nơi, không xả rác ven bờ",
      "Thả trước giờ Ngọ ngày 23 tháng Chạp",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày 23 tháng Chạp năm {năm}, tín chủ con thành tâm dâng cá chép làm phương tiện, kính tiễn ngài Táo quân về chầu Trời.",
          "Cúi xin ngài tâu trình những điều tốt lành của gia đình chúng con, bỏ qua những lỗi lầm sơ suất trong năm qua.",
          "Nguyện cầu gia đình chúng con sang năm mới được bình an, no ấm, mọi sự hanh thông.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "tet-doan-ngo",
    ten: "Văn khấn Tết Đoan ngọ",
    nhom: "Lễ tết",
    moTa: "Bài khấn mùng 5 tháng Năm, tết diệt sâu bọ.",
    samLe: ["Hương, hoa tươi, rượu nếp, bánh tro, mận, vải, xoài, dưa hấu, trầu cau"],
    luuY: ["Cúng vào giờ Ngọ, tức khoảng 11 giờ đến 13 giờ", "Ăn rượu nếp và hoa quả chua ngay buổi sáng sớm, trước khi ăn gì khác", "Lễ này gắn với tục diệt sâu bọ đầu mùa hè"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Bản gia Táo quân cùng chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày mùng 5 tháng Năm năm {năm}, gặp tiết Đoan ngọ, tín chủ con thành tâm sắm sửa hương hoa lễ vật, rượu nếp bánh trái, dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần cùng các cụ tổ tiên nội ngoại giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị phù hộ độ trì cho toàn gia mạnh khỏe, mùa màng tươi tốt, sâu bọ tiêu trừ, mọi việc hanh thông.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "khai-but-dau-xuan",
    ten: "Văn khấn khai bút đầu xuân",
    nhom: "Lễ tết",
    moTa: "Bài khấn trước khi khai bút đầu năm, cầu cho việc học hành công danh.",
    samLe: ["Hương, hoa tươi, trái cây, trà, giấy bút mới"],
    luuY: ["Thường làm trong ba ngày Tết, chọn giờ tốt", "Sau khi khấn thì viết vài chữ hoặc câu mình tâm đắc", "Là tục đẹp, không cần bày vẽ tốn kém"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng Giêng năm {năm}, đầu xuân năm mới, tín chủ con thành tâm sắm sửa hương hoa lễ vật, dâng lên trước án, xin được khai bút đầu năm.",
          "Cúi xin chư vị Tôn thần cùng tổ tiên phù hộ cho con năm mới đầu óc sáng suốt, học hành tấn tới, công việc hanh thông, chữ nghĩa ngày một thêm dày.",
          "Con nguyện chăm chỉ, ngay thẳng, không phụ công ơn dạy dỗ.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "tet-han-thuc",
    ten: "Văn khấn Tết Hàn thực",
    nhom: "Lễ tết",
    moTa: "Bài khấn gia tiên ngày mùng ba tháng Ba âm lịch, dâng bánh trôi bánh chay.",
    samLe: ["Bánh trôi, bánh chay: một đĩa mỗi loại", "Hương, hoa tươi, trầu cau", "Nước sạch, trà, trái cây"],
    luuY: [
      "Ngày lễ: mùng 3 tháng Ba âm lịch",
      "Lễ chủ yếu dâng bánh trôi bánh chay, có thể kèm mâm cơm",
      "Khấn thần linh trước, gia tiên sau, dùng bài khấn mùng một ngày rằm cho phần thần linh",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày mùng ba tháng Ba năm {năm}, nhân tiết Hàn thực, tín chủ con thành tâm sắm sửa hương hoa, bánh trôi bánh chay, trà quả dâng lên trước án.",
          "Chúng con kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ và chư vị hương linh nội ngoại họ {họ} giáng về linh sàng, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin phù hộ độ trì cho con cháu mạnh khỏe bình an, gia đạo hòa thuận, công việc hanh thông.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "ram-thang-muoi",
    ten: "Văn khấn rằm tháng Mười (Tết Hạ nguyên)",
    nhom: "Lễ tết",
    moTa: "Bài khấn gia tiên ngày rằm tháng Mười âm lịch, dâng cơm gạo mới sau mùa gặt.",
    samLe: ["Hương, hoa tươi, trầu cau", "Xôi hoặc cơm nấu bằng gạo mới", "Mâm cơm chay hoặc mặn tùy nhà", "Trà, rượu, trái cây, nước sạch"],
    luuY: ["Ngày lễ: 15 tháng Mười âm lịch, còn gọi là Tết cơm mới", "Nhiều nhà ưu tiên dâng sản vật vừa thu hoạch", "Khấn thần linh trước, gia tiên sau"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày rằm tháng Mười năm {năm}, nhân tiết Hạ nguyên, tín chủ con thành tâm sắm sửa hương hoa lễ vật, cơm gạo mới, trà quả dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần cùng tổ tiên nội ngoại giáng lâm chứng giám, thụ hưởng lễ vật, để con cháu được tỏ lòng biết ơn sau một mùa làm lụng.",
          "Cúi xin phù hộ cho gia đình chúng con mùa màng tươi tốt, làm ăn thuận lợi, trên dưới bình an, của cải dồi dào.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "via-than-tai",
    ten: "Văn khấn ngày vía Thần Tài mùng mười tháng Giêng",
    nhom: "Lễ tết",
    moTa: "Bài khấn Thần Tài, Thổ Địa ngày mùng mười tháng Giêng, cầu buôn bán hanh thông cả năm.",
    samLe: [
      "Hương, hoa tươi, trái cây, trầu cau",
      "Rượu, nước sạch, trà",
      "Mâm lễ: có thể có heo quay, gà luộc, xôi hoặc lễ chay tùy nhà",
      "Vàng thỏi giấy, tiền vàng",
    ],
    luuY: ["Ngày lễ: mùng 10 tháng Giêng âm lịch", "Khấn tại ban Thần Tài, Thổ Địa trong nhà hoặc cửa hàng", "Lau dọn ban thờ trước ngày lễ, thay nước, thay hoa"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.\nCon kính lạy Thần Tài vị tiền, ngài Thổ Địa cai quản nơi này.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày mùng mười tháng Giêng năm {năm}, nhân ngày vía Thần Tài, tín chủ con thành tâm sắm sửa hương hoa lễ vật, kim ngân trà quả dâng lên trước án.",
          "Chúng con kính mời ngài Thần Tài, ngài Thổ Địa giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin các ngài phù hộ cho tín chủ buôn bán thuận lợi, tiền tài dồi dào, khách hàng đông đủ, gặp nhiều người tốt, tránh được kẻ xấu, cả năm làm ăn bền vững.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "mung-hai-tet",
    ten: "Văn khấn mùng hai Tết",
    nhom: "Lễ tết",
    moTa: "Bài khấn gia tiên sáng mùng hai Tết Nguyên đán.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm cơm ngày Tết", "Rượu, trà, bánh kẹo, trái cây"],
    luuY: ["Thường cúng buổi sáng hoặc trước bữa trưa", "Khấn thần linh trước, gia tiên sau", "Dùng được cho các ngày còn lại của Tết, chỉ đổi ngày"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày mùng hai Tết năm {năm}, tín chủ con cùng con cháu trong nhà thành tâm sắm sửa hương hoa lễ vật, cơm canh trà quả dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần và tổ tiên nội ngoại cùng về vui xuân với con cháu, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin phù hộ cho cả nhà năm mới mạnh khỏe, sum vầy, công việc suôn sẻ, học hành tấn tới, mọi điều như ý.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "gio-to-hung-vuong",
    ten: "Văn khấn Giỗ Tổ Hùng Vương tại nhà",
    nhom: "Lễ tết",
    moTa: "Bài khấn tưởng nhớ các Vua Hùng ngày mùng mười tháng Ba âm lịch, dùng khi lễ tại gia.",
    samLe: ["Hương, hoa tươi, trầu cau", "Bánh chưng, bánh giầy", "Trà, rượu, trái cây, nước sạch"],
    luuY: ["Ngày lễ: mùng 10 tháng Ba âm lịch", "Có thể đặt lễ tại ban thờ gia tiên, khấn hướng về đất Tổ", "Không bắt buộc đốt vàng mã"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Quốc Tổ Hùng Vương cùng các vị Vua Hùng đã có công dựng nước.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày mùng mười tháng Ba năm {năm}, ngày Giỗ Tổ Hùng Vương, tín chủ con thành tâm sắm sửa hương hoa, bánh chưng bánh giầy, trà quả dâng lên trước án.",
          "Chúng con nhớ ơn các Vua Hùng đã dựng nước, để con cháu đời đời có quê hương nối nghiệp. Cúi xin các ngài chứng giám tấm lòng biết ơn của con cháu.",
          "Cúi xin phù hộ cho đất nước thái bình, gia đình chúng con mạnh khỏe, con cháu biết giữ gìn nếp nhà, sống lương thiện.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
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
    slug: "boc-bat-huong",
    ten: "Văn khấn bốc bát hương",
    nhom: "Việc lớn",
    moTa: "Bài khấn khi bốc bát hương mới, lập ban thờ lần đầu hoặc thay bát hương cũ.",
    samLe: ["Bát hương mới, tro nếp hoặc cát trắng, bộ thất bảo, hương, hoa tươi, trầu cau, rượu, nước, mâm lễ, tiền vàng"],
    luuY: [
      "Chọn ngày giờ hợp tuổi gia chủ",
      "Rửa bát hương bằng nước gừng rượu, lau khô trước khi bốc",
      "Gia chủ tự tay bốc, tay rửa sạch, lòng thành kính",
      "Bát hương cũ đem hóa hoặc thả nơi sông sạch, không vứt bừa",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản gia Táo quân, Thổ Địa, Long Mạch Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con chọn được ngày lành tháng tốt, thành tâm sắm sửa hương hoa lễ vật, kính cẩn xin phép được bốc bát hương mới, an vị nơi ban thờ.",
          "Cúi xin chư vị Tôn thần cùng chư vị tổ tiên chứng giám lòng thành, cho phép tín chủ được làm việc này, và ngự về nơi bát hương mới để con cháu sớm hôm thờ phụng.",
          "Cúi xin phù hộ độ trì cho gia đình chúng con mạnh khỏe bình an, gia đạo hưng long.",
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
  {
    slug: "cai-tang",
    ten: "Văn khấn cải táng",
    nhom: "Việc lớn",
    moTa: "Bài khấn lễ sang cát, dời mộ người đã khuất sang nơi an nghỉ mới.",
    samLe: ["Hương, hoa tươi, trầu cau, rượu, nước, xôi, gà luộc, tiền vàng, quần áo giấy, nước ngũ vị để tắm cốt"],
    luuY: [
      "Chọn ngày giờ kỹ, tránh năm tuổi và tháng kỵ của người đã khuất",
      "Thường làm vào ban đêm hoặc sáng sớm, tránh nắng",
      "Khấn thần linh cai quản nghĩa trang trước, sau mới khấn hương linh",
      "Đây là việc hệ trọng, nhiều nhà mời thầy",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy các ngài Thần linh, Thổ Địa cai quản trong khu vực này.\nCon kính lạy hương linh {quan hệ và tên người đã khuất}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con chọn được ngày lành tháng tốt, xin phép được cải táng phần mộ của {tên người đã khuất}, dời sang nơi an nghỉ mới tại {địa điểm mới}.",
          "Chúng con kính mời chư vị Tôn thần chứng giám lòng thành, cho phép con cháu được làm việc này.",
          "Kính mời hương linh {tên người đã khuất} biết cho lòng thành của con cháu, theo về nơi ở mới, an nghỉ lâu dài.",
          "Cúi xin phù hộ độ trì cho con cháu mạnh khỏe bình an, gia đạo hưng long.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "mung-hai-muoi-sau",
    ten: "Văn khấn mùng 2 và 16 hằng tháng",
    nhom: "Việc lớn",
    moTa: "Bài khấn cúng cô hồn mùng 2 và 16 âm lịch, tục của người buôn bán.",
    samLe: ["Cháo trắng loãng, gạo muối, bỏng ngô, khoai luộc, bánh kẹo, mía, nước, hương, tiền vàng"],
    luuY: [
      "Cúng NGOÀI cửa hàng hoặc ngoài sân, không cúng trong nhà",
      "Cúng vào buổi chiều tối",
      "Cúng xong rắc gạo muối ra đường",
      "Đồ cúng để người qua đường lấy, không mang vào nhà",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Địa Tạng Vương Bồ Tát.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa.",
          "Tín chủ con là {họ tên}, kinh doanh tại {địa chỉ}.",
          "Hôm nay là ngày {mùng 2 hoặc 16} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa, cháo gạo muối cùng các thứ lễ vật, bày ra trước cửa.",
          "Chúng con thành tâm kính mời các vong linh không nơi nương tựa, các cô hồn phiêu bạt gần xa, về đây thụ hưởng lễ vật.",
          "Nguyện cầu các vong linh được no đủ, sớm siêu sinh tịnh độ, không quấy nhiễu việc làm ăn của tín chủ.",
          "Cúi xin cho cửa hàng buôn may bán đắt, khách đến đông vui, mọi sự bình an.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "le-gia-tien-an-hoi",
    ten: "Văn khấn lễ ăn hỏi",
    nhom: "Việc lớn",
    moTa: "Bài khấn gia tiên nhà gái khi nhận lễ ăn hỏi, báo tổ tiên con cháu sắp thành gia thất.",
    samLe: ["Lễ vật nhà trai mang sang: trầu cau, bánh, trà, rượu", "Hương, hoa tươi, nến", "Nước sạch"],
    luuY: ["Nhận lễ xong, nhà gái đặt một phần lễ lên ban thờ rồi mới khấn", "Người khấn thường là bố hoặc người lớn tuổi trong họ", "Cô dâu chú rể cùng đứng vái sau khi khấn"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, gia đình ông bà {họ tên nhà trai} ở {địa chỉ nhà trai} mang lễ vật sang dạm hỏi cháu {tên cô dâu} cho con trai là {tên chú rể}.",
          "Chúng con xin kính cáo tổ tiên, cúi xin chứng giám cho đôi trẻ nên duyên, thụ hưởng lễ vật.",
          "Cúi xin phù hộ cho hai cháu tình nghĩa bền lâu, hai họ hòa thuận, việc cưới hỏi diễn ra tốt đẹp.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "le-gia-tien-ngay-cuoi",
    ten: "Văn khấn lễ gia tiên ngày cưới",
    nhom: "Việc lớn",
    moTa: "Bài khấn gia tiên nhà trai khi đón dâu về, báo tổ tiên có thêm người trong nhà.",
    samLe: ["Hương, hoa tươi, nến, trầu cau", "Trà, rượu, bánh, trái cây", "Nước sạch"],
    luuY: [
      "Làm khi cô dâu vừa về đến nhà trai",
      "Cô dâu chú rể đứng trước ban thờ, người lớn khấn thay",
      "Nhà gái cũng làm lễ gia tiên trước khi tiễn dâu, chỉ đổi lời báo",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, ngày lành tháng tốt, con trai chúng con là {tên chú rể} làm lễ thành hôn với {tên cô dâu}, con gái ông bà {họ tên nhà gái} ở {địa chỉ nhà gái}.",
          "Chúng con thành tâm sắm sửa hương hoa lễ vật, kính cáo tổ tiên. Từ nay họ {họ} có thêm người con dâu, cúi xin tổ tiên đón nhận và chứng giám.",
          "Cúi xin phù hộ cho đôi vợ chồng trẻ trăm năm hạnh phúc, con cháu đông vui, gia đạo hưng thịnh.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "sua-nha",
    ten: "Văn khấn sửa nhà",
    nhom: "Việc lớn",
    moTa: "Bài khấn thần linh trước khi sửa chữa, cơi nới hoặc cải tạo nhà đang ở.",
    samLe: ["Hương, hoa tươi, trầu cau", "Mâm lễ mặn hoặc chay tùy nhà", "Trà, rượu, trái cây, nước sạch", "Tiền vàng"],
    luuY: [
      "Nên chọn ngày tốt để khởi công",
      "Đặt lễ ở giữa nhà hoặc nơi sắp sửa",
      "Nếu động đến ban thờ thì làm thêm lễ xin dời bàn thờ",
      "Xây nhà mới trên đất trống dùng bài khấn động thổ",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.\nCon kính lạy ngài Bản gia Thổ Địa Long Mạch Tôn thần.\nCon kính lạy các vị Tôn thần cai quản trong khu vực này.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án.",
          "Nay ngôi nhà đã xuống cấp, chúng con xin phép được {nội dung sửa chữa}. Cúi xin chư vị Tôn thần chấp thuận, cho phép khởi công, tạm dời chỗ ngự trong những ngày sửa chữa.",
          "Cúi xin phù hộ cho việc sửa nhà được suôn sẻ, thợ thuyền an toàn, công trình bền vững, gia đình bình an.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "mo-hang-dau-nam",
    ten: "Văn khấn mở hàng đầu năm",
    nhom: "Việc lớn",
    moTa: "Bài khấn ngày đầu mở cửa buôn bán sau Tết, cầu một năm đắt hàng.",
    samLe: [
      "Hương, hoa tươi, trầu cau",
      "Trái cây, bánh kẹo, trà, rượu",
      "Mâm lễ mặn hoặc chay tùy cửa hàng",
      "Tiền vàng, vàng thỏi giấy",
    ],
    luuY: [
      "Chọn ngày giờ tốt hợp tuổi chủ cửa hàng",
      "Đặt lễ tại ban Thần Tài hoặc ngay giữa cửa hàng",
      "Mở hàng lần đầu cho khách dễ tính, vui vẻ",
      "Khai trương cửa hàng mới dùng bài văn khấn khai trương",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy Thần Tài vị tiền, ngài Thổ Địa cai quản nơi này.\nCon kính lạy các vị Tôn thần cai quản trong khu vực này.",
          "Tín chủ con là {họ tên}, chủ cửa hàng {tên cửa hàng} tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng Giêng năm {năm}, ngày đầu năm mở cửa buôn bán, tín chủ con thành tâm sắm sửa hương hoa lễ vật, kim ngân trà quả dâng lên trước án.",
          "Chúng con kính mời chư vị Tôn thần giáng lâm chứng giám, thụ hưởng lễ vật.",
          "Cúi xin phù hộ cho cửa hàng năm mới buôn may bán đắt, khách đến đông vui, hàng hóa lưu thông, tiền bạc sinh sôi, người làm cùng nhau hòa thuận.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
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
    slug: "giai-han-dau-nam",
    ten: "Văn khấn giải hạn đầu năm",
    nhom: "Cầu an",
    moTa: "Bài khấn dâng sao giải hạn đầu năm.",
    samLe: ["Hương, hoa tươi, trái cây, nước sạch, tiền vàng. Số nến thắp theo sao chiếu mệnh năm đó."],
    luuY: ["Thường làm vào rằm tháng Giêng hoặc trong tháng Giêng", "Bày lễ ngoài trời, hướng theo sao chiếu mệnh", "Đây là tục dân gian, nên làm gọn nhẹ, không nên tốn kém"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Ngọc Hoàng Thượng Đế.\nCon kính lạy Đức Trung Thiên tinh chúa Bắc cực Tử vi Tràng Sinh Đại đế.\nCon kính lạy ngài Tả Nam Tào Lục Ty Duyên Thọ Tinh quân.\nCon kính lạy Đức Hữu Bắc Đẩu Cửu Hàm Giải Ách Tinh quân.\nCon kính lạy Đức Nhật Nguyệt Tinh quân.",
          "Tín chủ con là {họ tên}, sinh năm {năm sinh}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật, dâng lên trước án.",
          "Năm nay con gặp sao {tên sao} chiếu mệnh. Cúi xin chư vị thương xót, giải trừ vận hạn, tiêu tai giáng phúc, cho con và gia đình được mạnh khỏe bình an, tai qua nạn khỏi, mọi việc hanh thông.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "thi-cu",
    ten: "Văn khấn thi cử",
    nhom: "Cầu an",
    moTa: "Bài khấn cầu cho việc học hành thi cử.",
    samLe: ["Hương, hoa tươi, trái cây, bánh kẹo, nước sạch. Lễ chay."],
    luuY: [
      "Thường lễ tại nhà trước ban gia tiên, hoặc đi Văn Miếu, đền thờ các bậc hiền tài",
      "Không nên xoa đầu rùa hay làm hư hại di tích",
      "Cầu khấn là để yên tâm, việc học vẫn phải do người học",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, con thành tâm sắm sửa hương hoa lễ vật, dâng lên trước án.",
          "Con xin trình rằng {tên người đi thi} sắp bước vào kỳ thi {tên kỳ thi} vào ngày {ngày thi}.",
          "Cúi xin chư vị Tôn thần cùng tổ tiên phù hộ độ trì cho {tên người đi thi} đầu óc sáng suốt, tâm trí bình tĩnh, làm bài trôi chảy, đạt kết quả xứng với công sức đã bỏ ra.",
          "Con nguyện chăm chỉ học hành, sống ngay thẳng, không phụ công ơn cha mẹ tổ tiên.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cau-tu",
    ten: "Văn khấn cầu tự",
    nhom: "Cầu an",
    moTa: "Bài khấn cầu con cái.",
    samLe: ["Hương, hoa tươi, trái cây, oản, bánh kẹo, nước sạch. Lễ chay khi lễ Phật."],
    luuY: [
      "Thường lễ tại chùa, hoặc tại đền phủ có ban Mẫu",
      "Lễ chay khi lễ Phật, được dâng lễ mặn ở ban Mẫu",
      "Thành tâm là chính, không nên coi đây là cách thay thế cho việc khám chữa",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nNam mô Đại từ Đại bi Linh cảm Quán Thế Âm Bồ Tát.\nCon kính lạy Đức Ngọc Hoàng Thượng Đế.\nCon kính lạy Tam Tòa Thánh Mẫu.\nCon kính lạy chư vị Tiên nương, Mười hai Bà Mụ.",
          "Vợ chồng tín chủ con là {họ tên chồng} và {họ tên vợ}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, vợ chồng con thành tâm sắm sửa hương hoa lễ vật, dâng lên trước án.",
          "Vợ chồng con kết duyên đã {số năm} năm, lòng hằng mong có con để nối dõi tông đường, sớm hôm phụng dưỡng cha mẹ.",
          "Cúi xin chư Phật chư vị từ bi thương xót, ban cho vợ chồng con sớm có tin vui, mẹ tròn con vuông, con cái mạnh khỏe hiền lành.",
          "Vợ chồng con nguyện ăn ở hiền lành, làm nhiều việc thiện, dạy con nên người.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "ta-on-cuoi-nam",
    ten: "Văn khấn tạ ơn cuối năm",
    nhom: "Cầu an",
    moTa: "Bài khấn tạ ơn thần linh và tổ tiên sau một năm, làm trước Tết.",
    samLe: ["Hương, hoa tươi, trầu cau, mâm ngũ quả, rượu, trà, mâm cỗ, tiền vàng"],
    luuY: [
      "Thường làm trong tháng Chạp, trước ngày tất niên",
      "Khác lễ tất niên ở chỗ đây là lễ tạ ơn, nghiêng về lòng biết ơn hơn là bữa cơm sum họp",
      "Nhiều gia đình làm ăn buôn bán coi trọng lễ này",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ Địa, ngài Bản gia Táo quân, ngài Thần Tài vị tiền cùng chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng Chạp năm {năm}, một năm sắp qua, tín chủ con thành tâm sắm sửa hương hoa lễ vật, dâng lên trước án.",
          "Một năm qua, gia đình chúng con được chư vị che chở, người người mạnh khỏe, công việc hanh thông. Nay chúng con thành tâm làm lễ tạ ơn.",
          "Có điều gì sơ suất, thiếu sót trong việc thờ phụng, cúi xin chư vị lượng thứ bỏ qua.",
          "Cúi xin chư vị tiếp tục phù hộ độ trì cho gia đình chúng con sang năm mới được bình an, thịnh vượng, mọi sự như ý.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cau-tai-loc",
    ten: "Văn khấn cầu tài lộc",
    nhom: "Cầu an",
    moTa: "Bài khấn tại nhà cầu công việc thuận lợi, tiền tài hanh thông.",
    samLe: ["Hương, hoa tươi, trầu cau", "Trái cây, trà, nước sạch", "Tiền vàng"],
    luuY: ["Thường khấn vào ngày mùng một, ngày rằm hoặc đầu năm", "Khấn tại ban thần linh hoặc ban Thần Tài", "Cầu tài phải đi cùng làm ăn chân chính, không cầu điều trái lẽ"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy Thần Tài vị tiền, ngài Thổ Địa cai quản nơi này.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án.",
          "Chúng con làm nghề {nghề nghiệp}, mong được chư vị Tôn thần và tổ tiên soi xét. Cúi xin phù hộ cho công việc làm ăn hanh thông, gặp người quý giúp đỡ, tiền tài tăng tiến, chi tiêu đủ đầy.",
          "Chúng con nguyện làm ăn chân chính, giữ chữ tín, có của thì biết chia sẻ.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cau-duyen",
    ten: "Văn khấn cầu duyên",
    nhom: "Cầu an",
    moTa: "Bài khấn cầu sớm gặp người hợp ý, nên duyên vợ chồng.",
    samLe: ["Hương, hoa tươi, trầu cau", "Trái cây, bánh kẹo, nước sạch", "Lễ chay nếu khấn tại chùa"],
    luuY: ["Có thể khấn tại nhà hoặc khi đi lễ chùa, đền", "Nếu khấn tại chùa, không dâng đồ mặn lên ban Phật", "Nói rõ tên tuổi, ngày sinh của người cầu"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Nguyệt Lão, ngài se duyên cho muôn đôi lứa.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.",
          "Tín chủ con là {họ tên}, sinh ngày {ngày sinh}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án.",
          "Con đến tuổi lập gia đình mà duyên chưa đến. Cúi xin các ngài thương xót, se duyên cho con sớm gặp được người tâm đầu ý hợp, hiểu nhau thương nhau, cùng nhau xây dựng gia đình êm ấm.",
          "Con nguyện sống chân thành, biết trân trọng người mình gặp.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "cau-suc-khoe",
    ten: "Văn khấn cầu sức khỏe cho người ốm",
    nhom: "Cầu an",
    moTa: "Bài khấn tại nhà cầu cho người thân đang ốm đau sớm bình phục.",
    samLe: ["Hương, hoa tươi, trầu cau", "Trái cây, nước sạch", "Lễ chay là đủ"],
    luuY: [
      "Việc khấn cầu không thay cho việc chữa bệnh, cần đưa người ốm đi khám đúng nơi",
      "Có thể khấn tại ban gia tiên hoặc ban Phật trong nhà",
      "Người khấn thay nêu rõ tên tuổi người ốm",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nNam mô Đại từ Đại bi Linh cảm Quán Thế Âm Bồ Tát.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy tổ tiên nội ngoại họ {họ} cùng chư vị hương linh.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật dâng lên trước án.",
          "Người nhà chúng con là {quan hệ và tên người ốm}, sinh năm {năm sinh}, đang lâm bệnh. Cúi xin chư Phật, chư vị Tôn thần và tổ tiên từ bi gia hộ cho {tên người ốm} được thầy giỏi thuốc hay, bệnh tật tiêu trừ, sớm ngày khỏe mạnh.",
          "Chúng con nguyện làm nhiều việc thiện, chăm sóc người ốm chu đáo.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "di-chua",
    ten: "Văn khấn đi chùa",
    nhom: "Đi lễ",
    moTa: "Bài khấn ban Tam Bảo khi đi lễ chùa.",
    samLe: ["Hương, hoa tươi, trái cây, bánh kẹo, nước. Lễ CHAY hoàn toàn."],
    luuY: [
      "KHÔNG dâng đồ mặn, không dâng vàng mã lên ban Tam Bảo",
      "Trang phục kín đáo, đi nhẹ nói khẽ",
      "Lễ ban Tam Bảo trước, các ban khác sau",
      "Tiền công đức bỏ vào hòm, không đặt lên ban thờ",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Phật Thích Ca Mâu Ni.\nCon kính lạy Đức Phật A Di Đà.\nCon kính lạy chư vị Bồ Tát, chư Hiền Thánh Tăng, Hộ pháp Thiện thần.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm đến cửa chùa, dâng nén tâm hương, kính lễ trước Tam Bảo.",
          "Chúng con thành tâm sám hối mọi lỗi lầm đã trót gây ra, nguyện từ nay làm điều lành, tránh điều dữ.",
          "Cúi xin chư Phật chư Bồ Tát từ bi gia hộ cho bản thân con và gia đình được mạnh khỏe bình an, tai qua nạn khỏi, tâm được an vui, trí được sáng suốt.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "quan-the-am",
    ten: "Văn khấn Quan Thế Âm Bồ Tát",
    nhom: "Đi lễ",
    moTa: "Bài khấn trước ban Quan Âm, cầu bình an và tai qua nạn khỏi.",
    samLe: ["Hương, hoa tươi, trái cây, nước sạch. Lễ chay."],
    luuY: ["Ngày vía Quan Âm: 19 tháng Hai, 19 tháng Sáu, 19 tháng Chín âm lịch", "Lễ chay, không dâng đồ mặn", "Thường cầu cho sức khỏe, cho sự bình an, cho người đi xa"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nNam mô Đại từ Đại bi Linh cảm Quán Thế Âm Bồ Tát.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật, dâng lên trước án.",
          "Chúng con kính lạy Đức Quán Thế Âm Bồ Tát, bậc từ bi cứu khổ cứu nạn, nghe tiếng kêu cầu của muôn loài.",
          "Cúi xin Bồ Tát từ bi gia hộ cho gia đình chúng con tai qua nạn khỏi, bệnh tật tiêu trừ, người đi xa được bình an, người ở nhà được mạnh khỏe, trong nhà trên thuận dưới hòa.",
          "Chúng con nguyện sống lương thiện, giúp người giúp đời, không làm điều ác.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "den-phu-mau",
    ten: "Văn khấn đền phủ, ban Mẫu",
    nhom: "Đi lễ",
    moTa: "Bài khấn khi đi lễ đền, phủ, trước ban Tam Tòa Thánh Mẫu.",
    samLe: ["Hương, hoa tươi, trầu cau, oản, trái cây, tiền vàng. Ban Mẫu được dâng lễ mặn."],
    luuY: ["Khác chùa: ở đền phủ được dâng lễ mặn và vàng mã", "Lễ ban Công Đồng trước, ban Mẫu sau", "Trang phục kín đáo, giữ trật tự"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Vua Cha Ngọc Hoàng Thượng Đế.\nCon kính lạy Tam Tòa Thánh Mẫu.\nCon kính lạy Tứ phủ Công Đồng, Tứ phủ Vạn linh.\nCon kính lạy chư vị Thánh Cô, Thánh Cậu, Hội đồng các quan.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm sắm sửa hương hoa lễ vật, kim ngân trà quả, dâng lên trước án.",
          "Chúng con kính mời chư vị giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.",
          "Cúi xin chư vị phù hộ độ trì cho gia đình chúng con mạnh khỏe bình an, làm ăn thuận lợi, gặp dữ hóa lành, sở cầu như ý.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "thanh-minh-ta-mo",
    ten: "Văn khấn tảo mộ Thanh minh",
    nhom: "Đi lễ",
    moTa: "Bài khấn khi đi tảo mộ tiết Thanh minh, hoặc tạ mộ cuối năm.",
    samLe: ["Hương, hoa tươi, trầu cau, rượu, nước, xôi, gà luộc hoặc mâm chay, tiền vàng"],
    luuY: [
      "Khấn quan thần linh cai quản nghĩa trang trước, sau mới khấn phần mộ người nhà",
      "Dọn cỏ, đắp đất, sửa sang mộ trước khi thắp hương",
      "Tạ mộ cuối năm thường làm từ 20 đến 30 tháng Chạp",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.\nCon kính lạy các ngài Thần linh, Thổ Địa cai quản trong khu vực này.\nCon kính lạy vong linh {quan hệ và tên người đã khuất}.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, nhân tiết {Thanh minh hoặc cuối năm}, tín chủ con cùng toàn thể con cháu trong nhà sắm sửa hương hoa lễ vật, đến trước phần mộ, thành tâm kính lễ.",
          "Chúng con xin phép chư vị Tôn thần cho được sửa sang phần mộ, dọn cỏ đắp đất, để nơi an nghỉ của người thân được sạch sẽ tươm tất.",
          "Kính mời vong linh {tên người đã khuất} về đây chứng giám lòng thành của con cháu, thụ hưởng lễ vật.",
          "Cúi xin phù hộ độ trì cho con cháu mạnh khỏe bình an, gia đạo hưng long.",
          "Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "den-tran",
    ten: "Văn khấn đền Trần",
    nhom: "Đi lễ",
    moTa: "Bài khấn Đức Thánh Trần Hưng Đạo khi đi lễ đền Trần.",
    samLe: [
      "Hương, hoa tươi, trầu cau",
      "Trái cây, bánh kẹo, trà, rượu",
      "Có thể dâng lễ mặn tại ban Đức Thánh Trần",
      "Sớ, tiền vàng nếu đền có lệ",
    ],
    luuY: [
      "Đền Trần nổi tiếng nhất ở Nam Định, đông nhất dịp đầu năm và rằm tháng Giêng",
      "Trang phục chỉnh tề, giữ trật tự nơi đền",
      "Không chen lấn cướp lộc, tiền công đức bỏ vào hòm",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Thánh Trần Hưng Đạo Đại Vương.\nCon kính lạy các vị Thánh trong đền cùng chư vị Tôn thần.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm đến đền, sắm sửa hương hoa lễ vật kính dâng trước án.",
          "Chúng con kính ngưỡng công đức của Đức Thánh, người đã giữ yên bờ cõi. Cúi xin Đức Thánh chứng giám lòng thành.",
          "Cúi xin Đức Thánh phù hộ cho gia đình chúng con tai qua nạn khỏi, trừ được điều dữ, công việc hanh thông, trên dưới bình an.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "ba-chua-kho",
    ten: "Văn khấn đền Bà Chúa Kho",
    nhom: "Đi lễ",
    moTa: "Bài khấn khi đi lễ đền Bà Chúa Kho, cầu làm ăn thuận lợi.",
    samLe: ["Hương, hoa tươi, trầu cau", "Trái cây, bánh kẹo, trà, rượu", "Tiền vàng, sớ nếu đền có lệ"],
    luuY: ["Đền Bà Chúa Kho ở Bắc Ninh, đông nhất tháng Giêng", "Không có tục \"vay\" tiền thật, lễ là để tỏ lòng thành", "Nhiều người lễ tạ vào cuối năm"],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Bà Chúa Kho Thánh Mẫu.\nCon kính lạy các vị Thánh trong đền cùng chư vị Tôn thần.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm đến đền, sắm sửa hương hoa lễ vật kính dâng trước án.",
          "Chúng con làm nghề {nghề nghiệp}, cúi xin Bà thương xót, phù hộ cho công việc làm ăn thuận lợi, buôn bán hanh thông, tiền tài ổn định, gia đình bình an.",
          "Chúng con nguyện làm ăn chân chính, cuối năm xin về lễ tạ.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
          "Nam mô A Di Đà Phật (ba lần)",
        ],
      },
    ],
  },
  {
    slug: "dinh-thanh-hoang",
    ten: "Văn khấn Thành Hoàng làng",
    nhom: "Đi lễ",
    moTa: "Bài khấn khi đi lễ đình làng, kính Thành Hoàng bảo hộ cho dân làng.",
    samLe: ["Hương, hoa tươi, trầu cau", "Trái cây, xôi, trà, rượu", "Tiền vàng"],
    luuY: [
      "Thường lễ đình vào dịp hội làng, đầu năm hoặc ngày rằm",
      "Mỗi làng thờ một vị Thành Hoàng riêng, nên hỏi tên vị được thờ",
      "Trang phục chỉnh tề, giữ trật tự",
    ],
    baiKhan: [
      {
        doanVan: [
          "Nam mô A Di Đà Phật (ba lần)",
          "Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.\nCon kính lạy Đức Thành Hoàng bản cảnh {tên vị Thành Hoàng nếu biết}.\nCon kính lạy chư vị Tôn thần cai quản trong làng.",
          "Tín chủ con là {họ tên}, ngụ tại {địa chỉ}.",
          "Hôm nay là ngày {ngày} tháng {tháng} năm {năm}, tín chủ con thành tâm đến đình, sắm sửa hương hoa lễ vật kính dâng trước án.",
          "Chúng con là con dân trong làng, nhờ ơn Thành Hoàng che chở mà được yên ổn làm ăn. Cúi xin ngài chứng giám lòng thành.",
          "Cúi xin ngài phù hộ cho dân làng mưa thuận gió hòa, xóm giềng hòa thuận, gia đình chúng con mạnh khỏe, mọi việc hanh thông.",
          "Chúng con lễ bạc tâm thành, cúi xin chứng giám.",
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

/** Băm chuỗi thành số nguyên 32-bit để làm seed, giúp việc chọn ngẫu nhiên cố định theo slug. */
function hashSlugToSeed(slug: string): number {
  let h = 1779033703 ^ slug.length;
  for (let i = 0; i < slug.length; i++) {
    h = Math.imul(h ^ slug.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

/** PRNG mulberry32: cùng seed luôn cho ra cùng dãy số, nên kết quả ổn định giữa các lần build. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bài cùng nhóm để gợi ý ở cuối trang; nếu nhóm có nhiều hơn `max` bài, chọn ngẫu nhiên nhưng
 * cố định theo slug của bài hiện tại (luôn gồm chính bài đó), giữ nguyên thứ tự hiển thị theo nhóm. */
export function vanKhanLienQuan(bai: VanKhanBai, max = 6): VanKhanBai[] {
  const cungNhom = vanKhanByNhom(bai.nhom);
  if (cungNhom.length <= max) return cungNhom;

  const random = mulberry32(hashSlugToSeed(bai.slug));
  const khac = cungNhom.filter((v) => v.slug !== bai.slug);
  for (let i = khac.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [khac[i], khac[j]] = [khac[j], khac[i]];
  }
  const chon = new Set([bai.slug, ...khac.slice(0, max - 1).map((v) => v.slug)]);
  return cungNhom.filter((v) => chon.has(v.slug));
}
