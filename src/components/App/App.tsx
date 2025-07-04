/*головний компонент додатку для пошуку і перегляду фільмів.
1.Забезпечує пошук фільмів за ключовим словом через API.
2.Відображає індикатор завантаження під час очікування відповіді сервера.
3.Відображає список знайдених фільмів у вигляді сітки.
4.Показує повідомлення про помилки або відсутність результатів.
5.Дозволяє вибрати фільм для перегляду.
6.Керує відкриттям і закриттям модального вікна.
7.Показує короткі повідомлення про статус операцій.*/

import { useState } from "react"; // useState — хук React для створення стану всередині функціонального компонента.

import SearchBar from "../SearchBar/SearchBar"; // Компонент пошукового рядка, який відправляє пошуковий запит.

import { toast } from "react-hot-toast"; // Бібліотека для показу коротких сповіщень користувачу.

import type { Movie } from "../../types/movie"; // Тип даних для фільму.

import { fetchMovies } from "../../services/movieService"; // Функція, що виконує запит до API для отримання фільмів за пошуковим запитом.

import MovieGrid from "../MovieGrid/MovieGrid"; // Компонент, що відображає сітку фільмів.

import { Toaster } from "react-hot-toast"; //Компонент для відображення повідомлень

import Loader from "../Loader/Loader"; // Компонент індикатора завантаження.

import ErrorMessage from "../ErrorMessage/ErrorMessage"; // Компонент відображення помилки.

import MovieModal from "../MovieModal/MovieModal"; // Компонент модального вікна з деталями про фільм.

export default function App() {
  const [searchQuery, setSearchQuery] = useState(""); // Стан пошукового запиту
  const [movies, setMovies] = useState<Movie[]>([]); // Стан списку фільмів, що відповідають пошуковому запиту
  const [isLoading, setIsLoading] = useState(false); // Стан завантаження — показує індикатор, поки дані завантажуються
  const [hasError, setHasError] = useState(false); // Стан помилки — true, якщо сталася помилка під час запиту
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // Стан обраного фільму для показу у модальному вікні

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms)); //Створив сам допоміжну функцію, що створює затримку (мілісекунди)

  // Функція обробки відправлення пошукового запиту з компонента SearchBar
  const handleSearchSubmit = async (query: string) => {
    // Якщо рядок запиту пустий після видалення пробілів — виводиться помилка і припиняється запит
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }
    setSearchQuery(query); // Зберігаю поточний пошуковий запит у стан
    setIsLoading(true); // Починаю показ індикатора завантаження
    setHasError(false); // Скидаю стан помилки перед новим запитом
    setMovies([]); // Роблю очищення від попередніх результатів до нового запиту
    console.log("Список фільмів очищено перед новим пошуком");

    try {
      // Одночасно виконую запит на сервер і штучну затримку (щоб показати лоадер 1.5 сек)
      const [response] = await Promise.all([
        fetchMovies({ query }),
        delay(1500),
      ]);
      // Якщо результатів немає, виводжу помилку і очищую список
      if (!response.results || response.results.length === 0) {
        toast.error("No movies found for your request.");
        setMovies([]);
        return;
      }
      setMovies(
        response.results
      ); /* Інакше оновлюється список фільмів отриманих  за результатом пошуку*/
    } catch (error) {
      // Якщо сталася помилка під час запиту —  показується повідомлення
      console.error("Error fetching movies:", error);
      toast.error("Error fetching movies");
      setHasError(true);
      setMovies([]);
    } finally {
      setIsLoading(false); // Завершую показ індикатора завантаження завжди
    }
  };

  //  вибирається фільм і відкривається модалка
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Закриття модалки
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };
  // Якщо є помилка і не йде завантаження — виводиться компонент помилки, решта коду не рендериться

  if (!isLoading && hasError) {
    return <ErrorMessage />;
  }

  return (
    <div>
      {/*  відправка пошукового запиту */}
      <SearchBar onSubmit={handleSearchSubmit} />
      {/* Відображуння поточного пошукового запиту */}
      <p>Поточний запит: {searchQuery}</p>
      {/* Якщо йде завантаження — показується Loader */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* сітку з можливістю вибрати фільм */}
          {movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={handleSelectMovie} />
          )}

          {/* Контейнер для відображення повідомлень, центрований по горизонталі */}
          <Toaster
            position="top-center"
            toastOptions={{ style: { margin: "0 auto" } }}
          />
        </>
      )}
      {/* Якщо вибрано фільм, виводиться модальне вікно з деталями */}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
