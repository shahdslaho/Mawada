import React, { createContext, useContext, useState, useCallback } from 'react';

//انشاء مكون للادارة المركزية 
const AppContext = createContext();


export function AppProvider({ children }) {
  // حالة السمة (فاتح/داكن) مع استرجاع القيمة المخزنة محليًا
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // حالة استعلام الألعاب (للتصفية والبحث)
  const [gameQuery, setGameQuery] = useState({});
  // حالة فتح/إغلاق الشريط الجانبي
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // دالة لتبديل السمة بين الوضع الفاتح والداكن
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === "light" ? "dark" : "light";
      // تطبيق الفئة المناسبة على عنصر HTML الرئيسي
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      // حفظ الإعداد في التخزين المحلي
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  // دالة لفتح/إغلاق الشريط الجانبي
  const toggleSidebar = useCallback(() => 
    setIsSidebarOpen(prev => !prev), []);

  // دالة لتحديث معايير استعلام الألعاب
  const updateGameQuery = useCallback((key, value) => {
    setGameQuery(prev => ({ ...prev, [key]: value }));
  }, []);

  // القيم التي سيتم توفيرها للمكونات الفرعية
  const value = {
    theme,
    gameQuery,
    isSidebarOpen,
    toggleTheme,
    toggleSidebar,
    updateGameQuery
  };

  // توفير السياق للمكونات الفرعية
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}


export const useApp = () => useContext(AppContext);