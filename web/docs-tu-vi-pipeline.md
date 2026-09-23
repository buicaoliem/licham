# Tử vi hằng ngày — pipeline (Phase 8A.2)

## Kiến trúc
```
GitHub Actions "Tử vi hằng ngày và dựng lại trang" (.github/workflows/tu-vi-hang-ngay.yml)
  00:05 / 06:05 / 12:05 giờ VN (+ chạy tay)
  └─ pnpm --filter @licham/web generate:tu-vi
       ├─ đã có content/tu-vi/<ngày VN>.json hợp lệ → dừng, 0 request
       ├─ khóa theo ngày (.<ngày>.lock) + concurrency group → không chạy trùng
       ├─ MỘT request Gemini cho cả 12 tuổi (JSON schema, maxOutputTokens 8192), trần 3 request/lượt
       └─ đủ 12/12 hợp lệ → ghi nguyên tử content/tu-vi/<ngày>.json
  └─ commit file lên main → (CHƯA KIỂM CHỨNG) Vercel dựng production; xem mục "Việc cần kiểm chứng"
  └─ lượt 00:05 không có commit mới (kể cả Gemini lỗi) → gọi VERCEL_DEPLOY_HOOK_URL để trang sang ngày mới (trạng thái dự phòng)

Vercel build (pnpm build) — KHÔNG gọi Gemini, chỉ đọc web/content/tu-vi/<ngày VN lúc build>.json
  └─ không có file hợp lệ đúng ngày → trang ở trạng thái dự phòng trung thực (can chi + quan hệ tuổi, không luận/điểm/giờ)
```

## Vì sao lưu trong git
- Repo không có database hay object storage; chỉ có GitHub (repo public, main không bị bảo vệ) và Vercel (Git integration + Deploy Hook).
- File đã commit sống qua mọi lần build/deploy, đọc lại không cần Gemini, Preview deployment không ghi được vào main.
- `git push` là thao tác nguyên tử; đẩy trùng bị từ chối (non-fast-forward) và workflow kiểm lại main trước khi thử lại.
- Không thêm dịch vụ trả phí. Đổi lại: mỗi ngày một commit bot nhỏ (~6 KB) trên main.

## Quy tắc dữ liệu
- Chỉ công nhận khi đủ 12/12 tuổi: đúng ngày, mỗi tuổi đúng một lần, luận 20–600 ký tự, điểm nguyên trong khoảng theo
  quan hệ chi (hợp 3–5, bình hòa/trùng 2–4, xung/hình/hại 1–3), giờ tốt thuộc giờ hoàng đạo do core tính.
- Không có hai tuổi dùng chung lời luận (độ giống ≥ 0,6 bị loại); lời luận nhắc "ngày <can chi>" sai bị loại.
- `canChiNgay` trong file phải khớp core. Lịch luôn do @licham/core tính, file chỉ mang lời luận.
- Output bị cắt (MAX_TOKENS), JSON lỗi, sai schema → không lưu gì. Không bao giờ chép luận ngày khác.

## Cấu hình cần làm trước khi chạy production
1. GitHub → Settings → Secrets → Actions: thêm `GEMINI_API_KEY` (hiện khóa chỉ nằm ở Vercel).
2. (Tùy chọn) GitHub Variables: `GEMINI_MODEL` để đổi model chính.
3. Có thể xóa `GEMINI_API_KEY` khỏi Vercel env: build không còn dùng; script tự từ chối chạy khi có biến `VERCEL`.
4. Giữ secret `VERCEL_DEPLOY_HOOK_URL` (đã có).
5. Merge vào main: lịch chạy của GitHub Actions chỉ có hiệu lực trên nhánh mặc định.

## Chạy tay
- Sinh lại khi lỗi: GitHub → Actions → "Tử vi hằng ngày và dựng lại trang" → Run workflow (bỏ qua nếu ngày đã có dữ liệu).
- E2E thật, đúng 1 request, ghi vào thư mục tạm: `TU_VI_E2E=1 GEMINI_API_KEY=... pnpm --filter @licham/web tu-vi:e2e`.
  Không chạy khi quota đang hết.

