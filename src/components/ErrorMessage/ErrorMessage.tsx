/*ErrorMessage — відображає повідомлення про помилку у випадку невдалого HTTP-запиту.*/

import css from "./ErrorMessage.module.css"; // Імпорт стилів з CSS-модуля

// Компонент для відображення повідомлення про помилку
export default function ErrorMessage() {
  return <p className={css.text}>There was an error, please try again...</p>;
}
