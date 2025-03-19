// استيراد أنماط CSS الخاصة بالشريط الجانبي
import sidBar from "../../assets/styles/SideBar.module.css";

// مكون زر التصنيف الذي يستقبل بيانات التصنيف ودالة التحديد
const GenreButton = ({ genre, onSelectGenre }) => {
  return (
    <button
      type="button"
      // عند النقر على الزر، يتم استدعاء دالة تحديد التصنيف مع تمرير بيانات التصنيف
      onClick={() => onSelectGenre(genre)}
      // تطبيق نمط الزر من ملف CSS
      className={sidBar.button}
    >
      {/* صورة خلفية التصنيف */}
      <img
        src={genre.image_background}
        alt={genre.name}
        className={sidBar.img}
      />
      {/* اسم التصنيف */}
      <span className={sidBar.text}>
        {genre.name}
      </span>
    </button>
  );
};

// تصدير المكون لاستخدامه في أجزاء أخرى من التطبيق
export default GenreButton;
