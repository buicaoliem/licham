/** Bành Tổ Bách Kỵ — quan niệm dân gian truyền lại theo can và chi của ngày, không phải kết luận khoa học. */
const CAN: readonly string[] = [
  "Giáp bất khai thương, tài vật hao vong (ngày Giáp không mở kho, của cải dễ hao tán)",
  "Ất bất tài chủng, thiên chủ bất trưởng (ngày Ất không trồng cây, khó lớn)",
  "Bính bất tu táo, tất kiến tai ương (ngày Bính không sửa bếp, dễ gặp tai ương)",
  "Đinh bất thế đầu, đầu tất sinh sang (ngày Đinh không cắt tóc, đầu dễ sinh mụn nhọt)",
  "Mậu bất thụ điền, điền chủ bất tường (ngày Mậu không nhận ruộng đất, chủ đất không lành)",
  "Kỷ bất phá khoán, nhị bỉ tịnh vong (ngày Kỷ không xé khế ước, hai bên đều thiệt)",
  "Canh bất kinh lạc, chức cơ hư trương (ngày Canh không dệt vải, khung cửi hư hỏng)",
  "Tân bất hợp tương, chủ nhân bất thường (ngày Tân không làm tương, chủ nhà khó hưởng)",
  "Nhâm bất cấp thủy, cánh nan đề phòng (ngày Nhâm không múc nước, khó đề phòng)",
  "Quý bất từ tụng, lý nhược địch cường (ngày Quý không kiện tụng, lý yếu địch mạnh)",
];
const CHI: readonly string[] = [
  "Tý bất vấn bốc, tự nhạ họa ương (ngày Tý không xem bói, tự rước họa)",
  "Sửu bất quan đới, chủ bất hoàn hương (ngày Sửu không đội mũ, mặc lễ phục, chủ khó về quê)",
  "Dần bất tế tự, thần quỷ bất thường (ngày Dần không cúng tế, thần quỷ không hưởng)",
  "Mão bất xuyên tỉnh, thủy tuyền bất hương (ngày Mão không đào giếng, nước không trong lành)",
  "Thìn bất khấp khấp, tất chủ trùng tang (ngày Thìn không khóc lóc, dễ có tang nữa)",
  "Tỵ bất viễn hành, tài vật phục tàng (ngày Tỵ không đi xa, của cải dễ mất)",
  "Ngọ bất thiêm cái, ốc chủ cánh trương (ngày Ngọ không lợp mái nhà, chủ nhà dễ đổi thay)",
  "Mùi bất phục dược, độc khí nhập trường (ngày Mùi không uống thuốc, độc khí vào ruột)",
  "Thân bất an sàng, quỷ túy nhập phòng (ngày Thân không kê giường, tà khí vào phòng)",
  "Dậu bất yến khách, túy tọa điên cuồng (ngày Dậu không đãi tiệc khách, say sưa điên loạn)",
  "Tuất bất cật khuyển, tác quái thượng sàng (ngày Tuất không ăn thịt chó, dễ sinh chuyện lạ)",
  "Hợi bất giá thú, bất lợi tân lang (ngày Hợi không cưới gả, bất lợi cho chú rể)",
];

export interface PengZuEntry {
  kind: "can" | "chi";
  label: string;
  text: string;
}

export function pengZuTaboo(canIndex: number, chiIndex: number): PengZuEntry[] {
  return [
    { kind: "can", label: "Can", text: CAN[canIndex]! },
    { kind: "chi", label: "Chi", text: CHI[chiIndex]! },
  ];
}
