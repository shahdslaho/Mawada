// مكون هيكل تحميل بطاقة اللعبة
const GameCardSkeleton = () => {
    return (
        // حاوية البطاقة الرئيسية مع تنسيقات للوضعين الفاتح والداكن
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/* منطقة صورة اللعبة (مستطيل رمادي نابض) */}
            <div className="rounded-t-lg bg-gray-300 w-full h-60 animate-pulse"></div>
            
            {/* منطقة تفاصيل اللعبة */}
            <div className="p-5">
                {/* هيكل عنوان اللعبة (شريط رمادي نابض) */}
                <div className="h-6 bg-gray-300 rounded-md mb-4 w-3/4 animate-pulse"></div>
                
                {/* الصف السفلي الذي يحتوي على أيقونات المنصات والتقييم */}
                <div className="flex justify-between items-center">
                    {/* هياكل أيقونات المنصات (ثلاث دوائر رمادية نابضة) */}
                    <div className="flex space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* هيكل تقييم اللعبة (مستطيل رمادي نابض) */}
                    <div className="w-10 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default GameCardSkeleton;
