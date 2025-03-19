// استيراد المكتبات اللازمة
import { useRef } from "react";
import useSearchStore from "../../store/searchStore"; 
import styles from "../../../src/assets/styles/SearchInput.module.css";

const SearchInput = () => {
    // استخراج دالة تحديث نص البحث
    const { setSearchText } = useSearchStore(); 
    // إنشاء مرجع لحقل الإدخال
    const ref = useRef(null);

    return (
        <form
            className={styles.searchForm}
            onSubmit={(event) => {
                // منع إعادة تحميل الصفحة
                event.preventDefault();
                // تحديث نص البحث
                if (ref.current) setSearchText(ref.current.value); 
            }}
        >
            {/* تسمية حقل البحث (مخفية) */}
            <label htmlFor="default-search" className="sr-only">
                Search
            </label>
            <div className={styles.searchContainer}>
                {/* أيقونة البحث */}
                <div className={styles.searchIcon}>
                    <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                {/* حقل إدخال البحث */}
                <input
                    ref={ref}
                    type="search"
                    id="default-search"
                    className={styles.searchInput}
                    placeholder="Search ..."
                    required
                />
            </div>
        </form>
    );
};

export default SearchInput;
