// استيراد خطاف الاستعلام من مكتبة React Query
import { useQuery } from "@tanstack/react-query";
// استيراد عميل API المخصص
import apiClient from "../services/api-client";

// خطاف مخصص لجلب البيانات من نقاط النهاية المختلفة
const useData = (endpoint, requestConfig, deps) => {
  return useQuery({
    // مفتاح الاستعلام: يتكون من نقطة النهاية والتبعيات الإضافية
    queryKey: [endpoint, ...(deps || [])], 
    // دالة الاستعلام: تنفذ طلب GET وتستخرج النتائج
    queryFn: () =>
      apiClient
        .get(endpoint, requestConfig)
        .then((res) => res.data.results), 
    // وقت الصلاحية: 24 ساعة (البيانات تعتبر قديمة بعد هذه المدة)
    staleTime: 24 * 60 * 60 * 1000, 
    // معالجة الأخطاء: تسجيل رسالة الخطأ في وحدة التحكم
    onError: (err) => {
      console.error("Error fetching data:", err.message);
    },
  });
};

export default useData;