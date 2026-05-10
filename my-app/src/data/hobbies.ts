/**
 * Данные для секции «Увлечения».
 * Каждое увлечение содержит название и два изображения (как просили для урока).
 */

export type Hobby = {
  /** Уникальный id для React key при выводе списка. */
  id: string
  /** Название увлечения. */
  title: string
  /** Первая картинка (путь относительно public/). */
  image1: string
  /** Вторая картинка (путь относительно public/). */
  image2: string
  /** Подпись alt для первой картинки. */
  alt1: string
  /** Подпись alt для второй картинки. */
  alt2: string
}

export const hobbies: Hobby[] = [
  {
    id: 'hobby-1',
    title: 'Чтение',
    image1: 'hobbies/reading-1.svg',
    image2: 'hobbies/reading-2.svg',
    alt1: 'Книги и чтение в уютной атмосфере',
    alt2: 'Открытая книга как символ чтения',
  },
  {
    id: 'hobby-2',
    title: 'Путешествия',
    image1: 'hobbies/travel-1.svg',
    image2: 'hobbies/travel-2.svg',
    alt1: 'Горы и маршруты для путешествий',
    alt2: 'Пейзаж как символ поездок и открытий',
  },
  {
    id: 'hobby-3',
    title: 'Фотография',
    image1: 'hobbies/photo-1.svg',
    image2: 'hobbies/photo-2.svg',
    alt1: 'Камера и кадр как хобби фотография',
    alt2: 'Горный кадр как сюжет для фотосъемки',
  },
]
