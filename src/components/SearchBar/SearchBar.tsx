import { toast } from "react-hot-toast"; // Імпортую бібліотеку для сповіщень
import styles from "./SearchBar.module.css"; // Імпортую стилі з CSS-модуля

// Типізація пропсів для компонента
interface SearchBarProps {
  onSubmit: (query: string) => void; // Пропс-функція, яка викликається при сабміті форми
}

// Компонент SearchForm — це форма пошуку
export default function SearchBar({ onSubmit }: SearchBarProps) {
  // Функція, яка буде викликатись при сабміті форми (Form Actions у React)
  const handleSubmit = (formData: FormData) => {
    // Отримую значення поля input з назвою "query"
    const query = formData.get("query")?.toString().trim();

    // Якщо поле порожнє — показуємо повідомлення
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    // Викликаю функцію з App, передаємо введене значення
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
          Powered by TMDB{" "}
        </a>
        {/* Форма пошуку з дією обробки сабміту */}
        <form action={handleSubmit} className={styles.form}>
          {" "}
          <input
            className={styles.input}
            type="text"
            name="query" // Обовʼязково має відповідати імені, яке шукаємо в formData
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />{" "}
          <button className={styles.button} type="submit">
            Search{" "}
          </button>{" "}
        </form>{" "}
      </div>
    </header>
  );
}
