// استيراد المكتبات والمكونات اللازمة
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from "./Logo";

import LogoImage from "../../assets/images/logo.webp";
import SearchInput from "./SearchInput";
import ThemeToggle from "../Theme/ThemeToggle";
import navBarStyles from "../../assets/styles/NaveBar.module.css";
import { FavoritesContext } from "../../context/FavoritesContext";
import { useApp } from "../../context/AppContext";
import getCroppedImageUrl from "../../services/image-url";

const NavBar = () => {
  // إعداد التنقل بين الصفحات
  const navigate = useNavigate();
  // الحصول على قائمة المفضلة من السياق
  const { favorites, clearFavorites } = useContext(FavoritesContext);
  // الحصول على بيانات السمة وتحديث الاستعلام
  const { theme, toggleTheme, updateGameQuery } = useApp();
  // حالة إظهار قائمة المفضلة
  const [showFavorites, setShowFavorites] = useState(false);

  // تبديل عرض نافذة المفضلة
  const toggleFavoritesPopup = () => {
    setShowFavorites(!showFavorites);
  };

  // حذف جميع الألعاب المفضلة
  const handleClearFavorites = () => {
    clearFavorites();
    setShowFavorites(false);
  };

  // الانتقال إلى صفحة تفاصيل اللعبة
  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
    setShowFavorites(false);
  };

  return (
    <div className={navBarStyles.navbar}>
      {/* قسم الشعار */}
      <div className={navBarStyles.logoSection}>
        <Logo image={LogoImage} text="Game App Header" className="logo-header" />
      </div>

      {/* قسم البحث وزر المفضلة */}
      <div className={navBarStyles.searchSection}>
        <SearchInput onSearch={(text) => updateGameQuery('searchText', text)} />
        <button onClick={toggleFavoritesPopup} className={navBarStyles.favoriteButton}>
          ❤️
        </button>
      </div>

      {/* نافذة المفضلة - تظهر فقط عند النقر */}
      {showFavorites && (
        <div className={navBarStyles.favoritesPopup}>
          <h3>Favorites</h3>
          {favorites.length > 0 ? (
            <>
              {/* عرض قائمة الألعاب المفضلة */}
              {favorites.map((game) => (
                <div 
                  key={game.id} 
                  className={navBarStyles.favoriteItem}
                  onClick={() => handleGameClick(game.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={getCroppedImageUrl(game.background_image)}
                    alt={game.name}
                    className={navBarStyles.favoriteImage}
                  />
                  <p>{game.name}</p>
                </div>
              ))}
              {/* زر حذف كل المفضلة */}
              <button 
                onClick={handleClearFavorites} 
                className={navBarStyles.clearButton}
              >
                حذف الكل
              </button>
            </>
          ) : (
            <p>There are no favorite games yet</p>
          )}
        </div>
      )}

      {/* زر تبديل السمة */}
      <div className={navBarStyles.themeToggle}>
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      </div>
    </div>
  );
};

export default NavBar;