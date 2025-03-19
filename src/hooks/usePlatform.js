// استيراد خطاف البيانات المخصص
import useData from "./useData";

// خطاف مخصص لجلب بيانات منصات الألعاب من واجهة API
// يستخدم نقطة النهاية "/platforms/lists/parents" للحصول على قائمة المنصات الرئيسية
const usePlatform = () => useData("/platforms/lists/parents");

export default usePlatform;
