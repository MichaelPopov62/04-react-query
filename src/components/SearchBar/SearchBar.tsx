/*
  Компонент SearchBar — це форма для пошуку фільмів.
  Призначення:
  - Приймає текстовий запит від користувача
  - Перевіряє, що поле не пусте
 - Викликає зовнішню функцію onSubmit для передачі запиту в батьківський компонент
 - Показує помилки через toast, якщо поле порожнє
 */

import { toast } from "react-hot-toast"; // Імпортую бібліотеку для сповіщень
import styles from "./SearchBar.module.css"; // Імпортую стилі з CSS-модуля

// Типізація пропсів
interface SearchBarProps {
  onSubmit: (query: string) => void; // Пропс-функція, яка викликається при сабміті форми
}

// Компонент пошуковоі форми
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    // Отримую значення поля input з назвою "query",приводжу до значеня string і обрізаю пробіли
    const query = (formData.get("query") as string)?.trim();

    // Якщо поле порожнє — виводжу повідомлення
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    // Викликаю функцію з App, передаю введене значення
    onSubmit(query);
  };
  // JSX-розмітка — структура форми
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Посилання на сайт TMDB */}
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        {/* Форма пошуку з дією обробки сабміту */}
        <form action={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
