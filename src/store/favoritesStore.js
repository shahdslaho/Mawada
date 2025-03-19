// استيراد دالة create من مكتبة Zustand لإنشاء مخزن الحالة
import { create } from "zustand";
// استيراد middleware persist للحفاظ على البيانات في التخزين المحلي
import { persist } from "zustand/middleware";

// إنشاء مخزن للألعاب المفضلة باستخدام Zustand
const useFavoritesStore = create(
  // استخدام middleware persist لتخزين المفضلات في localStorage
  persist(
    // تعريف حالة المخزن والوظائف التي تعدلها
    (set, get) => ({
      // مصفوفة تخزن الألعاب المفضلة (فارغة في البداية)
      favorites: [],
      
      // دالة لإضافة لعبة إلى المفضلات
      addFavorite: (game) => 
        set((state) => ({
          // إضافة اللعبة الجديدة إلى نهاية المصفوفة مع الاحتفاظ بالألعاب السابقة
          favorites: [...state.favorites, game]
        })),
      
      // دالة لإزالة لعبة من المفضلات باستخدام معرف اللعبة
      removeFavorite: (gameId) => 
        set((state) => ({
          // تصفية المصفوفة لإزالة اللعبة التي تطابق المعرف
          favorites: state.favorites.filter(game => game.id !== gameId)
        })),
      
      // دالة للتحقق مما إذا كانت لعبة موجودة في المفضلات - تصحيح التنفيذ
      isFavorite: (gameId) => get().favorites.some(game => game.id === gameId)
    }),
    {
      // اسم المفتاح المستخدم لتخزين البيانات في localStorage
      name: "game-favorites",
    }
  )
);

// تصدير المخزن لاستخدامه في المكونات الأخرى
export default useFavoritesStore;