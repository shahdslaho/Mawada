
// استيراد المكتبات اللازمة
import { useState } from "react";
import usePlatform from "../../hooks/usePlatform";
import styles from "../../../src/assets/styles/PlatformSelector.module.css";
import LoadingSpinner from "../LoadingSpinner";

// مكون اختيار المنصة
const PlatformSelector = ({ onSelectPlatform, selectPlatform }) => {
  // جلب بيانات المنصات وحالة التحميل
  const { data, isLoading, error } = usePlatform(); 
  // حالة فتح/إغلاق القائمة المنسدلة
  const [isOpen, setIsOpen] = useState(false);

  // عرض مؤشر التحميل أثناء جلب البيانات
  if (isLoading) return <LoadingSpinner />; 
  // عرض رسالة خطأ في حالة فشل جلب البيانات
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      {/* زر فتح القائمة المنسدلة */}
      <button
        className={styles.button}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* عرض اسم المنصة المختارة أو النص الافتراضي */}
        {selectPlatform?.name || "Platforms"}
        {/* أيقونة السهم */}
        <svg
          className={styles.icon}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* القائمة المنسدلة - تظهر فقط عند النقر على الزر */}
      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            {/* عرض قائمة المنصات المتاحة */}
            {data.map((platform) => (
              <li
                className={styles.item}
                key={platform.id}
                onClick={() => {
                  // تحديث المنصة المختارة وإغلاق القائمة
                  onSelectPlatform(platform);
                  setIsOpen(false);
                }}
              >
                {platform.slug}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;