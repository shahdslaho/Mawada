/* eslint-disable react/prop-types */
// استيراد الخطاف المخصص لجلب بيانات التصنيفات
import useGenres from "../../hooks/useGenres";
// استيراد مكون مؤشر التحميل
import LoadingSpinner from "../LoadingSpinner";
// استيراد مكون زر التصنيف
import GenreButton from "./GenreButton";
// استيراد أنماط CSS الخاصة بالشريط الجانبي
import sideBar from "../../../src/assets/styles/SideBar.module.css";

// مكون قائمة التصنيفات الذي يستقبل دالة تحديد التصنيف
const GenreList = ({ onSelectGenre }) => {
  // استخدام الخطاف لجلب بيانات التصنيفات وحالة التحميل
  const { data, isLoading } = useGenres();

  // إذا كانت البيانات قيد التحميل، يتم عرض مؤشر التحميل
  if (isLoading) return <LoadingSpinner />;

  // عرض قائمة التصنيفات
  return (
    <div className={`${sideBar.list} flex flex-wrap justify-center lg:flex-col lg:items-start p-4`}>
      {/* تكرار عرض أزرار التصنيفات لكل تصنيف في البيانات */}
      {data?.results?.map((genre) => (
        <GenreButton key={genre.id} genre={genre} onSelectGenre={onSelectGenre} />
      ))}
    </div>
  );
};

// تصدير المكون لاستخدامه في أجزاء أخرى من التطبيق
export default GenreList;
