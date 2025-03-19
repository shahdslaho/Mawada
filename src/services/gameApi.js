
// استيراد عميل API المخصص
import apiClient from './api-client'; 

// دالة جلب تفاصيل اللعبة باستخدام axios
const fetchGameDetails = async (gameId) => {
  try {
    // إرسال طلب GET لجلب بيانات اللعبة باستخدام معرف اللعبة
    const response = await apiClient.get(`/games/${gameId}`);
    return response.data;  
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw new Error("فشل في جلب تفاصيل اللعبة: " + error.message);
  }
};

// دالة جلب لقطات الشاشة للعبة
const fetchGameScreenshots = async (gameId) => {
  try {
    const response = await apiClient.get(`/games/${gameId}/screenshots`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching game screenshots:", error);
    throw new Error("فشل في جلب لقطات الشاشة: " + error.message);
  }
};

// دالة جلب الألعاب المشابهة
const fetchSimilarGames = async (gameId) => {
  try {
    const response = await apiClient.get(`/games/${gameId}/game-series`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching similar games:", error);
    throw new Error("فشل في جلب الألعاب المشابهة: " + error.message);
  }
};

export { fetchGameDetails, fetchGameScreenshots, fetchSimilarGames };
