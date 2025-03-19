import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

// استيراد مكون التطبيق الرئيسي
import App from "./App.jsx";
// استيراد مكونات React Query لإدارة حالة البيانات
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// إنشاء عميل استعلام جديد
const query = new QueryClient();

// تهيئة جذر React وتقديم التطبيق
createRoot(document.getElementById("root")).render(
    // تفعيل الوضع الصارم لكشف المشاكل المحتملة أثناء التطوير
    <StrictMode>
       {/* توفير عميل الاستعلام لجميع مكونات التطبيق */}
       <QueryClientProvider client={query}>
        {/* مكون التطبيق الرئيسي */}
        <App />
       </QueryClientProvider>
    </StrictMode>
);
