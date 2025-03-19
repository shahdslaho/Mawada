import axios from "axios";

// إنشاء نسخة مخصصة من axios مع إعدادات مسبقة
export default axios.create({
    // عنوان API الأساسي
    baseURL: "https://api.rawg.io/api",
    // المعلمات التي سترسل مع كل طلب
    params: {
        // مفتاح API للمصادقة (سيتم إرساله مع كل طلب)
        key: "342e3f8096ff48f6989ca19cf9070222",
    },
});
