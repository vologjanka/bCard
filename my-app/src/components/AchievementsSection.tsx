/**
 * Секция страницы «Достижения»: заголовок и сетка карточек.
 * id="achievements" обязан совпадать с href="#achievements" в меню (App.tsx).
 */
import AchievementCard from './AchievementCard'
import { achievements } from '../data/achievements'
import styles from './AchievementsSection.module.css'

function AchievementsSection() {
  return (
    <section
      id="achievements"
      className={styles.section}
      aria-labelledby="achievements-page-title"
    >
      {/*
        id у h2 совпадает с aria-labelledby у section — связь заголовка секции для доступности.
      */}
      <h2 id="achievements-page-title" className={styles.pageTitle}>
        Достижения
      </h2>
      <div className={styles.grid}>
        {/*
          map превращает массив данных в массив элементов React.
          key обязателен: React использует его, чтобы сопоставить элементы между рендерами.
          Здесь key=item.id стабильнее, чем индекс массива, если порядок записей изменится.
        */}
        {achievements.map((item) => (
          <AchievementCard
            key={item.id}
            achievementId={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            imageAlt={item.title}
          />
        ))}
      </div>
    </section>
  )
}

export default AchievementsSection
