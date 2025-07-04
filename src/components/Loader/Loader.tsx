/*Це простий компонент індикатора завантаження, який відображає текстове повідомлення про те, що відбувається завантаження фільмів.*/

import css from "./Loader.module.css";

export default function Loader() {
  console.log("  Loader — триває завантаження фільмів...");
  return <p className={css.text}>Loading movies, please wait...</p>;
}
