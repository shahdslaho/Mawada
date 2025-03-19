import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

// خطاف مخصص لجلب بيانات تصنيفات الألعاب
const useGenres = () => useQuery({
    // مفتاح الاستعلام: ثابت لأن بيانات التصنيفات لا تتغير كثيرًا
    queryKey:['genres'],
    
    queryFn:()=>apiClient.get("/genres").then(res=>res.data)
})

export default useGenres;
