/*Цей компонент відповідає за відображення модального вікна з детальною інформацією про вибраний фільм.

Компонент робить:
1.Відкриває вікно поверх усієї сторінки (через createPortal).
2.Показує великі зображення, опис, дату виходу та рейтинг фільму.
3.Закривається при натисканні:на хрестик у верхньому кутку,на фон (бекдроп) поза вікном,або при натисканні клавіші ESC.
4.Блокує прокручування сторінки, поки модалка відкрита.
5.Очищає (знімає слухачі подій, повертає прокрутку) при закритті.*/

import css from "./MovieModal.module.css"; //імпортую CSS-модуль зі стилями для модального вікна.
import { createPortal } from "react-dom"; //імпорт для того, щоб модалка була зверху над іншим контентом
import { useEffect } from "react"; //React хук useEffect
import type { Movie } from "../../types/movie"; //імпортую типи данних Movie для визначення структури пропса movie.

interface MovieModalProps {
  movie: Movie | null; // Обраний фільм або null (якщо нічого не вибрано)
  onClose: () => void; // Функція для закриття модального вікна
}
//Функціональний компонент
export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Викликаю useEffect  він запускається після першого рендеру.І далі виконується кожного разу після зміни  одноі із залежностей.
  useEffect(() => {
    if (!movie) return; // Якщо фільм відсутній, нічого не повертається
    console.log(" Модалка відкрита. Додається  слухач та блокуємо скрол.");

    // Обробник натискання ESC
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log(" Натиснуто Escape. Закривається  модалка.");
        onClose(); // викликаю функцію закриття
      }
    };
    //слухач подіі на ESC
    document.addEventListener("keydown", handleEsc);

    // Блокую прокрутку сторінки
    document.body.style.overflow = "hidden";

    // Очищення всього при закритті модалки
    return () => {
      console.log(
        "Модалка закрита. Видаляється слухач та відновлюється скрол."
      );

      // це команда, яка видаляє обробник події ESC
      document.removeEventListener("keydown", handleEsc);
      // Відновлюю прокрутку сторінки
      document.body.style.overflow = "";
    };
  }, [
    movie,
    onClose,
  ]); /* Тут прописав дві залежності:movie —потрібно, щоб ефект реагував на відкриття/закриття модалки.
  onClose —  викликаю цю функцію всередині ефекту і її потрібно прописати, щоб useEffect коректно реагував*/

  // Якщо фільму немає —рендер не відбуваеться
  if (!movie) {
    return null;
  }

  // Рендер модального вікна через портал
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog" //забезпечують доступність
      aria-modal="true" //забезпечують доступність
      onClick={(e) => {
        // Закриваю модалку при кліку на бекдроп,хрестику
        if (e.target === e.currentTarget) {
          console.log(" Клік по бекдропу. Закривається модалка.");
          onClose();
        }
      }}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={() => {
            console.log("Клік по хрестику. Закривається модалка.");
            onClose();
          }}
          aria-label="Close modal"
        >
          &times;
        </button>
        {/* Рендер <img> лише, якщо є backdrop_path */}
        {movie.backdrop_path && (
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            loading="lazy"
          />
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body // Портал вміщує модалку безпосередньо в body документа
  );
}
