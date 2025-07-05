/*Це простий компонент індикатора завантаження, який відображає текстове повідомлення про те, що відбувається завантаження фільмів.*/

import css from "./Loader.module.css";

// Типізація пропсів через інтерфейс
interface LoaderProps {
  message?: string; // повідомлення необов'язкове
}

export default function Loader({
  message = "Loading, please wait...", //можно змінювати message  під любий тип пошуку(фото,фільм,картина)
}: LoaderProps) {
  return <p className={css.text}>{message}</p>;
}
