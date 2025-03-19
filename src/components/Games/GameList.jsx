// استيراد المكتبات والمكونات اللازمة
import { useInView } from "react-intersection-observer"; // مكتبة لاكتشاف متى يصبح العنصر مرئيًا في نافذة العرض
import React, { useEffect } from "react"; 
import useGames from "../../hooks/useGames"; // خطاف مخصص لجلب بيانات الألعاب
import GameCard from "./GameCard"; // مكون بطاقة اللعبة
import GameCardSkeleton from "./GameCardSkeleton"; // مكون هيكل تحميل بطاقة اللعبة
import styles from "../../../src/assets/styles/gameList.module.css"; // أنماط CSS
import useSearchStore from "../../store/searchStore"; // مخزن للبحث

// مكون قائمة الألعاب الذي يستقبل التصنيف والمنصة وترتيب الفرز المحدد
const GameList = ({
  selectGenre,
  selectPlatform,
  selectSortOrder,
}) => {
  // استخدام خطاف useInView لاكتشاف متى يصبح عنصر التحميل مرئيًا
  const { ref, inView } = useInView();
  // الحصول على نص البحث من مخزن البحث
  const { searchText } = useSearchStore();

  // استخدام خطاف useGames لجلب بيانات الألعاب مع المرشحات المحددة
  const {
    data, // بيانات الألعاب
    error, // خطأ إن وجد
    isLoading, // حالة التحميل
    fetchNextPage, // وظيفة لجلب الصفحة التالية
    hasNextPage, // هل توجد صفحة تالية
    isFetchingNextPage, // هل يتم جلب الصفحة التالية حاليًا
  } = useGames(selectGenre, selectPlatform, selectSortOrder, searchText);

  // مصفوفة لعرض هياكل التحميل
  const skeletons = [1, 2, 3, 4, 5, 6];

  // تأثير جانبي لجلب الصفحة التالية عندما يصبح عنصر التحميل مرئيًا
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // عرض رسالة خطأ إذا حدث خطأ أثناء جلب البيانات
  if (error)
    return (
      <div className={styles.errorMessage} role="alert">
        <span className="font-medium">There was an error!</span> {error.message}
      </div>
    );

  // واجهة المستخدم الرئيسية لقائمة الألعاب
  return (
    <div className={styles.gameListContainer}>
      <div className={styles.gameList}>
        {/* عرض هياكل التحميل أثناء جلب البيانات الأولية */}
        {isLoading &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}

        {/* عرض الألعاب من جميع الصفحات التي تم جلبها */}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* عنصر التحميل للتمرير اللانهائي */}
      <div ref={ref} className={styles.loadMoreTrigger}>
        {isFetchingNextPage && <div className={styles.loadingIndicator}>Loading more games...</div>}
      </div>
    </div>
  );
};

export default GameList;
