/**
 * Cache bộ nhớ có giới hạn cho các phép tính lịch thuần (cùng đầu vào luôn ra cùng kết quả).
 * - Chỉ lưu khi hàm chạy thành công; lỗi hoặc đầu vào không hợp lệ không bao giờ được lưu.
 * - Khóa chỉ gồm đầu vào của phép tính, không có "hôm nay" hay trạng thái tiến trình, nên mỗi
 *   instance serverless có cache riêng vẫn trả đúng dữ liệu; mất cache chỉ làm tính lại.
 * - Kết quả trả về được dùng chung giữa các lần gọi, nơi gọi không được sửa nó.
 */
export interface MemoCache<A extends unknown[], R> {
  (...args: A): R;
  clear(): void;
  readonly size: number;
}

export function memoize<A extends unknown[], R>(fn: (...args: A) => R, key: (...args: A) => string, max: number): MemoCache<A, R> {
  const store = new Map<string, R>();
  const cached = ((...args: A): R => {
    const k = key(...args);
    if (store.has(k)) {
      const hit = store.get(k) as R;
      // LRU: đưa phần tử vừa dùng về cuối.
      store.delete(k);
      store.set(k, hit);
      return hit;
    }
    const value = fn(...args);
    store.set(k, value);
    if (store.size > max) store.delete(store.keys().next().value as string);
    return value;
  }) as MemoCache<A, R>;
  cached.clear = () => store.clear();
  Object.defineProperty(cached, "size", { get: () => store.size });
  return cached;
}
