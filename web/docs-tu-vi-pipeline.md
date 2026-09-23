# Tử vi generation pipeline — Phase 8A status

## Trạng thái
- Pipeline đã an toàn khi API lỗi: lỗi/quota Gemini không làm hỏng hoặc ghi đè dữ liệu tử vi hiện có; build vẫn chạy bằng dữ liệu đã commit.
- **Chưa xác minh E2E thành công đủ 12/12 tuổi.**
- **Chưa sẵn sàng bật sinh nội dung tự động trên production** do giới hạn quota (Gemini free tier) và dữ liệu sinh ra không được lưu bền vững (filesystem của Vercel build là tạm thời).
- **Không được phụ thuộc vào mỗi lần Vercel build để sinh lại toàn bộ nội dung tử vi.** Nội dung phải được sinh ngoài build, kiểm duyệt, rồi commit vào repo.

## Quy trình đề xuất
1. Chạy `pnpm generate:tu-vi` cục bộ (có khóa API trong môi trường, không commit khóa).
2. Kiểm tra đủ 12 tuổi, review nội dung.
3. Commit các file dữ liệu tử vi; build production chỉ đọc dữ liệu đã commit.
