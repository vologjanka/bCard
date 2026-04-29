import styles from './AboutMe.module.css'

function AboutMe() {
  return (
    <section className={styles.aboutMe} aria-label="Обо мне">
      <h2 className={styles.heading}>Обо мне</h2>
      <p className={styles.text}>
        Дуванова Ирина Александровна, 41 год, г. Вологда.
      </p>
      <p className={styles.text}>
        Образование высшее, инженер-программист.
      </p>
    </section>
  )
}

export default AboutMe
