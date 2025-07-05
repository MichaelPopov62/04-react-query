/*Цей код визначає інтерфейси для TypeScript, які описують структуру даних, що використовуються у додатку для роботи з фільмами.*/

//Movie описує структуру об'єкта фільму, який містить основні властивості
export interface Movie {
  id: number; //унікальний ідентифікатор фільму
  poster_path: string | null; //шлях до постера (може бути null, якщо постера немає)
  backdrop_path: string | null; // шлях до фонового зображення (може бути null)
  title: string; //назва фільму
  overview: string; //опис
  release_date: string; //дата виходу
  vote_average: number; //середня оцінка користувачів
}
