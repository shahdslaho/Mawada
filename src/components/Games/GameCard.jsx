import React, { useContext } from "react";
import { Link } from "react-router-dom"; 
import getCroppedImageUrl from "../../services/image-url";
import CriticScore from "../CriticScore";
import { Emoji } from "../Emoji";
import PlatformIconList from "../Platform/PlatformIconList";
import { FavoritesContext } from "../../context/FavoritesContext"; 
import styles from "../../../src/assets/styles/gameCard.module.css";

// مكون بطاقة اللعبة الذي يستقبل بيانات اللعبة كخاصية
const GameCard = ({ game }) => {

  // استخدام سياق المفضلات للوصول إلى قائمة الألعاب المفضلة ووظائف الإضافة والإزالة
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  
  // التحقق مما إذا كانت اللعبة الحالية في قائمة المفضلة
  const isFavorite = favorites.some((fav) => fav.id === game.id);

  // وظيفة لتبديل حالة المفضلة (إضافة/إزالة)
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game);
    }
  };

  // واجهة المستخدم لبطاقة اللعبة
  return (
    <div className={styles.card}>


      {/* رابط إلى صفحة تفاصيل اللعبة */}
      <Link to={`/game/${game.id}`} className="block">
        <img
          className={styles.image}
          src={getCroppedImageUrl(game.background_image)}
          alt={game.name}
        />
      </Link>
      <div className={styles.details}>
        <div className={styles.top}>


          {/* قائمة أيقونات المنصات التي تدعم اللعبة */}
          <div className={styles.platform}>
            <PlatformIconList platforms={game.parent_platforms.map((p) => p.platform)} />
          </div>


          {/* درجة تقييم النقاد للعبة */}
          <div className={styles.score}>
            <CriticScore score={game.metacritic} />
          </div>
        </div>


        {/* رابط إلى صفحة تفاصيل اللعبة مع اسم اللعبة وإيموجي التقييم */}
        <Link to={`/game/${game.id}`} className={styles.title}>
          <h5>
            {game.name} <Emoji rating={game.rating_top} />
          </h5>
        </Link>

      
        {/* زر لإضافة أو إزالة اللعبة من المفضلة */}
        <button onClick={toggleFavorite} className={styles.favoriteButton}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default GameCard;
