// استيراد صورة بديلة لاستخدامها عندما لا تتوفر صورة
import noImage from "../assets/images/image-placeholder.jpeg";

// دالة لتعديل رابط الصورة للحصول على نسخة مقصوصة بأبعاد محددة
const getCroppedImageUrl = (url) => {
    // إذا كان الرابط غير موجود، إرجاع الصورة البديلة
    if (!url) return noImage;

    // تحديد موقع كلمة "media/" في الرابط
    const target = "media/";
    const index = url.indexOf(target) + target.length;

    // إدراج معلمات القص في الرابط (عرض 600 وارتفاع 400)
    return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
