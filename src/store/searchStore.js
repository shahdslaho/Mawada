// كون إدارة حالة البحث باستخدام Zustand
import { create } from "zustand";

// إنشاء مخزن مخصص للبحث
const useSearchStore = create((set) => ({
    // حالة نص البحث الحالي (فارغة افتراضيًا)
    searchText: "",
    
    // دالة لتحديث نص البحث
    // تستقبل النص الجديد وتحدث الحالة باستخدام دالة set
    setSearchText: (text) => set({ searchText: text }),
}));

export default useSearchStore;
