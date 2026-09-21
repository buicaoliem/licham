/** Kho kiến thức: giải thích các thuật ngữ đang dùng trên trang lịch. Nội dung do licham.app biên soạn. */
import type { RelatedLink } from "./calendar/related";

/** Nguồn của phần nội dung: thiên văn tính toán, lịch truyền thống, hay biên soạn. */
export type SourceType = "astronomical" | "traditional" | "editorial";

export const SOURCE_TYPE_LABEL: Record<SourceType, string> = {
  astronomical: "Tính thiên văn",
  traditional: "Lịch truyền thống",
  editorial: "Biên soạn",
};

export interface KnowledgeSection {
  h2: string;
  p: string[];
  list?: string[];
  sourceType?: SourceType;
}

export interface KnowledgeArticle {
  slug: string;
  title: string;
  h1: string;
  description: string;
  sourceType: SourceType;
  sections: KnowledgeSection[];
  faq: { q: string; a: string }[];
  /** Slug các bài kiến thức liên quan, theo thứ tự cố định. */
  related: string[];
  /** Trang lịch/công cụ áp dụng khái niệm này. */
  links: RelatedLink[];
}

export const KNOWLEDGE: readonly KnowledgeArticle[] = [
  {
    slug: "am-lich-la-gi",
    title: "Âm lịch là gì? Cách tính ngày, tháng, năm âm lịch",
    h1: "Âm lịch là gì?",
    description: "Âm lịch Việt Nam thực chất là lịch âm dương: tháng theo trăng, năm theo mặt trời. Giải thích ngày mùng một, tháng đủ tháng thiếu và cách chèn tháng nhuận.",
    sourceType: "astronomical",
    sections: [
      {
        h2: "Lịch âm dương, không thuần âm",
        p: [
          "Cái người Việt quen gọi là âm lịch là lịch âm dương: tháng được đếm theo chu kỳ của Mặt Trăng, còn năm được giữ khớp với chu kỳ của Mặt Trời nhờ tiết khí và tháng nhuận. Nhờ vậy Tết Nguyên đán luôn rơi vào đầu mùa xuân, dù ngày dương lịch thay đổi từ năm này sang năm khác.",
        ],
      },
      {
        h2: "Ngày mùng một và độ dài tháng",
        p: [
          "Mỗi tháng âm lịch bắt đầu từ ngày chứa sóc, tức thời điểm trăng mới (Mặt Trăng và Mặt Trời cùng kinh độ). Một chu kỳ trăng trung bình dài khoảng 29,53 ngày nên tháng chỉ có thể tròn 29 ngày (tháng thiếu) hoặc 30 ngày (tháng đủ). Thứ tự đủ và thiếu không đều mà do thời điểm sóc thực tế quyết định.",
          "Ngày của sóc được xác định theo giờ Việt Nam (UTC+7). Vì múi giờ khác nhau, có những năm ngày mùng một của Việt Nam lệch một ngày so với lịch Trung Quốc dùng UTC+8.",
        ],
        sourceType: "astronomical",
      },
      {
        h2: "Năm âm lịch và tháng nhuận",
        p: [
          "Mười hai tháng âm lịch dài khoảng 354 ngày, ngắn hơn năm dương lịch chừng 11 ngày. Để không lệch mùa, cứ khoảng ba năm lại chèn thêm một tháng nhuận, trung bình bảy lần trong 19 năm. Xem chi tiết tại bài thuật ngữ tháng nhuận.",
        ],
      },
      {
        h2: "Năm âm lịch có tên can chi",
        p: ["Mỗi năm âm lịch mang một tên gồm một can và một chi, lặp lại sau 60 năm. Năm đổi tên vào mùng một Tết chứ không phải ngày 1/1 dương lịch."],
        sourceType: "traditional",
      },
    ],
    faq: [
      { q: "Âm lịch có phải chỉ tính theo Mặt Trăng?", a: "Không. Lịch Việt Nam là âm dương lịch: tháng theo Mặt Trăng, năm điều chỉnh theo Mặt Trời bằng tiết khí và tháng nhuận." },
      { q: "Một tháng âm lịch có bao nhiêu ngày?", a: "29 ngày (tháng thiếu) hoặc 30 ngày (tháng đủ), tùy thời điểm trăng mới của tháng kế tiếp." },
      { q: "Tại sao ngày Tết mỗi năm mỗi khác?", a: "Vì năm âm lịch ngắn hơn năm dương lịch khoảng 11 ngày, được bù bằng tháng nhuận, nên mùng một Tết dao động trong khoảng từ 21/1 đến 20/2 dương lịch." },
    ],
    related: ["thang-nhuan-am-lich", "can-chi", "tiet-khi"],
    links: [
      { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" },
      { label: "Lịch âm hôm nay", href: "/hom-nay/" },
      { label: "Phương pháp tính lịch", href: "/phuong-phap-tinh-lich/" },
    ],
  },
  {
    slug: "can-chi",
    title: "Can chi: Thiên can, Địa chi và vòng sáu mươi",
    h1: "Can chi là gì?",
    description: "Mười thiên can, mười hai địa chi, vòng Lục thập hoa giáp và cách áp dụng can chi cho năm, tháng, ngày, giờ.",
    sourceType: "traditional",
    sections: [
      {
        h2: "Mười can, mười hai chi",
        p: ["Hệ can chi ghép hai dãy tên để đánh số thời gian."],
        list: [
          "Mười thiên can: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý.",
          "Mười hai địa chi: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi.",
        ],
      },
      {
        h2: "Vòng sáu mươi",
        p: [
          "Ghép lần lượt từng can với từng chi ta được các cặp Giáp Tý, Ất Sửu, Bính Dần… Sau 60 cặp thì trở về Giáp Tý; đó là Lục thập hoa giáp. Chỉ những cặp cùng tính âm dương mới ghép được với nhau, vì thế có đúng 60 chứ không phải 120 cặp.",
        ],
      },
      {
        h2: "Áp dụng cho năm, tháng, ngày, giờ",
        p: [
          "Năm: tên năm đổi vào mùng một Tết. Có thể tính nhanh: lấy năm trừ 4, chia dư cho 10 ra can, chia dư cho 12 ra chi. Năm 2026 cho can Bính và chi Ngọ, tức năm Bính Ngọ.",
          "Ngày: can chi ngày chạy liên tục theo chu kỳ 60 ngày, không bị ngắt bởi tháng hay năm, nên có thể tính từ số ngày Julian. Giờ: một ngày chia thành 12 canh giờ, mỗi canh dài hai tiếng, giờ Tý bắt đầu từ 23 giờ.",
        ],
        sourceType: "astronomical",
      },
    ],
    faq: [
      { q: "Năm can chi đổi vào ngày nào?", a: "Vào mùng một Tết âm lịch, không phải ngày 1 tháng 1 dương lịch." },
      { q: "Vì sao chỉ có 60 cặp can chi?", a: "Vì can dương chỉ ghép với chi dương và can âm chỉ ghép với chi âm; 60 là bội chung nhỏ nhất của 10 và 12." },
    ],
    related: ["ngu-hanh", "am-lich-la-gi", "gio-hoang-dao"],
    links: [
      { label: "Tra tuổi và can chi năm sinh", href: "/sinh-nam/" },
      { label: "Xem ngày hôm nay", href: "/hom-nay/" },
    ],
  },
  {
    slug: "ngu-hanh",
    title: "Ngũ hành: Kim, Mộc, Thủy, Hỏa, Thổ và nạp âm",
    h1: "Ngũ hành là gì?",
    description: "Năm hành, quan hệ tương sinh tương khắc và nạp âm sáu mươi hoa giáp dùng trong lịch và xem tuổi.",
    sourceType: "traditional",
    sections: [
      {
        h2: "Năm hành",
        p: ["Ngũ hành là năm phạm trù Kim, Mộc, Thủy, Hỏa, Thổ, dùng để mô tả sự vận động và chuyển hóa trong quan niệm truyền thống. Đây là hệ thống phân loại, không phải kết quả đo đạc."],
      },
      {
        h2: "Tương sinh, tương khắc",
        p: ["Hai chiều quan hệ được dùng nhiều nhất:"],
        list: [
          "Tương sinh: Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc.",
          "Tương khắc: Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc.",
        ],
      },
      {
        h2: "Nạp âm",
        p: [
          "Mỗi cặp can chi liền nhau chung một nạp âm, nên vòng 60 có 30 nạp âm, mỗi nạp âm mang một hành và một tên hình tượng như Thiên Hà Thủy (năm Bính Ngọ) hay Tích Lịch Hỏa (Kỷ Sửu). Trang lịch dùng nạp âm để ghi hành của ngày và của năm.",
        ],
      },
    ],
    faq: [
      { q: "Nạp âm khác gì hành của can hoặc chi?", a: "Can và chi mỗi chữ có hành riêng, còn nạp âm là hành gán cho cả cặp can chi theo bảng truyền thống, thường dùng khi bàn về mệnh." },
    ],
    related: ["can-chi", "sao-tot-xau", "gio-hoang-dao"],
    links: [
      { label: "Xem tuổi hợp xung", href: "/phong-thuy/xung-tuoi/" },
      { label: "Xem tuổi kết hôn", href: "/xem-tuoi-ket-hon/" },
    ],
  },
  {
    slug: "tiet-khi",
    title: "24 tiết khí: định nghĩa, danh sách và cách tính",
    h1: "24 tiết khí",
    description: "Tiết khí chia năm theo vị trí Mặt Trời trên hoàng đạo, mỗi 15 độ một tiết. Danh sách 24 tiết, ý nghĩa mùa vụ và vai trò với tháng nhuận.",
    sourceType: "astronomical",
    sections: [
      {
        h2: "Tiết khí là gì",
        p: [
          "Tiết khí chia quỹ đạo biểu kiến của Mặt Trời thành 24 phần bằng nhau, mỗi phần 15 độ kinh độ. Vì bám theo Mặt Trời nên tiết khí gần như cố định theo dương lịch, khác với ngày âm lịch chạy theo Mặt Trăng.",
        ],
        sourceType: "astronomical",
      },
      {
        h2: "Danh sách 24 tiết",
        p: ["Lập xuân là tiết ứng với kinh độ 315 độ, mở đầu chuỗi:"],
        list: [
          "Xuân: Lập xuân, Vũ thủy, Kinh trập, Xuân phân, Thanh minh, Cốc vũ.",
          "Hạ: Lập hạ, Tiểu mãn, Mang chủng, Hạ chí, Tiểu thử, Đại thử.",
          "Thu: Lập thu, Xử thử, Bạch lộ, Thu phân, Hàn lộ, Sương giáng.",
          "Đông: Lập đông, Tiểu tuyết, Đại tuyết, Đông chí, Tiểu hàn, Đại hàn.",
        ],
      },
      {
        h2: "Tiết và trung khí",
        p: [
          "Trong 24 tiết, các tiết xen kẽ được gọi là tiết (Lập xuân, Kinh trập…) và trung khí (Vũ thủy, Xuân phân…). Tháng theo tiết, dùng để định trực và ngày hoàng đạo, bắt đầu vào ngày một tiết khởi đầu. Trung khí còn quyết định tháng nhuận: tháng âm lịch không chứa trung khí là tháng nhuận.",
        ],
        sourceType: "astronomical",
      },
    ],
    faq: [
      { q: "Tiết khí có đổi theo âm lịch không?", a: "Không. Tiết khí theo Mặt Trời nên gần như luôn rơi vào cùng ngày dương lịch, lệch nhiều nhất một ngày giữa các năm." },
      { q: "Giờ nào của tiết khí được tính?", a: "Thời điểm chính xác của tiết được tính theo giờ Việt Nam UTC+7, rồi lấy ngày chứa thời điểm đó." },
    ],
    related: ["thang-nhuan-am-lich", "truc-ngay", "am-lich-la-gi"],
    links: [
      { label: "Lịch ngày mai", href: "/ngay-mai/" },
      { label: "Phương pháp tính lịch", href: "/phuong-phap-tinh-lich/" },
    ],
  },
  {
    slug: "gio-hoang-dao",
    title: "Giờ hoàng đạo, ngày hoàng đạo và mười hai thần sát",
    h1: "Giờ hoàng đạo là gì?",
    description: "Sáu sao hoàng đạo và sáu sao hắc đạo, cách xác định giờ hoàng đạo theo chi của ngày và ngày hoàng đạo theo tháng.",
    sourceType: "traditional",
    sections: [
      {
        h2: "Mười hai thần sát",
        p: [
          "Lịch truyền thống gán cho mười hai canh giờ mười hai vị sao xoay vòng: Thanh Long, Minh Đường, Thiên Hình, Chu Tước, Kim Quỹ, Bảo Quang, Bạch Hổ, Ngọc Đường, Thiên Lao, Nguyên Vũ, Tư Mệnh, Câu Trận. Sáu sao được coi là hoàng đạo là Thanh Long, Minh Đường, Kim Quỹ, Bảo Quang, Ngọc Đường, Tư Mệnh. Sáu sao còn lại là hắc đạo.",
        ],
      },
      {
        h2: "Cách định giờ hoàng đạo",
        p: [
          "Trong một ngày, sao Thanh Long đóng ở một canh giờ cố định tùy theo chi của ngày, các sao còn lại theo thứ tự ở các giờ kế tiếp. Ngày Tý và ngày Ngọ khởi Thanh Long ở giờ Thân, ngày Sửu và Mùi ở giờ Tuất, ngày Dần và Thân ở giờ Tý, ngày Mão và Dậu ở giờ Dần, ngày Thìn và Tuất ở giờ Thìn, ngày Tỵ và Hợi ở giờ Ngọ.",
        ],
      },
      {
        h2: "Ngày hoàng đạo",
        p: [
          "Ngày hoàng đạo dùng cùng vòng mười hai sao, nhưng chạy theo ngày, và điểm xuất phát tùy chi của tháng theo tiết khí. Ngày hoàng đạo và trực là hai hệ khác nhau; trực chỉ gợi ý việc hợp với ngày, còn hoàng đạo hay hắc đạo do sao quyết định.",
        ],
      },
      {
        h2: "Cách dùng",
        p: ["Đây là quan niệm dân gian, dùng để chọn giờ cho việc quan trọng như xuất hành, khai trương, cưới hỏi. Không có cơ sở khoa học đo được và chỉ mang tính tham khảo."],
        sourceType: "editorial",
      },
    ],
    faq: [
      { q: "Ngày hoàng đạo có luôn tốt không?", a: "Theo truyền thống là ngày thuận lợi hơn, nhưng vẫn phải xét thêm trực, sao và việc định làm." },
      { q: "Mỗi ngày có mấy giờ hoàng đạo?", a: "Luôn sáu giờ hoàng đạo và sáu giờ hắc đạo trong mười hai canh giờ." },
    ],
    related: ["truc-ngay", "sao-tot-xau", "can-chi"],
    links: [
      { label: "Xem ngày tốt", href: "/xem-ngay-tot/" },
      { label: "Lịch âm hôm nay", href: "/hom-nay/" },
    ],
  },
  {
    slug: "nhi-thap-bat-tu",
    title: "Nhị thập bát tú: 28 sao trong lịch vạn niên",
    h1: "Nhị thập bát tú",
    description: "Hai mươi tám sao (nhị thập bát tú) luân phiên theo chu kỳ 28 ngày, khớp bốn tuần bảy ngày, và cách trang lịch dùng chúng.",
    sourceType: "traditional",
    sections: [
      {
        h2: "28 sao chạy theo chu kỳ 28 ngày",
        p: [
          "Nhị thập bát tú vốn là 28 chòm sao dọc đường đi của Mặt Trăng. Trong lịch, mỗi ngày mang một sao, lần lượt từ Giác đến Chẩn rồi quay lại, không phụ thuộc tháng hay năm. Vì 28 chia hết cho 7, một sao luôn rơi vào cùng một thứ trong tuần.",
        ],
      },
      {
        h2: "Cát và hung",
        p: [
          "Truyền thống chia các sao thành tú tốt và tú xấu. Licham.app hiển thị tên sao và phân loại cát hay hung của ngày, chưa hiển thị mô tả chi tiết từng sao vì chưa có nguồn dữ liệu đã kiểm chứng.",
        ],
      },
      {
        h2: "Điểm mốc",
        p: ["Chu kỳ được neo vào một ngày mốc đã đối chiếu với các nguồn lịch Việt: ngày 16/9/2026 là sao Chẩn."],
        sourceType: "editorial",
      },
    ],
    faq: [
      { q: "Sao của ngày có giống sao của tháng?", a: "Không. Sao nhị thập bát tú của ngày chạy độc lập theo chu kỳ 28 ngày." },
      { q: "Có khác nhau giữa các trang lịch?", a: "Mỗi trang có thể neo chu kỳ khác nhau; licham.app dùng mốc được đối chiếu ghi ở trên." },
    ],
    related: ["sao-tot-xau", "truc-ngay", "gio-hoang-dao"],
    links: [{ label: "Xem ngày tốt", href: "/xem-ngay-tot/" }, { label: "Lịch âm hôm nay", href: "/hom-nay/" }],
  },
  {
    slug: "truc-ngay",
    title: "Thập nhị trực: 12 trực của ngày (Kiến, Trừ, Mãn…)",
    h1: "Thập nhị trực là gì?",
    description: "Mười hai trực Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế: cách xác định và ý nghĩa dân gian.",
    sourceType: "traditional",
    sections: [
      {
        h2: "Mười hai trực",
        p: ["Mười hai trực theo thứ tự: Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế."],
      },
      {
        h2: "Cách xác định",
        p: [
          "Trực đi theo tháng tiết khí. Ngày có chi trùng với chi của tháng là ngày Kiến, những ngày sau lần lượt là Trừ, Mãn… mỗi ngày một trực. Vào ngày một tiết khí bắt đầu, trực của ngày hôm trước được lặp lại, nên có hai ngày liên tiếp cùng một trực.",
        ],
        sourceType: "astronomical",
      },
      {
        h2: "Ý nghĩa dân gian",
        p: [
          "Trực chỉ gợi ý việc hợp với ngày. Theo quan niệm phổ biến, Trừ, Định, Thành, Khai thường được xem là thuận cho việc khởi sự; Phá và Nguy được xem là nên tránh việc lớn. Đây là kinh nghiệm dân gian, không phải cam kết về kết quả.",
        ],
        sourceType: "editorial",
      },
    ],
    faq: [
      { q: "Trực khác gì ngày hoàng đạo?", a: "Hoàng đạo hay hắc đạo do vòng mười hai sao quyết định; trực là hệ riêng, chỉ nói ngày hợp với việc gì." },
      { q: "Vì sao có hai ngày trùng trực?", a: "Vì vào ngày bắt đầu một tiết khí, trực của ngày trước được lặp lại." },
    ],
    related: ["tiet-khi", "gio-hoang-dao", "sao-tot-xau"],
    links: [{ label: "Xem ngày tốt", href: "/xem-ngay-tot/" }, { label: "Lịch ngày mai", href: "/ngay-mai/" }],
  },
  {
    slug: "sao-tot-xau",
    title: "Sao tốt xấu trong lịch: Ngọc hạp thông thư và cách đọc",
    h1: "Sao tốt, sao xấu của ngày",
    description: "Sao tốt xấu trong lịch vạn niên: nguồn gốc theo Ngọc hạp thông thư, những sao licham.app đang hiển thị và giới hạn dữ liệu.",
    sourceType: "traditional",
    sections: [
      {
        h2: "Sao tốt và sao xấu là gì",
        p: [
          "Ngọc hạp thông thư là sách lịch cổ liệt kê các sao cát và hung theo can chi của ngày và tháng. Một ngày có thể có vài sao tốt và vài sao xấu cùng lúc, nên người xem thường cân nhắc tổng thể chứ không chỉ một sao.",
        ],
      },
      {
        h2: "Dữ liệu trên licham.app",
        p: [
          "Trang lịch hiện chỉ hiển thị một tập sao đã kiểm chứng, gồm bảy sao tốt (Thiên Phú, Thiên Phúc, Thiên Mã, Lộc Khố, Phúc Sinh, Dịch Mã, Nguyệt Không) và sáu sao xấu (Thổ Ôn, Hoang Vu, Hoàng Sa, Bạch Hổ Hắc Đạo, Quả Tú, Sát Chủ), cộng thêm một số sao suy ra từ dữ liệu đối chiếu. Đây chưa phải bộ đầy đủ của Ngọc hạp thông thư nên có ngày không ghi sao nào.",
        ],
        sourceType: "editorial",
      },
      {
        h2: "Cách đọc",
        p: ["Sao tốt gợi ý việc nên làm, sao xấu gợi ý việc nên kiêng. Xem cùng với trực, giờ hoàng đạo và nhị thập bát tú; tất cả là tri thức dân gian dùng để tham khảo."],
        sourceType: "traditional",
      },
    ],
    faq: [
      { q: "Vì sao ngày của tôi không có sao nào?", a: "Vì licham.app chỉ hiển thị các sao đã kiểm chứng, chưa có bộ đầy đủ." },
      { q: "Sao xấu có nghĩa là không được làm gì?", a: "Không. Đó là gợi ý kiêng một số việc theo truyền thống, không phải quy định." },
    ],
    related: ["nhi-thap-bat-tu", "truc-ngay", "gio-hoang-dao"],
    links: [{ label: "Xem ngày tốt", href: "/xem-ngay-tot/" }, { label: "Phương pháp tính lịch", href: "/phuong-phap-tinh-lich/" }],
  },
  {
    slug: "thang-nhuan-am-lich",
    title: "Tháng nhuận âm lịch: vì sao có và cách xác định",
    h1: "Tháng nhuận âm lịch",
    description: "Tháng nhuận là tháng âm lịch không chứa trung khí, được chèn để năm âm lịch khớp với mùa. Cách xác định và ví dụ 2020, 2023.",
    sourceType: "astronomical",
    sections: [
      {
        h2: "Vì sao cần tháng nhuận",
        p: [
          "Mười hai tháng trăng chỉ dài khoảng 354 ngày, còn một vòng bốn mùa dài khoảng 365 ngày. Nếu không bù, Tết sẽ trôi dần qua các mùa. Cứ khoảng hai đến ba năm, lịch chèn thêm một tháng nhuận; trong 19 năm có bảy tháng nhuận.",
        ],
      },
      {
        h2: "Quy tắc xác định",
        p: [
          "Mỗi tháng âm lịch bình thường chứa một trung khí. Khi một tháng âm lịch không chứa trung khí nào, tháng đó là tháng nhuận và lấy tên của tháng liền trước. Trong quá trình tính, năm âm lịch có 13 tháng thì tháng nhuận là tháng đầu tiên không có trung khí.",
        ],
        sourceType: "astronomical",
      },
      {
        h2: "Ví dụ",
        p: [
          "Năm Quý Mão 2023 có tháng 2 nhuận, kéo dài từ 22/3 đến 19/4/2023 dương lịch (29 ngày). Năm Canh Tý 2020 có tháng 4 nhuận, từ 23/5 đến 20/6/2020.",
        ],
      },
    ],
    faq: [
      { q: "Tháng nhuận có ảnh hưởng ngày giỗ, ngày lễ?", a: "Ngày giỗ và lễ theo âm lịch thường tính ở tháng thường, không tính ở tháng nhuận, trừ khi gia đình có quy ước riêng." },
      { q: "Tháng nhuận nào cũng dài 29 ngày?", a: "Không, giống các tháng khác, tháng nhuận có 29 hoặc 30 ngày tùy thời điểm trăng mới." },
    ],
    related: ["am-lich-la-gi", "tiet-khi", "can-chi"],
    links: [{ label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" }, { label: "Phương pháp tính lịch", href: "/phuong-phap-tinh-lich/" }],
  },
];

export function knowledgeBySlug(slug: string): KnowledgeArticle | undefined {
  return KNOWLEDGE.find((k) => k.slug === slug);
}

export const knowledgeHref = (slug: string) => `/kien-thuc/${slug}/`;

/** Liên kết kiến thức có thứ tự cố định theo danh sách slug (bỏ slug không tồn tại). */
export function knowledgeLinks(slugs: readonly string[]): RelatedLink[] {
  return slugs.flatMap((s) => {
    const k = knowledgeBySlug(s);
    return k ? [{ label: k.h1, href: knowledgeHref(s) }] : [];
  });
}
