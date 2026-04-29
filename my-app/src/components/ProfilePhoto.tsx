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
