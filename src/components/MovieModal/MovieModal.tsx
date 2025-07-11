import css from "./MovieModal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    if (!movie) return;
    console.log(" Модалка відкрита. Додається  слухач та блокуємо скрол.");

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log(" Натиснуто Escape. Закривається  модалка.");
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";

    return () => {
      console.log(
        "Модалка закрита. Видаляється слухач та відновлюється скрол."
      );

      document.removeEventListener("keydown", handleEsc);

      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie) {
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
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
    document.body
  );
}
