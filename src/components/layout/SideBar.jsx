// استيراد المكتبات والمكونات اللازمة
import React from "react";
import GenreList from "../Genres/GenreList";
// تحديث مسار الاستيراد ليطابق اسم الملف الفعلي
import styles from "../../assets/styles/SideBar.module.css";
import { useApp } from "../../context/AppContext";

// مكون الشريط الجانبي
const SideBar = () => {
  // استخراج حالة الشريط الجانبي ودوال التحكم من سياق التطبيق
  const { isSidebarOpen, toggleSidebar, updateGameQuery } = useApp();

  return (
    <>
      {/* زر فتح القائمة - يظهر فقط عندما يكون الشريط الجانبي مغلقًا */}
      {!isSidebarOpen && (
        <button className={styles.menuButton} onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* الشريط الجانبي مع تطبيق فئة CSS للفتح/الإغلاق */}
      <div className={`${styles.sidebarApp} ${isSidebarOpen ? styles.open : ""}`}>
        {/* زر إغلاق الشريط الجانبي */}
        <button className={styles.closeBtn} onClick={toggleSidebar}>✖</button>
        {/* قائمة التصنيفات مع تمرير دالة معالجة اختيار التصنيف */}
        <GenreList
          onSelectGenre={(genre) => {
            updateGameQuery('genre', genre);
            toggleSidebar();
          }}
        />
      </div>
    </>
  );
};

export default SideBar;