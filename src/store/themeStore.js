import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",  // قراءة الثيم من localStorage أو تعيينه إلى "light" بشكل افتراضي
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);  // حفظ الثيم في localStorage
    set({ theme });  // تحديث الحالة
    document.documentElement.setAttribute("data-theme", theme);  // تغيير السمة في الـ HTML
  },
}));

export default useThemeStore;
