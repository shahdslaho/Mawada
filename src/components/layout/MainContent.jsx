import { GameHeading } from "../Games/GameHeading";
import GameList from "../Games/GameList";
import PlatformSelector from "../Platform/PlatformSelector";
import SortSelector from "../SortSelector";
// استيراد سياق التطبيق
import { useApp } from "../../context/AppContext";


const MainContent = () => {
  // الحصول على بيانات الاستعلام ودالة التحديث
  const { gameQuery, updateGameQuery } = useApp();

  return (
    <div className="main-content p-4 lg:p-6">
      {/* عنوان يعرض التصنيف والمنصة المختارة */}
      <GameHeading
        selectGenre={gameQuery.genre}
        selectPlatform={gameQuery.platform}
      />

      {/* أدوات التصفية */}
      <div className="filter my-4 flex flex-col sm:flex-row gap-4">
        {/* اختيار المنصة */}
        <PlatformSelector
          onSelectPlatform={(platform) => updateGameQuery('platform', platform)}
          selectPlatform={gameQuery.platform}
        />
        {/* اختيار طريقة الترتيب */}
        <SortSelector
          onSelectSortOrder={(order) => updateGameQuery('sortOrder', order)}
          selectSortOrder={gameQuery.sortOrder}
        />
      </div>

      {/* عرض قائمة الألعاب بناءً على المعايير المحددة */}
      <div className="cover-card">
        <GameList
          selectPlatform={gameQuery.platform}
          selectGenre={gameQuery.genre}
          selectSortOrder={gameQuery.sortOrder}
          searchText={gameQuery.searchText}
        />
      </div>
    </div>
  );
};

export default MainContent;