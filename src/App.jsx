import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MainContent from "./components/layout/MainContent";
import GameDetails from "./components/Games/GameDetails";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AppProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// إنشاء عميل استعلام جديد لـ React Query
const queryClient = new QueryClient();

// مكون التخطيط الذي يحتوي على العناصر المشتركة بين جميع الصفحات
function Layout() {
  return (
    <>
      {/* شريط التنقل العلوي - يظهر في جميع الصفحات */}
      <NavBar />
      <div className="main-container">
        {/* الشريط الجانبي للتصفية - يظهر في جميع الصفحات */}
        <SideBar />
        {/* مكان عرض المحتوى المتغير حسب المسار */}
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    // مزود React Query لإدارة طلبات البيانات والتخزين المؤقت
    <QueryClientProvider client={queryClient}>
      {/* مكون التوجيه الرئيسي */}
      <BrowserRouter>
        {/* مزود سياق التطبيق للسمة وحالة الاستعلام */}
        <AppProvider>
          {/* مزود سياق المفضلة لإدارة الألعاب المفضلة */}
          <FavoritesProvider>
            {/* تعريف مسارات التطبيق مع التخطيط المتداخل */}
            <Routes>
              {/* مسار التخطيط الرئيسي الذي يحتوي على العناصر المشتركة */}
              <Route path="/" element={<Layout />}>
                {/* الصفحة الرئيسية - تُعرض عند المسار / */}
                <Route index element={<MainContent />} />
                {/* صفحة تفاصيل اللعبة - تُعرض عند المسار /game/:id */}
                <Route path="game/:id" element={<GameDetails />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;