import { FaSun, FaMoon } from "react-icons/fa";
import styles from "../../../src/assets/styles/ThemeToggle.module.css";
import useThemeStore from "../../store/themeStore"; // استدعاء Zustand store

const ThemeToggle = () => {
    const { theme, setTheme } = useThemeStore(); // جلب الثيم والدالة من Zustand

    return (
        <div className={styles.themeToggleContainer}>
            {/* الشمس */}
            <FaSun 
                className={`${styles.icon} ${theme === "light" ? styles.active : ""}`} 
                onClick={() => setTheme("light")}
            />
            
            {/* القمر */}
            <FaMoon 
                className={`${styles.icon} ${theme === "dark" ? styles.active : ""}`} 
                onClick={() => setTheme("dark")}
            />
        </div>
    );
};

export default ThemeToggle;
