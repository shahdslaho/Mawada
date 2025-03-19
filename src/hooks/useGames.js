import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

// مكون مخصص لجلب بيانات الألعاب مع دعم التصفية والبحث والترتيب
const useGames = (selectGenre, selectPlatform, selectSortOrder, searchText) => {
  return useInfiniteQuery({
    // مفتاح الاستعلام: يتغير عند تغيير أي من معايير التصفية
    queryKey: ["games", selectGenre?.id, selectPlatform?.id, selectSortOrder, searchText], 
  
    queryFn: ({ pageParam = 1 }) => 
      apiClient
        .get("/games", {
          params: {
            genres: selectGenre?.id,      
            platforms: selectPlatform?.id,   
            ordering: selectSortOrder,       
            search: searchText,              
            page: pageParam,                
          },
        })
        .then((res) => res.data),
    // تحديد رقم الصفحة التالية للتحميل
    getNextPageParam: (lastPage, allPages) => {
      // إذا كان هناك صفحة تالية، قم بزيادة رقم الصفحة
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    // وقت الصلاحية: 24 ساعة
    staleTime: 24 * 60 * 60 * 1000, 
  });
};

export default useGames;