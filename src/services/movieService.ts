/*Цей файл :
1.Робить HTTP-запит до TMDB API для пошуку фільмів за назвою (query).
2. Повертає дані пошуку.*/

import axios from "axios"; // Імпортую бібліотеку axios для HTTP-запитів (відправка запитів на сервер)

import type { AxiosResponse } from "axios"; // Імпортую тип для типізації відповіді axios (щоб TypeScript розумів структуру відповіді)

import type { FetchMoviesResponse } from "../types/movie"; // Імпортую власний тип відповіді з API (описує, як виглядають дані про фільми)

// Описую тип параметрів функції fetchMovies
interface FetchMoviesParams {
  query: string; // Пошуковий запит (назва фільму або ключове слово)
  page?: number; // Номер сторінки результатів (необов'язковий, за замовчуванням 1)
}

//  API ключ з файлу .env через Vite (змінна середовища)
const API_KEY = import.meta.env.VITE_TMDB_TOKEN; // .env змінну в реальному

// Базова URL адреса для TMDB API
const BASE_URL = "https://api.themoviedb.org/3";

// Асинхронна функція для отримання фільмів за запитом
export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<FetchMoviesResponse> {
  // Відправляю GET-запит на TMDB API за адресою /search/movie
  // Передаю параметри: api_key, query, page
  const response: AxiosResponse<FetchMoviesResponse> =
    await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, {
      params: {
        query, // пошуковий рядок (назва фільму)
        page, // сторінка з результатами
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`, // токен у заголовку
      },
    });
  // функція повертає безпосередньо тіло відповіді (дані про фільми)
  return response.data;
}
