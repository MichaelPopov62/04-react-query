/*Цей файл :
1.Робить HTTP-запит до TMDB API для пошуку фільмів за назвою .
2. Повертає дані пошуку.*/

import axios from "axios"; // Імпортую бібліотеку axios для HTTP-запитів

import type { AxiosResponse } from "axios"; //Імпортую тип AxiosResponse із бібліотеки axios — для точного опису структури HTTP-відповіді

import type { FetchMoviesResponse } from "../types/movie"; // Імпортую власний тип відповіді з API (описує, як виглядають дані про фільми)

// Описую тип параметрів функції fetchMovies
interface FetchMoviesParams {
  query: string; // Пошуковий запит (назва фільму або ключове слово)
  page?: number; // Номер сторінки результатів він не є обов'язковим
}

//  API ключ з файлу .env через Vite (змінна середовища)
const API_KEY = import.meta.env.VITE_TMDB_TOKEN; // API ключ береться зі змінної  визначеної у файлі .env

// Базова URL адреса для TMDB API
const BASE_URL = "https://api.themoviedb.org/3";

// Асинхронна функція для отримання фільмів за запитом
export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<FetchMoviesResponse> {
  /* Відправляю GET-запит на TMDB API за адресою /search/movie для пошуку фільмів за текстовим запитом.
 Передаю параметри: api_key, query, page */
  try {
    const response: AxiosResponse<FetchMoviesResponse> =
      await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, {
        params: {
          query, // пошуковий рядок (назва фільму)
          page, // сторінка з результатами
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`, // ключ доступу у заголовку
        },
      });
    console.log(
      ` Запит до TMDB виконано: query="${query}", page=${page}, отримано фільмів: ${response.data.results.length}`
    );

    // функція повертає безпосередньо тіло відповіді (дані про фільми)
    return response.data;
  } catch (error) {
    console.error(" Помилка під час запиту fetchMovies:", error);
    throw error;
  }
}
