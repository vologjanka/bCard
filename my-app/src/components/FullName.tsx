/**
 * Блок с главным заголовком страницы (ФИО) и подзаголовком (роль, город).
 * Семантика: один h1 на странице — основной заголовок визитки.
 */
import styles from './FullName.module.css'

function FullName() {
  return (
    <section className={styles.fullName} aria-label="ФИО">
      <h1 className={styles.title}>Дуванова Ирина Александровна</h1>
      <p className={styles.subtitle}>Инженер-программист, г. Вологда</p>
    </section>
  )
}

export default FullName
