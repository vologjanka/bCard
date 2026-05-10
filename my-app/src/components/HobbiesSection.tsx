/**
 * Секция «Увлечения» для пункта меню #hobbies.
 * По заданию каждое увлечение: название + две фотографии.
 */
import { hobbies } from '../data/hobbies'
import styles from './HobbiesSection.module.css'

function HobbiesSection() {
  return (
    <section
      /*
        id="hobbies" — ключевая точка для меню:
        ссылка <a href="#hobbies"> в App.tsx прокручивает страницу именно к этому блоку.
      */
      id="hobbies"
      className={styles.section}
      /*
        aria-labelledby связывает секцию с заголовком h2 ниже.
        Скринридеры озвучивают секцию как «Увлечения», что улучшает навигацию по странице.
      */
      aria-labelledby="hobbies-page-title"
    >
      {/* Главный заголовок раздела «Увлечения». */}
      <h2 id="hobbies-page-title" className={styles.pageTitle}>
        Увлечения
      </h2>

      {/*
        Сетка карточек увлечений:
        - берём данные из массива hobbies (src/data/hobbies.ts),
        - для каждого элемента создаём одну карточку article.
      */}
      <div className={styles.grid}>
        {hobbies.map((hobby) => (
          <article key={hobby.id} className={styles.card} aria-labelledby={`hobby-title-${hobby.id}`}>
            {/*
              Название конкретного увлечения.
              id нужен для aria-labelledby у article, чтобы карточка имела связанный заголовок.
            */}
            <h3 id={`hobby-title-${hobby.id}`} className={styles.cardTitle}>
              {hobby.title}
            </h3>

            {/* Внутренняя мини-сетка из двух фото (по заданию урока). */}
            <div className={styles.photosRow}>
              <img
                className={styles.photo}
                /*
                  BASE_URL обязателен для корректных путей на GitHub Pages:
                  в production сайт может открываться из подпапки репозитория.
                */
                src={`${import.meta.env.BASE_URL}${hobby.image1}`}
                alt={hobby.alt1}
                loading="lazy"
              />
              <img
                className={styles.photo}
                src={`${import.meta.env.BASE_URL}${hobby.image2}`}
                alt={hobby.alt2}
                /*
                  lazy отложит загрузку картинки, пока карточка не приблизится к экрану.
                  Это экономит трафик и ускоряет начальный рендер длинной страницы.
                */
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HobbiesSection
