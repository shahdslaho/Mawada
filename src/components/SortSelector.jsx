// استيراد useState من React ونمط CSS من ملف PlatformSelector
import { useState } from "react";
import styles from "../../src/assets/styles/PlatformSelector.module.css";

// مكون محدد الترتيب الذي يستقبل وظيفة لتحديد ترتيب الفرز والترتيب المحدد حالياً
const SortSelector = ({ onSelectSortOrder, selectSortOrder }) => {
    // حالة لتتبع ما إذا كانت القائمة المنسدلة مفتوحة أم لا
    const [isOpen, setIsOpen] = useState(false);

    // قائمة بخيارات الترتيب المتاحة مع قيمها وتسمياتها
    const sortOrders = [
        { value: "", label: "Relevance" },              // الصلة (افتراضي)
        { value: "-added", label: "Date added" },       // تاريخ الإضافة
        { value: "name", label: "Name" },               // الاسم
        { value: "-release", label: "Release date" },   // تاريخ الإصدار
        { value: "-metacritic", label: "Popularity" },  // الشعبية
        { value: "-rating", label: "Average rating" },  // متوسط التقييم
    ];

    // البحث عن تسمية الترتيب المحدد حالياً، أو استخدام "Relevance" كقيمة افتراضية
    const selectedSortLabel = sortOrders.find((order) => order.value === selectSortOrder)?.label || "Relevance";

    return (
        <>
        <div className={styles.container}>
            {/* زر لفتح/إغلاق القائمة المنسدلة */}
            <button
                id="sortDropdownButton"
                onClick={() => setIsOpen(!isOpen)}
                className={styles.button}
                type="button"
            >
                Order by: {selectedSortLabel}
                {/* أيقونة السهم لأسفل */}
                <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            
            {/* عرض القائمة المنسدلة فقط عندما تكون مفتوحة */}
            {isOpen && (
                <div id="sortDropdown" className={styles.dropdown}>
                    <ul aria-labelledby="sortDropdownButton">
                        {/* عرض جميع خيارات الترتيب */}
                        {sortOrders.map((order) => (
                            <li
                                className={styles.item}
                                key={order.value}
                                onClick={() => {
                                    // عند النقر، تطبيق الترتيب المحدد وإغلاق القائمة
                                    onSelectSortOrder(order.value);
                                    setIsOpen(false);
                                }}
                            >
                                {order.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </>
    );
};

export default SortSelector;