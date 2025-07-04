/*
  Компонент MovieGrid відповідає за відображення сітки фільмів.
  Призначення:
  - Відображає список фільмів у вигляді карточок.
  - Кожна карточка містить зображення і назву фільму.
  - Дозволяє вибрати фільм кліком миші.

 */

import css from "./MovieGrid.module.css"; // Імпорт стилів із CSS-модуля
import type { Movie } from "../../types/movie"; // Імпорт типу для об'єкта Movie

// Типізація пропсів компонента MovieGrid
interface MovieGridProps {
  movies: Movie[]; // Масив фільмів для відображення
  onSelect: (movie: Movie) => void; // Функція для обробки вибору фільму
}
// Компонент для відображення сітки фільмів
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  // Якщо масив фільмів пустий —  рендера немає
  if (movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {/* Перебираю масив фільмів і роблю рендер для кожного елемент списку */}
      {movies.map((movie) => (
        <li key={movie.id}>
          {/* Картка фільму з обробкою кліку */}
          <div
            className={css.card}
            onClick={() => onSelect(movie)} // Вибір фільму по кліку миші
          >
            <img
              className={css.image}
              // Якщо є постер — підставляємо правильний URL
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy" //відкладене завантаження зображень,тобто відкриеться коли потрібно
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
