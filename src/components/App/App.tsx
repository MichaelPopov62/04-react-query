import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { toast } from "react-hot-toast";
import type { Movie } from "../../types/movie"; // тип фільму, створити за потреби
import { fetchMovies } from "../../services/movieService"; //  // Імпорт функції, яка робить запит до API
import MovieGrid from "../MovieGrid/MovieGrid"; // шлях підкоригуй відповідно до структури
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader"; // <- імпорт лоадера

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]); // ініціалізація стану з пустим масивом
  const [isLoading, setIsLoading] = useState(false); // стан для лоадера
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  // Функція, яка отримає текст пошуку з SearchBar
  const handleSearchSubmit = async (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }
    setSearchQuery(query);
    // toast.success(`Searching for: ${query}`); // Просто щоб бачити, що працює
    // Тут можна викликати API і оновити список фільмів
    setIsLoading(true); // Починаємо лоадер

    try {
      const [response] = await Promise.all([
        fetchMovies({ query }),
        delay(1500),
      ]); // <-- тут виклик функції
      if (!response.results || response.results.length === 0) {
        toast.error("No movies found for your request.");

        setMovies([]);
        return;
      }
      setMovies(response.results); // оновлюємо список фільмів
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Error fetching movies");
      setMovies([]); // очищуємо при помилці
    } finally {
      setIsLoading(false); // Завершуємо лоадер у будь-якому випадку
    }
  };
  // Функція обробки кліку на фільм
  const handleSelectMovie = (movie: Movie) => {
    console.log("Selected movie:", movie);
    // тут можна додати додаткову логіку
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {/* Тут можна додати компонент для відображення результатів пошуку */}
      <p>Поточний запит: {searchQuery}</p>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={handleSelectMovie} />
          )}
          {/* Ось цей компонент відповідає за відображення тостів */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                margin: "0 auto", // центр по горизонталі
              },
            }}
          />
        </>
      )}
    </div>
  );
}
