
// استيراد أنماط CSS الخاصة بعنوان الألعاب
import styles from "../../assets/styles/gameHeading.module.css"

// مكون عنوان الألعاب الذي يستقبل التصنيف والمنصة المحددة
export const GameHeading = ({ selectGenre, selectPlatform }) => {
    // إنشاء نص العنوان الرئيسي بناءً على التصنيف والمنصة المحددة
    const mainText = `${selectGenre?.name || ""} ${selectPlatform?.name || ""}`;
    
    return (
        <div className={styles.headingContainer}>
            <h1 className={styles.gradientText}>
                {/* عرض التصنيف والمنصة المحددة */}
                {mainText}
                <span className={styles.gamesText}>
                    {/* إضافة كلمة "Games" بعد النص الرئيسي */}
                    {" Games"}
                    {/* عنصر التحميل الرسومي (دوائر متحركة) */}
                    <div className={styles.loader}>
                        <svg viewBox="0 0 128 128">
                            {/* تعريف التدرجات اللونية للدوائر */}
                            <defs>
                                <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#050040"/>
                                    <stop offset="100%" stopColor="#83007e"/>
                                </linearGradient>
                                <linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#050040"/>
                                    <stop offset="100%" stopColor="#83007e"/>
                                </linearGradient>
                                <linearGradient id="d" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#050040"/>
                                    <stop offset="100%" stopColor="#83007e"/>
                                </linearGradient>
                            </defs>
                            {/* الدائرة الخارجية */}
                            <circle className={`${styles.spin} ${styles['gradient-b']}`} cx="64" cy="64" r="60" fill="none" stroke="url(#b)" strokeWidth="16"/>
                            {/* الدائرة الوسطى */}
                            <circle className={`${styles.spin} ${styles['gradient-c']}`} cx="64" cy="64" r="48" fill="none" stroke="url(#c)" strokeWidth="16"/>
                            {/* الدائرة الداخلية */}
                            <circle className={`${styles.spin} ${styles['gradient-d']}`} cx="64" cy="64" r="36" fill="none" stroke="url(#d)" strokeWidth="16"/>
                        </svg>
                    </div>
                </span>
            </h1>
        </div>
    );
};
