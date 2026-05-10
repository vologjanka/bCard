/**
 * Карточка одного достижения: изображение, заголовок, описание.
 * Данные приходят сверху пропсами — компонент не знает про весь массив achievements.
 */
import styles from './AchievementCard.module.css'

/** Пропсы карточки: всё необходимое для отображения и доступности. */
type Props = {
  /** Совпадает с item.id из данных — для уникального id заголовка (aria-labelledby). */
  achievementId: string
  title: string
  description: string
  /** Относительный путь внутри public/, например achievements/photo.jpg */
  image: string
  /** Текст для атрибута alt у img (кратко описывает смысл изображения для скринридеров). */
  imageAlt: string
}

function AchievementCard({
  achievementId,
  title,
  description,
  image,
  imageAlt,
}: Props) {
  /**
   * import.meta.env.BASE_URL задаётся Vite: на GitHub Pages часто нужен префикс репозитория.
   * Склейка BASE_URL + image даёт корректный URL к файлу из public/.
   */
  const src = `${import.meta.env.BASE_URL}${image}`

  /*
    Уникальный id заголовка внутри карточки. Нужен для связи:
    <article aria-labelledby={headingId}> … <h3 id={headingId}> …
    Тогда скринридер при фокусе на article может озвучить связанный заголовок как «имя» блока.
  */
  const headingId = `achievement-heading-${achievementId}`

  return (
    /*
      ─── Блок <article> ───

      Почему <article>, а не <div> или <section>?
      • <article> по смыслу HTML — самодостаточный фрагмент контента: его можно
        представить отдельно (карточка в ленте, превью в списке). Достижение как раз
        такой кирпичик: заголовок + текст + иллюстрация.
      • <section> обычно группирует смысловой раздел страницы с собственным заголовком
        уровня секции; здесь секция одна на всю страницу — AchievementsSection.
      • <div> не несёт семантики — хуже для доступности и структуры документа.

      className={styles.card}
        Подключает CSS-модуль: внешний вид (фон, скругление, тень, сетка внутри карточки)
        задаётся в AchievementCard.module.css. Имя класса после сборки уникально.

      aria-labelledby={headingId}
        «Этот region озвучивается по заголовку с таким id». Браузер/скринридер связывает
        карточку с <h3 id={headingId}> ниже — пользователь слышит название достижения
        как подпись к целому блоку, а не только при заходе на заголовок отдельно.
    */
    <article
      className={styles.card}
      aria-labelledby={headingId}
    >
      {/*
        Обёртка для картинки (не семантический «смысл», а раскладка + обрезка).
        • Задаёт соотношение сторон (aspect-ratio в CSS) — превью одинаковой «высоты» в ряду.
        • overflow: hidden + object-fit на img — картинка заполняет прямоугольник без искажений.
      */}
      <div className={styles.imageWrap}>
        {/*
          <img> — декоративный/информативный слой: сам текст заголовка и абзаца дублировать
          в alt не нужно; alt кратко описывает, что на фото (диплом, сцена, скриншота проекта).

          src — полный URL к файлу из public/ (см. переменную src выше).

          loading="lazy" — отложенная загрузка: пока карточка далеко от viewport,
          запрос картинки можно не делать сразу (экономия трафика на длинной странице).
        */}
        <img className={styles.image} src={src} alt={imageAlt} loading="lazy" />
      </div>

      {/*
        Текстовая часть карточки отделена от превью — удобнее стилизовать отступы и типографику
        в .body без влияния на блок с изображением.
      */}
      <div className={styles.body}>
        {/*
          <h3> — подзаголовок уровня ниже, чем «Достижения» (<h2> в родительской секции).
          Иерархия: страница/секция h2 → карточка h3 — так корректнее для SEO и скринридеров.

          id={headingId} — должен совпадать с aria-labelledby на <article> выше.
        */}
        <h3 id={headingId} className={styles.title}>
          {title}
        </h3>
        {/*
          Обычный абзац с описанием; один источник правды для длинного текста — проп description.
        */}
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  )
}

export default AchievementCard
