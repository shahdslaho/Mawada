/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// استيراد أيقونات المنصات من مكتبات React Icons
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo, SiPanasonic } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";

// مكون لعرض أيقونات المنصات المدعومة للعبة
const PlatformIconList = ({ platforms }) => {
  // خريطة تربط اسم المنصة بالأيقونة المناسبة
  const iconMap = {
    pc: FaWindows,         // ويندوز
    playstation: FaPlaystation,  // بلايستيشن
    xbox: FaXbox,          // إكس بوكس
    nintendo: SiNintendo,   // نينتندو
    mac: FaApple,          // ماك
    linux: FaLinux,        // لينكس
    android: FaAndroid,    // أندرويد
    ios: MdPhoneIphone,    // آيفون
    web: BsGlobe,          // متصفح الويب
  };

  // إذا لم تكن هناك منصات، لا تعرض شيئًا
  if (!platforms) return null; 

  return (
    <>
      <div className="flex space-x-2 my-2">
        {/* عرض أيقونة لكل منصة مدعومة */}
        {platforms.map((platform) => {
          // الحصول على الأيقونة المناسبة من الخريطة
          const IconPlat = iconMap[platform.slug];
          // تخطي المنصات التي ليس لها أيقونة محددة
          if (!IconPlat) return null;
          // عرض الأيقونة
          return <IconPlat key={platform.id} className="w-6 h-6" />;
        })}
      </div>
    </>
  );
};

export default PlatformIconList;