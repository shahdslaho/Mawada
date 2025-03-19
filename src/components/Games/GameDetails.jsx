// استيراد المكتبات والمكونات اللازمة
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameDetails } from "../../services/gameApi";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function GameDetails() {
  // استخراج معرف اللعبة من عنوان URL
  const { id } = useParams();  
  // وظيفة للتنقل بين الصفحات
  const navigate = useNavigate();
  // حالة لتتبع ما إذا كان وصف اللعبة موسعًا أم لا
  const [isExpanded, setIsExpanded] = useState(false);

  // استخدام React Query لجلب بيانات اللعبة
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["gameDetails", id],  
    queryFn: () => fetchGameDetails(id),  
    enabled: !!id,  
  });

  // عرض مؤشر تحميل أثناء جلب البيانات
  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-purple-600 border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  // عرض رسالة خطأ إذا فشل جلب البيانات
  if (isError) return <div>Error loading game details: {error.message}</div>;

  // واجهة المستخدم الرئيسية لصفحة تفاصيل اللعبة
  return (
    <div className="bg-gradient-to-r from-[#050040] to-[#83007e] opacity-95 rounded-xl shadow-2xl mx-auto my-[120px] max-w-[1200px] w-[92%] p-10">
      {/* زر العودة إلى الصفحة الرئيسية */}
      <button 
        onClick={() => navigate('/')} 
        className="group relative flex items-center gap-3 bg-gradient-to-r from-[#720065] to-[#6d0099] text-white px-5 py-2 rounded-lg mb-8 border-2 border-[#720065] text-sm hover:bg-transparent hover:shadow-[0_0_25px_rgba(109,0,153,0.5)] transition-all duration-300"
      >
        <svg className="w-3 h-3 absolute left-3 transition-all duration-1000 group-hover:left-[-20px]" viewBox="0 0 784.11 815.53">
          <path className="fill-white" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"/>
        </svg>
        <span className="ml-4">Back to Games</span>
      </button>

      {/* عرض تفاصيل اللعبة عند توفر البيانات */}
      {data && (
        <div className="flex flex-col md:flex-row gap-10">
          {/* القسم الأيسر - صورة اللعبة والمنصات والمعلومات الأساسية */}
          <div className="w-full md:w-2/5 flex flex-col items-center space-y-6">
            {/* صورة اللعبة */}
            <img 
              src={data.background_image} 
              alt={data.name}
              className="w-full max-w-[450px] h-[320px] object-cover rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
            />
            {/* قائمة المنصات التي تدعم اللعبة */}
            <div className="w-full max-w-[450px] mt-4 text-center">
              <div className="flex flex-wrap gap-3 justify-center">
                {data.platforms?.map(p => (
                  <span 
                    key={p.platform.id} 
                    className="bg-gradient-to-r from-[rgba(114,0,101,0.6)] to-[rgba(109,0,153,0.6)] px-3 py-1.5 rounded-full text-sm border border-white/15 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm text-white/90 hover:text-white shadow-lg"
                  >
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>
            {/* معلومات إضافية (تاريخ الإصدار والتقييم) */}
            <div className="flex gap-6 w-full max-w-[450px] bg-white/10 p-4 rounded-2xl justify-center backdrop-blur-sm">
              <div className="flex items-center gap-3 text-white text-sm pr-6 border-r border-white/20">
                <p className="font-medium">{data.released}</p>
              </div>
              <div className="flex items-center gap-3 text-white text-sm">
                <p className="font-medium">{data.rating}/5</p>
              </div>
            </div>
          </div>
          
          {/* القسم الأيمن - اسم اللعبة ووصفها */}
          <div className="w-full md:w-3/5 md:pl-10">
            {/* اسم اللعبة */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{data.name}</h1>
            <div>
              {/* وصف اللعبة مع إمكانية توسيعه على الشاشات الصغيرة */}
              <p className={`text-white/90 leading-relaxed text-lg ${!isExpanded ? 'max-h-[150px] overflow-hidden' : ''} transition-all duration-300 md:max-h-none md:overflow-visible`}>
                {data.description_raw}
              </p>
              {/* زر "اقرأ المزيد" لتوسيع الوصف على الشاشات الصغيرة */}
              <button 
                className={`flex items-center gap-2 bg-gradient-to-r from-[#720065] to-[#6d0099] text-white px-5 py-2.5 rounded-lg mt-6 md:hidden ${isExpanded ? 'hidden' : ''} hover:shadow-lg transition-all duration-300`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                {isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameDetails;