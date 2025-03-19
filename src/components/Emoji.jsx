// استيراد صور الإيموجي المختلفة
import bullsEye from "../assets/images/bulls-eye.webp";
import meh from "../assets/images/meh.webp";
import thumbsUp from "../assets/images/thumbs-up.webp";

// مكون الإيموجي الذي يستقبل تقييم اللعبة كخاصية
export const Emoji = ({ rating }) => {
    // إذا كان التقييم أقل من 3، لا يتم عرض أي إيموجي
    if (rating < 3) return null;

    // خريطة تربط كل تقييم بالإيموجي المناسب له
    const emojiMap = {
        3: { src: meh, alt: "meh" },             // تقييم 3: إيموجي محايد
        4: { src: thumbsUp, alt: "thumbsUp" },   // تقييم 4: إيموجي إبهام لأعلى
        5: { src: bullsEye, alt: "bullsEye" },   // تقييم 5: إيموجي هدف (ممتاز)
    };

    // عرض الإيموجي المناسب للتقييم بحجم 25 بكسل
    return <img {...emojiMap[rating]} width={25} />;
};
