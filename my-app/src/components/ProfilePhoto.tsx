/**
 * Карточка с фотографией профиля. Файл лежит в public/myfoto.jpg.
 * Путь собирается через import.meta.env.BASE_URL — так изображение корректно
 * открывается и при локальной разработке, и после деплоя на GitHub Pages (base './').
 */
import styles from './ProfilePhoto.module.css'

function ProfilePhoto() {
  return (
    <section className={styles.photoCard} aria-label="Фото">
      <img
        className={styles.photo}
        src={`${import.meta.env.BASE_URL}myfoto.jpg`}
        alt="Фото Дувановой Ирины"
      />
    </section>
  )
}

export default ProfilePhoto
