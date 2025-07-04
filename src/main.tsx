/*головна точка входу в React-додаток:
1.Імпортує головний компонен App
2.Створює React root (кореневий елемент)
3.Рендерить додаток всередину DOM */

import "modern-normalize/modern-normalize.css"; // Підключаю modern-normalize — нормалізує стилі між різними браузерами

import { StrictMode } from "react"; // Імпортую StrictMode — спеціальний компонент для перевірки потенційних проблем у додатку під час розробки

import { createRoot } from "react-dom/client"; // Функція createRoot використовується для створення React root

import "./index.css"; // Підключаю власні глобальні стилі для проєкту

import App from "./components/App/App"; // Імпортую головний компонент App

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
// console.log("API_KEY:", import.meta.env.VITE_TMDB_TOKEN);