## Việc cần kiểm chứng trước production

1. **Bot commit có kích hoạt Vercel không?** Chưa biết. Khi chưa đặt repository variable `VERCEL_DEPLOYS_ON_PUSH=true`, workflow gọi Deploy Hook cả sau khi commit (có thể dựng 2 lần nếu Vercel cũng tự dựng). Sau khi được phép deploy: chạy một lượt thật, xem Vercel có dựng từ commit của bot không; nếu có thì đặt biến trên để bỏ lần gọi hook thừa.
2. Secret `GEMINI_API_KEY`, `VERCEL_DEPLOY_HOOK_URL` có trong GitHub Actions; thiếu hook thì lượt cần làm mới báo lỗi (không im lặng).
3. Main không bị bảo vệ nhánh chặn `github-actions[bot]` push (repo hiện không bảo vệ).
4. Workflow chỉ chạy trên main (`github.ref`), lịch chỉ có hiệu lực sau khi merge; dispatch từ nhánh khác bị bỏ qua, không gọi hook.
5. Job đỏ khi: Gemini lỗi, thiếu khóa, bị từ chối, lượt bị khóa, đẩy commit hỏng, hoặc gọi hook lỗi.
6. Workflow dùng pnpm 10 (đã thử `install --frozen-lockfile` với 10.34.5 trên lockfile 9.0; pnpm 9 lỗi vì `overrides` trong pnpm-workspace.yaml).

## Checklist E2E và nghiệm thu (Phase 8A.3)

Trước lượt chạy thật:
1. [ ] Ổ C: còn ≥ 2 GB trống (`web/.next` ~540 MB dựng lại được).
2. [ ] GitHub → Settings → Secrets → Actions: thêm `GEMINI_API_KEY` (hiện CHỈ có `VERCEL_DEPLOY_HOOK_URL`). Chưa đặt variable `VERCEL_DEPLOYS_ON_PUSH` và `GEMINI_MODEL` (tùy chọn).
3. [ ] E2E một request tại máy, ghi vào thư mục tạm, không đụng `web/content`: `TU_VI_E2E=1 GEMINI_API_KEY=... pnpm --filter @licham/web tu-vi:e2e`. Đạt khi đúng 1 request, đủ 12/12 tuổi, kiểm định qua.
4. [ ] Merge nhánh vào main (workflow cũ `rebuild.yml` trên main sẽ bị xóa, tránh chạy song song hai lịch).
5. [ ] Xác nhận Vercel: Git kết nối `buicaoliem/licham`, nhánh production `main`, Deploy Hook "Lichamhooks" trỏ `main`, root `web`.

Chạy thật đầu tiên (Actions → Run workflow trên main, `redeploy` để false):
1. [ ] Generate: log có "written", `Request Gemini` ≤ 3, không lộ khóa.
2. [ ] Validate: file `web/content/tu-vi/<ngày VN>.json` đủ 12 tuổi (script đã kiểm trước khi ghi).
3. [ ] Commit: main có commit `chore(tu-vi): dữ liệu tử vi ngày ...` của github-actions[bot].
4. [ ] Deploy: vào Vercel xem có deployment tự sinh từ commit của bot không.
   - Có → đặt variable `VERCEL_DEPLOYS_ON_PUSH=true` để bỏ lần gọi hook thừa.
   - Không (ví dụ bị chặn do tác giả commit không phải thành viên Vercel) → giữ biến chưa đặt; workflow gọi Deploy Hook.
5. [ ] `https://www.licham.app/tu-vi` hiện đúng ngày và nội dung, không ở trạng thái dự phòng.
6. [ ] Lượt chạy lại ngay: trạng thái `exists`, 0 request, không commit mới.
7. [ ] Thử đường lỗi (sau cùng, chỉ khi cần): dispatch với khóa sai → job đỏ, trang vẫn dựng; lượt 00:05 vẫn gọi hook.
